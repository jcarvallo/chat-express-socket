module.exports = io => {

    let userLogin=[];
    
    io.on('connection', socket => {
       console.log('Usuario conectado');

       socket.on('send',data =>{
          io.sockets.emit('new',{
              msg:data,
              user:socket.user
          })
       })

       socket.on('login',(req,res) =>{
        if (userLogin.indexOf(req)!=-1) {
            res(false)
        } else {
            res(true)
            socket.user=req;
            userLogin.push(socket.user)
            updateUsersLogin();
        }
   
       })
       socket.on('disconnect',data=>{
           if (!socket.user) return;
           userLogin.splice(userLogin.indexOf(socket.user),1)
           updateUsersLogin();       
       })

       function updateUsersLogin(){
        io.sockets.emit('users',userLogin)
       }

    });
    

}