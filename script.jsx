document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function(e) {
    if(event.keyCode == 123) {
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
    return false;
    }
    }
var count = 0;
var disappearCard = 0;
var randomImag = [];
var hintCount=0;
var srcOfImags = ["https://res.cloudinary.com/dvwnmwk2z/image/upload/v1551255847/2.png", 'https://res.cloudinary.com/dvwnmwk2z/image/upload/v1551255847/2.png',
    'https://res.cloudinary.com/dvwnmwk2z/image/upload/v1551255847/5.png', 'https://res.cloudinary.com/dvwnmwk2z/image/upload/v1551255847/5.png',
    'https://res.cloudinary.com/dvwnmwk2z/image/upload/v1551255847/4.png', 'https://res.cloudinary.com/dvwnmwk2z/image/upload/v1551255847/4.png',
    'https://res.cloudinary.com/dvwnmwk2z/image/upload/v1551255847/6.png', 'https://res.cloudinary.com/dvwnmwk2z/image/upload/v1551255847/6.png',
    'https://res.cloudinary.com/dvwnmwk2z/image/upload/v1551255848/1.png', 'https://res.cloudinary.com/dvwnmwk2z/image/upload/v1551255848/1.png',
    'https://res.cloudinary.com/dvwnmwk2z/image/upload/v1551255847/3.png', 'https://res.cloudinary.com/dvwnmwk2z/image/upload/v1551255847/3.png']
var cards = document.getElementsByClassName("child");
cards = Array.from(cards);
//when game start must call 3 function
randomNmber();
viewAllImages();
setTimeout(hideAllImages, 400);
//function view all image
function viewAllImages() {
    var divs = document.getElementsByClassName("child");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.background = "white";
    }
    var Cards = document.getElementsByClassName("image");
    console.log(Cards.length);
    for (var i = 0; i < Cards.length; i++) {
        Cards[i].src = randomImag[i];
    }
}
//function hide all image
function hideAllImages() {
    console.log("hello from hidden");
    var divs = document.getElementsByClassName("child");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.background = "coral";
    }
    var Cards = document.getElementsByClassName("image");
    console.log(Cards.length);
    for (var i = 0; i < Cards.length; i++) {
        Cards[i].src = "https://res.cloudinary.com/dvwnmwk2z/image/upload/v1551255848/back.png";
    }
}
//function make random data
//this function to get random numder and full the randomImag array
function randomNmber() {
    for (var i = 0; i < srcOfImags.length; i++) {
        var rand = Math.floor(Math.random() * srcOfImags.length);
        randomImag.push(srcOfImags[rand]);
        srcOfImags.splice(rand, 1);
        i--;//lenght of array --1 so i will start from index 0 again so make i=-1 i++ then i=0(array upadted after remove element so you need to start from 0 agin)
    }
}
function start(){
    location.reload();
}
//this function to view image and hide it again (we user click on hint)
function hint() {
    console.log("hello from hint");
    hintCount++;
    console.log("hintCount",hintCount);
    if(hintCount<4){
        viewAllImages();
        setTimeout(hideAllImages, 300);
        var images = document.getElementsByClassName("hint");
        images[hintCount-1].style.visibility = "hidden";
    } 
}
//this function when player win view message
function win() {
    if (disappearCard == 6) {
        // alert("winner");
        console.log(document.getElementById("parent").childNodes);
        document.getElementById("parent").childNodes[1].append("you win");
    }
}
//function when user click on card
cards.map(function (elem) {
    elem.addEventListener("click", function () {
        console.log("hello from clickedCard");
        count++;
        showCard(elem);
        elem.classList.add("clicked");
        var cards = document.getElementsByClassName("clicked");
        //here check if user clicked on same card twice
        if (cards.length < count) {
            count--;
        }
        if (count == 2) {
            if (isSameImage(cards)) {
                setTimeout(deactive, 200);
                count = 0;
            }
            else {
                setTimeout(hidecard, 200);
                count = 0;
            }
        }
    })
})
//function hide the image and put backeimg 
function hidecard() {
    var cards = document.getElementsByClassName("clicked");
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.background = "coral";
        var c = cards[i].childNodes;
        c[1].src = "https://res.cloudinary.com/dvwnmwk2z/image/upload/v1551255848/back.png";
    }
    removeClicked();
}
//function make card hide and user can't click on it again
function deactive() {
    disappearCard++;
    var cards = document.getElementsByClassName("clicked");
    //2 not cards.lenght becouse if user r5m clicked before the cards disappear
    for (var i = 0; i < 2; i++) {
        cards[i].style.visibility = "hidden";
        var c = cards[i].childNodes;
        c[1].style.visibility = "hidden";
    }
    removeClicked();
    win();
}
//remove click class 
function removeClicked() {
    var cards = document.getElementsByClassName("clicked");
    for (var j = 0; j < cards.length; j++) {
        cards[j].classList.remove("clicked");
        j--;//lenght of array --1 so j will start from index 0 again so make j=-1 i++ then j=0(array upadted after remove element so you need to start from 0 agin)

    }
}
//function showcard (replace the style and image)
function showCard(elem) {
    elem.style.background = "white";
    var c = elem.childNodes;
    c[1].src = randomImag[c[1].id];
}
//function check data
function isSameImage(cards) {
    console.log("hello from is same image");
    console.log(cards.length);
    console.log(count)
    var i = cards[0].childNodes;
    var j = cards[1].childNodes;
    console.log(i);
    if (i[1].src === j[1].src) {
        console.log("two equal img");
        return true;
    }
    else {
        console.log("not equal img");
        return false;
    }
}
