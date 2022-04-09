const url = "https://pure-cove-46727.herokuapp.com/api/emojis";

let emojis;

function getEmojis() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            emojis = data;
            getCategories(emojis);
            // console.log(emojis);
        })
}
getEmojis();

// ------------------------- Problem : Encode Phrase ------------------------- //

const encodeForm = document.querySelector("#encode form");
const resultSection = document.querySelector('.result p');

encodeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = event.target.encode.value;
    const inputArray = input.split('');

    if (!input) {
        resultSection.textContent = 'Please enter search value';
        resultSection.classList.add('error');
    } else {

        emojis.filter(el => {
            for (let i = 0; i < inputArray.length; i++) {
                if (inputArray[i].toLowerCase() === el.letter) {
                    inputArray[i] = el.symbol;
                }
            }
        })
        resultSection.textContent = inputArray.join('');
        resultSection.classList.add('success');
        encodeForm.reset();
    }
});

// ------------------------- Problem : Search for Emoji ------------------------- //
const searchForm = document.querySelector("#search form");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = event.target.search.value;
    // console.log(text);
    const originalPTag = document.querySelector("#search .result p");

    if (!text.length) {
        originalPTag.textContent = 'Please enter search value';
        originalPTag.classList.add('error');
    } else {
        let foundEmoji = [];
        for (let i = 0; i < emojis.length; i++) {
            if (emojis[i].name.includes(text)) {
                foundEmoji.push(emojis[i]);
            }
        }
        originalPTag.textContent = foundEmoji
            .map((x) => x.symbol)
            .slice(",")
            .join("");
        originalPTag.classList.add('success');
        searchForm.reset();
    }
});


// ------------------------- Problem : Random Emoji by Category ------------------------- //
// -------------- Step 1 : Selected Options ----------------- //
const categoryResult = document.querySelector('#random .result p');

const selected = document.getElementById('category');
selected.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
// ERROR MESSAGE ------------------------------------------------
    if (selectedValue === selected.querySelector('option').value){
        categoryResult.textContent = 'Please enter search value';
        categoryResult.classList.add('error');
    }
// END OF ERROR MESSAGE -----------------------------------------
    searchByCategory(selectedValue);
})


function searchByCategory(selectedValue){
    const randomizerBtn = document.querySelector("#random button");
    console.log(categoryResult);
    let emptyArr = [];    

    for (let e of emojis) {
        let variable = e.categories;
        if(variable.includes(selectedValue)){
            emptyArr.push(e.symbol);
        }
    }

    randomizerBtn.addEventListener('click', (event) => {
        event.preventDefault();
        categoryResult.textContent = emptyArr[Math.floor(Math.random() * emptyArr.length)]
    })

}


// ------------------------- Step 2 : Form our Categories ------------------------- //
function getCategories(emojis) {
    let listedCategories = [];
    console.log(emojis)
    for (let e in emojis) {
        listedCategories.push(emojis[e].categories);
    }
    const noDups = [...new Set(listedCategories.flat())]; //> Creates an array of non-duplicate values in our api 
    makeCategories(noDups); //> Creates categories using our API

}
function makeCategories(noDups){
    const dropDown = document.querySelector("#random form select");
    for(i = 0; i < noDups.length - 1; i++){
        
        let capitalWord = noDups[i][0].toUpperCase() + noDups[i].slice(1);
        dropDown.innerHTML += `<option value=${noDups[i]}>${capitalWord}</option>`;
    }
    // console.log(noDups);
    // console.log(dropDown);
}
// -----------------------------------------------------------------------------//


// ------------------------- Problem : Replace Text ------------------------- //
const replaceform = document.querySelector("#replace form");
const replaceText = document.querySelector('#replace .result p');

// replaceform.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const string = event.target.replace.value;
//     const stringArr = string.split(' ');  
//     const emojisNameArr = emojis.map(x => x.name);
//     if (!string.length) {
//         replaceText.textContent = 'Please enter search value';
//         replaceText.classList.add('error');
//     } else {
//         if(emojisNameArr.find(string)){
//         // if(emojisNameArr.map(x => x === string)){
//             console.log('NOW IN HERE')
//             emojis.filter(emoji => {
//             for(let i = 0; i < stringArr.length; i++){
//                 if(stringArr[i].includes(emoji.name[1])){
//                     stringArr[i] = stringArr[i].replace(emoji.name, emoji.symbol);
//                 }
//             }
//         })
//             replaceText.textContent = stringArr.join(' ');
//             replaceText.classList.add('sucess');
//         } else {
//             replaceText.textContent = 'Please enter search value';
//             replaceText.classList.add('error');
//         }
    
//     }
//     replaceform.reset();
// })




// Original Code : 
replaceform.addEventListener("submit", (event) => {
    event.preventDefault();
    const string = event.target.replace.value;
    const stringArr = string.split(' ');
    // console.log(stringArr)

    emojis.filter(emoji => {
        for(let i = 0; i < stringArr.length; i++){
            if(stringArr[i].includes(emoji.name)){
                stringArr[i] = stringArr[i].replace(emoji.name, emoji.symbol)
            }
        }
    })

    replaceText.textContent = stringArr.join(' ');
    replaceText.classList.add('sucess');
})