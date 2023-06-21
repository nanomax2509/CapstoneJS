window.onload = function (){
    const urlParam = new URLSearchParams(window.location.search);
    const myParam = urlParam.get("id");

    axios({
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${myParam}`,
        method: "get",
        ResponseType: "JSON"
    }).then(function (result){
       //Render detail product
        document.querySelector(".product-image").innerHTML = `<img src="${result.data.content.image}"/>`;
        document.querySelector(".pro-name").innerHTML = result.data.content.name;
        document.querySelector(".pro-description").innerHTML = result.data.content.description;
        document.querySelector(".price").innerHTML = "$"+ result.data.content.price;

        let products = "";
        result.data.content.relatedProducts.forEach(item => {
        products += ` 
        <div class="col-3 mt-3">
                <div class="products__border">
                  <div class="products__item">
                    <div class="products__img">
                      <img src="${item.image}" alt="">
                      <div class="products__hidden">
                        <div class="products__heart">
                          <a href="#"><i class="fa-solid fa-heart"></i></a>
                        </div>
                        <div class="products__signal">
                          <a href="#"><i class="fa-solid fa-signal"></i></a>
                        </div>
                        <div class="products__view">
                          <a href="#"><i class="fa-solid fa-magnifying-glass-plus"></i> quick view</a>
                        </div>
                      </div>
                    </div>
                    <div class="product__title">
                      <h4> ${item.name}</h4>
                      <div class="products__rating">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                      </div>
                      <div class="products__price">
                        <span>$${item.price}</span>
                      </div>
                      <div class="product__button">
                        <a href="./detail.html?id=${item.id}"><i class="fa fa-shopping-cart"></i> Buy Now </a>

                      </div>
                    </div>
                  </div>

                </div>
              </div>
        `;
        
        //Button tăng giảm số lượng và giá
        const productPrice = document.querySelector(".products__price");
        let number = Number(document.querySelector(".qtyInput").innerHTML);
        let plus = document.querySelector(".qty-plus");
        let minus = document.querySelector(".qty-minus");
        let price = productPrice.textContent.replace('$', '');
        let newPrice=0;  
        
        minusFunc = () => {
            if (number === 1) {
                minus.style.display = "none";
            }
            else {
                minus.style.display = "inline-block";
            }
        }
        
        plus.addEventListener("click", () => {
            number++;
            document.querySelector(".qtyInput").innerHTML = number;
            newPrice = price * number;
            productPrice.innerHTML="$" + newPrice;
            minusFunc();
        });
        
        minus.addEventListener("click", () => {
            number--;
            document.querySelector(".qtyInput").innerHTML = number;
            newPrice = price * number;
            productPrice.innerHTML="$" + newPrice;
            minusFunc();
        });
         
    });
    document.querySelector(".products__content .row").innerHTML = products;

    }).catch(function(error){
        console.log(error);
    }); 
}


