
function addArticle(title, text)
{
	var article = document.createElement('li');

    article.className = 'article';

    article.innerHTML = '<li> ' + title + ' <p> ' + text + ' </p> </li>';

     document.getElementById('newsList').appendChild(article);
}

function chooseArticleContent()
{
	if(country==="CAKE") //pas de pays reconnu
	{
		addArticle("titre", "Pas de pays, pas d'article ");
	}
	else
	{
		if(filter['politique'])
		{
			addArticle("Politique", "Plein de contenu trop interessant sur la politique dans le pays " + country);
		}

		if(filter['sport'])
		{
			addArticle("Sport", "Plein de contenu trop interessant sur le sport dans le pays " + country);
		}

		if(filter['sciences'])
		{
			addArticle("Sciences", "Plein de contenu trop interessant sur la science dans le pays " + country);
		}

		if(filter['economie'])
		{
			addArticle("Economie", "Plein de contenu trop interessant sur l'economie dans le pays " + country);
		}
	}
	
}

function emptyNewsList()
{
	document.getElementById('newsList').innerHTML="";
}

chooseArticleContent();
