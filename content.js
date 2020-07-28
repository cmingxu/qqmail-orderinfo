///////////////////// const /////////////////////

var senderAddrDomID = "tipFromAddr_readmail";
var defaultEmail = "cming.xu@gmail.com";

/////////////////////////////////////////////////
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    // First, validate the message's structure.
    if ((msg.from === 'popup') && (msg.subject === 'EmailSender')) {
        // Collect the necessary data. 
        // (For your specific requirements `document.querySelectorAll(...)`
        //  should be equivalent to jquery's `$(...)`.)

        var iframe = document.getElementById("mainFrame");
        var senderAddrDom = iframe.contentWindow.document.getElementById("tipFromAddr_readmail");

        // Directly respond to the sender (popup), 
        // through the specified callback.
        if (senderAddrDom != null) {
            var senderAddr = senderAddrDom.innerText.replace(" ", "").replace(">", "").replace("<", ""); 
            response({
                senderAddr: senderAddr
            });
        }
    }
});

console.log("from qq mail content");
chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction',
});

var panelHTML = "" + 
"<div id='orderPanel'>" +
    "<div class='orderPanelHeader column'>" +
    "header" + 
    "</div>" +

    "<div class='orderPanelBody'>" +
        "<div id='emailAddr'>cming.xu@gmail.com</div>"
    "</div>" +

    "<div class='orderPanelFooter column'>" +
    "footer" + 
    "</div>" +

"</div>";

function insertOrderPanel() {
    console.log("insertOrderPanel");

    var panelWrapper = document.createElement("div");
    panelWrapper.innerHTML = panelHTML;
    document.body.appendChild(panelWrapper);

    var panel = document.getElementById("orderPanel");
    var email = document.getElementById("emailAddr");
    var iframe = document.getElementById("mainFrame");
    iframe.onload = function() {
        console.log("iframe onload")
        var senderAddrDom = iframe.contentWindow.document.getElementById(senderAddrDomID);
        console.log(senderAddrDom);
        if(senderAddrDom) {
            email.innerText = senderAddrDom.innerText.replace(">", "").replace("<", "");
            panel.style.right = "0px";
        }else{
            email.innerText = defaultEmail;
            panel.style.right = "-250px";
        }
    }
}

insertOrderPanel();