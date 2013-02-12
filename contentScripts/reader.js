if(location.href.indexOf("markAsRead") != -1){
	if(location.href.split("markAsRead=")[1].split("&")[0] == "true"){
		window.addEventListener("load", function(){
			addMarkAsRead();
			});
		};
	};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function addMarkAsRead() {
	var target = "";
	if (top === self) {
		target = "markAsReadFrame";
		var frame = document.createElement("iframe");
		frame.setAttribute("style", "display:none;");
		frame.setAttribute("name", "markAsReadFrame");
		document.body.appendChild(frame);
	} else {
		target = "_parent";
	}
	for(var i=7;i--;i>0){
		var link = document.createElement("a");
		link.innerText = "mark as read";
		link.setAttribute("class", "markAsRead");
		link.setAttribute("id", "markAsRead" + i);
		link.setAttribute("onclick", 'document.getElementsByClassName("title-link")['+i+'].setAttribute("target", "'+ target +'");document.getElementsByClassName("title-link")['+i+'].click();document.getElementsByClassName("title-link")['+i+'].setAttribute("target", "_blank");');
		document.body.appendChild(link);
		}
	}

window.addEventListener("load", function(){

	var refreshButton = document.getElementById("refresh");
	refreshButton.setAttribute("title", refreshButton.innerText.capitalize());
	selectBoxBlur();
	});
	
function selectBoxBlur(){
	var selectBoxes = document.getElementsByTagName("select");
	for(var i = selectBoxes.length;i--;i>0){
		selectBoxes[i].addEventListener("click", function() {
			this.classList.toggle("focus");
			});
		selectBoxes[i].addEventListener("blur", function() {
			this.classList.remove("focus");
			});
		};
	};

/*
document.getElementById("list").addEventListener("scroll", function(){
  if(document.getElementById("list").offsetHeight + document.getElementById("list").scrollTop == 350){
    document.getElementById("down").click();
    document.getElementById("list").scrollTop -= 2;
    }
  if(document.getElementById("list").scrollTop == 0){
    document.getElementById("up").click();
    document.getElementById("list").scrollTop += 2;
    }
  });

*/