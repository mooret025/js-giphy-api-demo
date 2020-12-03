const myContainer = document.querySelector("#gifs_container");
document
  .getElementById("search-form")
  .addEventListener("submit", (event) => getSearch(event));

function getSearch(event) {
  event.preventDefault();
  let search = event.target.search.value;
  event.target.search.value = "";
  makeButtons(search);
  //searchGifs(search);
}

function searchGifs(search) {
  // set search term
  let searchTerm = search;

  // query giphy api with search term and capture result
  // need api key
  axios
    .get(`https://api.giphy.com/v1/gifs/search?api_key=*******&q=${searchTerm}`)
    .then((result) => {
      const {
        data: { data },
      } = result;

      // Clear gifs container
      myContainer.innerHTML = "";

      // create img tag forEach gif returned and append to container
      data.map((gif) => printGifs(gif));
    })
    .catch(function (error) {
      console.log(error);
    });
}

function makeButtons(search) {
  // take search term and use it to label a button to click to query giphy api
  const buttonContainer = document.querySelector("#button_container");
  const button = document.createElement("button");
  button.textContent = search;
  buttonContainer.appendChild(button);
  button.addEventListener("click", () => searchGifs(search));
}

function printGifs(gif) {
  const url = gif.images.downsized.url;
  const photo = document.createElement("IMG");
  photo.src = url;

  const title = gif.title;
  const caption = document.createElement("p");
  caption.innerHTML = title;
  myContainer.appendChild(photo);
  myContainer.appendChild(caption);
}
