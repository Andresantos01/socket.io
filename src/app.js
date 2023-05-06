const app = require('http').createServer()
const io = require('socket.io')(app)

io.on('connection', (socket) => {
    console.log('........A user connected........')

    socket.on('client_access', (data) => {
        const userDataBase = {
            user_id: 1,
            name: 'admin',
            password: 123,
            token: null,
            avatar: {
                name: 'Thor',
                skill: 'strong'
            }
        }



        if (data.name === userDataBase.name && data.password === userDataBase.password) {

            const token_access = Math.floor(Math.random() * 100000000000)
            userDataBase.token = token_access

            const infoToPlayGame = {
                user_id: userDataBase.user_id,
                name: userDataBase.name,
                token: userDataBase.token,
                atavar: userDataBase.avatar
            }

            socket.emit('player_authenticated', { token: userDataBase.token, authentication: true, user: infoToPlayGame })

            console.log('........player authenticated can play now........')
            socket.emit('button_play', 'Play now?')

            socket.on('button_play', (confirm) => {
                if (confirm === true) {
                    socket.emit('button_play', ` info to game - avatar:${infoToPlayGame.atavar.name}, skill: ${infoToPlayGame.atavar.skill}`)
                    socket.on('player_position', (data) => {

                        console.log(`........Game running  
        avatar:${infoToPlayGame.atavar.name}   | 
        skill: ${infoToPlayGame.atavar.skill}  | 
        positionX: ${data.positionX} | 
        positionY: ${data.positionY} | 
        positionZ: ${data.positionZ}
........ `)
                    })
                }
                else {
                    socket.emit('button_play', 'await player to play')
                }
            })



        }
        else {
            socket.emit('player_authenticated', { token: null, authentication: false })
        }
    });





    /* disconnection */
    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })




})

app.listen(3000, () => {
    //console.log('Socket.IO server running on port 3000')
})
