const { log, dir } = console;

(() => {
    log("To Do List JS Loaded!", new Date(Date.now()));

    interface ToDo {
        text: string;
        done: boolean;
    }

    // TypeAssertion - You can use the as keyword to assert a type to a variable
    const form = document.querySelector(".ts-form") as HTMLFormElement;
    // 'non-null assertion operator' (!) - This operator tells TypeScript that the value will not be null or undefined
    const button = form.querySelector(".ts-button")! as HTMLButtonElement;
    const input = form.querySelector(".ts-input") as HTMLInputElement;
    const list = document.querySelector(".ts-list") as HTMLUListElement;

    /**
     * @description Read todos from localStorage
     * @returns {void}
     */

    const readTodos = (): ToDo[] => {
        return localStorage.getItem("todos") && JSON.parse(localStorage.getItem("todos")!);
    };

    const todos: ToDo[] = readTodos() || [];

    const createTodo = (todo: ToDo) => {
      const newListItem = document.createElement("li") as HTMLLIElement;
      const checkbox = document.createElement("input") as HTMLInputElement;
      checkbox.type = "checkbox";
      checkbox.addEventListener("change", () => {
          todo.done = !todo.done;
          localStorage.setItem("todos", JSON.stringify(todos));
      });
      checkbox.checked = todo.done;
      newListItem.append(todo.text);
      newListItem.append(checkbox);
      list?.append(newListItem);
  };

    todos.forEach((todo) => createTodo(todo));

    // TypeGuard - You can use the instanceof keyword to check if a variable is of a certain type
    if (button instanceof HTMLButtonElement) button.innerText = "Click Me!";

    /**
     * @description Create todos from localStorage
     * @returns {void}
     * @param event
     * @returns
     */

    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        const value = input.value;
        // GuardClause - You can use the return keyword to exit a function early
        if (!value) return;
        const newTodo: ToDo = {
            text: value,
            done: false,
        };
        todos.push(newTodo);
        createTodo(newTodo);
        localStorage.setItem("todos", JSON.stringify(todos));
        input.value = "";
    };



    // ? - You can use the ? operator to check if a variable is null or undefined
    form?.addEventListener("submit", handleSubmit);
})();
