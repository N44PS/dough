import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

import { Entry } from "../../models/entry.model";

@Component({
  selector: "entry",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["entry.component.scss"],
  template: `
    <h4 class="entry__name">{{entry.label}}</h4>
    <h2 [style.color]="!isExpense ? '#78e08f' : '#e55039'">
      {{entry.value}}€
    </h2>
  `
})
export class EntryComponent {
  @Input() entry: Entry;
  @Input() isExpense: boolean = true;
}
