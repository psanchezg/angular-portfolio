import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

import { ProductoDescripcionInterface } from '../../interfaces/producto-descripcion.interface';
import { ProductoInterface } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcionInterface;
  productoId: string;

  constructor( private route: ActivatedRoute, public _service: ProductosService ) { }

  ngOnInit() {

    this.route.params
        .subscribe( parametros => {

          this._service.getProducto( parametros['id'] )
            .subscribe( (producto: ProductoDescripcionInterface) => {

              this.productoId = parametros['id'];
              this.producto = producto;

            });
          // console.log( parametros['id'] );
        });

  }

}
