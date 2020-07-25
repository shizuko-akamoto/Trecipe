import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './trecipeCard.scss';
import { CardMenu } from '../../../components/CardMenu/CardMenu';
import { MenuItem } from '../../../components/Menu/Menu';
import { ProgressBar } from '../../../components/ProgressBar/ProgressBar';
import { bindActionCreators, Dispatch } from 'redux';
import {
    createTrecipeRequest,
    deleteTrecipeRequest,
    duplicateTrecipeRequest,
} from '../../../redux/TrecipeList/action';
import { connect } from 'react-redux';
import { showModal } from '../../../redux/Modal/action';
import TrecipePopup, { TrecipePopupType } from '../../../components/TrecipePopup/TrecipePopup';
import Trecipe from '../../../../../shared/models/trecipe';
import { baseURL } from '../../../api';

type TCProps = Trecipe & ReturnType<typeof mapDispatchToProps>;

class TrecipeCard extends React.Component<TCProps> {
    private cardMenuItems: MenuItem[] = [
        {
            id: 1,
            text: 'Edit',
            icon: 'edit',
            onClick: () => {
                this.showTCEditPopup();
            },
        },
        {
            id: 2,
            text: 'Duplicate',
            icon: 'copy',
            onClick: () => {
                this.duplicateTrecipe();
            },
        },
        {
            id: 3,
            text: 'Delete',
            icon: ['far', 'trash-alt'],
            onClick: () => {
                this.deleteTrecipe();
            },
        },
    ];

    private showTCEditPopup = () => {
        this.props.showModal(
            <TrecipePopup type={TrecipePopupType.Edit} trecipe={{ ...this.props }} />
        );
    };

    private duplicateTrecipe = () => {
        this.props.duplicateTrecipe(this.props.uuid);
    };

    private deleteTrecipe = () => {
        this.props.deleteTrecipe(this.props.uuid);
    };

    private onTCEditClick(e: React.MouseEvent) {
        // needed to prevent link redirection to Trecipe page on TC click
        e.preventDefault();
    }

    render() {
        const completed = this.props.destinations.filter((dest) => dest.completed);
        return (
            <div className="trecipeCard">
                <div
                    className="tcHeaderContainer"
                    style={{
                        backgroundImage: this.props.image
                            ? `url(${baseURL}/upload/${this.props.image})`
                            : 'none',
                    }}>
                    <div className="tcHeader">
                        <label className="tcTitle">
                            {this.props.name}
                            <FontAwesomeIcon
                                icon={this.props.isPrivate ? 'lock' : 'lock-open'}
                                className="tcPrivacy"
                            />
                        </label>
                        <div className="tcEdit" onClick={(e) => this.onTCEditClick(e)}>
                            <CardMenu menuItems={this.cardMenuItems} />
                        </div>
                    </div>
                </div>
                <div className="tcBody">
                    <div className="tcMetaData">
                        <div className="tcDate">
                            {new Date(this.props.updatedAt).toLocaleString()}
                        </div>
                        <div className="tcAuthor">by: {this.props.owner}</div>
                    </div>
                    <div className="tcDescription">
                        <p>{this.props.description}</p>
                    </div>
                </div>
                <ProgressBar
                    total={this.props.destinations.length}
                    completed={completed.length}
                    showText={false}
                    barStyle={{ borderRadius: '0 0 8px 8px' }}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            createNewTrecipe: createTrecipeRequest,
            deleteTrecipe: deleteTrecipeRequest,
            duplicateTrecipe: duplicateTrecipeRequest,
            showModal,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(TrecipeCard);
