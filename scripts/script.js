/*******************************Code for form and first appear************************************************************ */


var user;
/*Start function to append form to wrapper, and later chat also*/
function hello(child) {
    let wrapper = document.getElementById("wrapper");
    wrapper.classList.add("flex");
    wrapper.appendChild(child);
}


/*setting up form *** on load/refresh */

function form() {

    /*Creating form*/
    let form = document.createElement("form");
    form.classList.add("form", "flex");
    form.action = "https://chat-expressjs.herokuapp.com/logIn";
    form.method = "post";
    form.id = "form";

    /************************ */

    /*Username form group**/
    let div1 = document.createElement("div");
    div1.id = "formDiv1";
    div1.classList.add("formGroup", "top", "flex");

    let label1 = document.createElement("label");
    label1.className = "label";
    label1.textContent = "Username:"
    label1.setAttribute('for', 'Username');

    let input1 = document.createElement("input");
    input1.className = "input";
    input1.placeholder = "Type your username here!";
    input1.name = "Username";
    input1.id = "Username";
    input1.type = "text";

    let small1 = document.createElement('small');
    small1.classList.add("small", "flex","display");
    small1.style = "line-height: normal";
    small1.id = "small1"
    small1.textContent = "Username doesn't exist!"


    div1.appendChild(label1);
    div1.appendChild(input1);
    div1.appendChild(small1);
    
    /************************** */

    /**********Password form group************** */
    let div2 = document.createElement("div");
    div2.id = "formDiv2";
    div2.classList.add("formGroup", "flex");

    let label2 = document.createElement("label");
    label2.className = "label";
    label2.textContent = "Secret code:"
    label2.setAttribute('for', 'code');

    let input2 = document.createElement("input");
    input2.className = 'input';
    input2.placeholder = "Type your secret code here!";
    input2.name = "code";
    input2.id = "code";
    input2.type = "password";

    let small2 = document.createElement('small');
    small2.classList.add("small", "flex","display");
    small2.style = "line-height: normal";
    small2.id = "small2"
    small2.textContent = "Secret code doesn't match!"

    div2.appendChild(label2);
    div2.appendChild(input2);
    div2.appendChild(small2);

    /********* Button form group***************** */
    let divButton = document.createElement("div");
    divButton.classList.add("formGroup", "flex");
    divButton.id = "formDivButton";

    var button = document.createElement("button");
    button.className = "button";
    button.textContent = "Go to chat!";
    button.id = "buttonForm";
    button.type = "submit";


    
    let small3 = document.createElement('small');
    small3.classList.add("small", "flex","display");
    small3.style = "line-height: normal; width:300px;";
    small3.id = "small3"
    small3.textContent = "Invalid credentials!";

    divButton.appendChild(button);
    divButton.appendChild(small3);


    form.appendChild(div1);
    form.appendChild(div2);
    form.appendChild(divButton);
    
    /*Adding event listener on submit*/
    form.addEventListener('submit', (event) => {
        document.getElementById("small3").classList.add("display")
        validateForm(event)
    })
    return form;
}



/*Function on form button click t check validation*/
function validateForm(event) {
    /*Preventing default to stop submit, so we can check is input are not empty etc.*/
    event.preventDefault(); 

    var button = document.getElementById("buttonForm");
    button.disabled = true;

    const a = event.target['Username'].value;
    const b = event.target['code'].value;


    var small1 = document.getElementById("small1");
    var small2 = document.getElementById("small2");

    if (a.length == 0) {
        small1.textContent = "Please enter your username!";
        small1.classList.remove("display");
    } else {
        small1.classList.add("display");
        
    }

    if (b.length == 0) {
        small2.textContent = "Please enter secret code!";
        small2.classList.remove("display");
    } else {
        small2.classList.add("display");
    }


    if (a.length == 0 || b.length == 0) {
        /*return if not valid*/
        button.disabled = false;
        return
    }
    else if (a.length != 0 && b.length != 0) {
        /*Calling server to check username and secret code*/
        callServer(a, b)
        console.log("call")
    }
}

/*calling a server on form submit **************/

/***************************Using XMLHttpRequest************************************************ 
function callServer(val1, val2) {
    var data = JSON.stringify({ val1: val1, val2: val2 });

    const xmlHttp = new XMLHttpRequest();

    xmlHttp.open("POST", "https://chat-expressjs.herokuapp.com/logIn");

    xmlHttp.onreadystatechange = function(){
        
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response)
        }
        
    }
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(data);
}
*************************************************************************************************** */



/************************Using Promises****************************************************** 
function callServer(val1, val2) {
    var data = JSON.stringify({ val1: val1, val2: val2 });
    return new Promise((resolve, reject) => {
        const xmlHttp = new XMLHttpRequest();

        xmlHttp.open('POST', 'https://chat-expressjs.herokuapp.com/logIn');

        xmlHttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                var a = JSON.parse(this.response)
                resolve(a)
            } else {
                reject(this)
            }
            }
        }

        xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlHttp.send(data)
    })
}
Then where we call the function we can use this...:
.then((res, rej) => {
            console.log(res)
            })
            .catch((e)=>{
            console.log((e))
            })
            })
********************************************************************************************/
/*****************************Using Fetch and async await***************************************************************/
/*
async function callServer(val1, val2) {
    var data = JSON.stringify({ val1: val1, val2: val2 });
    var object = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body:data
    }
    try {
        const response = await fetch('https://chat-expressjs.herokuapp.com/logIn', object);

        if (!response.ok) throw new Error(`Http response status: ${response.status}`);

        const res = await response.json()

        console.log(res)
    } catch (e) {
        console.log(e)
    }
}
***************************************************************************************/


/*********************************USING axios******************************************************/

async function callServer(val1, val2) {
    /*Data to send*/
    var data = JSON.stringify({ val1: val1, val2: val2 });
    var button = document.getElementById("buttonForm");
    try {
        var response = await axios.post('https://chat-expressjs.herokuapp.com/logIn', data,{headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
        }
        });

        if (response.data.status == "OK") {
            /*Setting user name after success*/
            user = response.data.user;
            /*calling function to set display and animations*/
            addAnimation();

        } else {
            document.getElementById("small3").classList.remove("display");
            throw new Error(`Username or Secret code dont match. Your values: ${response.data.user} and ${response.data.code}` )
        }
        
    } catch (error) {
        /*If there is error enable button*/
        button.disabled = false;
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error);
    }
}

function addAnimation() {
    /*Adding animation*/
    document.getElementById("form").classList.add("animation");
    document.getElementById("formDivButton").classList.add("opacity1");
    document.getElementById("formDiv1").classList.add("opacity1");
    document.getElementById("formDiv2").classList.add("opacity2");
    setTimeout(() => {
        document.getElementById("form").classList.add("display");
        /*Function createChat is in another .js file and is used here to append chat to wrapper*/
        hello(createChat())
    }, 2300);
}


hello(form())
