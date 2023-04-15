const socket = io()

let user
const container = document.querySelector('.documents__container')
const loginInput = document.querySelector('.login__input')
const loginButtton = document.querySelector('.login__submit')
const messagesContainer = document.querySelector('.messages__container')

container.querySelector('.login__submit').addEventListener('click' , ()=>{
    let username = loginInput.value
    if(username.length == 0)
    {
        return alert('enter your username!')
    }
    if(username.length > 10)
    {
        return alert('username must be less than ten characters')
        
    }
    socket.emit('newUser' , username)
    user = username
    console.log(username)

   container.querySelector('.chatt__log').classList.remove('active')
    container.querySelector('.chatt__room').classList.add('active')   
    loginInput.value = ""
    loginInput.focus()
})

container.querySelector('.message__submit__button').addEventListener('click',()=>{
    const message = document.querySelector('.message__form').value
    console.log(message)

    if(message.length == 0)
    {
        return
    }

    renderedMessage('my',{
        username:user,
        text:message
    })

    socket.emit('chat', {
        username: user,
        text:message
    })

    document.querySelector('.message__form').value = ""
    document.querySelector('.message__form').focus()
})

container.querySelector('.leave__chatt').addEventListener('click',() =>{

    let username = user
    console.log(username)
    socket.emit('UserLeft' , username)
    window.location.href = window.location.href
})

socket.on('update', (update)=>{
    renderedMessage('update',update)
})

socket.on('chat' , (message)=>{
    renderedMessage('other',message)
})


function renderedMessage(type, message)
{
const messageContainer = container.querySelector('.messages__container')
if(type === 'my')
{
    const div = document.createElement('div')
    div.classList.add('chatt__content')
    div.innerHTML =`
    <div class="message sender">
        <p class="owner">you</p>
        <p class="message_view">${message.text}</p>
    </div>
    `
    messageContainer.appendChild(div)
}

if(type === 'other')
{
    const div = document.createElement('div')
    div.classList.add('chatt__content')
    div.innerHTML =`
    <div class="message receiver">
        <p class="owner">${message.username}</p>
        <p class="message_view">${message.text}</p>
    </div>
    `
    messageContainer.appendChild(div)
}

if(type === 'update')
{
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="message notification">
    <p> <span class="owner">${message}</p> 
</div>
    `
    messageContainer.appendChild(div)
}

messagesContainer.scrollTop = messagesContainer.scrollHeight

}