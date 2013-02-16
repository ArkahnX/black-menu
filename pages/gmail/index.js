var gmailInput = "";

window.addEventListener("DOMContentLoaded", init);

function init() {
	loadIframe();
	gmailGadgetMessageListener();
	gmailSearchFilters();
	localization(); //from main.js
	loadLinksSections(); //from main.js
	setTitle();
	};
	
function setTitle() {
	document.getElementById("title").innerText = "Black Menu - " + chrome.i18n.getMessage("msg7");
	};

function loadIframe() {
	document.querySelector("iframe").src = "https://mail.google.com/mail/mu/mp/?mui=blackMenu;panel=" + localStorage.getItem("prefGmailCompose") + "&hl=" + browserLang;
	};
	
function gmailCompose(){
	if(localStorage.getItem("prefGmailCompose") == "true"){
		chrome.windows.create({ url: "https://mail.google.com/mail?view=cm&tf=0", focused: true, width: 500, height: 516, type: 'panel'});
		if(window.location.href.split("?")[1]!="popup"){ window.close();}
		}
	else{
		window.open('https://mail.google.com/mail/#compose')
		}
	};

function popupGmailClose() {
	document.getElementById("popupSettingsGmailVacationResponder").dataset.state = "off";
	};
	
function setInput(value) {
	gmailInput = value;
	};
		
function gmailGadgetMessageListener(){
	chrome.extension.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.gmail == "compose"){
				sendResponse({farewell: gmailCompose()});
				};
			if (request.gmail == "closeSettings"){
				sendResponse({farewell: popupGmailClose()});
				};
			if (request.inputValue){
				sendResponse({farewell: setInput(encodeURIComponent(request.inputValue))});
				};
			}
		);
	};	
	
function gmailSearchFilters() {
		var searchFiltersFilters = document.getElementById("gmailSearchFilters").getElementsByTagName("li");
		for (var i = searchFiltersFilters.length; i--; i> 0) {
			searchFiltersFilters[i].addEventListener("click", function() {
				if (gmailInput.length > 0) {
					window.open(this.dataset.search.replace("[browserLang]",browserLang).replace("[query]",gmailInput))
					}
				else{
					window.open(this.dataset.link.replace("[browserLang]",browserLang))
					};
				});
			};
		};