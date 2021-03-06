/**
 * Checks list of domains and if current domain matches, display the 
 * warning bar
 */
(function() {
    //Get the stored values
    chrome.storage.sync.get({
        barPosition: 'top',
        domains: '',
        barColor: 'FF0000',
        barText: 'In Production Environment'
    }, function(items) {
        //get domain array
        var domains = items.domains.split("\n");
        var noMatch = true;
        
        //loop through domains and see if current domain is part of list
        for (var key in domains) {
            var domain = domains[key].replace(' ', '');
            //replace * with javascript regular expression equivalent
            domain = domain.replace("*", "[A-z0-9]*");
            var regex = new RegExp("^" + domain + "$");
            //check if current domain matches regular expression. noMatch varialble ensures that the bar
            //is only added once
            if (document.domain.search(regex) >= 0 && noMatch) {
                //the html string of the bar to add
                var html = '<div id="production-warning-all"><div id="production-warning-bar" style="color:black;'
                        + 'z-index:9999; width:100%; height:20px; background-color:#' + items.barColor + '; position: fixed; ' + items.barPosition + ': 0px;'
                        + '	text-align:center;font-size:12px; '
                        + 'font-weight:bold; font-family: \'Helvetica Neue\', Helvetica, Arial, Verdana, sans-serif;">'
                        + items.barText + '<a href="#" id="production-warning-close"><sup>[X]</sup></a></div></div>';
                
                //create warning bar
                var container = create(html);
                document.body.appendChild(container);
                document.getElementById('production-warning-close').onclick = closeWarningBar;
                //make sure only one bar is made
                noMatch = false;
            }
        }
    });
    /**
     * Close the warning bar
     */
    function closeWarningBar() {
        var elem = document.getElementById('production-warning-all');
        elem.parentNode.removeChild(elem);
        return false;
    }
    /**
     * Creates a new html edit form a string. Got this from stackoverflow
     * @link http://stackoverflow.com/questions/814564/inserting-html-elements-with-javascript
     * @param {string} htmlStr the string to make into html element
     * @returns {DocumentFragment} DOM element
     */
    function create(htmlStr) {
        var frag = document.createDocumentFragment(),
                temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        return frag;
    }
})();