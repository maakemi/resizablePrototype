
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
        resizeInt = setInterval(resizeEvent, 1000/15);
    });

    // The mouseup event stops the interval,
    // then call the resize event one last time.
    // We listen for the whole window because in some cases,
    // the mouse pointer may be on the outside of the textarea.
    $(window).on("mouseup", function(e) {
        if (resizeInt !== null) {
            clearInterval(resizeInt);
        }
        resizeEvent();
    });
};
    
textareaResize($("#display"), $("#output"));


$("#selectFont").change(function (){
    $("#display").css("font-family", $("#selectFont option:selected").text());
    setFontSize($("#txText").val(), "#display");
});


$('#txText').keypress(function (e) {
 var key = e.which;
 if(key == 13)  
  {
    btTextOnClick(); 
  }
}); 


function getWordSize(word) {
    var span = document.getElementById("testArea");
    span.innerHTML = word;    
    return(span.offsetWidth)
}

function btTextOnClick(){
    $("#display").text($("#txText").val());
    $("#display").css("visibility", "visible");
    $("#lbText").css("visibility", "visible");
    setFontSize($("#txText").val(), "#display");
}

function setFontSize(word, display){
   $("#testArea").css("font-family", $(display).css('font-family'));    
    var fontSize = $(display).css('font-size');
    $("#testArea").css("font-size", fontSize);
    var displayWidth = parseInt($(display).css('width'));    
    var wordWidth = getWordSize(word);
    
    if (getWordSize(word) > displayWidth)
        while(getWordSize(word) > displayWidth-getWordSize("W"))
        {
            fontSize = parseInt(fontSize) - 1;
            $("#testArea").css("font-size", fontSize);
        }
    else if (getWordSize(word) < displayWidth)
        while(getWordSize(word) < displayWidth-getWordSize("W"))
        {
            fontSize = parseInt(fontSize) + 1;
            $("#testArea").css("font-size", fontSize);
        }        
    $(display).css("font-size", fontSize);
}
