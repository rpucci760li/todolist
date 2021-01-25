// selecteurs 
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// écouteurs
// J'ajoute un écouteur pour le locale storage 
document.addEventListener("DOMContentLoaded", getTodos);
// Écouteur pour ajouter un Todo
todoButton.addEventListener("click", addTodo);
// J'ajoute un écouteur 
todoList.addEventListener("click", deleteCheck);
// J'ajoute l'écouteur pour l'option de filtrage 
filterOption.addEventListener("input", filterTodo);


// fonctions
function addTodo(event) {
    // Pour éviter que le button ne recharge la page, on mets 
    // un preventDefault
    event.preventDefault();
    // Je veux créer une DIV quand je clique sur le bouton 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Créer le LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Ajouter la todo au localeStorage 
    saveLocaleTodos(todoInput.value);
    // Bouton Check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Bouton Supprimer
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Ajouter notre todo à la todo-list
    todoList.appendChild(todoDiv);
    // Pour réinitialiser l'emplacement d'ajout de Todo 
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // Bouton Poubelle 
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.classList.add("fall");
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }
    // Bouton validé 
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

// Je crée une nouvelle fonction pour le filtrage 
function filterTodo(e) {
    const todos = todoList.childNodes;
    // Je crée un forEach pour récupérer l'information 
    todos.forEach(function (todo) {
        switch (e.target.value) {
            // Dans le cas de ALL(Toutes)   
            case ("all"):
                // Je les affiches en display
                todo.style.display = "flex";
                break;
            // Dans le cas complété
            case "completed":
                // Si il contient complété
                if (todo.classList.contains("completed")) {
                    // Je l'affiche en flex 
                    todo.style.display = "flex";
                    // Sinon 
                } else {
                    // Je ne l'affiche pas 
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                // J'ajoute ! pour lui faire comprendre de faire apparaitre 
                // tout ce qui ne posséde pas uncompleted 
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}
// Je vais stocker les Items de la TodoList pour éviter un effacement 
function saveLocaleTodos(todo) {
    // Checker si il y à des items existants 
    let todos;
    // Si ce tableau TODOS est vide 
    // GET ITEMS est un méthode 
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        // Sinon, nous récupérons les ITEMS de "TODOS"
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // Ensuite nous ajoutons un élément
    todos.push(todo);
    // JSON.stringify nous permets d'afficher le contenu de la TODOS
    localStorage.setItem("todos", JSON.stringify(todos));
}
// La fonction Locale Storage fonctionne 
// Je dois afficher les éléments qu'elle contient 
// Je copie tout simplement le code de la FUNCTION saveLocaleTodos 
// Je retire le push et setItem
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // J'appelle la variable TODOS et j'ajoute un forEach
    todos.forEach(function (todo) {
        // Je copie-colle la fonction de création d'une todoDIV
        // Voir plus haut 
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        // TODOINPUT.VALUE devient todo 
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //  je n'ai plus besoin d'appeler le saveLocaleTodos(todoInput.value);
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    });
}

// Je dois maintenant conserver les TODOS supprimées
function removeLocalTodos(todo) {
    // On reprends les mêmes paramêtres que que la function GETTODOS
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // Je veux récupérer l'index de l'élément 
    // Je crée une constante
    const todoIndex = todo.children[0].innerText;
    //  Pour savoir quoi supprimer, je cherche avec la console.log(todos.indexOf(todo.children[0].innerText));
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}