import React from 'react';
import AppBar from 'material-ui/AppBar';

class WarningBar extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <AppBar
                title= { this.props.title }
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                style={ this.props.style }
            />
        );
    }
}

export default WarningBar;
