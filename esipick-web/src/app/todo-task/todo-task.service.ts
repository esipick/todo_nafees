import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class TaskTodoService {

    constructor(private https: HttpClient) { }
    private headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*')
    BASE_URL = "http://localhost:5000/api"

    public createTask(payload:any): Observable<any> {
        return this.https
        .post<any>(`${this.BASE_URL}/task`,
          payload,
          { headers: this.headers },
        )
        .pipe(map((response: any) => response));
    }

    public getTasks(page: number, offset: number): Observable<any> {
      return this.https
      .get<any>(`${this.BASE_URL}/task?page=${page}&offset=${offset}`,
        { headers: this.headers },
      )
      .pipe(map((response: any) => response));
    }

    public deleteTask(id: any): Observable<any> {
      return this.https.delete<any>(`${this.BASE_URL}/task/${id}`,
        { headers: this.headers },
      )
      .pipe(map((response: any) => response));
    }

    public updateTask(payload:any): Observable<any> {
      return this.https.put<any>(`${this.BASE_URL}/task`,
        payload,
        { headers: this.headers },
      )
      .pipe(map((response: any) => response));
  }
    
}