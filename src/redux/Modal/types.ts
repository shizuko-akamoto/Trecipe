import AddPopup from "../../pages/MyTrecipe/AddPopup/AddPopup";
import React from "react";

export type ModalType = React.ReactElement<typeof AddPopup>;

export enum ModalActionTypes {
  SHOW_MODAL = "@modal/SHOW_MODAL",
  HIDE_MODAL = "@modal/HIDE_MODAL",
}

export type ModalState = {
  modal: ModalType | null;
};

export const initialState: ModalState = {
  modal: null,
};
