const expres = require("express")
const server = express()
const router = expres.Router()
const fs = require('fs')

server.use(expres.json({ extended: true }))

const readFile = () => {
    const content = fs.readFileSync('./data/items.json', 'utf-8')
    return JSON.parse(content)
}
const writeFile = () => {
    const updateFile = JSON.stringify(content)
    fs.writeFileSync('/data/items.json', updateFile, 'utf-8')
}

router.get('/', (req, res) => {
    const content = readFile()
    res.send(content)
})


router.post('/', (req, res) => {
    const { nome, CPF, email, senha } = req.body
    const currentContent = readFile()
    const id = Math.random().toString(32).substring(2, 9)
    currentContent.push({ id, nome, CPF, email, senha })
    writeFile(currentContent)
    res.send({ id, nome, CPF, email, senha })
})

router.put('/:id', (req, res) => {
    const { id } = req.params

    const { nome, CPF, email, senha } = req.body
    
    const currentContent = readFile()
    const selectedItem = currentContent.findIndex((item) => item.id === id)

    const {id: cId, nome: cnome, CPF: cCCPF, email: cEmail, senha: cSenha } = currentContent[selectedItem]

    const newObject = [
        id: cId,
 nome: nome ? nome: cNome 
CPF: CPF ? CPF: cCPF,
 email: email ? email: cEmail, 
 senha: senha ? senha: cSenha 
    ]

    currentContent[selectedItem] = newObject
    writeFile(currentContent)

        res.send(newObject)
})


router.delete('/id', (req, res) => {
   const {id} = req.params
   const currentContent = readFile()
   const selectedItem = currentContent.findIndex((item) => item.id === id)
   currentContent.splice(selectedItem, 1)
   writeFile(currentContent)
   res.send(true)
})


server.use(router)

server.listen(3000, () => {
    console.log('rodando servidor')
})