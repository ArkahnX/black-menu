var lang = ""
if( location.href.split("hl=")[1] ) {
	lang = location.href.split("hl=")[1].split("&")[0];
	}
else {
	lang = "en";
	}

document.body.innerHTML = '<iframe frameborder="0" scrolling="no" src="https://mail.google.com/tasks/ig?extension=blackMenu&hl=' + lang + '"></iframe>'