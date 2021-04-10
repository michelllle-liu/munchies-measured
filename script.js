// DETERMINING THE RECOMMENDED DAILY CALORIE INTAKE

let modal = document.getElementById("myModal");

let link = document.getElementById("modalLink");

link.onclick = function() {
  modal.style.display = "block";
}

let span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

// this js only works for the modal box, and not the search results for some reason
window.addEventListener("click", function(event) {
	if (event.target == modal) {
    modal.style.display = "none";
  }
	if (event.target == document.getElementById('search-results')) {
    document.getElementById('search-results').style.display = "none";
  }
});

const myForm= document.getElementById("CalorieIntake"); 
myForm.addEventListener('submit', submit);

function submit(event){
  event.preventDefault();
	
  const formData = new FormData(myForm);//get form data
  const person = Object.fromEntries(formData);//convert form data to object
  
  console.log(person.weight);
  console.log(person.heightFT);
  console.log(person.heightInch);
  console.log(person.age);
  console.log(person.sex);
  console.log(person.activity);

 
  CalculateDailyIntake(person);
  myForm.reset();
}

function CalculateDailyIntake(person){
  let heightCM=(person.heightFT*30.48)+ (person.heightInch*2.54);

  let weightKG= person.weight/2.20462262;
  console.log(weightKG);

	let factor=0.0
  if(person.activity==="Sedentary"){
    factor=1.2;}

  if(person.activity==="Low-Moderate"){
    factor=1.4;}
    
  if(person.activity==="Very Active"){
    factor=1.6;}

  let BMR=0.0
  let dailyIntake=0;
  
  if(person.sex==="Male"){
    BMR=(10.0*weightKG) + (6.25*heightCM) - (5*person.age) + 5.0;
    console.log(BMR);

    dailyIntake= Math.round(BMR * factor);
    console.log(`daily calorie intake ${dailyIntake} calories`);
  }
  else{
    BMR=(10.0*weightKG) + (6.25*heightCM) - (5*person.age) -161.0;
    console.log(BMR);

    dailyIntake= Math.round(BMR * factor);
    console.log(`daily calorie intake ${dailyIntake} calories`);
  }

  document.getElementById('recCal').value=`${dailyIntake}`;

	modal.style.display = "none";
}

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
	document.getElementById('search-results').style.display = "block";
}

// window.addEventListener("click", function(event) {
// 	if (event.target == document.getElementById('search-results')) {
//     document.getElementById('search-results').style.display = "none";
//   }
// 	});

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
	document.getElementById('search-results').style.display = "none";
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

	let dCal = getDaily();
	let pCal = caloriePerc(dCal, calTot);
	const pBar = new ProgressBar(document.querySelector('.barWrap'), pCal);

	count++;
	i++;

	clearForm();
}

function clearForm () {
	document.getElementById('foodName').value = "";
	document.getElementById('calServe').value = "";
	document.getElementById('servings').value = "";
}

// PROGRESS BAR

function getDaily(){
	let dailyLimit = document.getElementById('recCal').value;;
	console.log(dailyLimit);
	return dailyLimit;
}


function caloriePerc(dailyLimit, calTotal){
	let dailyPerc = (calTotal/dailyLimit)*100;
	dailyPerc = Math.round(dailyPerc *100) / 100;
	return dailyPerc;
}

class ProgressBar{
	constructor (barWrapElement, value=0) {
		this.valueProgPerc = barWrapElement.querySelector('.progPerc');
		this.valueProgBar = barWrapElement.querySelector('.progBar');
		this.changeBar(value);
	}

	changeBar(newProg){

		this.value = newProg;
		this.update();
	}

	update(){
		const perc = this.value + '%';
		if(this.value <= 100){
			this.valueProgBar.style.width = perc;
			this.valueProgPerc.textContent = perc;
		}
		else{
			this.valueProgPerc.textContent = perc;
			this.valueProgBar.style.width = "100%";
		}

	}
}

const pBar = new ProgressBar(document.querySelector('.barWrap'), 0);
