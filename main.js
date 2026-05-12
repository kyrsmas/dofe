//variables
const toggleButton = document.getElementById("dark-mode");
const saveButton = document.getElementById("save-data");
const loadButton = document.getElementById("load-data");
const wipeButton = document.getElementById("wipe-data");

const adviceButton = document.getElementById("advice-button");
const advice = document.getElementById("advice");
const adviceContainer = document.getElementById("advice-container");

const textInput = document.getElementById("username");
const profilePicture = document.querySelector("img");

function delay(seconds)
{
    return new Promise(resolve =>
    {
        setTimeout(resolve, seconds * 1000);
    });
}

function playClick()
{
    let sound = new Audio("sounds/click.mp3");

    sound.play();
}

function playHover()
{
    let sound = new Audio("sounds/hover.mp3");

    sound.play();
}

function playType()
{
    let sound = new Audio("sounds/type.mp3");

    sound.play();
}

function toggleMode()
{
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark"))
    {
        toggleButton.textContent = "light mode";
    }
    else
    {
        toggleButton.textContent = "dark mode";
    }
}

function setMode(isDark)
{
    if (isDark == true)
    {
        document.body.classList.add("dark");
        toggleButton.textContent = "light mode";
       
    }
    else 
    {
        document.body.classList.remove("dark");
        toggleButton.textContent = "dark mode";
    }
}


function save()
{
    localStorage.setItem("dark-mode", document.body.classList.contains("dark"))
    localStorage.setItem("advice", advice.textContent);
}

function load()
{
    const darkMode = localStorage.getItem("dark-mode");
    const savedAdvice = localStorage.getItem("advice");
    const savedCredentials = localStorage.getItem("credentials");

    //console.log(darkMode);

    if (savedAdvice != "")
    {
        advice.textContent = savedAdvice;
    }

    if (savedCredentials == "true")
    {
        textInput.style.display = "none";
        adviceContainer.style.display = "flex";
    }
        

    setMode(darkMode == "true");
}

let buttons = document.querySelectorAll("button");

buttons.forEach(function(button)
{
    button.addEventListener("click", function()
    {
        playClick();
    });

    button.addEventListener("mouseenter", function()
    {
        playHover();
    });
});



wipeButton.addEventListener("click", function()
    {
        localStorage.clear();
        location.reload();
    }
);

textInput.addEventListener("focusin", function()
    {
        playClick();
        textInput.value = "";
    }
);



async function validateCredentials()
{
    switch (textInput.value)
        {
            case "eddie":
                textInput.value = "user identified";
                adviceContainer.style.display = "block";
                textInput.style.animation = "spin 2s";
                profilePicture.style.opacity = 0;
                localStorage.setItem("credentials", true);
                await delay(0.3);
                profilePicture.style.opacity = 1;
                profilePicture.src = "images/profile.webp";
                
                await delay(2);
                textInput.style.display = "none";
                break;
            default:
                textInput.value = "incorrect username";
                break;
        }
}

async function getAdvice()
{
    advice.style.animation = "fadeout 0.25s";
    await delay(0.25);
    advice.style.opacity = 0;
    advice.textContent = "";


    let characterCount = 0;

    let adviceInfo = await fetch("https://api.adviceslip.com/advice");

    let data = await adviceInfo.json();
    let quotedAdvice = '"' + data.slip.advice + '"';

    console.log(data);

    advice.style.animation = "fadein 0.25s";
    await delay(0.25);
    advice.style.opacity = 1;

    while (characterCount <= quotedAdvice.length)
    {
        await delay(0.075);
        advice.textContent = quotedAdvice.slice(0, characterCount);
        let currentCharacter = quotedAdvice.slice(characterCount, characterCount + 1);
        if (textInput.style.display == "none" && currentCharacter != " ")
        {
            playType();
        }
        
        characterCount++;
    }

    
    
};

toggleButton.addEventListener("click", toggleMode);
saveButton.addEventListener("click", save);
loadButton.addEventListener("click", load);
textInput.addEventListener("focusout",  validateCredentials);
adviceButton.addEventListener("click", getAdvice);

getAdvice();