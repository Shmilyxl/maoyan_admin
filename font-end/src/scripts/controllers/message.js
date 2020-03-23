import messageView from '../views/message.art'

export const msg = (req, res) => {
        res.render(messageView())
        var socket = io.connect('http://localhost:8082')
        const content = document.getElementById('content')
        document.querySelector('#submit').addEventListener('click', function() {
            var msg2 = msg.value
            socket.emit('receive', msg2)
            msg.value = ''
            content.innerHTML += msg2 + "<br/>"
        }, false)
        socket.on('message', function(msg) {
            content.innerHTML += msg + '<br/>'
        })
        new message()
    }
    /* class message {
        constructor() {
            this.render()
        }
        render() {
            console.log(123);

        }






    }

    export default message */