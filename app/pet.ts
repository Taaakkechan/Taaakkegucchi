import {state} from 'app/state';
import {petDef, fps} from 'app/gameConstants';
import {divs} from 'app/htmlElements';

//pet actions

function setPetColor(color: string) {   
	divs.pet.style.backgroundColor = color
}
 function levelUp() {
	state.pet.reqXp = ((state.pet.level + 1) ** 2) * 100;
	state.pet.level++
	state.pet.vit += Math.floor(Math.random() * 3) + 3
	state.pet.int += Math.floor(Math.random() * 3) + 1
	state.pet.str += Math.floor(Math.random() * 3) + 1
 }

function updatePetStatus() {
	divs.pet.style.height = state.pet.size + 'px'
	divs.pet.style.width = state.pet.size + 'px'
	divs.pet.style.marginTop = -state.pet.size / 2 + 'px'
	const stats = '<div class="stat">' + 'level:' + ' ' + state.pet.level + '</div>' + '<div class="stat">' + 'xp:' + ' ' + state.pet.xp + '/' + state.pet.reqXp + '</div>' + '<div class="stat">' + 'vit:' + ' ' + state.pet.vit + '</div>' + '<div class="stat">' + 'str:' + ' ' + state.pet.str + '</div>' + '<div class="stat">' + 'int:' + ' ' + state.pet.int + '</div>'
	divs.statsContainer.innerHTML = stats
	divs.hungerMeter.innerHTML = 'fullness:' + ' ' + (state.pet.hunger * 100 / petDef.maxHunger).toFixed(0) + '%'
	divs.loveMeter.innerHTML = 'love:' + ' ' + state.pet.love
	//hungerBar.style.width = state.pet.hunger * 100 / petDef.maxHunger + '%'

	if (state.pet.xp >= state.pet.reqXp) {
		levelUp();
	}
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
