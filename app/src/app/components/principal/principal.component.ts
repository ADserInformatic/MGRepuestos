import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { PeticionesService } from 'src/app/services/peticiones.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  constructor( private servApi: PeticionesService,
                private servDatos: DatosService) { }

  ngOnInit(): void {
    this.servApi.getClient().subscribe(res=>{
      this.servDatos.clientes.emit(res.data)
    })
  }

}
