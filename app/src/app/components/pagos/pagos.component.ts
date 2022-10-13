import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
    const pagador = {
      fecha: this.fecha,
      entrego: this.entrega
    }
    this.apiServ.addpay(this.seleccionado._id, pagador).subscribe(res=>{
      console.log(res)
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
          text: `Cliente: ${this.seleccionado.name} ${this.seleccionado.lastname}`,
          style: 'header',
          alignment: 'left',
          fontSize: 20
        },
        
        {
          text: ' '
        },
        {
          text: ' '
        },
        {
          text: `Entrega: $${this.entrega}`,
          alignment: 'left',
          fontSize: 20
        },
        {
          text: ' '
        }
        ]
      }
      const pdf = pdfMake.createPdf(this.pdfDef);
      pdf.open();
  }
}
