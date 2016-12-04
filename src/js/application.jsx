import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import { ChromePicker } from 'react-color';

injectTapEventPlugin();

class MenuBarOptions extends React.Component {

   constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
       this.handleExpandChange = this.handleExpandChange.bind(this);
       this.handleToggle = this.handleToggle.bind(this);

   }

    handleExpandChange (expanded) {
        this.setState({expanded: expanded});
    }

    handleToggle (event, toggle) {
        this.setState({expanded: toggle});
    }

    render() {

        return (
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
            <CardHeader
                title="Warning bar options"
                subtitle="Set custom configuration for the warning bar"
                avatar="../img/svg/application-info.svg"
                actAsExpander={true}
                showExpandableButton={false}
            />
            <CardText>
                <Toggle
                    toggled={this.state.expanded}
                    onToggle={this.handleToggle}
                    labelPosition="right"
                    label="Enable"
                />
            </CardText>
            <CardText expandable={true}>
                <TextField
                    hintText="Default message"
                    floatingLabelText="Warning message"
                    floatingLabelFixed={false}
                />
                <ChromePicker/>
            </CardText>
        </Card>
        );
    }
}


class WarningOptions extends React.Component {

    render() {
        return (
        <MenuBarOptions>
        </MenuBarOptions>
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