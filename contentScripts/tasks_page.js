var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'chrome-extension://' + chrome.i18n.getMessage("@@extension_id") + '/contentScripts/tasks_page.css');

var setStyle = function() {
	var tasks = document.getElementsByTagName("iframe")[0];
	if (typeof tasks === "undefined") {
		setTimeout(setStyle, 0);
	} else {
		tasks.contentDocument.head.appendChild(link);
	}
};

document.onreadystatechange = function() {
	if (document.readyState === "complete") {
		setStyle();
	} else {
		document.addEventListener("load", setStyle);
	}
};