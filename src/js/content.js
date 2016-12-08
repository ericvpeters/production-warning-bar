import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import WarningBar from './components/warningBar.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PreferencesManager from './utils/preferences.js'

injectTapEventPlugin();

let instance = null;

class Content {

    constructor() {
        if(!instance){
            instance = this;
        }
        return instance;
    }

    execute() {
        //Get the stored values
        PreferencesManager.INSTANCE().loadPreferences(this.loadWarningComponents);
    }

    loadWarningComponents(items) {
        var noMatch = true;

        //loop through domains and see if current domain is part of list
        for (var key in items.domainList) {
            let domain = items.domainList[key];
            //replace * with javascript regular expression equivalent
            domain = domain.replace("*", "[A-z0-9]*");
            let regex = new RegExp("^" + domain + "$");
            //check if current domain matches regular expression. noMatch varialble ensures that the bar
            //is only added once

            if (document.domain.search(regex) >= 0 && noMatch) {

                if (items.enableWarningBar) {
                    let blankSpace = Content.createHTMLElement('<div id="production-warning-blank-space"/>');
                    document.body.insertBefore(blankSpace, document.body.firstChild);
                    //create warning bar
                    let html = '<div id="production-warning-all" style="position: fixed !important; ' +
                        'left: 0 !important; width: 100% !important; top: 0 !important; z-index: 2147483647 !important"/>';
                    let container = Content.createHTMLElement(html);
                    document.body.insertBefore(container, document.body.firstChild);

                    let productionWarningBar = document.getElementById('production-warning-all');
                    const barStyle = {
                        'backgroundColor': items.barColor
                    };

                    ReactDOM.render(
                        <MuiThemeProvider>
                            <WarningBar title={ items.barText } style={ barStyle }/>
                        </MuiThemeProvider>, productionWarningBar);
                    document.getElementById('production-warning-blank-space').setAttribute('style', `height: ${productionWarningBar.clientHeight}px`);
                }
                //make sure only one bar is made
                noMatch = false;
            }
        }
    }

    /* Creates a new html edit form a string. Got this from stackoverflow
     * @link http://stackoverflow.com/questions/814564/inserting-html-elements-with-javascript
     * @param {string} htmlStr the string to make into html element
     * @returns {DocumentFragment} DOM element
     */
    static createHTMLElement(htmlStr) {
        let frag = document.createDocumentFragment(),
            temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        return frag;
    }
}

let content = new Content();
content.execute();