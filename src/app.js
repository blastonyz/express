const {ProductManager}  = require('./productManager');
const {productManager} = require('./productManager')
const express = require('express');


const app = express();

app.use(express.urlencoded({extended: true}))


app.get('/',(req,res) => {
    res.send('home')
});

app.get('/products/',async (req,res) => {
    
    let product = await productManager.getProducts();
    res.send(product)
});

app.listen(8080,()=>{console.log('servidor flaco')})


/*;*/