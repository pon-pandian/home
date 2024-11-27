const express = require("express");
const router = express.Router();
const controler = require("../controler/controler");

router.get("/", controler.showAll);
router.get('/:id', controler.show);
router.delete('/:id',controler.remove);
router.post('/', controler.attach);
router.patch('/:id', controler.update);

module.exports = router;



