import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import WarningBarPreferences from './components/warningBarOptions.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import optionsReducer from './reducer/optionsReducer';
import { savePreferences, changeWarningBarColor, changeWarningBarMessage } from './actions/actionsType';

injectTapEventPlugin()

const store = createStore(optionsReducer);

class WarningOptions extends React.Component {

    render() {
        return (
            <Provider store={ store }>
                <WarningBarPreferences/>
            </Provider>
        );
    }
}

class MainPage extends React.Component {
    render() {
        return (
                <div>
                    <AppBar
                    title="Enhanced Warning Production Bar"
                    iconElementRight={ <FlatButton label="Save" onClick={ this.handleOnSaveClick }></FlatButton> }
                    />
                    <WarningOptions />
                </div>
        );
    }
}

class Application extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <MainPage></MainPage>
            </MuiThemeProvider>);
    }
}

ReactDOM.render(<Application/>, document.getElementById('example'));