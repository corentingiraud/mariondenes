import { Injectable } from '@angular/core';

@Injectable()
export class WindowScrolling {

  private styleTag: HTMLStyleElement;

  constructor() {
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
      html, body {
        overflow: hidden !important;
        position: relative;
        height: 100%;
      }
    `;
    return( style );
  }
}
