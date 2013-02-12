var chromeLang = window.navigator.language;	
var extensionId = chrome.i18n.getMessage("@@extension_id");
var gadgetDomain = "https://www-gadget-opensocial.googleusercontent.com/gadgets/ifr?url=https://black-menu.googlecode.com/files/";	
var service = location.hash.split("#")[1];

window.addEventListener("load", init);

function init(){
	setTitle();
	setIcon();
	loadIframe();
	};

function setTitle() {
	var serviceMsgId = {
		Translate: 2,
		Maps: 3,
		Youtube: 5,
		News: 6,
		Reader: 144,
		Gmail: 7,
		Drive: 8,
		Calendar: 9,
		Tasks: 109, 
		Gplus: 1,
		};
	document.getElementById("title").innerText = chrome.i18n.getMessage("msg" + serviceMsgId[service]);
	};
	
function setIcon() {
	document.getElementById("favicon").href = "images/" + service.toLowerCase() + "-16.png";
	}
		
function loadIframe(){
	var iframeSrc = {
		Translate: gadgetDomain + "translate_v" + 109 + ".xml&parent=google.com&up_sl=auto&lang=" + chromeLang + "&placeholder=" + chrome.i18n.getMessage("pmsg6") + "&" + localStorage.getItem("prefTranslateTarget") + "&" + localStorage.getItem("prefTranslateSource") + "&extensionId=" + extensionId,
		Maps: gadgetDomain + "maps_v" + 159 + ".xml&lang=" + chromeLang + "&placeholder=" + chrome.i18n.getMessage("pmsg7")+  "&" + localStorage.getItem("prefMapsMaptype") + "&up_location=" + localStorage.getItem("prefMapsLocation") + "&up_trafficMode=" + localStorage.getItem("prefMapsTraffic") + "&extensionId=" + extensionId + "&instant=" + localStorage.getItem("prefMapsInstant"),
		Youtube: gadgetDomain + "youtube_v" + 150 + ".xml&lang=" + chromeLang + "&placeholder=" + chrome.i18n.getMessage("pmsg8") + "&extensionId=" + extensionId + "&instant=" + localStorage.getItem("prefYoutubeInstant"),
		News: gadgetDomain + "news_v" + 124 + ".xml&lang="+ chromeLang + "&up_show_image=" + localStorage.getItem("prefNewsImages") + "&" + localStorage.getItem("prefNewsItems") + "&" + localStorage.getItem("prefNewsEdition") + "&extensionId=" + extensionId + "&" + localStorage.getItem("prefNewsSections") + "&" + localStorage.getItem("prefNewsSectionsCustom"),
		Reader: "https://www.google.com/reader/igoogle-module?hl=" + chromeLang + "&markAsRead=" + localStorage.getItem("prefReaderMarkasread"),
		Gmail: "https://mail.google.com/mail/mu/mp/441/?mui=blackMenu;panel=" + localStorage.getItem("prefGmailCompose") + "&hl=" + chromeLang,
		Drive: "https://docs.google.com/API/IGoogle?libs=2cT9GVm7Okc/lib/libcore.js&up_viewPreference=opened_by_me" + "&" + localStorage.getItem("prefDriveView"),
		Calendar: "https://www.google.com/calendar/ig?hl=" + chromeLang + "&up_showEmptyDays=" + localStorage.getItem("prefCalendarEmptydays"),
		Tasks: "https://www.google.com/blackmenu/tasks/"+ Date() + "/?hl=" + chromeLang, 
		Gplus: "https://www.google.com/blackmenu/gplus/"+ Date() + "/?extension=blackMenu&page=notifications",
		};
	document.getElementById("iframe").src=iframeSrc[service];
	};