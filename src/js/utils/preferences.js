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
            barPosition: 'top',
            domains: '*.gnu.org',
            barColor: '#ff5063',
            barText: 'In Production Environment',
            showModal: true,
            filter: 'none'
        };
        return values;
    }

    loadPreferences(callback) {
       chrome.storage.sync.get( this.defaultValues(), callback);
    }

    savePreferences(properties, callback = function () {}) {
        console.log(properties);
        chrome.storage.sync.set( properties, callback);
    }
}

export default PreferencesManager;
