import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  @Input() cliente;
  @Output() cerrarEmit = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  cerrar(){
    this.cerrarEmit.emit(true)
  }

}
