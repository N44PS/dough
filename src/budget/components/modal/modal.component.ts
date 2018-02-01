import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Renderer2
} from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";
import { Observable } from "rxjs/Observable";
import { Entry } from "../../models/entry.model";

@Component({
  selector: "modal",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["modal.component.scss"],
  templateUrl: "./modal.component.html"
})
export class ModalComponent {
  modal$: Observable<{ isOpen }>;
  entry$: Observable<Entry>;
  valueToAdd: number = 0;

  constructor(
    private store: Store<fromStore.BudgetState>,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.entry$ = this.store.select(fromStore.getCurrentEntry);
    this.modal$ = this.store.select(fromStore.getModalState);
    this.modal$.subscribe(isOpen => {
      const value = isOpen ? "hidden" : "auto";
      this.renderer.setStyle(document.body, "overflow", value);
    });
  }

  close() {
    this.store.dispatch(new fromStore.toggleModalState());
  }
}
