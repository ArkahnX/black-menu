window.addEventListener("DOMContentLoaded", init);

function init() {
	loadIframe();
	localization(); //from main.js
	loadLinksSections(); //from main.js
	loadSearchBox(); //from main.js
	loadSearchFilters(); //from main.js
	setTitle();
	};
	
function setTitle() {
	document.getElementById("title").innerText = "Black Menu - " + chrome.i18n.getMessage("msg1");
	};

function loadIframe() {
	document.querySelector("iframe").src = "https://www.google.com/blackmenu/gplus/"+ Date() + "/?extension=blackMenu&page=notifications";
	};