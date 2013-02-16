window.addEventListener("DOMContentLoaded", init);

function init() {
	loadIframe();
	localization(); //from main.js
	loadLinksSections(); //from main.js
	setTitle();
	};
	
function setTitle() {
	document.getElementById("title").innerText = "Black Menu - " + chrome.i18n.getMessage("msg5");
	};

function loadIframe() {
	document.querySelector("iframe").src = gadgetDomain + "youtube_v" + 150 + ".xml&lang=" + browserLang + "&placeholder=" + chrome.i18n.getMessage("pmsg8") + "&extensionId=" + extensionId + "&instant=" + localStorage.getItem("prefYoutubeInstant");
	};