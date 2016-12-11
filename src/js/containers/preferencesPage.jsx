import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { StickyContainer, Sticky } from 'react-sticky';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey400 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import ContentAdd from 'material-ui/svg-icons/content/add';

import WarningBarPreferences from './warningBarPreferences.jsx';
import DomainListContainer from '../containers/domainListContainer.jsx';
import ModalPreferences from '../containers/modalPreferences.jsx';
import WebFilterPreferences from '../containers/webFilterPreferences.jsx';

import { savePreferences, addEnvironment, removeEnvironment, changeEnvironment } from '../actions/actionsType'

class Preferences extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDrawer: false,
            showNewEnvironmentDialog: false,
            newEnvironment: ""
        };
    }

    createListItems(items) {
        var listItems = [];
        const iconButtonElement =
                <IconButton
                    touch={true}
                    tooltip="more"
                    tooltipPosition="bottom-left"
                >
                    <MoreVertIcon color={grey400}/>
                </IconButton>
            ;

        items.forEach((item) => {
            listItems.push(<MenuItem
                key={ item }
                rightIconButton={ <IconMenu iconButtonElement={iconButtonElement}>
                                        <MenuItem disabled={ true } onClick={ () => {

                                                    }
                                         }>Edit</MenuItem>
                                        <MenuItem onClick={ () => {
                                                    this.props.onDeleteEnvironment(item);
                                                }
                                        }>Delete</MenuItem>
                                    </IconMenu>
                        }
                primaryText={ item }
                onClick={ () => { this.props.onChangeEnvironment(item); } }
            />);
            listItems.push(<Divider key={ `divider-${item}` } inset={true}/>);
        });

        return listItems;
    }

    render() {
        const stickyStyle = { zIndex: 1101 };
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={ () => {
                        this.setState({ showNewEnvironmentDialog: false });
                    } }
            />,
            <FlatButton
                label="Submit"
                primary={ true }
                disabled={ this.state.newEnvironment.trim().length === 0 }
                onTouchTap={() => {
                        this.props.onNewEnvironment( this.state.newEnvironment );
                        this.setState({ showNewEnvironmentDialog: false });
                     }
                 }
            />
        ];
        const listItems = this.createListItems(this.props.environments);

        return (
            <div>
                <StickyContainer>
                    <Sticky stickyStyle={ stickyStyle }>
                        <AppBar title={ `Enhanced Warning Production Bar - ${this.props.currentEnvironment}` }
                                iconElementRight={ <FlatButton label="Save"
                                        onClick={ (event) => {
                                                 event.preventDefault();
                                                 this.props.onSaveClick();
                                               }}/> }
                                iconElementLeft={ <IconButton label="Menu"
                                        onClick={ () => {
                                                 this.setState({ showDrawer: true});
                                               }}>
                                                <NavigationMenu/>
                                               </IconButton> }
                        />
                    </Sticky>
                    <WarningBarPreferences />
                    <ModalPreferences />
                    <WebFilterPreferences />
                    <DomainListContainer />
                </StickyContainer>
                <Drawer open={ this.state.showDrawer } >
                    <AppBar title="Environments"
                            iconElementLeft={ <div/> }
                            iconElementRight={ <IconButton label="Menu"
                                onClick={ () => {
                                         this.setState({ showDrawer: false });
                                        }
                                }>
                                    <NavigationClose/>
                                </IconButton>
                            }
                    />
                    { listItems }
                    <MenuItem rightIcon={ <ContentAdd/> }
                        onClick={ () => { this.setState ( { showNewEnvironmentDialog: true }); } }>New context</MenuItem>
                    <Dialog
                        title="Add new environment"
                        actions={actions}
                        modal={true}
                        open={this.state.showNewEnvironmentDialog}
                    >
                        <TextField
                            id="text-field-controlled"
                            value={ this.state.newEnvironment }
                            onChange={ (event) => {
                                        this.setState({ newEnvironment: event.target.value } );
                                    }
                                }
                        />
                    </Dialog>
                </Drawer>
            </div>
        );
    }
}

Preferences.propTypes = {
    onSaveClick: React.PropTypes.func.isRequired,
    onNewEnvironment: React.PropTypes.func.isRequired,
    environments: React.PropTypes.array.isRequired,
    currentEnvironment: React.PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    environments: state.environments,
    currentEnvironment: state.currentEnvironment
});

const mapDispatchToProps = (dispatch) => ({
        onSaveClick: () => {
            dispatch(savePreferences());
        },
        onNewEnvironment: (name) => {
            dispatch(addEnvironment(name));
        },
        onDeleteEnvironment: (name) => {
            dispatch(removeEnvironment(name));
        },
        onChangeEnvironment: (name) => {
            dispatch(changeEnvironment(name));
        }
    });


const PreferencesPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Preferences);


export default PreferencesPage;
