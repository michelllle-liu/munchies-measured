// SCRIPT RELATING TO THE API

async function foodSearch (foodName) {
	try {
		let response = await fetch (`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=sdgfEjcNS5QErcOBqnp8gA2zumlDbMp2R8UXRRQj&query=${foodName}`);
		let result = await response.json();

		console.log (result);
		displaySearchResults (result);
	}
	catch (e) {
		console.log(e);
	}
}

function displaySearchResults (searchResults) {
	let foodItems = searchResults.foods;
	
	let html = '';

	for (let i = 0; i < foodItems.length; i++) {
		html += `<a href="#result" onclick="getFoodDetails('${foodItems[i].fdcId}')">${foodItems[i].description}</a>`;
	}

	document.querySelector('#search-results').innerHTML = html;
}

async function getFoodDetails (fdcId) {
	try {
		let response = await fetch (`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=sdgfEjcNS5QErcOBqnp8gA2zumlDbMp2R8UXRRQj`);
		let result = await response.json();

		console.log (result);
		autofill (result);
	}
	catch (e) {
		console.log(e);
	}
}

function autofill (foodDetails) {
	let name = `${foodDetails.description}`;
	let j = 0;

	while (foodDetails.foodNutrients[j].nutrient.name != "Energy") {
		j++;
	}

	let cal = foodDetails.foodNutrients[j].amount;

	document.getElementById('foodName').value = `${name}`;
	document.getElementById('calServe').value = `${cal}`;

	document.querySelector('#search-results').innerHTML = "";
	document.getElementById('food').value = "";
}

// GENERATING TABLE OF FOODS EATEN

let foodName = [];
let calServ = [];
let servings = [];
let calTot = 0;

let i = 0;
let count = 1;

function drawTable(){
	let insertRow = document.getElementById('genTable');
	let newRow = insertRow.insertRow(count);

	foodName[i] = document.getElementById('foodName').value;
	calServ[i] = document.getElementById('calServe').value;
	servings[i] = document.getElementById('servings').value;

	calTot = (calServ[i] * servings[i]) + calTot;

	let nameCol = newRow.insertCell(0);
	let calServCol = newRow.insertCell(1);
	let servingCol = newRow.insertCell(2);
	let totalCol = newRow.insertCell(3);

	nameCol.innerHTML = foodName[i];
	calServCol.innerHTML = calServ[i];
	servingCol.innerHTML = servings[i];
	totalCol.innerHTML = calTot;

	count++;
	i++;

	clearForm();
}

function clearForm () {
	document.getElementById('foodName').value = "";
	document.getElementById('calServe').value = "";
	document.getElementById('servings').value = "";
}
