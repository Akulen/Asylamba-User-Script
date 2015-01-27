// ==UserScript==
// @name         better fleet
// @version      0.0.1
// @description  better fleet
// @author       ChickenStorm
// @match        http://game.asylamba.com/beta/fleet*
// @grant        none
// ==/UserScript==


var d = document.getElementsByTagName("div")
var im = document.getElementsByTagName("img")

var text = ""
var j
var jDoc
var jIm

////
//var textS = ""    
    
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
        var text = textP
        var pos = text.search("<span class=\"quantity\">")
        var temp = text.substring(0,pos)
        var tempT = text.substring(pos,text.length-1)
        var pos2 = tempT.search("</span>")
        
        var temp2 = tempT.substring(pos2+7,tempT.length-1)
        
        textP = temp + "<span class='quantity'><input style='width:50px; z-index: 100' id='in"+i +"' ></span>" + temp2
        
        
        
        
    }
    
    function shipMove(shipId){
        
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
    }
    
    for(var i = 0; i< 12; i++){
        
        
       
        
        var pos = textP.search(" data-ship-id=")
        var Tleft = textP.substring(0,pos)
        var Trigth = textP.substring(pos+1,textP.length)
        
        var shipMoveCode = "var input = parseInt(document.getElementById(\"in\"+"+i+").value);if (!isNaN(input) &&  input!=0) {if (input >0) {squadronTransfer.move(\"btc\", "+i+", input);}else{squadronTransfer.move(\"ctb\", "+i+", -input)}}"
        textP = Tleft + "onclick='"+shipMoveCode+"';" +Trigth
        textP = textP.replace("class=\"empty\"","")
        
    }
    
    
    
    
    

    
    
    d[j].style.width = "600px"
    d[j].innerHTML += "<div class='list-ship test'> "+ textP+ "</div>"
    render.column.number +=1
    im[jIm].style.left ="190px";
    squadronTransfer.init()
    //alert(shipMove)
    //alert( document.getElementsByTagName("body")[0].innerHTML)
    // document.getElementsByTagName('body')[0].innerHTML += '<script>'+shipMove+'</script>'
    
//////

