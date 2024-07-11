import {fps} from 'app/gameConstants';
import {pages, buttons, divs} from 'app/htmlElements';
import {petAction} from 'app/pet';
import {checkTasks, editTask, newTask} from 'app/tasks';
import {checkGoals, editGoal, newGoal} from 'app/goal';
import {state} from 'app/state';


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

function resetButtonColor() {
	buttons.home.style.backgroundColor = 'black';
	buttons.home.style.color = 'white';
	buttons.tasks.style.backgroundColor = 'black';
	buttons.tasks.style.color = 'white';
	buttons.goals.style.backgroundColor = 'black';
	buttons.goals.style.color = 'white';
	buttons.stats.style.backgroundColor = 'black';
	buttons.stats.style.color = 'white';
	buttons.settings.style.backgroundColor = 'black';
	buttons.settings.style.color = 'white';
}
function menuButtonSelected(menuButton: HTMLDivElement) {
	resetButtonColor();
	menuButton.style.backgroundColor = 'white';
	menuButton.style.color = 'black';
}

menuButtonSelected(buttons.home);

function taskPageActions() {
	buttons.newTask.onclick = ()=>{
		newTask();
	}
	divs.tasksList.onclick = ()=>{
		state.taskIndex = [...divs.tasksList.children].indexOf(event?.target as Element)
		editTask();
	}
}

function goalPageActions() {
	buttons.newGoal.onclick = ()=>{	
		newGoal();
	}
	divs.goalsList.onclick = ()=>{
		state.goalIndex = [...divs.goalsList.children].indexOf(event?.target as Element)
		editGoal();
	}
}

buttons.home.onclick = ()=>{
	menuButtonSelected(buttons.home);
	displayPage(pages[0]);
}
buttons.tasks.onclick = ()=>{
	menuButtonSelected(buttons.tasks);
	displayPage(pages[1]);
	taskPageActions();
}
buttons.goals.onclick = ()=>{
	menuButtonSelected(buttons.goals)
	displayPage(pages[2]);
	goalPageActions();
}
buttons.stats.onclick = ()=>{
	menuButtonSelected(buttons.stats)
	displayPage(pages[3]);
}
buttons.settings.onclick = ()=>{
	menuButtonSelected(buttons.settings)
	displayPage(pages[4]);
}

function update(): void {
	checkTasks();
	checkGoals();
	petAction();
}
setInterval(update, 1000/fps);