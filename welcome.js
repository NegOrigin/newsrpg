function welcomeStart()
{
	document.getElementById('directMap').addEventListener("change", function() {
		if(directMap.checked)
		{
			setCookie("directMap", true, 7);
		}
		else
		{
			setCookie("directMap", false, 7);

		}
	});

	//On vérifie si la box doit être check ou pas
	//On remet le choix précédent
	valDirectMap=getCookie("directMap");

	if(valDirectMap=="true")
	{
		document.getElementById('directMap').checked=true;
	}
	else
	{
		document.getElementById('directMap').checked=false;
	}
}





welcomeStart();