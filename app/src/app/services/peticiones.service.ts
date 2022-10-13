import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  public url = environment.urlApi;

  constructor( private http: HttpClient) { }

  getClient(): Observable<any>{
    return this.http.get(`${this.url}/api/client/GetClients`)
  }
  newClient(client: any): Observable<any>{
    return this.http.post(`${this.url}/api/client/NewClient`, client)
  }
  newBuy(id: any, buy: any): Observable<any>{
    return this.http.post(`${this.url}/api/client/AddBuy/${id}`, buy)
  }
  addpay(id: any, data: any): Observable<any>{
    return this.http.post(`${this.url}/api/Client/AddPay/${id}`, data)
  }
  login(user: any): Observable<any>{
    return this.http.post(`${this.url}/api/login/login`, user)
  }
}
