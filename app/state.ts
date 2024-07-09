import {Task, Goal} from 'app/types';

export const state = {
	tasks: [] as Task[],
	goals: [] as Goal[],
	repeatPressed: false,
	taskIndex: 0,
	goalIndex: 0,
	pet: {
		love: 0,
		health: 4,
		hunger: 1000,
		size: 200,
		alive: true,
	}
};