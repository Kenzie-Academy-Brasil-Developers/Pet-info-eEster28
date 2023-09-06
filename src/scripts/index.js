import { requestLogin } from "./requests.js"

//Função responsável por inpedir o redirecionamento para a página de login forçado
function authentication(){
    const token = localStorage.getItem("@petinfo:token")
    if(token) {
      location.replace('./src/pages/feed.html')
    }
}

//Função responsável pelo login
function handleLogin() {
    const inputs = document.querySelectorAll('.login__input')
    const button = document.querySelector('#login__submit')
    let controll = 0

    button.addEventListener('click', (event) => {
        event.preventDefault()
        const loginBody = {}
        
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                controll++
            }
            loginBody[input.name] = input.value
        })

        if(controll !== 0){
            controll = 0
            return alert('Preencha todos os campos')
        }else{
            requestLogin(loginBody)   
        }
    })
}

//Função responsável pelo redirecionamento a página de cadastro
function buttonRegister(){
    const button = document.querySelector('#register__button')
    button.addEventListener('click', (event) =>{
        event.preventDefault()
        location.replace('./src/pages/register.html')
    }
    )
}

authentication()
buttonRegister()
handleLogin()