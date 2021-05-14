const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const app = express()
const http = require('http')
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});


dotenv.config()

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log("Server Started")
}
)


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true 
}))

// Databse connection 
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
},(err) => {
    err ? console.log(err) : console.log("Conencted to db")
})

// Routes

app.use("/auth", require("./routes/userRouter"))


io.on('connection', socket => {
    console.log("connected")
    const id = socket.handshake.query.id
    socket.join(id)
  
    socket.on('send-message', ({ recipients, text }) => {
      recipients.forEach(recipient => {
        const newRecipients = recipients.filter(r => r !== recipient)
        newRecipients.push(id)
        socket.broadcast.to(recipient).emit('receive-message', {
          recipients: newRecipients, sender: id, text
        })
      })
    })
  })