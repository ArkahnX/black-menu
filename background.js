if(localStorage.getItem("prefGenericUnreadCountBadge") == "true"){
	var prefix = "Black Menu - "
	var tooltipMail = prefix + chrome.i18n.getMessage("msg7");
	var tooltipRss = prefix + chrome.i18n.getMessage("msg144");
	var tooltipPlus = prefix + chrome.i18n.getMessage("msg1");

	var enabledMail = localStorage.getItem("prefGenericUnreadCountsGmail");
	var enabledRss = localStorage.getItem("prefGenericUnreadCountsReader");
	var enabledPlus = localStorage.getItem("prefGenericUnreadCountsGplus");

	var timeout = 5000;
	
	if(enabledMail == "true"){
		badgeMail();
		}
	else{
		if(enabledRss =="true"){
			badgeRss();
			}
		else{
			if(enabledPlus =="true"){
				badgePlus();
				}
			};
		};
	
	function badgeMail(){
		chrome.browserAction.setIcon({path: "images/icon_19_gmail.png"});
		chrome.browserAction.setTitle({title: tooltipMail});
		chrome.browserAction.setBadgeText({text: "" });
		if(enabledRss == "true"){
			setTimeout(badgeRss, timeout);
			}
		else{
			if(enabledPlus =="true"){
				setTimeout(badgePlus, timeout);
				}
			else{
				setTimeout(badgeMail, timeout);
				};
			};
		xhrGmail = new XMLHttpRequest();
		xhrGmail.open('GET','https://mail.google.com/mail/feed/atom')
		xhrGmail.onload = function() {
			var count = xhrGmail.responseXML.getElementsByTagName("fullcount")[0].textContent;
			chrome.browserAction.setBadgeText({text: count });
			if(count != 0 ){
				chrome.browserAction.setBadgeBackgroundColor({ color: [174, 98, 128, 255] });
				}
			else{
				chrome.browserAction.setBadgeBackgroundColor({ color: [100, 100, 100, 255] });
				};	
			};
		xhrGmail.send(null);
		

		};
		
	function badgeRss(){
		chrome.browserAction.setIcon({path: "images/icon_19_reader.png"});
		chrome.browserAction.setTitle({title: tooltipRss});
		chrome.browserAction.setBadgeText({text: ""});
		if(enabledPlus == "true"){
			setTimeout(badgePlus, timeout);
			}
		else{
			if(enabledMail =="true"){
				setTimeout(badgeMail, timeout);
				}
			else{
				setTimeout(badgeRss, timeout);
				};
			};
		xhrReader = new XMLHttpRequest();
		xhrReader.open('GET','https://www.google.com/reader/api/0/unread-count')
		xhrReader.onload = function() {
			if(xhrReader.status != 404 && xhrReader.status != 401){
				if(i = xhrReader.responseText.split('/state/com.google/reading-list</string><number name="count">')[1]){
					
					chrome.browserAction.setBadgeText({text: i.split("</number>")[0]});
					if(i.split("</number>")[0] != 0 ){
						chrome.browserAction.setBadgeBackgroundColor({ color: [242, 139, 18, 255] });
						}
					else{
						chrome.browserAction.setBadgeBackgroundColor({ color: [100, 100, 100, 255] });
						};
					}
				else{
					chrome.browserAction.setBadgeBackgroundColor({ color: [100, 100, 100, 255] });
					chrome.browserAction.setBadgeText({text: "0"});
					}
				}
			}
		xhrReader.send(null);

		};

	function badgePlus(){
		chrome.browserAction.setIcon({path: "images/icon_19_gplus.png"});
		chrome.browserAction.setTitle({title: tooltipPlus});
		chrome.browserAction.setBadgeText({text: ""});
		if(enabledMail == "true"){
			setTimeout(badgeMail, timeout);
			}
		else{
			if(enabledRss =="true"){
				setTimeout(badgeRss, timeout);
				}
			else{
				setTimeout(badgePlus, timeout);
				};
			};
		xhrGplusSecond = new XMLHttpRequest();
		xhrGplusSecond.open('GET','https://plus.google.com/app/basic/home?sview=2')
		xhrGplusSecond.onload = function() {
			if(xhrGplusSecond.status == 200){
				var count = xhrGplusSecond.responseText.split('id="67">')[1].split('<')[0];
				chrome.browserAction.setBadgeText({text: count});
				if(count != 0 ){
					chrome.browserAction.setBadgeBackgroundColor({ color: [226, 78, 66, 255] });
					}
				else{
					chrome.browserAction.setBadgeBackgroundColor({ color: [100, 100, 100, 255] });
					};
				};
			};
		xhrGplusSecond.send(null);
		};
	}
else {
		chrome.browserAction.setBadgeText({text: "" });
		chrome.browserAction.setIcon({path: "images/icon_19.png"});
		chrome.browserAction.setTitle({title: "Black Menu"});
}