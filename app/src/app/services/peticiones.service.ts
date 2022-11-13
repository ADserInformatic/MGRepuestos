import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  public url = environment.urlApi;
  public _refresh$ = new Subject<void>()

  constructor( private http: HttpClient) { }

  get refresh$(){
    return this._refresh$
  }

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
    return this.http.post(`${this.url}/api/Client/AddPay/${id}`, data).pipe(
      tap(()=>{
        this._refresh$.next()
      })
    )
  }
  login(user: any): Observable<any>{
    return this.http.post(`${this.url}api/login/login`, user)
  }
}
