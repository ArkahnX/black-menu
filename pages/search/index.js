window.addEventListener("load", init); 
var searchType = "web";
var instantSearch = ""
	if(localStorage.getItem("prefSearchInstant") == "true") { instantSearch = true; }
	else { instantSearch = false; }

function init() {
	loadSearchFilters();
	searchOnEnter();
	searchOnKeyPress();
	document.getElementById("moreButton").addEventListener("click", toggleMoreMenu);
	document.getElementById("moreLinksGhostContainer").addEventListener("click", toggleMoreMenu);
	toggleSearchType();
	};

function isKey(key){
	if(event.keyCode==key){ return true }
	else { return false };
	};
	
function toggleSearchType() {
	var searchTypeElements = document.getElementsByClassName("searchType");
	for(var i=searchTypeElements.length;i--;i>0){
		searchTypeElements[i].addEventListener("click", function(){
			searchType = this.id;
			search();
			document.querySelector('.searchType[data-state="active"]').dataset.state = "inactive";
			this.dataset.state = "active";
			document.getElementById("results").dataset.type = searchType;
			});
		};
	};
	
function search() {
	var query = document.getElementById("WindowSearchInput").value;
	if( query != ""){
		document.getElementById("results").innerHTML = '<div id="loadIndicator"></div>';
		switch (searchType){
			case "web":
				webSearch(query);
				break;
			case "images":
				imageSearch(query);
				break;
			case "books":
				bookSearch(query);
				break;
			};
		}
	else {
		document.getElementById("results").innerHTML = "";
		};
	};
	
function webSearch(query) {
	xhrWebSearch = new XMLHttpRequest();
	xhrWebSearch.open('GET','http://www.google.com/search?q=' + query);
	xhrWebSearch.onload = function() {
	document.getElementById("results").innerHTML = xhrWebSearch.responseText.split('id="rso">')[1].split('</ol></div><!--z-->')[0];
	document.getElementById("gstyle").innerHTML = xhrWebSearch.responseText.split('id="gstyle">')[1].split('</style>')[0];
	};
	xhrWebSearch.send(null);
	};
	
function imageSearch(query) {
	xhrimageSearch = new XMLHttpRequest();
	xhrimageSearch.open('GET','https://www.google.com/search?tbm=isch&sout=1&q=' + query);
	xhrimageSearch.onload = function() {	
		document.getElementById("results").innerHTML = xhrimageSearch.responseText.split('id="ires">')[1].split('<ol></ol>')[0].replace(/<\/td><td/g,'</td></tr><tr><td');
		document.getElementById("gstyle").innerHTML = xhrimageSearch.responseText.split('<style>')[2].split('</style>')[0];
		};
	xhrimageSearch.send(null);
	};

	
function bookSearch(query) {
	xhrBooksSearch = new XMLHttpRequest();
	xhrBooksSearch.open('GET','http://www.google.com/search?tbm=bks&q=' + query);
	xhrBooksSearch.onload = function() {
	document.getElementById("results").innerHTML = xhrBooksSearch.responseText.split('id="rso">')[1].split('</ol></div><!--z-->')[0];
	document.getElementById("gstyle").innerHTML = xhrBooksSearch.responseText.split('id="gstyle">')[1].split('</style>')[0];
	};
	xhrBooksSearch.send(null);
	};
	
function searchOnKeyPress() {
	if(instantSearch){
		document.getElementById("WindowSearchInput").addEventListener("keyup", function() {
			search();
			});
		};
	};
	
function searchOnEnter() {
	document.getElementById("WindowSearchInput").addEventListener("keypress", function() {
		if(isKey(13)){
			if(instantSearch){
				var query = document.getElementById("WindowSearchInput").value;
				if(searchType == "web"){
					window.open("https://www.google.com/search?hl="+ window.navigator.language + "&q=" + query);
					}
				else{
					if(searchType == "books"){
						window.open("https://www.google.com/search?tbm=bks&hl="+ window.navigator.language + "&q=" + query);
						}
					else{
						window.open("https://www.google.com/search?tbm=isch&hl="+ window.navigator.language + "&q=" + query);
						}
					}
				}
			else{
				search();
				};
			};
		});
	};

function toggleMoreMenu() {
	var moreLinksMenu = document.getElementById("moreLinks");
	var moreLinksGhostContainer = document.getElementById("moreLinksGhostContainer");
	if(moreLinksMenu.dataset.state != "on"){
		moreLinksMenu.dataset.state = "on";
		moreLinksGhostContainer.dataset.state = "on";
		}
	else {
		moreLinksMenu.dataset.state = "off";
		moreLinksGhostContainer.dataset.state = "off";
		document.getElementById("WindowSearchInput").focus();
		};
	};

function loadSearchFilters() {
	var searchFilters = document.getElementsByClassName("searchFilter")
	for(var i=searchFilters.length;i--;i>0){
		searchFilters[i].addEventListener("click", function(){
			var query = document.getElementById("WindowSearchInput").value;
			if(query == ""){
				window.open(this.dataset.link.replace("[chromeLang]", window.navigator.language));
				}
			else{
				window.open(this.dataset.search.replace("[query]", query).replace("[chromeLang]", window.navigator.language));
				}
			});
		};
	};