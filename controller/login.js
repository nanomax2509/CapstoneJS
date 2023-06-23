
function login(){
  // Lấy các phần tử trong form
const emailInput = document.getElementById('email__login').value;
const passwordInput = document.getElementById('password').value;
const loginButton = document.getElementById('btnLogin');
  // console.log(emailInput,passwordInput)
// Xử lý sự kiện click nút đăng nhập
// console.log(loginButton)

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
    console.log("response.data",response.data);
    localStorage.setItem("accessToken", JSON.stringify(response.data));
    if (response.data) {
      alert('Đăng nhập thành công!');
      // Chuyển hướng đến trang chính hoặc trang sau khi đăng nhập thành công
      axios.post('https://shop.cyberlearn.vn/api/Users/getProfile', {

      }, {
        headers: {
          Authorization : `Bearer ${response.data.content.accessToken}`,
          
        },
      })
      .then((response) => {
        console.log("getprofile",response);
        const {
          avatar,
          email,
          gender,
          name,
          phone,
        } = response.data.content
      const avatarObject = {
        avatar : avatar,
        email : email,
        gender : gender,
        name : name,
        phone : phone,
      };
      localStorage.setItem("avatarObject", JSON.stringify(avatarObject));
    })
      window.location.replace('../index.html');
    } else {
      alert('Thông tin đăng nhập không hợp lệ!');
    }
  })
  .catch(function (error) {
    console.log(error);
    alert('Đã xảy ra lỗi khi đăng nhập!');
  });

event.preventDefault();
}

