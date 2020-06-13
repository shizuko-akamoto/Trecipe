import AddPopup from "../../pages/MyTrecipes/AddPopup/AddPopup";
import React from "react";

/**
 * React element of popup components. Extend by or-ing
 */
export type ModalType = React.ReactElement<typeof AddPopup>;

/**
 * Modal state: If null, modal dialog box is not shown, otherwise, displays
 * component declared by ModalType
 */
export type ModalState = {
  modal: ModalType | null;
};

export const initialState: ModalState = {
  modal: null,
};

export enum ModalActionTypes {
  SHOW_MODAL = "@modal/SHOW_MODAL",
  HIDE_MODAL = "@modal/HIDE_MODAL",
}
