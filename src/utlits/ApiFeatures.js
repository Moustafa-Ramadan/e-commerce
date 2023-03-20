class ApiFeatures {

constructor(mongooseQuery,querystring){
this.mongooseQuery=mongooseQuery;
this.querystring=querystring;


}

paginate(){

 ///// paginations/////
 let page=this.querystring.page*1 || 1
 if(page<1) page=1
 let limit=40
 let skip=(page-1)*limit
this.mongooseQuery.skip(skip).limit(limit)
this.page=page
return this

}

filter(){
    let querystring={...this.querystring }

let excludedQuery=['page','sort','fields','keyword']

excludedQuery.forEach((elm)=>{
  delete querystring[elm]
})
    console.log(this.querystring)
    console.log(querystring)

    /// price filter///////

    querystring=JSON.stringify(querystring);
    querystring=querystring.replace(/\b(gte|lte|gt|lt)\b/g,match=>`$${match}`)
    querystring=JSON.parse(querystring)
    console.log(querystring)

    this.mongooseQuery.find(querystring)
    return this
}


sort(){
    if(this.querystring.sort){
        let sortedBy=this.querystring.sort.split(",").join(" ")
        this.mongooseQuery.sort(sortedBy)
        console.log(sortedBy);
    }
    return this
}

search(){
    if(this.querystring.keyword){
    let keyword=this.querystring.keyword
    if(this.description){
        this.mongooseQuery.find(
            {$or:[{name:{$regex:keyword,$options:"i"}}
                 ,{description:{$regex:keyword,$options:"i"}}] })
    }else
    {
        this.mongooseQuery.find(
            {name:{$regex:keyword,$options:"i"} })
    }
       
        console.log(keyword);
    }
    return this
}

fields(){
    if(this.querystring.fileds){
    
        let selectedFields=this.querystring.fileds.split(",").join(" ")
       this.mongooseQuery.select(selectedFields)
        console.log(selectedFields);
    }
    return this
}





}


module.exports=ApiFeatures