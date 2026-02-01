import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FournisseursService } from '../../../core/services/admin/fournisseurs.service';
import { Supplier } from '../../../core/models/admin/supplier.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-supplier-management',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './supplier-management.component.html',
  styleUrls: ['./supplier-management.component.css']
})
export class SupplierManagementComponent implements OnInit {

  private router = inject(Router);
  private service = inject(FournisseursService);
  private fb = inject(FormBuilder);

  suppliers: Supplier[] = [];
  loading = false;

  showForm = false;
  isEditMode = false;
  selectedSupplierId: number | null = null;

  supplierForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.loadSuppliers();
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  rawMaterial() {
    this.router.navigate(['/raw-material']);
  }

  products() { this.router.navigate(['/products']); }

  initForm() {
  this.supplierForm = this.fb.group({
    id: [null], 
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    contact: [''],
    rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    leadTime: [1, Validators.required]
  });
}

  loadSuppliers() {
    this.loading = true;
    this.service.getFournisseurs().subscribe({
      next: data => {
        console.log(data);
        
        this.suppliers = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  openForm() {
    this.showForm = true;
    this.isEditMode = false;
    this.selectedSupplierId = null;
    this.supplierForm.reset();
  }

  closeForm() {
    this.showForm = false;
    this.isEditMode = false;
    this.selectedSupplierId = null;
    this.supplierForm.reset();
  }

 submitForm() {
  if (this.supplierForm.invalid) return;

  const supplierData: Supplier = {
    ...this.supplierForm.value,
    id: this.selectedSupplierId
  };


            console.log(this.isEditMode);
             console.log(this.selectedSupplierId);

  if (this.isEditMode && this.selectedSupplierId) {
    this.service.updateFournisseur(this.selectedSupplierId, supplierData)
      .subscribe({
        next: updatedSupplier => {
          console.log('hhhh');
        
          
          
          console.log(updatedSupplier);
          
          this.suppliers = this.suppliers.map(s => 
            s.id === this.selectedSupplierId ? updatedSupplier : s
          );
          console.log(this.selectedSupplierId);
          this.closeForm();
        },
        error: err => console.error('Error updating supplier', err)
      });
  } else {
    this.service.addFournisseur(supplierData)
      .subscribe({
        next: newSupplier => {
          this.suppliers.push(newSupplier);
          this.closeForm();
        },
        error: err => console.error('Error adding supplier', err)
      });
  }
}

supplierOrders(): void {
    this.router.navigate(['/supplier-orders']);
  }

  editSupplier(supplier: Supplier) {
    this.isEditMode = true;


    console.log(supplier);
    
    this.selectedSupplierId = supplier.id!;
    this.showForm = true;

    this.supplierForm.patchValue(supplier);
  }

  deleteSupplier(id: number) {
    if (!confirm('Supprimer ce fournisseur ?')) return;

    this.service.deleteFournisseur(id).subscribe({
      next: () => {
        this.suppliers = this.suppliers.filter(s => s.id !== id);
      },
      error: err => console.error('Error deleting supplier', err)
    });
  }

  searchSupplier(firstName: string, lastName: string) {
    if (!firstName && !lastName) {
      this.loadSuppliers();
      return;
    }

    this.service.searchFournisseur(firstName, lastName).subscribe({
      next: data => {
        this.suppliers = Array.isArray(data) ? data : [data];
      },
      error: err => console.error('Error searching suppliers', err)
    });
  }
}
