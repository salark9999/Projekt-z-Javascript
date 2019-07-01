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
    });
};

function addNewElementToList(title, id) {  //obsługa dodawania elementów do listy
    var newElement = createElement(title, id);

    $list.appendChild(newElement);
};

function createElement(title, id){ /*( Title, author, id ) {  // Tworzy reprezentacje DOM elementu return newElement }*/
var newLi = document.createElement("li");
newLi.id = id
newLi.innerText = title;

const editbutton = document.createElement("button");

editbutton.id.add = "edit-button";
editbutton.innerText = "Edit";
editbutton.setAttribute("title", "To jest przycisk do edycji");
editbutton.classList.add("data-edit--new");
editbutton.style.setProperty("background-color", "green");

const edit = document.getElementById("list");
edit.appendChild(editbutton);

const editInput = document.createElement("input");

editInput.id.add = "edit-input";
editInput.placeholder = "Title...";
editInput.style.setProperty("background-color", "skyblue");

const input = document.getElementById("list");
input.appendChild(editInput);

const delButton = document.createElement("button");

delButton.id.add = "remove-button";
delButton.innerText = "remove";
delButton.setAttribute("title", "To jest przycisk do usuwania.");
delButton.classList.add("data-remove--new");
delButton.style.setProperty("background-color", "red");

const del = document.getElementById("list");
del.appendChild(delButton);

return newLi;
};

function listClickManager(ev)  /*( event- event.target ) */{ //rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
    
    if (ev.target.className === "data-remove--new") {
        axios.delete("http://195.181.210.249:3000/todo/" + ).then(() => {
            $list.innerHTML = "";
            addDataFromServer();
        }); 
    };
};

/*function removeListElement(id) { //usuwanie elementu
    axios.delete("http://195.181.210.249:3000/todo/" + id).then(() => {
            $list.innerHTML = "";
            addDataFromServer();
        }
    ); 
};

function editListElement(id)  { // pobranie informacji na temat zadania// umieść dane w popupie
    axios.patch("http://195.181.210.249:3000/todo/" + id, {title: input.value}).then(() => {
            $list.innerHTML = "";
            addDataFromServer();
        }
    ); 
};*/
document.addEventListener("DOMContentLoaded", main);