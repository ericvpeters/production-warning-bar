import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PreferencesPage from './containers/preferencesPage.jsx';

import optionsReducer from './reducer/optionsReducer';

injectTapEventPlugin()

const store = createStore(optionsReducer);

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

ReactDOM.render(<Application/>, document.getElementById('example'));