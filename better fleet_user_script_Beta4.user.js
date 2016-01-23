// ==UserScript==
// @name         better fleet Beta 4
// @version      0.0.0.1
// @description  Fork of better fleet Beta 2 and 3 by ChickenStorm
// @author       Akulen
// @match        http://game.asylamba.com/s6/fleet/*
// @match        http://game.asylamba.com/s7/fleet/*
// @match        http://game.asylamba.com/s8/fleet/*
// @match        http://game.asylamba.com/s9/fleet/*
// @grant        none
// ==/UserScript==


var d = document.getElementsByTagName("div");
var im = document.getElementsByTagName("img");

var text = "";
var j = null;
var jDoc = null;
var jIm = null;

////
//var textS = ""


function presetHTML(shipArray,imgSrc,name){
    
    //shipArray : [[id,nombre],[id,nombre],...]
    
    //var presetCode = ""
   
    /*for (var i in shipArray){
        presetCode += "squadronTransfer.move(\"btc\","+shipArray[i][0]+", "+shipArray[i][1]+");";
        
    }
    */
    var shipArrayText = ""
    
    
    shipArrayText += "["
    
    for (var i in shipArray){
        
        shipArrayText += "[" +shipArray[i].join(",")+"],"
        
    }
    shipArrayText = shipArrayText.substring(0,shipArrayText.length-1) // remouve the last comma
    shipArrayText += "]"
    
    
    
    var presetCode = "var shipArrayIn = "+shipArrayText+";for (var i =0;i<=11;++i) {var shipSquadronQuantity = parseInt(squadronTransfer.obj.squadron.find(\"a:nth-child(\" + (i + 1) + \") .quantity\").text());var quantityOfShipToPlace = 0;for(var j in shipArrayIn){if (shipArrayIn[j][0] == i) {quantityOfShipToPlace = shipArrayIn[j][1];}}var shipDock = parseInt(squadronTransfer.obj.dock.find(\"a:nth-child(\" + (i + 1) + \") .quantity\").text());var shipQuantityToMove = Math.max(Math.min(quantityOfShipToPlace - shipSquadronQuantity,shipDock),-shipSquadronQuantity);if (shipQuantityToMove > 0 ) {squadronTransfer.move(\"btc\",i,shipQuantityToMove);}else if(shipQuantityToMove < 0){squadronTransfer.move(\"ctb\",i,-shipQuantityToMove);}}squadronTransfer.sendRequest();"
    
    //var presetCode = "readableMoveFunction("+shipArrayText+");"
    
    return "<a data-ship-id='0' onclick = '"+presetCode+"'href='#'><img alt='' src='"+imgSrc+"'></img><span class='text'><span class='quantity'>1</span><span>"+name+"</span></span>";
    
}

function initUserScript(){
    //j =58 // test
    var a =0 
    for(var i in d){
        if (d[i].className == "body") {
            j = a
            a=i
            
            
            //j=i
            
        }
        if (d[i].className == "list-ship dock") {
            
            jDoc = i;
        }
        
    }
    for(var i in im){
        if (im[i].className == "right") {
            //alert(i)
            jIm = i;
        }
        
    }
    
    var textP =d[jDoc].innerHTML
    
    for(var i = 0; i< 12; i++){
        var text = textP;
        var pos = text.search("<span class=\"quantity\">");
        var temp = text.substring(0,pos);
        var tempT = text.substring(pos,text.length);
        var pos2 = tempT.search("</span>");
        
        var temp2 = tempT.substring(pos2+7,tempT.length);
        
        textP = temp + "<span class='quantity'><input style='width:50px;' id='in"+i +"' ></span>" + temp2;
        
        
        
        
    }
    
    /*function shipMove(shipId){
        
        var input = parseInt(document.getElementById("in"+shipId).value)
        //alert(input)
        if (!isNaN(input) &&  input!=0) {
            if (input >0) {
                
                squadronTransfer.move('btc', shipId, input);
                
            }
            else{
                squadronTransfer.move('ctb', shipId, -input)
            }
        }
    }*/
    
    for(var i = 0; i< 12; i++){
        
        
       
        
        var pos = textP.search(" data-ship-id=");
        var Tleft = textP.substring(0,pos);
        var Trigth = textP.substring(pos+1,textP.length);
        
        var shipMoveCode = "var input = parseInt(document.getElementById(\"in\"+"+i+").value);if (!isNaN(input) &&  input!=0) {if (input >0) {squadronTransfer.move(\"btc\", "+i+", input);}else{squadronTransfer.move(\"ctb\", "+i+", -input)}}squadronTransfer.sendRequest();";
        textP = Tleft + "onclick='"+shipMoveCode+"';" +Trigth;
        textP = textP.replace("class=\"empty\"","");
        
    }
    
    
    /**
    
    var presetEnderCode = "squadronTransfer.move(\"btc\", 0, 2);squadronTransfer.move(\"btc\", 2, 17);squadronTransfer.move(\"btc\", 7, 1);";
    var presetChimer = "squadronTransfer.move(\"btc\", 2, 33)"
    var presetPhenix = "squadronTransfer.move(\"btc\", 11, 1); squadronTransfer.move(\"btc\", 0, 2)"
    var presetHydre = "squadronTransfer.move(\"btc\", 9, 1); squadronTransfer.move(\"btc\", 0, 4)"
    
    
    var textPPreset = "<a data-ship-id='0' onclick = '"+presetEnderCode+"'href='#'><img alt='' src='https://dl.dropboxusercontent.com/u/110049848/user_script_ressouces/picture/ender.png'></img><span class='text'><span class='quantity'>1</span><span>Ender</span></span>";
    textPPreset += "<a data-ship-id='0' onclick = '"+presetChimer+"'href='#'><img alt='' src='https://dl.dropboxusercontent.com/u/110049848/user_script_ressouces/picture/chimere.png'></img><span class='text'><span class='quantity'>1</span><span>33 chimeres</span></span>";
    textPPreset += "<a data-ship-id='0' onclick = '"+presetTest+"'href='#'><img alt='' src='https://dl.dropboxusercontent.com/u/110049848/user_script_ressouces/picture/chimere.png'></img><span class='text'><span class='quantity'>1</span><span>Test</span></span>";
    
    
    
    textPPreset += "<a data-ship-id='0' onclick = '"+presetPhenix+"'href='#'><img alt='' src='https://dl.dropboxusercontent.com/u/110049848/user_script_ressouces/picture/phenix.png'></img><span class='text'><span class='quantity'>1</span><span>phenix (pe)</span></span>";
    textPPreset += "<a data-ship-id='0' onclick = '"+presetHydre+"'href='#'><img alt='' src='https://dl.dropboxusercontent.com/u/110049848/user_script_ressouces/picture/hydre.png'></img><span class='text'><span class='quantity'>1</span><span>hydre (pe)</span></span>";
    
    */
    
    /*
    Escadrille avec Cyclope : 1 Cyclope + 1 griffon + 4 sirene + 4 chimere ou satyre
    Escadrille avec Minotaure : 1 Minotaure + (5 satyre et 5 pégase)
    Escadrille avec Griffon : 2 griffons + 6 sirenes + 8 chimère ou satyre
    ou 1 griffon 10 sirènes + 9 chimère ou satyre
    
    Escadrille avec Cyclope : 1 Cyclope + 1 meduse + 2 dryades + 4 sirene + 4 chimere ou satyre
    Escadrille avec chasseurs :
    1meduse + 8 dryade + 3 sirenes + 4 chimere ou satyre
    ou
    2 méduse + 7 dryade + 2 sirene + 4 chimere ou satyre + 2 pegase
    
    Hydre P (Hydre + 7 pegase)
    Hydre D (2 dryade)
    Cerbere D Cerbere + 2 dryade + 2 pegase
    Phenix M 1 meduse + 1 dryade
    Phenix D 2 dryade + 1 pegase
    */
    
    //image sources : hydre http://shannavi.centerblog.net/rub-hydres-.html
    // endre : http://minecraft.gamepedia.com/Eye_of_Ender
    // chimere  new : http://idraemir.blogspot.ch/2011/05/la-chimere.html old:http://bibliotheque-imperiale.com/index.php?title=Chim%C3%A8re
    // phenix : http://www.lemondededuralas.org/t460-le-phenix-enchaine-03
    
    
    var textPPreset = ""
    textPPreset += presetHTML([[]],"","vide");
    textPPreset += presetHTML([[2,4],[3,4],[4,2],[5,1],[7,1]],"https://dl.dropbox.com/s/4qpjj9nvz5oslrq/uppercyclop.jpe","Cyclop DC");
    textPPreset += presetHTML([[1,4],[3,4],[4,2],[5,1],[7,1]],"https://dl.dropbox.com/s/4qpjj9nvz5oslrq/uppercyclop.jpe","Cyclop DS");
    textPPreset += presetHTML([[2,4],[3,4],[6,1],[7,1]],"https://dl.dropbox.com/s/sndrf2y3g6mgw17/cyclop.jpe","Cyclop GC");
    textPPreset += presetHTML([[1,4],[3,4],[6,1],[7,1]],"https://dl.dropbox.com/s/sndrf2y3g6mgw17/cyclop.jpe","Cyclop GS");
    textPPreset += presetHTML([[2,8],[3,6],[6,2]],"https://dl.dropbox.com/s/ecjw5hcbz6x9f4u/griffon.png","Griffon 2C");
    textPPreset += presetHTML([[1,8],[3,6],[6,2]],"https://dl.dropbox.com/s/ecjw5hcbz6x9f4u/griffon.png","Griffon 2S");
    textPPreset += presetHTML([[2,9],[3,10],[6,1]],"https://dl.dropbox.com/s/oxn211off21btwa/lowergriffon.png","Griffon 1C");
    textPPreset += presetHTML([[1,9],[3,10],[6,1]],"https://dl.dropbox.com/s/oxn211off21btwa/lowergriffon.png","Griffon 1S");
    textPPreset += presetHTML([[4,2],[9,1]],"https://dl.dropbox.com/s/lgtqxx0h1rjwgww/hydra.png","Hydra D");
    textPPreset += presetHTML([[0,7],[9,1]],"https://dl.dropbox.com/s/m9q7irj33n6nqwp/lowerhydra.png","Hydra P");
    textPPreset += presetHTML([[0,2],[4,2],[10,1]],"https://dl.dropbox.com/s/b8qzu6425asyyxo/cerberus.png","Cerberus");
    textPPreset += "</div><div class='list-ship test'>";
    textPPreset += presetHTML([[0,5],[1,5],[8,1]],"https://dl.dropbox.com/s/hwu20gb4wyzvtrh/minotaur.png","Minotaur");
    textPPreset += presetHTML([[2,6],[3,3],[4,7],[5,2]],"https://dl.dropbox.com/s/qzx83rp400s9jac/fighter.png","Fighter 2C");
    textPPreset += presetHTML([[1,6],[3,3],[4,7],[5,2]],"https://dl.dropbox.com/s/qzx83rp400s9jac/fighter.png","Fighter 2S");
    textPPreset += presetHTML([[2,5],[3,4],[4,8],[5,1]],"https://dl.dropbox.com/s/ta0i73glp7945yf/lowerfighter.png","Fighter 1C");
    textPPreset += presetHTML([[1,5],[3,4],[4,8],[5,1]],"https://dl.dropbox.com/s/ta0i73glp7945yf/lowerfighter.png","Fighter 1S");
    textPPreset += presetHTML([[4,1],[5,1],[11,1]],"https://dl.dropbox.com/s/4zq1o1tm31y2yrp/phoenix.png","Phoenix M");
    textPPreset += presetHTML([[0,1],[4,2],[11,1]],"https://dl.dropbox.com/s/hw995r600c0heca/lowerphoenix.png","Phoenix D");
    
    d[j].style.width = "600px"; // by defalut 300px
    //d[j].innerHTML += "<div class='list-ship test'> "+ textP+ "</div>";
    d[j].innerHTML += "<div class='list-ship test'> "+ textPPreset+ "</div>";
    
    im[jIm].style.left ='190px'; // sometimes not working ??? works for me but not in the form of user script but with "ardoise js" of firefox
    
    render.column.number +=1;
    squadronTransfer.init();
    
    
    
    // document.getElementsByTagName('body')[0].innerHTML += '<script>'+shipMove+'</script>'
    
    
}

initUserScript()
//////


/*
var olQuantity = parseInt(this.obj.squadron.find('a:nth-child(' + (shipId + 1) + ') .quantity').text());
var orQuantity = parseInt(this.obj.dock.find('a:nth-child(' + (shipId + 1) + ') .quantity').text());
*/


function readableMoveFunction(shipArray){ // not used but "readable" verion of the preset Code
    
    var shipArrayIn = shipArray; /* for convertion */
    
    for (var i =0;i<=11;++i) {
        
        var shipSquadronQuantity = parseInt(squadronTransfer.obj.squadron.find('a:nth-child(' + (i + 1) + ') .quantity').text());
        var quantityOfShipToPlace = 0; /*  if not found in shipArrayIn then equal to 0 */
        for(var j in shipArrayIn){
             
            if (shipArrayIn[j][0] == i) {
                quantityOfShipToPlace = shipArrayIn[j][1];
            }
        }
        
        var shipDock = parseInt(squadronTransfer.obj.dock.find('a:nth-child(' + (i + 1) + ') .quantity').text());
        var shipQuantityToMove = Math.max(Math.min(quantityOfShipToPlace - shipSquadronQuantity,shipDock),-shipSquadronQuantity);  /* btc */
        
        
        if (shipQuantityToMove > 0 ) {
            
            squadronTransfer.move('btc',i,shipQuantityToMove);
        }
        else if(shipQuantityToMove < 0){
            squadronTransfer.move('ctb',i,-shipQuantityToMove);
        }
        
        //if 0 do nothing
        
    }
    squadronTransfer.sendRequest()
    
}

 
    
   


