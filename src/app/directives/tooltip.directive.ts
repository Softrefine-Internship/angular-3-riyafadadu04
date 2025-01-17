import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
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

  constructor(private eleRef: ElementRef) {}

  ngOnInit() {
    this.createTooltip();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.tooltip) {
      if (changes['tooltipBackgroundColor']) {
        this.tooltip.style.backgroundColor = this.tooltipBackgroundColor;
      }
      if (changes['tooltipFontColor']) {
        this.tooltip.style.color = this.tooltipFontColor;
      }
      if (changes['tooltipFontSize']) {
        this.tooltip.style.fontSize = this.tooltipFontSize;
      }
      if (changes['tooltipPosition']) {
        this.setPositionStyles();
      }
    }
  }

  private createTooltip() {
    this.tooltip = document.createElement('span');
    this.tooltip.innerText = this.tooltipContent || 'By default tooltip content';

    Object.assign(this.tooltip.style, {
      position: 'absolute',
      backgroundColor: this.tooltipBackgroundColor,
      padding: '5px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: this.tooltipFontSize,
      color: this.tooltipFontColor,
      display: 'none',
      zIndex: '1000',
      transform: 'translateX(-50%)',
      whiteSpace: 'nowrap',
    });

    this.setPositionStyles();
    this.eleRef.nativeElement.appendChild(this.tooltip);
  }

  private setPositionStyles() {
    if (this.tooltip) {
      this.tooltip.style.top = '';
      this.tooltip.style.bottom = '';
      this.tooltip.style.left = '';
      this.tooltip.style.right = '';

      switch (this.tooltipPosition) {
        case 'top':
          this.tooltip.style.bottom = '100%';
          this.tooltip.style.left = '50%';
          break;
        case 'right':
          this.tooltip.style.top = '40%';
          this.tooltip.style.left = '65%';
          break;
        case 'bottom':
          this.tooltip.style.top = '100%';
          this.tooltip.style.left = '50%';
          break;
        case 'left':
          this.tooltip.style.top = '40%';
          this.tooltip.style.right = '55%';
          break;
      }
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.tooltip) {
      this.tooltip.style.display = 'block';
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) {
      this.tooltip.style.display = 'none';
    }
  }
}
