import { AfterViewInit, Directive, ElementRef, inject, OnInit } from "@angular/core";

@Directive({
    selector: "[appAutofocus]",
    host: {}
})

export class AutoFocusDirective implements OnInit {
    private readonly el = inject(ElementRef<HTMLInputElement>);
    ngOnInit(): void {
        this.el.nativeElement.focus();
    }
}

