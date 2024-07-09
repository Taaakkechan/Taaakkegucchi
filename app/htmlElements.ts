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

export const newTaskButton = getButton('newTask');
export const enterButton = getButton('enter');
export const deleteButton = getButton('delete');
export const submitButton = getButton('submit');
export const cancelEditButton = getButton('cancelEdit');
export const cancelNewButton = getButton('cancelNew');
export const repeatButton = getButton('repeat');

export const dateInput = getInput('dateInput');
export const timeInput = getInput('timeInput');
export const nameInput = getInput('nameInput');
export const tasksListContainer = getInput('tasksList');

export const newItemForm = getDiv('newItemForm');
export const tasksList = getDiv('tasksList');
export const editWindow = getDiv('editWindow');
export const hungerBar = getDiv('hungerBar');
export const pet = getDiv('pet');
export const hungerMeter = getDiv('hungerMeter');
export const loveMeter = getDiv('loveMeter');
export const homeButton = getDiv('homeButton');
export const tasksButton = getDiv('tasksButton');
export const goalsButton = getDiv('goalsButton');
export const statsButton = getDiv('statsButton');
export const settingsButton = getDiv('settingsButton');
export const defaultPage = getDiv('defaultPage');
export const tasksPage = getDiv('tasksPage');
export const goalsPage = getDiv('goalsPage');
export const statsPage = getDiv('statsPage');
export const settingsPage = getDiv('settingsPage');

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
	enter: enterButton,
	delete: deleteButton,
	submit: submitButton,
	cancelNew: cancelNewButton,
	cancelEdit: cancelEditButton,
	repeat: repeatButton,
};

export const divs = {
	newItemForm: newItemForm,
	tasksList: tasksList,
	editWindow: editWindow,
	pet: pet,
	hungerMeter: hungerMeter,
	loveMeter: loveMeter,

}

export const inputs = {
	date: dateInput,
	time: timeInput,
	name: nameInput,
}