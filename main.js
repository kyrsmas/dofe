//variables
const toggleButton = document.getElementById("dark-mode");
const saveButton = document.getElementById("save-data");
const loadButton = document.getElementById("load-data");
const wipeButton = document.getElementById("wipe-data");

const textInput = document.getElementById("username");

toggleButton.addEventListener("click", function()
    {
        //console.log("clicked");
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark"))
        {
            toggleButton.textContent = "toggle light mode";
        }
        else
        {
            toggleButton.textContent = "toggle dark mode";
        }


    }
);

saveButton.addEventListener("click", function()
    {
        localStorage.setItem("dark-mode", document.body.classList.contains("dark"))

    }
);

loadButton.addEventListener("click", function()
    {
        const darkMode = localStorage.getItem("dark-mode");

        //console.log(darkMode);

        if (darkMode == "true")
        {
            if (!document.body.classList.contains("dark"))
            {
                document.body.classList.toggle("dark");
            }
            
            toggleButton.textContent = "toggle light mode";
        }
        else
        {
            if (document.body.classList.contains("dark"))
            {
                document.body.classList.toggle("dark");
            }

            toggleButton.textContent = "toggle dark mode";
        }
    }
);

wipeButton.addEventListener("click", function()
    {
        localStorage.clear();
        location.reload();
    }
);

textInput.addEventListener("focusin", function()
    {
        textInput.value = "";
    }
);

textInput.addEventListener("focusout", function()
    {
        switch (textInput.value)
        {
            case "eddie":
                textInput.value = "user identified";
                break;
            default:
                textInput.value = "incorrect username";
                break;
        }
    }
);