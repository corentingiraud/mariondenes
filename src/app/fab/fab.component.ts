import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('closed', style({
        opacity: 0,
        transform: 'translateY(50px)'
      })),
      transition('open => closed', [
        animate('{{duration}}ms {{delay}}ms')
      ], {params : { duration: '1', delay: '1' }}),
      transition('closed => open', [
        animate('{{duration}}ms {{delay}}ms')
      ], {params : { duration: '1', delay: '1' }}),
    ]),
    trigger('openCloseTooltip', [
      state('open', style({
        visibility: 'visible',
        opacity: 1,
      })),
      state('closed', style({
        transform: 'translateX(40px)',
      })),
      transition('open => closed', [
        animate('40ms')
      ]),
      transition('closed => open', [
        animate('20ms')
      ]),
    ]),
  ],
})
export class FABComponent implements OnInit {

  active = false;

  constructor() { }

  ngOnInit() {
  }

  toogle(): void {
    this.active = !this.active;
  }

  touchDevice(): boolean {
    return 'ontouchstart' in window || !!navigator.maxTouchPoints;
  }

  getSateWithParams(index: number) {
    const value = this.active ? 'open' : 'closed';
    let duration = 25 + 25 * index;
    let delay = 0 + 20 * index;
    if (this.active) {
      duration = 100 - 25 * index;
      delay = 60 - 20 * index;
    }
    return {
      value,
      params: {
        duration,
        delay,
      }
    }
  }

  handleMouseOver(): void {
    if (!this.touchDevice()) {
      this.toogle();
    }
  }
}
