const { response } = require('express');
const express = require('express');
const moment = require('moment');
const Container = require('./classContainer');

const app = express();

//We initialize port 8080 for our express server
const server = app.listen(8080,()=>{
    console.log("Listening on port 8080");
})

//We call our class Container
const containerProducts = new Container();

//We create root path in an informative way
app.get('/',(req,res)=>{
    res.send('<h1 style="color:blue;">Challenge 06</h1>')
})

//We look for the list of products from the products.json file
app.get('/products',async (req,res)=>{
    let list_products = await containerProducts.getAll()
    let list_productsArray = Object.values(list_products);
    res.send(
        list_productsArray
    )
})

//We fetch the list of products randomly from the products.json file
app.get('/productRandom',async (req,res)=>{
    let listProducts = await containerProducts.getAll();

    // Defining the number of random values
    let n = 1;

    // Shuffling the object
    let productRandom = Object.values(listProducts).map((e, i, a) => {
        
        // Getting a random value between [i, a.length]
        // Math.floor can be translated as ~~
        let j = Math.floor(Math.random() * (a.length - i) + i);
        
        // Switching the elements of positions i & j
        [a[i], a[j]] = [a[j], a[i]];
        
        // Returning current value
        return a[i];
        
    });

    // Getting random keys
    let randomValues = productRandom.slice(0, n);
    
    
    res.send({
        msg:"Producto: ",
        randomValues
    })
})