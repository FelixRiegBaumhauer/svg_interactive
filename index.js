var svg = document.getElementById("vimage");
//needed vars:

var dots=0;
var old_X=0;
var old_Y=0;
var requestID;

var change = function(e){
    if(this.getAttribute("fill") == "red") {
      svg.removeChild(this);
	     var x = Math.random() * 500;
	     var y = Math.random() * 500;
	var c = crtCirc(x,y,this.getAttribute("r"));
	//document.getElementById("vimage").appendChild(c);
    }
    else {
      this.setAttribute("fill", "red");
    }
    //console.log(this.getAttribute("fill"));
    e.stopPropagation();
};

var crtCirc = function(x, y, r){
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", r);
    c.setAttribute("fill", "green");
    c.setAttribute("dx", "-1");
    c.setAttribute("dy", "-1");

    c.addEventListener("click", change);

    document.getElementById("vimage").appendChild(c);
    
    return c;
};

//fxn to draw the dots, and attach the lines
var drop_dot = function(event){
    var x = event.offsetX;
    var y = event.offsetY;
    var c = crtCirc(x,y,30);
    document.getElementById("vimage").appendChild(c);
    dots++;
    console.log("dot");
}


//fxn to clear
var clear_svg = function(){
    window.cancelAnimationFrame( requestID );
    dots=0;
    old_X=0;
    old_Y=0;

    var svg = document.getElementById("vimage");
    while (svg.lastChild) {
      svg.removeChild(svg.lastChild);
    };
    started = false;

}

var move = function() {
    window.cancelAnimationFrame( requestID );
    
    var bounce = function() {

	var dots = document.getElementsByTagName('circle');

	for (var i = 0; i < dots.length; i++){
            var dot = dots[i];
            var cx = parseInt(dot.getAttribute("cx"));
            var cy = parseInt(dot.getAttribute("cy"));
            var r = parseInt(dot.getAttribute("r"));
	    
            if( cx-r<=0 || cx+r>=500) {
		dot.setAttribute("dx", parseInt(-1 * dot.getAttribute("dx")));
            }
            if( cy-r<=0 || cy+r>=500) {
		dot.setAttribute("dy", parseInt(-1 * dot.getAttribute("dy")));
            }
            cx += parseInt(dot.getAttribute("dx"));
            cy += parseInt(dot.getAttribute("dy"));
            dot.setAttribute("cx", cx);
            dot.setAttribute("cy", cy);

	    //the changing at 250
	    
	    if(dot.getAttribute("cx") == 250){
		dot.setAttribute("r", r/2);
		var newC= crtCirc(cx, cy, r/2);
		newC.setAttribute("dx", parseInt(-1 * dot.getAttribute("dx")));
		newC.setAttribute("dy", parseInt(-1 * dot.getAttribute("dy")));
		console.log("bump");
	    }
	    if(r < 1){
		svg.removeChild(dot);
	    }
	};
	
	
	
	requestID = window.requestAnimationFrame( bounce );
    };
    bounce();
};


document.getElementById("vimage").addEventListener("click", drop_dot);
document.getElementById("clear").addEventListener("click", clear_svg);
document.getElementById("move").addEventListener("click", move);
