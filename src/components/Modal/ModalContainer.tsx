import React from "react";
import { RootState } from "../../redux";
import { connect } from "react-redux";

type ModalContainerProps = ReturnType<typeof mapStateToProps>;

export class ModalContainer extends React.Component<ModalContainerProps, {}> {
  render() {
    return this.props.modal;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    modal: state.modal.modal,
  };
};

export default connect(mapStateToProps)(ModalContainer);
