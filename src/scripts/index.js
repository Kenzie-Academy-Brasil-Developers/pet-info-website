// Desenvolva as funcionalidades de login aqui
import { loginRequest,getUserInfo } from "./requests.js";


const loginEvent = () => {
    const acessBTN = document.querySelector(".acessButton");

    acessBTN.addEventListener("click", (event) => {
        event.preventDefault();

        const emailBtn = document.querySelector("#emailInput").value;
        const password = document.querySelector("#passwordInput").value;

        const data = {
            email: emailBtn,
            password: password, 
        }
        if((data.email != "")||(data.password != "")){
            
            loginRequest(data)
        }
       

    })
}

loginEvent()

const registerEvent = () => {
    const registerButton = document.querySelector(".registerButton");

    registerButton.addEventListener("click", () => {
        window.location.replace("register.html");

    })
}

registerEvent();





