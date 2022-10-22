import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { PeticionesService } from 'src/app/services/peticiones.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  public deudores: boolean = false;
  public pagos: boolean = false;
  public ventas: boolean = true;
  public clientes: any;
  public isLoading$ = this.loadServ.isLoading$;
  constructor(private servApi: PeticionesService,
              private loadServ: LoaderService) { }

  ngOnInit(): void {
    this.actualizar()
    this.servApi.actual.subscribe(res=>{
      this.actualizar()
    })
  }
  deudas(){
    this.deudores = true;
    this.pagos = false;
    this.ventas = false;
  }
  venta(){
    this.deudores = false;
    this.pagos = false;
    this.ventas = true;
  }
  pago(){
    this.deudores = false;
    this.pagos = true;
    this.ventas = false;
  }
  actualizar(){
    this.servApi.getClient().subscribe(res=>{
      this.clientes = res.data
    })
  }
}
