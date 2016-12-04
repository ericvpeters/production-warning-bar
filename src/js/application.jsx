import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardTitle, CardText, CardActions} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import ColorPicker from './components/colorPicker.jsx'
import WarningBar from './components/warningBar.jsx'

injectTapEventPlugin();

class WarningBarOptions extends React.Component {

   constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            warningMessage: "Warning Message",
            barColor: "#ff0000"
        };
       this.handleExpandChange = this.handleExpandChange.bind(this);
       this.handleToggle = this.handleToggle.bind(this);
       this.handleColorChange = this.handleColorChange.bind(this);
       this.hanldeWarningMessageChange = this.hanldeWarningMessageChange.bind(this);

   }

    handleExpandChange (expanded) {
        this.setState({expanded: expanded});
    }

    handleToggle (event, toggle) {
        this.setState({expanded: toggle});
    }
    handleColorChange (color) {
        this.setState({
            barColor: color
        });
    }

    hanldeWarningMessageChange (event) {
        this.setState({ warningMessage: event.target.value });
    }

    render() {

        const barStyle = {
            'backgroundColor': this.state.barColor
        };

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
                    labelPosition="left"
                    label="Enable"
                />
            </CardText>
            <CardActions expandable= { true }>
                <WarningBar title={ this.state.warningMessage }
                            style={ barStyle }
                ></WarningBar>
            </CardActions>
            <CardText expandable={true}>
                <TextField
                    hintText="Default message"
                    floatingLabelText="Warning message"
                    floatingLabelFixed={false}
                    onChange={ this.hanldeWarningMessageChange }
                />
                <ColorPicker onColorChange={ this.handleColorChange }></ColorPicker>
            </CardText>
        </Card>
        );
    }
}


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