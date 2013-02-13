var gmailInput = "";

window.addEventListener("DOMContentLoaded", init);

function init() {
	loadIframe();
	localization(); //from main.js
	loadLinksSections(); //from main.js
	setTitle();
	};
	
function setTitle() {
	document.getElementById("title").innerText = "Black Menu - " + chrome.i18n.getMessage("msg3");
	};

function loadIframe() {
	document.querySelector("iframe").src = gadgetDomain + "maps_v" + 159 + ".xml&lang=" + browserLang + "&placeholder=" + chrome.i18n.getMessage("pmsg7")+  "&" + localStorage.getItem("prefMapsMaptype") + "&up_location=" + localStorage.getItem("prefMapsLocation") + "&up_trafficMode=" + localStorage.getItem("prefMapsTraffic") + "&extensionId=" + extensionId + "&instant=" + localStorage.getItem("prefMapsInstant");
	};