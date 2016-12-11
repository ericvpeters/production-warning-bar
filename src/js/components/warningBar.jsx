import React from 'react';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';

class WarningBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
    }

    render () {
        if (this.state.show) {
            return <AppBar
                title={ this.props.title }
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                style={ this.props.style }
                iconElementLeft={ <IconButton onClick={ () => {
                                                                if (!this.props.disableClose) {
                                                                    this.setState({ show: false });
                                                                    this.props.onClose();
                                                                }
                                                            }
                                                    }
                ><NavigationClose /></IconButton>}
            />;
        }
        return null;
    }
}

WarningBar.propTypes = {
    onClose: React.PropTypes.func,
    disableClose: React.PropTypes.bool
};

WarningBar.defaultProps = {
    onClose: () => { },
    disableClose: false
};

export default WarningBar;
