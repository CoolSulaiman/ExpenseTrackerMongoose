const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#pas');



clickme.addEventListener('click', addSignup);


function  addSignup(e){
e.preventDefault();

const obj={

    Name:nameInput.value,
    Email:emailInput.value,
    Password:passwordInput.value
}

axios.post("http://localhost:8000/user/signup",obj)
.then(res=>{
    console.log(res)
    console.log('ADDED')

})
.catch(err=>{
    console.log(err)
})

}

