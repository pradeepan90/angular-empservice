import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Iemployee } from "./Iemployee";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { MessageService } from "./message.service";

@Injectable()
export class EmployeeService {
  //private _url  = "./employeedata.json";
  //#1. Above did not worked hence tried #2
  //#3 Used the in-memory-data-services to simulate the HttpClient
  private _url = "api/Employees";
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}
  getEmployees(): Observable<Iemployee[]> {
    return this.http.get<Iemployee[]>(this._url).pipe(
      tap(_ => this.log("EmployeeService: fetching all employees")),
      catchError(this.handleError<Iemployee[]>("getEmployees", []))
    );

    //#2 tried inline data, it worked well, however to simulate http tried #3
    /*return [
    {"id":1, "name":"Cp","age":29},
    {"id":2, "name":"Dom","age":26},
    {"id":3, "name":"Nivs","age":28}
  ];*/
  }
  getEmployee(id: number): Observable<Iemployee> {
    const url = `${this._url}/${id}`;
    return this.http.get<Iemployee>(url).pipe(
      tap(_ => this.log(`getEmployee:fetching emp id=${id}`)),
      catchError(
        this.handleError<Iemployee>(
          `getEmployee: error in getEmployee id=${id}`
        )
      )
    );
    this.log(`getEmployee:fetched emp id=${id}`);
  }
  updateEmployee(emp: Iemployee): Observable<any> {
    return this.http.put(this._url, emp, this.httpOptions).pipe(
      tap(_ => this.log(`updated emp id=${emp.id}`)),
      catchError(this.handleError<any>("updateEmployee"))
    );
  }
  /** DELETE: delete the employee from the server */
  deleteEmp(emp: Iemployee | number): Observable<Iemployee> {
    const id = typeof emp === "number" ? emp : emp.id;
    const url = `${this._url}/${id}`;

    return this.http.delete<Iemployee>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted employee id=${id}`)),
      catchError(this.handleError<Iemployee>(`deleteEmp`))
    );
  }
  addEmp(newEmp: Iemployee): Observable<Iemployee> {
    return this.http.post<Iemployee>(this._url, newEmp, this.httpOptions).pipe(
      tap((newEmp: Iemployee) => this.log(`added employee w/ id=${newEmp.id}`)),
      catchError(this.handleError<Iemployee>("addEmployee"))
    );
  }
   /* GET employees whose name contains search term */
  searchEmployees(term: string): Observable<Iemployee[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
        return of([]);
      }
      return this.http.get<Iemployee[]>
        (`${this._url}/?name=${term}`).pipe(
           tap(x => x.length ?
            this.log(`found employees matching "${term}"`) :
            this.log(`no employees matching "${term}"`)
            ),
        catchError(this.handleError<Iemployee[]>('searchEmployees', []))
        );
    }
  private log(message: string) {
    this.messageService.add(`EmployeeService: ${message}`);
  }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
