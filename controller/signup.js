function signUp(){
    const name = document.getElementById("signUp__name").value;
    const pass = document.getElementById("signUp__address").value;
    const email = document.getElementById("signUp__email").value;
    const gender = document.getElementById("signUp__gender").value;
    const phone = document.getElementById("signUp__phone").value;

    axios({
        method: 'post',
        url: 'https://shop.cyberlearn.vn/api/Users/signup',
        data: {
            "email": "string",
            "password": "string",
            "name": "string",
            "gender": true,
            "phone": "string"
          },
    })
        .then(function (response) {
            console.log(response);
            alert("đăng ký thành công");
        })
        .catch(function (error) {
            console.log(error);
        });
    }
signUp();