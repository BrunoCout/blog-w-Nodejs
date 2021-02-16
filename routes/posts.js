const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Está é a pagina de posts")
})

module.exports = router