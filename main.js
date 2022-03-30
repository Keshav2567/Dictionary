let text = document.getElementById('text');
let submitBtn = document.getElementById('submitBtn');
let info = document.getElementById('info')
let word = document.getElementById('word');
let definition = document.getElementById('definition');
let exampleDiv = document.querySelector('.example');
let example = document.getElementById('example');
let tryDiv = document.querySelector('.try');
let trySpan = document.getElementById('try');

submitBtn.addEventListener('click', buttonHandeler);

function buttonHandeler() {
	//Creating a new XHR object
	let xhr = new XMLHttpRequest();
	//Changes the link according to the searched word
	let link = `https://api.dictionaryapi.dev/api/v2/entries/en_US/` + text.value;

	xhr.open('GET', link, true);

	xhr.onload = function() {
		//Parses the JSON text into readable object
		let parsed = JSON.parse(this.responseText);

		try {
			info.style = 'display: block;';
			exampleDiv.style = 'display: block;';
			tryDiv.style = 'display: none;';
			//Gets the definition from the object
			let definitionValue = parsed[0].meanings[0].definitions[0].definition;
			//Gets the example from the object
			let exampleValue = parsed[0].meanings[0].definitions[0].example;

			//Adds the HTML to the element
			word.innerHTML = text.value;
			definition.innerHTML = definitionValue;

			//If example is defined it'll pop up
			if (exampleValue != undefined) {
				example.innerHTML = exampleValue;
			}
			//Otherwise it won't show
			else {
				exampleDiv.style = 'display: none;';
			}

		}
		//If some error occurs this will be executed
		catch (e) {
			exampleDiv.style = 'display: none;';
			tryDiv.style = 'display: block;';
			word.innerHTML = text.value;
			definition.innerHTML = parsed.message;
			trySpan.innerHTML = parsed.resolution;
		}
	}
	xhr.send();
}
