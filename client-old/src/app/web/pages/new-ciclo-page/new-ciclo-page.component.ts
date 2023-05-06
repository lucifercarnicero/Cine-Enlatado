import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';




@Component({
  selector: 'app-new-ciclo-page',
  templateUrl: './new-ciclo-page.component.html',
  styleUrls: ['./new-ciclo-page.component.css']
})

export class NewCicloPageComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    //cargar la info?
  }

  //Gestionar info del formulario y enviarla al servicio
  //Traer info del servicio y mostrarla en el formulario



}
