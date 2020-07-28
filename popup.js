// Update the relevant fields with the new data.
var getSenderAddr = function(info) {
    console.log(info);
    document.getElementById('emailSender').innerText = info.senderAddr;
  };
  
 window.addEventListener('DOMContentLoaded', function(){
     console.log("from popup.js");
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id,
          {from: 'popup', subject: 'EmailSender'},
          getSenderAddr);
    });
  });