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
	displayPage(pages[0]);
}
buttons.tasks.onclick = ()=>{
	displayPage(pages[1]);
	taskPageActions();
}
buttons.goals.onclick = ()=>{
	displayPage(pages[2]);
	goalPageActions();
}
buttons.stats.onclick = ()=>{
	displayPage(pages[3]);
}
buttons.settings.onclick = ()=>{
	displayPage(pages[4]);
}

function update(): void {
	checkTasks();
	checkGoals();
	petAction();
}
setInterval(update, 1000/fps);