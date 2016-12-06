import PreferencesManager from '../utils/preferences';

class Option {
    constructor(values, oldOptions = {
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
        return new Option({ barText: message }, this);
    }
    setWarningBarColor(color) {
        return new Option({ barColor: color }, this);
    }
}


export default (options = new Option(), action) => {
    console.log(options);
    switch (action.type) {
        case 'LOAD':
            return new Option(options);
        case 'CHANGE_WARNING_BAR_MESSAGE':
            return options.setWarningBarMessage(action.message);
        case 'SAVE_PREFERENCES':
            PreferencesManager.INSTANCE().savePreferences(new Option({}, options));
            return options;
        case 'CHANGE_WARNING_BAR_COLOR':
            return options.setWarningBarColor(action.color);
        default:
            return options;
    }
}