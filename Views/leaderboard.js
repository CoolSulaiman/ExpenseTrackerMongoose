window.addEventListener('DOMContentLoaded',(()=>{


 const usertype = localStorage.getItem('user');

 if(usertype == "true"){

        axios.get('http://localhost:8000/premium')
        .then(res=>{
                console.log(res.data.users)
                showeUSeronLeader(res.data.users)
        })
        .catch(err=>{
            console.log(err)

         })
 }
    
}))


function showeUSeronLeader(data){
    for(let i=0;i<data.length;i++)
    {
    var parentNode=document.getElementById('ur');
    const childHTML=`UserID-${data[i].id}    Name-- ${data[i].Name} 
    <button onclick=CheckExpense('${data[i].id}')> CheckExpense</button> <br> `
    console.log(childHTML)

    parentNode.innerHTML= parentNode.innerHTML+childHTML;
}
}

function CheckExpense(id){

    const obj={
        OBJ:id
    }

    axios.post("http://localhost:8000/postpremium",obj)
    .then(res=>{
            console.log(res.data.response)
            ShowExpenseONscreen(res.data.response)
    })
    .catch(err=>{
        console.Console(err)
    })
}

function ShowExpenseONscreen(data){

    for(let i=0;i<data.length;i++)
    {
    var parentNode=document.getElementById('expo');
    const childHTML=`Amount--${data[i].Amount}    Category-- ${data[i].Category}    Description-- ${data[i].Description} <br> `
    console.log(childHTML)

    parentNode.innerHTML= parentNode.innerHTML+childHTML;
}

}