/*
 * Place the ships in the map
 * fills up ships position array
 * makes sure they dont overlay or go out of the map
 */

//initialize global variables which will be used
var mapSize = 10;
var testGrid = null;
var cellStat = null;

function PlaceShips(theMap) 
{
	testGrid = theMap;
	
	//ship will only be placed if all cellStats are empty = false
	cellStat = false;
	
	var s=0;
	while(s < Fleet.length)
	{
		var thisShip = Fleet[s];
		
		thisShip.orientation = getRandomOr();
		
		if (thisShip.orientation == 1)
		{
			this.tryPlaceHorizontal(thisShip);
			
			if (cellStat == false)
			{
				s++;
			}
		}
		else
		{
				this.tryPlaceVertical(thisShip);
				
				if (cellStat == false)
				{
					s++;
				}
		}
	}
}

PlaceShips.prototype = {
		
		tryPlaceHorizontal: function (aShip)
			{
				this.currentShip = aShip;
				//get ship size so we can iterate through it
				var thisShipSize = aShip.size;
				//if its vertical x is static, and can be anywhere in the map
				var newRow = getRandom(mapSize); // this func gives number from 1 to mapSize
				//if its vertical Y will change for each unit
				//therefore the first Y has to start in a place which will leave room for ship to fit
				var newColumn = getRandom(mapSize - thisShipSize); //this gives random between mapSize - Size
				//so, for each unit of the ship lets check if the place is empty
				var arrayRow = [thisShipSize];
				var arrayCol = [thisShipSize];
				
				for (unit = 0; unit < thisShipSize; unit++ )
				{
					
					if( testGrid.cell[newRow][newColumn+unit] == 0)
					{
						cellStat = false;
						this.makePosition(newRow, newColumn+unit);
						arrayRow[unit] = newRow;
						arrayCol[unit] = newColumn+unit;
					}
					else
					{
						cellStat = true;
						this.currentShip.deletePositions();
						return;
					}
				}
				var thisShipType = aShip.type;
				
				this.placeShip(thisShipType, arrayRow, arrayCol);
				
			},
		
		tryPlaceVertical: function (aShip)
		{
			
			this.currentShip = aShip;
			var thisShipSize = aShip.size;
			
			var newRow = getRandom(mapSize - thisShipSize); 
			var newColumn = getRandom(mapSize); 
			
			var arrayRow = [thisShipSize];
			var arrayCol = [thisShipSize];
			
			for (unit = 0; unit < thisShipSize; unit++ )
			{
				
				
				if( testGrid.cell[newRow+unit][newColumn] == 0)
				{
					cellStat = false;
					this.makePosition(newRow+unit, newColumn);
					arrayRow[unit] = newRow+unit;
					arrayCol[unit] = newColumn;
				}
				else
				{
					cellStat = true;
					this.currentShip.deletePositions();
					return;
				}
			}
			var thisShipType = aShip.type;
			
			this.placeShip(thisShipType, arrayRow, arrayCol);
			
		},
		//function that adds valid values to positions array	
		makePosition: function(validX, validY)
			{
				//creates a position object with x and y
				var aPos = new Position (validX, validY);
				//adds the position object to the array 
				this.currentShip.add( unit, aPos);
			},
			
		placeShip: function(shipType, rows, cols)
		{
			for(var i=0; i < rows.length; i++)
				{
					var value = shipType;
					
					var tempRow = rows[i];
					var tempCol = cols[i];
					//the value is stored on the grid to identify each boat
					theMap.cell[tempRow][tempCol] = value;
				}
		}
		

}