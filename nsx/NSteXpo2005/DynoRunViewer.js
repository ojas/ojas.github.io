var colors = ["Blue", "Red", "Green"];
var slots = [null,null,null];
var veh = ["", "NSXLuvr", "Fastrunner", "rbirling", "SamBel", "loNfastNSX", "NSX FoYoAss", "DPG", "mmmvious", "Paul", "rbirling"];
function loadRun(slot,img) {
	var url = (img.length==0) ? "http://cdn.ojas.net/nsx/NSteXpo2005/Media/blank.gif" : ("http://cdn.ojas.net/nsx/NSteXpo2005/Media/Graphs/" + img);
	document.getElementById("slot" + slot).src = url;
}
function clearAll() {
	for(var i=0;i<slots.length;i++)
		if(slots[i]!=null)
			runClick(slots[i]);
			
}
function runClick(ele) {
	selectRunById(ele.id);
}

function slotIndexOf(ele) {
	for(var i=0;i<slots.length;i++)
		if (slots[i]==ele)
			return i;
	return null;
}
function selectRunById(id, noMessage) {
	var row = document.getElementById(id);
	var idx = slotIndexOf(row);
	var img;
	if (idx!=null) {
		slots[idx] = null;
		img = document.getElementById("slot" + idx);
		img.style.display = "none";
		img.src = "Media/Loading.gif";
		hiliteRow(row, null);
	} else {
		idx = slotIndexOf(null);
		if (idx!=null) {
			var vehIdx = id.substr(3,2);
			var runNum = id.substr(5,3);
			var vehName = veh[new Number(vehIdx)];
			var color = colors[idx];//"Blue";
			slots[idx] = row;
			var url = "http://cdn.ojas.net/nsx/NSteXpo2005/Media/Graphs/" + vehIdx + " " + vehName + " [RunFile_" + runNum + "," + color + ",1].png";
			img = document.getElementById("slot" + idx);
			img.style.display = "";
			img.src = url;
			hiliteRow(row, color);
		} else if (noMessage) {
		} else {
				alert("The maximum number of runs is already shown.  Remove at least one run before adding another.")
		}
	}
}

function hiliteRow(row, color) {
	row.style.backgroundColor = color==null?"":color;
	row.style.color = color==null?"":"white";
}

// Load from QueryString
window.onload = function() {
	var qs = document.location.search;
	if (qs.length>0) {
		qs = qs.substr(1).toLowerCase();
		var idx = qs.indexOf("select=");
		if (idx>-1) {
			var ids = qs.substr(idx+7).split("&")[0].split(",");
			for(var i=0;i<ids.length;i++) {
				var id = "run" + ids[i];
				if(document.getElementById(id)!=null)
					selectRunById(id, true);
			}
		}
	}
}

