import { registerRequest } from "./requests.js";


const userRegister = () => {
    const inputs = document.querySelectorAll(".input"); 
    const button = document.querySelector("#register");
    
    
    button.addEventListener("click", (event) => {
        event.preventDefault();

        const objetoValores = {};

        inputs.forEach(input => {
            objetoValores[input.name] = input.value;
        })
    
        registerRequest(objetoValores);
    });


}
userRegister()