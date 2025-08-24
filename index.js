const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const app=express();
app.use(express.json()); //middleware



(async function connectDB(){ 
    try{
        const connection=await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    }catch(error){
        console.log(error);
    }
})();

const productSchema=new mongoose.Schema({
    name:String,
    price:Number,
    category:String
});

const Product=mongoose.model('product',productSchema);

app.get('/',(req,res)=>{
    res.send("Hello World!")
});


//now we are creating apis to connect to the server api:application programming interfaces
//frame work :express package for creating server
//for the database mongodb
//Admin@#123
//'mongodb+srv://pt3134:d0vSohu10ivD0HmB@cluster0.ejck7rl.mongodb.net/Node-Server'
//mongoose for dealing with mongodb components

//create 
app.post('/product',async (req,res)=>{

    try{
       console.log(req.body);

    }catch (error){
        console.log(error);
    }
})
//read
app.get('/products',async (req,res)=>{
    try{
        const products=await Product.find();
        res.json(products);
    }catch (error){
        console.log(error);
    }
});
//update
app.put('/product/:id',async (req,res)=>{
    try{
        const { id } = req.params;
        await Product.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.send('Product Updated successfully')
    }catch (error){
        console.log(error);
    }
});
//delete
app.delete('/product/:id',async (req,res)=>{
    try{
        const { id } = req.params;
        await Product.findOneAndDelete({ _id: req.params.id });
        res.send('Product Deleted successfully')
    }catch (error){
        console.log(error);
    }
});
app.listen(5000,()=>{
    console.log('Server is running on port 5000');
}); //server is created successfully 
