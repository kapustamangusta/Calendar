const calendar = $(".calendar"),
    date = $(".date"),
    daysContainer = $(".days"),
    next = $(".next"),
    prev = $(".prev"),
    todayBtn = $(".today-btn"),
    gotoBtn = $(".goto-btn"),
    dateInput = $('.date-input'),
    eventsContainer = document.querySelector(".events"),
    addEventSubmit = $('.add-event-btn')

const addEventBtn = $('.add-event'),
    addEventContainer = $('.add-event-wrapper'),
    addEventCloseBtn = $('.add-event-wrapper .close'),
    addEventTitle = $('.add-event-wrapper .event-name'),
    addEventFrom = $('.add-event-wrapper .event-time-from'),
    addEventTo = $('.add-event-wrapper .event-time-to'),
    addEventCategory = $('.add-event-wrapper .event-categ'),
    addEventDesc = $('.add-event-wrapper .event-description');

const updateEventBtn = $('.event-update-delete-wrapper .update-event'),
    deleteEventBtn = $('.event-update-delete-wrapper .remove-event'),
    upDelEventContainer = $('.event-update-delete-wrapper '),
    upDelEventCloseBtn = $('.event-update-delete-wrapper .close'),
    upDelEventTitle = $('.event-update-delete-wrapper .event-name'),
    upDelEventFrom = $('.event-update-delete-wrapper .event-time-from'),
    upDelEventTo = $('.event-update-delete-wrapper .event-time-to'),
    upDelEventCategory = $('.event-update-delete-wrapper .event-categ'),
    upDelEventDesc = $('.event-update-delete-wrapper .event-description'),
    upDelEventContainerTitle = $('.event-update-delete-wrapper .title')
    

let today = new Date();
let activeDay = today.getDay();
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
];

const eventsArr = [
    {
        day: 9,
        month: 5,
        year: 2023,
        events: [
            {
                title: "Event 1",
                time: "10:00 - 11:00",
                category: "Покупки",
                desc: "Батон, молоко, сыр, лук"
            },
            {
                title: "Event 2",
                time: "11:00 - 12:00",
                category: "Финансы",
                desc: "Не забыть оформить кредит"
            }
        ],
    },
    {
        day: 13,
        month: 5,
        year: 2023,
        events: [
            {
                title: "Event 1",
                time: "10:00 - 23:00",
                category: "Образование",
                desc: ""
            },
           
        ],
    },
];

function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    var data = {
        'month': month+1,
        'year': year
    };

    var jsonData = JSON.stringify(data);
    var eventsArray;
    $.ajax({
        type: "POST",
        url: '/Event/Calendar/' + jsonData,
        dataType: "json",
        contentType: 'application/json',
        async: false,
        //data: JSON.stringify({ txt: jsonData }),
        success: function (resp) {
            eventsArray=resp;      
        }
    });
   
    date.html(months[month] + " " + year);

    let days = "";
    //дни прошлого месяца
    for (let x = day; x > 0; x--) {
        days += `<div class ="day prev-date">${prevDays-x+1}</div>`
    }
    //дни текущего месяца
    for (let i = 1; i <= lastDate; i++) {
        let event = false;
        eventsArray.events.forEach((eventObj) => {
            if (eventObj.day === i) {
                event = true;
            }
        })
        if (i === new Date().getDate() && year === new Date().getFullYear() && month == new Date().getMonth()) {
            if (event) {
                
                days += `<div class ="day today event">${i}</div>`
            }
            else {
                days += `<div class ="day today">${i}</div>`
            }
        }
        else {
            if (event) {
                days += `<div class ="day event">${i}</div>`
            }
            else {
                days += `<div class ="day">${i}</div>`
            }
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class ="day next-date">${j}</div>`
    }

    daysContainer.html(days);
    addListener();
}

function initCategory() {
    var allCategories;
    $.ajax({
        type: "POST",
        url: '/Event/AllCategories/',
        dataType: "json",
        contentType: 'application/json',
        async: false,
        //data: JSON.stringify({ txt: jsonData }),
        success: function (resp) {
            allCategories = resp;
        }
    });

    var options = "";
    allCategories.forEach((category) => {
        if (allCategories.indexOf(category) === 0) {
            options += `<option value="${category.name}" selected>${category.name}</option>`;
        }
        else {
            options += `<option value="${category.name}">${category.name}</option>`;
        }

    });

    addEventCategory.html(options);
    upDelEventCategory.html(options);
}

initCalendar();
initCategory();

var prevMonth = function() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

var nextMonth = function() {
    month++;
    if (month > 11) {
        month = 0;
        year++;;
    }
    initCalendar();
}

prev.on('click', prevMonth);
next.on('click', nextMonth);

todayBtn.on('click', () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.on('input', (e) => {
    console.log("input");
    dateInput.val(dateInput.val().replace(/[^0-9/]/g, ""));
    if (dateInput.val().length === 2) {
        dateInput.val(dateInput.val()+"/");
    }
    if (dateInput.val().length > 7) {
        dateInput.val(dateInput.val().slice(0, 7));
    }
    if (e.inputType === 'deleteContentBackward') {
        if (dateInput.val().length === 3) {
            dateInput.val(dateInput.val().slice(0, 2));
        }
    }
});



var gotoDate = function(){
    console.log("click")
    const dateArr = dateInput.val().split("/");
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("Invalid Date");
}
gotoBtn.on('click', gotoDate);








addEventBtn.on("click", () => {
    if (addEventContainer.hasClass('active')) {
        addEventContainer.removeClass('active');
    } else {
        addEventContainer.addClass('active');
    }

});

addEventCloseBtn.on("click", () => {
    addEventContainer.removeClass('active');
});

upDelEventCloseBtn.on('click', ()=>{
    upDelEventContainer.removeClass('active');
})

addEventTitle.on('input', (e) => {
    addEventTitle.val(addEventTitle.val().slice(0, 50));
});

addEventFrom.on('input', (e) => {
    addEventFrom.val(addEventFrom.val().replace(/[^0-9:]/g, ''));
    if (addEventFrom.val().length === 2) {
        addEventFrom.val(addEventFrom.val() + ":");
    }
    if (addEventFrom.val().length > 5) {
        addEventFrom.val(addEventFrom.val().slice(0, 5));
    }
});

addEventTo.on('input', (e) => {
    addEventTo.val(addEventTo.val().replace(/[^0-9:]/g, ''));
    if (addEventTo.val().length === 2) {
        addEventTo.val(addEventTo.val() + ":");
    }
    if (addEventTo.val().length > 5) {
        addEventTo.val(addEventTo.val().slice(0, 5));
    }
});



function addListener() {
    const days = document.querySelectorAll('.day');
    days.forEach((day) => {
        
        day.addEventListener('click', (e) => {
            activeDay = Number(e.target.innerHTML);

            //getActiveday(e.target.innerHTML)

            days.forEach((day) => {
                day.classList.remove('active');
            });


            if (e.target.classList.contains('prev-date')) {
                prevMonth();

                setTimeout(() => {

                    const days = document.querySelectorAll('.day');

                    days.forEach((day) => {
                        if (!day.classList.contains('prev-date') && day.innerHTML === e.target.innerHTML) {
                            day.classList.add('active')
                        }
                    });
                }, 100);
            } else if (e.target.classList.contains('next-date')) {
                nextMonth();

                setTimeout(() => {

                    const days = document.querySelectorAll('.day');

                    days.forEach((day) => {
                        if (!day.classList.contains('next-date') && day.innerHTML === e.target.innerHTML) {
                            day.classList.add('active')
                        }
                    });
                }, 100);
            } else {
                e.target.classList.add('active');
            }
            getActiveday(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML))
        });
    });
}

const eventDay = $('.event-day'),
eventDate = $('.event-date')
function getActiveday(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.html(dayName);
    eventDate.html(date + " " + months[month] + " " + year);
}


function updateEvents(date) {
    var data = {
        'day': date,
        'month': month + 1,
        'year': year
    };

    var jsonData = JSON.stringify(data);
    var eventsArray;
    $.ajax({
        type: "POST",
        url: '/Event/UpdateEvents/' + jsonData,
        dataType: "json",
        contentType: 'application/json',
        async: false,
        //data: JSON.stringify({ txt: jsonData }),
        success: function (resp) {
            eventsArray = resp;
        }
    });


    let events = "";
    eventsArray.events.forEach((event) => {
        var time = event.from + ' - ' + event.to;
        events += `<div style ="background: linear-gradient(90deg, ${event.categor.color}, transparent);" class="event">
                        <div style ="display: none" class ='id'>${event.id}</div>
                        <div class="title">
                            <i class="fa fa-circle"></i>
                            <div>
                                <h3 class="event-title">${event.title}</h3>
                                <div class="event-category">${event.categor.name}</div>
                            </div>
                        </div>
                        <div class="event-desc">${event.description}</div>
                        <div class="event-time">
                            ${time}
                        </div>
                    </div>`;
    });
    if (events === "") {
        events = `<div class="no-event">
                    <h3> No Events</h3>
                </div>`;
    }
    eventsContainer.innerHTML=events;
}


addEventSubmit.on('click', () => {
    const eventTitle = addEventTitle.val();
    const eventTimeFrom = addEventFrom.val();
    const eventTimeTo = addEventTo.val();
    const eventCategory = addEventCategory.val();
    const eventDescription = addEventDesc.val();
    
    if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === '' || eventCategory === '') {
        alert("Пожалуйста заполните все поля!");
        return
    }

    const timeFromArr = eventTimeFrom.split(':');
    const timeToArr = eventTimeTo.split(":");

    if (
        timeFromArr.length !== 2 || timeToArr.length !== 2 ||
        timeFromArr[0] > 23 || timeFromArr[1] > 59 ||
        timeToArr[0] > 23 || timeToArr[1] > 59 ||
        timeToArr[0] < timeFromArr[0]  ||
        (timeToArr[0] === timeFromArr[0] && timeToArr[1] <= timeFromArr[1])
    ) {
        alert('Invalid Time Format!');
        return;
    }

    const newEvent = {
        title: eventTitle,
        from: eventTimeFrom,
        to: eventTimeTo,
        description: eventDescription,
        categor: {
            name: eventCategory
        },
        day: activeDay,
        month: month + 1,
        year: year
    };
    var jsonData = JSON.stringify(newEvent);
    $.ajax({
        type: "POST",
        url: '/Event/AddEvent/' + jsonData,
        dataType: "json",
        contentType: 'application/json',
        async: false,
        //data: JSON.stringify({ txt: jsonData }),
        success: function (resp) {
            addEventContainer.removeClass("active");
            addEventTitle.val("");
            addEventFrom.val("");
            addEventTo.val("");
            addEventDesc.val("")

            updateEvents(activeDay);

            const activeDayElem = $('.day.active')
            if (!activeDayElem.hasClass("event")) {
                activeDayElem.addClass('event')
            }
        },
        error: function (data) {
            alert("Не удалось добавить событие!");
        }

    });
});

var eventId;
eventsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("event")) {
        upDelEventContainer.addClass("active");

        const eventTitle = e.target.children[1].children[1].children[0].innerHTML;
        upDelEventContainerTitle.html(eventTitle)
        eventId= e.target.children[0].innerHTML;


        var jsonData = JSON.stringify(eventId);
        $.ajax({
            type: "POST",
            url: '/Event/GetEvent/' + jsonData,
            dataType: "json",
            contentType: 'application/json',
            async: false,
            //data: JSON.stringify({ txt: jsonData }),
            success: function (resp) {
                upDelEventFrom.val(resp.from);
                upDelEventTo.val(resp.to);
                upDelEventCategory.val(resp.categor.name);
                upDelEventDesc.val(resp.description);
            }
        });
    }
    updateEvents(activeDay);
});


updateEventBtn.on('click', () => {
    const eventTitle = upDelEventContainerTitle.html();

    const updatingEvent = {
        id: eventId,
        title: eventTitle,
        from: upDelEventFrom.val(),
        to: upDelEventTo.val(),
        description: upDelEventDesc.val(),
        categor: {
            name: upDelEventCategory.val(),
        }
    };

    var jsonData = JSON.stringify(updatingEvent);
    $.ajax({
        type: "POST",
        url: '/Event/UpdateEvent/' + jsonData,
        dataType: "json",
        contentType: 'application/json',
        async: false,
        //data: JSON.stringify({ txt: jsonData }),
        success: function (resp) {
           
        },
        error: function (data) {
            alert("Не удалось обноваить событие!");
        }

    });
    upDelEventContainer.removeClass("active");
    updateEvents(activeDay);
});

deleteEventBtn.on('click', () => {
    if (confirm('Вы уверены, что хотите удлить событие?')) {
        var jsonData = JSON.stringify(eventId);
        $.ajax({
            type: "POST",
            url: '/Event/DeleteEvent/' + jsonData,
            dataType: "json",
            contentType: 'application/json',
            async: false,
            //data: JSON.stringify({ txt: jsonData }),
            success: function (resp) {

            },
            error: function (data) {
                alert("Не удалось обноваить событие!");
            }
        });

        var data = {
            'day': activeDay,
            'month': month + 1,
            'year': year
        };

        jsonData = JSON.stringify(data);
        var eventsArray;
        $.ajax({
            type: "POST",
            url: '/Event/UpdateEvents/' + jsonData,
            dataType: "json",
            contentType: 'application/json',
            async: false,
            //data: JSON.stringify({ txt: jsonData }),
            success: function (resp) {
                eventsArray = resp;
                if (eventArray.events.length === 0) {
                    const activeDayEl = $('.day.active');
                    if (activeDayEl.hasClass('event')) {
                        activeDayEl.removeClass('event');
                    }
                }
            }
        });
        upDelEventContainer.removeClass("active");
        updateEvents(activeDay);
    }
});

