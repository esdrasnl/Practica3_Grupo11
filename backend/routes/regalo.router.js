const express=require('express');
const regalo=require('../controller/regalo.controller');
const router =express.Router();


router.post('/agregar',regalo.postRegalo);
router.post('/agregar/detalle',regalo.postDetalleRegalo);
router.get('/:iduser',regalo.getListBuyForUser);
router.get('/receptor/:userReceptor',regalo.getListUserReceptor);
module.exports=router;
