import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../types/product';
import { ProductserviceService } from '../../productservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatInputModule, ReactiveFormsModule ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  formBuilder=inject(FormBuilder);
  productserviceService=inject(ProductserviceService);
  activatedRoute=inject(ActivatedRoute);
  toasterService=inject(ToastrService);
  router=inject(Router);
  productForm:FormGroup=this.formBuilder.group({
    id:[''],
    name:['', [Validators.required,Validators.minLength(50)]],
    brand:['', [Validators.required]],
    image:[''],
    currentPrice:[''],
    standardPrice:[''],
    discount:['']
  })
  ngOnInit(){
    let productId=this.activatedRoute.snapshot.params["id"];
    this.productserviceService.getProductById(productId).subscribe(result=>{
      this.productForm.patchValue(result);
  })
  }
editProduct() {
  if(this.productForm.invalid){
    this.toasterService.error("Please provide all field with valid input");
    return;
  }
  console.log("form edited", this.productForm.value);
  this.productserviceService.updateProduct(this.productForm.value).subscribe(result=>{
    this.toasterService.success("product updated");
    this.router.navigateByUrl("/");
  })
}
}
