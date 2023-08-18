const API_KEY = "2fea0d7654a44dbb8de208d49e6eb75b";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=> fetchnews("World"));

function reload(){
    window.location.reload();
}

async function fetchnews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const maincontainer = document.getElementById("main-container");
    const template = document.getElementById("template");

    maincontainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const mainclone = template.content.cloneNode(true);


        filldata(mainclone,article);

        maincontainer.appendChild(mainclone);
    });
}

function filldata(mainclone,article){
    const newsImg = mainclone.querySelector("#news-img");
    const newsTitle = mainclone.querySelector("#news-heading");
    const newsSource = mainclone.querySelector("#news-source");
    const newsDesc = mainclone.querySelector("#news-description");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Kolkata",
    });

    newsSource.innerHTML = `${article.source.name} • ${date}`;
    
    mainclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}


let curSelectedNav = null;
function onNavClick(id) {
    fetchnews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-btn");
const searchText = document.getElementById("search-txt");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchnews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

