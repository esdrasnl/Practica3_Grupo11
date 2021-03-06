const compraCtrl = {};
const mysqldb = require('../database');
const router = require('../routes/gifcards.router');
const usuarioCtrl = require('./usuario.controller');

compraCtrl.insertaCompra = async function (req, res, next) {
    let { pkUser, numeroTarjeta, nombreTarjeta, fechaExpTarjeta, codigoVeriTarjeta, montoTotal, moneda } = req.body;
    let validaParametro = !pkUser || !moneda || !nombreTarjeta || !fechaExpTarjeta || !codigoVeriTarjeta || !montoTotal || !numeroTarjeta ||  isNaN(montoTotal);
    if (validaParametro) {
        return res.json({ 'estado': 'Datos no validos o Faltan datos' });
    } else {
        if (isNaN(numeroTarjeta) || isNaN(codigoVeriTarjeta) || isNaN(montoTotal)) {
            res.json({ 'estado': 'Revise el No de tarjeta, el codigo de verificacion o el monto total' });
        } else {
            const sql = `insert into compras values (default, ${pkUser}, md5('${numeroTarjeta}'), '${nombreTarjeta}', '${fechaExpTarjeta}', 
            ${codigoVeriTarjeta}, '${montoTotal}', '${moneda}');`;
            mysqldb.connection.query(sql, error => {
                if (error) throw error;
                res.json({ 'estado': 'true' });
            });
        }
    }
}

compraCtrl.insertaDetalleCompra = async function (req, res, next) {
    let { pkUser, cantidad, nombreGifCard, recargo, imagenGC, precio, subtotal, estado } = req.body;
    if (!pkUser || !cantidad || !nombreGifCard || !recargo || !imagenGC || !precio || !subtotal) {
        res.json({ 'estado': 'Ingrese todos los datos solicitados' });
    } else {
        if (isNaN(subtotal) || isNaN(precio) || isNaN(cantidad) || isNaN(recargo)) {
            //console.log('Revise la cantidad, el precio y el subtotal');
            res.json({ 'estado': 'Revise la cantidad, el precio y el subtotal' });
        } else {
            let idcompra = 0;
            const validacion = `select count(*) as retorno, idGCard as retorno2 from giffCard where nombre = '${nombreGifCard}' and image = '${imagenGC}' and precio = '${precio}' group by retorno2`;
            mysqldb.connection.query(validacion, function (err, rows, results) {
                console.log(rows.length);
                if (rows.length === 1) {
                    console.log('Registro Compra con detalles');
                    const sqlorden = `select max(idcompra) as Idcompra from compras where pkUser = ${pkUser}`;
                    mysqldb.connection.query(sqlorden, function (req, results3) {
                        idcompra = results3[0].Idcompra;
                        console.log(idcompra);
                        console.log(subtotal);
                        let validaParametro = !subtotal;
                        if (validaParametro) {
                            return res.json({ 'estado': 'Datos no validos o Faltan datos' });
                        } else {
                            const insHist = `insert into historial values (default, '${nombreGifCard}',${cantidad},'${imagenGC}',${precio},'Comprado', ${pkUser})`;
                            const sql = `insert into detalleCompra values (default, ${cantidad}, ${recargo}, ${subtotal}, ${rows[0].retorno2}, ${idcompra})`;
                            mysqldb.connection.query(sql, error => {
                                if (error) throw error;
                                mysqldb.connection.query(insHist, error => {
                                    if (error) throw error;
                                    res.json({ 'estado': 'true' });
                                });
                                //res.json({ 'estado': 'true' });
                            });
                        }
                    });
                } else if (rows.length === 0) {

                    console.log('Registro de detalles');
                    const sql = 'insert into giffCard set?';
                    const gCardObj = {
                        nombre: nombreGifCard,
                        image: imagenGC,
                        precio: precio,
                        estado: estado
                    };
                    mysqldb.connection.query(sql, gCardObj, error => {
                        if (error) throw error;
                        const validacion = `select count(*) as retorno, idGCard as retorno2 from giffCard where nombre = '${nombreGifCard}' and image = '${imagenGC}' and precio = '${precio}' group by retorno2`;
                        mysqldb.connection.query(validacion, function (err, rows, results) {
                            if (rows.length === 1) {
                                console.log('Registro Compra con detalles');
                                const sqlorden = `select max(idcompra) as Idcompra from compras where pkUser = ${pkUser}`;
                                mysqldb.connection.query(sqlorden, function (req, results3) {
                                    idcompra = results3[0].Idcompra;
                                    console.log(idcompra);
                                    console.log(subtotal);
                                    let validaParametro = !subtotal;
                                    if (validaParametro) {
                                        return res.json({ 'estado': 'Datos no validos o Faltan datos' });
                                    } else {
                                        const insHist = `insert into historial values (default, '${nombreGifCard}',${cantidad},'${imagenGC}',${precio},'Comprado', ${pkUser})`;
                                        const sql = `insert into detalleCompra values (default, ${cantidad}, ${recargo}, ${subtotal}, ${rows[0].retorno2}, ${idcompra})`;
                                        mysqldb.connection.query(sql, error => {
                                            if (error) throw error;
                                            res.json({ 'estado': 'true' });
                                        });
                                    }
                                });
                            }
                        });
                    });
                }

            });
        }
    }
}

module.exports = compraCtrl;