const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonsButton = document.querySelectorAll(".lesson-btn");
  lessonsButton.forEach((btn) => btn.classList.remove("active"));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); //remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active"); //add active class
      displayWord(data.data);
    });
};

// {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }
const displayWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = ` <div class=" text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
         <img class='mx-auto' src="./english-janala-resources/assets/alert-error.png" alt="">
                <p class="font-medium text-xl text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>`;
    return;
  }

  words.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
 <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-3">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-medium text-2xl font-bangla">'${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} /${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}'</div>
            <div class="flex justify-between items-center">
                <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-circle-info"></i>
                </button>

                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
        </div>
`;
    wordContainer.append(card);
  });
};

const displayLesson = (lessons) => {
  // 1.get the container and empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2.get every lessons
  for (const lesson of lessons) {
    //    3.create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
<button id='lesson-btn-${lesson.level_no}' onclick='loadLevelWord(${lesson.level_no})' class='btn btn-outline btn-primary lesson-btn'>
<i class="fa-solid fa-book-open"></i>
Lesson - ${lesson.level_no}</button>
`;
    // 4.append
    levelContainer.append(btnDiv);
  }
};

loadLessons();
