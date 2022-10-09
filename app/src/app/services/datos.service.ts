import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  @Output() clientes = new EventEmitter();

  constructor() { }
}
