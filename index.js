const express = require('express')
const app = express()

let persons = [
  {
    id: 1,
    number: "235234",
    name: "Jens"
  },
  {
    id: 2,
    number: "2435234",
    name: "Mårten"
  },
  {
    id: 3,
    number: "325023490",
    name: "Jasse"
  },
]

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
  const date = new Date();
  response.send(`<p> No. of persons in the phonebook: ${persons.length}</p> <br/>
  ${date}`
  )
})
const generateId = () => {
  var id = 0;
  while(true){
    id = Math.floor(Math.random()*10000)
    if(!persons.map(n => n.id).includes(id)){
      break;
    }
    
  }

  return  id
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  if(persons.map(person => person.name.toLowerCase()).includes(body.name.toLowerCase())){
    response.status(409).end()
  }
  else{
  const person = {
    name: body.name,
    number: body.number || false,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
}
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  if(persons.map(person => person.id).includes(id)){
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  }
  else{
    response.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})