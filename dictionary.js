const input = document.getElementById("search-input");
const button = document.getElementById("searchbtn");
const definetion = document.getElementById("definetion");
const play = document.getElementById("play");
const speech = new SpeechSynthesisUtterance();
button.addEventListener("click", (e)=> {
        e.preventDefault();
})
async function searchWord(){
    try {
    const word = input.value;
    // alert("Word: " + word); 
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    let response = await fetch(url);
    let data = await response.json();
    definetion.innerHTML = ` <h3> <strong>Word: </strong> ${data[0].word} </h3>
                            <p class="partofspeech"> ${data[0].meanings[0].partOfSpeech}<p> 
                            <p> <strong> 1)Meaning :</strong> ${data[0].meanings[0].definitions[2].definition}</p>
                            <p> <strong> 2)Meaning :</strong> ${data[0].meanings[0].definitions[3].definition}</p>
                            `;
   
    for(let i=0; i<data[0].meanings[0].antonyms.length; i++) {
        definetion.innerHTML += `<p> <strong> Antonym : </strong> ${data[0].meanings[0].antonyms[i]}</p>`;
    }                        
    for(let i=0; i<data[0].meanings[0].synonyms.length; i++){
        definetion.innerHTML += `<p> <strong> Synonym : </strong> ${data[0].meanings[0].synonyms[i]}</p>`;
    }
    // console.log(data);
} catch (error) {
    definetion.innerHTML = `<h3> <strong> Word Not Found </strong> </h3>`;
  }
}

play.addEventListener("click",() => {
    speech.text = definetion.innerText;
    speechSynthesis.speak(speech);
})
