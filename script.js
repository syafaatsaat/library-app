const LibrarySystem = (function() {
    const libraryArray = [];

    class Book {
        constructor(title, author, pages, readStatus = false) {
            this.id = crypto.randomUUID();
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.readStatus = readStatus;
        }

        toggleRead() {
            this.readStatus = !this.readStatus;
        }
    }

    const shelfDiv = document.querySelector("#shelf");
    const newBookEntryDiv = document.querySelector("#new-book");

    const addBookToLibrary = (title, author, pages, readStatus) => {
        const newBook = new Book(title, author, pages, readStatus);
        libraryArray.push(newBook);

        createBookElements(newBook);
    };

    const removeBook = (id) => {
        let index = -1;
        for (let i = 0; i < libraryArray.length; ++i) {
            if (libraryArray[i].id === id) {
                index = i;
            }
        }

        if (index >= 0) {
            libraryArray.splice(index, 1);
        }

        const bookDiv = document.querySelector('[data-book-id="' + id + '"]');
        shelfDiv.removeChild(bookDiv);
    };

    const createBookElements = (newBook) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.dataset.bookId = newBook.id;

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

        removeButton.addEventListener('click', () => {
            removeBook(newBook.id);
        });

        readButton.addEventListener('click', () => {
            newBook.toggleRead();

            if (!newBook.readStatus) {
                if (readButton.classList.contains("read")) {
                    readButton.classList.remove("read");
                }
                readButton.classList.add("unread");
                readButton.textContent = "Unread";
            }
            else {
                if (readButton.classList.contains("unread")) {
                    readButton.classList.remove("unread");
                }
                readButton.classList.add("read");
                readButton.textContent = "Read";
            }
        })
    };

    const checkEntry = () => {
        const titleField = document.getElementById("titleid");
        const authorField = document.getElementById("authorid");
        const pagesField = document.getElementById("pagesid");
        const read = document.querySelector("#readstatusid").checked;

        if (titleField.validity.valueMissing) {
            titleField.setCustomValidity("The book title must be filled!");
            titleField.reportValidity();
            return false;
        }

        titleField.setCustomValidity("");

        if (authorField.validity.valueMissing) {
            authorField.setCustomValidity("The author name must be filled!");
            authorField.reportValidity();
            return false;
        }

        authorField.setCustomValidity("");
        
        if (pagesField.validity.valueMissing || 
            pagesField.validity.rangeUnderflow
        ) {
            pagesField.setCustomValidity("The number of pages is too low!");
            pagesField.reportValidity();
            return false;
        }

        pagesField.setCustomValidity("");

        addBookToLibrary(
            titleField.value, 
            authorField.value, 
            pagesField.value, 
            read
        );

        return true;
    };

    const openNewBookDialog = () => {
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
    };

    const closeNewBookDialog = () => {
        const bookForm = document.querySelector("#book-form");
        bookForm.reset();

        const dialog = newBookEntryDiv.firstElementChild;
        dialog.close();

        newBookEntryDiv.classList.remove("show-entry");
        newBookEntryDiv.classList.add("hide-entry");
    };

    const setupNewBookButtonListener = () => {
        document.getElementById("add").addEventListener('click', () => {
            openNewBookDialog();
        });
    };

    setupNewBookButtonListener();
})();

// addBookToLibrary(
//     "Harry Potter and the Philosopher's Stone",
//     "J. K. Rowling",
//     223,
//     false
// );

// addBookToLibrary(
//     "Percy Jackson and The Lightning Thief",
//     "Rick Riordan",
//     377,
//     true
// );

// addBookToLibrary(
//     "Heroes of Olympus: The Lost Hero",
//     "Rick Riordan",
//     557,
//     true
// );