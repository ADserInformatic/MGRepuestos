import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Venta } from 'src/app/modelos/venta';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-compras',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  @ViewChild('pdf') pdf: ElementRef; 
  entrega: number;
  fecha: string = new Date().toLocaleDateString();
  formProducto: FormGroup;
  compra: Array<Venta> = [];
  vendido: Venta;
  total: number = 0;
  numero = 0;
  pdfDef: any;

  constructor(private fb: FormBuilder) { 
     this.vendido;
  }

  ngOnInit(): void {
    this.formProducto = this.fb.group({
      producto: '',
      cantidad: Number,
      precio: Number
    })
  }
  agregar(){
    const objeto = {
      cantida: this.formProducto.value.cantidad,
      detalle: this.formProducto.value.producto,
      precioU: this.formProducto.value.precio,
      precioT: this.formProducto.value.cantidad * this.formProducto.value.precio,
      num: this.numero++
    }
    this.compra.push(objeto)
    this.formProducto.reset()
    this.total += objeto.precioT;
    this.numero++
  }
  eliminar(num: number){
    this.compra = this.compra.filter(compras => compras.num != num)
    this.total = 0;
    this.sumaTotal()
  }

  sumaTotal(){
    for (let index = 0; index < this.compra.length; index++) {
      const element = this.compra[index];
      this.total += element.precioT
    }
  }

  imprimir(){
    let tabl: any = [['Cantidad', 'Detalle', 'Precio unitario', 'Precio total']];
    this.compra.forEach(element => {
      tabl.push([element.cantida, element.detalle, `$${element.precioU}`, `$${element.precioT}`]) 
    });
    console.log(tabl)
    this.pdfDef = {
    content: [
      {
        text: 'María grande Repuestos',
        style: 'header',
        alignment: 'center'
      },
      {
        text: `Fecha: ${this.fecha}`,
        style: 'header',
        alignment: 'right'
      },
      {
        table: {
          widths: [100, '*', 200, '*'],
          body: tabl
        }
      },
      {
        text: `Total: $${this.total}`,
        alignment: 'right'
      },
      {
        text: `Entrega: $${this.entrega}`,
        alignment: 'right'
      }
      ]
    }

    

    const pdf = pdfMake.createPdf(this.pdfDef);
    pdf.open();
  }

}
