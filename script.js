//ref HTML -> affichage de depart d'une porte fermée stockée dans une variable doorImage1/2/3
let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');

//ref HTML -> affichage de depart d'un bouton 'Good luck' stocké dans une variable startButton
let startButton = document.getElementById('start');

//Pour chaque image space/beach/bot, le stocker dans une variable
let botDoorPath = "https://content.codecademy.com/projects/chore-door/images/robot.svg";
let beachDoorPath = "https://content.codecademy.com/projects/chore-door/images/beach.svg";
let spaceDoorPath = "https://content.codecademy.com/projects/chore-door/images/space.svg";

let closedDoorPath = "https://content.codecademy.com/projects/chore-door/images/closed_door.svg";

//variable contenant le nombre de porte fermée
let numClosedDoors = 3;

//trois variables déclarant le statut d'une porte ouverte (à définir) -> ca sera random
let openDoor1; 
let openDoor2;
let openDoor3;

//variable declarant que le jeu est en cours avec 'true'
let currentlyPlaying = true;

//fonction renvoyant "true" si l'image est le robot, sinon "false"
const isBot = (door) => {
  if(door.src === botDoorPath){
 return true;
  } else {
  return false;
}
}

//fonction renvoyant "true" si l'image n'est pas une porte fermée, sinon "false" => si ce n'est pas une porte fermée ca veut dire que la porte a ete cliquée
const isClicked = (door) => { 
  if(door.src === closedDoorPath) {
  return false;
  } else {
  return true;
}
}

//fonction qui reduit le nombre de porte fermee et verifie soit le nombre de porte qui est fermée est 0 dans ce cas on affiche le bouton  sur 'win', soit l'image est un robot alors
const playDoor = (door) => { 
  numClosedDoors--;
  if (numClosedDoors === 0){
      gameOver('win');
  }else if (isBot(door)){
    gameOver('lose');
}
}

//fonction qui determine un nombre aleatoire en fonction des portes qu'il reste à ouvrir et génere les images qui se trouvent ainsi derriere chaque porte
const randomChoreDoorGenerator = () => { 
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
   if(choreDoor === 0){
openDoor1 = botDoorPath;
openDoor2 = beachDoorPath;
openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
openDoor2 = botDoorPath;
openDoor1 = beachDoorPath;
openDoor3 = spaceDoorPath;
  } else { (choreDoor === 2)
openDoor3 = botDoorPath;
openDoor1 = beachDoorPath;
openDoor2 = spaceDoorPath;
}
}

//fonction qui se declenche des que l'on clique sur une porte. Si la porte (correspondant) n'a pas été cliquée et qu'on est en train de jouer => La porte s'ouvre sur l'openDoor1/2/3 correspondant selon la configuration a été determinée par la fonction random. ET on déclenche playDoor qui reduit le nombre de porte fermée et s'occupe de la configuration du bouton win ou lose.
door1.onclick = () => {
  if(currentlyPlaying && !isClicked(door1)) {
  doorImage1.src = openDoor1;
  playDoor(door1);
  }
  }

door2.onclick = () => {
  if(currentlyPlaying && !isClicked(door2)) {
  doorImage2.src = openDoor2;
  playDoor(door2);
  }
  }

door3.onclick = () => {
  if(currentlyPlaying && !isClicked(door3)) {
  doorImage3.src = openDoor3;
  playDoor(door3);
  }
  }

//a chaque clique sur le bouton 'Good luck' et que l'on est pas en train de jouer il declenche la fonction startRound
  startButton.onclick = () => {
  if (!currentlyPlaying) {
  startRound();
  }
  }

//fonction qui remet à 0 le jeu
const startRound = () => {
  door1.src = closedDoorPath;
  door2.src = closedDoorPath;
  door3.src = closedDoorPath;
  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = 'Good Luck !';
  //fonction qui declenche le random
  randomChoreDoorGenerator();
}

//fonction qui change l'affichage du bouton selon le resultat de la condition playDoor
  const gameOver = (status) => {
    if (status === 'win'){
      startButton.innerHTML = 'You win! Play again?';
    }else{ (status === 'lose')
      startButton.innerHTML = 'Game over! Play again?';
    }
    currentlyPlaying = false;
    }

//fonction qui remet a 0 si 3 portes sont ouvertes (apres tour complet)
startRound();