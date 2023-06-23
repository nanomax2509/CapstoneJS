let dataToken = JSON.parse(localStorage.getItem("accessToken"));
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
// products Index
  const categoryList = document.getElementById("data-category");
  const categoryList2 = document.getElementById("data-category2");

  
  categoryList.addEventListener('click', function(event){
    console.log(event)
    const categoryId = event.target.dataset.categoryId;
    sapXepLoai(categoryId);
  });
  categoryList2.addEventListener('click', function(event){
    console.log(event)
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
      <span class="d-none " id="product__id">${product.id}</span>
      <img src="${product.image}" class="product__img" alt="">
        <div class="products__hiddenJS">
          <div class="products__heartJS">
            <a href="#"><i class="fa-solid fa-heart"></i></a>
          </div>
          <div class="products__signalJS">
            <a href="#"><i class="fa-solid fa-signal"></i></a>
          </div>
          <div class="products__viewJS">
            <a href="./view/detail.html?id=${product.id}" ><i class="fa-solid fa-magnifying-glass-plus"></i> quick view</a>
          </div>
        </div>
      </div>
      <div class="product__titleJS">
        <h4 class="product__name">${product.name}</h4>
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
          <span class="product__price">$ ${product.price}</span>
        </div>
        <div class="product__buttonJS">
        <div class="product__button">
        <a id="id__cart" onclick="addGioHang(event, ${product.id}, '${product.name}', '${product.price}', ${product.quantity} ,'${product.image}')" href="#"><i class="fa fa-shopping-cart"></i> Buy Now </a>
      </div>
        </div>
      <div class="d-block text-right pr-3 mt-3 " >Còn lại: <span class="product__quanlity">${product.quantity}</span></div>
        
      </div>
    </div>
    </div>`;
  });
  document.querySelector("#productSP").innerHTML = productHTML;
};
let gioHang = [];
//! Thêm vào giỏ hàng
// Lấy nút "Thêm vào giỏ hàng"
function addGioHang(event, idSanPham, nameSanPham, priceSanPham, quanlitySanPham,imgSanPham) {
  event.preventDefault();
  if(dataToken == null){
    dataToken= String(dataToken);
    console.log(String(dataToken))
  }
    const dataEmail = dataToken;
    console.log("datatoken",dataToken)
  axios({
    method: 'post',
    url: 'https://shop.cyberlearn.vn/api/Users/order',
    data:{
        "orderDetail": [
          {
            "productId": idSanPham,
            "quantity": quanlitySanPham
          }
        ],
        "email": dataEmail,
    }
  }).then(function (result) {
    console.log(result);
    // alert("Thêm sản phẩm vào giỏ hàng thành công!");
    const sanPhamTrongGioHang = gioHang.find(function (sanPham) {
      return sanPham.id == idSanPham;
    });
    alert("Thêm sản phẩm vào giỏ hàng thành công!!!")
    if (sanPhamTrongGioHang) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng thì tăng số lượng sản phẩm lên 1
      sanPhamTrongGioHang.soLuong++;
    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng thì thêm sản phẩm vào giỏ hàng
      gioHang.push({
        id: idSanPham,
        tenSanPham: nameSanPham,
        giaSanPham: priceSanPham,
        soLuong: 1,
        imgSanPham : imgSanPham,
      });
    }
    localStorage.setItem("gioHang", JSON.stringify(gioHang));
  }).catch(function (error) {
    console.log(error);
    alert("Thêm sản phẩm vào giỏ hàng thất bại! Vui lòng đăng nhập để thêm sản phẩm!!!");
    window.location.replace('./view/login.html');
  });
};
//! Dùng token để dùng giỏ hàng
function clickGioHang(){
  const btnGioHang = document.getElementById("btn-gio-hang");
  
  if (dataToken.content.accessToken) {
    // Nếu có accessToken, chuyển hướng sang trang giỏ hàng
    btnGioHang.style.display = "block";
    document.getElementById("drop-dangNhap").style.display = "block";
    document.getElementById("btn-Dangnhap").style.display = "none";
    document.getElementById("btn-Dangky").style.display = "none";

  } else {
    // Nếu không có accessToken, chuyển hướng sang trang đăng nhập
    btnGioHang.style.display = "none";
  }
}
clickGioHang();

