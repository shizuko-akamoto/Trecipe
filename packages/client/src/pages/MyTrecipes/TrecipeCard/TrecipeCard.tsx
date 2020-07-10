import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './trecipeCard.scss';
import { CardMenu } from '../../../components/CardMenu/CardMenu';
import { MenuItem } from '../../../components/Menu/Menu';
import { ProgressBar } from '../../../components/ProgressBar/ProgressBar';
import { bindActionCreators, Dispatch } from 'redux';
import { createTrecipeRequest, deleteTrecipeRequest } from '../../../redux/TrecipeList/action';
import { connect } from 'react-redux';
import { TrecipeModel } from '../../../redux/TrecipeList/types';
import { showModal } from '../../../redux/Modal/action';
import TrecipePopup, { TrecipePopupType } from '../../../components/TrecipePopup/TrecipePopup';
import { baseURL } from '../../../api';

type TCProps = TrecipeModel & ReturnType<typeof mapDispatchToProps>;

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
            <TrecipePopup type={TrecipePopupType.Edit} trecipeId={this.props.id} />
        );
    };

    private duplicateTrecipe = () => {
        // copying everything except for id
        const { name, description, isPrivate } = this.props;
        this.props.createNewTrecipe({ name: name, description: description, isPrivate: isPrivate });
    };

    private deleteTrecipe = () => {
        this.props.deleteTrecipe(this.props.id);
    };

    private onTCEditClick(e: React.MouseEvent) {
        // needed to prevent link redirection to Trecipe page on TC click
        e.preventDefault();
    }

    render() {
        return (
            <div className="trecipeCard">
                <div
                    className="tcHeaderContainer"
                    style={{
                        backgroundImage: this.props.image
                            ? `url(${baseURL}upload/${this.props.image})`
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
                        <div className="tcDate">{this.props.date.toLocaleString()}</div>
                        <div className="tcAuthor">by: {this.props.owner}</div>
                    </div>
                    <div className="tcDescription">
                        <p>{this.props.description}</p>
                    </div>
                </div>
                <ProgressBar
                    total={this.props.destinations.length}
                    completed={this.props.completed.size}
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
            showModal,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(TrecipeCard);
