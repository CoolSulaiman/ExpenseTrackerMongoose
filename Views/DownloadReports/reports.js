let token = localStorage.getItem('token')
window.addEventListener('DOMContentLoaded' , (e)=>{
    e.preventDefault()

})
let listurl = document.getElementById('listurl-div');
const ajax=document.getElementById('ajax')
let listno = 0 ;

window.addEventListener('DOMContentLoaded' , async(e)=>{
    e.preventDefault()
    try {
        let response = await axios.get('http://localhost:8000/getAllDownloadUrl' , {headers: {"Authorisation": token}})
        if(response.status === 200){
            showUrls(response.data)
        }
    } catch (error) {

    }
})





document.getElementById('download').onclick = function(e){
    e.preventDefault()

axios.get('http://localhost:8000/download' , {headers : {'Authorisation': token}})
.then(response=>{

    if(response.status === 200){
        console.log(response)
        showUrlOnscreen(response.data); 


        var a = document.createElement('a');
        a.href = response.data.fileurl;
        a.download = 'userExpense.csv';
        a.click();
    }

})
.catch(err=>{
    console.log(err)
})

}


function showUrlOnscreen(data){
    let  child = `<li class="list" >
        <a href="${data.fileurl}" class="expense-info">${listno + 1} ${data.filename}</a>
    </li>`  
    listurl.innerHTML += child
}

function showUrls(data,e){
    listurl.innerHTML = ''

    console.log("Sulaiman",data.urls)

    data.urls.forEach(url => {
        let  child = `<li class="list" >
        <a href="${url.fileUrl}" class="expense-info">${listno + 1}. ${url.fileName}</a>
    </li>`  

    listurl.innerHTML += child

    listno++
    });
//     const data1=data.urls

//     for(let i=0;i<data1.length;i++)
//     {
//         console.log(url[i].fileName)
//     const childHTML=`<li class="list" >
//         <a href="${url[i].fileUrl}" class="expense-info"> ${url[i].fileName}</a>
//  </li>`
//     listurl.innerHTML += childHTML

//     listno++}
}