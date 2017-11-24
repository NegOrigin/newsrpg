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
		displayArticles()
	});

	document.getElementById('filterSport').addEventListener("click", function() {
		filter['sport']=switchButton(filter['sport'], 'filterSport');
		checkButton(filter['sport'], 'filterSport');
		displayArticles()
	});

	document.getElementById('filterSciences').addEventListener("click", function() {
		filter['sciences']=switchButton(filter['sciences'], 'filterSciences');
		checkButton(filter['sciences'], 'filterSciences');
		displayArticles()
	});

	document.getElementById('filterEconomie').addEventListener("click", function() {
		filter['economie']=switchButton(filter['economie'], 'filterEconomie');
		checkButton(filter['economie'], 'filterEconomie');
		displayArticles()
	});

}

//change la valeur d'un filtre et le cookie du bouton qui correspond
function switchButton(filterButton, id)
{
	if(!filterButton)
	{
		filterButton=true;
		setCookie(id,1,365*2);
	}
	else
	{
		filterButton=false;
		setCookie(id,0,365*2);
	}

	return filterButton;
}

//met à jour le css d'un bouton
function checkButton(filterButton, id)
{
	if(!filterButton)
	{
		document.getElementById(id).style.borderBottom="solid crimson 0.4vh";
		//document.getElementById(id).style.textShadow="1px 1px 2px Crimson";
	}
	else
	{
		document.getElementById(id).style.borderBottom="solid Chartreuse 0.4vh";
		//document.getElementById(id).style.textShadow="1px 1px 2px Chartreuse";
	}
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

function displayArticles()
{
  if(window.location.href.substr(window.location.href.lastIndexOf('/') + 1) === 'map')
  {
    emptyNewsList();
		chooseArticleContent();
  }
}

launch();
