import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appWhiteSpaceTrim]',
})
export class WhiteSpaceTrimDirective {
  constructor(private eleRef: ElementRef) {}

  @HostListener('blur')
  onBlur() {
    const value = this.eleRef.nativeElement.value.trim();
    this.eleRef.nativeElement.value = value;
  }
}
