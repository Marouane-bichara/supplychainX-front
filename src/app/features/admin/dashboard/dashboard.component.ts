import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone : true,
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
   private router = inject(Router);

  ngOnInit() {
    console.log('Dashboard component initialized');
  }

  fournisseurs(): void {

    this.router.navigate(['/fournisseurs']);

  }

   rawMaterial() {
    this.router.navigate(['/raw-material']);
  }

    supplierOrders(): void {
    this.router.navigate(['/supplier-orders']);
  }

  products(): void {
    this.router.navigate(['/products']);
  }
}
