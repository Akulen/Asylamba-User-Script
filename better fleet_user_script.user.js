// ==UserScript==
// @name         better fleet
// @version      0.0.2.2
// @description  better fleet
// @author       ChickenStorm
// @match        http://game.asylamba.com/beta/fleet*
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


function presetHTML(schipArray,imgSrc,name){
    
    //schipArray : [[id,nombre],[id,nombre],...]
    
    var presetCode = ""
    
    for (var i in schipArray){
        presetCode += "squadronTransfer.move(\"btc\","+schipArray[i][0]+", "+schipArray[i][1]+");";
        
    }
    
    

    return "<a data-ship-id='0' onclick = '"+presetCode+"'href='#'><img alt='' src='"+imgSrc+"'></img><span class='text'><span class='quantity'>1</span><span>"+name+"</span></span>";
    
}

function initUserScript(){    
    for(var i in d){
        if (d[i].className == "body") {
            //alert(i)
            j = i;
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
        
        var shipMoveCode = "var input = parseInt(document.getElementById(\"in\"+"+i+").value);if (!isNaN(input) &&  input!=0) {if (input >0) {squadronTransfer.move(\"btc\", "+i+", input);}else{squadronTransfer.move(\"ctb\", "+i+", -input)}}";
        textP = Tleft + "onclick='"+shipMoveCode+"';" +Trigth;
        textP = textP.replace("class=\"empty\"","");
        
    }
    
    
    /**
    
    var presetEnderCode = "squadronTransfer.move(\"btc\", 0, 2);squadronTransfer.move(\"btc\", 2, 17);squadronTransfer.move(\"btc\", 7, 1);";
    var presetChimer = "squadronTransfer.move(\"btc\", 2, 33)"
    var presetPhenix = "squadronTransfer.move(\"btc\", 11, 1); squadronTransfer.move(\"btc\", 0, 2)"
    var presetHydre = "squadronTransfer.move(\"btc\", 9, 1); squadronTransfer.move(\"btc\", 0, 4)"
    
    
    var textPPreset = "<a data-ship-id='0' onclick = '"+presetEnderCode+"'href='#'><img alt='' src='https://dl.dropboxusercontent.com/u/110049848/user_script_ressouces/picture/ender.png'></img><span class='text'><span class='quantity'>1</span><span>Ender</span></span>";
    textPPreset += "<a data-ship-id='0' onclick = '"+presetChimer+"'href='#'><img alt='' src='https://dl.dropboxusercontent.com/u/110049848/user_script_ressouces/picture/chimere.png'></img><span class='text'><span class='quantity'>1</span><span>33 chimères</span></span>";
    
    
    
    textPPreset += "<a data-ship-id='0' onclick = '"+presetPhenix+"'href='#'><img alt='' src='https://dl.dropboxusercontent.com/u/110049848/user_script_ressouces/picture/phenix.png'></img><span class='text'><span class='quantity'>1</span><span>phénix (pe)</span></span>";
    textPPreset += "<a data-ship-id='0' onclick = '"+presetHydre+"'href='#'><img alt='' src='https://dl.dropboxusercontent.com/u/110049848/user_script_ressouces/picture/hydre.png'></img><span class='text'><span class='quantity'>1</span><span>hydre (pe)</span></span>";
    
    */
    
    
    
    //image sources : hydre http://shannavi.centerblog.net/rub-hydres-.html
    // endre : http://minecraft.gamepedia.com/Eye_of_Ender
    // chimère  new : http://idraemir.blogspot.ch/2011/05/la-chimere.html old:http://bibliotheque-imperiale.com/index.php?title=Chim%C3%A8re
    // phénix : http://www.lemondededuralas.org/t460-le-phenix-enchaine-03
    
    
    var textPPreset = ""
    
    textPPreset = presetHTML([[0,2],[2,17],[7,1]],"https://dl.dropboxusercontent.com/u/110049848/user_script_ressouces/picture/ender.png","Ender");
    textPPreset += presetHTML([[2,33]],"https://dl.dropboxusercontent.com/u/110049848/user_script_ressouces/picture/chimere.png","33 ch");
    textPPreset += presetHTML([[0,4],[9,1]],"https://dl.dropboxusercontent.com/u/110049848/user_script_ressouces/picture/hydre.png","hydre (pe)");
    textPPreset += presetHTML([[0,2],[11,1]],"https://dl.dropboxusercontent.com/u/110049848/user_script_ressouces/picture/phenix.png","ph (pe)");
    
    d[j].style.width = "600px"; // by defalut 300px
    d[j].innerHTML += "<div class='list-ship test'> "+ textP+ "</div>";
    d[j].innerHTML += "<div class='list-ship test'> "+ textPPreset+ "</div>";
    
    im[jIm].style.left ='190px'; // sometimes not working ??? works for me but not in the form of user script but with "ardoise js" of firefox
    
    render.column.number +=1;
    squadronTransfer.init();
    
    
    
    // document.getElementsByTagName('body')[0].innerHTML += '<script>'+shipMove+'</script>'
    
    
}

initUserScript()
//////

