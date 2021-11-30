/******************************Code for chat********************************************* */



var messagesArray = [];
firstAppear = true;

function createChat() {
    /*Creating wrapper adding id, class and animation*/
    const chatWrapper = document.createElement("div");
    chatWrapper.id = "chatWrapper";
    chatWrapper.classList.add("flex");
    chatWrapper.classList.add("wrapperAnim");

    /*creating wrapper for messages*/
    var messagesWrap = document.createElement("div");
    messagesWrap.id = "mesagesWrapper";

    /*creating wrapper for button and input and creating also button and input*/
    var inpButtWrapper = document.createElement("div");

    var input1 = document.createElement("input");
    input1.id = "inputMessage";
    input1.className = "inputWrite";
    input1.placeholder = "Write your message here";

    var button = document.createElement("button");
    button.id = "sendBtn";
    button.className = "buttonSend";
    button.textContent = "Send message";

    /*Adding click event on button and calling server*/
    button.onclick = () => {
        sendMessage();
    }

    chatWrapper.appendChild(messagesWrap);
    chatWrapper.appendChild(inpButtWrapper);


    /*Adding animation with delay... after wrapper has been shown*/
    setTimeout(() => {
        messagesWrap.className = "messagesWrap flex opacityChat1";
    
        inpButtWrapper.className = "InpButt flex opacityChatInputButt";

        inpButtWrapper.appendChild(input1);
        inpButtWrapper.appendChild(button);

    }, 1800);

    getAllMessages()
    setInt()
    return chatWrapper
}


/*OBJECT to create messages*/
function UserMessage(name, date, message) {
    this.name = name;
    this.date = date;
    this.message = message;
        
    this.oneMessage = () => {
        /*Message wrapper*/
        const spanWrapper = document.createElement("span");
        spanWrapper.className = "spanWrapper flex";

        /*Left side with username and time*/
        const leftSide = document.createElement("span");
        leftSide.className = "leftSide flex";

        const h3 = document.createElement("h3");
        h3.textContent = this.name;

        const h6 = document.createElement("h6");
        h6.textContent = this.date;

        /*Right side with username and time*/
        const rightSide = document.createElement("span");

        /*if user == antic set button to delete message*/
        if (user == "antic") {
            var deleteButton = document.createElement("button");
        }
        
        spanWrapper.appendChild(leftSide);
        spanWrapper.appendChild(rightSide);

        if (firstAppear) {
            /*Delaying animation to show on first appear*/
            setTimeout(() => {
                /*Adding headers to left side*/

                firstAppear = false;

                leftSide.appendChild(h3);
                leftSide.appendChild(h6);
                
                /*Adding message t right side*/
                rightSide.textContent = this.message;
                if (user == "antic") {
                    rightSide.appendChild(deleteButton);
                    deleteButton.className = "deleteButton"
                    deleteButton.textContent = "X"
                    deleteButton.onclick = () => {
                        deleteRow(this)
                    }
                }
                
                /*Setting classes*/
                h3.className = "leftSideH3 opacityChat";
                h6.className = "leftSideH6 opacityChat";
        
                rightSide.className = "rightSide flex opacityChat";
                

                spanWrapper.style = "border-bottom: 1px solid rgba(6, 17, 97, 0.3)";

                /*Scroll to bottom on load chat wrapper*/
                var chatWindow = document.getElementById('mesagesWrapper'); 
                var Height = chatWindow.scrollHeight; 
                chatWindow.scrollTo(0, Height); 
            
                
            }, 2200);
        } else {
            /*Adding headers to left side*/
                leftSide.appendChild(h3);
                leftSide.appendChild(h6);
                /*Adding message t right side*/
                rightSide.textContent = this.message;
                if (user == "antic") {
                    rightSide.appendChild(deleteButton);
                    deleteButton.className = "deleteButton";
                    deleteButton.textContent = "X";
                    deleteButton.onclick = () => {
                        deleteRow(this);
                    }
                }
                
                /*Setting classes*/
                h3.className = "leftSideH3 opacityChat";
                h6.className = "leftSideH6 opacityChat";
        
                rightSide.className = "rightSide flex opacityChat";

                spanWrapper.style = "border-bottom: 1px solid rgba(6, 17, 97, 0.3)";
        
        }

        return spanWrapper
    }
}


/*Function to show messages on load,changes and delete...*/
function showMessages() {

    var chatWindow = document.getElementById('mesagesWrapper'); 
    
    var messageWrapper = document.getElementById("mesagesWrapper");
    messageWrapper.innerHTML = "";
        for (let i = 0; i < messagesArray.length; i++){
            const span = messagesArray[i].oneMessage();
            messageWrapper.appendChild(span);

            /*Scroll to bottom every time*/
            var Height = chatWindow.scrollHeight; 
            chatWindow.scrollTo(0, Height); 
        }
}


/*Set interval to refresh messages every x seconds*/
function setInt() {
    /*Wait for 3000ms and then call setInterval function*/
    setTimeout(() => {
        setInterval(() => {
            getAllMessages();
        }, 3000);
    }, 3000);
}



/*************************************server Communication functions******************************************************* */
/*Get all messages on login */
function getAllMessages() {
    axios.get("https://chat-expressjs.herokuapp.com/getAllMessages")
    .then((res) => {
        messagesArray = [];
        for (let i = 0; i < res.data.messages.length; i++){
            messagesArray.push( new UserMessage(res.data.messages[i].user, res.data.messages[i].time, res.data.messages[i].message))
        }
        showMessages();
    })
    .catch((error) => {
        if (error.response) {
            
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            
            console.log(error.request);
        } else {
            
            console.log('Error', error.message);
        }
    })
        
}



/*On button click send message */
function sendMessage(){
    const date = new Date().getDate();
    const day = new Date().getDay();
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();

    const time = date + "." + day + "." + year + " " + hours + ":" + minutes;
    const message = document.getElementById("inputMessage").value
    document.getElementById("inputMessage").value = "";

    const data = {
        user: user,
        time: time,
        message: message
    }


    axios.put("https://chat-expressjs.herokuapp.com/addMessage", data)
    .then((res) => {
        if (res.data.response) {
            messagesArray = [];
            for (let i = 0; i < res.data.response.length; i++){
                messagesArray.push( new UserMessage(res.data.response[i].user, res.data.response[i].time, res.data.response[i].message))
            }
            showMessages();
        }
    })
    .catch((error) => {
        if (error.response) {
            
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            
            console.log(error.request);
        } else {
            
            console.log('Error', error.message);
        }
    })
}



/*Delete one row*/
function deleteRow(obj) {

    axios.delete('https://chat-expressjs.herokuapp.com/delete', { data: obj })
    .then((res) => {
        messagesArray = [];
        for (let i = 0; i < res.data.response.length; i++){
            messagesArray.push( new UserMessage(res.data.response[i].user, res.data.response[i].time, res.data.response[i].message))
        }
        showMessages();
    })
    .catch((error) => {
        if (error.response) {
            
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            
            console.log(error.request);
        } else {
            
            console.log('Error', error.message);
        }
    })
}
