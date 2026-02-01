import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierOrder } from '../../../core/models/admin/supply-order.model';
import { RawMaterial } from '../../../core/models/admin/raw-material.model';
import { Supplier } from '../../../core/models/admin/supplier.model';
import { RawMaterialManagmentService } from '../../../core/services/admin/raw-material-managment.service';
import { FournisseursService } from '../../../core/services/admin/fournisseurs.service';
import { SupplierOrderService, SupplyOrderRequest } from '../../../core/services/admin/supplier-order.service';

@Component({
  selector: 'app-supplier-orders',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './supplier-orders.component.html',
  styleUrl: './supplier-orders.component.css'
})
export class SupplierOrdersComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private supplierOrderService = inject(SupplierOrderService);
  private supplierService = inject(FournisseursService);
  private rawMaterialService = inject(RawMaterialManagmentService);

  orders: SupplierOrder[] = [];
  suppliers: Supplier[] = [];
  rawMaterials: RawMaterial[] = [];

  loadingOrders = false;
  loadingMeta = false;
  showModal = false;
  isEditMode = false;
  selectedOrderId: number | null = null;

  orderForm: FormGroup = this.fb.group({
    supplierId: [null, Validators.required],
    orderDate: ['', Validators.required],
    items: this.fb.array([this.buildItemGroup()])
  });

  ngOnInit(): void { 
    this.loadMeta();
    this.loadOrders();
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  private buildItemGroup(): FormGroup {
    return this.fb.group({
      rawMaterialId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addItemRow(): void {
    this.items.push(this.buildItemGroup());
  }

  removeItemRow(index: number): void {
    if (this.items.length === 1) return;
    this.items.removeAt(index);
  }

  loadMeta(): void {
    this.loadingMeta = true;
    this.supplierService.getFournisseurs().subscribe({
      next: data => {
        this.suppliers = data;
        this.loadingMeta = false;
      },
      error: () => (this.loadingMeta = false)
    });

    this.rawMaterialService.getAllRawMaterial().subscribe({
      next: data => (this.rawMaterials = data),
      error: err => console.error('Error loading raw materials', err)
    });
  }

  loadOrders(): void {
    this.loadingOrders = true;
    this.supplierOrderService.getAll().subscribe({
      next: data => {
        this.orders = data;
        this.loadingOrders = false;
      },
      error: () => (this.loadingOrders = false)
    });
  }

  toggleModal(order?: SupplierOrder): void {
    this.showModal = !this.showModal;

    if (order) {
      this.isEditMode = true;
      this.selectedOrderId = order.idOrder;
      this.orderForm.reset({
        supplierId: order.supplier?.id ?? null,
        orderDate: order.orderDate ?? ''
      });

      this.items.clear();
      if (order.rawMaterialSupplyOrders?.length) {
        order.rawMaterialSupplyOrders.forEach(entry => {
          this.items.push(
            this.fb.group({
              rawMaterialId: entry.rawMaterial?.idMaterial ?? null,
              quantity: entry.quantity ?? 1
            })
          );
        });
      } else {
        this.items.push(this.buildItemGroup());
      }
    } else {
      this.isEditMode = false;
      this.selectedOrderId = null;
      this.orderForm.reset({ supplierId: null, orderDate: '' });
      this.items.clear();
      this.items.push(this.buildItemGroup());
    }
  }

  submit(): void {
    if (this.orderForm.invalid) return;

    const payload: SupplyOrderRequest = {
      supplierId: this.orderForm.value.supplierId,
      orderDate: this.orderForm.value.orderDate,
      items: this.items.value.reduce((acc: Record<number, number>, curr: { rawMaterialId: number; quantity: number }) => {
        acc[curr.rawMaterialId] = curr.quantity;
        return acc;
      }, {})
    };

    if (this.isEditMode && this.selectedOrderId !== null) {
      this.supplierOrderService.update(this.selectedOrderId, payload).subscribe({
        next: () => {
          this.loadOrders();
          this.toggleModal();
        },
        error: err => console.error('Error updating order', err)
      });
    } else {
      this.supplierOrderService.create(payload).subscribe({
        next: () => {
          this.loadOrders();
          this.toggleModal();
        },
        error: err => console.error('Error creating order', err)
      });
    }
  }

  dashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  fournisseurs(): void {
    this.router.navigate(['/fournisseurs']);
  }

  rawMaterial(): void {
    this.router.navigate(['/raw-material']);
  }

  products(): void {
    this.router.navigate(['/products']);
  }

  supplierOrders(): void {
    this.router.navigate(['/supplier-orders']);
  }
}
