import { handleDate, renderAllPosts } from "./render.js";
import { createPostRequest } from "./requests.js";
import { toast } from "./toast.js";

//Funções do modal do conteudo do posts:

function createContentHeader(obj){
  const userInfo = obj.user;

  const postDateInfo = handleDate(obj.created_at);

  const postHeader = document.createElement("header");
  postHeader.classList.add("post__header");

  const postInfo = document.createElement("div");
  postInfo.classList.add("post__info");

  const authorImage = document.createElement("img");
  authorImage.classList.add("post__author-image");
  authorImage.src = userInfo.avatar;

  const authorName = document.createElement("h2");
  authorName.classList.add("post__author-name", "text4", "bolder");
  authorName.innerText = userInfo.username;

  const divisor = document.createElement("small");
  divisor.innerText = "|";
  divisor.classList.add("post__date", "text4");

  const postDate = document.createElement("small");
  postDate.classList.add("post__date", "text4");
  postDate.innerText = postDateInfo;

  postInfo.append(authorImage, authorName, divisor, postDate);

  postHeader.appendChild(postInfo);

  return postHeader
}
function createContent(obj){
  const controller= document.createElement("div")
  controller.classList.add('controller__modal')

  const buttonClose= document.createElement("button")
  buttonClose.classList.add('button__close--content')
  buttonClose.innerText= "X"

  const postContainer = document.createElement("article");
  postContainer.classList.add("post");

  const postTitle = document.createElement("h2");
  postTitle.classList.add("post__title", "text1", "bolder");
  postTitle.innerText = obj.title;

  const postContent = document.createElement("p");
  postContent.classList.add("post__content", "text3");

  const postHeader = createContentHeader(obj);

  postContent.classList.add("post__content--modal", "text3");
  postContent.innerText = obj.content;

  postContainer.append(buttonClose,postHeader, postTitle, postContent);
  controller.appendChild(postContainer)

  return controller;
}
function closeButton(){
  const buttonClose = document.querySelector(".button__close--content");
  const modalController = document.querySelector("#modal__open--post");

  buttonClose.addEventListener("click", () => {
    modalController.close();
  });
}

export async function openContentPost(event){

  const modalController = document.querySelector("#modal__open--post");
  const token = localStorage.getItem("@petinfo:token")
  const postID = event.target.dataset.id;
  modalController.innerHTML=""

  const request = await fetch(`http://localhost:3333/posts/${postID}`,{
    method: 'GET',
    headers:{
      Authorization: `Bearer ${token}`
    },
  })
  .then(async(response) =>{
    const convert= await response.json()
    return convert
  })

  const modal= createContent(request)

  modalController.appendChild(modal)

  modalController.showModal()
  closeButton()
}

//Funções do modal de criação do posts:

export function handleNewPost() {
  const inputs = document.querySelectorAll(".inputs__register");
  const button = document.querySelector(".button__public--post");
  const modalController = document.querySelector("#modal__controller--post");

  button.addEventListener("click", async (event) => {
    event.preventDefault();
    const newPost = {};
    let count = 0;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }
      newPost[input.name] = input.value;
    });
    if (count !== 0) {
      return toast("Por favor preencha todos os campos necessários", "#c83751");
    } else {
      await createPostRequest(newPost);

      modalController.close();
      renderAllPosts();

      inputs.forEach((input) => {
        input.value = "";
      });
    }
  });
}

export function showPostModal() {
  const button = document.querySelector("#user__newpost");
  const modalController = document.querySelector("#modal__controller--post");

  button.addEventListener("click", () => {
    modalController.showModal();
    closeModal();
  });
}

function closeModal() {
  const buttonCancel = document.querySelector(".button__cancel--post");
  const buttonClose = document.querySelector(".button__close");
  const modalController = document.querySelector("#modal__controller--post");

  buttonClose.addEventListener("click", () => {
    modalController.close();
  });

  buttonCancel.addEventListener("click", () => {
    modalController.close();
  });
}
