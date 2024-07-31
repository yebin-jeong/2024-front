// calendar.js

$(document).ready(function() {
    const todosByDate = {};

    // Initialize the calendar
    $('#calendar').fullCalendar({
        dayClick: function(date) {
            $('#todo-section').show();
            $('#selected-date').text(date.format('YYYY-MM-DD'));
            loadTodos(date.format('YYYY-MM-DD'));
        },
        eventRender: function(event, element) {
            element.css('background-color', 'transparent');
            element.find('.fc-title').remove();

            const date = event.start.format('YYYY-MM-DD');
            const categories = {};
            todosByDate[date]?.forEach(todo => {
                categories[todo.category] = true;
            });

            const dotsContainer = $('<div class="dots-container"></div>');
            Object.keys(categories).forEach(category => {
                dotsContainer.append('<span class="category-dot ' + category + '"></span>');
            });

            element.append(dotsContainer);
        }
    });

    // Update the calendar with events
    function updateCalendar() {
        $('#calendar').fullCalendar('removeEvents');
        Object.keys(todosByDate).forEach(date => {
            $('#calendar').fullCalendar('renderEvent', {
                title: '',
                start: date,
                allDay: true
            });
        });
    }

    // Expose updateCalendar to other scripts
    window.updateCalendar = updateCalendar;

    // Expose todosByDate to other scripts
    window.todosByDate = todosByDate;
});
