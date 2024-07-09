import { petDef, taskDef, fps} from 'app/gameConstants';
import {pages, buttons, divs, inputs} from 'app/htmlElements';
import {Task} from 'app/types';

const state = {
	tasks: [] as Task[],
	repeatPressed: false,
	taskIndex: 0,
	pet: {
		love: 0,
		health: 4,
		hunger: 1000,
		size: 200,
		alive: true,
	}
};

function setPetColor(color: string) {
	divs.pet.style.backgroundColor = color
}

//pet actions

function feedPet() {
	state.pet.hunger += petDef.feed / (taskDef.duration * fps)
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

//task results

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

//task logic

function displayTasks() {
	// TODO: Render a list of tasks to tasksListContainer based on 
	// the list of tasks in state.tasks.
	let listHTML = ''
	for (const task of state.tasks) {
		if (task.displayed) {
			listHTML += '<button class="taskButton">' + task.name + ' '  + '|' + ' ' + task.date + ' ' + task.time + '</button>'
		}
	}

	divs.tasksList.innerHTML = listHTML;
}

function initNewTaskForm() {
	inputs.name.value = '';
	inputs.date.value = '';
	inputs.time.value = '';
	state.repeatPressed = false;
}

function getTimeStamp(strDateTime: string) {
	const date = Date.parse(strDateTime)
	return Math.floor(date/1000)
}

function addTask() {
	divs.newItemForm.style.display = 'none';
	
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
		repeats: false,
		displayed: true,
	};
	if (state.repeatPressed) {
		newtask.repeats = true
	}
	state.tasks.push(newtask);
	displayTasks();
	console.log(newtask.repeats);
}

function newTask() {

	initNewTaskForm();
	divs.newItemForm.style.display = 'block';

	buttons.repeat.onclick = ()=>{
		if (!state.repeatPressed) {
			state.repeatPressed = true
		} else {
			state.repeatPressed = false
		}
	}
	buttons.cancelNew.onclick = ()=>{
		divs.newItemForm.style.display = 'none';
	}
	buttons.enter.onclick = ()=>{
		addTask();
	}
}

function hideTask(i: number) {
	state.tasks[i].displayed = false;
	displayTasks();
}
function showTask(i: number) {
	state.tasks[i].displayed = true;
	displayTasks();
}
function deleteTask(i: number) {
	state.tasks.splice(i, 1);
	displayTasks();
}

function editTask() {
	if (state.taskIndex >= 0) {
		divs.editWindow.style.display = 'block';
		buttons.delete.onclick = ()=> {
			
			//delete penalties
			if (state.tasks[state.taskIndex].isFeeding) {
				deletePen1();
			} else if (state.tasks[state.taskIndex].finishFeeding) {
				deletePen2();
			}

			deleteTask(state.taskIndex);
			displayTasks();
			divs.editWindow.style.display = 'none';
		}
		buttons.submit.onclick = ()=> {
			if (state.tasks[state.taskIndex].canSubmit) {
				if (state.tasks[state.taskIndex].repeats) {
					hideTask(state.taskIndex);
				} else {
					deleteTask(state.taskIndex);
				}
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
		//check tasks if expired and remove 
		if (due < now) {
			deleteTask(i);
			failTask();
		}
		//checks task submit cd
		if (now > state.tasks[i].canSubmitTime) {
			state.tasks[i].canSubmit = true;
		}
		//checks if task is feeding 
		if (state.tasks[i].isFeeding) {
			feedPet();
		}
		if (now > state.tasks[i].endFeed) {
			state.tasks[i].isFeeding = false;
			state.tasks[i].finishFeeding = true;
		} else if (now > state.tasks[i].startFeed) {
			state.tasks[i].isFeeding = true;
		}
		if (state.tasks[i].repeats) {
			if (now % taskDef.repeatCd === 0) {
				showTask(i);
			}
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
	state.taskIndex = [...divs.tasksList.children].indexOf(event?.target as Element)
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