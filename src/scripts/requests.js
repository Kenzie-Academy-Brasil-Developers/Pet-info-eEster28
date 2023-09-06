import {toast} from "./toast.js"

const baseUrl = "http://localhost:3333";
const token = localStorage.getItem("@petinfo:token");

const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// Informações de usuário logado
export async function getCurrentUserInfo() {
  const request = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: requestHeaders,
  });
  const user = await request.json();

  return user;
}

// Listagem de posts
export async function getAllPosts() {
  const request = await fetch(`${baseUrl}/posts`, {
    method: "GET",
    headers: requestHeaders,
  });
  const posts = await request.json();
  return posts;
}

//Login 
export const requestLogin= async (login) => {
  const token = await fetch(`${baseUrl}/login`,{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(login)
  })
  .then(async (response) => {
    const convert= await response.json()
 
    localStorage.setItem('@petinfo:token', convert.token)

    if(response.ok){
      toast('Login realizado com sucesso','#087F5B')

      setTimeout(()=>{
        location.replace('./src/pages/feed.html')
      },1000)

      return convert
    }else{
      if(convert.message === "O email está incorreto"){

        const smallEmaill = document.querySelector('#wrong-email')
        const inputEmaill=  document.querySelector('#Email')

        smallEmaill.classList.remove('hidden')
        inputEmaill.classList.add('alert1')
      }
      else if(convert.message === "A senha está incorreta"){

        const smallPassword = document.querySelector('#wrong-password')
        const inputPassword=  document.querySelector('#Senha')

        smallPassword.classList.remove('hidden')
        inputPassword.classList.add('alert1')
      }
  
    }
  })
  return token
}

//Cadastro
export async function requestResgister(createUser){
  const response = await fetch(`${baseUrl}/users/create`,{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(createUser)
  })
  .then(async (response) => {
    const convert= await response.json()

    if(response.ok){

      toast('Cadastro realizado com sucesso','#087F5B')  
      
    }else{
      toast(convert.message,'#c83751')
    }

  })
  return response
}

// Criando post
export async function createPostRequest(postBody){
  const newPost = await fetch(`${baseUrl}/posts/create`,{
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(postBody)
  })
  .then(async(response) =>{
    const convert= await response.json()
    
    if(response.ok){
      toast('Post criado com sucesso','#087F5B')
      return convert
    }else{
      toast(convert.message, '#c83751')
    }
  })
  return newPost
}

