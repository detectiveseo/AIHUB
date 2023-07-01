
// js code
function allUniverseHub() {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url).then(res => res.json())
        .then(data => insideCardItems(data.data.tools))
}

// card Holder
const cardHolder = document.getElementById('cards');

let showData = 6
function pagination() {
    showData = showData + 3;
    cardHolder.innerHTML = ""
    allUniverseHub();
}

const insideCardItems = (datas) => {
    datas.slice(0, showData).forEach(data => {
        const { name, description, image, published_in, features, id } = data;
        cardHolder.innerHTML += `
            <div class="col">
            <div class="card h-100">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <p class="card-text">${features ? features.map((x, i) => `${i + 1}: ${x}`).join("</br>") : "Sorry,But we can't proceed your request at this moment"}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <div>
                    <h4>${name ? name : "Sorry,But we can't proceed your request at this moment"}</h4>
                    <p><span class="iconify mb-1 me-2" data-icon="uil:calender"></span>${published_in}</p>
                </div>
                <div>
                    <span onClick='singleData("${id}")' style="color:orange;cursor: pointer;" data-bs-toggle="modal" data-bs-target="#exampleModal" class="iconify" data-icon="lucide:arrow-right" data-width="37"></span>
                </div>
            </div>
            </div> 
        </div>
        `;
    });
}

allUniverseHub();

//  এখানে সিন্গেল ডাটা কল করা হয়েছে 
function singleData(id) {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
        .then(res => res.json())
        .then(data => modalOpen(data.data))
}

// এটা মডাল এখানে সব কিছু বর্ননা করুন 

function modalOpen(data) {
    console.log(data);
    const { id, image_link, tool_name, description, website, logo, pricing, use_cases, accuracy } = data;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `<div class="row ">
    <div class="col-md-7">
      <div style="border: 1px solid red;padding: 20px;margin-left: 20px;border-radius: 10px;background-color: rgba(255, 0, 0, 0.116);" >
      <p>${description}</p>
            <div>
            
            </div>
      </div>
    </div>
    <div class="col-md-5">
      <div id="showMoreInfo2" class=" border p-2 rounded p-4">

      <img src=${image_link[0]} width="100%" />
      <h2>${tool_name}</h2>
      </div>
    </div>
  </div>`
}

