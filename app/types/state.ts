export interface GameState {
	savedState: SavedState
	started: boolean
	tasks: Task[]
	goals: Goal[]
	menuIndex: number
	taskIndex: number
	goalIndex: number
	pet: Pet
	time: number
};