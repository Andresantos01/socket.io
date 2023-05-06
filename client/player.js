const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  const user_access = {
    name: 'admin',
    password: 123
  }

  let playerPosition = {
    positionX: 144,
    positionY: 456,
    positionZ: 426
  }

  let startGame = true;

  socket.emit('client_access', user_access);

  socket.on('player_authenticated',(authenticationPlayer)=>{
    if(authenticationPlayer.authentication === true)
    {
      console.log('........authentication successfully........')
      console.log(`........user profile: ${authenticationPlayer.user.name} ........`)
      socket.on('button_play',(confirm)=>{
        console.log(`........${confirm}........`)
      })
      socket.emit('button_play', startGame);

      socket.emit('player_position', playerPosition);

    }
    else
    {
      console.log('........yours credentials are incorrect........')
    }
  })

  


});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});


