import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<div class="body">
                <div class="lds-spinner">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div
                  ><div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>`,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
