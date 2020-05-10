const main = document.querySelector('.main-wrapper')
const pagination = document.querySelector('#pagination')
let currentPage = 1
let rows = 6

function paginateElements(items, rows_per_page, page){
    main.innerHTML = ""

    page--;

    let loop_start = rows_per_page * page;
    let end = loop_start + rows_per_page;
    let paginatedItems = items.slice(loop_start,end);
    
    paginatedItems.forEach((v) => {
        constructCards(v)
    })

}

function SetupPagination(items, wrapper, rows_per_page){
    let page_count = Math.ceil(items.length / rows_per_page);
    for(let i = 1; i< page_count + 1; i++){
        let btn = PaginationButton(i, items);
        wrapper.appendChild(btn);
    }
}

function PaginationButton(page, items){
    let button = document.createElement('button');
    button.innerText = page;
    if(currentPage == page){
        button.classList.toggle('active');
    }

    button.addEventListener('click', function (){
        currentPage = page
        paginateElements(items, rows, currentPage)

        let currentBtn = document.querySelector(".pagenumbers button.active");
        currentBtn.classList.remove('active')

        button.classList.add('active')

        totalValue()

    })
    return button;
}

fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72').then(response => {
    if(!response.ok)
        throw new Error(`Status Code Error: ${response.status}`)
    return response.json()   

}).then( data => {
    paginateElements(data, rows, currentPage)
    SetupPagination(data, pagination, rows)
}).catch((data) => {
    console.log(data)
})

function constructCards(data){

    
    let col = document.createElement("div");
    col.setAttribute("class", "col-md-4");

    let divCard = document.createElement("div");
    divCard.setAttribute("class", "listing");

    let itemGrid = document.createElement("div");
    itemGrid.setAttribute("class", "item-grid__image-container");
    itemGrid.innerHTML = `
    <a href="#">
    <div class="item-grid__image-overlay"></div>
    <img src="${data.photo}" alt="${data.name}"
        class="listing__img">
    <span class="listing__favorite"><i class="fa fa-heart-o" aria-hidden="true"></i></span>
    </a>
    `;

    let itemGridContent = document.createElement("div");
    itemGridContent.setAttribute("class", "item-grid__content-container");

    let listingContent = document.createElement("div");
    listingContent.setAttribute("class", "listing__content");
    listingContent.innerHTML = `
    <h3 class="listing__title">
        <a href="#">${data.name}</a>
    </h3>
    <p class="listing__location"><i class="fas fa-map-marker-alt"></i> ${data.property_type}</p>
    <p class="listing__price">Preço: R$${data.price},00 / DIÁRIA</p>
        `;


    let details = document.createElement("div");
    details.setAttribute("class", "listing__details");
    details.innerHTML = `
    <ul class="listing__stats">
        <li><span class="listing__figure">5</span> Comodos</li>
    </ul>
    <a href="#" class="listing__btn">Detalhes <span
    class="listing__btn-icon"><i class="fa fa-angle-right"
        aria-hidden="true"></i></span>
    </a>
        `;


    col.appendChild(divCard);
    divCard.appendChild(itemGrid);
    divCard.appendChild(itemGridContent);
    itemGridContent.appendChild(listingContent);
    listingContent.appendChild(details);


    main.appendChild(col);
}