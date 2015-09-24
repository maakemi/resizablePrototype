MIN_WORD_LENGTH = 0;

function dropVowels(word, wordSize, displayWidth) {          
    var index = word.length, 
        newWord, testWord;
    while (wordSize>displayWidth && index>MIN_WORD_LENGTH){
        index--;
        newWord = word.substring(index);
        newWord = newWord.replace(/[aeiou]/g,"");
        testWord = word.substring(0,index) + newWord;
        wordSize = getWordSize(testWord, $("#minFontSize").val());        
    }
    return testWord;
}   
    
function truncation(word, wordSize, nodeWidth) {          
    var index = word.length, 
        testWord;
    while (wordSize>nodeWidth && index>MIN_WORD_LENGTH){
        index--;        
        testWord = word.substring(0,index);
        wordSize = getWordSize(testWord);        
    }    
    return testWord;
}    
    
function truncationKeepEnd(word, wordSize, nodeWidth) {          
    var index = word.length-1, 
        endWord, testWord;
    endWord = word.charAt(index);    
    while (wordSize>nodeWidth-2 && index>MIN_WORD_LENGTH){
        index--;        
        testWord = word.substring(0,index)+"·"+endWord;        
        wordSize = getWordSize(testWord,  $("#minFontSize").val());        
    }    
    return testWord;
}        

function wordAbbreviation(technique, word, nodeWidth) {
    var wordpx = getWordSize(word);
    if(wordpx > nodeWidth+2) {       
        switch(+technique) {
        case 0:                
            return dropVowels(word, wordpx, nodeWidth);
            break;
        case 1:                
            return truncation(word, wordpx, nodeWidth);
            break;
        case 2:                
            return truncationKeepEnd(word, wordpx, nodeWidth);
            break;
        }       
    } else {
        return word;
    }
}