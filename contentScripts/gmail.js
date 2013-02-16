window.addEventListener("load", function () {

	if(location.href.indexOf("mui=blackMenu") != -1){
		loadRedesign();

	document.addEventListener("mousedown", checkIfToolbarExist);
	document.addEventListener("mouseup", checkIfToolbarExist);
	document.addEventListener("mousemove", checkIfToolbarExist);
		
		
	if(window.location.href.indexOf("#pr")){
		gmailVacationText();
		gmailVacationClose();
		};
	searchBox();	
	compose();
	infScroll();
		};
	});

function loadRedesign() {
	var s = document.createElement('link');
	s.setAttribute("href", chrome.extension.getURL("contentScripts/gmail.css"));
	s.setAttribute("rel", "stylesheet");
	s.setAttribute("type", "text/css");
	document.head.appendChild(s);
	};
	
function checkIfToolbarExist() {
	console.log("test");
	if(document.getElementById("tltbt")){
		checkToolbarState();
		}
	else {
		console.log("9a");
		changeToolbarTop("9px");
		};
	}

function checkToolbarState() {
	if(document.getElementById("tltbt").parentNode.parentNode.style.display != "none"){
		console.log("52a");
		changeToolbarTop("52px");
		}
	else {
		console.log("9b");
		changeToolbarTop("9px");
		};
	}
function changeToolbarTop(px){
	if(document.getElementsByClassName("tr")[0]){
		document.getElementsByClassName("tr")[0].setAttribute("style","top:" +  px + " !important;");
		}
	else{
		if(document.querySelectorAll("#views>div")[1]){
			document.querySelectorAll("#views>div")[1].setAttribute("style","top:" +  px + " !important;");
			};
		};
	};

function searchBox(){
	var input = document.getElementsByClassName("dn")[0];
	var compose = document.querySelector(".xc .Uo");
	if(input){
		input.placeholder = chrome.i18n.getMessage("pmsg4");
		input.type = "";
		input.addEventListener("keyup", function(){
			chrome.extension.sendMessage({inputValue: input.value}, function(response) {
				console.log(response.farewell);
				});
			});
		}
	else {setTimeout(searchBox,20);};
	};
		
function compose(){
	var compose = document.querySelector(".xc .Uo");
	if(compose){
		compose.addEventListener("click", function(){
			var urlVariables = JSON.parse('{"' + decodeURI(window.location.search.split("?")[1].split("&")[0].replace(/;/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
			if(urlVariables["panel"] == "true"){
				chrome.extension.sendMessage({gmail: "compose"}, function(response) {
					  console.log(response.farewell);
					});
				document.getElementsByClassName("Ls")[0].click();
				};
			});
		}
	else {setTimeout(compose,20);};
	};
	
function gmailVacationText(){
	var gmailVacationElement = document.querySelector("#preftopbar>.yc>div>div");
	if(gmailVacationElement){
		gmailVacationElement.innerText = "Gmail Vacation Responder";
		}
	else {setTimeout(gmailVacationText,20);};
	};
	
function gmailVacationClose(){
	if(document.querySelector("#preftopbar > .xc > div")){
		document.querySelector("#preftopbar > .xc > div").addEventListener("click", function(){
			chrome.extension.sendMessage({gmail: "closeSettings"}, function(response) {
				console.log(response.farewell);
				});
			});
		}
	else {setTimeout(gmailVacationClose,20);};
	};
	
function infScroll(){
	if(document.querySelector("#tl_ .Hi") != null){
			var scrollFrame = document.querySelector("#tl_ .Hi");
			scrollFrame.addEventListener("scroll", function(){
				console.log("a_" + scrollFrame.offsetHeight);
				console.log("b_" + scrollFrame.scrollTop);
				console.log("ab_" + scrollFrame.offsetHeight + scrollFrame.scrollTop);
				if(scrollFrame.offsetHeight + scrollFrame.scrollTop >= scrollFrame.scrollHeight - 44){
					document.querySelector("#tl_ .Tn .Pn").click();
					scrollFrame.scrollTop += 2;
					};
				if(scrollFrame.scrollTop == 0){
					document.querySelector("#tl_ .Sn .Pn").click();
					};
			  });
		}
	else {
		setTimeout(infScroll, 100);
		};
	};