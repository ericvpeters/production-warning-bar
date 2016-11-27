/**
 * Save optional values to the chrome storage
 */
(function() {
    //get current values with reasonable values
    chrome.storage.sync.get({
        barPosition: 'top',
        domains: '',
        barColor: 'FF0000',
        barText: 'In Production Environment',
        showModal: true
    }, function(items) {
        //autofill the values to the form elements
        document.getElementById('barPosition').value = items.barPosition;
        document.getElementById('domains').value = items.domains;
        document.getElementById('barColor').value = items.barColor;
        document.getElementById('barText').value = items.barText;
        document.getElementById('barColor').style.backgroundColor = "#" + items.barColor;
        document.getElementById('showModal').checked = items.showModal;
    });

    document.getElementById('save').onclick = onSaveClick;

    document.getElementById('barColor').onchange = onBarChange;

    /**
     * save the values to chrome storage
     * @returns {undefined}
     */
    function onSaveClick() {
        var barPosition = document.getElementById('barPosition').value;
        var domains = document.getElementById('domains').value;
        var barColor = document.getElementById('barColor').value;
        var barText = document.getElementById('barText').value;
        var showModal = document.getElementById('showModal').checked;

        chrome.storage.sync.set({
            barPosition: barPosition,
            domains: domains,
            barColor: barColor,
            barText: barText,
            showModal: showModal
        }, function() {
            //close options tab
            chrome.tabs.getCurrent(function(tab) {
                chrome.tabs.remove(tab.id, function() {
                });
            });
        });
    }

    /**
     * change the background color of the color select text box to reflect the hex value change
     */
    function onBarChange() {
        var elem = document.getElementById('barColor');
        var barColor = elem.value;
        console.log(barColor);
        elem.style.backgroundColor = "#" + barColor;
    }
})();
