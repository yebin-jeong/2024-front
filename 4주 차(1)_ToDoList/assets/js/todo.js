
$(document).ready(function() {
    const form = $('#todo-form');
    const input = $('#todo-input');
    const list = $('#todo-list');
    const categorySelect = $('#category-select');

    form.on('submit', function(e) {
        e.preventDefault();
        const todoText = input.val();
        const category = categorySelect.val();
        const date = $('#selected-date').text();
        addTodoToList(todoText, category, date);
        input.val('');
    });

    function addTodoToList(todoText, category, date) {
        const li = $('<li></li>').text(todoText).addClass(category);
        const button = $('<button></button>').text('삭제').on('click', function() {
            li.remove();
            saveTodosToLocalStorage(date);
            updateCalendar();
        });
        li.append(button);
        list.append(li);
        saveTodosToLocalStorage(date);
        updateCalendar();
    }

    function loadTodos(date) {
        list.empty();
        const todos = getTodosFromLocalStorage(date);
        todos.forEach(todo => {
            addTodoToList(todo.text, todo.category, date);
        });
    }

    function saveTodosToLocalStorage(date) {
        const todos = [];
        $('#todo-list li').each(function() {
            const todoText = $(this).contents().get(0).nodeValue;
            const category = $(this).attr('class');
            todos.push({ text: todoText, category: category });
        });
        localStorage.setItem(date, JSON.stringify(todos));
        window.todosByDate[date] = todos; 
    }


    function getTodosFromLocalStorage(date) {
        const todos = localStorage.getItem(date);
        return todos ? JSON.parse(todos) : [];
    }

    window.loadTodos = loadTodos; 
});
