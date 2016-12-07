import React from 'react';
import AppBar from 'material-ui/AppBar';

class WarningBar extends React.Component {

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
