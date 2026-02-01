import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Added
import { RawMaterialManagmentService } from '../../../core/services/admin/raw-material-managment.service';
import { RawMaterial } from '../../../core/models/admin/raw-material.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-raw-material-managment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './raw-material-managment.component.html',
  styleUrl: './raw-material-managment.component.css'
})
export class RawMaterialManagmentComponent implements OnInit {
  private router = inject(Router);
  private service = inject(RawMaterialManagmentService);
  private fb = inject(FormBuilder);

  isEditMode = false;
selectedMaterialId: number | null = null;


  loading = false;
  showModal = false; // Controls form visibility
  rawMaterials: RawMaterial[] = [];
  materialForm: FormGroup;

  constructor() {
    this.materialForm = this.fb.group({
      name: ['', Validators.required],
      unit: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      stockMin: [0, [Validators.required, Validators.min(0)]],
      suppliers: [[]] 
    });
  }

  ngOnInit(): void {
    this.loadRawMaterials();
  }

toggleModal(material?: RawMaterial) {
  this.showModal = !this.showModal;

  if (material) {
    this.isEditMode = true;
this.selectedMaterialId = material.idMaterial;
    this.materialForm.patchValue({
      name: material.name,
      unit: material.unit,
      stock: material.stock,
      stockMin: material.stockMin,
      suppliers: material.suppliers
    });
  } else {
    this.isEditMode = false;
    this.selectedMaterialId = null;
    this.materialForm.reset();
  }
}

  loadRawMaterials() {
    this.loading = true;
    this.service.getAllRawMaterial().subscribe({
      next: data => {
        this.rawMaterials = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

onSubmit() {
  if (this.materialForm.invalid) return;

  if (this.isEditMode && this.selectedMaterialId !== null) {
    this.service
      .updateRawMaterial(this.selectedMaterialId, this.materialForm.value)
      .subscribe({
        next: () => {
          this.loadRawMaterials();
          this.toggleModal();
        },
        error: err => console.error('Error updating material', err)
      });

  } else {
    this.service.createRawMaterial(this.materialForm.value).subscribe({
      next: () => {
        this.loadRawMaterials();
        this.toggleModal();
      },
      error: err => console.error('Error creating material', err)
    });
  }
}

  fournisseurs() { this.router.navigate(['/fournisseurs']); }
  dashboard() { this.router.navigate(['/dashboard']); }
  supplierOrders(): void {
    this.router.navigate(['/supplier-orders']);
  }
  products(): void { this.router.navigate(['/products']); }
}