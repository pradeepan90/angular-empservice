import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Iemployee } from './Iemployee';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const Employees = [
    {id:1, name:"Cp",age:29},
    {id:2, name:"Dom",age:26},
    {id:3, name:"Nivs",age:28},
    {id:4, name:"Gopi",age:29},
    {id:5, name:"Ariff",age:33}  
] ;
    return {Employees};
  }

  // Overrides the genId method to ensure that a Iemployee always has an id.
  // If the Employees array is empty,
  // the method below returns the initial number (11).
  // if the Employees array is not empty, the method below returns the highest of Iemployee id + 1.
  genId(Employees: Iemployee[]): number {
    return Employees.length > 0 ? Math.max(...Employees.map(Iemployee => Iemployee.id)) + 1 : 11;
  }
}