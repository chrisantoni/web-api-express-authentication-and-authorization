$.ajax({
   url  : "http://localhost:3000/user",
   method : "GET",
   success: function(data) {
     if (localStorage.getItem("token")) {
     var temp = ''
     for (var i = 0; i < data.length; i++) {
         temp += `
            <tr>
            <td>${data[i].username}</td>
            </tr>
         `
       }
       $('#list_users').append(temp)
     }
   }
 })

function signup(){
    $.ajax({
      url  : "http://localhost:3000/user/signup",
      type : "POST",
      data: {
        username: $('#username').val(),
        password: $('#password').val()
      },
      success: function(data) {
        if (data.err) {
          alert(data.err)
        }
        else {
          alert("Register success! Now Login!")
        }
      }
    })
}

function login(){
    $.ajax({
      url  : "http://localhost:3000/user/login",
      type : "POST",
      data: {
        username: $('#username').val(),
        password: $('#password').val()
      },
      success: function(data) {
        if (data.err) {
          alert(data.err)
        }
        else {
          localStorage.setItem("token", data.token)
          localStorage.setItem("username", data.username)
          window.location.href = 'http://127.0.0.1:8080/home.html'
        }
      }
    })
}

function logout(){
  localStorage.clear()
  window.location.href = 'http://127.0.0.1:8080/sign_in.html'
}
