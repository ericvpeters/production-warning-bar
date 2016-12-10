import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PreferencesPage from './containers/preferencesPage.jsx';

import optionsReducer from './reducer/optionsReducer';
import { loadPreferences } from './actions/actionsType';
import PreferencesManager from './utils/preferences.js';
import { loadEnvironmentPreferences } from './actions/actionsType';


injectTapEventPlugin();

const store = createStore(optionsReducer);
let currentEnvironment = "";
store.subscribe(() => {
    let previousEnvironment = currentEnvironment;
    currentEnvironment = store.getState().currentEnvironment;

    if (previousEnvironment !== currentEnvironment) {
        PreferencesManager.INSTANCE().loadEnvironment(currentEnvironment, (items) => {
            store.dispatch(loadEnvironmentPreferences(items));
        });
    }
});

PreferencesManager.INSTANCE().loadPreferences(items => store.dispatch(loadPreferences(items)));

class Application extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <Provider store={ store }>
                    <PreferencesPage></PreferencesPage>
                </Provider>
            </MuiThemeProvider>);
    }
}

ReactDOM.render(<Application/>, document.getElementById('app'));