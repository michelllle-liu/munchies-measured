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
	calServ[i] = document.getElementById('calServe).value;
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
