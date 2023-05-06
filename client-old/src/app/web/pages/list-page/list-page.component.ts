import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent {

  constructor(private router: Router) { }

  public navigateToNewCiclo() {
    this.router.navigate(['/web/new']);
  }

  public navigateToEditCiclo(id: number) {
    this.router.navigate(['/web/edit', id]);
  }

  public navigateToCiclo(id: number) {
    this.router.navigate(['/web/', id]);
  }

}
