let body = document.getElementById("bodyEl");
let startBtn = document.getElementById('startBtn');
let resetBtn = document.getElementById('resetBtn');
let timerWork = document.getElementById("timerWork");
let userWorkTime = document.getElementById('userWorkTime');
let userShortTime = document.getElementById('userShortTime');
let userLongTime = document.getElementById('userLongTime');
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.closeModal');
let buttons = document.querySelectorAll('button');
let settingsBtn = document.getElementById('settingsBtn');
let addTask = document.getElementById("addTaskBtn");
let toDoItem = document.getElementById("toDoItem");
let wrapperToDo = document.querySelector(".toDo__edit-task");
let taskText = document.querySelector(".task_text");
let toDo = document.getElementById("toDo");

let timeWork = (userWorkTime.value * 60);
let isPaused = true;
let countingTimerWork;
let countingShortBreak;
let countingLongBreak;
let countingMiddleBreak;

function soundPlay() {
    const audio = new Audio();
    audio.src = './mp3/sound.mp3';
    audio.autoplay = true;
};

function clearAllIntervals() {
    clearInterval(countingTimerWork);
    clearInterval(countingShortBreak);
    clearInterval(countingLongBreak);
    clearInterval(countingMiddleBreak);
};

settingsBtn.addEventListener("click", (ev) => {
    modal.classList.remove('hidden_el');
});

modal.addEventListener("click", (ev) => {
    if (ev.target.classList.contains("modal")) {
        modal.classList.add("hidden_el");
    };
});

closeModal.addEventListener("click", (ev) => {
    modal.classList.add('hidden_el');
    if (ev) {
        let a = userWorkTime.value * 60;// 0.1
        let m = Math.floor(a / 60);
        let s = a % 60;
        s = s < 10 ? timerWork.innerHTML = `${m}:0${s}` : timerWork.innerHTML = `${m}:${s}`;
        return (timeWork = userWorkTime.value * 60);
    };
});

buttons.forEach(el => {
    el.addEventListener("click", (ev) => {
        el.classList.toggle("active_btn");
    });
});

function startTimer() {
    isPaused = !isPaused;
    if (!isPaused) {
        countingTimerWork = setInterval(updateTimerWork, 1000);
        startBtn.innerText = 'Pause';
    } else if (isPaused) {
        startBtn.innerText = 'Start';
        clearAllIntervals();
    };
};

startBtn.addEventListener("click", (ev) => {
    startTimer();
});

function countDown() {
    let min = Math.floor(timeWork/60);
    let sec = timeWork % 60; 
    if (timeWork >= 0) {
        sec = sec < 10 ? timerWork.innerHTML = `${min}:0${sec}` : timerWork.innerHTML = `${min}:${sec}`;
        timeWork--;
    };
};

function updateTimerWork() {
    countDown();
    if (timeWork < 0) {
        clearInterval(countingTimerWork);
        timeWork = (userShortTime.value * 60);
        soundPlay();
        countingShortBreak = setInterval(updateShortBreak, 1000);
        body.className = "";
        body.classList.add("color_short");
    };
};

function updateShortBreak() {
    countDown();
    if (timeWork < 0) {
        clearInterval(countingShortBreak);
        timeWork = (userWorkTime.value * 60);
        soundPlay();
        countingLongBreak = setInterval(updateWork, 1000);
        body.className = "";
        body.classList.add("color_work");
    };
};

function updateWork() {
    countDown();
    if (timeWork < 0) {
        clearInterval(countingLongBreak);
        timeWork = (userLongTime.value *60);
        soundPlay();
        countingMiddleBreak = setInterval(updateMiddleBreak, 1000);
        body.className = "";
        body.classList.add("color_long");
    };
};

function updateMiddleBreak () {
    countDown();
    if (timeWork < 0) {
        clearInterval(countingMiddleBreak);
        timeWork = (userWorkTime.value *60);
        soundPlay();
        countingTimerWork = setInterval(updateTimerWork, 1000);
        body.className = "";
        body.classList.add("color_work");
    };
};

resetBtn.addEventListener("click", (ev) => {
    clearAllIntervals();
    timeWork = (userWorkTime.value * 60);
    timerWork.innerHTML = `${userWorkTime.value}:00`;
    if (resetBtn.classList.contains ("active_btn")) {
        resetBtn.classList.remove("active_btn");
        startBtn.classList.remove("active_btn");
        startBtn.innerText = 'Start';
    };
    if (!isPaused) {
        startTimer();
    };
});

let valueInput = toDoItem.addEventListener("input", (e) => {
    valueInput = e.target.value;
});

addTask.addEventListener("click", (ev) => {
    if (valueInput === undefined) {
        return valueInput = "";
    };
    
    let toDoList = document.createElement("div");
    toDoList.className = 'toDoList';

    let btnCheck = document.createElement("button"); 
    btnCheck.id = 'checkBtn';
    toDoList.appendChild(btnCheck);

    let btnEdit = document.createElement("button"); 
    btnEdit.id = 'editBtn';
    toDoList.appendChild(btnEdit);

    let btnDel = document.createElement("button"); 
    btnDel.id = 'delBtn';
    toDoList.appendChild(btnDel);

    let parTask = document.createElement("p");
    parTask.innerText = valueInput;
    parTask.id = 'parTask';

    toDoList.appendChild(btnCheck);
    toDoList.appendChild(parTask);
    toDoList.appendChild(btnEdit);
    toDoList.appendChild(btnDel);
    wrapperToDo.appendChild(toDoList);

    btnCheck.addEventListener("click", (ev) => {
        parTask.classList.toggle("check-task");
        toDoList.classList.toggle("check-task");
    });

    btnEdit.addEventListener("click", (ev) => {
        parTask.setAttribute("contenteditable", true);
        parTask.focus();
    });

    btnDel.addEventListener("click", (ev) => {
        toDoList.style.display = "none";
    });

    document.getElementById("toDoItem").value = "";
    arrToDoList();
});

toDo.addEventListener('keyup', event => {
    if(event.code === 'Enter'){
        addTask.click();
    };
});

function arrToDoList() {
    let arrToDo = document.querySelectorAll(".toDoList");
    for (let i = 0; i < arrToDo.length; i++) {
        arrToDo[i].addEventListener("click", (ev) => {
            taskText.innerHTML = arrToDo[i].children[1].textContent;
        });
    };
};
