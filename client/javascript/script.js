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
          alert(data)
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
      success: function(data){
        console.log(data);
        if (data == 'wrong username or password') {
          alert('wrong username or password')
        }else{
          localStorage.setItem('token', data);
          window.location.href="http://127.0.0.1:8080/home.html"
        }
      }
    })
}

function logout(){
  localStorage.clear()
  window.location.href = 'http://127.0.0.1:8080'
}
