// This file contains all the R-based weapons
function Terminate()
{
	this.name = "Terminate";
	this.activate = activate;
	function activate()
	{
		Crafty("Enemy").each( function(){
			this.trigger('Death');
		});
	}
}