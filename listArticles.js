
function addArticle(title, text)
{
	var article = document.createElement('li');

    article.className = 'article';

    article.innerHTML = '<li> ' + title + ' <p> ' + text + ' </p> </li>';

     document.getElementById('newsList').appendChild(article);
}

function chooseArticleContent()
{
	if(filterPolitique==1)
	{
		addArticle("titre", "plein de contenu trop interessant sur la politique");
	}

	if(filterSport==1)
	{
		addArticle("titre", "plein de contenu trop interessant sur le sport");
	}

	if(filterSciences==1)
	{
		addArticle("titre", "plein de contenu trop interessant sur la science");
	}
}

function emptyNewsList()
{
	document.getElementById('newsList').innerHTML="";
}

chooseArticleContent();
