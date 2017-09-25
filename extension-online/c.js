'use strict';

//scroll till end
window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
       console.log('scroll till end');
      chrome.extension.sendMessage({'behaviour':'scrolltillend'});
    }
};

//upvoted
var var1 = document.getElementsByClassName('vote-up-off');
for(var i=0;i<var1.length;i++){
  var1[i].onclick = function() {
    console.log('upvoted');
    chrome.extension.sendMessage({'behaviour':'upvoted'});
  }
};

//downvoted
var var2 = document.getElementsByClassName('vote-down-off');
for(var i=0;i<var2.length;i++){
  var2[i].onclick = function() {
    console.log('downvoted');
    chrome.extension.sendMessage({'behaviour':'downvoted'});
  }
};

//share
var var3 = document.getElementsByClassName('short-link');
  for(var i=0;i<var3.length;i++){
    var3[i].onclick = function() {
    console.log('click share');
    chrome.extension.sendMessage({'behaviour':'share'});
  }
};

//favourite
var var4 = document.getElementsByClassName('star-off');
  for(var i=0;i<var4.length;i++){
    var4[i].onclick = function() {
    console.log('click on favourite');
    chrome.extension.sendMessage({'behaviour':'favourite'});
  }
};

//flag
var var5 = document.getElementsByClassName('flag-post-link');
  for(var i=0;i<var5.length;i++){
    var5[i].onclick = function() {
    console.log('click flag');
    chrome.extension.sendMessage({'behaviour':'flag'});
  }
};

//post-text
var var6 = document.getElementsByClassName('post-text');
  for(var i=0;i<var6.length;i++){
    var6[i].onclick = function() {
    console.log('click on answer');
    chrome.extension.sendMessage({'behaviour':'answer'});
  }
};
