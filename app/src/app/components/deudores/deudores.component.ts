import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.css']
})
export class DeudoresComponent implements OnInit {
  @Input() clientes: any;
  @Output() atualizarDatos = new EventEmitter()
  public detalles: boolean = false;
  public cliente: any;
  public pdfDef: any;
  public fecha: any = new Date().toDateString()

  constructor(private apiServ: PeticionesService) { }

  ngOnInit(): void {
    this.atualizarDatos.emit()
  }
  saldar(cliente){
    console.log(cliente)
    if(!confirm("Seguro que desea cancelar la deuda de " + cliente.name + ' ' + cliente.lastname)){
      return
    }
    const data = {data: {
      fecha: this.fecha,
      entrega: cliente.deuda
    }}
    this.apiServ.addpay(cliente._id, data).subscribe(res=>{
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
              [{text:'Cliente', fontSize: 20, bold: true}, {text:`${cliente.name} ${cliente.lastname}`, fontSize: 20}],
              [{text:'Salda deuda por:', fontSize: 20, bold: true}, {text: `$ ${cliente.deuda}`, fontSize: 20}]
            ]
          }
        },
        
        ]
      }
      const pdf = pdfMake.createPdf(this.pdfDef);
      pdf.open();
  }

  verCliente(cliente){
    this.cliente = cliente;
    this.detalles = true;
    console.log(cliente)
  }

  ocultarCliente(){
    this.detalles = false
  }
}
