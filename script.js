const myLibrary = [];

function Book(title, author, pages, readStatus = false) {
    if (!new.target) {
        throw Error("You must the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBookToLibrary(title, author, pages, readStatus) {
    const newBook = new Book(title, author, pages, readStatus);
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
    pagesWordP.textContent = "pages";
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

function checkEntry() {
    const title = document.querySelector("#titleid").value;
    const author = document.querySelector("#authorid").value;
    const pages = document.querySelector("#pagesid").value;
    const read = document.querySelector("#readstatusid").checked;
    
    if (title.length <= 0 
        || author.length <= 0 
        || pages.length <= 0) 
    {
        return false;
    }

    addBookToLibrary(title, author, pages, read);

    return true;
}

function openNewBookDialog() {
    newBookEntryDiv.classList.remove("hide-entry");
    newBookEntryDiv.classList.add("show-entry");
    const dialog = newBookEntryDiv.firstElementChild;
    dialog.showModal();

    const closeButton = document.querySelector("#close-entry");
    closeButton.addEventListener('click', (event) => {
        event.preventDefault();
        closeNewBookDialog();
    });

    const submitButton = document.querySelector("#submit-entry");
    submitButton.addEventListener('click', (event) => {
        if (checkEntry()) {
            event.preventDefault();
            closeNewBookDialog();
        }
    });
}

function closeNewBookDialog() {
    const bookForm = document.querySelector("#book-form");
    bookForm.reset();

    const dialog = newBookEntryDiv.firstElementChild;
    dialog.close();
    
    newBookEntryDiv.classList.remove("show-entry");
    newBookEntryDiv.classList.add("hide-entry");
}

const shelfDiv = document.querySelector("#shelf");
const newBookEntryDiv = document.querySelector("#new-book");

const buttons = document.querySelector("button");
buttons.addEventListener('click', (event) => {
    let target = event.target;

    switch (target.id) {
        case "add":
            openNewBookDialog();
            break;
    }
});

addBookToLibrary(
    "Harry Potter and the Philosopher's Stone",
    "J. K. Rowling",
    223,
    false
);

addBookToLibrary(
    "Percy Jackson and The Lightning Thief",
    "Rick Riordan",
    377,
    true
);

addBookToLibrary(
    "Heroes of Olympus: The Lost Hero",
    "Rick Riordan",
    557,
    true
);