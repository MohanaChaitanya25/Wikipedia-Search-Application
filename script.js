let searchInput = document.getElementById('searchInput');
let searchResults = document.getElementById('searchResults');
let spinner = document.getElementById('spinner');

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    // Creating Result Item
    let ResultItem = document.createElement('div');
    ResultItem.classList.add('result-item');
    searchResults.appendChild(ResultItem);

    // Creating Title Element
    let TitleElement = document.createElement('a');
    TitleElement.textContent = title;
    TitleElement.setAttribute('href', link);
    TitleElement.setAttribute('target', '_blank');
    TitleElement.classList.add('result-title');
    ResultItem.appendChild(TitleElement);

    // Creating Break Element
    let breakElement = document.createElement('br');
    ResultItem.appendChild(breakElement);

    // Creating URL Item
    let UrlElement = document.createElement('a');
    UrlElement.textContent = link;
    UrlElement.setAttribute('href', link);
    UrlElement.setAttribute('target', '_blank');
    UrlElement.classList.add('result-url');
    ResultItem.appendChild(UrlElement);

    // Creating Break Element
    let breakElement2 = document.createElement('br');
    ResultItem.appendChild(breakElement2);

    // Creating Description Element
    let descriptionELement = document.createElement('p');
    descriptionELement.classList.add('link-description');
    descriptionELement.textContent = description;
    ResultItem.appendChild(descriptionELement);

}

function displayResults(search_results) {
    searchResults.textContent = "";
    spinner.classList.toggle('d-none');
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }
}


function searchWikipedia(event) {
    if (event.key === 'Enter') {
        spinner.classList.toggle('d-none');
        let searchInputVal = searchInput.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputVal;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInput.addEventListener('keydown', searchWikipedia);