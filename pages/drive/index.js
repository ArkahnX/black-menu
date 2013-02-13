window.addEventListener("DOMContentLoaded", init);

function init() {
	loadIframe();
	localization(); //from main.js
	setTitle();
	};
	
function setTitle() {
	document.getElementById("title").innerText = "Black Menu - " + chrome.i18n.getMessage("msg8");
	};

function loadIframe() {
	document.querySelector("iframe").src = "https://docs.google.com/API/IGoogle?libs=2cT9GVm7Okc/lib/libcore.js&up_viewPreference=opened_by_me" + "&" + localStorage.getItem("prefDriveView");
	};