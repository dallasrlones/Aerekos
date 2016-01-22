//tagstart.route.<^ model.name ^>//
server.get("/<^@ if(model.name != 'home'){ model.name } ^>", function(req, res){
    fs.readFile("templates/<^ model.name ^>.html", function(err, data){
        if(err){
            console.log(err.message);
            return res.send("<h1>Err</h1>");
        }
        res.send(data.toString());
    });
});
//tagstop.route.<^ model.name ^>//