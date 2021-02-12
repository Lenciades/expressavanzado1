var id=0;
let producto=class Product{
    constructor(title,price,thumbnail){
        this.title=title;
        this.price=price;
        this.thumbnail=thumbnail;
    }
    addNextId(){
        this.id=id++;
        return this;
    }
    replaceId(reqId){
        this.id=reqId;
        return this;
    }
} 
module.exports=producto