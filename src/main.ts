import "./style.css";
interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = [];

const todoContainer = document.querySelector(
  ".todo_Container"
) as HTMLDivElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myForm = document.getElementById("myform") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 100),
  };
  todos.push(todo);
  todoInput.value = "";
  console.log(todos);
  renderTodo(todos);
};


const deleteTodo=(id:string)=>{
   const idx=todos.findIndex(item=>item.id===id);
   todos.splice(idx,1);
   renderTodo(todos);
}

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange=()=>{
    paragraph.className=checkBox.checked?"textCut":""
    todos.find(item=>{
        if(item.id===id){
            item.isCompleted=checkBox.checked
        }
    })
  }
  /**--Creating P for title */
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className=isCompleted?"textCut":"";
  /***-------DELETE BUTTON----------- */
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerHTML = "X";
  btn.className = "deleteBtn";
  btn.onclick=()=>deleteTodo(id);

  /***----------------Appending All todo Item */
  todo.append(checkBox, paragraph, btn);
  todoContainer.append(todo);
};

const renderTodo = (todo: Todo[]) => {
  todoContainer.innerText="";
  todo.forEach((item) => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  });
};
