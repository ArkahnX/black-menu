window.addEventListener("DOMContentLoaded", init);

function init() {
	loadIframe();
	localization(); //from main.js
	setTitle();
	tasksExpandSystem();
	};
	
function setTitle() {
	document.getElementById("title").innerText = "Black Menu - " + chrome.i18n.getMessage("msg1");
	};

function loadIframe() {
	document.getElementById("iframeCalendar").src = "https://www.google.com/calendar/ig?hl=" + browserLang + "&up_showEmptyDays=" + localStorage.getItem("prefCalendarEmptydays");
	document.getElementById("iframeTasks").src = "https://www.google.com/blackmenu/tasks/"+ Date() + "/?hl=" + browserLang;
	};
	
function tasksExpandSystem(){
	if(localStorage.getItem("prefCalendarTasksexpanded") == "1" || localStorage.getItem("prefCalendarTasksexpanded") == "true"){
		tasksChangeState()
		};

	function tasksChangeState(){
		if(document.body.dataset.tasksstate == "collapsed") {
			document.body.dataset.tasksstate = "expanded";
			}
		else{
			document.body.dataset.tasksstate = "collapsed";
			}
		};
	document.getElementById("searchboxCalendar").addEventListener('mouseover',function (){
		if(document.body.dataset.tasksstate = "expanded"){
			tasksChangeState();
			};
		});
		
	document.getElementById("headerCalendarTasks").addEventListener('click',function (){
		tasksChangeState()
		}, false);
	};