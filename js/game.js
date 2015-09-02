/**
 * 
 */

//initiates and resets variables for restart
var theMap = null;
var counter = null;
var feedback = null;

var game = (function(){

	this.init = function()
	{
		introSound.fadeIn();
		setInterval(function()
		{
			introSound.stop();
			
			if($('#welcome-screen').attr('class')!="hidden")
			{
				introSound.play();
			}
			
		}, 14800);
		
		//the game board is hidden until we start the game
		$('#start-btn').click(function() 
		{	
			introSound.stop();
			selectSound.play();
			$('#welcome-screen').addClass("hidden");
			$('#game').removeClass("hidden");
			StartGame();
		});
			
	}
	
	function StartGame()
	{
		mainSound.play();
		
		$('#game').removeClass("hidden");
		//this erases previous ships in fleet for reseting
		createFleet();
		//start the counter for this instance of this game
		counter = 65;
		$('#counter').html(counter);
		
		//create map and ships
		theMap = new Grid( 10 );
		var ps = new PlaceShips( theMap );
		//updates the ships position in the board
		theMap.update();
		//initiates the div for the shots feedback
		feedback = new ShipsFeedback();
		
		//initiates clickhandler
		//gets row and col of the object clicked in and sends it for processing
		$('.map-grid').click(function ()
		{	
			
			var thisCell = $(this);
			var col = $(this).data("col");
			var row = $(this).data("row");
			clickHandler(thisCell, col, row);
		});
		
	}
	
	function clickHandler (thisCell, col, row)
	{
		//code only runs if this cell was never shot
		if (thisCell.hasClass('shot') == false)
		{
			counter--;
			$('#counter').html(counter);
			
			thisCell.addClass('shot');
			
			//get the value that this position in the map holds
			var theValue = theMap.cell[row][col];
			//if it is more than 0 it means it holds a ship
			if(theValue > 0)
			{
				hitSound.play();
				thisCell.addClass('shot-hit');
				
				//array positions start on zero, but types start from one
				//so this ship is fleet[value-1]
				var realPos = theValue - 1;
				var shipShot = Fleet[realPos];
				
				//send this information for update in the interface
				switch(theValue)
				{
					case 1:
						feedback.updateShip(feedback, shipShot, realPos);
						break;
						
					case 2:
						feedback.updateShip(feedback, shipShot, realPos);
						break;
					case 3:
						feedback.updateShip(feedback, shipShot, realPos);
						break;
					case 4:
						feedback.updateShip(feedback, shipShot, realPos);
						break;
					case 5:
						feedback.updateShip(feedback, shipShot, realPos);
						break;
				}
				//check if any ship was sunk
				shipShot.shipSunk();
				
			}
			else
			{
				clickSound.play();
				thisCell.addClass('shot-fail');
			}
			//user clicks updates the game
			update();
		}
	}
	
	function update()
	{
		//initiate variables to check winning conditions
		var shipsDown = 0;
		var gameWin = false;
		
		//for each ship, check if they have been sunk
		//if so add it to the shipSunk counter
		for(v=0; v < Fleet.length; v++)
		{
			var currShip = Fleet[v];
			
			var shipStatus = currShip.shipSunk();
			if (shipStatus == true)
			{
				shipsDown++;
			}
		}
		
		//checks ending conditions
		//if shipsDown is equal to my whole fleet, i win
		//if i used all my bombs, i lose
		if(shipsDown == Fleet.length || counter == 0)
		{
			mainSound.stop();
			$('#game').addClass("hidden");
			//since its over, reset map for next instance of the game;
			theMap = null;
			
			$('#end-screen').removeClass('hidden');
			introSound.fadeIn();
			setInterval(function()
			{
				introSound.stop();
				
				if($('#end-screen').attr('class')!="hidden")
				{
					introSound.play();
				}
				
			}, 14800);
			
			if(counter == 0)
			{
				//game over
				$('#outcome').html("<p> GAME OVER </p>");
			}

			if(shipsDown == Fleet.length)
			{
				//game won
				$('#outcome').html("<p> YOU WIN, CONGRATZ!</p>");
			}
		}	
		
		$('#play-again').click(function ()
		{
			introSound.stop();
			selectSound.play();
			$('#end-screen').addClass("hidden");
			StartGame();
		});
	}	
	
	return {
		init: init 
	}
	
	
}());