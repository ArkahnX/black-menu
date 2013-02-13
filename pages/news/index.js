window.addEventListener("DOMContentLoaded", init);

function init() {
	loadIframe();
	localization(); //from main.js
	loadLinksSections(); //from main.js
	setTitle();
	};
	
function setTitle() {
	document.getElementById("title").innerText = "Black Menu - " + chrome.i18n.getMessage("msg6");
	};

function loadIframe() {
	document.querySelector("iframe").src =  gadgetDomain + "news_v" + 124 + ".xml&lang="+ browserLang + "&up_show_image=" + localStorage.getItem("prefNewsImages") + "&" + localStorage.getItem("prefNewsItems") + "&" + localStorage.getItem("prefNewsEdition") + "&extensionId=" + extensionId + "&" + localStorage.getItem("prefNewsSections") + "&" + localStorage.getItem("prefNewsSectionsCustom");
	};