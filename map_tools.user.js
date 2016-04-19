// ==UserScript==
// @name        Asylamba Map Tools
// @namespace   Akulen
// @include     http://game.asylamba.com/s9/map
// @include     http://game.asylamba.com/s9/map*
// @include     http://game.asylamba.com/s10/map
// @include     http://game.asylamba.com/s10/map*
// @include     http://game.asylamba.com/s*/map
// @include     http://game.asylamba.com/s*/map*
// @version     0.42
// @grant       GM_xmlhttpRequest
// ==/UserScript==

//----------
var sectorInfoUrl = "<Remplacez ce texte par l'URL fournie dans la presentation de ce script>"; // <-- Texte à remplacer !!!
//----------





var $ = unsafeWindow.jQuery;

var processing = false;
var ready = false;
var sectorInfo = [];
var sectorBool = false;

var mapSize;
var nbCase;
var caseSize;

var tactical_pic = "http://game.asylamba.com/s9/public/media/faction/data/tactical.png";
var diplomacy_pic = "http://game.asylamba.com/s9/public/media/faction/data/diplomacy.png";
var find_pic = "http://game.asylamba.com/s9/public/media/common/nav-embassy.png";
var compas_pic = "http://game.asylamba.com/s9/public/media/university/networks.png";

function addCss(newCss)
{
	if(!$('#custom-css').length)
	{
		$("head").append('<style id="custom-css" type="text/css"></style>');
	}
	$('#custom-css').append(newCss);
}

function createIcon()
{
  addCss("#maptools{ top: 30px; right: 300px; z-index: 1000; position: absolute; display: inline-block; height: 2pc; padding: 3px 0px; background: transparent url('http://game.asylamba.com/s9/public/css/src/desktop/map/bOption.png') repeat-x scroll 0% 0%; }");
  addCss("#maptools a img { position: absolute; top: 5px; left: 5px; width: 22px;}");
  addCss("#maptools::before { content: ''; position: absolute; display: block; left: -10px; top: 0px; height: 38px; width: 10px; background: transparent url('http://game.asylamba.com/s9/public/css/src/desktop/map/bLeftOption.png') repeat scroll 0% 0%; }");
  addCss("#maptools::after { content: ''; position: absolute; display: block; right: -10px; top: 0px; height: 38px; width: 10px; background: transparent url('http://game.asylamba.com/s9/public/css/src/desktop/map/bRightOption.png') repeat scroll 0% 0%; }");
  addCss("#maptools a { position: relative; display: inline-block; height: 30px; width: 30px; margin: 1px 0px 1px 1px; background: #0A0A0A none repeat scroll 0% 0%; }");
  addCss("#maptools a.active { background: #510816 none repeat scroll 0% 0%; }");
  var toolsDiv = document.createElement('div');
  toolsDiv.innerHTML = `<div id="maptools">
   <a id="sectorInfo" class="sh hb lb" href="#" title="Infos"><img src="`+tactical_pic+`" alt="minimap"></a>
   <a id="zoom" class="sh hb lb" href="#" title="Zoom"><img src="`+diplomacy_pic+`" alt="minimap"></a>
   <a id="find" class="sh hb lb" href="#" title="Trouver"><img src="`+find_pic+`" alt="minimap"></a>
   <a id="compas" class="sh hb lb" href="#" title="Compas"><img src="`+compas_pic+`" alt="minimap"></a>
  </div>`;
  document.getElementById("container").appendChild(toolsDiv);
  document.getElementById('sectorInfo').addEventListener('click', toggleSectorInfo, false);
  document.getElementById('zoom').addEventListener('click', toggleZoom, false);
  document.getElementById('find').addEventListener('click', find, false);
  document.getElementById('compas').addEventListener('click', compas, false);
}

function toggleSectorInfo()
{
	sectorBool = !sectorBool;
	toggleData();
}

function toggleZoom()
{
  var nZoom = prompt("Nouveau Zoom (compris entre 0 et 1)");
  $("#map").css('-moz-transform','scale('+nZoom+')');
  $(".viewport").css('-moz-transform','scale('+String(1/nZoom)+')');
  $("#map").css('-webkit-transform','scale('+nZoom+')');
  $(".viewport").css('-webkit-transform','scale('+String(1/nZoom)+')');
  unsafeWindow.mapController.moveTo(125,125);
}

function find()
{
  var x = prompt("Coordonnée X :");
  var y = prompt("Coordonnée Y :");
  unsafeWindow.mapController.moveTo(x,y);
  $("[data-y-position=" + y + "][data-x-position=" + x + "]")[0].click();
}

function compas()
{
  var x = prompt("Coordonnée X :");
  var y = prompt("Coordonnée Y :");
  var radius = prompt("Rayon :");
  unsafeWindow.mapController.moveTo(x,y);
  var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
  circle.setAttribute("cx", x * caseSize);
  circle.setAttribute("cy", y * caseSize);
  circle.setAttribute("r", radius * caseSize + 10);
  document.getElementById('own-base').firstChild.appendChild(circle);
}

function getData() {
  if(!ready  && !processing) {
    processing = true;
    GM_xmlhttpRequest({
  			method: "GET",
  			url: sectorInfoUrl,
  			onload: function(response) {
      	var lines = response.responseText.split("\n");
      	for each (var res in lines) {
      	    var cur = res.split(",");
      	    if(parseInt(cur[0]) > 0) {
      	      sectorInfo[parseInt(cur[0])] = [cur[1]];
      	    }
      	  }
  				ready = true;
          processing = false;
  			}
  		});
  }
}

function toggleData() {
  getData();
  if(!ready)
    setTimeout(function() { toggleData(); }, 1000);
  else {
	  if(sectorBool)
	  	$("#sectorInfo").addClass("active");
	  else
	  	$("#sectorInfo").removeClass("active");
    sectorInfo.forEach(function (sector,i) {
      var color = "";
      var info = sector[0].substring(0, sector[0].length-1);
      var info2 = sector[0];
      if(sectorBool) {
        var infoBox = document.getElementById("sector-info-"+i);
        if(info == "Prioritaire" || info2 == "Prioritaire")
        {
          color = "#307600";
          infoBox.getElementsByTagName("h2")[0].innerHTML += " - Prioritaire";
        }
        else if(info == "Urgent" || info2 == "Urgent")
        {
          color = "#ff3b00";
          infoBox.getElementsByTagName("h2")[0].innerHTML += " - Urgent";
        }
        else if(info == "Permis" || info2 == "Permis")
        {
          color = "#6E161B";
          infoBox.getElementsByTagName("h2")[0].innerHTML += " - Permis";
        }
        else if(info == "Gelé" || info2 == "Gelé")
        {
          color = "#404040";
          infoBox.getElementsByTagName("h2")[0].innerHTML += " - Gelé";
        }
        else {
          color = "#1028A9";
          infoBox.getElementsByTagName("a")[0].href = sector[0];
          infoBox.getElementsByTagName("h2")[0].innerHTML += " - Partagé";
        }
      }
      var bigSector = document.getElementById("sectors").firstChild.childNodes[i-1];
      bigSector.style.fill = color;
      var miniSector = document.getElementsByClassName("mini-map")[0].firstChild.childNodes[i-1];
      miniSector.style.fill = color;
    });
  }
}

function init() {
  mapSize = parseInt($("[id='map']").attr("data-map-size"));
  caseSize = parseInt($("[id='map']").attr("data-map-ratio"));
  nbCase = mapSize/caseSize;
  createIcon();
}

init();

