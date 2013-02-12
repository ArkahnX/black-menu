var urlVariables = JSON.parse('{"' + decodeURI(window.location.search.split("?")[1].replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');

var link  = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('type', 'text/css');
	link.setAttribute('href', 'chrome-extension://' + chrome.i18n.getMessage("@@extension_id") + '/contentScripts/gplus_page.css');

if(urlVariables["page"] == "notifications"){
	setPage();
	}
	
function setPage(){
	for(var i = 20; i--; i>0){
		var found = false;
		if(document.getElementById(":" + i + ".c")){
			found = true;
			document.getElementById(":" + i + ".c").click();
			document.getElementById(":" + i + ".c").addEventListener("click", function (){
				document.getElementsByClassName("VNb Xeb")[0].setAttribute("style", "display:none;");
				});
			}
		}
	if(!found){
		if(document.getElementsByClassName("Bw")[0]){
			found = true;
			document.getElementsByClassName("Bw")[0].click();
			document.getElementsByClassName("Bw")[0].addEventListener("click", function (){
				document.getElementsByClassName("VNb Xeb")[0].setAttribute("style", "display:none;");
				});
			}	
		else{
			setTimeout(setPage, 20);
			}
		};
	}
	
window.addEventListener("load", function(){
	document.head.appendChild(link);
	var newPost = document.querySelector("[href=stream]");
	newPost.removeAttribute('href');
	newPost.setAttribute("title", "New Post");
	newPost.addEventListener("click", function(){
		document.getElementsByClassName("VNb Xeb")[0].setAttribute("style", "display:block;");
		document.getElementsByClassName("moa b0c9Gc")[0].setAttribute("style", "display:none;");
		document.getElementsByClassName("Ff")[0].click();
		});
	getNewPostTitle();
	function getNewPostTitle(){
		if(document.getElementsByClassName("Fi")[0]){
			newPost.setAttribute("title", document.getElementsByClassName("Fi")[0].innerText);
			}
		else{
			setTimeout(getNewPostTitle,10);
			};
		};
	});
	
