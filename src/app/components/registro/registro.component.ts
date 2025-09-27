import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule 
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="registro-container">
      <div class="form-card">
        <h2>Crear Cuenta</h2>
        <p class="subtitle">Complete todos los campos requeridos</p>

        <form [formGroup]="registroForm" (ngSubmit)="onSubmit()" class="registro-form">
          
          <!-- Campo Nombre -->
          <div class="form-group">
            <label for="nombre">Nombre *</label>
            <input 
              type="text" 
              id="nombre"
              formControlName="nombre"
              [class.invalid]="registroForm.get('nombre')?.invalid && registroForm.get('nombre')?.touched"
              placeholder="Ingrese su nombre">
            <div class="error-message" 
                 *ngIf="registroForm.get('nombre')?.invalid && registroForm.get('nombre')?.touched">
              {{ getErrorMessage('nombre') }}
            </div>
          </div>

          <!-- Campo Apellido -->
          <div class="form-group">
            <label for="apellido">Apellido *</label>
            <input 
              type="text" 
              id="apellido"
              formControlName="apellido"
              [class.invalid]="registroForm.get('apellido')?.invalid && registroForm.get('apellido')?.touched"
              placeholder="Ingrese su apellido">
            <div class="error-message" 
                 *ngIf="registroForm.get('apellido')?.invalid && registroForm.get('apellido')?.touched">
              {{ getErrorMessage('apellido') }}
            </div>
          </div>

          <!-- Campo Email -->
          <div class="form-group">
            <label for="email">Email *</label>
            <input 
              type="email" 
              id="email"
              formControlName="email"
              [class.invalid]="registroForm.get('email')?.invalid && registroForm.get('email')?.touched"
              placeholder="ejemplo@correo.com">
            <div class="error-message" 
                 *ngIf="registroForm.get('email')?.invalid && registroForm.get('email')?.touched">
              {{ getErrorMessage('email') }}
            </div>
          </div>

          <!-- Campo Contraseña -->
          <div class="form-group">
            <label for="password">Contraseña *</label>
            <input 
              type="password" 
              id="password"
              formControlName="password"
              [class.invalid]="registroForm.get('password')?.invalid && registroForm.get('password')?.touched"
              placeholder="Mínimo 6 caracteres">
            <div class="error-message" 
                 *ngIf="registroForm.get('password')?.invalid && registroForm.get('password')?.touched">
              {{ getErrorMessage('password') }}
            </div>
          </div>

          <!-- Botón de Envío -->
          <button 
            type="submit" 
            class="submit-btn"
            [disabled]="registroForm.invalid">
            Registrarse
          </button>

          <p class="required-info">* Campos obligatorios</p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .registro-container {
      width: 100%;
      max-width: 500px;
      padding: 20px;
    }

    .form-card {
      background: white;
      border-radius: 15px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .form-card h2 {
      text-align: center;
      color: #333;
      margin-bottom: 10px;
      font-size: 2em;
    }

    .subtitle {
      text-align: center;
      color: #666;
      margin-bottom: 30px;
      font-size: 0.9em;
    }

    .registro-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }

    .form-group input {
      padding: 12px 15px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.3s;
    }

    .form-group input:focus {
      border-color: #667eea;
      outline: none;
    }

    .form-group input.invalid {
      border-color: #e74c3c;
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.8em;
      margin-top: 5px;
      min-height: 20px;
    }

    .submit-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 15px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
      margin-top: 10px;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .submit-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .required-info {
      text-align: center;
      color: #666;
      font-size: 0.8em;
      margin-top: 20px;
    }
  `]
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      // Mostrar alerta de éxito
      alert('¡Registro exitoso!\n\nDatos registrados:\n' +
            `Nombre: ${this.registroForm.value.nombre}\n` +
            `Apellido: ${this.registroForm.value.apellido}\n` +
            `Email: ${this.registroForm.value.email}`);
      
      // Resetear formulario
      this.registroForm.reset();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.registroForm.get(controlName);
    if (control?.errors?.['required']) {
      return 'Este campo es requerido';
    }
    if (control?.errors?.['minlength']) {
      return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    }
    if (control?.errors?.['email']) {
      return 'Formato de email inválido';
    }
    return '';
  }
}