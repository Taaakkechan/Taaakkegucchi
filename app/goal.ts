import {Goal} from 'app/types';
import {state} from 'app/state';
import {buttons, divs, inputs} from 'app/htmlElements';
import {goalDef} from 'app/gameConstants';

//task results

function failGoal() {
	//state.pet.love -= petDef.minusLove
}
function succeedGoal() {
	//state.pet.love += petDef.plusLove
}

//task logic

export function displayGoals() {
	// TODO: Render a list of tasks to tasksListContainer based on 
	// the list of tasks in state.tasks.
	let listHTML = ''
	for (const goal of state.goals) {
		listHTML += '<button class="listItemButton">' + goal.name + ' '  + '|' + ' ' + goal.date + ' ' + goal.time + '</button>'
	}

	divs.goalsList.innerHTML = listHTML;
}

function initNewGoalForm() {
	inputs.goalName.value = '';
	inputs.goalDate.value = '';
	inputs.goalTime.value = '';
}

function getTimeStamp(strDateTime: string) {
	const date = Date.parse(strDateTime)
	return Math.floor(date/1000)
}

function addGoal() {
	divs.newTaskForm.style.display = 'none';
	
	const now = new Date()
	const year = now.getFullYear()
	const month = now.getMonth() + 1
	const date = now.getDate()

	const newGoal: Goal = {
		name: inputs.goalName.value || 'Unnamed',
		date: inputs.goalDate.value || (year + '-' + month + '-' + date),
		time: inputs.goalTime.value || '23:59',
		canSubmitTime: (Date.now()/1000) + goalDef.submitCd,
		canSubmit: false,
	};
	state.goals.push(newGoal);
	displayGoals();
}

export function newGoal() {

	initNewGoalForm();
	divs.newGoalForm.style.display = 'block';

	buttons.cancelNewGoal.onclick = ()=>{
		divs.newGoalForm.style.display = 'none';
	}
	buttons.enterGoal.onclick = ()=>{
		divs.newGoalForm.style.display = 'none';
		addGoal();
	}
}

function deleteGoal(i: number) {
	state.goals.splice(i, 1);
	displayGoals();
}

export function editGoal() {
	if (state.goalIndex >= 0) {
		divs.editGoalWindow.style.display = 'block';
		buttons.deleteGoal.onclick = ()=> {
			deleteGoal(state.goalIndex);
			divs.editGoalWindow.style.display = 'none';
		}
		buttons.submitGoal.onclick = ()=> {
			if (state.goals[state.goalIndex].canSubmit) {
				deleteGoal(state.goalIndex);
				succeedGoal();
				divs.editGoalWindow.style.display = 'none';
			}
		}
		buttons.cancelEditGoal.onclick = ()=> {
			divs.editGoalWindow.style.display = 'none'; 
		}
	}
}

export function checkGoals() {
	for (let i = 0; i < state.goals.length; i++) {
		const due = getTimeStamp(state.goals[i].date + ' ' + state.goals[i].time)
		const now = Math.floor(Date.now()/1000)
		//check goals if expired and remove 
		if (due < now) {
			deleteGoal(i);
			failGoal();
		}
		//checks task submit cd
		if (now > state.goals[i].canSubmitTime) {
			state.goals[i].canSubmit = true;
		}
	}
}