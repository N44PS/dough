import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

import { Category } from "../../models/category.model";

@Component({
  selector: "category",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["category.component.scss"],
  templateUrl: "./category.component.html"
})
export class CategoryComponent {
  @Input() category: Category;
}
