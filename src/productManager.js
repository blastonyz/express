const fs = require('fs')

class ProductManager{
   

    constructor(){
        this.products = [];
        this.path = './productos.txt'
    }

   async getProducts(){
        if(!fs.existsSync(this.path)){
            return console.log('el archivo no se encuentra')
        }else{
            try {                           
                    const listJSON = await fs.promises.readFile(this.path,'utf-8');
                    const list = JSON.parse(listJSON);                    
                    console.log('Lista de productos:',list);
                    return list;
            }catch (error) {
                console.error(`Ocurrio un error: ${error.message}`)
        }
        }
    }

 async addProduct(title,description,price,thumbnail,code,stock){
        if (!title||!description||!price||!thumbnail||!code||!stock) {
          return  console.warn("Todos los campos son requeridos");
            
             }
             const validCode = this.products.find((p)=> p.code === code)
             if (validCode) {
                return console.log(`Ya existe este codigo ${code} de producto`);
                
             }else{
                const newProduct = {
                    id: this.products.length + 1,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                }
               
                this.products.push(newProduct)
                console.log('Producto agregado:',newProduct)

                const content = JSON.stringify(this.products,null,'\t')

                try {
                   await fs.promises.writeFile(this.path,content,'utf-8')
                } catch (error) {
                   console.log(`Ha ocurrido un error: ${error.message}`) 
                }

             }

    }

    async getProductsbyId(prodid){

        if(!fs.existsSync(this.path)){
            return console.log('el archivo no se encuentra')
        }else{
            try {                           
                    const listJSON = await fs.promises.readFile(this.path,'utf-8');
                    const list = JSON.parse(listJSON);
                    const getId = list.find((p)=> p.id == prodid)
                    if(!getId){
                        console.warn("Product not Found")
                        return
                    }
                    console.log("Producto Buscado:",getId)
                    return getId;
            }catch (error) {
                console.error(`Ocurrio un error: ${error.message}`)
        }
        }
       
    }

    async updateProduct(prodid,newTitle,newDescription,newPrice,NewThumbnail,newCode,newStock){
        
        if(!fs.existsSync(this.path)){
            return console.log('el archivo no se encuentra')
        }else{
            try {                           
                    const listJSON = await fs.promises.readFile(this.path,'utf-8');
                    const list = JSON.parse(listJSON);
                    const index = list.findIndex((e)=> e.id === prodid);
                    console.log(index)
                       if(index !== -1){
                        const updatedObj = {...this.products[index],title: newTitle ? newTitle: this.products[index].title, description: newDescription ? newDescription : this.products[index].description, price: newPrice ? newPrice: this.products[index].price,thumbnail: NewThumbnail ? NewThumbnail: this.products[index].thumbnail , code: newCode? newCode:this.products[index].code, stock: newStock? newStock:this.products[index].stock};
                        this.products[index] = updatedObj;
                        console.log(this.products)
                        const content = JSON.stringify(this.products,null,'\t')

                         try {
                           await fs.promises.writeFile(this.path,content,'utf-8')
                           return console.log('producto actualizado')
                             } catch (error) {
                            console.log(`No pudo actualizarse el producto: ${error.message}`) 
                             }
                                      }
            
                    }catch (error) {
                        console.error(`Ocurrio un error: ${error.message}`)
                 }
            }
        }
    async deleteProduct(prodid){
            
        if(!fs.existsSync(this.path)){
            return console.log('el archivo no se encuentra')
        }else{
            try {                          
                    const listJSON = await fs.promises.readFile(this.path,'utf-8');
                    const list = JSON.parse(listJSON);
                    const deletedList = list.filter((e)=> e.id !== prodid)
                    console.log(deletedList)
                    const content = JSON.stringify(deletedList,null,'\t')
                    try {
                        await fs.promises.writeFile(this.path,content,'utf-8')
                        return console.log('producto borrado')
                          } catch (error) {
                         console.log(`No se pudo borrar: ${error.message}`) 
                          }
                  
            } catch (error) {
            console.error(`No se pudo borrrar el prducto: ${error.message}`)
                }  
        
            }
    }    

}





 const productManager = new ProductManager
//instacia de productos
 productManager.addProduct(
    "Taladro Makita",
    "Rotopercutor",
    60000,
    "taladro.jpg",
    23,
    10,

 )
 
 productManager.addProduct(
    "Lijadora Orbital",
    "5 velocidades",
    35000,
    "lijadora.jpg",
    301,
    10,
 )
 productManager.addProduct(
    "Compresor Daewo",
    "1/2hp",
    55000,
    "compresor.jpg",
    375,
    77,
 )
 
 productManager.addProduct(
   "Amoladora Stanley" ,
    "2 1/2",
    52000,
    "mola.jpg",
    221,
    32,
 )

 productManager.addProduct(
    "Caladora Marolio" ,
    "le da sabor a tu vida",
    2500,
    "cala.jpg",
    475,
    150 ,
  )

  productManager.addProduct(
    "Inflador ACME" ,
    "sin garantia",
    1800,
    "inflador.jpg",
    85,
    23,
  ) 

  productManager.addProduct(
    "Taladro p/Drywalt Bosch" ,
    "700w",
    25000,
    "taladro.jpg",
    566,
    65,
  )

  productManager.addProduct(
    "Termofusora Noderrit" ,
    "1500w",
    35000,
    "fusora.jpg",
    862,
    65,
  )

  productManager.addProduct(
    "Motosierra Truchan" ,
    "Z50",
    21000,
    "moto.jpg",
    789,
    25,
  )

  productManager.addProduct(
    "Soldadora Luqstoff" ,
    "2500w",
    95000,
    "solda.jpg",
    654,
    68,
  )
 module.exports = productManager;