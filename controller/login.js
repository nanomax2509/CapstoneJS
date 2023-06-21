function login(){
  // Lấy các phần tử trong form
const emailInput = document.getElementById('email__login').value;
const passwordInput = document.getElementById('password').value;
const loginButton = document.getElementById('btnLogin');
  console.log(emailInput,passwordInput)
// Xử lý sự kiện click nút đăng nhập
console.log(loginButton)
loginButton.addEventListener('click', function(event) {
  // Ngăn chặn việc gửi form đi

  // Lấy giá trị từ các input
  const email = emailInput.trim();
  const password = passwordInput.trim();
  console.log("dn:",email, password);
  // Thực hiện yêu cầu đăng nhập đến API
  axios({
    method: "post",
    url: "https://shop.cyberlearn.vn/api/Users/signin",
    data: {
      email: email,
      password: password,
    }
})
  .then(function (response) {
    // Xử lý kết quả trả về từ API
    console.log(response.data)
    if (response.data) {
      alert('Đăng nhập thành công!');
      // Chuyển hướng đến trang chính hoặc trang sau khi đăng nhập thành công
      window.location.replace('./loginIndex.html');
    } else {
      alert('Thông tin đăng nhập không hợp lệ!');
    }
  })
  .catch(function (error) {
    console.log(error);
    alert('Đã xảy ra lỗi khi đăng nhập!');
  });
});
event.preventDefault();
}