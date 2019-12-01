const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.get('/',(request,response)=>{
    const connection = db.connect()
    const stmt = `select id,title,description,price from product`
    connection.query(stmt , (error , data) =>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.post ('/',(request,response)=>{
    const {title , description , price} = request.body
    const connection = db.connect()
    const stmt = `insert into product (title,description,price) values ('${title}','${description}',${price})`
    connection.query(stmt , (error , data) =>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.put('/:id',(request,response)=>{

    const id  = request.params.id 
    const {title , description , price} = request.body

    const connection = db.connect()

    const stmt = `update product set title = '${title}',description = '${description}' , price = ${price} where id = ${id}`
    connection.query(stmt , (error , data) =>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.delete('/:title',(request,response)=>{

    const title  = request.params.title 

    const connection = db.connect()

    const stmt = `delete from product where title = '${title}' `
    connection.query(stmt , (error , data) =>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})
module.exports = router  