import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CiclosService } from 'src/app/_services/ciclos.service';
import { Ciclo } from 'src/app/interfaces/ciclo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  ciclos: Ciclo[] = [];

  constructor(private ciclosService: CiclosService) { }

  ngOnInit(): void {
    this.todosCiclos();
  }

  todosCiclos() {
    this.ciclosService.obtenerCiclos().subscribe(
      (ciclos) => {
        this.ciclos = ciclos;
        console.log(this.ciclos);
      },
      (error) => console.log(error)
    );
  }
}
