// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("modalButton");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

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

  if(person.activity==="LowModerate"){
    factor=1.4;}
    
  if(person.activity==="VeryActive"){
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

  document.getElementById("dailyReq").innerHTML=`Daily Calorie Reqirement is ${dailyIntake} calories`;
}
