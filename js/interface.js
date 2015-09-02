/* 
 * This js is used to create and update the visual feedback of the sips status
 */

function ShipsFeedback ()
{
	//visual feebdback for the user
	//creates a table that will enable visual updating the status of each ship
	$('#ships-feedback').html("");
	for( var ship = 0; ship < Fleet.length; ship++)
	{
		var shipsPrint = "<tr>";
		var currentShip = Fleet[ship];
		
		for ( var shipSize = 0; shipSize < currentShip.size; shipSize++)
		{
			var shipName = currentShip.name;
			shipsPrint += "<td id=\"ship" + ship + shipSize +"\" class=\"ships-feedback ";
			
			if (shipSize==0)
			{
				shipsPrint+= "ship-one";
			}
			else if (shipSize == currentShip.size -1)
			{
				shipsPrint += "ship-last";
			}
			else
			{
				shipsPrint += "ship-any";
			}
			shipsPrint += "\"></td>";
		}
		shipsPrint += "</tr>";
		
		$('#ships-feedback').append(shipsPrint);
	}
}

ShipsFeedback.prototype = {
		
		updateShip: function(feedback, shipShot, realPos) 
		{
			shipShot.hits--;
			//creating fancy selector:
			//"ship"+shipNumber in fleet + hit number
			var newSelector = "#" + "ship" + realPos + shipShot.hits;
			//my first selector will be #ship04 which is the last table column for this ship
			//send this information to the updater which will change the css to the right element
			feedback.update(newSelector);
			
		},
		
		update: function (aSelector) 
		{
			var newId = aSelector;
			$(aSelector).addClass('ship-gone');
		}
}