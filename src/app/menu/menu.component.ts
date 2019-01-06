import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { WindowScrolling } from '../_services/windows.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  isActive: Boolean = false;
  fadeInState: string;

  constructor(private media: MediaObserver, private windowsScrolling: WindowScrolling) {
  }

  ngOnInit() {
    this.fadeInState = this.media.isActive('xs') || this.media.isActive('sm') ?
      'inactive' : 'active-desktop';
    this.media.media$.subscribe((change: MediaChange) => {
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
      if (this.isActive) {
        this.windowsScrolling.enable();
      } else {
        this.windowsScrolling.disable();
      }
      this.isActive = !this.isActive;
    }
  }
}
