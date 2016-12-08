import PreferencesManager from '../utils/preferences';

class Preferences {
    constructor(values, oldOptions = {
            enableWarningBar: false,
            barPosition: 'top',
            domains: '*.gnu.org',
            barColor: '#FF0000',
            barText: 'In Production Environment from Save preferences',
            filter: 'none',
            domainList: [],
            enableWarningModal: false
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

    addDomain(domain) {
        if ( this.domainList.indexOf(domain) === -1) {
            let domainListCopy = this.domainList.slice();
            domainListCopy.push(domain);
            return new Preferences({ domainList: domainListCopy }, this);
        }
        return new Preferences({}, this);
    }

    removeDomain(domain) {
        let index = this.domainList.indexOf(domain);
        if (index >= 0) {
            let domainListCopy = this.domainList.slice();
            domainListCopy.splice( index, 1 );
            return new Preferences({ domainList: domainListCopy }, this);
        }
        return new Preferences({}, this);
    }

    modifyDomain(newDomain, oldDomain) {
        let index = this.domainList.indexOf(oldDomain);
        if (index >= 0) {
            let domainListCopy = this.domainList.slice();
            domainListCopy.splice( index, 1 );
            domainListCopy.push(newDomain);
            return new Preferences({ domainList: domainListCopy }, this);
        }
        return new Preferences({}, this);
    }

    setEnableWarningModal(enable) {
        return new Preferences({ enableWarningModal: enable }, this);
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
        case 'ADD_DOMAIN':
            return options.addDomain(action.domain);
        case 'REMOVE_DOMAIN':
            return options.removeDomain(action.domain);
        case 'MODIFY_DOMAIN':
            return options.modifyDomain(action.newDomain, action.oldDomain);
        case 'ENABLE_MODAL':
            return options.setEnableWarningModal(action.enable);
        default:
            return options;
    }
}