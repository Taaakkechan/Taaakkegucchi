/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/client.ts":
/*!***********************!*\
  !*** ./app/client.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var app_gameConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/gameConstants */ \"./app/gameConstants.ts\");\n/* harmony import */ var app_htmlElements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/htmlElements */ \"./app/htmlElements.ts\");\n\r\n\r\nconst fps = 50;\r\nconst state = {\r\n    tasks: [],\r\n    taskIndex: 0,\r\n    editing: false,\r\n    pet: {\r\n        love: 0,\r\n        health: 4,\r\n        hunger: 1000,\r\n        size: 200,\r\n        alive: true,\r\n    }\r\n};\r\nfunction failTask() {\r\n    state.pet.love -= app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.petDef.minusLove;\r\n}\r\nfunction deletePen1() {\r\n    state.pet.love -= 2;\r\n}\r\nfunction deletePen2() {\r\n    state.pet.love -= 10;\r\n}\r\nfunction succeedTask() {\r\n    state.pet.love += app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.petDef.plusLove;\r\n}\r\n// function feedPet() {\r\n// \tif (state.pet.hunger < petDef.maxHunger) {\r\n// \t\tstate.pet.hunger += petDef.feed\r\n// \t}\r\n// }\r\nfunction setPetColor(color) {\r\n    app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.pet.style.backgroundColor = color;\r\n}\r\nfunction getTimeStamp(strDateTime) {\r\n    const date = Date.parse(strDateTime);\r\n    return Math.floor(date / 1000);\r\n}\r\nfunction displayTasks() {\r\n    // TODO: Render a list of tasks to tasksListContainer based on \r\n    // the list of tasks in state.tasks.\r\n    let listHTML = '';\r\n    for (const task of state.tasks) {\r\n        listHTML += '<button class=\"taskButton\">' + task.name + ' ' + '|' + ' ' + task.date + ' ' + task.time + '</button>';\r\n    }\r\n    app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.tasksList.innerHTML = listHTML;\r\n}\r\nfunction addTask() {\r\n    app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.newItemForm.style.display = 'none';\r\n    //console.log (dateInput.value)\r\n    //xsconsole.log (nameInput.value)\r\n    const now = new Date();\r\n    const year = now.getFullYear();\r\n    const month = now.getMonth() + 1;\r\n    const date = now.getDate();\r\n    const newtask = {\r\n        name: app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.inputs.name.value || 'Unnamed',\r\n        date: app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.inputs.date.value || (year + '-' + month + '-' + date),\r\n        time: app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.inputs.time.value || '23:59',\r\n        canSubmitTime: (Date.now() / 1000) + app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.taskDef.submitCd,\r\n        canSubmit: false,\r\n        startFeed: (Date.now() / 1000) + app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.taskDef.startEating,\r\n        isFeeding: false,\r\n        endFeed: (Date.now() / 1000) + app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.taskDef.startEating + app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.taskDef.duration,\r\n        finishFeeding: false,\r\n    };\r\n    state.tasks.push(newtask);\r\n    displayTasks();\r\n}\r\nfunction newTask() {\r\n    app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.newItemForm.style.display = 'block';\r\n    app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.buttons.cancelNew.onclick = () => {\r\n        app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.newItemForm.style.display = 'none';\r\n    };\r\n    app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.buttons.enter.onclick = () => {\r\n        addTask();\r\n        //feedPet();\r\n    };\r\n}\r\nfunction editTask() {\r\n    if (state.taskIndex >= 0) {\r\n        app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.editWindow.style.display = 'block';\r\n        app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.buttons[\"delete\"].onclick = () => {\r\n            if (state.tasks[state.taskIndex].isFeeding) {\r\n                deletePen1();\r\n            }\r\n            else if (state.tasks[state.taskIndex].finishFeeding) {\r\n                deletePen2();\r\n            }\r\n            state.tasks.splice(state.taskIndex, 1);\r\n            displayTasks();\r\n            app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.editWindow.style.display = 'none';\r\n        };\r\n        app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.buttons.submit.onclick = () => {\r\n            console.log(state.tasks[state.taskIndex].canSubmit);\r\n            if (state.tasks[state.taskIndex].canSubmit) {\r\n                state.tasks.splice(state.taskIndex, 1);\r\n                displayTasks();\r\n                succeedTask();\r\n                app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.editWindow.style.display = 'none';\r\n            }\r\n        };\r\n        app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.buttons.cancelEdit.onclick = () => {\r\n            app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.editWindow.style.display = 'none';\r\n        };\r\n    }\r\n}\r\nfunction checkTasks() {\r\n    for (let i = 0; i < state.tasks.length; i++) {\r\n        const due = getTimeStamp(state.tasks[i].date + ' ' + state.tasks[i].time);\r\n        const now = Math.floor(Date.now() / 1000);\r\n        if (due < now) {\r\n            state.tasks.splice(i, 1);\r\n            displayTasks();\r\n            failTask();\r\n        }\r\n        if (now > state.tasks[i].canSubmitTime) {\r\n            state.tasks[i].canSubmit = true;\r\n        }\r\n        if (state.tasks[i].isFeeding) {\r\n            state.pet.hunger += app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.petDef.feed / (app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.taskDef.duration * fps);\r\n        }\r\n        if (now > state.tasks[i].endFeed) {\r\n            state.tasks[i].isFeeding = false;\r\n            state.tasks[i].finishFeeding = true;\r\n        }\r\n        else if (now > state.tasks[i].startFeed) {\r\n            state.tasks[i].isFeeding = true;\r\n        }\r\n    }\r\n}\r\nfunction updatePetStatus() {\r\n    app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.pet.style.height = state.pet.size + 'px';\r\n    app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.pet.style.width = state.pet.size + 'px';\r\n    app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.pet.style.marginTop = -state.pet.size / 2 + 'px';\r\n    app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.hungerMeter.innerHTML = 'fullness:' + ' ' + (state.pet.hunger * 100 / app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.petDef.maxHunger).toFixed(0) + '%';\r\n    app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.loveMeter.innerHTML = 'love:' + ' ' + state.pet.love;\r\n    //hungerBar.style.width = state.pet.hunger * 100 / petDef.maxHunger + '%'\r\n}\r\nfunction petAction() {\r\n    updatePetStatus();\r\n    if (!state.pet.alive) {\r\n        setPetColor('black');\r\n    }\r\n    else {\r\n        state.pet.hunger -= app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.petDef.maxHunger / (app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.petDef.minLifeSpan * fps);\r\n        if (state.pet.hunger <= 0) {\r\n            state.pet.alive = false;\r\n        }\r\n        state.pet.health = Math.floor(state.pet.hunger / (app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.petDef.maxHunger / app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.petDef.maxHealth));\r\n        setPetColor(app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.petDef.color[state.pet.health]);\r\n        if (state.pet.size < app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.petDef.maxSize) {\r\n            state.pet.size += (app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.petDef.maxSize - app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.petDef.initialSize) / (app_gameConstants__WEBPACK_IMPORTED_MODULE_0__.petDef.matureIn * fps);\r\n        }\r\n    }\r\n}\r\nfunction hidePage(page) {\r\n    page.style.display = 'none';\r\n}\r\nfunction displayPage(page) {\r\n    //hide all the pages in array\r\n    for (let i = 0; i < app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.pages.length; i++) {\r\n        hidePage(app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.pages[i]);\r\n    }\r\n    page.style.display = 'block';\r\n}\r\napp_htmlElements__WEBPACK_IMPORTED_MODULE_1__.buttons.newTask.onclick = () => {\r\n    newTask();\r\n};\r\napp_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.tasksList.onclick = () => {\r\n    //console.log ([...tasksList.children].indexOf(event.target as Element))\r\n    state.taskIndex = [...app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.divs.tasksList.children].indexOf(event === null || event === void 0 ? void 0 : event.target);\r\n    console.log(state.taskIndex);\r\n    editTask();\r\n};\r\napp_htmlElements__WEBPACK_IMPORTED_MODULE_1__.buttons.home.onclick = () => {\r\n    displayPage(app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.pages[0]);\r\n};\r\napp_htmlElements__WEBPACK_IMPORTED_MODULE_1__.buttons.tasks.onclick = () => {\r\n    displayPage(app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.pages[1]);\r\n};\r\napp_htmlElements__WEBPACK_IMPORTED_MODULE_1__.buttons.goals.onclick = () => {\r\n    displayPage(app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.pages[2]);\r\n};\r\napp_htmlElements__WEBPACK_IMPORTED_MODULE_1__.buttons.stats.onclick = () => {\r\n    displayPage(app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.pages[3]);\r\n};\r\napp_htmlElements__WEBPACK_IMPORTED_MODULE_1__.buttons.settings.onclick = () => {\r\n    displayPage(app_htmlElements__WEBPACK_IMPORTED_MODULE_1__.pages[4]);\r\n};\r\nfunction update() {\r\n    checkTasks();\r\n    petAction();\r\n}\r\nsetInterval(update, 1000 / fps);\r\n\n\n//# sourceURL=webpack://alttp/./app/client.ts?");

/***/ }),

/***/ "./app/gameConstants.ts":
/*!******************************!*\
  !*** ./app/gameConstants.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   petDef: () => (/* binding */ petDef),\n/* harmony export */   taskDef: () => (/* binding */ taskDef)\n/* harmony export */ });\nconst sec = 1;\r\nconst min = sec * 60;\r\nconst hour = min * 60;\r\nconst day = hour * 24;\r\nconst petDef = {\r\n    maxHealth: 4,\r\n    minusLove: 10,\r\n    plusLove: 2,\r\n    maxHunger: 1000,\r\n    minLifeSpan: day / (24 * 60),\r\n    feed: 100,\r\n    initialSize: 200,\r\n    maxSize: 600,\r\n    matureIn: min,\r\n    color: [\r\n        'red',\r\n        'yellow',\r\n        'green',\r\n        'blue',\r\n    ],\r\n};\r\nconst taskDef = {\r\n    submitCd: 10 * sec,\r\n    startEating: 3 * sec,\r\n    duration: 3 * sec,\r\n};\r\n\n\n//# sourceURL=webpack://alttp/./app/gameConstants.ts?");

/***/ }),

/***/ "./app/htmlElements.ts":
/*!*****************************!*\
  !*** ./app/htmlElements.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buttons: () => (/* binding */ buttons),\n/* harmony export */   cancelEditButton: () => (/* binding */ cancelEditButton),\n/* harmony export */   cancelNewButton: () => (/* binding */ cancelNewButton),\n/* harmony export */   dateInput: () => (/* binding */ dateInput),\n/* harmony export */   defaultPage: () => (/* binding */ defaultPage),\n/* harmony export */   deleteButton: () => (/* binding */ deleteButton),\n/* harmony export */   divs: () => (/* binding */ divs),\n/* harmony export */   editWindow: () => (/* binding */ editWindow),\n/* harmony export */   enterButton: () => (/* binding */ enterButton),\n/* harmony export */   goalsButton: () => (/* binding */ goalsButton),\n/* harmony export */   goalsPage: () => (/* binding */ goalsPage),\n/* harmony export */   homeButton: () => (/* binding */ homeButton),\n/* harmony export */   hungerBar: () => (/* binding */ hungerBar),\n/* harmony export */   hungerMeter: () => (/* binding */ hungerMeter),\n/* harmony export */   inputs: () => (/* binding */ inputs),\n/* harmony export */   loveMeter: () => (/* binding */ loveMeter),\n/* harmony export */   nameInput: () => (/* binding */ nameInput),\n/* harmony export */   newItemForm: () => (/* binding */ newItemForm),\n/* harmony export */   newTaskButton: () => (/* binding */ newTaskButton),\n/* harmony export */   pages: () => (/* binding */ pages),\n/* harmony export */   pet: () => (/* binding */ pet),\n/* harmony export */   settingsButton: () => (/* binding */ settingsButton),\n/* harmony export */   settingsPage: () => (/* binding */ settingsPage),\n/* harmony export */   statsButton: () => (/* binding */ statsButton),\n/* harmony export */   statsPage: () => (/* binding */ statsPage),\n/* harmony export */   submitButton: () => (/* binding */ submitButton),\n/* harmony export */   tasksButton: () => (/* binding */ tasksButton),\n/* harmony export */   tasksList: () => (/* binding */ tasksList),\n/* harmony export */   tasksListContainer: () => (/* binding */ tasksListContainer),\n/* harmony export */   tasksPage: () => (/* binding */ tasksPage),\n/* harmony export */   timeInput: () => (/* binding */ timeInput)\n/* harmony export */ });\nfunction requireElementById(id) {\r\n    const element = document.getElementById(id);\r\n    if (!element) {\r\n        throw new Error(`Could not find element with id ${id}`);\r\n    }\r\n    return element;\r\n}\r\nfunction getButton(id) {\r\n    return requireElementById(id);\r\n}\r\nfunction getDiv(id) {\r\n    return requireElementById(id);\r\n}\r\nfunction getInput(id) {\r\n    return requireElementById(id);\r\n}\r\nconst newTaskButton = getButton('newTask');\r\nconst enterButton = getButton('enter');\r\nconst deleteButton = getButton('delete');\r\nconst submitButton = getButton('submit');\r\nconst cancelEditButton = getButton('cancelEdit');\r\nconst cancelNewButton = getButton('cancelNew');\r\nconst dateInput = getInput('dateInput');\r\nconst timeInput = getInput('timeInput');\r\nconst nameInput = getInput('nameInput');\r\nconst tasksListContainer = getInput('tasksList');\r\nconst newItemForm = getDiv('newItemForm');\r\nconst tasksList = getDiv('tasksList');\r\nconst editWindow = getDiv('editWindow');\r\nconst hungerBar = getDiv('hungerBar');\r\nconst pet = getDiv('pet');\r\nconst hungerMeter = getDiv('hungerMeter');\r\nconst loveMeter = getDiv('loveMeter');\r\nconst homeButton = getDiv('homeButton');\r\nconst tasksButton = getDiv('tasksButton');\r\nconst goalsButton = getDiv('goalsButton');\r\nconst statsButton = getDiv('statsButton');\r\nconst settingsButton = getDiv('settingsButton');\r\nconst defaultPage = getDiv('defaultPage');\r\nconst tasksPage = getDiv('tasksPage');\r\nconst goalsPage = getDiv('goalsPage');\r\nconst statsPage = getDiv('statsPage');\r\nconst settingsPage = getDiv('settingsPage');\r\nconst pages = [\r\n    defaultPage,\r\n    tasksPage,\r\n    goalsPage,\r\n    statsPage,\r\n    settingsPage,\r\n];\r\nconst buttons = {\r\n    home: homeButton,\r\n    tasks: tasksButton,\r\n    goals: goalsButton,\r\n    stats: statsButton,\r\n    settings: settingsButton,\r\n    newTask: newTaskButton,\r\n    enter: enterButton,\r\n    delete: deleteButton,\r\n    submit: submitButton,\r\n    cancelNew: cancelNewButton,\r\n    cancelEdit: cancelEditButton,\r\n};\r\nconst divs = {\r\n    newItemForm: newItemForm,\r\n    tasksList: tasksList,\r\n    editWindow: editWindow,\r\n    pet: pet,\r\n    hungerMeter: hungerMeter,\r\n    loveMeter: loveMeter,\r\n};\r\nconst inputs = {\r\n    date: dateInput,\r\n    time: timeInput,\r\n    name: nameInput,\r\n};\r\n\n\n//# sourceURL=webpack://alttp/./app/htmlElements.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app/client.ts");
/******/ 	
/******/ })()
;