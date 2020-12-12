import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appMouseDirective]",
})
export class MouseDirectiveDirective {
  constructor(private eRef: ElementRef) {}

  @HostListener("mouseenter") showBorder() {
    this.eRef.nativeElement.classList.add("recuadroAccordeon");
  }

  @HostListener("mouseleave") hideBorder() {
    this.eRef.nativeElement.classList.remove("recuadroAccordeon");
  }
}
