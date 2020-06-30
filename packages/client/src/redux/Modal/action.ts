import { typedAction } from "../util";
import { ModalActionTypes, ModalType } from "./types";

export const showModal = (modal: ModalType) => {
  return typedAction(ModalActionTypes.SHOW_MODAL, modal);
};

export const hideModal = () => {
  return typedAction(ModalActionTypes.HIDE_MODAL);
};

export type ModalAction = ReturnType<typeof showModal | typeof hideModal>;
