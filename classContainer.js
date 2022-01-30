const fs = require('fs');

/*
Schema

    product = {
    title:String (nombre del producto) (required),
    price:Number (precio) (required),
    thumbnail:String (url de la foto del producto) (uniqued) (required)
    } 
 */

//Declaramos la ruta en una variable
const pathToProducts = './files/products.json'

class Container {
    
    createProduct = async (product) => {
        //Validations
        if(!product.title||!product.price||!product.thumbnail) return {status:"error", error:"missing fields"}
        try{
            if(fs.existsSync(pathToProducts)){

                let data = await fs.promises.readFile(pathToProducts,'utf-8');
                let products = JSON.parse(data);
                let id = products[products.length-1].id+1;
                product.id = id;
                products.push(product);
                await fs.promises.writeFile(pathToProducts,JSON.stringify(products,null,2))
                return {status:"success",message:"Product created"}

            }else{//The file does not exists

                product.id = 1
                await fs.promises.writeFile(pathToProducts,JSON.stringify([product],null,2))
                return {status:"success",message:"Product created"}

            }
        }catch(error){

            return {status:"error",message:error}
        }
    }

    getAll = async () => {
        try{

            if(fs.existsSync(pathToProducts)){

                let data = await fs.promises.readFile(pathToProducts,'utf-8');
                let products = JSON.parse(data);
                let listProducts = products
                return listProducts
    
            }else{
                return {status:"error",message:"The products do not exist"}
            }

        }catch(error){

            return {status:"error",message:error}
        }
    }

    getById = async (id) => {
        //Validations
        if(!id) return {status:"error", error:"Product id not found. I need id"}
        try{

            if(fs.existsSync(pathToProducts)){
            
                let data = await fs.promises.readFile(pathToProducts,'utf-8');
                let products = JSON.parse(data);
                let product = products.find(p=>p.id==id);
                if(product) return {status:"success",listProducts:product}
                else return {status:"error",error:"Product not found"}
    
            }

        }catch(error){

            return {status:"error",message:error}
        }
    }
    
    updateProduct = async (id,updateProduct) => {
        //Validations
        if(!id) return {status:"error", error:"Product id not found. I need id"}
        try{

            if(fs.existsSync(pathToProducts)){

                let data = await fs.promises.readFile(pathToProducts,'utf-8');
                let products = JSON.parse(data);
                let newProducts = products.map((product)=>{
                    if(product.id===id){
                        updateProduct.id=id;
                        return updateProduct;
                    }
                    else{
                        return product;
                    }
                });
                await fs.promises.writeFile(pathToProducts,JSON.stringify(newProducts,null,2))
                return {status:"success",message:"Product up"}
            }

        }catch(error){

            return {status:"error",message:error}
        }
    }

    deleteById = async (id) => {
        //Validations
        if(!id) return {status:"error", error:"Product id not found. I need id"}
        try{

            if(fs.existsSync(pathToProducts)){
                let data = await fs.promises.readFile(pathToProducts,'utf-8');
                let products = JSON.parse(data);
                let newProducts = products.filter(product=>product.id!==id);
                await fs.promises.writeFile(pathToProducts,JSON.stringify(newProducts,null,2))
                return {status:"success",message:"Product deleted"}
            } 

        }catch(error){

            return {status:"error",message:error}
        }

    }

    deleteAll = async (product) => {
        //Validations
        // if(!product) return {status:"error", error:"There are no products loaded. I need a product to delete"}
        try{

            if(fs.existsSync(pathToProducts)){
                let data = await fs.promises.readFile(pathToProducts,'utf-8');
                let products = JSON.parse(data);
                let newProducts = products.filter(p => p.product == 0);
                await fs.promises.writeFile(pathToProducts,JSON.stringify(newProducts,null,2))
                return {status:"success",message:"Product deleted"}
            }

        }catch(error){

            return {status:"error",message:error}
        }
    }

}

module.exports = Container;