'use strict';
//global var to save user
var user_action = null;

//receiving message from content script
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.behaviour== 'downvoted') {
        user_action = 'downvoted';
        console.log('downvoted bg');
    }else if(msg.behaviour=='upvoted'){
        user_action = 'upvoted';
       console.log('upvoted bg'); 
    }else if(msg.behaviour=='favourite'){
        user_action = 'favourite';
        console.log('favourite'); 
    }else if(msg.behaviour=='flag'){
        user_action = 'clickflag';
        console.log('clickflag'); 
    }else if(msg.behaviour=='scrolltillend'){
        user_action = 'scrolltillend';
        console.log('scrolltillend'); 
    }else if(msg.behaviour=='answer'){
        user_action = 'reading_answer';
        console.log('answer'); 
    }else if(msg.behaviour=='share'){
        user_action = 'clickshare';
        console.log('clickshare'); 
    }

    console.log(user_action);
    if(user_action!=null)
        savelog();
})

//post request to server
function savelog() {
    console.log('savelog called'); 
    var jax = new XMLHttpRequest();
    jax.open("POST","https://amitasgn1.herokuapp.com/users/action");
    jax.setRequestHeader("Content-Type","application/json");
    jax.send(JSON.stringify({useraction: user_action}));
    jax.onreadystatechange = function() { if(jax.readyState==4) {console.log(jax.responseText); }}
}


