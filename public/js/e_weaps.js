// This file contains all the E-based weapons
function Teleport()
{
	this.name = "Teleport";
	this.activate = activate;
	function activate(owner)
	{
		owner.x = Math.floor((Math.random()*720)+1);
	}
}