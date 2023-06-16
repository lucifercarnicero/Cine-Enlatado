import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  konamiCode: string[] = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'Enter'];
  currentPosition = 0;

  constructor(private router: Router) { }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === this.konamiCode[this.currentPosition]) {
      this.currentPosition++;

      if (this.currentPosition === this.konamiCode.length) {
        this.currentPosition = 0;
        this.router.navigate(['/home/list']); // Reemplaza '/otra-pagina' por la ruta deseada

      }
    } else {
      this.currentPosition = 0;
    }
  }
}


