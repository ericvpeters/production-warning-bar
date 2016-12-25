import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class WarningModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: true };
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        const actions = [
            <FlatButton
                label="Accept"
                primary={ true }
                keyboardFocused={ true }
                onTouchTap={ this.handleClose }
            />
        ];
        const style = {
            zIndex: 2147483647
        };

        return (
        <Dialog
            title="Warning you are in production"
            actions={ actions }
            modal={ false }
            open={ this.state.open }
            onRequestClose={ this.handleClose }
            style={ style }
        >
            You are in production. Be aware that your actions have an effect on the system!
        </Dialog>
        );
    }
}

export default WarningModal;