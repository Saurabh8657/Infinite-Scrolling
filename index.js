let container = document.querySelector(".container") ;
let cardList = document.querySelector(".card-list") ;
let loading = document.querySelector(".loading") ;
// console.log("hey");

function createCard(item){
    let card = document.createElement("div") ;
    card.classList.add("card") ;

    let img = document.createElement("img");
    img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_BDSK8Pi8kH630HiEqlefasS-0LMxxR4-dw&usqp=CAU" ;
    
    let cardBody = document.createElement("div") ;
    cardBody.classList.add("card-body") ;

    let id = document.createElement("p") ;
    id.classList.add("title") ;
    id.innerText = "ID : " + item.id ;

    let title = document.createElement("p") ;
    title.classList.add("title") ;
    title.innerText = "Title : " + item.title ;

    let body = document.createElement("p") ;
    body.classList.add("body") ;
    body.innerText = item.body ;

    cardBody.append( id, title, body ) ;
    card.append( img, cardBody ) ;

    return card ;
}

function appendData(data){
    data.forEach( (item,index) => {
        let card = createCard(item) ;
        cardList.append(card) ;
    });
    container.append(cardList) ;
    loading.style.display = 'none';
    flag = true ;
}

fetchData(`https://jsonplaceholder.typicode.com/posts`, `?_page=1&_limit=20`) ;
async function fetchData(url,query=""){
    try{
        loading.style.display = 'block';
        let response = await fetch( `${url}${query}` ) ;
        let data = await response.json();
        console.log(data) ;
        appendData(data) ;
    }
    catch(error){
        console.log("from fetch Data",error) ;
    }
}


let flag = true ;
let page = 2 ;
window.addEventListener( "scroll", () => {
    
    console.log("scrolling") ;
    let clientHeight = document.documentElement.clientHeight ;
    let scrollHeight = document.documentElement.scrollHeight ;
    let scrollTop = document.documentElement.scrollTop ;

    if( scrollHeight-clientHeight <= Math.ceil(scrollTop) && flag ){
        console.log("reached bottom") ;
        page++;
        console.log(page) ;
        fetchData(`https://jsonplaceholder.typicode.com/posts`,`?_page=${page}&_limit=10`) ;
        flag = false ;
    }
})