import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  defaultHighlight: string = 'transparent';
  colorHighlight: string = '#ade8f4';
  @HostBinding('style.backgroundColor') backgroundColor: string = '';

  constructor(private eleRef: ElementRef, private render: Renderer2) {}

  @HostListener('mouseenter')
  mouseEnter(event: MouseEvent) {
    this.backgroundColor = this.colorHighlight;
  }

  @HostListener('mouseleave')
  mouseLeave(event: MouseEvent) {
    this.backgroundColor = this.defaultHighlight;
  }
}
