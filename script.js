const myLibrary = [];

function Book(title, author, pages) {
    if (!new.target) {
        throw Error("You must the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = false;
}

function addBookToLibrary(title, author, pages) {
    const newBook = new Book(title, author, pages);
    myLibrary.push(newBook);

    createBookElements(newBook);
}

function createBookElements(newBook) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const bookCoverDiv = document.createElement("div");
    bookCoverDiv.classList.add("book-cover");
    const coverImg = document.createElement("img");
    coverImg.setAttribute("id", "cover");
    bookCoverDiv.appendChild(coverImg);

    const bookInfoDiv = document.createElement("div");
    bookInfoDiv.classList.add("book-info");
    const titleP = document.createElement("p");
    titleP.classList.add("title");
    titleP.textContent = newBook.title;
    const authorP = document.createElement("p");
    authorP.classList.add("author");
    authorP.textContent = newBook.author;
    const pagesSectionDiv = document.createElement("div");
    pagesSectionDiv.classList.add("pages-section");
    const pagesP = document.createElement("p");
    pagesP.setAttribute("id", "pages");
    pagesP.textContent = newBook.pages;
    const pagesWordP = document.createElement("p");
    pagesWordP.classList.add("pages-word");
    pagesSectionDiv.appendChild(pagesP);
    pagesSectionDiv.appendChild(pagesWordP);
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");
    const readButton = document.createElement("button");
    readButton.setAttribute("id", "read-status");
    if (!newBook.readStatus) {
        readButton.classList.add("unread");
        readButton.textContent = "Unread";
    }
    else {
        readButton.classList.add("read");
        readButton.textContent = "Read";
    }
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.textContent = "Remove";
    buttonsDiv.appendChild(readButton);
    buttonsDiv.appendChild(removeButton);
    bookInfoDiv.appendChild(titleP);
    bookInfoDiv.appendChild(authorP);
    bookInfoDiv.appendChild(pagesSectionDiv);
    bookInfoDiv.appendChild(buttonsDiv);

    bookDiv.appendChild(bookCoverDiv);
    bookDiv.appendChild(bookInfoDiv);

    shelfDiv.appendChild(bookDiv);
}

const shelfDiv = document.querySelector("#shelf");
const newButton = document.querySelector("#add");
newButton.addEventListener('click', (event) => {

});

addBookToLibrary(
    "Heroes of Olympus: The Lost Hero",
    "Rick Riordan",
    557
);