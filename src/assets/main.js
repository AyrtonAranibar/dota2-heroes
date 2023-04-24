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
	return data;
}


window.addEventListener('load', (event) => {
	(async function fetchHeroes(){
		try{
			heroes = await fetchData(API);
			vidaMaxima = Math.max(...heroes.map(heroes => ( heroes.base_str 	* 22) + 120));
			manaMaximo = Math.max(...heroes.map(heroes => ( heroes.base_int 	* 12) + 75));
			contador = 0;
			printHeroes();
		}catch (error){
			console.log(error);
		}
	})();
});

leftPage.addEventListener("click", ()=>{
	contador--;
	printHeroes();
	if(contador != 6)rigthPage.style.display = "flex";
	if(contador == 0)leftPage.style.display = "none";
	
});

rigthPage.addEventListener("click", ()=>{
	contador++;
	printHeroes();
	if(contador == 6)rigthPage.style.display = "none";
	if(contador != 0)leftPage.style.display = "flex";
	
});