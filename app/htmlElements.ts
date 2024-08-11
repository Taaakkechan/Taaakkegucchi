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
	home: getDiv('homeButton'),
	tasks: getDiv('tasksButton'),
	goals: getDiv('goalsButton'),
	stats: getDiv('statsButton'),
	settings: getDiv('settingsButton'),
	newTask: getButton('newTask'),
	enterTask: getButton('enterTask'),
	deleteTask: getButton('deleteTask'),
	submitTask: getButton('submitTask'),
	cancelNewTask: getDiv('cancelNewTask'),
	cancelEditTask: getDiv('cancelEditTask'),
	repeat: getButton('repeat'),
	newGoal: getButton('newGoal'),
	enterGoal: getButton('enterGoal'),
	deleteGoal: getButton('deleteGoal'),
	submitGoal: getButton('submitGoal'),
	cancelNewGoal: getDiv('cancelNewGoal'),
	cancelEditGoal: getDiv('cancelEditGoal'),
};

export const divs = {
	newTaskForm: getDiv('newTaskForm'),
	tasksList: getDiv('tasksList'),
	editTaskWindow: getDiv('editTaskWindow'),
	newGoalForm: getDiv('newGoalForm'),
	goalsList: getDiv('goalsList'),
	editGoalWindow: getDiv('editGoalWindow'),
	pet: getDiv('pet'),
	hungerMeter: getDiv('hungerMeter'),
	loveMeter: getDiv('loveMeter'),
	statsContainer: getDiv('statsContainer'),
	menuBar: getDiv('menuBar'),
	title: getDiv('title')
}

export const inputs = {
	taskDate: getInput('taskDateInput'),
	taskTime: getInput('taskTimeInput'),
	taskName: getInput('taskNameInput'),
	goalDate: getInput('goalDateInput'),
	goalTime: getInput('goalTimeInput'),
	goalName: getInput('goalNameInput'),
}