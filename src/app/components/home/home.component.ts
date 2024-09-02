import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { ProductserviceService } from '../../productservice.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, SearchComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // types =2;
// types=[1, 2, 3, 4];
// types=[];
// products = [1, 2, 3, 4, 5, 6]
products:any[]=[];
filteredProduct:any[] = [];
productserviceService = inject(ProductserviceService);
ngOnInit(){
  this.productserviceService.getProducts().subscribe((result)=>{
    console.log(result);
    this.products=result as any[];
    this.filteredProduct = this.products;
  }) 
  
}
onViewProduct(event:any) {
  console.log("onViewProduct", event);
}
onSearch(search:string){
  console.log("home", search)
  if(search){
    this.filteredProduct = this.products.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
    console.log("Filtered Products:", this.filteredProduct);
  } else {
    this.filteredProduct = this.products;
  }
}
}