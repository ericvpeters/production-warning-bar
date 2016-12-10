import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { StickyContainer, Sticky } from 'react-sticky';

import WarningBarPreferences from './warningBarPreferences.jsx';
import DomainListContainer from '../containers/domainListContainer.jsx';
import ModalPreferences from '../containers/modalPreferences.jsx';
import WebFilterPreferences from '../containers/webFilterPreferences.jsx';

import { savePreferences } from '../actions/actionsType'

class Preferences extends React.Component {
    render() {
        const stickyStyle = { zIndex: 2147483647 }
        return (
            <StickyContainer>
                <Sticky stickyStyle={ stickyStyle }>
                    <AppBar title="Enhanced Warning Production Bar"
                        iconElementRight={ <FlatButton label="Save"
                                    onClick={ (event) => {
                                             event.preventDefault();
                                             this.props.onSaveClick();
                                           }}/> }
                    />
                </Sticky>
                <WarningBarPreferences />
                <ModalPreferences />
                <WebFilterPreferences />
                <DomainListContainer />
            </StickyContainer>
        );
    }
}

Preferences.propTypes = {
    onSaveClick: React.PropTypes.func.isRequired
};

const mapStateToProps = () => ({ });

const mapDispatchToProps = (dispatch) => ({
        onSaveClick: () => {
            dispatch(savePreferences());
        }
    });


const PreferencesPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Preferences);


export default PreferencesPage;
