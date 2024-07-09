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
	displayed: boolean
}