import {state} from 'app/state';
import {petDef, fps} from 'app/gameConstants';
import {divs} from 'app/htmlElements';

//pet actions

function setPetColor(color: string) {
	divs.pet.style.backgroundColor = color
}

function updatePetStatus() {
	divs.pet.style.height = state.pet.size + 'px'
	divs.pet.style.width = state.pet.size + 'px'
	divs.pet.style.marginTop = -state.pet.size / 2 + 'px'
	divs.hungerMeter.innerHTML = 'fullness:' + ' ' + (state.pet.hunger * 100 / petDef.maxHunger).toFixed(0) + '%'
	divs.loveMeter.innerHTML = 'love:' + ' ' + state.pet.love
	//hungerBar.style.width = state.pet.hunger * 100 / petDef.maxHunger + '%'
}

export function petAction() {
	updatePetStatus();

	if (!state.pet.alive) {
		setPetColor('black');
	} else {
		state.pet.hunger -= petDef.maxHunger / (petDef.minLifeSpan * fps)
		if (state.pet.hunger <= 0) {
			state.pet.alive = false;
		}
		
		state.pet.health = Math.floor(state.pet.hunger/(petDef.maxHunger/petDef.maxHealth))
		setPetColor(petDef.color[state.pet.health])
		
		if (state.pet.size < petDef.maxSize) {
			state.pet.size += (petDef.maxSize - petDef.initialSize) / (petDef.matureIn * fps)
		}
	}
}
