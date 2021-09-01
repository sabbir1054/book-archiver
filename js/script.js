//Get Search Input Function
const getSearchText = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  getBooksData(searchText);
  clear(); //clear past value function call
};

//Get Data By API Fetch
const getBooksData = (searchText) => {
  spinner("flex"); //spinner on
  const url = `http://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBooksData(data));
};

//Display data in website
const displayBooksData = (booksInfo) => {
  const booksArr = booksInfo.docs;
  displayBooksNumber(booksInfo); //Quantity of books function call

  const cardsDiv = document.getElementById("cards-div");
  booksArr.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
        <div class="card">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${booksImgUrl(
                    book
                  )}" class="img-fluid rounded-start" alt="Not-found" />
                </div>
                <div class="col-md-8">
                  <div class="card-body text-dark">
                    <h5 class="card-title">${book.title}</h5>
                    <div class="card-text">
                        <p class="fw-bold">Author: ${
                          book.author_name ? book.author_name : "Not found"
                        }</p>
                        <p class="fw-bold">Publisher: ${
                          book.publisher ? book.publisher : "Not found"
                        }</p>
                        <p class="fw-bold">1st Publish: ${
                          book.first_publish_year
                            ? book.first_publish_year
                            : "Not found"
                        }</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
    cardsDiv.appendChild(card);
    spinner("none"); //spinner off
  });
};

//books img url finder
const booksImgUrl = (book) => {
  if (book.cover_i) {
    return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
  } else {
    return "../images/notfound.jpg";
  }
};

//Display Quantity of books
const displayBooksNumber = (booksInfo) => {
  const totalBooksFound = booksInfo.numFound;
  const booksArr = booksInfo.docs;
  if (totalBooksFound === 0) {
    //Error handling (No data found)
    document.getElementById("cards-div").innerHTML = `
            <h1 class="text-center text-white">No Results Found</h1>
        `;
      spinner("none"); 
  }
  document.getElementById("total-books").innerText = totalBooksFound;
  document.getElementById("showing-books").innerText = booksArr.length;
};

//clear all past value
const clear = () => {
  document.getElementById("search-field").value = "";
  document.getElementById("cards-div").innerHTML = "";
  document.getElementById("total-books").innerText = 0;
  document.getElementById("showing-books").innerText = 0;
};

//Loader spinner function
const spinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};
