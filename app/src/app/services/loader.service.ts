import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading$ = new Subject<boolean>();

  constructor() { }
  ver(): void{
    this.isLoading$.next(true)
  }
  ocultar(): void{
    this.isLoading$.next(false)
  }
}
