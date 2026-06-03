import { AfterViewInit, Directive, ElementRef, inject } from "@angular/core";

@Directive({
    selector: "[appAutofocus]",
    host: {}
})

export class AutoFocusDirective implements AfterViewInit {
    private readonly el = inject(ElementRef<HTMLInputElement>);
    ngAfterViewInit(): void {
        this.el.nativeElement.focus();
    }
}

