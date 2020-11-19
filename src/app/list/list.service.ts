import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from './list';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*' 
    });
  }
  
  getList(): Observable<List[]>{
    return this.http.get<List[]>("http://localhost:5000/api/getlist", { withCredentials: true});
    //return null;
  }

  addListitem(entryname : string, entryprice : number){
    var body = {"name":entryname,"price":entryprice};
    return this.http.post("http://localhost:5001/api/addentry", body);
  }
}
