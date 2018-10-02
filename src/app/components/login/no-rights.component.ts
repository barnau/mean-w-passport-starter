import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-rights',
  template: `
    <mat-card class="example-card">
    <mat-card-header>
      <div mat-card-avatar class="example-header-image"></div>
      <mat-card-title><h4>Contact this guy for full access <div class="badge"> <span class="glyphicon glyphicon-hand-down"></span></div></h4></mat-card-title>
    </mat-card-header>
    <img mat-card-image src="/src/assets/blaine.jpg" alt="Photo Me">
   
  </mat-card>
  `,
  styles: [`
    mat-card {
      height: 500px;
      width: 400px;
      margin: 100px auto;
    }
    .glyphicon {
      font-size: 16px;
    }
    .badge {
      margin-left: 5px;
    }
  `]
})
export class NoRightsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
