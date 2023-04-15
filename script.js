function chooseAnswer(event) {
    const selectedBox = event.currentTarget;
    const selectedQuestionId = selectedBox.dataset.questionId;
  

    //trovo l'elemento con lo stesso QuestionId se esiste, senno lo lascio -1 
    let selectedIndex = -1;
    for (let i = 0; i < choosenBoxes.length; i++) {
      if (choosenBoxes[i].dataset.questionId === selectedQuestionId) {
        selectedIndex = i;
        break;
      }
    }
  
    if (choosenBoxes.length >= 1 && choosenBoxes.length < 3) {
      if (selectedIndex >= 0) {
        const uncheck = choosenBoxes[selectedIndex].querySelector('.checkbox');
        uncheck.src = 'images/unchecked.png';
        choosenBoxes[selectedIndex] = selectedBox;
      } else {
        choosenBoxes.push(selectedBox);
      }
    } else {
      choosenBoxes.push(selectedBox);
    }
  
    const image = selectedBox.querySelector('.checkbox');
    image.src = 'images/checked.png';
    selectedBox.style.opacity = 1;
    selectedBox.style.backgroundColor = "#cfe3ff";

  
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i] !== selectedBox && boxes[i].dataset.questionId === selectedQuestionId) {
        boxes[i].style.opacity = 0.6;
        boxes[i].style.backgroundColor = "#f4f4f4";
      }
    }

    for(const box of choosenBoxes){
        console.log(box.dataset.choiceId);
    }

    console.log(choosenBoxes.length);

    if(choosenBoxes.length===3){
        Result(choosenBoxes);
        for(const boxi of boxes){
        boxi.removeEventListener('click', chooseAnswer);
        }
    }
}

function Result(choosenBoxes){
    if(choosenBoxes[0].dataset.choiceId===choosenBoxes[1].dataset.choiceId || choosenBoxes[0].dataset.choiceId===choosenBoxes[2].dataset.choiceId){
        console.log(choosenBoxes[0].dataset.choiceId);
        showResult(choosenBoxes[0].dataset.choiceId);
    } else {
        if(choosenBoxes[1].dataset.choiceId===choosenBoxes[2].dataset.choiceId){
            console.log(choosenBoxes[1].dataset.choiceId);
            showResult(choosenBoxes[1].dataset.choiceId);
        } else {
            console.log(choosenBoxes[0].dataset.choiceId);
            showResult(choosenBoxes[0].dataset.choiceId);
        }
    }
}

function showResult(titolores){
    console.log(titolores);
    
    const resultContainer = document.querySelector('.nonvis');
    resultContainer.classList.remove("nonvis");
    resultContainer.classList.add("result");

    
    const header = document.createElement('h1');
    const parag = document.createElement('p');

    header.textContent = RESULTS_MAP[titolores].title;
    parag.textContent = RESULTS_MAP[titolores].contents;

    resultContainer.prepend(parag);
    resultContainer.prepend(header);
    
}

function cleanpage(){
    choosenBoxes =[];

    for (const box of boxes)
    {
        box.addEventListener('click', chooseAnswer);
        box.style.opacity = 1;
        box.style.backgroundColor = "#f4f4f4";
        const img = box.querySelector('.checkbox');
        img.src = 'images/unchecked.png';
    }

    const resultContainer = document.querySelector('.result');
    resultContainer.classList.remove("result");
    resultContainer.classList.add("nonvis");

    document.querySelector('.nonvis h1').remove();
    document.querySelector('.nonvis p').remove();
}


choosenBoxes = [];
const boxes = document.querySelectorAll('.choice-grid div');
for (const box of boxes)
{
    box.addEventListener('click', chooseAnswer);
}

const button = document.querySelector('button');
button.addEventListener('click', cleanpage);
