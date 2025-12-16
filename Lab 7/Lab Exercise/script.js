//Config
const USERNAME = "admin";
const PASSWORD = "123";

//Login
document.getElementById('login-btn').addEventListener("click", function(){
    let userInputUsername = document.getElementById('username');
    let userInputPassword = document.getElementById('password');

    if (userInputUsername.value === USERNAME && userInputPassword.value === PASSWORD){
        window.location.href = "index.html"
    } else{
        alert("Username or password is wrong: The correct one is Username: "+USERNAME+ " Password: "+PASSWORD);
    }
});


//Wait function
function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function load(progressbar){
    progressbar.style.width = "0%";

    for (let i = 0; i <= 100; i+=10){
        await wait(1000);
        progressbar.style.width = `${i}%`;
    }
}


