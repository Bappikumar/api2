const express = require('express');
const mongoose = require('mongoose');

const app = express();

//middlware
app.use(express.json());

//Schema 
const userSchema = new mongoose.Schema({
    name: {
      type: String
    },
    age: {
      type: String
    },
    id: {
      type: String
    }
  });

  //model
  const User = mongoose.model('User', userSchema);



//Routing 
app.get('/campus/user',async function(req, res){
    const users =await User.find();

    res.status(200).json({
        status: 'success',
        result: users.length,
        data: {
            user: users
        }
    })
});

app.get('/campus/user/:id',async function(req, res){
    const users =await User.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        result: users.length,
        data: {
            user: users
        }
    })
})

app.post('/campus/user',async function(req, res){
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    })
    
});



app.delete('/campus/user/:id',async function(req, res){
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    })
    
});

app.patch('/campus/user/:id',async function(req, res){
   const user =  await User.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            user: user
        }
    })
    
});


mongoose.connect('mongodb+srv://bappikumar16:bappikumar615.@restfulapi-4fzdk.mongodb.net/Bappi?retryWrites=true&w=majority',{
    useNewUrlParser: true
}).then(function(){
    console.log('DB connect successfull')
}).catch(function(){
    console.log('DB connect faild')
});


//Server create
const port = 4000;
app.listen(port,function(){
    console.log('Server run on port 4000');
});