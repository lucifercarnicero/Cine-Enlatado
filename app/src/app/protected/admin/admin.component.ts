import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(600)),
    ]),
  ],
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
