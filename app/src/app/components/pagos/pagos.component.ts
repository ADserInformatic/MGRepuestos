import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { PeticionesService } from 'src/app/services/peticiones.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  @ViewChild('select') seleccion: ElementRef;
  @Input() clientes: any;
  @Output() atualizarDatos = new EventEmitter()
  public pdfDef: any;
  public seleccionado: any;
  public entrega: number;
  public fecha: string = new Date().toLocaleDateString()
  constructor(private apiServ: PeticionesService) { }

  ngOnInit(): void {
  }

  ver(){
    for (let i = 0; i < this.clientes.length; i++) {
      const element = this.clientes[i];
      if(this.seleccion.nativeElement.value == element._id){
        this.seleccionado = element
      }
      
    }
  }

  pago(){
    const data = {data: {
      fecha: this.fecha,
      entrega: this.entrega
    }}
    
    this.apiServ.addpay(this.seleccionado._id, data).subscribe(res=>{
       console.log(res)
       this.atualizarDatos.emit()

    })
    this.pdfDef = {
      content: [
        {
          text: 'MARÍA GRANDE REPUESTOS',
          style: 'header',
          alignment: 'center',
          bold: true,
          fontSize: 20
        },
        {
          text: '  '
        },
        {
          text: ' '
        },
        {
          text: `Fecha: ${this.fecha}`,
          style: 'header',
          alignment: 'right'
        },
        {
          text: '  '
        },
        {
          text: ' '
        },
        {
          table: {
            widths: ['*', '*'],
            body: [
              [{text:'Cliente', fontSize: 20, bold: true}, {text:`${this.seleccionado.name} ${this.seleccionado.lastname}`, fontSize: 20}],
              [{text:'Entrega', fontSize: 20, bold: true}, {text: `$ ${this.entrega}`, fontSize: 20}]
            ]
          }
        },
        
        ]
      }
      const pdf = pdfMake.createPdf(this.pdfDef);
      pdf.open();


  }
}
