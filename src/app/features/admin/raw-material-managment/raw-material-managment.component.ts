import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Added
import { RawMaterialManagmentService } from '../../../core/services/admin/raw-material-managment.service';
import { RawMaterial } from '../../../core/models/admin/raw-material.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-raw-material-managment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Added ReactiveFormsModule
  templateUrl: './raw-material-managment.component.html',
  styleUrl: './raw-material-managment.component.css'
})
export class RawMaterialManagmentComponent implements OnInit {
  private router = inject(Router);
  private service = inject(RawMaterialManagmentService);
  private fb = inject(FormBuilder);

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

  toggleModal() {
    this.showModal = !this.showModal;
    if (!this.showModal) this.materialForm.reset();
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
    if (this.materialForm.valid) {
      this.service.createRawMaterial(this.materialForm.value).subscribe({
        next: () => {
          this.loadRawMaterials(); 
          this.toggleModal();     
        },
        error: (err) => console.error("Error adding material", err)
      });
    }
  }

  fournisseurs() { this.router.navigate(['/fournisseurs']); }
  dashboard() { this.router.navigate(['/dashboard']); }
}