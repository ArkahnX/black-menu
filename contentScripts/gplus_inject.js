document.body.innerHTML = '';
document.title = "Google Plus";
var config = {};


var styles = document.styleSheets, len = styles.length;
while(len){
    var sheet = styles[--len], rules = sheet.cssRules;
    if(rules){
      var rlength = rules.length;
      while(rlength) sheet.deleteRule(--rlength);
    }
}

function send(json, arg){
    var script = document.createElement('script');
    script.innerHTML = 'frame.'+json+'('+JSON.stringify(arg)+')';
    //'frames[0].postMessage('+JSON.stringify(JSON.stringify(json))+',"https://plus.google.com");';
    document.body.appendChild(script);
    document.body.removeChild(script);
    //frames[0].postMessage(JSON.stringify(json), 'https://plus.google.com');
}

function showSharebox(){
    hideWidgets()
    //send({"s":"onShowShareboxOnly","f":"..","c":0,"a":["",{}]})
    send('onShowShareboxOnly', {maxWidgetHeight:600, isExtension:true});
}

function showNotifications(){
    hideWidgets();
    send('onShowNotificationsOnly', {maxWidgetHeight:600, isExtension:true});
    //hideWidgets()
    //send({"s":"onShowNotificationsOnly","f":"..","c":0,"a":["",{"maxWidgetHeight":config.target_height}],"t":"86208861","l":false,"g":true,"r":".."})
}

function hideWidgets(){
    send('onHide');
    //send({"s":"onHide","f":"..","c":0,"a":["",{}]})
}

var container = document.createElement('div');
container.id = 'notifications-target';
container.style.position = 'absolute';
container.style.top = '0';
container.style.left = '0';
container.style.width = "100%";
container.style.overflow = "hidden";
document.body.appendChild(container)

var comm = document.createElement('div');
comm.id = 'comm';
comm.style.display = 'none';
document.body.appendChild(comm)
comm.addEventListener('SurplusCoreEvent', function(){
    var j = (JSON.parse(comm.innerText));
    if(j.name == 'height'){
        var h = Math.max(parseInt(j.height), 400);
        container.style.height = "100%";
    }
})

var s = document.createElement('script');
s.src = chrome.extension.getURL("contentScripts/gplus_core.js");
document.body.appendChild(s);


var s = document.createElement('script');
s.src = 'https://apis.google.com/js/plusone.js?onload=onPlusOneLoaded_&googleapis=1';
document.body.appendChild(s);


var css = ""; 
	css += "iframe {\nheight: 100% !important;\n}\n";
	GM_addStyle(css);
	
	