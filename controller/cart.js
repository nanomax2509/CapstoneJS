function luuGioHangVaoLocalStorage() {
  localStorage.setItem("gioHang", JSON.stringify(gioHang));
}
let gioHang = JSON.parse(localStorage.getItem("gioHang")) || [];
function hienThiGioHang() {
 const gioHangElement = document.getElementById("gioHang");
 
  if (gioHangElement) {
    gioHangElement.innerHTML = ""; // Xóa danh sách sản phẩm hiện tại trong giỏ hàng
    let tongCong = 0;
    gioHang.forEach(function (sanPham) {
      let sanPhamElement = '';
      sanPhamElement += `
          <tr>
          <td class="w-30">
          <img style="height:100px" src="${sanPham.imgSanPham}"></img></td>
          <td>${sanPham.tenSanPham}</td>
          <td>${sanPham.giaSanPham.toLocaleString()}</td>
          <td>
            <div class="input-group">
              <div class="input-group-prepend">
                <button type="button" class="btn btn-outline-secondary btn-minus" onclick="giamSoLuong(${sanPham.id})">-</button>
              </div>
              <input type="text" class="form-control text-center so-luong" value="${sanPham.soLuong}">
              <div class="input-group-append">
                <button type="button" class="btn btn-outline-secondary btn-plus" onclick="tangSoLuong(${sanPham.id})">+</button>
              </div>
            </div>
          </td>
          <td>${(sanPham.giaSanPham * sanPham.soLuong).toLocaleString()}</td>
          <td>
            <button type="button" class="btn btn-xoa" onclick="xoaSanPhamKhoiGioHang('${sanPham.id}')">Xóa</button>
          </td>
        </tr>
      `;
      gioHangElement.innerHTML += sanPhamElement; // Thêm sản phẩm vào phần tử HTML hiển thị danh sách sản phẩm trong giỏ hàng
      tongCong += sanPham.giaSanPham * sanPham.soLuong;
    });
    let tongCongElement = `
      <tr>
        <td colspan="3"></td>
        <td class="text-danger ">Tổng cộng:</td>
        <td>${tongCong.toLocaleString()}</td>
        <td></td>
      </tr>
    `;
    gioHangElement.innerHTML += tongCongElement;
  }
}

hienThiGioHang();
function xoaSanPhamKhoiGioHang(idSanPham) {
  // Tìm kiếm sản phẩm trong giỏ hàng theo ID
  const sanPham = gioHang.find(function (sp) {
    return sp.id == idSanPham;
  });
  // Nếu sản phẩm được tìm thấy thì xóa sản phẩm khỏi giỏ hàng
  if (sanPham) {
    const index = gioHang.indexOf(sanPham);
    gioHang.splice(index, 1);
    
    // Cập nhật lại giỏ hàng trên localStorage
    localStorage.setItem("gioHang", JSON.stringify(gioHang));
    
    // Cập nhật lại danh sách sản phẩm trên giao diện người dùng
    hienThiGioHang();
  }
}

function tangSoLuong(idSanPham) {
  // Tìm kiếm sản phẩm trong giỏ hàng theo ID
  const sanPham = gioHang.find(function (sp) {
    return sp.id === idSanPham;
  });

  // Nếu sản phẩm được tìm thấy thì tăng số lượng sản phẩm lên 1
  if (sanPham) {
    sanPham.soLuong += 1;
    luuGioHangVaoLocalStorage();
    hienThiGioHang();
  }
}

function giamSoLuong(idSanPham) {
  // Tìm kiếm sản phẩm trong giỏ hàng theo ID
  const sanPham = gioHang.find(function (sp) {
    return sp.id == idSanPham;
  });

  // Nếu sản phẩm được tìm thấy và số lượng sản phẩm lớn hơn 1 thì giảm số lượng sản phẩm xuống 1
  if (sanPham && sanPham.soLuong > 1) {
    sanPham.soLuong -= 1;
    luuGioHangVaoLocalStorage();
    hienThiGioHang();
  }
}
