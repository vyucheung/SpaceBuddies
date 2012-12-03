// This file contains all the W-based weapons
function Heal()
{
	this.name = "Heal";
	this.activate = activate;
	function activate(owner)
	{
		owner.hp.current += 10;
	}
}