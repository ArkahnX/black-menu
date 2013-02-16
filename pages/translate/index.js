window.addEventListener("DOMContentLoaded", init);

function init() {
	loadIframe();
	localization(); //from main.js
	loadLinksSections(); //from main.js
	setTitle();
	};
	
function setTitle() {
	document.getElementById("title").innerText = "Black Menu - " + chrome.i18n.getMessage("msg2");
	};

function loadIframe() {
	document.querySelector("iframe").src = gadgetDomain + "translate_v" + 109 + ".xml&parent=google.com&up_sl=auto&lang=" + browserLang + "&placeholder=" + chrome.i18n.getMessage("pmsg6") + "&" + localStorage.getItem("prefTranslateTarget") + "&" + localStorage.getItem("prefTranslateSource") + "&extensionId=" + extensionId;
	};