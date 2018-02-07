import * as fromUI from "../actions/ui.action";
import { EntryMode } from "../../models/entry.model";

export interface UIState {
    modalIsOpen: boolean;
    mode: EntryMode;
}

export const initialState: UIState = {
    modalIsOpen: false,
    mode: 'Add'
};

export function reducer(
    state = initialState,
    action: fromUI.UIAction
): UIState {
    switch (action.type) {
        case fromUI.TOGGLE_STATE: {
            return {
                ...state,
                modalIsOpen: !state.modalIsOpen
            };
        }

        case fromUI.SET_ENTRY_MODE: {
            return {
                ...state,
                mode: action.payload
            };
        }
    }
    return state;
}
