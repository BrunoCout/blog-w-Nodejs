const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Está é a página principal")
})

module.exports = router