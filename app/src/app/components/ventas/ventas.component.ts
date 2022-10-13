import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Venta } from 'src/app/modelos/venta';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { PeticionesService } from 'src/app/services/peticiones.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  @ViewChild('select') seleccion: ElementRef;
  @Input() clientes!: any;
  @Output() atualizarDatos = new EventEmitter()
  public seleccionado!: any;
  entrega: number;
  fecha: string = new Date().toLocaleDateString();
  formProducto: FormGroup;
  formCliente: FormGroup;
  compra: Array<Venta> = [];
  vendido: Venta;
  total: number = 0;
  numero = 0;
  pdfDef: any;

  constructor(private fb: FormBuilder,
              private servApi: PeticionesService) { 
     this.vendido;
  }

  ngOnInit(): void {
    this.formProducto = this.fb.group({
      producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.minLength(1)]],
      precio: ['', [Validators.required, Validators.minLength(1)]]
    })

    this.formCliente = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
      email: ['', [Validators.required]]
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
    let tabl: any = [[{text:'Cantidad', style: 'tableHeader',  alignment: 'center', bold: true}, {text:'Detalle', style: 'tableHeader', alignment: 'center', bold: true} , {text: 'Precio unitario', style: 'tableHeader', alignment: 'center', bold: true}, {text: 'Precio total', style: 'tableHeader', alignment: 'center', bold: true}]];
    this.compra.forEach(element => {
      tabl.push([element.cantida, element.detalle, `$${element.precioU}`, `$${element.precioT}`]) 
    });
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
        alignment: 'left'
      },
      {
        text: ' '
      },
      {
        text: ' '
      },
      {
        table: {
          widths: ['*', '*', '*', '*'],
          body: tabl,
          headerRows: 1
        }
      },
      {
        text: ' '
      },
      {
        text: ' '
      },
      {
        text: `Total: $${this.total}`,
        alignment: 'right'
      },
      {
        text: ' '
      },
      {
        text: `Entrega: $${this.entrega}`,
        alignment: 'right'
      }
      ]
    }

    

    const pdf = pdfMake.createPdf(this.pdfDef);
    pdf.open();
    const buy = {
      data: {
        buys:{subtotal: this.total,
                fecha: this.fecha,
                productos: this.compra
              },
        pays:{
          fecha: this.fecha,
          entrega: this.entrega
        }
      }
    }
    this.servApi.newBuy(this.seleccion.nativeElement.value, buy).subscribe(res=>{
      console.log(res)
      this.compra = []
    })
  }

  ver(){
    console.log(this.seleccion.nativeElement.value)
    for (let i = 0; i < this.clientes.length; i++) {
      const element = this.clientes[i];
      if(this.seleccion.nativeElement.value == element._id){
        console.log(element)
        this.seleccionado = element
      }
      
    }
  }

  newCliente(){
    this.servApi.newClient({data: this.formCliente.value}).subscribe(res=>{
      this.servApi.getClient().subscribe(res=>{
        this.atualizarDatos.emit()
        this.formCliente.reset()
      })
    })
  }

  nuevo(){
    this.seleccionado = '';
  }

}
