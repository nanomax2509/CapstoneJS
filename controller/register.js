const validation = new Validation();
// console.log("hello world");
const dsUser = new listUser();
function setLocalStorage() {
    localStorage.setItem("user", JSON.stringify(dsUser.mangUser));

}
function getLocalStorage() {
    var dataLocal = JSON.parse(localStorage.getItem("user"));
    if (dataLocal !== null && dataLocal !== undefined) {
        dsUser.mangUser = dataLocal;
    }
    console.log(dataLocal)

}

getLocalStorage();
function getInfo() {
    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var password = document.getElementById('password').value;
    var passComfirm = document.getElementById('password1').value;
    var gender = document.getElementById('male').checked ? true : false;
    var user = new userRegister(email,password,name,gender,phone);
   
    var isValid = true;
    // console.log(isValid ? true:false)
    isValid &= validation.checkEmpty(email, "spanEmail", "Email không được để trống") && validation.checkEmail(email, "spanEmail", "Email không đúng định dạng");
    // console.log(isValid)
    isValid &= validation.checkEmpty(name, "spanName", "Tên không được để trống") && validation.checkName(name, "spanName", "Tên chỉ được chứa ký tự chữ");
// console.log(isValid)
    isValid &= validation.checkEmpty(phone, "spanPhone", "Số điện thoại không được để trống") && validation.checkPhone(phone, "spanPhone", "Số điện thoại không đúng định dạng");
// console.log(isValid)
    // isValid &= validation.checkEmpty(password, "spanPassword", "Vui lòng nhập mật khẩu") && validation.checkPassword(password, "spanPassword", "Password không đúng định dạng");
    // console.log(isValid)
    if (passComfirm === password) {
        document.getElementById("spanPassword1").innerHTML = "";
        isValid &= true;
    }
    else {
        document.getElementById("spanPassword1").innerHTML = "Password nhập lại không đúng";
        isValid &= false;
    }
    // console.log(user);
    // console.log(isValid ? true:false)
    if (isValid) {
        axios({
            method: "post",
            url: "https://shop.cyberlearn.vn/api/Users/signup",
            data: user,
            
        }).then(function (result) {
            console.log("Đăng ký thành công",result);
            alert('đăng ký thành công');
            dsUser.addUser(result);
            setLocalStorage();
        }).catch(function (error) {
            console.log(error)
            alert('email đã được đăng ký')
        });
         
       
    }  

    event.preventDefault();
}



