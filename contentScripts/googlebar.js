var loc = location
var originPathname = loc.origin+loc.pathname;
var href = loc.href
var extensionId = chrome.i18n.getMessage("@@extension_id");

var css = ""; 
	css += "#gb, .gbem#gb, .gbemi#gb {\nheight: 71px !important;\n}\n"
	+ "#gbx3, #gbx4, #gbz {\nvisibility: hidden !important;\n}\n"
	+ ".gbes#gb {\nheight: 46px !important;\n}\n"
	+ ".gbesi#gb {\nheight: 68px !important;\n}\n"
	+ "#gbi4s1 {\ncolor: #000 !important;\n}\n"
	+ "#gs_gb_rt a {\ncolor: #444 !important;\n}\n"
	+ "#gbi4t, #gbz .gbzt, #gbz .gbgt,#gbi4m1, #gbg .gbgt, #gs_gb_rt a {\ncolor: #666 !important;\n}\n"
	+ "#gbx1, #gbx2, #gb #gbx1, #gb #gbx2, #gbq, #gbu, #gb #gbq, #gb #gbu {\ntop: 0px !important;\n}\n"
	+ "#gs_gb {\nbackground-color: transparent !important;\ntop: 20px !important;\nborder: none !important;\nheight:0px !important\n}\n"
	+ "#gs_gb_lt {\ndisplay: none !important;\n}\n"
	+ "#lhid_footer {\nmargin:0 !important;\npadding:0 !important;\n}\n"
	+ "#lhid_shell,#lhid_explore {\nposition:relative !important;\ntop:-30px !important;\n}\n"
	+ "#masthead {\nbackground-color: #f1f1f1 !important;\n}\n"
	+ ".gbgt-hvr {\nbackground-color: transparent !important;\n}\n"
	+ ".doclist-ogb-header {\ndisplay: none !important;\n}\n"
	+ ".Hoa.n0b.RWa {\nmargin-top: -25px !important;\n}\n"
	+ ".merch-bar-container {\ndisplay: none !important;\n}\n"
	+ ".mt-exp-msg-container {\nmargin: 0 !important;\n}\n"
	+ ".sfbgg {\nposition: relative !important;\ntop:-30px !important;\n}\n"
	+ ".wB {\nmargin-top: -30px !important;\n}\n"
	+ ".v9a.odb.tdb {\ntop: 72px !important;\n}\n"
	+ "#gbi5 {\nbackground-image: url('chrome-extension://" + extensionId + "/images/googlebar_settings.png') !important;\nwidth:17px !important;\n}\n"
	+ "#lga {\nmargin-top: 9px !important;\n}\n"
	+ ".gbto .gbts {\n-webkit-box-shadow: inset 0 1px #bbb !important;\n}\n";

switch (loc.host){
	case "support.google.com":
	case "sketchup.google.com":
	case "play.google.com":
	case "sketchup.google.com":
		oldGooglebar();
		break;
	case "picasaweb.google.com":
		css += "#gb, .gbem#gb, .gbemi#gb {\nheight: 30px !important;\n}\n"
		+ "#gbx3, #gbx4 {\nbackground-color: transparent !important; \nborder-bottom: 1px solid transparent !important;z-index:0 !important\n}\n"
		+ ".gphoto-topnav .gphoto-logo {\nbackground: url('chrome-extension://" + extensionId + "/images/googlebar_picasa.png') no-repeat 18px 6px !important; cursor:pointer !important;\n}\n"
		+ ".gphoto-topnav-tab a {\ncolor: #444 !important;\n}\n"
		+ ".gphoto-topnav {\nborder-top: 1px solid #f1f1f1 !important;position: relative !important;top:-30px !important;height:68px !important\n}\n"
		+ "#gbzc,.gphoto-topnav .gphoto-logo div a {\ndisplay: none !important;\n}\n";
		window.addEventListener("load", function () {
			document.getElementsByClassName("gphoto-logo")[0].addEventListener("click", function(){window.open("/","_self")})
			});
		break;
	case "plus.google.com":
		css += "#gb, .Dob, .NRa {\npointer-events: none !important;\n}\n"
		+ "#gb *, .Dob * {\npointer-events: all;\n}\n"
		+ "#gb, .gbem#gb, .gbemi#gb, .gbexxl#gb {\nheight: 102px !important;\n}\n"
		+ ".gbes#gb {\nheight: 76px !important;\n}\n"
		+ ".gbesi#gb {\nheight: 68px !important;\n}\n"
		+ ".xla {\ndisplay: block !important;\n}\n";
		break;
	case "mail.google.com":
		window.addEventListener("load", function () {
			if(document.getElementById(":r6")){
				if(document.defaultView.getComputedStyle(document.getElementById(":r6"), null)["color"] == "rgb(238, 238, 238)"){
					css += "#gbi4t {\ncolor: #eee !important;\n}\n";
					};
				}
			});
		break;
	}

function oldGooglebar(){
	css += "#gb, .gbem#gb, .gbemi#gb {\nheight: 0px !important;\n}\n"
	+ "#gbg {\ntop: 20px !important;\n}\n"
	+ ".play-search-form-wrapper {\nz-index: 999999 !important;\n}\n"
	+ "#lga {\nmargin-top: 80px !important;\n}\n";
	};

if(originPathname.indexOf("https://www.google.com/takeout") + originPathname.indexOf("https://www.google.co.uk/compare/") + originPathname.indexOf("https://drive.google.com/templates") + href.indexOf("tbs=sbi:") + href.indexOf("noj=1") + href.indexOf("noj=0") > -6){
	oldGooglebar();
	};

if( originPathname.indexOf("https://www.google.com/a/") != -1 || originPathname.indexOf("://translate.google.com/toolkit/workbench") != -1){
	css += "#gbzc,#gs_gb_lt {\ndisplay: none !important;\n}\n"
	+ "#gbx3, #gbx4, #gs_gb {\nbackground-color: #f1f1f1 !important; \nborder-bottom: 1px solid #e5e5e5 !important;\n}\n"
	+ "#gbx3, #gbx4, #gbz {\nvisibility: visible !important;\n}\n"
	+ "#gb, .gbem#gb, .gbemi#gb {\nheight: 30px !important;\n}\n";
	};
			
chrome.storage.local.get('nogooglebar', function(item) {
	if(item.nogooglebar=="true"){
		GM_addStyle(css);		
		};
	});

//google plus circles direct link search
if( originPathname.indexOf("https://plus.google.com/circles") != -1 ){
	if(location.search.indexOf("q=") != -1){
		var keyboardEvent = document.createEvent("KeyboardEvent");
		var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

		keyboardEvent[initMethod]("keyup");
		
		checkInput();
		
		function checkInput(){
			if(document.querySelector("input.Sf") != null){
				document.querySelector("input.Sf").value = location.search.split("q=")[1].split("&")[0];
				document.querySelector("input.Sf").dispatchEvent(keyboardEvent);
				}
			else setTimeout(checkInput, 20);
			};
		};
	};