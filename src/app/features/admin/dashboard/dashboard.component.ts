import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone : true,
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
   private router = inject(Router);



  fournisseurs(): void {

    this.router.navigate(['/fournisseurs']);

  }

   rawMaterial() {
    this.router.navigate(['/raw-material']);
  }
}
