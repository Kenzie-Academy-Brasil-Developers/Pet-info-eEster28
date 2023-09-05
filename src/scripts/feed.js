import {handleNewPost, showPostModal, openContentPost} from "./modal.js"
import { renderAllPosts } from "./render.js";
//import {createPostRequest, editPost, deletePost} from "./requests.js"

async function getName(){
  const token = localStorage.getItem("@petinfo:token")
  
  const get = await fetch('http://localhost:3333/users/profile',{
    method: 'GET',
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  .then(async(response) =>{
    const convert= await response.json()
    return localStorage.setItem('@petinfo:name', convert.username)
  })
  return get
}

function showUserMenu() {
  const userAction = document.querySelector(".user__image");
  const h2nameUSer= document.querySelector(".user__uniquename")
  const menu = document.querySelector(".user__logout");
  const button= document.querySelector(".logout__button")

  userAction.addEventListener("click", (e) => {

    menu.classList.toggle("hidden");
    h2nameUSer.innerText= `@${localStorage.getItem('@petinfo:name')}`

    button.addEventListener('click', () => {
      localStorage.clear()
      location.replace('../../')
    })
  })
}

async function main() {
  // Adiciona os eventos de click ao menu flutuante de logout
  showUserMenu();
  // Renderiza todos os posts no feed (render.js)
  await renderAllPosts();

  showPostModal()

  handleNewPost()
  
 
}

await getName();
await main();
openContentPost()