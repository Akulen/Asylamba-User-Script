// ==UserScript==
// @name        Asylamba Trader Tools
// @namespace   Akulen
// @include     http://game.asylamba.com/s*/profil*
// @include     http://game.asylamba.com/s*/bases/view-spatioport/mode-search*
// @include     http://game.asylamba.com/s*/bases/view-spatioport/mode-search/show-result*
// @version     0.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       GM_xmlhttpRequest
// @author		Akulen
// ==/UserScript==

var server = /\/s([0-9]*)\//.exec(window.location.href)[1];
var page = /\/s[0-9]*\/(.*)$/.exec(window.location.href)[1];
var dataurl = "https://api.myjson.com/bins/3kepz";

$(window).load(function(){
	GM_xmlhttpRequest({
		method: "GET",
		url: dataurl,
		onload: function(response)
		{
			var data = JSON.parse(response.responseText);
			if(page == "profil")
				update(data);
			else if(page == "bases/view-spatioport/mode-search")
				config();
			else if(page == "bases/view-spatioport/mode-search/show-result")
				addInfo(data);
		}
	});
});

function update(data)
{
	var player = /Profil — ([^—]*)—/.exec($("title").html())[1];
	player = player.slice(0, -1);
	var playerId = data.players.length;
	for(var i = 0; i < playerId; ++i)
		if(data.players[i].name == player)
			playerId = i;
	if(playerId == data.players.length)
		data.players.push({"name":player, "planets":[]});
	
	$("div[class='component hasMover']").map(function() {
		var planetName = $(this).children().first().children().first().next().html();
		if($(this).children().last().children().first().children().last().prev().html() == "Spatioport")
		{
			var roads = $(this).children().last().children().first().children().last().children().first().next().html();
			var usedRoads = parseInt(/^[0-9]*/.exec(roads));
			var totalRoads = parseInt(/[0-9]*$/.exec(roads));
			var availRoads = totalRoads - usedRoads;
			
			var planetId = data.players[playerId].planets.length;
			for(var i = 0; i < planetId; ++i)
				if(data.players[playerId].planets[i].name == planetName)
					planetId = i;
			if(planetId == data.players[playerId].planets.length)
			 data.players[playerId].planets.push({"name":planetName, "roads":0});
			data.players[playerId].planets[planetId].roads = availRoads;
  		}
	});
	$.ajax({
		url:"https://api.myjson.com/bins/3kepz",
		type:"PUT",
		data:JSON.stringify(data),
		contentType:"application/json; charset=utf-8",
		dataType:"json",
		success: function(data, textStatus, jqXHR){
			console.log("coin");
		}
	});   
}

function config()
{
	$("#search-rc-min-dist").attr("value", "100");
	$("#ckb-faction-1").attr("checked", "");
	$("#ckb-faction-4").removeAttr("checked");
	$("#ckb-faction-8").removeAttr("checked");
	$("#ckb-faction-9").removeAttr("checked");

}

function addInfo(data)
{
	$("a.player").map(function() {
		var playerName = $(this).children().first().next().html();
		var planetName = $(this).children().last().prev().html();
		var playerId = data.players.length;
		for(var i = 0; i < playerId; ++i)
			if(data.players[i].name == playerName)
				playerId = i;
		if(playerId < data.players.length)
		{
			var planetId = data.players[playerId].planets.length;
			for(var i = 0; i < planetId; ++i)
				if(data.players[playerId].planets[i].name == planetName)
					planetId = i;
			if(planetId < data.players[playerId].planets.length)
			{
				$(this).prepend('<span class="picto color1" style=" position: absolute; top: 11px; right: 10px; height: 35px; width: 35px; line-height: 35px; padding: 5px; border-radius: 100%; font-size: 1pc; text-align: center; color: #fff; text-decoration: none; background: #510816;" href="#">' + data.players[playerId].planets[planetId].roads + '</span>');
			}
		}
	});
}
