let input = document.querySelector("#input");
let search = document.querySelector("#search");
let apikey = `1b19d6b1-941f-4c1c-b833-584464c29ee8`;
let notfound = document.querySelector(".not_found");
let defin = document.querySelector(".def");
let audiobox = document.querySelector(".audio");
let loadingdata = document.querySelector(".loading");
search.addEventListener("click", function (e) {
  e.preventDefault();
  //cleaning work
  audiobox.innerHTML = " ";
  defin.innerHTML = " ";
  notfound.innerHTML = " ";
  // get the data from input
  let word = input.value;

  //api call
  if (word === "") {
    alert("Enter the word ");
    return;
  }
  getData(word);
});

async function getData(word) {
  // Ajax call
  loadingdata.style.display = "block";
  const response = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`
  );
  const data = await response.json();
  // if empty then
  if (!data.length) {
    loadingdata.style.display = "none";
    notfound.innerHTML = "no result found ";
    return;
  }
  //   if result suggestion
  if (typeof data[0] === "string") {
    loadingdata.style.display = "none";
    let heading = document.createElement("h3");
    heading.innerHTML = " Did you means ?";
    notfound.appendChild(heading);
    data.forEach((element) => {
      let suggestion = document.createElement("span");
      suggestion.classList.add("suggested");
      suggestion.innerHTML = element;
      notfound.appendChild(suggestion);
    });
  }
  //   if result found
  loadingdata.style.display = "none";
  let defination = data[0].shortdef[0];
  defin.innerHTML = defination;
  //sound
  const soundName = data[0].hwi.prs[0].sound.audio;
  if (soundName) {
    renderSound(soundName);
  }
  console.log(data);
}

function renderSound(soundName) {
  let subfolder = soundName.charAt(0);
  let soundsrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apikey}`;
  let aud = document.createElement("audio");
  aud.src = soundsrc;
  aud.controls = true;
  audiobox.appendChild(aud);
}
