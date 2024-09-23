document.g
document.addEventListener("DOMContentLoaded", function() {
    var request = new XMLHttpRequest();
    const URL = `https://newsdata.io/api/1/news?apikey=pub_40862b044d9919d3551ae3125c705a51e2b44&q=tech&&language=en`;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open('GET', URL, false);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            let results1 = JSON.parse(request.responseText);
            jsonData = results1.results;
            renderArticles();
        }
    };
    request.send(); 
});

let jsonData;
let currentIndex = 0;

function createArticle(articleData) {
    const articleContainer = document.getElementById('articles-container');
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('article');

    const titleElement = document.createElement('h2');
    titleElement.textContent = articleData.title;
    articleDiv.appendChild(titleElement);

    if (articleData.image_url) {
        const imageElement = document.createElement('img');
        imageElement.src = articleData.image_url;
        articleDiv.appendChild(imageElement);
    }

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = articleData.description;
    articleDiv.appendChild(descriptionElement);

    const linkElement = document.createElement('a');
    linkElement.textContent = 'Read more';
    linkElement.style.cursor = 'pointer';
    linkElement.onclick = function(event) {
        const articleLink = document.createElement('a');
        articleLink.href = articleData.link;
        articleLink.textContent = articleData.link;
        articleLink.target = '_blank';
        articleDiv.replaceChild(articleLink, linkElement);
    };
    articleDiv.appendChild(linkElement);

    articleContainer.appendChild(articleDiv);
}

function showNextArticle() {
    currentIndex = (currentIndex + 1) % jsonData.length;
    renderArticles();
}

function showPrevArticle() {
    currentIndex = (currentIndex - 1 + jsonData.length) % jsonData.length;
    renderArticles();
}

function renderArticles() {
    const articleContainer = document.getElementById('articles-container');
    articleContainer.innerHTML = '';
    createArticle(jsonData[currentIndex]);
}

function refreshData() {
    currentIndex = 0;
    var request = new XMLHttpRequest();
    const URL = `https://newsdata.io/api/1/news?apikey=pub_40862b044d9919d3551ae3125c705a51e2b44&q=tech&&language=en`;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open('GET', URL, false);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            let results1 = JSON.parse(request.responseText);
            jsonData = results1.results;
            renderArticles();
        }
    };
    request.send(); 
}

document.getElementById('next-btn').addEventListener('click', showNextArticle);
document.getElementById('prev-btn').addEventListener('click', showPrevArticle);
document.getElementById('refresh-btn').addEventListener('click',refreshData)