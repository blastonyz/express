const express = require('express');
const productManager  = require('./productManager');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/',(req,res) => {
    res.send('home')
});

app.get('/products',async (req,res) => {
   const {query} = req;
   const {limit} = query;
   const product = await productManager.getProducts();
   if(!limit){   
    res.json(product);}else{
    const filtrated = product.filter((prod) => prod.id <=limit);
    console.log("filtrao")
    return res.json(filtrated);    
    }   
});

app.get('/products/:pId',async (req,res) => {
    const prodId = req.params.pId;
    const parseId = parseInt(prodId);
    const search =  await productManager.getProductsbyId(parseId);
    return res.send(search);
});
     


app.listen(8080,()=>{console.log('servidor flaco')})




/*app.get('/products/:pId',async (req,res) => {
    const prodId = req.params.pId;
    const parseId = parseInt(prodId);

    if (isNaN(parseId)) {
        res.status(400).json({ error: 'Invalid product ID' });
        return;
    }   
         try {
        const search = await productManager.getProductsbyId(parseId);
                if (search) {
                console.log('Producto Buscado:', search);
                res.json(search);  
                     }else {
                    res.status(404).json({ error: 'Product not found' });
                  }
         }catch (error) {
               console.error(error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    });    
   */