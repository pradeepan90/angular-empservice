import { Component, OnInit } from "@angular/core";
import { Iemployee } from "../Iemployee";
import { EmployeeService } from "../employee.service";
import { MessageService } from "../message.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  employees: Iemployee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe(employees => (this.employees = employees.slice(1, 4)));
    this.messageService.add(
      `Dashboard: after call to empservice selectEmp=${this.employees}`
    );
  }
}
