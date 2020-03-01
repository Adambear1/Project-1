//All borrowed and augmented from https://www.w3schools.com/howto/howto_js_slideshow.asp

//MAIN WEBSITE SCRIPTS
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


//PORTFOLIO SCRIPTS

var targetInput = document.getElementById( "country" ),
    results = document.getElementById( "autocomplete-results" ),
    countryList = ['3727 E J St', '3601 S Gunnison St', '8515 E 35th St', '1719 S Durango St', 'adam', 'mike'];
    matches = []
    resultsCursor = 0;

targetInput.focus();

targetInput.addEventListener( "keydown", function( event ) {
    if ( event.keyCode == "13" ) {
        event.preventDefault();
    }
})

targetInput.addEventListener( "keyup", function( event ) {

    results.innerHTML = "";
    toggleResults( "hide" );

    if ( this.value.length > 0) {
        matches = getMatches( this.value );

        if ( matches.length > 0 ) {
            displayMatches( matches );
        }
    }
/*
Enter == 13
Arrow Up == 38
Arrow Down == 40
*/
    if ( results.classList.contains( "visible" ) ) {
        switch( event.keyCode ){
            case 13:
                targetInput.value = results.children[resultsCursor].innerHTML;
                toggleResults( "hide" );
                resultsCursor = 0;
                break;

            case 38:
                if ( resultsCursor > 0 ){
                    resultsCursor--;

                    moveCursor( resultsCursor );
                }
                break;

            case 40:
                if ( resultsCursor < this.matches.length - 1) ) {
                    resultsCursor++;

                    moveCursor( resultsCursor );
                }
                break;
        }
    }
} );

function toggleResults( action ) {
    if ( action == "show" ) {
        results.classList.add( "visible" );
    }
    else if ( action == "hide" ){
        results.classList.remove( "visible" );
    }
}

function getMatches( inputText ){
    var matchList = [];

    for ( var i = 0; i < countryList.length; i++ ) {
        if ( countryList[i].toLowerCase().indexOf( inputText.toLowerCase() ) != -1 ) {
            matchList.push( countryList[i] )
        }
    }

    return matchList;
}

function displayMatches( matchList ) {
    var j = 0;

    while ( j < matchList.length ) {
        results.innerHTML += '<li class="result">' + matchList[j] + '</li>';
        j++;
    }

    moveCursor( resultsCursor );

    toggleResults( "show" );
}

function moveCursor( pos ) {
    for ( var x = 0; x < results.children.length; x++ ) {
        results.children[x].classList.remove( "highlighted" );
    }

    results.children[pos].classList.add( "highlighted" );
}