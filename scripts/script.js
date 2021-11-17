/*Start function to append form to wrapper, and later chat also*/
function hello(child) {
    let wrapper = document.getElementById("wrapper");
    wrapper.classList.add("flex")
    wrapper.appendChild(child)
}


/*setting up form function on load/refresh */

function form() {
    let form = document.createElement("form");
    form.classList.add("form", "flex");

    /************************ */
    let div1 = document.createElement("div");
    div1.classList.add("formGroup", "top", "flex");

    let label1 = document.createElement("label");
    label1.className = "label";
    label1.textContent = "Username:"

    let input1 = document.createElement("input");
    input1.className = "input";
    input1.placeholder = "Type your username here!"

    div1.appendChild(label1);
    div1.appendChild(input1);
    
    /************************** */

    /************************ */
    let div2 = document.createElement("div");
    div2.classList.add("formGroup", "flex")

    let label2 = document.createElement("label");
    label2.className = "label";
    label2.textContent = "Secret code:"

    let input2 = document.createElement("input");
    input2.className = 'input';
    input2.placeholder = "Type your secret code here!"

    div2.appendChild(label2);
    div2.appendChild(input2);

    /************************** */

    let button = document.createElement("button");
    button.className = "button";
    button.textContent = "Go to chat!";

    form.appendChild(div1);
    form.appendChild(div2);
    form.appendChild(button);
    return form;
}


/*Function on form button click t check validation*/
function checkIfValid(){
    console.log("clicked")
}


hello(form())
