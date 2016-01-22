//tagstart.route.<^ model.name ^>//
case "/<^@ if(model.name != 'home'){ model.name } ^>":
    fs.readFile("./templates/<^ model.name ^>.html", function(err, data){
        if(err){
            console.log(err.message);
            return res.end("<h1>Error</h1>");
        }
        return res.end(data.toString());
    });
    break;
//tagstop.route.<^ model.name ^>//