import * as fromModal from "../actions/modal.action";

export interface ModalState {
  isOpen: boolean;
}

export const initialState: ModalState = {
  isOpen: false
};

export function reducer(
  state = initialState,
  action: fromModal.ModalAction
): ModalState {
  switch (action.type) {
    case fromModal.TOGGLE_STATE: {
      return {
        isOpen: !state.isOpen
      };
    }
  }
  return state;
}
