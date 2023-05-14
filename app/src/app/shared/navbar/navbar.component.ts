import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  url: string;
}

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public navbarItems: MenuItem[] = [
    { name: 'Home', url: '' },
    { name: 'Listado', url: './list' },
    { name: 'Ciclo', url: './ciclo' },



  ]

}
