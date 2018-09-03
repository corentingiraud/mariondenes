import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-images-slider',
  templateUrl: './images-slider.component.html',
  styleUrls: ['./images-slider.component.scss']
})
export class ImagesSliderComponent implements OnInit {
  @Input() imageURLs: string[];

  constructor() { }

  ngOnInit(): void { }
}
