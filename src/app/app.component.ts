import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './components/registro/registro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RegistroComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Formulario de Registro</h1>
        <p>Sistema de registro de usuarios</p>
      </header>
      
      <main class="main-content">
        <app-registro></app-registro>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: 'Arial', sans-serif;
    }

    .app-header {
      text-align: center;
      color: white;
      padding: 40px 20px 20px;
    }

    .app-header h1 {
      margin: 0 0 10px 0;
      font-size: 2.5em;
      font-weight: 300;
    }

    .app-header p {
      margin: 0;
      opacity: 0.9;
      font-size: 1.1em;
    }

    .main-content {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 20px;
      min-height: calc(100vh - 200px);
    }
  `]
})
export class AppComponent {
  title = 'formulario-registro';
}