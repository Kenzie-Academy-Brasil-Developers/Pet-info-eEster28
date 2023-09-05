// Desenvolva as funcionalidades de login aqui
import { requestLogin } from "./requests.js"

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

function buttonRegister(){
    const button = document.querySelector('#register__button')
    button.addEventListener('click', (event) =>{
        event.preventDefault()
        location.replace('./src/pages/register.html')
    }
    )
}

buttonRegister()
handleLogin()