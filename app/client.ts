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

const state = {
	tasks: [] as Task[],
	taskIndex: 0,
	time: 0,
	pet: {
		maxHealth: 4,
		love: 0,
		minusLove: 10,
		plusLove: 2,
		health: 4,
		maxHunger: 1000,
		hunger: 1000,
		hungerRate: 0.2,
		feed: 100,
		maxSize: 600,
		size: 200,
		growSpeed: 0.2,
		color: [
			'red',
			'yellow',
			'green',
			'blue',
			],
		alive: true,
	}
};

interface Task {
	name: string
	date: string
	time: string
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
	};

	state.tasks.push(newtask);

	displayTasks();
}

function editTask() {
	if (state.taskIndex >= 0) {
		editWindow.style.display = 'block';
		deleteButton.onclick = ()=> {
			//tasksList.removeChild(tasksList.children[state.taskIndex]);
			// Remove selected task from the state.
			state.tasks.splice(state.taskIndex, 1);
			// Refresh the display
			displayTasks();
			//[...tasksList.children].splice(state.taskIndex, 1);
			editWindow.style.display = 'none';
		}
		submitButton.onclick = ()=> {
			editWindow.style.display = 'none';
			state.tasks.splice(state.taskIndex, 1);
			displayTasks();
			if (state.pet.hunger < state.pet.maxHunger) {
				state.pet.hunger += state.pet.feed
			}
		}
		cancelEditButton.onclick = ()=> {
			editWindow.style.display = 'none';
		}
	}
}

function failTask() {
	state.tasks.splice(state.taskIndex, 1)
	state.pet.love -= state.pet.minusLove
}

function setPetColor(color: string) {
	pet.style.backgroundColor = color
}

function getTimeStamp(strDateTime: string) {
	const date = Date.parse(strDateTime)
	return Math.floor(date/1000)
}

function checkTasks() {
	for (let i = 0; i < state.tasks.length; i++) {
		const due = getTimeStamp(state.tasks[i].date + ' ' + state.tasks[i].time)
		const now = Math.floor(Date.now()/1000)
		if (due < now) {
			state.pet.alive = false
		}
	}
}

bakaButton.onclick = ()=>{
	newItemForm.style.display = 'block';
}

cancelNewButton.onclick = ()=>{
	newItemForm.style.display = 'none';
}


enterButton.onclick = ()=>{
	addTask();
}

tasksList.onclick = (event)=>{
	console.log (event.target)
	//console.log ([...tasksList.children].indexOf(event.target as Element))
	state.taskIndex = [...tasksList.children].indexOf(event.target as Element)
	console.log (state.taskIndex)
	editTask();
}

function update(): void {

	hungerBar.style.width = state.pet.hunger * 100 / state.pet.maxHunger + '%'
	pet.style.height = state.pet.size + 'px'
	pet.style.width = state.pet.size + 'px'
	pet.style.marginTop = -state.pet.size / 2 + 'px'
	state.time++
	checkTasks();

	
	const sec = state.time/50
	const min = sec/60
	const hour = min/60
	const day = hour/24

	const p = state.pet


	if (p.alive === true) {	
		p.hunger -= p.hungerRate
		p.health = Math.floor(p.hunger/(p.maxHunger/p.maxHealth))
		
		if (p.size < p.maxSize) {
			p.size += p.growSpeed
		}
		setPetColor(p.color[p.health])
	} else {
		setPetColor('black')
	}
	if (p.hunger === 0) {
		p.alive = false;
	}
	
}





/*function renderLoop(): void {
    try {
        window.requestAnimationFrame(renderLoop);
        render(mainContext);
    } catch (e) {
        console.log(e);
        debugger;
    }
}*/
//renderLoop();
setInterval(update, 20);