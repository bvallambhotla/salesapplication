import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'profisee-spinner',
  templateUrl: './spinner.component.html',
  styles: [`
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .spinner {
      border: 16px solid #f3f3f3;
      border-top: 16px solid #3498db;
      border-radius: 50%;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class SpinnerComponent {
  constructor(public spinnerService: SpinnerService) { }
}
