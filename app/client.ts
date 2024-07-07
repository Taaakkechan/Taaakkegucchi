import { petDef, taskDef} from 'app/gameConstants';
import {pages, buttons, divs, inputs} from 'app/htmlElements'

const fps = 50;
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
// function feedPet() {
// 	if (state.pet.hunger < petDef.maxHunger) {
// 		state.pet.hunger += petDef.feed
// 	}
// }
function setPetColor(color: string) {
	divs.pet.style.backgroundColor = color
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

	divs.tasksList.innerHTML = listHTML;
}

function addTask() {
	divs.newItemForm.style.display = 'none';
	//console.log (dateInput.value)
	//xsconsole.log (nameInput.value)
	const now = new Date()
	const year = now.getFullYear()
	const month = now.getMonth() + 1
	const date = now.getDate()

	const newtask: Task = {
		name: inputs.name.value || 'Unnamed',
		date: inputs.date.value || (year + '-' + month + '-' + date),
		time: inputs.time.value || '23:59',
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
	divs.newItemForm.style.display = 'block';
	
	buttons.cancelNew.onclick = ()=>{
		divs.newItemForm.style.display = 'none';
	}
	buttons.enter.onclick = ()=>{
		addTask();
		//feedPet();
	}
}

function editTask() {
	if (state.taskIndex >= 0) {
		divs.editWindow.style.display = 'block';
		buttons.delete.onclick = ()=> {
			if (state.tasks[state.taskIndex].isFeeding) {
				deletePen1();
			} else if (state.tasks[state.taskIndex].finishFeeding) {
				deletePen2();
			}
			state.tasks.splice(state.taskIndex, 1);
			displayTasks();
			divs.editWindow.style.display = 'none';
		}
		buttons.submit.onclick = ()=> {
			console.log(state.tasks[state.taskIndex].canSubmit);
			if (state.tasks[state.taskIndex].canSubmit) {
				state.tasks.splice(state.taskIndex, 1);
				displayTasks();
				succeedTask();
				divs.editWindow.style.display = 'none';
			}
		}
		buttons.cancelEdit.onclick = ()=> {
			divs.editWindow.style.display = 'none';
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
	divs.pet.style.height = state.pet.size + 'px'
	divs.pet.style.width = state.pet.size + 'px'
	divs.pet.style.marginTop = -state.pet.size / 2 + 'px'
	divs.hungerMeter.innerHTML = 'fullness:' + ' ' + (state.pet.hunger * 100 / petDef.maxHunger).toFixed(0) + '%'
	divs.loveMeter.innerHTML = 'love:' + ' ' + state.pet.love
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

function hidePage(page: HTMLDivElement) {
	page.style.display = 'none';
}
function displayPage(page: HTMLDivElement) {
	//hide all the pages in array
	for (let i = 0; i < pages.length; i++) {
		hidePage(pages[i]);
	}
	page.style.display = 'block';
}


buttons.newTask.onclick = ()=>{
	newTask();
}

divs.tasksList.onclick = ()=>{
	//console.log ([...tasksList.children].indexOf(event.target as Element))
	state.taskIndex = [...divs.tasksList.children].indexOf(event?.target as Element)
	console.log (state.taskIndex)
	editTask();
}
buttons.home.onclick = ()=>{
	displayPage(pages[0]);
}
buttons.tasks.onclick = ()=>{
	displayPage(pages[1]);
}
buttons.goals.onclick = ()=>{
	displayPage(pages[2]);
}
buttons.stats.onclick = ()=>{
	displayPage(pages[3]);
}
buttons.settings.onclick = ()=>{
	displayPage(pages[4]);
}

function update(): void {
	checkTasks();
	petAction();
}
setInterval(update, 1000/fps);