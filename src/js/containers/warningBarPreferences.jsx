import { connect } from 'react-redux';
import WarningBarOptions from '../components/warningBarOptions.jsx';
import { changeWarningBarColor, changeWarningBarMessage, enableWarningBar } from '../actions/actionsType'



const mapStateToProps = (state, ownProps) => {
    return {
        barColor: state.barColor,
        warningMessage: state.barText,
        enable: state.enableWarningBar
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onMessageChange: (message) => {
            dispatch(changeWarningBarMessage(message));
        },
        onColorChange: (color) => {
            dispatch(changeWarningBarColor(color));
        },
        onBarEnable: (enable) => {
            dispatch(enableWarningBar(enable));
        }
    }
};

const WarningBarPreferences = connect(
    mapStateToProps,
    mapDispatchToProps
)(WarningBarOptions);


export default WarningBarPreferences;
