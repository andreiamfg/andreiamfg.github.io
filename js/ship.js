/*
 * This js file is used to create ship framework
 */

function Ship(name, size, type)
{
	this.name =  name;
	this.size =  size;
	//this will be changed dynamically
	this.orientation = 0;
	 // will be filled dynamically
	this.positions = [size];
	
	//type is a specific identifier value used to connect ship and mapcell
	this.type = type;
	this.hits = size;
}

Ship.prototype = {
			
	add: function( index, thePosition ) {
		//if theres no position, exit
		if (thePosition == null) 
			return
		//adds this position to the array
		this.positions[index] = thePosition;
	},	

	deletePositions: function() 
	{	
		//clear position so theres no overwriting errors
		for (var i = this.positions.length; i < 0; --i) 
		{
			this.positions[i] = null;
		}
	},
	
	shipSunk: function ()
	{
		//checks the hits of the ships to find out if it was sunk
		var shipIsSunk = false;
		if(this.hits == 0)
		{
			shipIsSunk = true;
		}
		return shipIsSunk;
	}

}

//creates position objects which will be used by
//add to fill up the positions array for each ship
function Position( aX, aY ) {
	this.x = aX;
	this.y = aY;
}

//random numbers for coordinates
//a=number of values to use for randomization
function getRandom(a)
{
var x1 = Math.floor((Math.random()*a));

return x1;
}

//random Orientation
function getRandomOr()
{
var rndOr = Math.floor((Math.random()*2)+1);

return rndOr;
}

