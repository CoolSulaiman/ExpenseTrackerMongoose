window.addEventListener('DOMContentLoaded',(()=>{


 const usertype = localStorage.getItem('user');

 if(usertype == "true"){

        axios.get('http://localhost:8000/premium')
        .then(res=>{
                console.log(res.data ,"kkkk")
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
    const childHTML=`UserID-${data[i]._id}    Name-- ${data[i].name} 
    <button onclick=CheckExpense('${data[i]._id}')> CheckExpense</button> <br> `
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
    const childHTML=`Amount--${data[i].amount}    Category-- ${data[i].category}    Description-- ${data[i].description} <br> `
    console.log(childHTML)

    parentNode.innerHTML= parentNode.innerHTML+childHTML;
}

}