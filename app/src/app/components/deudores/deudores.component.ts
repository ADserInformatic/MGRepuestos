import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.css']
})
export class DeudoresComponent implements OnInit {
  @Input() clientes: any;
  public detalles: boolean = false;
  public cliente: any;

  constructor() { }

  ngOnInit(): void {
    
  }
  saldar(deuda){
    console.log('Pagar ', deuda)
  }

  verCliente(cliente){
    this.cliente = cliente;
    this.detalles = true;
  }

  ocultarCliente(){
    this.detalles = false
  }
}
