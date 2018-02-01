import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

import { Category } from "../../models/category.model";

@Component({
  selector: "category",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["category.component.scss"],
  template: `
    <div class="category">
        <div class="category__name">
          <span>{{category.label}}</span>
          <span [style.color]="!category.isExpenses ? '#78e08f' : '#e55039'">{{category.total}}€</span>
        </div>
        <div class="category__entries">
        <div class="category__inner" [style.width]="category.entries.length * (130 + 20) + 20 + 'px'">
        <entry [entry]="entry" [isExpense]="category.isExpenses" *ngFor="let entry of category.entries"></entry>
        </div>
        </div>
    </div>
  `
})
export class CategoryComponent {
  @Input() category: Category;
}
