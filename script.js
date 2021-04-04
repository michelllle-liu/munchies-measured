/*async function search(event){   //none of this code actually works
  event.preventDefault();
  
  const form = event.target.elements;

  const query = form['food1'].value;//get text from form

  const response = await fetch(
    `https://nutrition-api.esha.com/foods?query=${query}&start=0&count=25&spell=true`, 
    {
      method:"GET",
      headers: {
        "Accept":"application/json",
        "Ocp-Apim-Subscription-Key":"7504fb97bd1d4620a87a42c5d33a5b71"
      },
      redirect:'follow'              
    }       
  );

  event.target.reset(); // clears the form fields
  const data = await response.json(); 
  displayResults(data);
  
}

function displayResults(data){

}
*/


/*async function loadFoods(event){

  const form = event.target.elements;
  const query = form['food1'].value;//get text from form

  let url= `https://nutrition-api.esha.com/foods?query=${query}&start=0&count=25&spell=true`;
  
  var xhttp = new XMLHttpRequest();   //tried using ajax
  xhttp.open("GET", url, true);
  
  xhttp.setRequestHeader("Accept","application/json");
  xhttp.setRequestHeader("Ocp-Apim-Subscription-Key","7504fb97bd1d4620a87a42c5d33a5b71");
  xhttp.send(`query=${query}&start=0&count=25&spell=true`);
  drawTable(records);
}
*/

/*function drawTable(records){
    let result = document.querySelector('#result');
    //add html code inside of result
    let html = '';// create html string
    for(let record of records){
        //build html string
        html += `<tr>
          <td>${record.description}</td> 
        </tr>`;
    }
    result.innerHTML = html;//add html string to DOM
}*/
/*<script type="text/javascript"> //has to go in index.html
 $(document).ready(function() {
        var params = {
            // Request parameters
            "query": "banana",
            "start": "0",
            "count": "25",
            "spell": "true",
        };
      
        $.ajax({
            url: "https://nutrition-api.esha.com/foods?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Accept","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}");
            },
            type: "GET",
            // Request body
            data:
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    });
    </script>
    */
    
    /*<script type="text/javascript">   //got this from the sample code of the api website, it uses jquery
  let query="banana";   //tried hardcoding it
  let url=`https://nutrition-api.esha.com/foods?query=${query}&start=0&count=25&spell=true`;

 $(document).ready(function() {
        var params = {
            // Request parameters
            "query": "banana",
            "start": "0",
            "count": "25",
            "spell": "true",
        };
      
        $.ajax({
            url: "https://nutrition-api.esha.com/foods?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Accept","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}");
            },
            type: "GET",
            // Request body
            data:$.get(url,function(records){
               records = response.json();
              drawTable(records);
            }),
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    });
   

  function drawTable(records){
    let result = document.querySelector('#result');
    //add html code inside of result
    let html = '';// create html string
    for( let record of records){
        //build html string
        html += `<tr>
          <td>${record.description}</td> 
        </tr>`;
    }
    result.innerHTML = html;//add html string to DOM
}
</script>
  
*/
