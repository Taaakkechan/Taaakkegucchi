import {Task} from 'app/types';
import {state} from 'app/state';
import {buttons, divs, inputs} from 'app/htmlElements';
import { petDef, taskDef, fps} from 'app/gameConstants';

//task results

function badEvent() {
	const dice = Math.floor(Math.random() * 100) + 1
	if (dice > state.pet.vit) {
		state.pet.alive = false
	}
}
function failTask() {
	badEvent();
}
function deletePen1() {
	state.pet.love -= 2
}
function deletePen2() {
	state.pet.love -= 10
}
function succeedTask() {
	state.pet.xp += taskDef.xp
}
function feedPet() {
	state.pet.hunger += petDef.feed / (taskDef.duration * fps)
}

//task logic

export function displayTasks() {
	// TODO: Render a list of tasks to tasksListContainer based on 
	// the list of tasks in state.tasks.
	let listHTML = ''
	for (const task of state.tasks) {
		if (task.displayed) {
			listHTML += '<button class="listItemButton">' + task.name + ' '  + '|' + ' ' + task.date + ' ' + task.time + '</button>'
		}
	}

	divs.tasksList.innerHTML = listHTML;
}

function initNewTaskForm() {
	inputs.taskName.value = '';
	inputs.taskDate.value = '';
	inputs.taskTime.value = '';
	state.repeatPressed = false;
}

function getTimeStamp(strDateTime: string) {
	const date = Date.parse(strDateTime)
	return Math.floor(date/1000)
}

function addTask() {
	const now = new Date()
	const year = now.getFullYear()
	const month = now.getMonth() + 1
	const date = now.getDate()

	const newtask: Task = {
		name: inputs.taskName.value || 'Unnamed',
		date: inputs.taskDate.value || (year + '-' + month + '-' + date),
		time: inputs.taskTime.value || '23:59',
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
}

export function newTask() {

	initNewTaskForm();
	divs.newTaskForm.style.display = 'block';

	buttons.repeat.onclick = ()=>{
		if (!state.repeatPressed) {
			state.repeatPressed = true
		} else {
			state.repeatPressed = false
		}
	}
	buttons.cancelNewTask.onclick = ()=>{
		divs.newTaskForm.style.display = 'none';
	}
	buttons.enterTask.onclick = ()=>{
		divs.newTaskForm.style.display = 'none';
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

export function editTask() {
	if (state.taskIndex >= 0) {
		divs.editTaskWindow.style.display = 'block';
		buttons.deleteTask.onclick = ()=> {
			
			//delete penalties
			if (state.tasks[state.taskIndex].isFeeding) {
				deletePen1();
			} else if (state.tasks[state.taskIndex].finishFeeding) {
				deletePen2();
			}

			deleteTask(state.taskIndex);
			divs.editTaskWindow.style.display = 'none';
		}
		buttons.submitTask.onclick = ()=> {
			if (state.tasks[state.taskIndex].canSubmit) {
				if (state.tasks[state.taskIndex].repeats) {
					hideTask(state.taskIndex);
				} else {
					deleteTask(state.taskIndex);
				}
				succeedTask();
				divs.editTaskWindow.style.display = 'none';
			}
		}
		buttons.cancelEditTask.onclick = ()=> {
			divs.editTaskWindow.style.display = 'none'; 
		}
	}
}

export function checkTasks() {
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