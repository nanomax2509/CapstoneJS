const logoutButton = document.querySelector('#logoutButton');

logoutButton.addEventListener('click', function() {
  // Xóa thông tin đăng nhập khỏi localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');

  // Chuyển hướng trang đến trang đăng nhập
  window.location.replace('../index.html');
});