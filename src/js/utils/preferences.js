import BrowserDetector from './browserDetector'

class PreferencesManager {

    constructor(type) {
        return Object.create(this.supportedBrowsers()[type]);
    }

    static INSTANCE () {
        let browserDetector = new BrowserDetector();
        let browserType = browserDetector.getBrowserType();
        return new PreferencesManager(browserType);
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
            domainList: [],
            easterEgg: false
        };
        return values;
    }

    supportedBrowsers() {
        return {
            chrome: {
                loadPreferences: (callback) => {
                    chrome.storage.sync.get(this.defaultValues(), callback);
                },

                loadEnvironment: (environment, callback = () => {
                }) => {
                    chrome.storage.sync.get(environment, callback);
                },

                loadEnvironmentPreferences: (environment, callback = () => {
                }) => {
                    const dataToRead = {[environment]: this.defaultEnvironmentValues()};
                    chrome.storage.sync.get(dataToRead[environment], callback);
                },

                saveEnvironments: (environments, callback = function () {
                }) => {
                    chrome.storage.sync.set({environments: environments}, callback);
                },

                removeEnvironment: (environment, callback = () => {
                }) => {
                    chrome.storage.sync.remove(environment, callback);
                },

                savePreferences: (properties, callback = function () {
                }) => {
                    chrome.storage.sync.set(properties, callback);
                }
            },
            firefox: {
                loadPreferences: (callback) => {
                    browser.storage.local.get(this.defaultValues())
                        .then(callback, () => {
                            console.error("Error loading preferences")
                        });
                },

                loadEnvironment: (environment, callback = () => {}) => {
                    browser.storage.local.get(environment)
                        .then(callback, () => {
                            console.error("Error loading environment")
                        });
                },

                loadEnvironmentPreferences: (environment, callback = () => {}) => {
                    const dataToRead = {[environment]: this.defaultEnvironmentValues()};
                    browser.storage.local.get(dataToRead[environment])
                        .then(callback, () => {
                            console.error("Error loading environment preferences");
                        });
                },

                saveEnvironments: (environments, callback = function () {}) => {
                    browser.storage.local.set({environments: environments})
                        .then(callback, () => {
                            console.error("Error saving enviroments");
                        });
                },

                removeEnvironment: (environment, callback = () => {
                }) => {
                    browser.storage.local.set(environment)
                        .then(callback, () => {
                            console.error("Error removing enviroment");
                        });
                },

                savePreferences: (properties, callback = function () {
                }) => {
                    browser.storage.local.set(properties)
                        .then(callback, () => {
                            console.error("Error removing enviroment");
                        });
                }
            }
        };
    }


}

export default PreferencesManager;
