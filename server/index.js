const express = require('express')
const app = express()
const port = 80
// const path = require('path')

app.use(express.json())

app.use(require('cors')())

require('./data_base/db')

app.use('/api/users', require ('./routes/users'))
app.use('/api/vacations', require ('./routes/vacations'))
app.use('/api/follow', require ('./routes/follow'))

// app.use(express.static(path.join(__dirname,'build')))

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})