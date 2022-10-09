import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public color1: string = '#2B4865';
  public color2: string = '#002B5B';
  public color3: string = '#8FE3CF';
  public texto: string = 'claro';
  title = 'app';

  cambiar(){
    if(this.color1 == '#EEEBDD'){
      this.color1 = '#2B4865';
      this.color2 = '#002B5B';
      this.color3 = '#8FE3CF';
      this.texto = 'claro'
    }else{
      this.color1 = '#EEEBDD';
      this.color2 = '#810000';
      this.color3 = '#CE1212';
      this.texto = 'oscuro'
    }
    
  }
}
