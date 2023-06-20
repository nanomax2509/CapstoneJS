function layDanhSachSP() {
  axios({
    method: 'get',
    url: 'https://shop.cyberlearn.vn/api/Product',
  }).then(function (result) {
    console.log(result);
    hienThiSP(result.data);
  }).catch(function (error) {
    //thất bại
    console.log(error);

  });
};
//Gọi khi load web để có sẵn dữ liệu cho table
layDanhSachSP();

  function sapXepLoai(category){
    axios({
      method: 'get',
      url: `https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=${category}`,
    }).then(function (result) {
      console.log(result);
      hienThiSP(result.data);
    }).catch(function (error) {
      //thất bại
      console.log(error);

    });
  };
  const categoryList = document.getElementById("data-category");
  categoryList.addEventListener('click', function(event){
    const categoryId = event.target.dataset.categoryId;
    sapXepLoai(categoryId);
  });


function hienThiSP(products) {
  let productHTML = '';
  console.log(products);
  products.content.map(function (product, index) {
    productHTML += `
    <div class="col-3 mt-3">
    <div class="products__item">
      <div class="products__imgJS">
      <img src="${product.image}" alt="">
        <div class="products__hiddenJS">
          <div class="products__heartJS">
            <a href="#"><i class="fa-solid fa-heart"></i></a>
          </div>
          <div class="products__signalJS">
            <a href="#"><i class="fa-solid fa-signal"></i></a>
          </div>
          <div class="products__viewJS">
            <a href="#"><i class="fa-solid fa-magnifying-glass-plus"></i> quick view</a>
          </div>
        </div>
      </div>
      <div class="product__titleJS">
        <h4>${product.name}</h4>
        <div class="products__ratingJS">`;

    for (let i = 1; i <= 5; i++) {
      if (i <= product.rating) {
        productHTML += '<i class="fa-solid fa-star"></i>';
      } else {
        productHTML += '<i class="fa-regular fa-star"></i>';
      }
    }

    productHTML += `
        </div>
        <div class="products__priceJS">
          <span>$ ${product.price}</span>
        </div>
        <div class="product__buttonJS">
          <a href="#"><i class="fa fa-shopping-cart"></i> Add to cart</a>
        </div>
      </div>
    </div>
    </div>`;
  });
  document.querySelector("#productSP").innerHTML = productHTML;

};
