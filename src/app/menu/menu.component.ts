import { Component, OnInit } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  isActive: Boolean = false;
  fadeInState: string;

  constructor(private media: ObservableMedia) {
  }

  ngOnInit() {
    this.fadeInState = this.media.isActive('xs') || this.media.isActive('sm') ?
      'inactive' : 'active-desktop';
    this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs' || change.mqAlias === 'sm' ) {
        this.isActive = false;
      }
      if (change.mqAlias === 'md') {
        this.isActive = true;
      }
    });
  }

  toogle() {
    if (this.media.isActive('xs') || this.media.isActive('sm')) {
      this.isActive = !this.isActive;
    }
  }
}
