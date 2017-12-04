var articleList = [];
var checkSum=0;

//ajoute un seul article à la page
function addArticle(title, text, url, date, source, color) {
	var article = document.createElement('li');
	article.className = 'article';
	article.style = 'border-color:' + color + '';
	if(date=="undefined" || date==null || date=="")
	{
		date="";
		if(source!="undefined" || source==null || source=="")
		{
			date='(' + source + ')';
		}
	}
	else
	{
		date=date.slice(0,10);
		date='(' + source + " " + date + ')';
	}
	
	contenuString = '<a href="' + url +'"';
	if(url!="")
	{
		contenuString += ' target="_blank"';
	}
	contenuString += '> <p class="articleTitle">' + title + '</p> ' + date + ' <p> ' + text + ' </p> </a>';
	article.innerHTML = contenuString;
 	document.getElementById('newsList').appendChild(article);
}

//ajoute les articles sur la page
function addArticles() {
	sortResults('publishedAt');
	//articleList=articleList.slice(0,20);
	console.log(articleList);
	console.log(articleList.length);
	for(var i = 0; i < (articleList.length < 20 ? articleList.length : 20); i++) {
		//console.log(articleList[i]);
		addArticle(articleList[i].title, articleList[i].description, articleList[i].url, articleList[i].publishedAt, articleList[i].source, articleList[i].color);
	}
	if(articleList.length==0) {
		addArticle("Pas d'article correspondant à ces catégories", "Désolé", "", "undefined", "undefined", "black");
	}
	console.log("end");
}

function getArticles() {
	emptyNewsList();
	var checkSum=0;

	if(country.code == null) { // Pays non identifié
		addArticle('Désolé', "Pas de pays, pas d'article", "", "undefined", "undefined", "black");
	}
	else {
		//on verifie tous les filtres
	    if(filter['economie']) {
			$.getJSON('https://newsapi.org/v2/top-headlines?category=business&country='+ country.code +'&apiKey=c9443978d9c54b1e8232853ce181491c',function(data) {
				data.articles.forEach(function (a) { addToList(a.title, a.publishedAt, a.source.name, a.description, a.url, 'Gold'); });
				checkSum++; 
			});	
		}
		else{
			checkSum++; 
		}
		if(filter['divertissement']) {
			$.getJSON('https://newsapi.org/v2/top-headlines?category=entertainment&country='+ country.code +'&apiKey=c9443978d9c54b1e8232853ce181491c',function(data) {
				data.articles.forEach(function (a) { addToList(a.title, a.publishedAt, a.source.name, a.description, a.url, 'DodgerBlue'); });
				checkSum++; 
			});
		}
		else{
			checkSum++; 
		}
		if(filter['gaming']) {
			$.getJSON('https://newsapi.org/v2/top-headlines?category=gaming&country='+ country.code +'&apiKey=c9443978d9c54b1e8232853ce181491c',function(data) {
				data.articles.forEach(function (a) { addToList(a.title, a.publishedAt, a.source.name, a.description, a.url, 'OrangeRed'); });
				checkSum++; 
			});
		}
		else{
			checkSum++; 
		}
		if(filter['general']) {
			$.getJSON('https://newsapi.org/v2/top-headlines?category=general&country='+ country.code +'&apiKey=c9443978d9c54b1e8232853ce181491c',function(data) {
				data.articles.forEach(function (a) { addToList(a.title, a.publishedAt, a.source.name, a.description, a.url, 'LightSalmon'); });
				checkSum++; 
			});
		}
		else{
			checkSum++; 
		}
		if(filter['sante']) {
			$.getJSON('https://newsapi.org/v2/top-headlines?category=health-and-medical&country='+ country.code +'&apiKey=c9443978d9c54b1e8232853ce181491c',function(data) {
				data.articles.forEach(function (a) { addToList(a.title, a.publishedAt, a.source.name, a.description, a.url, 'DeepPink'); });
				checkSum++; 
			});
		}
		else{
			checkSum++; 
		}
		if(filter['musique']) {
			$.getJSON('https://newsapi.org/v2/top-headlines?category=music&country='+ country.code +'&apiKey=c9443978d9c54b1e8232853ce181491c',function(data) {
				data.articles.forEach(function (a) { addToList(a.title, a.publishedAt, a.source.name, a.description, a.url, 'MediumAquaMarine'); });
				checkSum++; 
			});
		}
		else{
			checkSum++; 
		}
		if(filter['politique']) {
			$.getJSON('https://newsapi.org/v2/top-headlines?category=politics&country='+ country.code +'&apiKey=c9443978d9c54b1e8232853ce181491c',function(data) {
				data.articles.forEach(function (a) { addToList(a.title, a.publishedAt, a.source.name, a.description, a.url, 'Crimson'); });
				checkSum++; 
			});
		}
		else{
			checkSum++; 
		}
		if(filter['sciences']) {
			$.getJSON('https://newsapi.org/v2/top-headlines?category=science-and-nature&country='+ country.code +'&apiKey=c9443978d9c54b1e8232853ce181491c',function(data) {
				data.articles.forEach(function (a) { addToList(a.title, a.publishedAt, a.source.name, a.description, a.url, 'LightSeaGreen'); });
				checkSum++; 
			});	
		}
		else{
			checkSum++; 
		}
		if(filter['sport']) {
			$.getJSON('https://newsapi.org/v2/top-headlines?category=sport&country='+ country.code +'&apiKey=c9443978d9c54b1e8232853ce181491c',function(data) {
				data.articles.forEach(function (a) { addToList(a.title, a.publishedAt, a.source.name, a.description, a.url, 'Chartreuse'); });
				checkSum++; 
			});		
		}
		else{
			checkSum++; 
		}
		if(filter['technologie']) {
			$.getJSON('https://newsapi.org/v2/top-headlines?category=technology&country='+ country.code +'&apiKey=c9443978d9c54b1e8232853ce181491c',function(data) {
				data.articles.forEach(function (a) { addToList(a.title, a.publishedAt, a.source.name, a.description, a.url, 'CadetBlue'); });
				checkSum++; 
			});	
		}
		else{
			checkSum++; 
		}
		
		//on attend que toutes les catégories aient fini de récuperer les articles
		waitUntil(function() { 
			if (checkSum==10) return true; 
			else {console.log(checkSum); return false;
		}}, addArticles, 50); //quand c'est fini, on ajoute les articles à la page
	}
}

function emptyNewsList() {
	document.getElementById('newsList').innerHTML='';
	articleList=[];
}

function sortResults(prop) {
  articleList = articleList.sort(function(a, b) {
    return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
  });
}

//Ajoute le contenu d'un article à la liste des articles
function addToList(title, publishedAt, source, description, url, color) {
	if(description==null)
	{
		description="";
	}
	articleList[articleList.length]= { 'title' : title,  'publishedAt' : publishedAt, 'source' : source, 'description' : description, 'url' : url, 'color' : color};
}

//source : https://gist.github.com/granteagon/2238248
function waitUntil(boolFn, callback, delay) {
    "use strict";
    // if delay is undefined or is not an integer
    delay = (typeof (delay) === 'undefined' || isNaN(parseInt(delay, 10))) ? 100 : delay;
    setTimeout(function () {
        (boolFn()) ? callback() : waitUntil(boolFn, callback, delay);
    }, delay);
}
