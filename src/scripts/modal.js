import { renderAllPosts } from "./render.js";
import { createPostRequest } from "./requests.js";
import { toast } from "./toast.js";

export function openContentPost() {
  const accessPublication = document.querySelectorAll("a.post__open");
  const modalController = document.querySelector("#modal__open--post");
  
  console.log(accessPublication);
  accessPublication.forEach((element) => {

    element.addEventListener("click", (event) => {
      const postID = event.target.dataset.id;
      console.log(postID);
    });
  });
}

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
