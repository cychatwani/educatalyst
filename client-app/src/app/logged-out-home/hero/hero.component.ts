import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css',
    '../../../../node_modules/bootstrap/dist/css/bootstrap.css'
  ]
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
