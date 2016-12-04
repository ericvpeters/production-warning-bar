import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import WarningBarOptions from './components/warningBarOptions.jsx';

injectTapEventPlugin();

class WarningOptions extends React.Component {

    render() {
        return (
        <WarningBarOptions>
        </WarningBarOptions>
        );
    }
}

class MainPage extends React.Component {
    render() {
        return (
                <div>
                    <AppBar
                    title="Enhanced Warning Production Bar"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                    <WarningOptions/>
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