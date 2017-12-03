function addArticle(title, text) {
	var article = document.createElement('li');
	article.className = 'article';
	article.innerHTML = '<li> ' + title + ' <p> ' + text + ' </p> </li>';
 	document.getElementById('newsList').appendChild(article);
}

function chooseArticleContent() {
	emptyNewsList()

	if(country.code == null) { // Pays non identifié
		addArticle('Désolé', "Pas de pays, pas d'article");
	}
	else {
		if(filter['politique']) {
			addArticle('Politique', "Plein de contenu trop interessant sur la politique dans le pays " + country.name);
			addArticle('Politique', "Plein de contenu trop interessant sur la politique dans le pays " + country.name);
			addArticle('Politique', "Plein de contenu trop interessant sur la politique dans le pays " + country.name);
			addArticle('Politique', "Plein de contenu trop interessant sur la politique dans le pays " + country.name);
			addArticle('Politique', "Plein de contenu trop interessant sur la politique dans le pays " + country.name);
		}
		if(filter['sport']) {
			addArticle('Sport', "Plein de contenu trop interessant sur le sport dans le pays " + country.name);
		}
		if(filter['sciences']) {
			addArticle('Sciences', "Plein de contenu trop interessant sur la science dans le pays " + country.name);
		}
		if(filter['economie']) {
			addArticle('Economie', "Plein de contenu trop interessant sur l'economie dans le pays " + country.name);
		}
	}
}

function emptyNewsList() {
	document.getElementById('newsList').innerHTML='';
}

function sortResults(prop) {
  result = result.sort(function(a, b) {
    return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
  });
}

var result = new Array();

$.getJSON('https://newsapi.org/v2/top-headlines?category=general&country=fr&apiKey=c9443978d9c54b1e8232853ce181491c',function(data) {
	data.articles.forEach(function (a) { result.push(a); });
	$.getJSON('https://newsapi.org/v2/top-headlines?category=sport&country=fr&apiKey=c9443978d9c54b1e8232853ce181491c',function(data) {
		data.articles.forEach(function (a) { result.push(a); });
		sortResults('publishedAt');
		console.log(result);
	});
});
