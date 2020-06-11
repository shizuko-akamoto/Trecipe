import { initialState, ModalActionTypes, ModalState } from "./types";
import { ModalAction } from "./action";

export function modalReducer(
  state = initialState,
  action: ModalAction
): ModalState {
  switch (action.type) {
    case ModalActionTypes.SHOW_MODAL:
      return {
        modal: action.payload,
      };
    case ModalActionTypes.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}
