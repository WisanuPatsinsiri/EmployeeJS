const express = require('express')
const Sequelize = require('sequelize')
const app = express()

app.use(express.json())

const sequelize = new Sequelize('database' , 'username' , 'password',{
    host:"localhost",
    dialect:"sqlite",
    storage:"./Database/Employee.sqlite"
})

const Employee = sequelize.define("employee" , {
    Employee_id :{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    Name :{
        type: Sequelize.STRING,
        allowNull: false 
    },
    Phone :{
        type: Sequelize.STRING,
        allowNull: false        
    }, 
    Salary :{
        type: Sequelize.INTEGER,
        allowNull: false 
    },
    Post :{
        type: Sequelize.STRING,
        allowNull: false        
    }, 
})

sequelize.sync()

app.get('/employees',(req,res)=>{
    Employee.findAll().then(employees =>{
        res.json(employees)
    }).catch(err=>{
        res.status(500).send(err)
    })
})


app.get('/employees/:Employee_id',(req,res)=>{
    Employee.findByPk(req.params.id).then(employees =>{
        if(!employees) {
            res.status(404).send('employees_id not found')
        }else{
            res.json(employees)
        }
    }).catch(err=>{
        res.status(500).send(err)
    })
})



app.post('/employees',(req,res)=>{
    Employee.create(req.body).then(employees =>{
        res.send(employees)
        
    }).catch(err=>{
        res.status(500).send(err)
    })
})


app.put('/employees/:Employee_id',(req,res)=>{
    Employee.findByPk(req.params.id).then(employees =>{
        if(!employees){
            res.status.send('employees not found')
        }else{
            employees.update(req.body).then(()=>{
                res.send(employees)
            }).catch(err=>{
                res.status(500).send(err)
            })
        }
    }).catch(err=>{
        res.status(500).send(err)
    })
})


app.delete('/employees/:Employee_id',(req,res)=>{
    Employee.findByPk(req.params.id).then(employees =>{
        if(!employees){
            res.status.send('Bookn not found')
        }else{
            employees.destroy().then(()=>{
                res.send({})
            }).catch(err=>{
                res.status(500).send(err)
            })
        }
    }).catch(err=>{
        res.status(500).send(err)
    })
})

const port = process.env.PORT || 3000
app.listen(port,()=> console.log(`Now The Server is listening on port ${port}`))