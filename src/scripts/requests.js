export const loginRequest = async (request) => {

    const loginToken = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
        .then(async (res) => {
            const resConvert = await res.json()

            // console.log(resConvert);


            if (res.ok) {

                localStorage.setItem("@petinfo:token", JSON.stringify(resConvert.token))
                alert("Login efetuado!")

                window.location.replace("feed.html");

            } else {

                //  EMAIL - INPUT E DIV
                const emailInput = document.querySelector("#emailInput");
                const emailMessage = document.querySelector("#emailError");

                //  SENHA - INPUT E DIV
                const password = document.querySelector("#passwordInput");
                const passwordMessage = document.querySelector("#passwordError");

                if (resConvert.message === "O email está incorreto") {

                    emailMessage.textContent = "O email está incorreto";
                    emailInput.classList.add("toggleInputs");

                    password.classList.remove("toggleInputs");
                    passwordMessage.textContent = "";
                }
                else {

                    passwordMessage.textContent = "A senha está incorreta";
                    password.classList.add("toggleInputs")

                    emailMessage.textContent = "";
                    emailInput.classList.remove("toggleInputs");
                }
            }



        }).catch((error) => console.error(error.message))

    return loginToken
}

export const registerRequest = async (request) => {
    const register = await fetch("http://localhost:3333/users/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
        .then(async (res) => {
            const resConvert = await res.json()
            // console.log(resConvert);

            if (res.ok) {
                alert("Usuário criado com sucesso!");
                window.location.replace("index.html");

            }
        }).catch((error) => error.message)

    return register;
}



export const getUserInfo = async () => {

    const tokenLocalStorage = localStorage.getItem('@petinfo:token');
    const token = JSON.parse(tokenLocalStorage);


    const data = await fetch("http://localhost:3333/users/profile", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(async (res) => {
            const response = await res.json();
            // console.log(response);

            return response;
        })
        .catch((error) => {
            console.error("Erro:", error);
        });
    return data;
}


export const postCreate = async (request) => {

    const tokenLocalStorage = localStorage.getItem('@petinfo:token');
    const token = JSON.parse(tokenLocalStorage);
    // console.log(token);

    const post = await fetch("http://localhost:3333/posts/create", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
        .then(async (res) => {
            const response = await res.json();

            if (response) {
                // alert("post criado com sucesso")
                return response;
            }
        })
        .catch((error) => {
            console.error("Erro:", error);
        });
    return post;
}


export const getNewPost = async () => {

    const tokenLocalStorage = localStorage.getItem('@petinfo:token');
    const token = JSON.parse(tokenLocalStorage);


    const data = await fetch(`http://localhost:3333/posts`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(async (res) => {
            const response = await res.json();
            // console.log(response);

            return response;
        })
        .catch((error) => {
            console.error("Erro:", error);
        });
    return data;
}



export const deletePost = async (id) => {
    const tokenLocalStorage = localStorage.getItem('@petinfo:token');
    const token = JSON.parse(tokenLocalStorage);
    
    const post = await fetch(`http://localhost:3333/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        
    })
        .then(async (res) => {
            const response = await res.json();

            if (response) {
                // alert("post deletado com sucesso");
                // console.log(response);

                return response;
            }
        })
        .catch((error) => {
            console.error("Erro:", error);
        });
    return post;
}
