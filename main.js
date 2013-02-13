//==<>==<>====variables=====<>==<>==\\

var browserLang = window.navigator.language;	
var extensionId = chrome.i18n.getMessage("@@extension_id");
var gadgetDomain = "https://www-gadget-opensocial.googleusercontent.com/gadgets/ifr?url=https://black-menu.googlecode.com/files/";

function isKey(key){
	if(event.keyCode==key){
		return true
		}
	else {
		return false
		}
	};
	
function localization(){
	if(chrome.i18n){
		i=0;
		while ((ele=document.querySelectorAll("[data-msg]")[i])!=null){
			if(ele.dataset.msg !== "XXX"){
				var message = chrome.i18n.getMessage("msg" + ele.dataset.msg);
				if(message != "" && message != undefined){
					ele.innerText = message;
					};
				};
			i++;
			}
	
		i=0;
		while ((ele=document.querySelectorAll("[data-pmsg]")[i])!=null){
			if(ele.dataset.pmsg !== "XXX"){
				var message = chrome.i18n.getMessage("pmsg" + ele.dataset.pmsg);
				if(message != undefined){
					ele.setAttribute('placeholder',message);
					};
				};
			i++;
			}
		
		i=0;
		while ((ele=document.querySelectorAll("[data-tmsg]")[i])!=null){
			if(ele.dataset.tmsg !== "XXX"){
				var message = chrome.i18n.getMessage("tmsg" + ele.dataset.tmsg);
				if(message != "" && message != undefined){
					ele.setAttribute('title',message);
					};
				};
			i++;
			}
		};
	};	

function loadSearchBox() {
	document.getElementsByClassName("searchbox")[0].getElementsByTagName("input")[0].addEventListener("keypress", function(e) {
		if (isKey(13)) {
			window.open(this.dataset.prefix + encodeURIComponent(this.value))
			};
		});
	};

function loadSearchFilters() {
	var searchFiltersInput = document.getElementById("Window" + document.getElementsByClassName("searchFilters")[0].dataset.service + "Input");
	var searchFiltersFilters = document.getElementsByClassName("searchFilters")[0].getElementsByTagName("li");
		for (var i = searchFiltersFilters.length; i--; i> 0) {
		searchFiltersFilters[i].addEventListener("click", function() {
			if (searchFiltersInput.value.length > 0) {
				window.open(this.dataset.search.replace("[browserLang]",browserLang).replace("[query]",encodeURIComponent(searchFiltersInput.value)));
				}
			else{
				window.open(this.dataset.link.replace("[browserLang]",browserLang));
				};
			});
		};
	};	
	
function loadLinksSections(){
	var linksSections = document.getElementsByClassName("linksSection");
	for( var i = linksSections.length; i--; i>0){
		linksSections[i].addEventListener("mouseover", function(){
			if(this.style.maxHeight == "45px"){
				this.removeAttribute("style");
				}
			});
		linksSections[i].getElementsByClassName("headerButton")[0].addEventListener("click", function(i){
			this.parentNode.style.maxHeight = "45px";
			});
		}
	};
	
	
	
	
	
	
	
	
	
	
	
	
function unreadCounts(){
	if(localStorage.getItem("prefGenericUnreadCount") == "true"){
		if(localStorage.getItem("prefGenericUnreadCountsGplus") == "true"){
			xhrGplusSecond = new XMLHttpRequest();
			xhrGplusSecond.open('GET','https://plus.google.com/app/basic/home?sview=2')
			xhrGplusSecond.onload = function() {
				if(xhrGplusSecond.status == 200){
					IsNumeric(xhrGplusSecond.responseText.split('id="67">')[1].split('<')[0]);	
					};
				};
			xhrGplusSecond.send(null);
			function IsNumeric(i){
			var countElement = document.getElementById("unreadCountGplus");
				if(i - 0 == i && i.length > 0){	countElement.innerText = chrome.i18n.getMessage("msg" + countElement.dataset.msg) + " (" + i + ")";};
				};
			}
		else {disableUnreadCount("Gplus");}
		
		if(localStorage.getItem("prefGenericUnreadCountsReader") == "true"){
			xhrReader = new XMLHttpRequest();
			xhrReader.open('GET','https://www.google.com/reader/api/0/unread-count')
			xhrReader.onload = function() {
				if(xhrReader.status == 200){
					var countElement = document.getElementById("unreadCountReader");
					if(i = xhrReader.responseText.split('/state/com.google/reading-list</string><number name="count">')[1]){
						countElement.innerText = chrome.i18n.getMessage("msg" + countElement.dataset.msg) + " (" + i.split("</number>")[0]+ ")"
						}
					else{
						countElement.innerText = chrome.i18n.getMessage("msg" + countElement.dataset.msg) + " (0)";
						}
					}
				}
			xhrReader.send(null);
			}
		else {disableUnreadCount("Reader");}
		
		
		if(localStorage.getItem("prefGenericUnreadCountsGmail") == "true"){
			xhrGmail = new XMLHttpRequest();
			xhrGmail.open('GET','https://mail.google.com/mail/feed/atom')
			xhrGmail.onload = function() {
				if(xhrGmail.status == 200){
					var countElement = document.getElementById("unreadCountGmail");
					countElement.innerText = chrome.i18n.getMessage("msg" + countElement.dataset.msg) + " (" + xhrGmail.responseXML.getElementsByTagName("fullcount")[0].textContent + ")" 
					};
				};
			xhrGmail.send(null);
			}
		else {disableUnreadCount("Gmail");}
		
		if(localStorage.getItem("prefGenericUnreadCount") == "true"){
			setTimeout(unreadCounts, 4000);
			}
		}
	};

//open a panel

function openPanel(url,width,height,closeWindow){
	chrome.windows.create({
		url: url,
		width: width,
		height: height,
		type: "panel",
		focused: true
		},
	function(WindowInfo){
		if(WindowInfo.alwaysOnTop){
			if(closeWindow){
				window.close();
				};
			}
		else{
			document.getElementById("popupPanelWarning").dataset.state = "on";
			};
		});
	};