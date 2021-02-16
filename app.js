// Carregando módulos
   const express = require("express")
   const handlebars = require("express-handlebars")
   const bodyParser = require("body-parser")
   const app = express()
   const admin = require("./routes/admin")
   const home = require("./routes/home")
   const posts = require("./routes/posts")
   const path = require("path")
   const mongoose = require("mongoose")
   const session = require("express-session")
   const flash = require("connect-flash")
   require("./models/Postagem")
   const Postagem = mongoose.model("postagens")
   const usuarios = require("./routes/usuario")
   const passport = require("passport")
   require("./config/auth")(passport)
   const db = require("./config/db")  
// Configurações
    // Sessão
        app.use(session({
            secret: "cursodenode",
            resave: true,
            saveUninitialized: true,
        }))

        app.use(passport.initialize())
        app.use(passport.session())

        app.use(flash())
    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null
            next()
        })
    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    // Handlebars
        app.engine("handlebars", handlebars({defaultLayout: "main"}))
        app.set("view engine", "handlebars")
    // Mongoose
      
       mongoose.Promise = global.Promise 
       mongoose.connect(db.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
           console.log("Conectado com sucesso")
       }).catch((err) => {
           console.log("Erro ao se conectar: "+err)
       })
    // Public
        app.use(express.static(path.join(__dirname,"public")))
        
       
// Rotas
    app.use("/admin", admin)
    app.get("/", (req, res) => {
        Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens) => {
        res.render("index", {postagens: postagens})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/404")
        })
        
    })

    app.get("/postagem/:slug", (req, res) => {
        Postagem.findOne({slug: req.params.slug}).lean().then((postagem) => {
            if(postagem){
                res.render("postagem/index", {postagem: postagem})
            }else{
                req.flash("error_msg", "Está postagem não existe")
                res.redirect("/")
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })
    })

    app.get("/404", (req, res) => {
        res.send("Erro 404")
    })

    app.use("/usuarios", usuarios)

    app.use("/posts", posts)
// Outros
const PORT = process.env.PORT || 8082
app.listen(PORT, () => {
    console.log("Servidor online")
})