var id=0;
let producto = class Product{
    constructor(title,price,thumbnail){
        this.title=title;
        this.price=price;
        this.thumbnail=thumbnail;
    }
    addProduct(){
        this.id=id++;
        return this;
    }
} 
module.exports=producto