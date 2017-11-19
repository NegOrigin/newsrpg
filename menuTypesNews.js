
//fichier pour gerer le menu avec les filtres par filter de news

var displayLog2 = true;

var filter=[];
filter['politique']=true;
filter['sport']=true;
filter['sciences']=true;
filter['eonomie']=true;


function consoleLog2(message) 
{
  if (displayLog2)
    console.log(message);
}

function launch()
{
	updateFilterVar();

	checkButton(filter['politique'], 'filterPolitique');
	checkButton(filter['sport'], 'filterSport');
	checkButton(filter['sciences'], 'filterSciences');
	checkButton(filter['economie'], 'filterEconomie');


	//eventListener sur les boutons des filtres
	document.getElementById('filterPolitique').addEventListener("click", function() {
		filter['politique']=switchButton(filter['politique'], 'filterPolitique');
		checkButton(filter['politique'], 'filterPolitique');
		emptyNewsList();
		chooseArticleContent();
	});

	document.getElementById('filterSport').addEventListener("click", function() {
		filter['sport']=switchButton(filter['sport'], 'filterSport');
		checkButton(filter['sport'], 'filterSport');
		emptyNewsList();
		chooseArticleContent();
	});

	document.getElementById('filterSciences').addEventListener("click", function() {
		filter['sciences']=switchButton(filter['sciences'], 'filterSciences');
		checkButton(filter['sciences'], 'filterSciences');
		emptyNewsList();
		chooseArticleContent();
	});

	document.getElementById('filterEconomie').addEventListener("click", function() {
		filter['economie']=switchButton(filter['economie'], 'filterEconomie');
		checkButton(filter['economie'], 'filterEconomie');
		emptyNewsList();
		chooseArticleContent();
	});

}

//change la valeur d'un filtre et le cookie du bouton qui correspond
function switchButton(filterButton, id)
{
	if(!filterButton)
	{
		filterButton=true;
		setCookie(id,1,7);
	}
	else
	{
		filterButton=false;
		setCookie(id,0,7);
	}

	return filterButton;
}

//met à jour le css d'un bouton
function checkButton(filterButton, id)
{
	if(!filterButton)
	{
		document.getElementById(id).style.color="red";
	}
	else
	{
		document.getElementById(id).style.color="green";
	}
}

/*
	Gestion des cookies
	setCookie et getCookie recuperees sur https://www.w3schools.com/js/js_cookies.asp
*/

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//récupère les cookies et met à jour les var globales
function updateFilterVar()
{
	if(getCookie('filterPolitique')=="0")
		filter['politique']=false;
	else
		filter['politique']=true;

	if(getCookie('filterSport')=="0")
		filter['sport']=false;
	else
		filter['sport']=true;

	if(getCookie('filterSciences')=="0")
		filter['sciences']=false;
	else
		filter['sciences']=true;

	if(getCookie('filterEconomie')=="0")
		filter['economie']=false;
	else
		filter['economie']=true;
}


launch();