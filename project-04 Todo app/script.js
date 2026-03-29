const input = document.getElementById("todo-input")
const addBtn = document.getElementById("add-btn")
const List = document.getElementById("todo-list")

    // try to load saved todos from localstorage(if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : []; 

function saveTodos(){
    //save current todos array to localstorage
    localStorage.setItem('todos' , JSON.stringify(todos))            

}
//  create a dom node for a todo object and append it to the list
function createTodoNode(todo , index){
    const  li = document.createElement("li")
    li.classList.add("li")
    li.style.listStyle = "none"
    li.style.display = "flex"
    li.style.textAlign = "center"
    li.style.justifyContent ="space-between" ;
//  checkbox to toggle completion
const checkbox = document.createElement("input");
//  My line
checkbox.classList.add("checkbox")

checkbox.type = 'checkbox';
checkbox.checked = !!todo.completed;
checkbox.addEventListener("change", ()=>{
    todo.completed = checkbox.checked;

    // visual feedback: strike-through when completed
   textSpan.style.textDecoration = todo.completed ?  'line-through' : "";
    saveTodos();
}) 

// text of the todo
const textSpan = document.createElement("span");
textSpan.textContent = todo.text;
textSpan.style.margin = '0 8px';
        if(todo.completed){
            textSpan.style.textDecoration = 'line-through';
             }

            // add double click listener (to edit todo)
    textSpan.addEventListener("dblclick", ()=>{
        const newText = prompt("Edit todo", todo.text);
        if(newText !== null){
            todo.text = newText.trim()
            textSpan.textContent = todo.text;
            
            saveTodos();
            }
        })
        textSpan.addEventListener("mouseover", ()=>{
            textSpan.style.cursor = "pointer"
        })
        //  delete todo button
        const delBtn = document.createElement('button');
        delBtn.classList.add("delete-btn")
        delBtn.textContent = "Delete"; 
        delBtn.style.height = "35px"
        delBtn.style.width = "70px"
        delBtn.style.fontSize = "20px"
        delBtn.style.backgroundColor = "#f39f8c"
        // delBtn.style.border = "2px solid red"
        delBtn.style.borderRadius = "5px "
        delBtn.style.marginLeft = "35px "
        delBtn.style.border = "none "
        
        // delBtn.style.boxShadow = "0 0 5px red "

        delBtn.addEventListener('click', ()=>{
            todos.splice(index,1)
            render();
            saveTodos();
        })

        li.appendChild(checkbox)
        li.appendChild(textSpan)
        li.appendChild(delBtn)
        return li

       
}


//  Render the whole todo list from todos array
function render(){
    List.innerHTML = '';

    // recreate each item
    todos.forEach((todo,index)=>{
        const node = createTodoNode(todo,index);
        // console.log(node,todo);
        
        List.appendChild(node)        
    })
}

function addTodo(){
    const text = input.value.trim();
    if(!text){
        return 
    }
    // push a new todo object
    todos.push({text , completed: false});
    input.value = '';
    render()
    saveTodos()
}

addBtn.addEventListener("click" , addTodo);
render()

