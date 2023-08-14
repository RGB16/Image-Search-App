const acceskey='L5FzeKcr-UZBTYyUVUxU6_Y9kG59KmoNiGPu1W9-C5M'

const formE1=document.querySelector("form");
const inputE1=document.getElementById("search-input");
const searchReasults=document.querySelector(".search-results");
const showMore=document.querySelector(".show-more-button");

let inputData="";
let page=1;




async function searchImages() {
    inputData = inputE1.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${acceskey}`;

    const response = await fetch(url);
    const data = await response.json();
    const imageResults = data.results; 

    if (page === 1) {
        searchReasults.innerHTML = "";
    }

    imageResults.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageLink.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchReasults.appendChild(imageWrapper);
    });

    page++;

    if (imageResults.length > 0) {
        showMore.style.display = "block";  //display in a block
    } else {
        showMore.style.display = "none";
    }
}

// Add event listener for form submission
formE1.addEventListener("submit", (event) => {
    event.preventDefault();        //preventDefault():its default action should not be taken as it normally 
    page = 1;
    searchImages();
});

// Add event listener for "Show more" button
showMore.addEventListener("click", () => {
    searchImages();
});
