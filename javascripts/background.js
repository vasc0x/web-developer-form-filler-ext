function getSetsForCurrentUrl(url) {
    var sets = [];

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var settings = JSON.parse(localStorage.getItem(key));

        if (url === settings.url.toLowerCase()) {
            settings.key = key;
            sets.push(settings);
        }
    }

    return sets;
}

function getHotkeys(url) {
    var sets = getSetsForCurrentUrl(url);
    var hotkeys = [];

    for (var i = 0; i < sets.length; i++) {
        if (!sets[i].hotkey) {
            continue;
        }

        hotkeys.push(sets[i].hotkey);
    }

    return hotkeys;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var url = request.url.split('?')[0].toLowerCase();
    var hotkeys = getHotkeys(url);

    switch (request.action) {
        case 'gethotkeys':
            sendResponse(hotkeys);
            break;

        case 'hotkey':
            var sets = getSetsForCurrentUrl(url);
            for (var i = 0; i < sets.length; i++) {
                if (sets[i].hotkey == request.code) {
                    sendResponse(sets[i]);
                }
            }
            break;
    }

    return true;
});