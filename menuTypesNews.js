
//fichier pour gerer le menu avec les filtres par filter de news

var displayLog = true;

//TODO remplacer par un array
var filterPolitique = 1;
var filterSport = 1;
var filterSciences = 1;

var filter=[
	[1,2],
	[3,4],
	[5,6],
	[7,8]
];

filter[0][0]="filterPolitique";
filter[0][1]=1;

filter[1][0]="filterSport";
filter[1][1]=1;

filter[2][0]="filterSciences";
filter[2][1]=1;

filter[3][0]="filterEconomie";
filter[3][1]=1;


function consoleLog(message) {
  if (displayLog)
    console.log(message);
}

function launch()
{
	updateFilterVar();

	checkButton(filterPolitique, 'filterPolitique');
	checkButton(filterSport, 'filterSport');
	checkButton(filterSciences, 'filterSciences');


	//eventListener sur les boutons des filtres
	document.getElementById('filterPolitique').addEventListener("click", function() {
		filterPolitique=switchButton(filterPolitique, 'filterPolitique');
		checkButton(filterPolitique, 'filterPolitique');
		emptyNewsList();
		chooseArticleContent();
	});

	document.getElementById('filterSport').addEventListener("click", function() {
		filterSport=switchButton(filterSport, 'filterSport');
		checkButton(filterSport, 'filterSport');
		emptyNewsList();
		chooseArticleContent();
	});

	document.getElementById('filterSciences').addEventListener("click", function() {
		filterSciences=switchButton(filterSciences, 'filterSciences');
		checkButton(filterSciences, 'filterSciences');
		emptyNewsList();
		chooseArticleContent();
	});

}

//change la valeur d'un filtre et le cookie du bouton qui correspond
function switchButton(filterButton, id)
{
	if(filterButton==0)
	{
		filterButton=1;
		setCookie(id,1,7);
	}
	else
	{
		filterButton=0;
		setCookie(id,0,7);
	}

	return filterButton;
}

//met à jour le css d'un bouton
function checkButton(filterButton, id)
{
	if(filterButton==0)
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
	{
		filterPolitique=0;
	}
	else
	{
		filterPolitique=1;
	}

	if(getCookie('filterSport')=="0")
	{
		filterSport=0;
	}
	else
	{
		filterSport=1;
	}

	if(getCookie('filterSciences')=="0")
	{
		filterSciences=0;
	}
	else
	{
		filterSciences=1;
	}
}


launch();