import { Component, OnInit } from '@angular/core';
import { PeticionesService } from './services/peticiones.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public color1: string = '#2B4865';
  public color2: string = '#002B5B';
  public color3: string = '#8FE3CF';
  public texto: string = 'icofont-sun';
  title = 'app';
  constructor(){}
  ngOnInit(): void{
  }
  cambiar(){
    if(this.color1 == '#EEEBDD'){
      this.color1 = '#2B4865';
      this.color2 = '#002B5B';
      this.color3 = '#8FE3CF';
      this.texto = 'icofont-sun'
    }else{
      this.color1 = '#EEEBDD';
      this.color2 = '#810000';
      this.color3 = '#CE1212';
      this.texto = 'icofont-moon'
    }
    
  }
}
