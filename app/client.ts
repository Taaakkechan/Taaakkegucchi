function requireElementById(id: string) {
	const element = document.getElementById(id);
	if (!element) {
		throw new Error(`Could not find element with id ${id}`);
	}
	return element;
}
function getButton(id: string): HTMLButtonElement {
	return requireElementById(id) as HTMLButtonElement;
}
function getDiv(id: string): HTMLDivElement {
	return requireElementById(id) as HTMLDivElement;
}
function getInput(id: string): HTMLInputElement {
	return requireElementById(id) as HTMLInputElement;
}

const bakaButton = getButton('baka');
const enterButton = getButton('enter');
const deleteButton = getButton('delete');
const submitButton = getButton('submit');
const cancelEditButton = getButton('cancelEdit');
const cancelNewButton = getButton('cancelNew')

const dateInput = getInput('dateInput');
const timeInput = getInput('timeInput')
const nameInput = getInput('nameInput');
const tasksListContainer = getInput('tasksList');

const newItemForm = getDiv('newItemForm');
const tasksList = getDiv('tasksList');
const editWindow = getDiv('editWindow');
const hungerBar = getDiv('hungerBar');
const pet = getDiv('pet');
const hungerMeter = getDiv('hungerMeter');
const loveMeter = getDiv('loveMeter')

const state = {
	tasks: [] as Task[],
	taskIndex: 0,
	editing: false,
	pet: {
		love: 0,
		health: 4,
		hunger: 1000,
		size: 200,
		alive: true,
	}
};
const fps = 50;
const sec = 1;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

const petDef = {
	maxHealth: 4,
	minusLove: 10,
	plusLove: 2,
	maxHunger: 1000,
	minLifeSpan: min,
	feed: 100,
	initialSize: 200,
	maxSize: 600,
	matureIn: min,
	color: [
		'red',
		'yellow',
		'green',
		'blue',
		],
};

const taskDef = {
	submitCd: 10 * sec,
	startEating: 3 * sec,
	duration: 3 * sec,
}

interface Task {
	name: string
	date: string
	time: string
	canSubmitTime: number
	canSubmit: boolean
	startFeed: number
	isFeeding: boolean
	endFeed: number
	finishFeeding: boolean
}

function failTask() {
	state.pet.love -= petDef.minusLove
}
function deletePen1() {
	state.pet.love -= 2
}
function deletePen2() {
	state.pet.love -= 10
}
function succeedTask() {
	state.pet.love += petDef.plusLove
}
function feedPet() {
	if (state.pet.hunger < petDef.maxHunger) {
		state.pet.hunger += petDef.feed
	}
}
function setPetColor(color: string) {
	pet.style.backgroundColor = color
}

function getTimeStamp(strDateTime: string) {
	const date = Date.parse(strDateTime)
	return Math.floor(date/1000)
}

function displayTasks() {
	// TODO: Render a list of tasks to tasksListContainer based on 
	// the list of tasks in state.tasks.
	let listHTML = ''
	for (const task of state.tasks) {
		listHTML += '<button class="taskButton">' + task.name + ' '  + '|' + ' ' + task.date + ' ' + task.time + '</button>'
	}

	tasksListContainer.innerHTML = listHTML;
}

function addTask() {
	newItemForm.style.display = 'none';
	//console.log (dateInput.value)
	//xsconsole.log (nameInput.value)
	const now = new Date()
	const year = now.getFullYear()
	const month = now.getMonth() + 1
	const date = now.getDate()

	const newtask: Task = {
		name: nameInput.value || 'Unnamed',
		date: dateInput.value || (year + '-' + month + '-' + date),
		time: timeInput.value || '23:59',
		canSubmitTime: (Date.now()/1000) + taskDef.submitCd,
		canSubmit: false,
		startFeed: (Date.now()/1000) + taskDef.startEating,
		isFeeding: false,
		endFeed: (Date.now()/1000) + taskDef.startEating + taskDef.duration,
		finishFeeding: false,
	};

	state.tasks.push(newtask);

	displayTasks();
}

function newTask() {
	newItemForm.style.display = 'block';
	
	cancelNewButton.onclick = ()=>{
		newItemForm.style.display = 'none';
	}
	enterButton.onclick = ()=>{
		addTask();
		//feedPet();
	}
}

function editTask() {
	if (state.taskIndex >= 0) {
		editWindow.style.display = 'block';
		deleteButton.onclick = ()=> {
			if (state.tasks[state.taskIndex].isFeeding) {
				deletePen1();
			} else if (state.tasks[state.taskIndex].finishFeeding) {
				deletePen2();
			}
			state.tasks.splice(state.taskIndex, 1);
			displayTasks();
			editWindow.style.display = 'none';
		}
		submitButton.onclick = ()=> {
			console.log(state.tasks[state.taskIndex].canSubmit);
			if (state.tasks[state.taskIndex].canSubmit) {
				state.tasks.splice(state.taskIndex, 1);
				displayTasks();
				succeedTask();
				editWindow.style.display = 'none';
			}
		}
		cancelEditButton.onclick = ()=> {
			editWindow.style.display = 'none';
		}
	}
}

function checkTasks() {
	for (let i = 0; i < state.tasks.length; i++) {
		const due = getTimeStamp(state.tasks[i].date + ' ' + state.tasks[i].time)
		const now = Math.floor(Date.now()/1000)
		if (due < now) {
			state.tasks.splice(i, 1)
			displayTasks();
			failTask();
		}
		if (now > state.tasks[i].canSubmitTime) {
			state.tasks[i].canSubmit = true;
		}
		if (state.tasks[i].isFeeding) {
			state.pet.hunger += petDef.feed / (taskDef.duration * fps)
		}
		if (now > state.tasks[i].endFeed) {
			state.tasks[i].isFeeding = false;
			state.tasks[i].finishFeeding = true;
		} else if (now > state.tasks[i].startFeed) {
			state.tasks[i].isFeeding = true;
		}
	}
}

function updatePetStatus() {
	pet.style.height = state.pet.size + 'px'
	pet.style.width = state.pet.size + 'px'
	pet.style.marginTop = -state.pet.size / 2 + 'px'
	hungerMeter.innerHTML = 'fullness:' + ' ' + (state.pet.hunger * 100 / petDef.maxHunger).toFixed(0) + '%'
	loveMeter.innerHTML = 'love:' + ' ' + state.pet.love
	//hungerBar.style.width = state.pet.hunger * 100 / petDef.maxHunger + '%'
}

function petAction() {
	updatePetStatus();

	if (!state.pet.alive) {
		setPetColor('black');
	} else {
		state.pet.hunger -= petDef.maxHunger / (petDef.minLifeSpan * fps)
		if (state.pet.hunger <= 0) {
			state.pet.alive = false;
		}
		
		state.pet.health = Math.floor(state.pet.hunger/(petDef.maxHunger/petDef.maxHealth))
		setPetColor(petDef.color[state.pet.health])
		
		if (state.pet.size < petDef.maxSize) {
			state.pet.size += (petDef.maxSize - petDef.initialSize) / (petDef.matureIn * fps)
		}
	}
}

bakaButton.onclick = ()=>{
	newTask();
}

tasksList.onclick = (event)=>{
	console.log (event.target)
	//console.log ([...tasksList.children].indexOf(event.target as Element))
	state.taskIndex = [...tasksList.children].indexOf(event.target as Element)
	console.log (state.taskIndex)
	editTask();
}

function update(): void {
	checkTasks();
	petAction();
}
setInterval(update, 1000/fps);