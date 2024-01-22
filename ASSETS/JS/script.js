const h1 = document.createElement("h1");
h1.textContent = "Hacker News";

const p1 = document.createElement("h3");
p1.textContent = "Hello there! Here are the latest news about the tech's world.";
p1.setAttribute('class', 'advanced');

const p2 = document.createElement("h3");
p2.textContent = `Click below on the following links to read more on the articles and
if you want more news click on the button "load more" at the end of the page.`
p2.setAttribute('class', 'advanced');

const newsContainer = document.createElement("div");
newsContainer.setAttribute("id", "news-container")
const loadMoreBtn = document.createElement("button");
loadMoreBtn.setAttribute("id", "load-more-btn")
loadMoreBtn.textContent = "Load More"


document.querySelector('body').append(h1);
document.querySelector('body').append(p1);
document.querySelector('body').append(p2);
document.querySelector('body').append(newsContainer);
document.querySelector('body').append(loadMoreBtn);

document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container')
    const loadMoreBtn = document.getElementById('load-more-btn')
    let startIndex = 0
    const batchSize = 10

    // Funzione per ottenere le notizie
    function getNews(ids) {
      const promises = ids.slice(startIndex, startIndex + batchSize)
        .map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(response => response.json()))

      Promise.all(promises)
        .then(news => {
          news.forEach(item => {
            const newsItem = document.createElement('div')
            newsItem.innerHTML = `<h3>${item.title}</h3><a href="${item.url}" target="_blank">Link to the news</a>
            <p>Date: ${new Date(item.time * 1000).toLocaleString()}</p>`
            newsContainer.appendChild(newsItem)
          })
        })
        .catch(error => console.error('Error fetching news:', error))
    }

    // Chiamata per ottenere l'elenco degli ID delle notizie
    fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
      .then(response => response.json())
      .then(newsIds => {
        // Carica le prime 10 notizie
        getNews(newsIds)
        startIndex += batchSize

        // Aggiunta del gestore per il pulsante "Load more"
        loadMoreBtn.addEventListener('click', () => {
          getNews(newsIds)
          startIndex += batchSize
        });
      })
      .catch(error => console.error('Error fetching news IDs:', error))
  });