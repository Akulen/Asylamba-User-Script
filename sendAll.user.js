// ==UserScript==
// @name        SendAll
// @namespace   Asylamba
// @include     http://game.asylamba.com/s*/bases/view-commercialplateforme/mode-resource
// @version     0.2
// @updateURL		https://github.com/Akulen/Asylamba-User-Script/raw/master/sendAll.user.js 
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       GM_xmlhttpRequest
// @author			Akulen
// ==/UserScript==

var server = /\/s([0-9]*)\//.exec(window.location.href)[1];

function sendAll()
{
  var token = /token-([^\/]*)/.exec($("form[action^='http://game.asylamba.com/s" + server + "/action/a-giveships/baseid-']").attr("action"))[1];

  var base = /baseid-([^\/]*)/.exec($("form[action^='http://game.asylamba.com/s" + server + "/action/a-giveships/baseid-']").attr("action"))[1];
  var dest = $("input[name='otherbaseid']")[1].getAttribute("value");

  $("div[id^='sell-ships-']").map(function() {  
    var id = /[0-9]+/.exec($(this).attr("id"))[0];
    var max = $(this).attr("data-max-quantity");
    var query = {};
    query["otherbaseid"] = dest;
    query["quantity-" + id] = max;
    query["identifier-" + id] = "Envoyer";
    console.log(query);
    $.post("http://game.asylamba.com/s" + server + "/action/a-giveships/baseid-"+base+"/token-"+token+"/sftr-2", query);
  }).get();
  setTimeout(function(){
   location.reload();
  }, 5000);
}

$(document).ready(function() {
  $("form[action^='http://game.asylamba.com/s" + server + "/action/a-giveships/baseid-']").children().first().next().next().after(
  `<p>
    <input id="sendall" type="button" value="Envoyer Tout" style="background: #b01e2d none repeat scroll 0 0; border: 1px solid #0a0a0a; color: #fff; cursor: pointer; display: block; margin: 0 0 0 auto; overflow: hidden; padding: 6px 10px; width: 100%;">
  </p>`);
  $("input[id=sendall]")[0].addEventListener("click", sendAll, false);
}); 
