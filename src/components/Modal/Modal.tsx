import React from "react";
import "./modal.scss";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { hideModal } from "../../redux/Modal/action";

export interface ComponentProps {
  onClose?: () => void;
}

export type ModalProps = ComponentProps & ReturnType<typeof mapDispatchToProps>;

class Modal extends React.Component<ModalProps, {}> {
  static defaultProps = {
    onClose: undefined,
  };

  private listenKeyboard(event: KeyboardEvent) {
    if (event.key === "Escape") {
      if (this.props.onClose) {
        this.props.onClose();
      }
      this.props.hideModal();
    }
  }

  componentDidMount() {
    if (!this.props.onClose) {
      window.addEventListener("keydown", this.listenKeyboard.bind(this), true);
    }
  }

  componentWillUnmount() {
    if (!this.props.onClose) {
      window.removeEventListener(
        "keydown",
        this.listenKeyboard.bind(this),
        true
      );
    }
  }

  private onOverlayClick() {
    if (this.props.onClose) {
      this.props.onClose();
    }
    this.props.hideModal();
  }

  private onDialogClick(event: React.MouseEvent<HTMLDivElement>) {
    // to prevent closing of the modal when click is within the dialog box
    event.stopPropagation();
  }

  render() {
    return (
      <div>
        <div className="modal-overlay" />
        <div className="modal-content" onClick={this.onOverlayClick.bind(this)}>
          <div className="modal-dialog" onClick={this.onDialogClick}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      hideModal,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Modal);
