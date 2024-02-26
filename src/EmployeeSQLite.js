const express = require('express')
const Sequelize = require('sequelize')
const app = express()

app.use(express.json())

const sequelize = new Sequelize('database' , 'username' , 'password',{
    host:"localhost",
    dialect:"sqlite",
    storage:"./Database/TestSQEmployee.sqlite"
})

const Employee = sequelize.define("employee" , {
    Employeeid :{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    Name :{
        type: Sequelize.CHAR(30),
        allowNull: false 
    },
    Phone :{
        type: Sequelize.CHAR(10),
        allowNull: false        
    }, 
    Salary :{
        type: Sequelize.INTEGER,
        allowNull: false 
    },
    Post :{
        type: Sequelize.CHAR(20),
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


app.get('/employees/:id',(req,res)=>{
    Employee.findByPk(req.params.id).then(employee =>{
        if(!employee) {
            res.status(404).send('employeeid not found')
        }else{
            res.json(employee)
        }
    }).catch(err=>{
        res.status(500).send(err)
    })
})



app.post('/employees',(req,res)=>{
    Employee.create(req.body).then(employee =>{
        res.send(employee)
        
    }).catch(err=>{
        res.status(500).send(err)
    })
})


app.put('/employees/:id',(req,res)=>{
    Employee.findByPk(req.params.id).then(employee =>{
        if(!employee){
            res.status.send('employees not found')
        }else{
            employee.update(req.body).then(()=>{
                res.send(employee)
            }).catch(err=>{
                res.status(500).send(err)
            })
        }
    }).catch(err=>{
        res.status(500).send(err)
    })
})


app.delete('/employees/:id',(req,res)=>{
    Employee.findByPk(req.params.id).then(employee =>{
        if(!employee){
            res.status.send('Employee not found')
        }else{
            employee.destroy().then(()=>{
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