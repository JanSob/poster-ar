import {Component, Input, OnInit} from '@angular/core';
import { Poster } from 'src/app/models/poster';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() poster!: Poster;

  constructor() { }

  ngOnInit(): void {

  }

}
