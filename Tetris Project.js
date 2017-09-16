//***********************************************************
//** Samuel Engert
//** 2613739
//** EECS 368
//** Tetris Project
//**
//**
//** Worked through a few methods and logic
//** with Levi Clark who is also in this class.
//***********************************************************


tetrisGame = {};
tetrisGame.currentState = [];
tetrisGame.shapes = [];

//global variables used to control block movement
var isFalling = false;
var DIR_LT = 1;
var DIR_RT = 2;

tetrisGame.isSideColliding = function(shape)
{
		//this method is used to stop shapes moving left and right
		//through another shape, but still allow them to move down
		//if possible
	if(shape.type == 0)
	{
		if(this.currentState[shape.center + 2] != -1 
		|| this.currentState[shape.center - 3] != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	if(shape.type == 1)
	{
		if(this.currentState[shape.center + 1] != -1 
		|| this.currentState[shape.center - 1] != -1 
		|| this.currentState[shape.center - 8] != -1
		|| this.currentState[shape.center - 12] != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	if(shape.type == 2)
	{
		if(this.currentState[shape.center + 2] != -1 
		|| this.currentState[shape.center - 1] != -1 
		|| this.currentState[shape.center - 9] != -1
		|| this.currentState[shape.center - 12] != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	if(shape.type == 3)
	{
		if(this.currentState[shape.center + 1] != -1 
		|| this.currentState[shape.center - 2] != -1 
		|| this.currentState[shape.center - 8] != -1
		|| this.currentState[shape.center - 11] != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	if(shape.type == 4)
	{
		if(this.currentState[shape.center + 2] != -1 
		|| this.currentState[shape.center - 1] != -1
		|| this.currentState[shape.center - 11] != -1
		|| this.currentState[shape.center - 8] != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	if(shape.type == 5)
	{
		if(this.currentState[shape.center + 2] != -1 
		|| this.currentState[shape.center - 2] != -1 
		|| this.currentState[shape.center - 10] != -1
		|| this.currentState[shape.center - 12] != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	if(shape.type == 6)
	{
		if(this.currentState[shape.center + 1] != -1 
		|| this.currentState[shape.center - 1] != -1 
		|| this.currentState[shape.center - 7] != -1
		|| this.currentState[shape.center - 11] != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}

tetrisGame.isColliding = function(shape)
{
	//this method checks the spaces below each shape
	if(shape.type == 0)
	{
		if(this.currentState[shape.center + 8] != -1 
		|| this.currentState[shape.center + 9] != -1 
		|| this.currentState[shape.center + 10] != -1 
		|| this.currentState[shape.center + 11] != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	if(shape.type == 1)
	{
		if(this.currentState[shape.center + 10] != -1 
		|| this.currentState[shape.center + 1] != -1 
		|| this.currentState[shape.center - 1] != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	if(shape.type == 2)
	{
		if(this.currentState[shape.center + 10] != -1 
		|| this.currentState[shape.center - 1] != -1 
		|| this.currentState[shape.center + 11] != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	if(shape.type == 3)
	{
		if(this.currentState[shape.center + 10] != -1 
		|| this.currentState[shape.center + 1] != -1 
		|| this.currentState[shape.center + 9] != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	if(shape.type == 4)
	{
		if(this.currentState[shape.center + 10] != -1 
		|| this.currentState[shape.center + 11] != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	if(shape.type == 5)
	{
		if(this.currentState[shape.center + 9] != -1 
		|| this.currentState[shape.center + 10] != -1 
		|| this.currentState[shape.center + 11] != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	if(shape.type == 6)
	{
		if(this.currentState[shape.center + 10] != -1 
		|| this.currentState[shape.center + 1] != -1 
		|| this.currentState[shape.center +2] != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
}

tetrisGame.AddShape = function(){
	//How to use AddShape?
	//using DrawShape as AddShape's functionality I think
	if(isFalling == false)
	{
		var spawnPoint = Math.floor((Math.random() * 8) + 1);
		var randomShape = Math.floor((Math.random() * 6));
		this.shapes.unshift({'type' : randomShape, 'center' : spawnPoint});
		isFalling = true;
	}
}

tetrisGame.IncrementTime = function(){

	//Spawn a new shape
	this.AddShape();
	
	//Movement for blocks
	for(var i = 0; i < this.shapes.length; i++){
		var currentShape = this.shapes[i];

		// Generate a random number between 1 and 2
		var dir = Math.floor((Math.random() * 2) + 1);
		
		if(currentShape.center > 190 || this.isColliding(this.shapes[i]))
		{
			return;
		}
		//Random left and right movements if the shape isn't on the bottom
		//need a way to check for shapes as well as bottom of the canvas
		if(currentShape.center < 190 && !this.isColliding(this.shapes[i]))
		{
			//Move down every IncrementTime() is called and the shape
			//isn't colliding with the bottom or another shape
			currentShape.center += 10;
			
		//stops left and right movement if there is already a shape there
			if(!this.isSideColliding(this.shapes[i]))
			{
				switch(dir){
				
					case DIR_LT:	// Move left (subtract 1 from center)
						currentShape.center -= 1;
						break;
					case DIR_RT:	// Move right (add 1 to center)
						currentShape.center += 1;
						break;
				}
			}
		}
		

		while(currentShape.center > 200){ 	// Keep the blocks from leaving through the bottom
			currentShape.center -= 10;
		}
		
		var withinRow = currentShape.center % 10;
		while(withinRow > 8){				// Keep the blocks from leaving through the right side
			currentShape.center -= 1;
			withinRow = currentShape.center % 10;
		}	
		// Keep the blocks from leaving through the left side
		if(this.shapes[i].type != 0){
			while(withinRow < 1){				
				currentShape.center += 1;
				withinRow = currentShape.center % 10;
			}
		}
		else{
			//checks left side for the 0 shape --x-
			while(withinRow < 2){				
				currentShape.center += 1;
				withinRow = currentShape.center % 10;
			}
		}
		//this allows the game to spawn a new block
		//once the current one touches the bottom or another block
		if(currentShape.center > 190 || this.isColliding(this.shapes[i])){
			isFalling = false;
		}
		
		//this.DeleteRow();
		
	}
	
}

tetrisGame.DeleteRow = function(){
	//checks every row on the board
	//deletes a row if each space is occupied by a shape
	
	for(var i = 0; i <= 199; i +10){
		var rowComplete = true;
		
		//runs until the row is discovered to be incomplete
		//then exits out and moves down to the next row
		while(rowComplete == true){
			//checks each index in the row
			for(j = 0; j > 10; j++){
				if(this.currentState[i + j] != -1){
					rowComplete = false
				}
				
			}
			//sets each index of the row to -1
			if(rowComplete = true){
				for(var k =0; k > 10; k++){
					this.currentState[i+j] = -1;
				}
				
				//Add logic here *
				//for shifting   *
				//all the blocks *
				//down 1 row     *
				
			}
			//exit the while loop
			rowComplete = false;
		}
			
		
	}
	
}

tetrisGame.GetCurrentState = function(){
	// This is where we display our image to the screen
	// Whatever we return in our 1-dimensional array is shown 
	// on the tetris board. 

	// Clear the board
	this.currentState = [];
	for(var r = 0; r < 20; r++){
		for(var c = 0; c < 10; c++){
			this.currentState.push(-1);
		}
	}
	
	
	for(var i = 0; i < this.shapes.length; i++){
		this.DrawShape(this.shapes[i]);
	}
	
	
	return this.currentState;
}

tetrisGame.IsShapeFalling = function(){
	// Always just return true so that we can keep getting
	// increment time calls.
	return true;
}

tetrisGame.DrawShape = function(shape)
{
	//In comments, centers are marked by an 'x' and the rest of the shape is '-'
	
	if(shape.type == 0)
	{
		//4-long straight shape --x-
		this.currentState[shape.center] = shape.type;
		//left side
		this.currentState[shape.center - 1] = shape.type;
		this.currentState[shape.center - 2] = shape.type;
		//right side
		this.currentState[shape.center + 1] = shape.type;
	}
	
	if(shape.type == 1)
	{
		//miniature T shape ---
		//                   x
		this.currentState[shape.center] = shape.type;
		this.currentState[shape.center - 10] = shape.type;
		//left side
		this.currentState[shape.center - 11] = shape.type;
		//right side
		this.currentState[shape.center - 9] = shape.type;
	}
	
	if(shape.type == 2)
	{
		//z shape --
		//         x-
		this.currentState[shape.center] = shape.type;
		this.currentState[shape.center - 10] = shape.type;
		//left side
		this.currentState[shape.center - 11] = shape.type;
		//right side
		this.currentState[shape.center + 1] = shape.type;
	}
	
	if(shape.type == 3)
	{
		//s shape  --
		//        -x
		this.currentState[shape.center] = shape.type;
		this.currentState[shape.center - 10] = shape.type;
		//left side
		this.currentState[shape.center - 9] = shape.type;
		//right side
		this.currentState[shape.center - 1] = shape.type;
	}
	
	if(shape.type == 4)
	{
		//2x2 block shape --
		//                x-
		this.currentState[shape.center] = shape.type;
		this.currentState[shape.center - 10] = shape.type;
		//right side
		this.currentState[shape.center - 9] = shape.type;
		this.currentState[shape.center + 1] = shape.type;
	}
	
	if(shape.type == 5)
	{
		//short L shape -
		//              -x-
		this.currentState[shape.center] = shape.type;
		this.currentState[shape.center - 11] = shape.type;
		//right side
		this.currentState[shape.center - 1] = shape.type;
		this.currentState[shape.center + 1] = shape.type;
	}
	
	if(shape.type == 6)
	{
		//short upside down L shape ---
		//                          x
		this.currentState[shape.center] = shape.type;
		//top part 
		this.currentState[shape.center - 10] = shape.type;
		this.currentState[shape.center - 9] = shape.type;
		this.currentState[shape.center - 8] = shape.type;
	}

}