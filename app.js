
    //select all cards inside a deck
let myCards = document.querySelectorAll(".card"); 

   // array contain a child <i>...
let figures =[]; 

  //decleare empty array to save open card 
let openedCards=[]; 

  // moves and stars count

let movesCounter = 0;

let starsCounter=3;

  //time variables
let seconds , minutes = 0;
let timerHandler;


// allow cards to be clicked then add it into figures array.. 

myCards.forEach(card => {

    card.addEventListener("click",openCards);
    
    let icons =card.children[0];
//adding icons shapes in array...
    figures.push(icons.className);

});

// put all functions and variables that we need to call it and reset it  when the game start

function  startGame (){

    seconds = 0;
    minutes = 0;
    movesCounter=0;
    starsCounter=3;
    openedCards=[]
    shuffleCards();
    cardFlip();
    closedailog();
    movesAndStarsCounter();

}

// flip cards by remove classes 
function  cardFlip(){

    myCards.forEach( card =>{

    card.classList.remove("open");
    card.classList.remove("show");
    card.classList.remove("match");

});

}


function  startTimer(){

        if (timerHandler==null) {

            timerHandler = setInterval(timer, 1000);
        }

        function timer(){
            
               seconds += 1;

          if(seconds > 60){

              seconds = 0;
              
              minutes += 1;

                } 
        
        document.getElementById("minuts").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;  
        } 
    }

function  stopTimer(){

        clearInterval(timerHandler);
        timerHandler=null;

   }


function  shuffleCards(){

       figures = shuffle(figures);
      
       let i = 0;
     
       myCards.forEach(card =>{

       let icons = card.children[0];

       icons.className = figures[i];
      
       i++;


        });
 }

function  openCards(){
if (this.classList.contains("show") ) { return; } 

//call startTimer() when user click on the first card...
    startTimer();

//  put a condition that don't allow open more than 2 cards in the single move
       if(openedCards.length< 2)  {

//flip card 
       this.classList.toggle("show");
       this.classList.toggle("open");

       openedCards.push(this);

      if (openedCards.length ==2){

        setTimeout(matchCards,1000);
}
}
}

function  matchCards(){

//  compare indexes for 2 opend card  if it's equle will add class match  ...

        if (openedCards.length == 2 ){

           let  firstOpenedCard = openedCards[0];
           let  secondOpenedCard = openedCards[1];

           let firstChildclass = firstOpenedCard.children[0].className;
           let secondChildclass = secondOpenedCard.children[0].className;
    
               if (firstChildclass == secondChildclass){

               firstOpenedCard.classList.add("match");
               secondOpenedCard.classList.add("match");
    }

               else {

               firstOpenedCard.className = "card";
               secondOpenedCard.className = "card";
    
               }

         openedCards = [];

         // after 2 cards open start to counting  a move..
    
    }

    // check for sure no any card open 
    let unOpendCards = document.querySelectorAll(".card:not(.match)");
    
    if (unOpendCards.length == 0){

    showdailog();
    
    }
    movesAndStarsCounter()
}

function movesAndStarsCounter () {

     document.querySelector(".moves").innerHTML =  movesCounter;

        let starS = document.querySelector(".stars");
        starS.innerHTML = "";

             for (let i = 0; i < starsCounter; i++){

                 let stars = "<li> <i class= 'fa fa-star'></i></li>";
                 
                   starS.innerHTML += stars;}
    
                   movesCounter += 1;

      if ( movesCounter <= 10 ){

           starsCounter = 3;
   
         }

    else if ( movesCounter <= 18){

            starsCounter=2;
         }

     else 

            starsCounter=1;
      
    }

 
function  showdailog(){

     let dilogBox = document.querySelector("#dialog-box");

     document.getElementById("showStars").innerText = starsCounter;
     document.getElementById("showminuts").innerText = minutes;
     document.getElementById("showSeconds").innerText = seconds;


     dilogBox.showModal();

      stopTimer();

}

 startGame();


function  closedailog(){

document.querySelector("#dialog-box").close();
     
 } 
 

// Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

