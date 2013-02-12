window.addEventListener("load", function(){
	document.getElementById("query").value = "";
	document.getElementById("query").placeholder = chrome.i18n.getMessage("pmsg9");
	document.getElementById("gd-show-menu-button").className = "";
	document.getElementById("gd-search").addEventListener('mouseover', function () {
			document.getElementById("query").focus();
		});
	});