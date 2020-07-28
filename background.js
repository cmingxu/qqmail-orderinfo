
chrome.runtime.onMessage.addListener(function (msg, sender) {
    if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
        console.log("from content_script.js")
        chrome.pageAction.show(sender.tab.id);
    }
});