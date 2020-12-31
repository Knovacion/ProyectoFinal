
import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[appClickDirective]'
})
export class ClickDirectiveDirective {

  constructor(private eRef: ElementRef) {}

  
  @HostListener("click") showBorder() {
    this.eRef.nativeElement.classList.add("recuadroAccordeon");
  }

}
