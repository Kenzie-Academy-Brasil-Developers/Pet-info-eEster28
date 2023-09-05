// Desenvolva as funcionalidades de cadastro aqui
import {requestResgister} from './requests.js'

function handleRegister() {
    const inputs = document.querySelectorAll('.inputs__register')
    const button = document.querySelector('#register__submit')


    button.addEventListener('click', (event) => {
        event.preventDefault()
        const loginBody = {}
        
        inputs.forEach(input => {
            loginBody[input.name] = input.value
        })

        requestResgister(loginBody)
    })
}
function redirectLogin(){
    const button = document.querySelector('#redirect__button')
    button.addEventListener('click', (event) =>{
        event.preventDefault()
        location.replace('../../index.html')
    }
    )
}
redirectLogin()
handleRegister()