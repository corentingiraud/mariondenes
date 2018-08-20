import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { WindowScrolling } from '../_services/windows.service';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('active-desktop', style({opacity: 1})),
      state('active-mobile', style({opacity: 1})),
      state('inactive', style([{opacity: 0}, {'z-index': -1}])),
      state('none', style([{opacity: 0}, {'z-index': -1}])),
      transition('inactive => active-mobile', animate(80, keyframes([
        style({opacity: 0, offset: 0}),
        style({opacity: 1, offset: 1}),
      ]))),
      transition('none => active-mobile', animate(80, keyframes([
        style({opacity: 0, offset: 0}),
        style({opacity: 1, offset: 1}),
      ]))),
      transition('active-mobile => inactive', animate(80, keyframes([
        style({opacity: 1, offset: 0}),
        style({opacity: 0, offset: 1}),
      ]))),
    ])
  ]
})
export class MenuComponent implements OnInit {

  isActive: Boolean = false;
  fadeInState: string;

  constructor(private windowScrolling: WindowScrolling, private media: ObservableMedia) {
  }

  ngOnInit() {
    this.fadeInState = this.media.isActive('xs') || this.media.isActive('sm') ?
      'inactive' : 'active-desktop';
    this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs' || change.mqAlias === 'sm' ) {
        this.isActive = false;
        this.fadeInState = 'none';
      }
      if (change.mqAlias === 'md') {
        this.isActive = true;
        this.fadeInState = 'active-desktop';
      }
    });
  }

  toogle() {
    if (this.media.isActive('xs') || this.media.isActive('sm')) {
      this.isActive = !this.isActive;
      this.fadeInState = this.isActive ? 'active-mobile' : 'inactive';
    }
  }
}
