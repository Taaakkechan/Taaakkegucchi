const sec = 1;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;
export const fps = 50;
export const petDef = {
	maxHealth: 4,
	minusLove: 10,
	plusLove: 2,
	maxHunger: 1000,
	minLifeSpan: day / (24 * 60),
	feed: 100,
	initialSize: 200,
	maxSize: 600,
	matureIn: min,
	color: [
		'red',
		'yellow',
		'green',
		'blue',
	],
};

export const taskDef = {
	submitCd: 0 ,//10 * sec,
	startEating: 3 * sec,
	duration: 3 * sec,
	repeatCd: 10 * sec,
};

export const goalDef = {
	submitCd: 0 ,//10 * sec,
};