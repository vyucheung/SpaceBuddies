// This file contains all the Q-based weapons
function RapidFire()
{
	this.name = "RapidFire";
	
	this.activate = activate;
	
	function activate(owner)
	{
		owner.firerate = owner.firerate/2;
		setTimeout( function(){
			owner.firerate = owner.firerate*2;
		}, 5000);
	}
}