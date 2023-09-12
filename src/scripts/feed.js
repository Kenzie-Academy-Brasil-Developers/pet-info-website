import { getUserInfo, postCreate, getNewPost, deletePost } from "./requests.js";



const openModal = () => {
  const modal = document.getElementById('modal__container');

  const botaoPostCreate = document.querySelector('#postCreate');
  botaoPostCreate.addEventListener('click', () => {

    modal.showModal();
  });
}



const closeM = () => {
  const button = document.querySelector(".fechar-modal");
  const modal = document.getElementById('modal__container');
  const cancelBTN = document.querySelector("#cancelar");

  cancelBTN.addEventListener("click", () => {
    modal.close();
  })

  button.addEventListener("click", (event) => {
    modal.close();
  })
}

openModal();
closeM();
getUserInfo();



const currentUser = async () => {

  const data = await getUserInfo();
  // console.log(data.username);

  const userIMG = document.querySelector(".userIMG");
  userIMG.src = data.avatar;

  let userName = document.getElementsByTagName("h3");

  userName = data.username;


  //CRIAÇÃO DO MENU AO CLICAR NA FOTO DE PERFIL

  const body = document.querySelector("#body");

  const menu = document.createElement("div");
  menu.id = "menuDiv";
  menu.className = "hidden";
  const menuUserName = document.createElement("h3");
  menuUserName.innerText = `@${userName}`;
  const menuDiv = document.createElement("div");
  menuDiv.innerText = "Sair da conta";
  const outIMG = document.createElement("img");
  outIMG.src = "./src/assets/img/sign-out-alt-black.svg";

  body.append(menu);
  menu.append(menuUserName, menuDiv,);
  menuDiv.append(outIMG);


  const container = document.querySelector("#menuDiv");
  const imgButton = document.querySelector(".userIMG");

  imgButton.addEventListener("click", () => {

    container.classList.toggle("showMenu");

  })

  // LOGOUT 

  menuDiv.addEventListener("click", () => {
    localStorage.clear();
    window.location.replace("index.html");
  })

}
currentUser();


//CRIANDO POST PELO MODAL

const creatingPost = () => {
  const title = document.querySelector(".input-titulo");
  const content = document.querySelector(".input-conteudo");
  const button = document.querySelector("#publicar");




  button.addEventListener("click", async (event) => {
    event.preventDefault();
    const post = {
      title: title.value,
      content: content.value
    }
    if ((post.title == "") || (post.content == "")) {
      alert("Adicione o Título e o conteúdo do post")
    } else {

      const postObject = await postCreate(post);
      // alert(postObject.id);
      title.value = "";
      content.value = "";

      //FECHAR MODAL APÓS CRIAR O POST
      const modal = document.getElementById('modal__container');
      modal.close();
    }

    // CRIANDO OS POST PELO DOM
    const listContainer = document.querySelector("#list");

    //LI 
    const list = document.createElement("li");
    list.className = "post__item";
    const postTitle = document.createElement("h2");
    postTitle.innerText = postObject.title;
    const postDescription = document.createElement("p");
    postDescription.innerText = `${limitarPalavras(post.content)}...`;
    const postButton = document.createElement("button");
    postButton.className = "postButton";
    postButton.innerText = "Acessar publicação";

    //MAIN DIV
    const liDiv = document.createElement("div");
    liDiv.className = "postInfo__container";


    //DIV ONE
    const liDivOne = document.createElement("div");
    liDivOne.className = "postInfo__item";
    const liDivOneIMG = document.createElement("img");
    liDivOneIMG.src = postObject.user.avatar;
    const userName = document.createElement("h3");
    userName.innerText = post.user.username;
    const postDate = document.createElement("h4");
    postDate.innerText = postObject.createdAt.substring(0, 10);

    const split = document.createElement("p");
    split.innerText = "|";
    split.className = "split";

    //DIV TWO
    const liDivTwo = document.createElement("div");
    liDivTwo.className = "postInfo__buttons";
    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.innerText = "Editar";
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerText = "Deletar";


    listContainer.append(list);
    list.append(liDiv, postTitle, postDescription, postButton);
    liDiv.append(liDivOne, liDivTwo,);
    liDivOne.append(liDivOneIMG, userName, split, postDate);
    liDivTwo.append(editButton, deleteButton);

    deleteButton.addEventListener("click", () => {
      deletePost(post.id);
      list.remove();

    })

  })


}
creatingPost()




const creatingPostList = async () => {

  const posts = await getNewPost();

  posts.forEach(post => {


    if (post.user.avatar == "") {
      post.user.avatar = "https://imgs.search.brave.com/dmNsyBvLmS4jetkOvFsxVmpaniEqqxT8BaNBAI-_7jM/rs:fit:416:416:1/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vcGhvdG9z/L2ljb24tb2YtYS1i/dXNpbmVzc21hbi1h/dmF0YXItb3ItcHJv/ZmlsZS1waWMtcGlj/dHVyZS1pZDQ3NDAw/MTg5Mj9rPTYmbT00/NzQwMDE4OTImcz0x/NzA2NjdhJnc9MCZo/PWF0cVpzV0YtVWNM/QkQ1dTJCTVpqcE11/cjZKOW56aVFyclBh/aXFaaDU3S1k9";
    }
    // console.log(ids);

    // CRIANDO OS POST PELO DOM
    const listContainer = document.querySelector("#list");

    //LI 
    const list = document.createElement("li");
    list.className = "post__item";
    const postTitle = document.createElement("h2");
    postTitle.innerText = post.title;
    const postDescription = document.createElement("p");
    postDescription.innerText = `${limitarPalavras(post.content)}...`;
    const postButton = document.createElement("button");
    postButton.className = "postButton";
    postButton.innerText = "Acessar publicação";

    //MAIN DIV
    const liDiv = document.createElement("div");
    liDiv.className = "postInfo__container";


    //DIV ONE
    const liDivOne = document.createElement("div");
    liDivOne.className = "postInfo__item";
    const liDivOneIMG = document.createElement("img");
    liDivOneIMG.src = post.user.avatar;
    const userName = document.createElement("h3");
    userName.innerText = post.user.username;
    const postDate = document.createElement("h4");
    postDate.innerText = post.createdAt.substring(0, 10);

    const split = document.createElement("p");
    split.innerText = "|";
    split.className = "split";


    //DIV TWO
    const liDivTwo = document.createElement("div");
    liDivTwo.className = "postInfo__buttons";
    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.innerText = "Editar";
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerText = "Deletar";


    deleteButton.addEventListener("click", () => {
      deletePost(post.id);
      list.remove();

    })





    listContainer.append(list);
    list.append(liDiv, postTitle, postDescription, postButton);
    liDiv.append(liDivOne, liDivTwo,);
    liDivOne.append(liDivOneIMG, userName, split, postDate);
    liDivTwo.append(editButton, deleteButton);

    postButton.addEventListener("click", () => {
      // Criar o elemento dialog
      const modal = document.createElement("dialog");
      modal.className = "postModal";
      modal.innerHTML = `<div class = "post__item">
      <div class="postInfo__container">
      <div class = "postInfo__item">
      <img src="${post.user.avatar}"/>
      <h3>${post.user.username}</h3>
      </div>
      </div>
      <h2>${post.title}</h2>
      <p>${post.content}.</p>
      </div>
      `;


      const body = document.querySelector("#body");
      body.appendChild(modal);


      modal.showModal();

     
      const closeButton = document.createElement("button");
      closeButton.className = "fechar-modalPost";
      closeButton.innerText = "X";
      modal.append(closeButton);
      
      
      closeButton.addEventListener("click", () => {
        modal.close();
      })
      
    })

  });



}
creatingPostList();


//FUNCÇÃO PARA LIMITAR O TAMANHO DE UMA STRING EM 25 PALAVRAS

function limitarPalavras(text) {

  const palavras = text.split(' ');


  const palavrasLimitadas = palavras.slice(0, 25);


  const resultado = palavrasLimitadas.join(' ');

  return resultado;
}

const safeChecking = () => {
  const tokenLocalStorage = localStorage.getItem('@petinfo:token');

  if (tokenLocalStorage) {
    // alert("o usuário está logado")
  } else {
    window.location.replace("index.html");
  }
}

safeChecking();

