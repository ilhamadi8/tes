import bot from './assets/bot.svg'
import user from './assets/user.svg'
import markdownit from 'markdown-it'


const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval

function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

function typeText(element, text) {
    // Mencari dan mengganti ** menjadi bold  
    let index = 0
    
    
    //element.innerHTML = '<ul>' + element.innerHTML + '</ul>';
    let interval = setInterval(() => {
        if (index < text.length) {
            
            element.innerHTML +=  text.charAt(index)
            element.innerHTML = element.innerHTML.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            
            if (index==text.length-1){
                //console.log(element.innerHTML)
                element.innerHTML = element.innerHTML.replace(/\* /g, '<li>');
                //element.innerHTML = '<ul>' + element.innerHTML + '</ul>';
                
            }
            index++
        } else {
            clearInterval(interval)
        }
       
    }
    
    , 20)

    //const yourElement = element;
    //console.log(yourElement)

    

    // Menambahkan <ul> untuk membungkus bullet points
    //yourElement.innerHTML = '<ul>' + yourElement.innerHTML + '</ul>';
    
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}

 

const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(form)

    // user's chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

    // to clear the textarea input 
    form.reset()

    // bot's chatstripe
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom 
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div 
    const messageDiv = document.getElementById(uniqueId)
  

    // messageDiv.innerHTML = "..."
    loader(messageDiv)

    const response = await fetch('https://chat-gpt-mbj4.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    })

    clearInterval(loadInterval)
    messageDiv.innerHTML = " "

    if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 
        const content = (parsedData) 
        
        
        typeText(messageDiv, content)
          
        
    } else {
        const err = await response.text()

        messageDiv.innerHTML = "Something went wrong"
        alert(err)
    }
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
})