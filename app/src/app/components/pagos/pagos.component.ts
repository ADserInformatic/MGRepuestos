import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  @ViewChild('select') seleccion: ElementRef;
  @Input() clientes: any;
  public seleccionado: any;
  public fecha: string = new Date().toLocaleDateString()
  constructor() { }

  ngOnInit(): void {
  }

  ver(){
    for (let i = 0; i < this.clientes.length; i++) {
      const element = this.clientes[i];
      if(this.seleccion.nativeElement.value == element._id){
        this.seleccionado = element
      }
      
    }
  }
}
