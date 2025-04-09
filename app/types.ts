export interface Task {
	name: string
	date: string
	time: string
	canSubmitTime: number
	canSubmit: boolean
	startFeed: number
	isFeeding: boolean
	endFeed: number
	finishFeeding: boolean
	repeats: boolean
	repeatFreq?: number
	displayed: boolean
}

export interface Goal {
	name: string
	date: string
	time: string
	canSubmitTime: number
	canSubmit: boolean
}

export interface Pet {
	love: number
	health: number 
	level: number 
	xp: number 
	reqXp: number 
	vit: number 
	str: number 
	int: number 
	hunger: number 
	size: number 
	alive: boolean
}

export interface State {
	//start: boolean
	tasks: Task[]
	goals: Goal[]
	repeatPressed: boolean
	menuIndex: number
	taskIndex: number
	goalIndex: number
	pet: Pet
};