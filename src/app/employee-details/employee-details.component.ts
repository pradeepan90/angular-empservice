import { Component, OnInit, Input } from "@angular/core";
import { EmployeeService } from "../employee.service";
import { MessageService } from "../message.service";
import { Iemployee } from "../Iemployee";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-employee-details",
  templateUrl: "./employee-details.component.html",
  styleUrls: ["./employee-details.component.css"]
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() selectedEmp: Iemployee;
//  public employees = [];

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {}
  public empId;

  ngOnInit() {
    //  this.employeeService.getEmployees()
    //  .subscribe(data => this.employees = data);
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get("id"));
      this.empId = id;
    });
    this.getEmployee();
    this.messageService.add(`employeedetails: after call to empservice selectedEmp=${this.selectedEmp} ,id = ${this.empId}`);
  }
  getEmployee(id: number = this.empId): void {
    this.employeeService
      .getEmployee(id)
      .subscribe(employee => (this.selectedEmp = employee));
      
  }
    goBack(): void {
    this.location.back();
  }
    save(): void {
    this.employeeService.updateEmployee(this.selectedEmp).subscribe(() => this.goBack());
  }
  goNext(): void {
    let nextId = this.empId + 1;
    this.router.navigate(["/detail", nextId]);
    this.getEmployee(nextId);
  }
  goPrev(): void {
    let prevId = this.empId - 1;
    this.router.navigate(["/detail", prevId]);
    this.getEmployee(prevId);
  }
}
