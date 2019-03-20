	
//Get the search text field from the HTML document 
const searchBox = document.getElementById("search");
const getHeaderTag = document.querySelector('#search-box h1');
const showCode = document.querySelector(".show-code");
const closeCodeBox = document.querySelector(".close-code");
const codeBox = document.getElementById("view-code");
const theHtml = document.body.innerHTML;

showCode.addEventListener("click",() => codeBox.setAttribute("class","code-snip"));
closeCodeBox.addEventListener("click",() => {
	let hideTheBox = () => codeBox.setAttribute("class","hide-it");
	codeBox.setAttribute("class","fade-it");
	setTimeout(hideTheBox, 2000);
	
});

let serialGenerator = () => {
	let randomSet = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	let createSerial = '' ; 
	for(let i = 0; i < randomSet.length; i++){
		randomNumberCount = Math.floor(Math.random() * randomSet.length);
		createSerial += randomSet[randomNumberCount];
	}

	return createSerial;
}


if(document.cookie.length != 39 && document.cookie.length == 0){
	//console.log(document.cookie);	
	let theModelBox = () => {

		let htmlMarkUp = '<section class="modal-box">\
					<article class="instructions">\
					<span class="close-box"> X </span>\
						<h2>\
							<span>\
								<i class="fas fa-exclamation-triangle"></i>\
							</span>\
							Filter Note\
						</h2>\
						<p> In the search field above filter through the employee index by names or profession.  </p>\
						<p class="cookie_law"> This site uses cookies and other tracking technologies to assist with navigation and your ability to provide feedback, analyse your use of our products and services, assist with our promotional and marketing efforts, and provide content from third parties. <a href="https://www.cookielaw.org/how-we-use-cookies/" target="_blank">Cookie Policy</a> </p>\
					</article>\
					</section>';

		return htmlMarkUp;
	}


	document.body.innerHTML = theHtml + theModelBox();

	const exitButton = document.querySelector('.close-box');
	const filterNote = document.querySelector('.instructions');

	exitButton.addEventListener("click",function(){
		console.log("drug dealers ");
		filterNote.setAttribute("class", "close instructions");
		document.cookie = `id=${serialGenerator()}; Thu, 30 Jan 2020 12:32:11 UTC ; path= /`;
		let reloadCode = () => location.reload();
		setTimeout(reloadCode, 1000);
		console.log(document.cookie);
	});



}

//console.log("Random Number : " + ));
let ajaxSearch = () => {

	//Create AJAX request object
	const request = new XMLHttpRequest();

	//Grab the json file for server
	request.open("GET","json/employee_list.json");

	//Call on ready state and check if connection was successful
	request.onreadystatechange = function(){

		if( request.readyState === 4 && request.status === 200){

			// Grab all the JSON data and then parse .
			let employeeList = JSON.parse(request.responseText);

			//Create regualar expression for casesensitive field values 
			let regExp = new RegExp(searchBox.value, "i");

			if( searchBox.value.length != 0 ){	
				getHeaderTag.innerHTML = searchBox.value;
			}else{
				getHeaderTag.innerHTML = "Begin Typing for Results";
			}

			//Map through the json object
			let mapIt = employeeList.map(function(item){

					//Check if value in the json file returns a match 
					if( item.name.search(regExp) != -1 || item.title.search(regExp) != -1){
						let output = `<article class="employee_card group">\
						<img src="images/${item.img}.jpg" alt="${item.name}" />\
						<div class="content-info"> <h2>${item.name}</h2>\
						<h3> Profession : ${item.title} </h3>\
						<p> Salary : $${item.salary} </p>\
						<p> Bio : ${item.bio} </p>\
						</div>\
						</article>`;

							return output;
					}

				});
			//Write all Mapped Json data to the DOM
			document.getElementById("search-container").innerHTML = mapIt.join("");
		}
	}

	request.send();
}

// Track search input Keystroke Event and call ajax Search function  
searchBox.addEventListener("keyup", ajaxSearch);
//document.cookie = `username=Test; expires=Wed, 30 Jan 2020 12:32:11 UTC; path=/`;
