import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.css']
})
export class DeudoresComponent implements OnInit {
  public clientes: any;

  constructor() { }

  ngOnInit(): void {
    this.clientes = JSON.parse(localStorage.getItem("clientes"));
  }


}
