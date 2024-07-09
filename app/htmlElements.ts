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

 const newTaskButton = getButton('newTask');
 const enterTaskButton = getButton('enterTask');
 const deleteTaskButton = getButton('deleteTask');
 const submitTaskButton = getButton('submitTask');
 const cancelEditTaskButton = getButton('cancelEditTask');
 const cancelNewTaskButton = getButton('cancelNewTask');
 const repeatButton = getButton('repeat');
 const newGoalButton = getButton('newGoal');
 const enterGoalButton = getButton('enterGoal');
 const deleteGoalButton = getButton('deleteGoal');
 const submitGoalButton = getButton('submitGoal');
 const cancelEditGoalButton = getButton('cancelEditGoal');
 const cancelNewGoalButton = getButton('cancelNewGoal');

 const taskDateInput = getInput('taskDateInput');
 const taskTimeInput = getInput('taskTimeInput');
 const taskNameInput = getInput('taskNameInput');
 const goalDateInput = getInput('goalDateInput');
 const goalTimeInput = getInput('goalTimeInput');
 const goalNameInput = getInput('goalNameInput');

 const newTaskForm = getDiv('newTaskForm');
 const tasksList = getDiv('tasksList');
 const editTaskWindow = getDiv('editTaskWindow');
 const newGoalForm = getDiv('newGoalForm');
 const goalsList = getDiv('goalsList');
 const editGoalWindow = getDiv('editGoalWindow');
 //const hungerBar = getDiv('hungerBar');
 const pet = getDiv('pet');
 const hungerMeter = getDiv('hungerMeter');
 const loveMeter = getDiv('loveMeter');
 const homeButton = getDiv('homeButton');
 const tasksButton = getDiv('tasksButton');
 const goalsButton = getDiv('goalsButton');
 const statsButton = getDiv('statsButton');
 const settingsButton = getDiv('settingsButton');
 const defaultPage = getDiv('defaultPage');
 const tasksPage = getDiv('tasksPage');
 const goalsPage = getDiv('goalsPage');
 const statsPage = getDiv('statsPage');
 const settingsPage = getDiv('settingsPage');

export const pages = [
	defaultPage,
	tasksPage,
	goalsPage,
	statsPage,
	settingsPage,
];

export const buttons = {
	home: homeButton,
	tasks: tasksButton,
	goals: goalsButton,
	stats: statsButton,
	settings: settingsButton,
	newTask: newTaskButton,
	enterTask: enterTaskButton,
	deleteTask: deleteTaskButton,
	submitTask: submitTaskButton,
	cancelNewTask: cancelNewTaskButton,
	cancelEditTask: cancelEditTaskButton,
	repeat: repeatButton,
	newGoal: newGoalButton,
	enterGoal: enterGoalButton,
	deleteGoal: deleteGoalButton,
	submitGoal: submitGoalButton,
	cancelNewGoal: cancelNewGoalButton,
	cancelEditGoal: cancelEditGoalButton,
};

export const divs = {
	newTaskForm: newTaskForm,
	tasksList: tasksList,
	editTaskWindow: editTaskWindow,
	newGoalForm: newGoalForm,
	goalsList: goalsList,
	editGoalWindow: editGoalWindow,
	pet: pet,
	hungerMeter: hungerMeter,
	loveMeter: loveMeter,

}

export const inputs = {
	taskDate: taskDateInput,
	taskTime: taskTimeInput,
	taskName: taskNameInput,
	goalDate: goalDateInput,
	goalTime: goalTimeInput,
	goalName: goalNameInput,
}