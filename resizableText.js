

/*
Function that detects resize event on textArea
source: http://jsfiddle.net/gbouthenot/D2bZd/
*/
var textareaResize = function(source, dest) {
    var resizeInt = null;
    
    // the handler function
    var resizeEvent = function() {
        dest.outerWidth( source.outerWidth() );
        dest.outerHeight(source.outerHeight());
        setFontSize($("#txText").val(), "#display");
    };

    // This provides a "real-time" (actually 15 fps)
    // event, while resizing.
    // Unfortunately, mousedown is not fired on Chrome when
    // clicking on the resize area, so the real-time effect
    // does not work under Chrome.
    source.on("mousedown", function(e) {
        console.log("DOWN");
        resizeInt = setInterval(resizeEvent, 1000/5);
    });
    
     source.on("onmousemove", function(e) {
        console.log("MOVE");
        resizeInt = setInterval(resizeEvent, 1000/5);
    });

    // The mouseup event stops the interval,
    // then call the resize event one last time.
    // We listen for the whole window because in some cases,
    // the mouse pointer may be on the outside of the textarea.
    $(window).on("mouseup", function(e) {        
        if (resizeInt !== null) {
            clearInterval(resizeInt);
        }
        console.log("UP");
        resizeEvent();
    });
};


/* Needed to detect resize event on textArea
source: http://jsfiddle.net/gbouthenot/D2bZd/
*/
textareaResize($("#display"), $("#output"));

/*  @What: Function that sets new font family for the text 
    @When: event performs when changes option on the combobox
*/

$("#selectFont").change(function (){
    $("#display").css("font-family", $("#selectFont option:selected").text());
    setFontSize($("#txText").val(), "#display");
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


/*  @What: Function that performs "Set Text" button action
    @When: event needed to set a new word to the box    
*/

function btTextOnClick(){
    $("#display").text($("#txText").val());
    $("#display").css("visibility", "visible");
    $("#lbText").css("visibility", "visible");
    setFontSize($("#txText").val(), "#display");
}

/*  @What: Function that calculates text font size in order to fit the box size
    @When: Function should be called everytime there is a change on the text, the box size, the font family, etc.    
    word - the word/text to be displayed in the box
    display - the box receiving the word/text   
    
*/

function setFontSize(word, display){
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
    console.log(fontSize);
}