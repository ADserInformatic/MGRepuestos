import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  @Input() clientes: any;
  constructor() { }

  ngOnInit(): void {
  }

}
