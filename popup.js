//==<>==<>====variables=====<>==<>==\\

var browserLang = window.navigator.language;	
var extensionId = chrome.i18n.getMessage("@@extension_id");
var settingsOpened = 0;
var aboutOpened = 0;
var gmailInput = "";

window.addEventListener("load", init);

function init(){

	if(localStorage.getItem("prefGenericPanel") == "true"){
		openBlackMenuInPanel();
		};
		
	localization();
	
	mainMenuSystem();

	setDefaultSettings();

	loadAllPages();

	loadMorePageServices();
	
	loadPopupFunctionality();		
	
	keyboardNavigation();
	
	loadSearchBoxes();

	loadLinksSections();

	calendarCurrentDate();
	
	readerNewsSwitch();
	
	loadAboutClickEvent();
	
	loadSettingsClickEvent();
		
	if(localStorage.getItem("prefGenericUnreadCount") == "true"){
		unreadCounts();
		};
		
	if(localStorage.getItem("prefGenericGadgetPanels") == "true"){
		enableOpenInPanelButtons();
		};
	
	selectBoxBlur();
	
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

function loadAllPages(){
	var iframes = ["Translate", "Maps", "Youtube", "News", "Reader", "Gmail", "Drive", "Calendar", "Gplus", "Search", "Play"]
	for(var i = iframes.length; i--; i>0){
		loadPage(iframes[i]);
		};
	};
	
var gadgetDomain = "https://www-gadget-opensocial.googleusercontent.com/gadgets/ifr?url=https://black-menu.googlecode.com/files/";
		
function loadPage(service) {
	document.getElementById("iframe" + service).src = "/pages/" + service.toLowerCase() + "/index.html";
	};
//---------general functions-------\\

//is key
function isKey(key){
	if(event.keyCode==key){
		return true
		}
	else {
		return false
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
	
function disableUnreadCount(service){
	var countElement = document.getElementById("unreadCount" + service);
	countElement.innerText = chrome.i18n.getMessage("msg" + countElement.dataset.msg);
	}
	

function keyboardNavigation() {
	document.addEventListener('keyup', function(e) {
		if (!e) {
			e = window.event;
		 }
		if (isKey(40)) {
			for (var i = divs.length-1; i--;i>0){
				if(document.getElementsByClassName("mainMenuButtonOn")[0] == divs[i]){
					document.getElementsByClassName("mainMenuButtonOn")[0].className = "mainMenuButton";
					divs[i+1].className = "mainMenuButtonOn";
					document.getElementsByClassName('mainWindowOn')[0].className = 'mainWindow';
					document.getElementById("mainWindow" + divs[i+1].id).className = 'mainWindowOn';
					box = document.getElementById('Window' + divs[i+1].id + 'Input');
					if (box!=null)box.focus();
					}
				}
			}
		else{
			if(isKey(38)) {
				for (var i = divs.length; i--;i>-1){
					if(document.getElementsByClassName("mainMenuButtonOn")[0]== divs[i+1]){
						document.getElementsByClassName("mainMenuButtonOn")[0].className = "mainMenuButton";
						divs[i].className = "mainMenuButtonOn";
						document.getElementsByClassName('mainWindowOn')[0].className = 'mainWindow';
						document.getElementById("mainWindow" + divs[i].id).className = 'mainWindowOn';
						box = document.getElementById('Window' + divs[i].id + 'Input');
						if (box!=null)box.focus();
						return
						}
					}
				}
			}
			
		});
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
	
function aboutLoad(){
	var credits = [
	{name: 'Andrea Brandi', id: '115728989643218525512'},
	{name: 'Bruno Zobbio', id: '118099032245052207939'},
	{name: 'Christopher Hall', id: '107518467849621748571'},
	{name: 'Dani Muñoz Guardiola', id: '116557673999349947589'},
	{name: 'Daniel Zarco', id: '109530012059707563382'},
	{name: 'Florian Kiersch', id: '109543393310967160565'},
	{name: 'François Bacconnet', id: '111903264144278356023'},
	{name: 'François Beaufort', id: '100132233764003563318'},
	{name: 'Halfdan Reschat', id: '103697368260407276883'},
	{name: 'Jordi Pagano', id: '112888215225077342170'},
	{name: 'Kevin Kwok', id: '116347431032639424492'},
	{name: 'Michael Cook', id: '106347588867026921146'},
	{name: 'Mаксим Мекеня', id: '104262998480220547117'},
	{name: 'Sinan baş', id: '118272951807290672614'},
	{name: 'Sing-yu Chan', id: '105029095754085262784'},
	{name: 'Tulho Melo', id: '118309170949836127455'},
	];
	document.getElementById("headerAbout").addEventListener('click', function () {
		document.getElementById('panelAbout').dataset.state = 'off';
		});
	for (var i=0;i<credits.length;i++){
		var person = document.createElement("li");
		var personId = credits[i].id;
		var personName = credits[i].name;
		person.innerHTML = '<a target="_blank" href="https://plus.google.com/' + personId + '"><span><img src="https://profiles.google.com/s2/photos/profile/' + personId + '?sz=32"></span><p>' + personName + '</p></a>';
		document.getElementById("creditsList").appendChild(person);
		};
	document.getElementById("aboutAboutWindow").style.background = "url(https://profiles.google.com/s2/photos/profile/118017345135937765349?sz=250) no-repeat right bottom";
	document.getElementById("awardSoftpedia").src = "http://mac.softpedia.com/base_img/softpedia_clean_award_f.gif";
	document.getElementById("iframePlusone").src = "https://plusone.google.com/_/+1/fastbutton?amp&url=https://chrome.google.com/webstore/detail/black-menu/eignhdfgaldabilaaegmdfbajngjmoke";
	if (chrome.i18n){
		document.getElementById("versionNumber").innerHTML = "Black Menu " + chrome.app.getDetails()["version"];
		};
//load menu
	var aDivs = document.getElementById('panelMenuAbout').getElementsByTagName("li");
    for (var i = aDivs.length; i--;i>=0 ) {
        aDivs[i].addEventListener('mouseover', function () {
            document.getElementById("panelAbout").getElementsByClassName('panelButtonOn')[0].className = '';
            this.className = 'panelButtonOn';
            document.getElementById("panelAbout").getElementsByClassName('panelWindowOn')[0].className = 'panelWindowOff';
            document.getElementById(this.id + "Window").className = 'panelWindowOn';
			});
		};
	aboutOpened = 1;
	};
	
function settingsLoad() {
//load menu system
    var sDivs = document.getElementById('panelMenuSettings').children;
    for (var i = sDivs.length; i--;i>=0 ) {
        sDivs[i].addEventListener('mouseover', function () {
            document.getElementById("panelSettings").getElementsByClassName('panelButtonOn')[0].className = '';
            this.className = 'panelButtonOn';
            document.getElementById("panelSettings").getElementsByClassName('panelWindowOn')[0].className = 'panelWindowOff';
            document.getElementById(this.id + "Window").className = 'panelWindowOn';
        });
    };
	
//load close functionality
	document.getElementById("headerSettings").addEventListener("click", function () {
		document.getElementById("panelSettings").dataset.state = "off";
		});
		
//restore settings
	var values = [
		"prefTranslateSource",
		"prefTranslateTarget",
		"prefMapsLocation",
		"prefMapsMaptype",
		"prefNewsEdition",
		"prefNewsImages",
		"prefNewsItems",
		"prefDriveView"
		]; 
	for (var i=values.length;i--;i>0) {
		var id = values[i];
		var value = localStorage.getItem(id);
		if(value){
			document.getElementById(id).value = value;
			}
		};
		
	var checkboxes = [ 
		"prefGenericUnreadCountsGmail",
		"prefGenericUnreadCountsGplus",
		"prefGenericUnreadCountsReader",
		"prefGenericUnreadCountBadge",
		"prefYoutubeInstant",
		"prefCalendarTasksexpanded",
		"prefCalendarEmptydays",
		"prefGenericUnreadCount",
		"prefGenericPanel",
		"prefGenericGadgetPanels",
		"prefGmailCompose",
		"prefMapsTraffic",
		"prefMapsInstant",
		"prefReaderMarkasread",
		"prefSearchInstant"
		];
	for (var i = checkboxes.length; i--; i>0){
		var id = checkboxes[i];
		var value = localStorage.getItem(id);
		if(value == "1" || value == "true") {
			document.getElementById(id).checked = true;
			}
		};
	
	if(localStorage.getItem("prefNewsSectionsCustom")){
		document.getElementById('prefNewsSectionsCustom').value = localStorage.getItem("prefNewsSectionsCustom").replace("up_queryList=","").split('|').join(',');
		};
	
	if(chrome.storage){
		chrome.storage.local.get('nogooglebar', function(item) {
			if(item.nogooglebar=="true"){
				document.getElementById('prefGenericGooglebar').checked = true;
				};
			});
		};
		
	var prefNewsSectionsSelectionSplitted = "";
	if(localStorage.getItem("prefNewsSections")){
		prefNewsSectionsSelectionSplitted = localStorage.getItem("prefNewsSections").split("up_tabs=")[1].substring(1).split(",");
		} 
	else {
		prefNewsSectionsSelectionSplitted = ["h","w","n","b","t"];
		};
	for(var i = prefNewsSectionsSelectionSplitted.length; i--;i>0){
		document.getElementById("prefNewsSections-" + prefNewsSectionsSelectionSplitted[i]).checked = true;
		};
	
//change settings
	document.getElementById('prefGenericGooglebar').addEventListener('click', function () {
		if(this.checked){chrome.storage.local.set({'nogooglebar':'true'});}
		else {chrome.storage.local.set({'nogooglebar':'false'});};
		});
		
	document.getElementById('prefGenericShortcut').addEventListener('click', function () {
		document.getElementById("popupSettingsGenericShortcut").dataset.state = "on";
		});	
			
	document.getElementById('prefDriveView').addEventListener('change', function () {
		localStorage.setItem("prefDriveView", this[this.selectedIndex].value);
		loadPage("Drive");
		});
		
	document.getElementById('prefGenericPanel').addEventListener('click', function () {
		if(this.checked){localStorage.setItem("prefGenericPanel", "true");}
		else {localStorage.setItem("prefGenericPanel", "false");};
		});
	
	document.getElementById('prefGenericGadgetPanels').addEventListener('click', function () {
		if(this.checked){
			localStorage.setItem(this.id,"true");
			enableOpenInPanelButtons();
			}
		else {
			localStorage.setItem(this.id,"false");
			disableOpenInPanelButtons();
			};
		});		
		
	document.getElementById('prefGenericUnreadCount').addEventListener('click', function () {
		if(this.checked){
			localStorage.setItem(this.id,"true");
			}
		else {
			localStorage.setItem(this.id, "false");
			disableUnreadCount("Gplus");
			disableUnreadCount("Gmail");
			disableUnreadCount("Reader");
			};
		unreadCounts();
		});
		
	document.getElementById('prefGenericUnreadCountsGplus').addEventListener('click', function () {
		if(this.checked){localStorage.setItem(this.id,"true");}
		else {localStorage.setItem(this.id, "false");};
		reloadBackgroundPage();
		unreadCounts();
		});
		
	document.getElementById('prefGenericUnreadCountsGmail').addEventListener('click', function () {
		if(this.checked){localStorage.setItem(this.id,"true");}
		else {localStorage.setItem(this.id, "false");};
		reloadBackgroundPage();
		unreadCounts();
		});
		
	document.getElementById('prefGenericUnreadCountsReader').addEventListener('click', function () {
		if(this.checked){localStorage.setItem(this.id,"true");}
		else {localStorage.setItem(this.id, "false");};
		reloadBackgroundPage();
		unreadCounts();
		});
		
	document.getElementById('prefSearchInstant').addEventListener('click', function () {
		if(this.checked){localStorage.setItem(this.id,"true");}
		else {localStorage.setItem(this.id, "false");};
		loadPage("Search");
		});	
		
		
		
	document.getElementById('prefGenericUnreadCountBadge').addEventListener('click', function () {
		if(this.checked){localStorage.setItem(this.id,"true");}
		else {localStorage.setItem(this.id, "false");};
		reloadBackgroundPage();
		});
	
	function reloadBackgroundPage(){
		chrome.runtime.getBackgroundPage(function (){console.log("getBackground")})
		chrome.extension.getBackgroundPage().location.reload();
		};
		
	
	document.getElementById('prefTranslateSource').addEventListener('change', function () {
		localStorage.setItem("prefTranslateSource", this[this.selectedIndex].value);
		loadPage("Translate");
		})
		
	document.getElementById('prefTranslateTarget').addEventListener('change', function () {
		localStorage.setItem("prefTranslateTarget", this[this.selectedIndex].value);
		loadPage("Translate");
		})		
		
	document.getElementById('prefMapsMaptype').addEventListener('change', function () {
		localStorage.setItem("prefMapsMaptype", this[this.selectedIndex].value);
		loadPage("Maps");
		});
	
	document.getElementById('prefMapsTraffic').addEventListener('click', function () {
		if(this.checked){localStorage.setItem(this.id,"true");}
		else {localStorage.setItem(this.id,"false");};
		loadPage("Maps");
		});
		
	document.getElementById('prefMapsLocation').addEventListener('keyup', function () {
		localStorage.setItem("prefMapsLocation", this.value);
		loadPage("Maps");
		});
		
	document.getElementById('prefMapsInstant').addEventListener('click', function () {
		if(this.checked){localStorage.setItem(this.id,"true");}
		else {localStorage.setItem(this.id,"false");};
		loadPage("Maps");
		});
		
	document.getElementById('prefYoutubeInstant').addEventListener('click', function () {
		if(this.checked){localStorage.setItem(this.id,"true");}
		else {localStorage.setItem(this.id,"false");};
		loadPage("Youtube");
		});
		
	document.getElementById('prefNewsImages').addEventListener('change', function () {
		localStorage.setItem(this.id, this[this.selectedIndex].value);
		loadPage("News");
		});

	document.getElementById('prefNewsItems').addEventListener('change', function () {
		localStorage.setItem(this.id, this[this.selectedIndex].value);
		loadPage("News");
		});

	document.getElementById('prefNewsEdition').addEventListener('change', function () {
		localStorage.setItem(this.id, this[this.selectedIndex].value);
		loadPage("News");
		});
	document.getElementById('prefReaderMarkasread').addEventListener('click', function () {
		if(this.checked){localStorage.setItem(this.id,"true");}
		else {localStorage.setItem(this.id,"false");};
		loadPage("Reader");
		});

	document.getElementById('prefGmailCompose').addEventListener('click', function () {
		if(this.checked){localStorage.setItem(this.id,"true");}
		else {localStorage.setItem(this.id,"false");};
		loadPage("Gmail");
		});
		
	document.getElementById('prefGmailVacationResponder').addEventListener('click', function () {
		document.getElementById("popupSettingsGmailVacationResponder").dataset.state = "on";
		document.getElementById("iframeGmailHoliday").src = "https://mail.google.com/mail/mu/mp/?mui=blackMenu&hl=" + browserLang + "#pr";
		});
		
	document.getElementById('prefGenericUnreadCounts').addEventListener('click', function () {
		document.getElementById("popupSettingsGeneralUnreadCounts").dataset.state = "on";
		});
		
	document.getElementById('prefNewsSections').addEventListener('click', function () {
		document.getElementById("popupSettingsNewsSections").dataset.state = "on";
		});
		
	var prefNewsSectionsSelection = document.getElementById("prefNewsSectionsSelection").getElementsByTagName("input");
	document.getElementById("prefNewsSectionsSelection").addEventListener("click", function(){
		var selection = "";
		for(var i = prefNewsSectionsSelection.length; i--;i>0){
			if(prefNewsSectionsSelection[i].checked){
				selection += prefNewsSectionsSelection[i].id.replace("prefNewsSections-", ",");
				}
			}
		localStorage.setItem("prefNewsSections", "up_tabs=" + selection);
		loadPage("News");
		});
		
	document.getElementById('prefNewsSectionsCustom').addEventListener('keyup', function () {
		localStorage.setItem(this.id,"up_queryList=" + this.value.split(',').join('|'));   
		loadPage("News");
		});

	document.getElementById('prefCalendarEmptydays').addEventListener('click', function () {
		if(this.checked){localStorage.setItem(this.id,"true");}
		else {localStorage.setItem(this.id,"false");};
		loadPage("Calendar");
		});

	document.getElementById('prefCalendarTasksexpanded').addEventListener('click', function () {
		if(this.checked){localStorage.setItem(this.id,"true");}
		else {localStorage.setItem(this.id,"false");};
		tasksChangeState();
		});
	};
	
function calendarCurrentDate(){
	var objToday = new Date();
	var dayOfMonth = objToday.getDate();
	var calendarIcons = document.querySelectorAll(".sprite-calendar-32, .sprite-calendar-w32");
	for (var i = calendarIcons.length; i--; i>0){
		calendarIcons[i].innerHTML = dayOfMonth;
		};
	};
	
function tasksExpandSystem(){
	if(localStorage.getItem("prefCalendarTasksexpanded") == "1" || localStorage.getItem("prefCalendarTasksexpanded") == "true"){
		tasksChangeState()
		};

	function tasksChangeState(){
		if(document.getElementById("mainWindowCalendar").dataset.tasksstate == "collapsed") {
			document.getElementById("mainWindowCalendar").dataset.tasksstate = "expanded";
			}
		else{
			document.getElementById("mainWindowCalendar").dataset.tasksstate = "collapsed";
			}
		};
	document.getElementById("searchboxCalendar").addEventListener('mouseover',function (){
		if(document.getElementById("mainWindowCalendar").dataset.tasksstate = "expanded"){
			tasksChangeState();
			};
		});
		
	document.getElementById("headerCalendarTasks").addEventListener('click',function (){
		tasksChangeState()
		}, false);
	};
	
function readerNewsSwitch() {
	var Reader = document.getElementById('Reader');
	var News = document.getElementById('News');
	var readerSwitchButtons = document.getElementsByClassName("readerSwitch");
	for(var i = readerSwitchButtons.length; i-- ; i>0){
		readerSwitchButtons[i].addEventListener('click', readerSwitch);
		};

	function readerSwitch() {
		iifNews = ( News.style.display == "block" || News.style.display == "" );
		localStorage.readerSwitch=iifNews?"Reader":"News";
		News.style.display = iifNews?"none":"block";
		Reader.style.display = iifNews?"block":"none";
		};
	
	if (localStorage.readerSwitch == "Reader"){
		Reader.style.display = 'block';
		News.style.display = 'none';
		};
	};
	
function mainMenuSystem() {
    var divs = document.getElementById('mainMenu').children;
    for (var i = divs.length; i--;i>=0 ) {
        divs[i].addEventListener('mouseover', function () {
			var ThisId = this.id;
			document.getElementsByClassName('mainMenuButtonOn')[0].className = 'mainMenuButton';
			this.className = 'mainMenuButtonOn';
			document.getElementsByClassName('mainWindowOn')[0].className = 'mainWindow';
			document.getElementById("mainWindow" + ThisId).className = 'mainWindowOn';
			//box = document.getElementById('Window' + ThisId + 'Input');
			//if (box!=null)box.focus();
			});
		};
	};
	
function setDefaultSettings() {
	if(!localStorage.getItem("prefMapsLocation")){
		if(chrome.i18n){localStorage.setItem("prefMapsLocation", chrome.i18n.getMessage("browserLangLocation"));} 
		else{localStorage.setItem("prefMapsLocation", "Atlantic Ocean");};
		};
	if(!localStorage.getItem("prefGenericUnreadCountsGplus")){
		localStorage.setItem("prefGenericUnreadCountsGplus", "true");
		}
	if(!localStorage.getItem("prefGenericUnreadCountsGmail")){
		localStorage.setItem("prefGenericUnreadCountsGmail", "true");
		}
	if(!localStorage.getItem("prefGenericUnreadCountsReader")){
		localStorage.setItem("prefGenericUnreadCountsReader", "true");
		}
	if(!localStorage.getItem("prefSearchInstant")){
		localStorage.setItem("prefSearchInstant", "true");
		}
	};
	
function openBlackMenuInPanel(){
	document.getElementsByTagName("body")[0].className = "bmInPanel";
	if(window.location.href.split("?")[1]!="popup"){
		openPanel("popup.html?popup", 615, 527, true);
		}
	else{
		chrome.windows.getCurrent( 
			function(w) {
				if(w.type == "popup"){
					window.close()
					};
				}
			);
		};
	};

function enableOpenInPanelButtons() {
	document.body.classList.add("gadgetPanels");
	var openInPanelButtons = document.getElementsByClassName("openInPanel");
	for (var i = openInPanelButtons.length ; i-- ; i>0){
		openInPanelButtons[i].addEventListener("click", function () {
			openPanel("chrome-extension://" + extensionId + "/pages/" + this.dataset.service + "/index.html", 450, 485);
			});
		};
	};

function disableOpenInPanelButtons() {
	document.body.classList.remove("gadgetPanels");
	};

function loadMorePageServices() {
var services = {
	'Adsense': {name: 'Adsense', url: 'https://www.google.com/adsense/', msg: '110', tooltip: '', icon: 'adsense'},
	'Adwords': {name: 'Adwords', url: 'https://adwords.google.com/', msg: '120', tooltip: '', icon: 'adwords'},
	'Alerts': {name: 'Alerts', url: 'https://www.google.com/alerts', msg: '111', tooltip: '', icon: 'alerts'},
	'Analytics': {name: 'Analytics', url: 'https://www.google.com/analytics/web/', msg: '121', tooltip: '', icon: 'analytics'},
	'App Engine': {name: 'App Engine', url: 'https://appengine.google.com/', msg: '112', tooltip: '', icon: 'app_engine'},
	'Blogger': {name: 'Blogger', url: 'https://draft.blogger.com/home', msg: '122', tooltip: '', icon: 'blogger'},
	'Chrome Web Store': {name: 'Chrome Web Store', url: 'https://chrome.google.com/webstore/', msg: '113', tooltip: '', icon: 'chrome_web_store'},
	'Finance': {name: 'Finance', url: 'https://www.google.com/finance', msg: '124', tooltip: '', icon: 'finance'},
	'Groups': {name: 'Groups', url: 'https://groups.google.com/forum/', msg: '123', tooltip: '', icon: 'groups'},
	'Picasa': {name: 'Picasa', url: 'https://picasaweb.google.com/home', msg: '125', tooltip: '', icon: 'picasa'},
	'Scholar': {name: 'Scholar', url: 'http://www.google.com/schhp', msg: '116', tooltip: '', icon: 'scholar'},
	'Url Shortener': {name: 'Url Shortener', url: 'https://goo.gl/', msg: '117', tooltip: '', icon: 'goo_gl'},
	'Sites': {name: 'Sites', url: 'https://sites.google.com/', msg: '126', tooltip: '', icon: 'sites'},
	'Voice': {name: 'Voice', url: 'https://www.google.com/voice', msg: '127', tooltip: '', icon: 'voice'},
	'Wallet': {name: 'Wallet', url: 'http://wallet.google.com/manage', msg: '118', tooltip: '', icon: 'wallet'},
	'Webmaster Tools': {name: 'Webmaster Tools', url: 'https://www.google.com/webmasters/tools/home', msg: '128', tooltip: '', icon: 'webmaster_tools'},
	'Dashboard': {name: 'Dashboard', url: 'https://www.google.com/dashboard/', msg: '119', tooltip: '', icon: 'dashboard'},
	'Google Settings': {name: 'Google Settings', url: 'https://www.google.com/settings/', msg: '129', tooltip: '', icon: 'google_settings'},
	'Developers': {name: 'Developers', url: 'https://developers.google.com/', msg: '114', tooltip: '', icon: 'developers'},
	'Offers': {name: 'Offers', url: 'https://www.google.com/offers/home', msg: '115', tooltip: '', icon: 'offers'},
	'Trends': {name: 'Trends', url: 'https://www.google.com/trends/', msg: '27', tooltip: '', icon: 'trends'},
	'Custom Search': {name: 'Custom Search', url: 'http://www.google.com/cse/', msg: '28', tooltip: '', icon: 'customsearch'},
	};
	var defaultServices = ["Adsense","Adwords","Alerts","Analytics","App Engine","Blogger","Chrome Web Store","Developers","Finance","Groups","Offers","Picasa","Scholar","Sites","Url Shortener","Voice","Wallet","Webmaster Tools","Dashboard","Google Settings"];
	for (var i=0;i<defaultServices.length;i++){
		var service = document.createElement("li");
		service.innerHTML = '<a target="_blank" href="' + services[defaultServices[i]].url + '"><p>' + chrome.i18n.getMessage("msg" + services[defaultServices[i]].msg) + '</p><span class="sprite-' + services[defaultServices[i]].icon + '-32"></span></a>';
		document.getElementById("moreProductLinks").appendChild(service);
		};
	};
	
function selectBoxBlur(){
	var selectBoxes = document.getElementsByTagName("select");
	for(var i = selectBoxes.length;i--;i>0){
		selectBoxes[i].addEventListener("click", function() {
			this.classList.toggle("focus");
			});
		selectBoxes[i].addEventListener("blur", function() {
			this.classList.remove("focus");
			});
		};
	};
	
function loadSearchBoxes(){
//Search on enter
	var windowInput = document.getElementsByClassName("searchbox");
	for(var i = windowInput.length ; i--; i>0 ){
		windowInput[i].getElementsByTagName("input")[0].addEventListener("keypress", function(e) {
			if (isKey(13)) {
				window.open(this.dataset.prefix + encodeURIComponent(this.value))
				};
			});
		};
//Search on click
	var searchFilters = document.getElementsByClassName("searchFilters");
	for(k = searchFilters.length; k--; k>0){
		loadSearchFilters(k);
		};
		
	function loadSearchFilters(k){
		var searchFiltersInput = document.getElementById("Window" + searchFilters[k].dataset.service + "Input");
		var searchFiltersFilters = searchFilters[k].getElementsByTagName("li");
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
		}
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
	
//------gmail ---//
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
		
function loadPopupFunctionality(){
	var chromePages = document.getElementsByClassName("chromePage");
	for (var i=chromePages.length;i--;i>0){
		chromePages[i].addEventListener("click", function(){
			chrome.tabs.create({url:this.innerText});
			});
		}

	var popupCloseButtons = document.getElementsByClassName("popupClose");
	for (var i = popupCloseButtons.length;i--;i>0){
		popupCloseButtons[i].addEventListener("click", function() {
			this.parentNode.parentNode.parentNode.dataset.state = "off";
			});
		};
	};
	
function loadAboutClickEvent(){
	document.getElementById("About").addEventListener('click', function () {
		document.getElementById('panelAbout').dataset.state = 'on';
		if(!aboutOpened){
			aboutLoad();
			};
		});	
	};
	
function loadSettingsClickEvent(){
	document.getElementById("Settings").addEventListener("click", function () {
		document.getElementById("panelSettings").dataset.state = "on";
		if(!settingsOpened){
			settingsLoad();
			settingsOpened = 1;
			};
		});	
	};