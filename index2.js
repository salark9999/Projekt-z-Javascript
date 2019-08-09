var $addBtn;
var $list;
var $myInput;
var todoDiv;
var delButton;
var editbutton;
var removeToDoBtn;
var editToDoBtn;
var editToDoInput;
var editInputValue;
var currentTaskId;
var cancelBtn;
var submitButton;
var statusButton;
var statusBtn;


function main() {  //odpalenie funkcji początkowych
    prepareDOMElements();
    addDataFromServer();
    prepareDOMEvents();
    
    
};

function prepareDOMElements() {  //wyszukiwanie elementów w drzewie DOM
    $addBtn = document.getElementById("addTodo");
    $list = document.getElementById("list");
    $myInput = document.getElementById("myInput");
    removeToDoBtn = document.querySelector(".delete");
    editToDoBtn = document.querySelector(".edit");
    editToDoInput = document.querySelector("#exampleFormControlTextarea2");
    submitButton = document.querySelector(".apply");
    cancelBtn = document.querySelector(".cancel");
    statusBtn = document.querySelector(".status");
};

function prepareDOMEvents() {   //nasłuchiwanie elementów / przygotowanie Listenerów
    $addBtn.addEventListener("click", addButtonClickHandler);
    $list.addEventListener("click", listClickManager);
    submitButton.addEventListener("click", submitToDo);
    cancelBtn.addEventListener("click", closeForm);
    statusBtn.addEventListener("click", changeStatus);
};

function listClickManager(ev)/*( event- event.target ) */{ //rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
    if(ev.target.classList.contains("delete")) {
        removeElement(ev.target.parentElement.id);
     } else if(ev.target.classList.contains("edit")) {
         editListElement(ev.target.parentElement.id);
     } else if (ev.target.classList.contains("status")) {
         changeStatus(ev.target.parentElement.id);
     };
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
    var todoDiv = document.createElement("div");
    var newLi = document.createElement("div");
    var buttonsDiv = document.createElement("div");
    var editbutton = document.createElement("button");
    var delButton = document.createElement("button");
    var statusButton = document.createElement("button");

    todoDiv.id = id;
    todoDiv.classList.add("toDoDiv");
    todoDiv.setAttribute("title", "It is a new request");

    newLi.classList.add = "newli";
    newLi.innerHTML = title;
    todoDiv.appendChild(newLi);

    buttonsDiv.id = id;
    buttonsDiv.classList.add = "buttons";;
    todoDiv.appendChild(buttonsDiv);

    editbutton.id.add = "edit-button";
    editbutton.innerText = "Edit";
    editbutton.setAttribute("title", "To jest przycisk do edycji");
    editbutton.classList.add("buttons", "edit");
    editbutton.style.setProperty("background-color", "green");
    buttonsDiv.appendChild(editbutton);

    delButton.id.add = "remove-button";
    delButton.innerText = "Delete";
    delButton.setAttribute("title", "To jest przycisk do usuwania.");
    delButton.classList.add("buttons", "delete");
    delButton.style.setProperty("background-color", "red");
    buttonsDiv.appendChild(delButton);

    statusButton.id.add = "done";
    statusButton.classList.add("buttons", "status");
    statusButton.innerHTML = "Done";
    statusButton.setAttribute("title", "To jest przycisk do oznaczenia wykonanego zadania." );
    buttonsDiv.appendChild(statusButton);

    return todoDiv;

};

function editListElement(id, title)  { // pobranie informacji na temat zadania// umieszczenie danych w popupie
    currentTaskId = id;
    axios.get("http://195.181.210.249:3000/todo/" + id, title)
    .then(function(response) {
        console.log(response);
        editToDoInput.value = response.data[0].title;
        openForm();
        }
    ); 
};

function submitToDo() {
    axios.put("http://195.181.210.249:3000/todo/" + currentTaskId, {
        title: editToDoInput.value
    }).then(() => {
            $list.innerHTML = ""; 
            addDataFromServer();
            closeForm();
        }
    )
};

function removeElement(id) {     // USUWANIE ELEMENTU
    axios.delete("http://195.181.210.249:3000/todo/" + id)
    .then(() => {
            $list.innerHTML = ""; 
            addDataFromServer();
        }
    ) 
};

function changeStatus(id, title) {  // ZMIANA STATUSU ELEMENTU NA 'DONE'
   
    document.getElementById(id).style.textDecoration = 'line-through';
    axios.post("http://195.181.210.249:3000/todo/" + id, title ,{  
        title: newElement.value
            }).then(() => {
            $list.innerHTML = ""; 
            addDataFromServer();
        }
    )
};

function openForm() {           // OTWIERANIE POPUP"u

    document.getElementById("myForm").style.display = "block";
};


function closeForm() {          // ZAMYKANIE POPUP"u

    document.getElementById("myForm").style.display = "none";
};

document.addEventListener("DOMContentLoaded", main);