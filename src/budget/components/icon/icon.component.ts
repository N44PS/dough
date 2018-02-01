import { Component, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Component({
  selector: "icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.scss"]
})
export class IconComponent implements OnInit {
  @Input() name;
  @Input() size = 22;
  @Input() width;
  @Input() height;
  @Input() color = "";
  constructor(private hostElement: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const size = this.size,
      height = this.height || size,
      width = this.width || size;
    this.renderer.setAttribute(
      this.hostElement.nativeElement,
      "name",
      this.name
    );
    this.renderer.setAttribute(
      this.hostElement.nativeElement,
      "color",
      this.color
    );
    this.renderer.setStyle(
      this.hostElement.nativeElement,
      "width",
      width + "px"
    );
    this.renderer.setStyle(
      this.hostElement.nativeElement,
      "height",
      height + "px"
    );
    this.renderer.setStyle(
      this.hostElement.nativeElement,
      "minWidth",
      width + "px"
    );
    this.renderer.setStyle(
      this.hostElement.nativeElement,
      "minHeight",
      height + "px"
    );
  }
}
