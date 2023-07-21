const gameImage = document.querySelector('.game-image');
const gameTitle = document.querySelector('.game-title');
const gameDeveloper = document.querySelector('.game-developer');
const gameEditor = document.querySelector('.game-editor');
const gameReleased = document.querySelector('.game-released');
const gameDescription = document.querySelector('.game-description');
const health = document.querySelector('.health');
const mana = document.querySelector('.mana');
const leftPage = document.querySelector('.left-page');
const rigthPage = document.querySelector('.rigth-page');
const loadingSkeletons = document.querySelectorAll('.loading-skeleton');
var cardsContainer = document.querySelector('.cards-container');
var contador = 0;
var heroes = {};
var vidaMaxima = 0;
var manaMaximo = 0
const API = 'https://api.opendota.com/api/heroStats';
const page = 'https://api.opendota.com';
leftPage.style.display = "none";
const options = {
	method: 'GET'
};

async function fetchData( urlApi){
	const response = await fetch(urlApi, options);
	const data = await response.json();
	// Desaparecer el loading squeleton
	return data;
}

function imgLoadingSkeleton(){
	const cardImages = document.querySelectorAll('.hero-card-img');
	cardImages.forEach( img =>{
		img.addEventListener('load',()=>{
			const siblingDiv = img.nextElementSibling;
			siblingDiv.classList.add("hidden");
			siblingDiv.remove();
			img.classList.remove('hidden');
		})
	});
}

function printHeroes(){
	let heroCard = `
	${heroes.map(heroe =>`
	<div class="hero-card">
		<div>
			<img src="${page}${heroe.img}" class="hero-card-img hidden" alt="${heroe.localized_name}">
			<div class="card-image-skeleton"></div>
		</div>
		<div>
			<div class="health-bar">
				<div class="health" style="width:${Math.trunc(((heroe.base_str*22 + 120)/vidaMaxima)*100)}%"></div>
			</div>
			<div class="mana-bar">
				<div class="mana" style="width:${Math.trunc(((heroe.base_int*12 + 75)/manaMaximo)*100)}%"></div>
			</div>
		</div>
		<div><p class="hero-name">${heroe.localized_name}</p></div>
		<div><img src="images/${heroe.primary_attr}.webp" alt="attribute"></div>
		<div>${heroe.roles.map(rol =>`<p>${rol}</p>`).join('')}</div>
		<div><img src="images/${heroe.attack_range < 176  ? 'melee.png' : 'ranger.png'}" alt="attack-type"></div>
	</div>
	`).slice(contador*20,(contador+1)*20).join('')}
	`;
	cardsContainer.innerHTML = heroCard;
}

window.addEventListener('load', (event) => {
	
	(async function fetchHeroes(){
		try{
			heroes = await fetchData(API);
			vidaMaxima = Math.max(...heroes.map(heroes => ( heroes.base_str 	* 22) + 120));
			manaMaximo = Math.max(...heroes.map(heroes => ( heroes.base_int 	* 12) + 75));
			contador = 0;
			loadingSkeletons.forEach(element => {
				element.remove();
			  });
			printHeroes();
			imgLoadingSkeleton();
		}catch (error){
			console.log(error);
		}
	})();
});

leftPage.addEventListener("click", ()=>{
	contador--;
	printHeroes();
	imgLoadingSkeleton();
	if(contador != 6)rigthPage.style.display = "flex";
	if(contador == 0)leftPage.style.display = "none";
	
});

rigthPage.addEventListener("click", ()=>{
	contador++;
	printHeroes();
	imgLoadingSkeleton();
	if(contador == 6)rigthPage.style.display = "none";
	if(contador != 0)leftPage.style.display = "flex";
	
});