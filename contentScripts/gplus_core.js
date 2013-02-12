var gadgetState = "sharebox";
var urlVariables = JSON.parse('{"' + decodeURI(window.location.search.split("?")[1].replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
var comm = document.getElementById('comm');
var customEvent = document.createEvent('Event');
customEvent.initEvent('SurplusCoreEvent', true, true);

function send(data) {
    comm.innerText = JSON.stringify(data);
    comm.dispatchEvent(customEvent);
}

function check() {
    if (typeof iframes == 'undefined') return setTimeout(check, 100);
    setUpMain();
}

check();

if(urlVariables["page"] == "notifications"){
	gadgetState = "notifications";
	}
	
function setUpMain() {
    iframes.setHandler("iframe-style", {
        onOpen: function (c) {
            c.openInto('notifications-target');
        },
        onReady: function (a) {
            frame.onShowShareboxOnly()
            //d && i.a.Iframe.K(a, "onShowNotificationsOnly", {maxWidgetHeight:600, isExtension:b})
        },
        onClose: function (a) {
        }
    })
	
    frame = iframes.open("https://plus.google.com/u/0/_/notifications/frame?page="+ gadgetState + "&blackMenu=inner#pid=gpnext", {style: "iframe-style"
    }, {
        sourceid: "gpnext",
        origin: window.location.origin
    }, {
        setNotificationWidgetHeight: function (c) {
            send({
                name: "height",
                height: "100%"
            })
        },
        setNotificationText: function (c, d) {
            send({
                name: "text"
            })
        },
        hideNotificationWidget: function () {
            frame.onHide();
            frame.onShowNotificationsOnly();
        },
        onInfo: function (c) {
        }
    }, function () {});
}
