window.addEventListener("DOMContentLoaded", init);

function init() {
	loadIframe();
	localization(); //from main.js
	loadLinksSections(); //from main.js
	setTitle();
	};
	
function setTitle() {
	document.getElementById("title").innerText = "Black Menu - " + chrome.i18n.getMessage("msg144");
	};

function loadIframe() {
	document.querySelector("iframe").src =  "https://www.google.com/reader/igoogle-module?hl=" + browserLang + "&markAsRead=" + localStorage.getItem("prefReaderMarkasread");
	};