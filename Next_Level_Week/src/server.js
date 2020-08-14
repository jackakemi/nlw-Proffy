// Dados

const proffys = [
    {
        name: "Jackeline Akemi",
        avatar: "https://avatars2.githubusercontent.com/u/68870912?s=460&u=cfeaa7c6c6e0c934382b91764e75dc5c3a419f5e&v=4",
        whatsapp: "988877777",
        bio: "Amo história",
        subject: "História",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Fernanda Nunes",
        avatar: "https://avatars2.githubusercontent.com/u/46932355?s=460&u=922fdcc7785aa36356ac1e4be343b4cc88374840&v=4",
        whatsapp: "988877777",
        bio: "A lógica move o mundo",
        subject: "Matemática",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    }]

const subjects = [ 
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

//Servidor
const express = require('express')
const server = express()
const nunjucks = require('nunjucks')


// Funcionalidades
function getSubject(subjectNumber) {
    const position = +subjectNumber -1
    return subjects[position]
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query

// se tiver dados (data)
const isNotEmpty = Object.keys(data).length > 0
if (isNotEmpty) {

    data.subject = getSubject(data.subject)

    // adicionar data a lista de proffys
    proffys.push(data)

    return res.redirect("/study")
}  

    // se não, mostrar a página
    return res.render("give-classes.html", {subjects, weekdays})
}

// configurar nunjucks (template engine)
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//Início de configuração do servidor
server
    // configurar arquivos esáticos(css, script, imagens)
    .use(express.static("public"))
    // rotas de aplicação
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)

    // Start do servidor
    .listen(5500)
