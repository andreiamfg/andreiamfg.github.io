/**
 * Creates the map framework
 */

//Grid class
function Grid (mapSize)
{
	$('#game-map').html("");
	
	this.cell = [];
	this.size = mapSize;

	//col = x, row = y, 0 = empty
	for (var row = 0; row < mapSize; row++)
	{
		this.cell[row]=[];
		
		var htmlPrint = "<tr>";
		
		for(var col = 0; col < mapSize; col++)
		{
			this.cell[row][col]=0;
			var value = this.cell[row][col];
			htmlPrint +="<td id=\"map" + row + col +"\" class=\"map-grid\" data-row="+row+" data-col="+col+"></td>";
		}
		
		htmlPrint +="</tr>";
		$('#game-map').append(htmlPrint);
	}
}

Grid.prototype = {
		
		update: function() 
		{
			for ( var row = 0; row < mapSize; row++)
			{
				for (var col = 0; col < mapSize; col++)
				{
					var value = this.cell[row][col];
					var id = "#" + "map" + row + col ;
				}
			}	
		}
}





