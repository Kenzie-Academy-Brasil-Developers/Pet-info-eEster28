import { renderAllPosts } from "./render.js";
//import {createPostRequest, editPost} from "./requests.js"

function showUserMenu() {
  const userAction = document.querySelector(".user__image");
  const h2nameUSer= document.querySelector(".user__uniquename")
  const menu = document.querySelector(".user__logout");

  userAction.addEventListener("click", (e) => {
    menu.classList.toggle("hidden");
  });
}



function main() {
  // Adiciona os eventos de click ao menu flutuante de logout
  showUserMenu();
  // Renderiza todos os posts no feed (render.js)
  renderAllPosts();

  /*createPostRequest({
    title: "teste de post",
    content: "teste"  
  }
  )*/

}

main();
