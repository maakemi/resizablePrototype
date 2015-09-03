var textToBeDisplayed, oldWidth, countTech = 3;
var resizeInt = null;

/*
Function that detects resize event on textArea
source: http://jsfiddle.net/gbouthenot/D2bZd/
*/
var textareaResize = function(source, dest1, dest2) {
    
    
    // the handler function
    var resizeEvent = function() {
        dest1.outerWidth( source.outerWidth() );       
        dest2.outerWidth( source.outerWidth() );
        console.log(source);
       
        recomputeText();
    };
    if(resizeInt==null)
   resizeInt = setInterval(resizeEvent, 1000/15);
    
    // This provides a "real-time" (actually 15 fps)
    // event, while resizing.
    // Unfortunately, mousedown is not fired on Chrome when
    // clicking on the resize area, so the real-time effect
    // does not work under Chrome.
    source.on("mousedown", function(e) {       
        resizeInt = setInterval(resizeEvent, 1000/30);
    });
    
     source.on("onmousemove", function(e) {       
        resizeInt = setInterval(resizeEvent, 1000/30);
    });

    // The mouseup event stops the interval,
    // then call the resize event one last time.
    // We listen for the whole window because in some cases,
    // the mouse pointer may be on the outside  the textarea.
   /* $(window).on("mouseup", function(e) {                
        if (resizeInt !== null) {
            clearInterval(resizeInt);
        }        
        resizeEvent();
    });
    $(window).on("mousedown", function(e) { 
        if((textToBeDisplayed!=$('#txText').val()) && (oldWidth!=$('#tech0').width)){
            resizeInt = setInterval(resizeEvent, 1000/30);
            console.log("move");
        }
    });*/
};


/* Needed to detect resize event on textArea
source: http://jsfiddle.net/gbouthenot/D2bZd/
*/

//Change this function when add more techniques

//textareaResize($("#tech0"), $("#tech1"), $("#tech2"));
 


/*  @What: Function that sets new font family for the text 
    @When: event performs when changes option on the combobox
*/

$("#selectFont").change(function (){
    for(var i=0;i<countTech;i++){
        var selector = "#tech"+i;
        $(selector).css("font-family", $("#selectFont option:selected").text());
    }
    recomputeText();
});

/*  @What: Function that performs "Set Text" button action for entering the <enter> key on textBox
    @When: event needed to set a new word to the box   
*/

$('#txText').keypress(function (e) {
     var key = e.which;
     if(key == 13)  
      {
        btTextOnClick(); 
      }
    }); 

function onChangeMinFontSize(){
    recomputeText();    
}

function onChangeWordAbbreviation(){           
    setFontSize(textToBeDisplayed, "#display");
    /*switch(+$("#selectAbbTechnique").val()) {
    case 0:                
        return dropVowels(word, wordpx, nodeWidth);
        break;
    case 1:                
        return truncation(word, wordpx, nodeWidth);
        break;
    case 2:                
        return truncationKeepEnd(word, wordpx, nodeWidth);
        break;
    } */          
}


/*  @What: Function that calculates the width of a given word and return it
    @When: needs to get a word width
    PS. Dont forget to set the same font style for span #testArea
*/

function getWordSize(word, newFontSize) {
    $("#testArea").css("font-size", newFontSize);
    var span = document.getElementById("testArea");
    span.innerHTML = word;    
    return(span.offsetWidth)
}

function btClearTextOnClick(){
    
    clearInterval(resizeInt);
    resizeInt = null;
    
    $('#txText').val("");
    textToBeDisplayed = $('#txText').val();
    $("#lbText").css("visibility", "hidden");
    for(var i=0;i<countTech;i++){
        var selector = "#tech"+i;
        $(selector).text(textToBeDisplayed);
        $(selector).css("visibility", "hidden");      
        $(selector).css("width", "20px");   
     }

}


/*  @What: Function that performs "Set Text" button action
    @When: event needed to set a new word to the box    
*/

function btTextOnClick(){
    
    textareaResize($("#tech0"), $("#tech1"), $("#tech2"));
    
    if($('#txText').val()!=""){
        textToBeDisplayed = $('#txText').val();
        $("#lbText").css("visibility", "visible");            
        for(var i=0;i<countTech;i++){
            var selector = "#tech"+i;
            $(selector).text(textToBeDisplayed);
            $(selector).css("visibility", "visible");
            recomputeText();
        }
    }
}

/*  @What: Function that calculates text font size in order to fit the box size
    @When: Function should be called everytime there is a change on the text, the box size, the font family, etc.    
    word - the word/text to be displayed in the box
    display - the box receiving the word/text   
    
*/

function setFontSize(word, display, minFontSize){
   $("#testArea").css("font-family", $(display).css('font-family'));    
    var fontSize =  parseInt($(display).css('font-size'));
    $("#testArea").css("font-size", fontSize);
    var displayWidth = parseInt($(display).css('width'));    
    var wordWidth = getWordSize(word, fontSize);
    
    if (getWordSize(word, fontSize+1) > displayWidth)
        while(getWordSize(word, fontSize) > displayWidth-getWordSize("W", fontSize))
        {
            fontSize = parseInt(fontSize) - 1;
           
        }
    else if (getWordSize(word, fontSize) < displayWidth)
        while(getWordSize(word, fontSize+1) < displayWidth-getWordSize("W", fontSize+1))
        {
            fontSize = parseInt(fontSize) + 1;
           
        }        
    $(display).css("font-size", fontSize);    
}

function recomputeText(){
    for(var i=0;i<countTech;i++){
        var selector = "#tech"+i;
        setFontSize(textToBeDisplayed, selector, $("#minFontSize").val());
    }
}