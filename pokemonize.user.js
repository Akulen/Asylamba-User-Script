// ==UserScript==
// @name        Pokemonizer
// @namespace   Asylamba
// @include     http://game.asylamba.com/s11/*
// @version     0.1.4
// @updateURL		https://github.com/Akulen/Asylamba-User-Script/raw/master/pokemonize.user.js 
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       GM_xmlhttpRequest
// @author			Akulen
// ==/UserScript==

var playerList = JSON.parse(`{"players":[
{"id":13,"name":"Matrisside"},
{"id":23,"name":"Grumbl"},
{"id":8,"name":"Trivar"},
{"id":51,"name":"Helba"},
{"id":30,"name":"Professeur Chen"},
{"id":43,"name":"Ysin Adralatrax"},
{"id":55,"name":"Durandal"},
{"id":24,"name":"Tylah Pinroz"},
{"id":9,"name":"Alyxander Hawk"},
{"id":42,"name":"kReZi"},
{"id":17,"name":"Tilda Vespali"},
{"id":25,"name":"Kabak"},
{"id":93,"name":"Enagor"},
{"id":46,"name":"Tomnos77oneill"},
{"id":54,"name":"iClanLouis92"},
{"id":47,"name":"hatonjan"},
{"id":76,"name":"Phiphi"},
{"id":36,"name":"GantZz"},
{"id":96,"name":"Quinterius Tahl"},
{"id":112,"name":"Elisabeth III"},
{"id":70,"name":"Yolog"},
{"id":39,"name":"Eris Valceciel"},
{"id":10,"name":"WeT"},
{"id":31,"name":"ToniO"},
{"id":73,"name":"Avok"},
{"id":69,"name":"kikob"},
{"id":22,"name":"rob"},
{"id":66,"name":"xREPENTANCEx"},
{"id":63,"name":"lil mayo"},
{"id":33,"name":"Zealot N'atch"},
{"id":81,"name":"Aladeen"},
{"id":82,"name":"Le Gritche"},
{"id":19,"name":"Tnoiseagogo"},
{"id":56,"name":"Ragnhar"},
{"id":103,"name":"El Commandante"},
{"id":58,"name":"Kaiiros"},
{"id":97,"name":"KrakenFR"},
{"id":15,"name":"Xineros"},
{"id":68,"name":"Akulian Ageifen"},
{"id":59,"name":"Gniark"},
{"id":60,"name":"Thelonius"},
{"id":67,"name":"Gwerang"},
{"id":89,"name":"forcerouge"},
{"id":92,"name":"LeB0ucEtMistere"},
{"id":74,"name":"Agatha"},
{"id":64,"name":"Hallinskidi"},
{"id":48,"name":"Evan de Comnene"},
{"id":99,"name":"Batonga"},
{"id":115,"name":"Alecto"},
{"id":52,"name":"Darkraf"},
{"id":41,"name":"Draze"},
{"id":90,"name":"Réginald"},
{"id":75,"name":"kensev"},
{"id":20,"name":"Offril"},
{"id":100,"name":"Nywihell"},
{"id":102,"name":"Romu"},
{"id":16,"name":"Jj22"},
{"id":124,"name":"Cobraken"},
{"id":86,"name":"Faker Taxi"},
{"id":108,"name":"AlNamaK"},
{"id":14,"name":"reaverlord"},
{"id":87,"name":"Noob"},
{"id":53,"name":"Ryuuketsu"},
{"id":49,"name":"Baudouin"},
{"id":80,"name":"foxthesly"},
{"id":106,"name":"Oroboros"},
{"id":121,"name":"sikarep"},
{"id":61,"name":"Oxymore"},
{"id":84,"name":"Dayc"},
{"id":44,"name":"Yin"},
{"id":83,"name":"Ayaash"},
{"id":125,"name":"Phaera"},
{"id":136,"name":"Euzhan_LeGrand"},
{"id":77,"name":"ApophisLeGrand"},
{"id":135,"name":"HouziX"},
{"id":88,"name":"Ophélia"},
{"id":37,"name":"YoboK"},
{"id":120,"name":"Guss"},
{"id":114,"name":"sheldcoop"},
{"id":109,"name":"Doudou"},
{"id":130,"name":"Gultarg le Haut"},
{"id":122,"name":"Kregov"},
{"id":156,"name":"Lurat"},
{"id":126,"name":"Octans"},
{"id":98,"name":"CaptainSaha"},
{"id":149,"name":"Jessie Miaous"},
{"id":140,"name":"Eykkho"},
{"id":38,"name":"Doolbred"},
{"id":155,"name":"Nafros"},
{"id":141,"name":"Hapalash"},
{"id":154,"name":"Harlock"},
{"id":128,"name":"Tylwyth Waff"},
{"id":110,"name":"Oznarax"},
{"id":133,"name":"muck"},
{"id":137,"name":"Reine Sersei"},
{"id":34,"name":"Pomana"},
{"id":35,"name":"Smester"},
{"id":145,"name":"cerberos"},
{"id":85,"name":"Naji"},
{"id":152,"name":"Kousto"},
{"id":7,"name":"abdelaz3r"},
{"id":160,"name":"Doctor Crow"},
{"id":144,"name":"E_77_b92"},
{"id":116,"name":"Seppuku"},
{"id":153,"name":"ZykioRRR"},
{"id":134,"name":"S. Bruckyn"},
{"id":161,"name":"gbreizh33"},
{"id":78,"name":"kortex"},
{"id":139,"name":"Viking"},
{"id":65,"name":"Gyr"},
{"id":117,"name":"kafou"},
{"id":132,"name":"glen"},
{"id":148,"name":"Alexia"},
{"id":101,"name":"Underman"},
{"id":45,"name":"Fantosh"},
{"id":94,"name":"Javasava"},
{"id":71,"name":"Lodis"},
{"id":138,"name":"Hamilcar"},
{"id":91,"name":"Hazmat"},
{"id":127,"name":"Killua"},
{"id":79,"name":"Dri Sih"},
{"id":72,"name":"Stark"},
{"id":158,"name":"byebye100"},
{"id":57,"name":"DrSuppo"},
{"id":50,"name":"BolRiz"},
{"id":129,"name":"Noah"},
{"id":162,"name":"ledestroyer"},
{"id":163,"name":"SACHAX"},
{"id":62,"name":"Doriax"},
{"id":164,"name":"cpt Flamme"},
{"id":113,"name":"Numi"},
{"id":40,"name":"Coluche"},
{"id":107,"name":"NA SuShi"},
{"id":143,"name":"pierrepp"},
{"id":157,"name":"Ganngow"},
{"id":118,"name":"Tretan"},
{"id":131,"name":"LE CONQUERAN"},
{"id":28,"name":"Estiocle"},
{"id":150,"name":"Hyperion"},
{"id":32,"name":"Elbarbo"},
{"id":165,"name":"SatanicGeek"},
{"id":111,"name":"Sahaladin"},
{"id":123,"name":"Lord Hersdale"},
{"id":146,"name":"MyckiBee"},
{"id":147,"name":"command0"},
{"id":166,"name":"BOOBA74"},
{"id":142,"name":"al3x"},
{"id":159,"name":"v45e87"},
{"id":151,"name":"lisandro"},
{"id":119,"name":"Irezix v4"}
]}`);

function pokemonize(){
  $("img.picto[alt!='']").map(function() {
      var id = parseInt(/[^-]*$/.exec($(this).parent().attr("href"))[0]);
	  if(id == 149)
		  id = 52;
      if(id == 68)
        $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/448.png");
      else
        $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/" + (((id-1) % 150) + 1) + ".png");
      $(this).attr("name", "done");
  }).get();

  $("img.avatar").map(function() {
      if($(this).parent().attr("class") == "openplace")
      {
        var id = parseInt(/[^-]*$/.exec($(this).parent().parent().next().children().first().children().first().children().first().next().next().children().last().children().first().attr("href"))[0]);
        if(isNaN(id))
          id = parseInt(/[^-]*$/.exec($(this).parent().parent().next().children().first().children().first().children().first().next().next().next().children().last().children().first().attr("href"))[0]);
	  	if(id == 149)
		  id = 52;
        if(id == 68)
          $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/448.png");
        else
          $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/" + (((id-1) % 150) + 1) + ".png");
      }
      else if(typeof $(this).parent().attr("href") !== 'undefined' || $(this).parent().attr("class") == "message write")
      {
        var name = $(this).attr("alt");
        var id = 129;
        for each(var player in playerList.players)
        {
          if(player.name == name)
            id = player.id;
        }
	  	if(id == 149)
		  id = 52;
        if(id == 68)
          $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/448.png");
        else
          $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/" + (((id-1) % 150) + 1) + ".png");
      }
      else
      {
        var id = parseInt(/[^-]*$/.exec($(this).parent().children().last().children().last().children().last().attr("href"))[0]);
        if(isNaN(id))
          id = parseInt(/[^-]*$/.exec($("a[href^='http://game.asylamba.com/s11/embassy/player-'").attr("href")));
	  	if(id == 149)
		  id = 52;
        if(id == 68)
          $(this).attr("style", "background: url('https://www.pokebip.com/pokedex/images/sugimori/151.png'); background-color: #0a0a0a; background-position: center; background-repeat: no-repeat; width: 120px; height: 120px;");
        else
          $(this).attr("style", "background: url('https://www.pokebip.com/pokedex/images/sugimori/" + (((id-1) % 150) + 1) + ".png'); background-color: #0a0a0a; background-position: center; background-repeat: no-repeat; width: 120px; height: 120px;");
        $(this).attr("src","");
        $(this).attr("alt","");
      }
      $(this).attr("name", "done");
  }).get();

  $("img[alt^='avatar'").map(function() {
    var name = $(this).parent().parent().children().first().children().last().html();
    var id = -1;
    for each(var player in playerList.players)
    {
      if(player.name == name)
        id = player.id;
    }
    if(id == -1)
    {
		  name = $(this).parent().parent().children().first().next().children().last().html();
		  id = 129;
		  for each(var player in playerList.players)
		  {
		    if(player.name == name)
		      id = player.id;
		  }
    }
	if(id == 149)
		id = 52;
    if(id == 68)
      $(this).attr("style", "float: left; background: url('https://www.pokebip.com/pokedex/images/sugimori/151.png'); background-color: #0a0a0a; background-position: center; background-repeat: no-repeat; width: 200px; height: 200px;");
    else
      $(this).attr("style", "float: left; background: url('https://www.pokebip.com/pokedex/images/sugimori/" + (((id-1) % 150) + 1) + ".png'); background-color: #0a0a0a; background-position: center; background-repeat: no-repeat; width: 200px; height: 200px;");
    $(this).attr("src","");
    $(this).attr("alt","");
      $(this).attr("name", "done");
  }).get();

  $("img.picture").map(function() {
      var name = /[^-]*$/.exec($(this).parent().parent().children().last().children().last().html());
      var id = 384;
      for each(var player in playerList.players)
      {
        if(player.name == name)
          id = player.id;
      }
	  if(id == 149)
		  id = 52;
      if(id == 68)
        $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/448.png");
      else if(id == 384)
        $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/384.png");
      else
        $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/" + (((id-1) % 150) + 1) + ".png");
      $(this).attr("name", "done");
  }).get();

  $("img").map(function() {
      if($(this).parent().attr("class") == "head skin-1" && $(this).attr("src") != "http://game.asylamba.com/s11/public/media/orbitalbase/school.png" && $(this).attr("name") != "done")
      {
        if($(this).attr("src").startsWith("http://game.asylamba.com/s11/public/media/map/place/"))
        {
          $(this).attr("src", "https://burnttoastbooks.files.wordpress.com/2015/04/pokeball.png");
        }
        else
        {
          var name = /[^-]*$/.exec($(this).attr("alt"));
          var id = -1;
          for each(var player in playerList.players)
          {
            if(player.name == name)
              id = player.id;
          }
	  	  if(id == 149)
		    id = 52;
          if(id == 68)
            $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/448.png");
          else if(id == -1)
            $(this).attr("src", "http://vignette3.wikia.nocookie.net/pokemon/images/c/cd/Team_Rocket_Trio_AG.png/revision/latest?cb=20150915073715");
          else
            $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/" + (((id-1) % 150) + 1) + ".png");
        }
      }
      $(this).attr("name", "done");
  }).get();

  $("img").map(function() {
      if($(this).parent().attr("class") == "commander")
      {
        var name = /[^-]*$/.exec($(this).attr("alt"));
        var id = 201;
        for each(var player in playerList.players)
        {
          if(player.name == name)
            id = player.id;
        }
	  	if(id == 149)
		  id = 52;
        if(id == 68)
          $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/448.png");
        else if(id == 201)
          $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/201.png");
        else
          $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/" + (((id-1) % 150) + 1) + ".png");
      }
      if($(this).parent().attr("class") == "item")
      {
        $(this).attr("src", "http://vignette3.wikia.nocookie.net/pokemon/images/c/cd/Team_Rocket_Trio_AG.png/revision/latest?cb=20150915073715");
      }
      if($(this).attr("alt") == "planète")
      {
        $(this).attr("src", "https://burnttoastbooks.files.wordpress.com/2015/04/pokeball.png");
      }
	  if($(this).attr("class") == "img")
	  {
	  	var name = $(this).attr("alt");
        var id = 129;
        for each(var player in playerList.players)
        {
          if(player.name == name)
            id = player.id;
        }
	  	if(id == 149)
		  id = 52;
        if(id == 68)
          $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/448.png");
		else
          $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/" + (((id-1) % 150) + 1) + ".png");
	  }
      $(this).attr("name", "done");
  }).get();

  $("img.picto").map(function() {
      if($(this).parent().parent().attr("class") == "commander")
      {
        var name = /[^-]*$/.exec($(this).attr("alt"));
        var id = -1;
        for each(var player in playerList.players)
        {
          if(player.name == name)
            id = player.id;
        }
	  	if(id == 149)
		  id = 52;
        if(id == 68)
          $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/448.png");
        else if(id == -1)
          $(this).attr("src", "http://vignette3.wikia.nocookie.net/pokemon/images/c/cd/Team_Rocket_Trio_AG.png/revision/latest?cb=20150915073715");
        else
          $(this).attr("src", "https://www.pokebip.com/pokedex/images/gen4_general/" + (((id-1) % 150) + 1) + ".png");
      }
      $(this).attr("name", "done");
  }).get();

  $("img.land").map(function() {
      if($(this).attr("src").startsWith("http://game.asylamba.com/s11/public/media/map/place/place1"))
      {
        $(this).attr("src", "https://burnttoastbooks.files.wordpress.com/2015/04/pokeball.png");
      }
      $(this).attr("name", "done");
  }).get();
}

//$(document).ajaxComplete(pokemonize()); 

window.setInterval(pokemonize, 2000);

pokemonize();

