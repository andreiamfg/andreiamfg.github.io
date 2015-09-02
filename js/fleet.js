/**
 * This js is used to hold our fleet
 */
var Fleet;
//creat array of sheeps = fleet
//ship (name, size, type)
function createFleet() {
	
Fleet = [];

Fleet = [
         new Ship ("Carrier", 5, 1),
         new Ship ("Battleship", 4, 2),
         new Ship ("Cruiser", 4, 3),
         new Ship ("Destroyer", 3, 4),
         new Ship ("Submarine", 2, 5)
         
         ];

}