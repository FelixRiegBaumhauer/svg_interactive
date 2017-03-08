var svg = document.getElementById("vimage");
//needed vars:

var dots=0;
var old_X=0;
var old_Y=0;

var change = function(e){
    if(this.getAttribute("fill") == "red"){
	
	svg.removeChild(this);
	var x = Math.random() * 500;
	var y = Math.random() * 500;
	var c = crtCirc(x,y);
	document.getElementById("vimage").appendChild(c);
    }
    else{
	this.setAttribute("fill", "red");
    }
    console.log(this.getAttribute("fill"));
    e.stopPropagation();
};

var crtCirc = function(x,y){
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", "30");
    c.setAttribute("fill", "green");

    c.addEventListener("click", change);
    
    return c;
};

//fxn to draw the dots, and attach the lines
var drop_dot = function(event){
    var x = event.offsetX;
    var y = event.offsetY;

    var c = crtCirc(x,y);
    document.getElementById("vimage").appendChild(c);
    
    dots++;

    console.log("dot");
    //console.log("red"+e.target);
    /*
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", "30");
    c.setAttribute("fill", "green");
     */

    //document.getElementById("vimage").appendChild(c);
}




//fxn to clear
var clear_svg = function(){
    dots=0;
    old_X=0;
    old_Y=0;
    
    //var c = document.createElementNS("http://www.w3.org/2000/svg","circle");

    var svg = document.getElementById("vimage");
    while (svg.lastChild) {
	svg.removeChild(svg.lastChild);
    };
    started = false;
    /*
    c.setAttribute("cx", "250");
    c.setAttribute("cy", "250");
    c.setAttribute("r", "5000");
    c.setAttribute("fill", "green");

    document.getElementById("vimage").appendChild(c);
*/
}


document.getElementById("vimage").addEventListener("click", drop_dot);
document.getElementById("clear").addEventListener("click", clear_svg);
