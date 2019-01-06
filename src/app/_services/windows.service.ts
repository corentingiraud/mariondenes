import { Injectable } from '@angular/core';

@Injectable()
export class WindowScrolling {

  private styleTag: HTMLStyleElement;

  constructor() {
    console.log('Yes');
    this.styleTag = this.buildStyleElement();
  }

  public disable(): void {
    document.body.appendChild( this.styleTag );
  }

  public enable(): void {
    document.body.removeChild( this.styleTag );
  }

  private buildStyleElement(): HTMLStyleElement {
    const style = document.createElement('style');

    style.setAttribute( 'data-debug', 'Injected by WindowScrolling service from angular.' );
    style.textContent = `
      body {
        overflow: hidden !important ;
      }
    `;
    return( style );
  }
}
