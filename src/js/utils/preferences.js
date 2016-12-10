let instance = null;

class PreferencesManager {

    constructor() {
        if(!instance){
            instance = this;
        }
        return instance;
    }

    static INSTANCE () {
        return new PreferencesManager();
    }

    defaultValues () {
        const values = {
            environments: ['default']
        };
        return values;
    }

    defaultEnvironmentValues() {
        const values = {
            enableWarningBar: false,
            barPosition: 'top',
            barColor: '#ff5063',
            barText: 'In Production Environment',
            enableWarningModal: true,
            filter: 'none',
            domainList: []
        };
        return values;
    }

    loadPreferences(callback) {
       chrome.storage.sync.get( this.defaultValues(), callback);
    }

    loadEnvironment(environment, callback = (items) => {}) {
        const dataToRead = { [environment] : this.defaultEnvironmentValues() };
        chrome.storage.sync.get( environment, callback);
    }

    loadEnvironmentPreferences(environment, callback = (items) => {}) {
        const dataToRead = { [environment] : this.defaultEnvironmentValues() };
        chrome.storage.sync.get( dataToRead[environment], callback);
    }
    
    saveEnvironments(environments, callback = function () {}) {
        chrome.storage.sync.set( { environments: environments }, callback);
    }

    removeEnvironment(environment, callback = () => {}) {
        chrome.storage.sync.remove(environment, callback);
    }

    savePreferences(properties, callback = function () {}) {
        chrome.storage.sync.set( properties, callback);
    }
}

export default PreferencesManager;
