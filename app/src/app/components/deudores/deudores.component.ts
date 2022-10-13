import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.css']
})
export class DeudoresComponent implements OnInit {
  @Input() clientes: any;

  constructor() { }

  ngOnInit(): void {
    
  }


}
