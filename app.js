const randomProducts = document.querySelector(".random-products");
const randomProductModal = document.querySelector(".randomProductModal");
const mainProducts = document.querySelector(".main-products");
const RPloader = document.querySelectorAll(".rp-loader");

const API_URL = "https://dummyjson.com";

async function fetchAPI(url) {
  let response = await fetch(`${url}/products`);
  response.json().then((data) => loopRandomProducts(data.products));
}

fetchAPI(API_URL);

function loopRandomProducts(data) {
  RPloader.forEach((item) => (item.style.display = "none"));
  for (let i = 0; i < 3; i++) {
    let randomN = Math.floor(Math.random() * 29);
    let randomData = data[randomN];
    let div = document.createElement("div");
    div.classList.add(
      "product",
      "bg-slate-100",
      "flex",
      "p-8",
      "rounded-md",
      "gap-3",
      "w-full",
      "lg:w-1/3"
    );
    div.innerHTML = `
      <img src=${data[randomN].images[0]} class="max-w-[100px]"/>
      <div class="product-info">
        <h2 class="product-name text-2xl text-black font-semibold less-txt">${data[randomN].title}</h2>
        <p class="product-descr text-base leading-6 mt-3 less-txt">
          ${data[randomN].description}
        </p>
      </div>
    `;

    div.addEventListener("click", () => {
      randomProductModal.innerHTML = `
        <figure>
        <img src=${data[randomN].images[0]}
          class="" />
         </figure>
        <div class="card-body text-white bg-[#14213dbb] w-full">
            <h2 class="card-title text-white text-3xl">${randomData.title}</h2>
            <p class="text-white text-sm">${randomData.description}</p>
            <div class="price flex justify-between text-white mt-5">
                <p class="w-1/2 text-2xl text-yellow-400">Price: ${
                  randomData.price
                }$</p>
                <p class="text-yellow-200 text-2xl">Discount: ${
                  randomData.discountPercentage
                }%</p>
            </div>
            <div class="rating-warranty flex justify-between text-white">
                <p class="rating w-1/2">
                    <i class="${rating(1, randomData)}"></i>
                    <i class="${rating(2, randomData)}"></i>
                    <i class="${rating(3, randomData)}"></i>
                    <i class="${rating(4, randomData)}"></i>
                    <i class="${rating(5, randomData)}"></i>
                </p>
                <p class="warranty text-xl text-red-300">${
                  randomData.warrantyInformation
                }</p>
            </div>
            <div class="card-actions justify-start mt-10">
                <button class="btn btn-outline btn-accent">Add <i class="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>
      `;
      randomProductModal.classList.add("modal-open");
      randomProductModal.id = "active";
    });
    randomProducts.append(div);
    randomProducts.addEventListener("click", (e) => {
      e.target.tagName == "IMG"
        ? randomProductModal.classList.remove("modal-open")
        : null;
    });
  }

  function rating(num, randomData) {
    let sNum = randomData.rating;
    return num < sNum ? "fa-solid fa-star text-yellow-400" : "fa-solid fa-star";
  }
}
