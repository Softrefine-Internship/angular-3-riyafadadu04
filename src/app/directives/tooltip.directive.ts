import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})

export class TooltipDirective implements OnInit, OnChanges {
  @Input('appTooltip') tooltipContent: string = 'By default tooltip content';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() tooltipBackgroundColor: string = '#03045e';
  @Input() tooltipFontColor: string = '#caf0f8';
  @Input() tooltipFontSize: string = '18px';

  private tooltip: HTMLElement | null = null;

  constructor(private eleRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.createTooltip();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.tooltip) {
      if (changes['tooltipBackgroundColor']) {
        this.renderer.setStyle(
          this.tooltip,
          'background',
          this.tooltipBackgroundColor
        );
      }
      if (changes['tooltipFontColor']) {
        this.renderer.setStyle(this.tooltip, 'color', this.tooltipFontColor);
      }
      if (changes['tooltipFontSize']) {
        this.renderer.setStyle(this.tooltip, 'fontSize', this.tooltipFontSize);
      }
      if (changes['tooltipPosition']) {
        this.setPositionStyles();
      }
    }
  }

  private createTooltip() {
    this.tooltip = this.renderer.createElement('span');
    this.tooltip!.innerText =
      this.tooltipContent.length == 0
        ? 'By default tooltip content'
        : this.tooltipContent;

    this.renderer.setStyle(this.tooltip, 'position', 'absolute');
    this.renderer.setStyle(
      this.tooltip,
      'background',
      this.tooltipBackgroundColor
    );
    this.renderer.setStyle(this.tooltip, 'padding', '5px');
    this.renderer.setStyle(this.tooltip, 'border', '1px solid #ccc');
    this.renderer.setStyle(this.tooltip, 'borderRadius', '4px');
    this.renderer.setStyle(this.tooltip, 'fontSize', this.tooltipFontSize);
    this.renderer.setStyle(this.tooltip, 'color', this.tooltipFontColor);
    this.renderer.setStyle(this.tooltip, 'display', 'none');
    this.renderer.setStyle(this.tooltip, 'zIndex', '1000');
    this.renderer.setStyle(this.tooltip, 'transform', 'translateX(-50%)');
    this.setPositionStyles();
    this.renderer.appendChild(this.eleRef.nativeElement, this.tooltip);
  }

  private setPositionStyles() {
    if (this.tooltip) {
      this.renderer.setStyle(this.tooltip, 'bottom', null);
      this.renderer.setStyle(this.tooltip, 'top', null);
      this.renderer.setStyle(this.tooltip, 'left', null);
      this.renderer.setStyle(this.tooltip, 'right', null);
      this.renderer.setStyle(this.tooltip, 'whiteSpace', 'nowrap');

      switch (this.tooltipPosition) {
        case 'top':
          this.renderer.setStyle(this.tooltip, 'bottom', '100%');
          this.renderer.setStyle(this.tooltip, 'left', '50%');
          break;
        case 'right':
          this.renderer.setStyle(this.tooltip, 'top', '40%');
          this.renderer.setStyle(this.tooltip, 'left', '65%');
          break;
        case 'bottom':
          this.renderer.setStyle(this.tooltip, 'left', '50%');
          break;
        case 'left':
          this.renderer.setStyle(this.tooltip, 'top', '40%');
          this.renderer.setStyle(this.tooltip, 'right', '55%');
          break;
      }
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.tooltip) {
      this.renderer.setStyle(this.tooltip, 'display', 'block');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) {
      this.renderer.setStyle(this.tooltip, 'display', 'none');
    }
  }
}
