import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  visible: String = 'ciclos';

  showCiclos(){
    this.visible='ciclos';
  }

  showUsers(){

    this.visible='users';
  }

}
