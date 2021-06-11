	const creator = document.querySelector(".creator");
	const creatorView = document.querySelector(".creatorView");	
	const favourites = document.querySelector(".favourites");
	const favouritesView = document.querySelector(".favouritesView");	
	const heading = document.querySelector(".heading");
	const headingText = heading.querySelectorAll('h1');
	const instruction = document.querySelector(".instruction");
	let burgerArr = [];
	const canvas = document.createElement("CANVAS");
	const divCanva = document.querySelector(".canva");
	divCanva.appendChild(canvas);
	const ctx = canvas.getContext("2d");
	canvas.className = "canvas"
	canvas.width = 286; //286
	canvas.height = 421; //421
	let recipesArr = [];
	const btn = document.querySelectorAll("button");
	let tempHeight = canvas.height;
	let imgsArr = [];
	let imgCount = 0;

	function preparation(array){
		this.array = array;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		tempHeight = canvas.height;		
		for(let i=0; i<this.array.length; i++){
			let image = new Image();
			imgsArr.push(image);			
			image.onload = function (){
				imgCount++;
				if(imgCount==imgsArr.length){
					for(let j=0; j<imgsArr.length; j++){
						let ingredientName = imgsArr[j].src.substr(56);
						console.log(ingredientName)
						ingredientName = ingredientName.substr(0,ingredientName.length-4);						
						if(ingredientName=='tomato' || ingredientName=='lettuce' || ingredientName=='cheese'){
							tempHeight = tempHeight	- 10;
						}else{
							tempHeight = tempHeight-imgsArr[j].height;
						}	
					ctx.drawImage(imgsArr[j], 0, tempHeight);
					}
				}
			}			
			if(this.array[i]=='bottomBun'){
				image.src = 'images/Burger/bottom-bun.png';
			}
			if(this.array[i]=='topBun'){
				image.src = 'images/Burger/top-bun.png';
			}
			if(this.array[i]=='cheese'){
				image.src = 'images/Burger/cheese.png';
			}
			if(this.array[i]=='lettuce'){
				image.src = 'images/Burger/lettuce.png';
			}
			if(this.array[i]=='tomato'){
				image.src = 'images/Burger/tomato.png';
			}
			if(this.array[i]=='meat'){
				image.src = 'images/Burger/burger.png';
			}
			if(this.array[i]=='fish'){
				image.src = 'images/Burger/fish.png';
			}
		}	
	}	

	for(let i=0; i<btn.length; i++){
		btn[i].addEventListener("click", function(){
			instruction.innerText = "";
			imgsArr = [];
			imgCount = 0;
			let ingredient = btn[i].id;
			ingredient = ingredient.slice(0,-1);
			let value = btn[i].parentElement.parentElement.querySelector('p');
			let temp = parseFloat(value.innerText);
			const divSave = document.querySelector(".save");			
			if(btn[i].innerText=='+'){
				if(burgerArr.lastIndexOf('topBun')>=0){
					return 0;
				}
				if(burgerArr.length==0&&ingredient=='bottomBun'){
					burgerArr.push(ingredient);
					value.innerText = temp + 1;
					return preparation(burgerArr);
				}else if(burgerArr.length==0){
					instruction.innerText = "First item must be bottom bun.";
					instruction.style.color = 'red';
					return 0;
				}
				if(burgerArr.lastIndexOf('bottomBun')>=0&&ingredient=='bottomBun'){
					instruction.innerText = "There can be only one the bottom bun.";
					instruction.style.color = 'red';
					return 0;
				}
				if(burgerArr.length<=8&&ingredient=='topBun'){
					const btnSave = document.createElement("button");
					const inputSave = document.createElement("INPUT");
					const div = document.createElement("div");
					const inputDiv = document.createElement("div");
					const btnDiv = document.createElement("div");
					div.className = "row text-center";
					inputSave.setAttribute("type", "text");										
					divSave.appendChild(div);
					div.appendChild(inputDiv);
					div.appendChild(btnDiv);
					inputDiv.appendChild(inputSave);
					btnDiv.appendChild(btnSave);
					btnSave.innerText = "Save";
					btnSave.className = "btnSave";
					inputDiv.className = "col-12 my-1";
					btnDiv.className = "col-12 my-1";
					inputSave.placeholder = "Burger name";									
					btnSave.addEventListener("click", function(){
						let inputValue = inputSave.value.trim();
						instruction.innerText = "";
						if(inputValue==""){
							inputSave.value = "";
							instruction.innerText = "You have to name your burger.";
							instruction.style.color = 'red';	
							return 0;
						}				
						saveCanvas();
						favouritesView.classList.remove('d-none');
						creatorView.classList.add('d-none');
						headingText[0].innerText = "Favourites";
						headingText[1].innerText = "Burger";
						divSave.removeChild(divSave.childNodes[1]);
						burgerArr = [];
						preparation(burgerArr);			
						for(let j=0; j<btn.length; j++){
							let value2 = btn[j].parentElement.parentElement.querySelector('p');
							value2.innerText = 0;
						}
					})				
					burgerArr.push(ingredient);
					value.innerText = temp + 1;
					return preparation(burgerArr);
				}else if(burgerArr.length==8){
					instruction.innerText = "The maximum number of items is 9 including buns. Last item must be top bun.";
					instruction.style.color = 'red';
					return 0;
				}
				value.innerText = temp + 1;
				burgerArr.push(ingredient);
			}else{
				if(ingredient=='topBun'&&divSave.childNodes[1]){
					divSave.removeChild(divSave.childNodes[1]);
					burgerArr.pop();
					value.innerText = temp - 1;
					return preparation(burgerArr);
				}
				if(value.innerText<=0&&burgerArr.length==0){
					instruction.innerText = "Add items to create Your burger. First item must be bottom bun. To finish Your burger choose top bun.";
					instruction.style.color = '#68bdfb';
					return 0;
				}
				if(value.innerText<=0){
					return 0;
				}
				if(burgerArr.length>1&&ingredient=='bottomBun'){
					instruction.innerText = "You cannot remove the bottom bun while there is another product on it.";
					instruction.style.color = 'red';
					return 0;
				}
				if(burgerArr.lastIndexOf('topBun')>0&&ingredient!=='topBun'){
					return 0;
				}else{
					let lastIndex = burgerArr.lastIndexOf(ingredient);
					burgerArr.splice(lastIndex, 1);
					value.innerText = temp - 1;
					if(lastIndex==0){
						instruction.innerText = "Add items to create Your burger. First item must be bottom bun. To finish Your burger choose top bun.";
						instruction.style.color = '#68bdfb';
					}
				}
			}
			preparation(burgerArr);
		})
	}

	function saveCanvas() {
		const input = document.querySelector("input");
		//const value = input.value;
		const url  = canvas.toDataURL();
		const img = document.createElement("img");
		const div = document.createElement("div");
		div.className = "col-12 col-md-6 col-lg-4";
		const burgerName = document.createElement("p");
		burgerName.innerText = input.value;
		const divRow = document.createElement("div");
		divRow.className = "row";
		const divImg = document.createElement("div");
		const divText = document.createElement("div");
		const divBtn = document.createElement("div");
		divImg.className = "col-12";
		divText.className = "col-12";
		divBtn.className = "col-12";
		const btnRemove = document.createElement("button");
		btnRemove.innerText = "Remove";
		btnRemove.className = "btnRemove";
		
		img.src = url;
		img.alt = input.value;
		recipesArr.push(img);
		favouritesView.appendChild(div);
		div.appendChild(divRow);
		divRow.appendChild(divImg);
		divRow.appendChild(divText);
		divRow.appendChild(divBtn);
		divImg.appendChild(img);
		divText.appendChild(burgerName);
		divBtn.appendChild(btnRemove);
		
		btnRemove.addEventListener("click", function(){
			div.remove();
			recipesArr.pop();
			if(recipesArr.length==0){
				favouritesView.classList.add('d-none');
				creatorView.classList.remove('d-none');
				headingText[0].innerText = "Burger";
				headingText[1].innerText = "Creator";
			}
		})  
	}

	favourites.addEventListener("click", function(){
		favouritesView.classList.remove('d-none');
		creatorView.classList.add('d-none');		
		headingText[0].innerText = "Favourites";
		headingText[1].innerText = "Burger";
	})

	creator.addEventListener("click", function(){
		favouritesView.classList.add('d-none');
		creatorView.classList.remove('d-none');
		headingText[0].innerText = "Burger";
		headingText[1].innerText = "Creator";
	})