import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrado: ProductosInterface[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise( ( resolve, reject ) => {

      this.http.get('https://angular-html-a0d63.firebaseio.com/productos_idx.json')
      .subscribe( ( resp: ProductoInterface[] ) => {

        this.productos = resp;
        setTimeout(() => {
          this.cargando = false;
        }, 2000);
        resolve();
        
      });

    });

  }

  getProducto( id: string ) {
    return this.http.get(`https://angular-html-a0d63.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ) {

    if ( this.productos.length == 0 ) {
      // Esperar a cargar los productos
      this.cargarProductos().then(() => {
        // Cuando ya están los productos
        // aplicar filtro
        this.filtrarProductos( termino );
      });
    } else {
      // aplicar filtro
      this.filtrarProductos( termino );
    }

  }


  private filtrarProductos( termino: string ) {

    this.productosFiltrado = [];
    termino = termino.toLowerCase();

    this.productos.forEach( producto => {
      if ( producto.categoria.indexOf( termino ) >= 0 || producto.titulo.toLowerCase().indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push( producto );
      }
    });
    console.log( this.productosFiltrado )

  }
}
