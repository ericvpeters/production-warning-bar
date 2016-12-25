/**
 * Extracted from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
 */

class BrowserDetector {

    getBrowserType() {
        if (this.isChrome()) {
            return "chrome";
        }
        if (this.isFirefox()) {
            return "firefox";
        }

        return "chrome"; //From extension's options, isChrome function does not work
    }

    // Opera 8.0+
    isOpera() {
        return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0
    }

    // Firefox 1.0+
    isFirefox() {
        return typeof InstallTrigger !== 'undefined'
    }

    // Safari 3.0+ "[object HTMLElementConstructor]"
    isSafari() {
        Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 ||
        (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
    }

    // Internet Explorer 6-11
    isIE() {
        return /*@cc_on!@*/false || !!document.documentMode;
    }

    // Edge 20+
    isEdge() {
        return !isIE && !!window.StyleMedia;
    };

    // Chrome 1+
    isChrome() {
        return !!window.chrome && !!window.chrome.webstore;
    }

    // Blink engine detection
    isBlink() {
        return (isChrome || isOpera) && !!window.CSS;
    }
}

export default BrowserDetector;