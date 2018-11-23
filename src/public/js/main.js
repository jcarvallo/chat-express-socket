$(()=>{

    const socket=io();

    //Formulario de mensajes
    const $message    =$('#message');
    const $messageForm=$('#message-form');
    const $chat       =$('#chat');
    $('#enviar').attr("disabled", "disabled");

    // $message.focus(function() {
    //   $('#enviar').removeAttr("disabled");    
    // });

    $message.focusout(function() {
      $('#enviar').attr("disabled", "disabled");    
    });

    if($message.val()===''){
      $('#enviar').attr("disabled", "disabled");  
    }else{
      $('#enviar').removeAttr("disabled");
    }
    

    $messageForm.submit(e=>{
      socket.emit('send',$message.val())
      $message.val('');
      $('#enviar').attr("disabled", "disabled");
      e.preventDefault(); 

    });

    socket.on('new',data=>{
      $chat.append(`<p class="whisper"><b>${data.user}</b>: ${data.msg}</p>`);
    })

    //Formulario de login
    const $loginForm =$('#login-form');
    const $userName  =$('#user-name');
    const $loginError=$('#loginError');
    const $users     =$('#usernames');



    $loginForm.submit(e=>{
      
      if ($userName.val()==='') {
        $loginError.html(`
            <div class="alert alert-danger">
              El usuario es requerido.
            </div>
          `);
      } else {
        socket.emit('login',$userName.val(),res=>{
          if(res){
            console.log(res)
            $('#login').hide();
            $('#content-mensajes').show();
          }else{
            console.log(res)
            $loginError.html(`
              <div class="alert alert-danger">
                El usuario ya existe.
              </div>
            `);
          }
  
  
        })
      }
     

      $userName.val('')
      e.preventDefault();
    })

    socket.on('users', data => {
      let html = '';

      for (let i of data) {
        html += `<p><i class="fas fa-user"></i> ${i}</p>`; 
      }

      $users.html(html);
    });


   
    
    

})