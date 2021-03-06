const assert = require("assert");
const request = require("supertest");
const usuarios = require("../routes/usuario.router");
var express = require("express");
const { response } = require("express");
var app = express();
const bodyparser = require('body-parser');
var express = require('express');
var app = express();
var cors = require('cors');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

describe("Express usuarios", async () => {
    it("TestpostUser POST request /agregar", (done) => {
      request(app.use(usuarios))
        .post("/agregar")
        .send({"user_name": "us","correo": "us1@gmail.com","clave":"123","nombre": "usuario1","apellido":"users","cui":"7868776","edad":"23","ref_id_tipo":"1"})
        .expect(200)
         .end( (err,res)=>{
         console.log(res.body);
          if (err) {
            done(err);
          }else{
            done();
          }
         });
    });
    it("TestTipoDatoCui POST request /agregar", (done) => {
        request(app.use(usuarios))
          .post("/agregar")
          .send({"user_name": "us","correo": "us1@gmail.com","clave":"123","nombre": "usuario1","apellido":"users","cui":"hola","edad":"23","ref_id_tipo":"1"})
          .expect(200)
           .end( (err,res)=>{
           console.log(res.body);
            if (err) {
              done(err);
            }else{
              done();
            }
           });
      });
      it("TestTipoDatoEdad POST request /agregar", (done) => {
        request(app.use(usuarios))
          .post("/agregar")
          .send({"user_name": "us","correo": "us1@gmail.com","clave":"123","nombre": "usuario1","apellido":"users","cui":"2342342","edad":"dfgf","ref_id_tipo":"1"})
          .expect(200)
           .end( (err,res)=>{
           console.log(res.body);
            if (err) {
              done(err);
            }else{
              done();
            }
           });
      });  
    it("TestNotFound Post request /agregar",(done)=>{
      request(app.use(usuarios))
      .post("/add")
      .send({"user_name": "us","correo": "us1@gmail.com","clave":"123","nombre": "usuario1","apellido":"users","cui":"7868776","edad":"23","ref_id_tipo":"1"})
      .expect(404)
      .end((err,res)=>{
          if(err){
              done(err);
          }else{
              done();
          }
      })
  });
    it("TestNotFound Post request /agregar",(done)=>{
        request(app.use(usuarios))
        .post("/add")
        .send({"user_name": "us","correo": "us1@gmail.com","clave":"123","nombre": "usuario1","apellido":"users","cui":"7868776","edad":"23","ref_id_tipo":"1"})
        .expect(404)
        .end((err,res)=>{
            if(err){
                done(err);
            }else{
                done();
            }
        })
    });

/**
 * ***********************************************************************************************
 *            GETUSUARIO----obtenerMiUsuario
 * ************************************************************************************************
 */
  it("TestObtenerMisuario request GET /obtenerMiusuario",(done)=>{
    request(app.use(usuarios))
    .get("/obtenerMiUsuario")
    .send({"correo":"yova22@gmail.com"})
    .expect(200)
    .end((err,res)=>{
      if(err){
        done(err);
      }else{
        done();
      }
    })
  });
  it("TestObtenerusuarioDatavacio request GET /obtenerMiusuario",(done)=>{
    request(app.use(usuarios))
    .get("/obtenerMiUsuario")
    .send({"correo":""})
    .expect(200)
    .end((err,res)=>{
      if(err){
        done(err);
      }else{
        done();
      }
    });
  });
  it("TestDataIncorect request GET /obtenerMisuaurio",(done)=>{
    request(app.use(usuarios))
    .get("/obtenerMiUsuario")
    .send({"correo":"holaDD"})
    .expect(200)
    .end((err,res)=>{
      if(err){
        done(err);
      }else{
        done();
      }
    });
  })  

    /**
     * ******************************************************************************************************
     */
    //===============================================Pruebas unitarias para login================================
    it("TestLoginPost request /login",(done)=>{
      request(app.use(usuarios))
      .post("/login")
      .send({"email":"yova22@gmail.com","clave":"123"})
      .expect(200)
      .end((err,res)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      })
    });
    it("TestLoginDataNull request /login",(done)=>{
      request(app.use(usuarios))
      .post("/login")
      .send({"email":"","clave":"123"})
      .expect(200)
      .end((err,res)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      })
    });
    it("TestLoinClaveVacio request /login",(done)=>{
      request(app.use(usuarios))
      .post("/login")
      .send({"email":"yova22@gmail.com","clave":""})
      .expect(200)
      .end((err,res)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      })
    });
    it("TestLoginCamposVacios request  /login",(done)=>{
      request(app.use(usuarios))
      .post("/login")
      .send({"email":"","clave":""})
      .expect(200)
      .end((err,res)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      });
    });

});