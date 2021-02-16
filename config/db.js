if(process.env.NODE_ENV == "production"){
    module.exports = {mongoURI: "mongodb://bruno:<bruno4422>@blogapp-shard-00-00-wkfqp.mongodb.net:27017,blogapp-shard-00-01-wkfqp.mongodb.net:27017,blogapp-shard-00-02-wkfqp.mongodb.net:27017/<blogapp>?ssl=true&replicaSet=blogapp-shard-0&authSource=admin&retryWrites=true&w=majority"}
}else{
    module.exports = {mongoURI: "mongodb://localhost/blogapp"}
}