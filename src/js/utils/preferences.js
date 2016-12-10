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
            enableWarningBar: false,
            barPosition: 'top',
            domains: '*.gnu.org',
            barColor: '#ff5063',
            barText: 'In Production Environment',
            enableWarningModal: true,
            filter: 'none',
            domainList: [],
            environments: []
        };
        return values;
    }

    loadPreferences(callback) {
       chrome.storage.sync.get( this.defaultValues(), callback);
    }
    
    saveEnvironments(environments, callback = function () {}) {
        chrome.storage.sync.set( { environments: environments }, callback);
    }

    savePreferences(properties, callback = function () {}) {
        chrome.storage.sync.set( properties, callback);
    }
}

export default PreferencesManager;
