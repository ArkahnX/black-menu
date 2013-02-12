String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var goBackTitle = false;
var moreDetailsTitle = false;
getPicker();

function getPicker() {
	if(document.getElementById("gadget-dp-1cur")){
		changeMonth();
		}
	else{
		setTimeout(getPicker,1);
		};
	};

function changeMonth(){
	var monthAndYear = document.getElementById("gadget-dp-1cur").innerHTML.split(" ");
	var year = monthAndYear[1];
	var month = monthAndYear[0];
	var monthShortened = month.substring(0,3);
	document.getElementById("gadget-dp-1cur").innerHTML = monthShortened + " " + year;
	setTimeout(changeMonth,1);
	};
	
function addOtherTitles(){
	var goBack = document.getElementById("hideDetailsLink1");
	var moreDetails = document.querySelector("#hideDetailsLink1 + .menu-link");
	if(goBack && moreDetails){
		if(!moreDetailsTitle){
			moreDetailsTitle = moreDetails.innerText.split(" ")[0].capitalize();
			};
		moreDetails.innerText = "...";
		moreDetails.setAttribute("style", moreDetails.getAttribute("style") + ";font-size:17px !important");
		moreDetails.setAttribute("title", moreDetailsTitle);
		if(!goBackTitle){
			goBackTitle = goBack.innerText.substr(2).capitalize();
			};
		goBack.setAttribute("title", goBackTitle);
		}
	};
	
addHomeTitles();

function addHomeTitles(){
	var newEvent = document.getElementById("addEventLink1");
	var todayButton = document.getElementById("todayLink1");
	if(newEvent && todayButton){
		newEvent.setAttribute("title", newEvent.innerText);
		todayButton.setAttribute("title", todayButton.innerText);
		}
	else{
		setTimeout(addHomeTitles, 20);
		}
	};
	
window.addEventListener("load", function(){
	var scriptElements = document.getElementsByTagName("script");
	var email = "";
	for(var i = scriptElements.length; i--; i>0){
		if (email == ""){
			var scriptInner = scriptElements[i].innerHTML
			if(scriptInner.indexOf("@gmail.com") != -1){
				email = scriptInner.split('email":"')[1].split('","')[0];
				chrome.storage.local.set({'calendarEmail':email})
				};
			};
		};
	});
	
document.addEventListener("mousedown", addOtherTitles);