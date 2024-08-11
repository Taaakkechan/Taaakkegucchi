import {State, Pet} from 'app/types';


//this is the inital state of the game and I need to make state an interface
//do i need to make a pet interface? I think so.

// export const state = {
// 	start: false,
// 	tasks: [] as Task[],
// 	goals: [] as Goal[],
// 	repeatPressed: false,
// 	menuIndex: 0,
// 	taskIndex: 0,
// 	goalIndex: 0,
// 	pet: {
// 		love: 0,
// 		health: 4,
// 		level: 1,
// 		xp: 0,
// 		reqXp: 100,
// 		vit: 0,
// 		str: 0,
// 		int: 0,
// 		hunger: 1000,
// 		size: 200,
// 		alive: true,
// 	}
// };

function initialPetState() {
	const pet: Pet = {
		love: 0,
		health: 4,
		level: 1,
		xp: 0,
		reqXp: 100,
		vit: 0,
		str: 0,
		int: 0,
		hunger: 1000,
		size: 200,
		alive: true,
	};
	return pet;
}

export function initialState() {
	const state: State = {
		start: false,
		tasks: [],
		goals: [],
		repeatPressed: false,
		menuIndex: 0,
		taskIndex: 0,
		goalIndex: 0,
		pet: initialPetState(),
	};
	return state;
}

export let state = initialState();

export function initState() {
	state = initialState();
}