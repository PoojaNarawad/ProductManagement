import { Component, inject } from '@angular/core';
import { Product } from '../../types/product';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {ProductserviceService} from '../../productservice.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  product!: Product;
  ProductserviceService=inject(ProductserviceService);
  activatedRoute=inject(ActivatedRoute);
  ngOnInit(){
    let productId=this.activatedRoute.snapshot.params["id"];
    this.ProductserviceService.getProductById(productId).subscribe(result=>{
      this.product=result;
    })
  }
}
