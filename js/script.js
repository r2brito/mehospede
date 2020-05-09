const apiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
const cardsContainer = document.querySelector("#cards");
let data = [];

async function fetchCards() {
    let response = await fetch(apiUrl)
    return await response.json()
}

function renderCards(cards) {
    cardsContainer.innerHTML = "";
    cards.map(renderCard);
}


function renderCard(card) {
  let col = document.createElement("div");
  col.setAttribute("class", "col-md-4");

  let divCard = document.createElement("div");
  divCard.setAttribute("class", "listing");
  

  let itemGrid = document.createElement("div");
  itemGrid.setAttribute("class", "item-grid__image-container");
  itemGrid.innerHTML = `
  <a href="#">
  <div class="item-grid__image-overlay"></div>
  <img src="${card.photo}" alt="${card.name}"
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
    <a href="#">${card.name}</a>
  </h3>
  <p class="listing__location"><i class="fas fa-map-marker-alt"></i> ${card.property_type}</p>
  <p class="listing__price">Preço: R$${card.price},00 / DIÁRIA</p>
    `;

  let details = document.createElement("div");
  details.setAttribute("class", "listing__details");
  details.innerHTML = `
  <ul class="listing__stats">
      <li><span class="listing__figure">*</span> Comodos</li>
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


  cardsContainer.appendChild(col);
}


async function main(){
    data = await fetchCards();
    if(data){
        renderCards(data);
    }
}

main();