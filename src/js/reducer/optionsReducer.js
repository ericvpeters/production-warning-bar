import PreferencesManager from '../utils/preferences';

class Preferences {
    constructor(values, oldOptions = {
            enableWarningBar: false,
            barPosition: 'top',
            domains: '*.gnu.org',
            barColor: '#FF0000',
            barText: 'In Production Environment from Save preferences',
            showModal: true,
            filter: 'none'
    }) {
        Object.assign(this, oldOptions, values);
    }

    setWarningBarMessage(message) {
        return new Preferences({ barText: message }, this);
    }
    setWarningBarColor(color) {
        return new Preferences({ barColor: color }, this);
    }

    setEnableWarningBar(enable) {
        return new Preferences({ enableWarningBar: enable }, this);
    }
}

export default (options = new Preferences(), action) => {
    switch (action.type) {
        case 'LOAD_PREFERENCES':
            return new Preferences(action.preferences);
        case 'CHANGE_WARNING_BAR_MESSAGE':
            return options.setWarningBarMessage(action.message);
        case 'SAVE_PREFERENCES':
            PreferencesManager.INSTANCE().savePreferences(new Preferences({}, options));
            return options;
        case 'CHANGE_WARNING_BAR_COLOR':
            return options.setWarningBarColor(action.color);
        case 'ENABLE_WARNING_BAR':
            return options.setEnableWarningBar(action.enable);
        default:
            return options;
    }
}