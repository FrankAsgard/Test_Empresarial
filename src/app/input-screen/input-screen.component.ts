import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';

declare var bootstrap: any; // Declaración de Bootstrap para TypeScript

@Component({
  selector: 'app-input-screen',
  templateUrl: './input-screen.component.html',
  styleUrls: ['./input-screen.component.css']
})
export class InputScreenComponent {
  documentType: string = ''; // Tipo de documento seleccionado por el usuario
  documentNumber: string = ''; // Número de documento ingresado por el usuario
  isFormValid: boolean = false; // Estado que indica si el formulario es válido
  errorMessage: string | null = null; // Mensaje de error a mostrar

  constructor(private router: Router, private clientService: ClientService) {}

  // Verifica si el formulario es válido basándose en el tipo de documento y la longitud del número de documento
  checkFormValidity() {
    const cleanedDocumentNumber = this.documentNumber.replace(/,/g, '');
    this.isFormValid = this.documentType !== '' && cleanedDocumentNumber.length >= 8 && cleanedDocumentNumber.length <= 11;
    this.setErrorMessage(cleanedDocumentNumber);
  }

  // Establece un mensaje de error si el número de documento es demasiado largo
  setErrorMessage(documentNumber: string) {
    if (documentNumber.length > 11) {
      this.errorMessage = 'El máximo son 11 caracteres.';
    } else {
      this.errorMessage = null;
    }
  }

  // Formatea el número de documento para agregar comas
  formatDocumentNumber(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length >= 8 && input.length <= 11) {
      this.documentNumber = input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      this.documentNumber = input;
    }
    this.checkFormValidity();
  }

  // Busca al cliente en el servicio y navega al componente de resumen si se encuentra
  searchClient() {
    if (!this.isFormValid) {
      this.checkFormValidity();
      return;
    }

    this.clientService.getClients().subscribe(clients => {
      const client = clients.find((c: any) => c.documentType === this.documentType && c.documentNumber === this.documentNumber.replace(/,/g, ''));
      if (client) {
        this.router.navigate(['/summary'], { state: { client } });
      } else {
        this.showUserNotFoundModal();
      }
    });
  }

  // Muestra un modal si no se encuentra al usuario
  showUserNotFoundModal() {
    const modalEl = document.getElementById('userNotFoundModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}
