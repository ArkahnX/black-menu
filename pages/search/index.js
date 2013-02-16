window.addEventListener("load", init); 

function init() {
	localization(); //from main.js
	loadSearchBox(); //from main.js
	loadSearchFilters(); //from main.js
	setTitle();
	};
	
function setTitle() {
	document.getElementById("title").innerText = "Black Menu - " + chrome.i18n.getMessage("msg0");
	};