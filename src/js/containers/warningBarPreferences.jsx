import { connect } from 'react-redux';
import WarningBarOptions from '../components/warningBarOptions.jsx';
import { changeWarningBarColor, changeWarningBarMessage } from '../actions/actionsType'



const mapStateToProps = (state, ownProps) => {
    return {
        barColor: state.barColor,
        warningMessage: state.warningMessage,
        enable: true
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onMessageChange: (message) => {
            console.log("new message: " + message);
            dispatch(changeWarningBarMessage(message));
        },
        onColorChange: (color) => {
            dispatch(changeWarningBarColor(color));
        }
    }
};

const WarningBarPreferences = connect(
    mapStateToProps,
    mapDispatchToProps
)(WarningBarOptions);


export default WarningBarPreferences;
