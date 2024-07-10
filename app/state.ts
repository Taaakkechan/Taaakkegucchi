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
		level: 1,
		xp: 0,
		reqXp: 100,
		vit: 0,
		str: 0,
		int: 0,
		hunger: 1000,
		size: 200,
		alive: true,
	}
};