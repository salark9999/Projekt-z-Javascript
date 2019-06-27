var $addBtn;
var $list;
var $myInput;

function main() {  //odpalenie funkcji początkowych
    prepareDOMElements();
    prepareDOMEvents();
    addDataFromServer();
    
};

function prepareDOMElements() {  //wyszukiwanie elementów w drzewie DOM
    $addBtn = document.getElementById("addTodo");
    $list = document.getElementById("list");
    $myInput = document.getElementById("myInput");
};

function prepareDOMEvents() {   //nasłuchiwanie elementów / przygotowanie Listenerów
    $addBtn.addEventListener("click", addButtonClickHandler);
    $list.addEventListener("click", listClickManager);
};

function addButtonClickHandler() {
    axios.post("http://195.181.210.249:3000/todo/", {title: $myInput.value})
    .then (()=> {
        $list.innerHTML = "";
        addDataFromServer();
    });   
};

async function addDataFromServer() {
    var response = await axios.get("http://195.181.210.249:3000/todo/");
    
        response.data.forEach(element => {
        addNewElementToList(element.title + "/" + element.author, element.id);
        editButton();
        editInput();
        removeButton();
    })
};

function addNewElementToList(title, id) {  //obsługa dodawania elementów do listy
    var newElement = createElement(title, id);

    $list.appendChild(newElement);
};

function createElement(title, id){ /*( Title, author, id ) {  // Tworzy reprezentacje DOM elementu return newElement }*/
var newLi = document.createElement("li");
newLi.id = id
newLi.innerText = title;

return newLi;
};


function listClickManager(ev)  /*( event- event.target ) */{ //rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
    removeListElement(ev.target.id)
    
};

function removeListElement(id) { //usuwanie elementu
    axios.delete("http://195.181.210.249:3000/todo/" + id).then(() => {
            $list.innerHTML = "";
            addDataFromServer();
        }
    ); 
};

function editButton() {
    const editButton = document.createElement("button");

    editButton.id.add = "edit-button";
    editButton.innerText = "Edit";
    editButton.setAttribute("title", "To jest przycisk do edycji");
    editButton.classList.add("data-edit--new");
    editButton.style.setProperty( "background-color", "green");

    const container = document.getElementById("list");
    container.appendChild(editButton);

};

function editInput() {
    const editInput = document.createElement("input");

    editInput.id.add = "edit-input";
    editInput.placeholder = "Title...";
    editInput.style.setProperty( "background-color", "skyblue");

    const container = document.getElementById("list");
    container.appendChild(editInput);

};


function editListElement(id)  { // pobranie informacji na temat zadania// umieść dane w popupie
    axios.patch("http://195.181.210.249:3000/todo/" + id, {title: input.value}).then(() => {
            $list.innerHTML = "";
            addDataFromServer();
        }
    ); 
};

function removeButton() {
    const revButton = document.createElement("button");

    revButton.id.add = "remove-button";
    revButton.innerText = "remove";
    revButton.setAttribute("title", "To jest przycisk do usuwania.");
    revButton.classList.add("data-remove--new");
    revButton.style.setProperty( "background-color", "red");

    const container = document.querySelector("#list");
    container.appendChild(revButton);
    
};

document.addEventListener("DOMContentLoaded", main);