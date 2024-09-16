const express = require('express');
const router = express.Router()


router.get("/"), (req, res) => {
    res.send({ data: "Data Created" })
}

router.post("/"), (req, res) => {
    res.send({ data: "Data Added" })
}

router.put("/"), (req, res) => {
    res.send({ data: "Data Updated" })
}

router.delete("/"), (req, res) => {
    res.send({ data: "Data Deleted" })
}

module.exports = router;