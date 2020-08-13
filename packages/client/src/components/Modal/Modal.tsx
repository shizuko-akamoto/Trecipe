import React from 'react';
import './modal.scss';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { hideModal } from '../../redux/Modal/action';
import { Button } from '../Button/Button';

/**
 * ComponentProps
 * onClose: any additional onClose logic to perform aside from closing the modal
 */
export interface ComponentProps {
    onClose?: () => void;
}

export type ModalProps = ComponentProps & ReturnType<typeof mapDispatchToProps>;

class Modal extends React.Component<ModalProps, {}> {
    static defaultProps = {
        onClose: undefined,
    };

    /**
     *
     */
    componentDidMount() {
        window.addEventListener('keydown', this.listenKeyboard.bind(this), true);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.listenKeyboard.bind(this), true);
    }

    /**
     * Listens to the user keyboard to see if they have pressed “ESC” while the modal is open. If so, the modal closes
     */
    private listenKeyboard(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            if (this.props.onClose) {
                this.props.onClose();
            }
            this.props.hideModal();
        }
    }

    /**
     * Click on the overlay (outside the Modal dialog box), it will close the modal
     */
    private onOverlayClick() {
        if (this.props.onClose) {
            this.props.onClose();
        }
        this.props.hideModal();
    }

    /**
     * Prevents the closing of the modal when you click within the dialog box
     */
    private onDialogClick(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
    }

    render() {
        return (
            <div>
                <div className="modal-overlay" />
                <div className="modal-content" onClick={this.onOverlayClick.bind(this)}>
                    <div className="modal-dialog" onClick={this.onDialogClick}>
                        {this.props.children}
                        <div className="modal-close-button">
                            <Button
                                onClick={this.onOverlayClick.bind(this)}
                                icon={'times'}
                                text=""
                            />
                        </div>
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
