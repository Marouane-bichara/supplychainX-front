import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ProductDTOResponse, ProductDTO } from '../../../core/models/admin/product';
import { ProductService } from '../../../core/services/admin/product.service';
import { loadProducts } from './store/product.actions';
import { selectAllProducts, selectLoading } from './store/product.selectors';

@Component({
  standalone: true,
  selector: 'app-product-management',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private productService = inject(ProductService);

  products$: Observable<ProductDTOResponse[]>;
  loading$: Observable<boolean>;

  showForm = false;
  isEditMode = false;
  selectedProductId: number | null = null;

  productForm: FormGroup;

  constructor() {
    this.products$ = this.store.select(selectAllProducts);
    this.loading$ = this.store.select(selectLoading);

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      productionTime: [0, [Validators.required, Validators.min(0)]],
      cost: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    console.log('ProductManagementComponent initialized');
    console.log('Selecting products from store...');
    this.store.dispatch(loadProducts());
  }

  toggleModal(product?: ProductDTOResponse) {
    this.showForm = !this.showForm;

    if (product) {
      this.isEditMode = true;
      this.selectedProductId = product.idProduct;
      this.productForm.patchValue({
        name: product.name,
        productionTime: product.productionTime,
        cost: product.cost,
        stock: product.stock
      });
    } else {
      this.isEditMode = false;
      this.selectedProductId = null;
      this.productForm.reset();
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const payload: ProductDTO = this.productForm.value;

    if (this.isEditMode && this.selectedProductId !== null) {
      this.productService.updateProduct(this.selectedProductId, payload).subscribe({
        next: () => { this.store.dispatch(loadProducts()); this.toggleModal(); },
        error: err => console.error('Error updating product', err)
      });
    } else {
      this.productService.createProduct(payload).subscribe({
        next: () => { this.store.dispatch(loadProducts()); this.toggleModal(); },
        error: err => console.error('Error creating product', err)
      });
    }
  }

  deleteProduct(id: number) {
    if (!confirm('Supprimer ce produit ?')) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => { this.store.dispatch(loadProducts()); },
      error: err => console.error('Error deleting product', err)
    });
  }

  dashboard() { this.router.navigate(['/dashboard']); }
  fournisseurs() { this.router.navigate(['/fournisseurs']); }
  rawMaterial() { this.router.navigate(['/raw-material']); }
  supplierOrders() { this.router.navigate(['/supplier-orders']); }
}
