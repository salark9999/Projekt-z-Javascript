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

var editbutton = document.createElement("button");

editbutton.id.add = "edit-button";
editbutton.innerText = "Edit";
editbutton.setAttribute("title", "To jest przycisk do edycji");
editbutton.classList.add("edit");
editbutton.style.setProperty("background-color", "green");

var edit = document.getElementById("list");
edit.appendChild(editbutton);

var editInput = document.createElement("input");

editInput.id.add = "edInput";
editInput.placeholder = "Title...";
editInput.style.setProperty("background-color", "skyblue");

var input = document.getElementById("list");
input.appendChild(editInput);

var delButton = document.createElement("button");

delButton.id.add = "remove-button";
delButton.innerText = "remove";
delButton.setAttribute("title", "To jest przycisk do usuwania.");
delButton.classList.add("delete");
delButton.style.setProperty("background-color", "red");

var del = document.getElementById("list");
del.appendChild(delButton);

return newLi;

};

function listClickManager(event, id )/*( event- event.target ) */{ //rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
   if(event.target.className === "delete") {
       removeElement(event.target.id);
    } else if(event.target.className === "edit"){
        editListElement(id);
    };
};

function removeElement(id) { //usuwanie elementu
    axios.delete("http://195.181.210.249:3000/todo/" + id)
    .then(() => {
            $list.innerHTML = "";
            addDataFromServer();
        }
    ); 
};

function editListElement()  { // pobranie informacji na temat zadania// umieść dane w popupie
    axios.patch("http://195.181.210.249:3000/todo/", {title: edInput.value})
    .then(() => {
            $list.innerHTML = "";
            addDataFromServer();
        }
    ); 
};
document.addEventListener("DOMContentLoaded", main);