import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-screen',
  templateUrl: './summary-screen.component.html',
  styleUrls: ['./summary-screen.component.css']
})
export class SummaryScreenComponent implements OnInit {
  client: any; // Objeto que contiene la información del cliente

  constructor(private router: Router) {
    // Recupera la información del cliente desde el estado de la navegación
    const navigation = this.router.getCurrentNavigation();
    this.client = navigation?.extras.state?.['client'];
  }

  ngOnInit(): void {
    // Si no se recibe información del cliente, redirige a la pantalla de inicio
    if (!this.client) {
      this.router.navigate(['/']);
    }
  }

  // Método para volver a la pantalla de inicio
  goBack() {
    this.router.navigate(['/']);
  }
}
