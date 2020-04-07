import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Iemployee } from '../Iemployee';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  public employees : Iemployee[];
  public selectedEmp : Iemployee

  constructor(private employeeService : EmployeeService, 
  private messageService: MessageService
  ) { }

  ngOnInit() {
  this.getEmployees();
  }
  getEmployees(): void {
    this.employeeService.getEmployees()
    .subscribe(data => this.employees = data)
  }
/*onSelect(emp: Iemployee): void {
  this.selectedEmp = emp;
  this.messageService.add(`employeeList: Selected Emp id=${emp.id}`);
}*/
  add(newEmp: string): void {
    newEmp = newEmp.trim();
    if (!newEmp) {
      return;
    }
    this.employeeService.addEmp({ newEmp } as Iemployee).subscribe(employee => {
      this.employees.push(employee);
    });
  }
  delete(emp: Iemployee): void {
    this.messageService.add(`employeeList: Selected Emp id=${emp.id}`)
    this.employees = this.employees.filter(e =>e !== emp);
    this.employeeService.deleteEmp(emp).subscribe();
  }
}