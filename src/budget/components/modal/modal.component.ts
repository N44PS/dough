import {
    Component,
    Input,
    ChangeDetectionStrategy,
    Renderer2,
    HostListener
} from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";
import { Observable } from "rxjs/Observable";
import { Entry, EntryMode } from "../../models/entry.model";

@Component({
    selector: "modal",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ["modal.component.scss"],
    templateUrl: "./modal.component.html"
})
export class ModalComponent {
    modal$: Observable<boolean>;
    entry$: Observable<Entry>;
    entryMode$: Observable<EntryMode>;
    value: number;

    constructor(
        private store: Store<fromStore.BudgetState>,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.entry$ = this.store.select(fromStore.getCurrentEntry);
        this.modal$ = this.store.select(fromStore.getModalState);
        this.entryMode$ = this.store.select(fromStore.getEntryMode);
        this.modal$.subscribe(isOpen => {
            const value = isOpen ? "hidden" : "auto";
            this.renderer.setStyle(document.body, "overflow", value);
        });
    }

    @HostListener("click", ["$event"])
    onClick(e) {
        if (e.target.classList.contains('backdrop')) {
            this.store.dispatch(new fromStore.toggleModalState());
        }
    }

    setMode(mode: EntryMode) {
        this.store.dispatch(new fromStore.setEntryMode(mode));
    }

    changeEntry() {
        this.store.dispatch(new fromStore.UpdateEntry(this.value));
    }
}
