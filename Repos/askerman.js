(function(askerman, RJ, fileMod, saver, routeMod, viewEngine){
    
    RJ.TemplateLocation("templates");
    
    askerman.GenViewSection = viewEngine.CreateSection;
    askerman.GenViewElement = viewEngine.CreateElement;
    askerman.RemoveViewSection = viewEngine.RemoveSection;
    askerman.GenViewAttribute = viewEngine.CreateAttribute;
    askerman.ReplaceElementContents = viewEngine.ReplaceElementContents;
    
    var GenHttpRoute = function(){
        process.stdin.setEncoding('utf8');
        console.log("What do you want to name your new http route?");
        process.stdin.on('readable', function() {
            var chunk = process.stdin.read();
            if (chunk !== null) {
                console.log("Creating Route...");
                saver.SaveFileAccess(function(savedJson){
                    routeMod.CreateHttpRoute(chunk.trim(), savedJson.servers[0].mainFile);
                    console.log(chunk.trim() + " Route Created");
                    process.exit();
                });
            }
        });
    };
    
    var GenExpressRoute = function(){
        process.stdin.setEncoding('utf8');
        console.log("What do you want to name your new http route?");
        process.stdin.on('readable', function() {
            var chunk = process.stdin.read();
            if (chunk !== null) {
                console.log("Creating Route...");
                saver.SaveFileAccess(function(saveFile){
                    
                    routeMod.CreateExpressRoute(chunk.trim(), saveFile.servers[0].mainFile);
                    console.log(chunk.trim() + " Route Created");
                    process.exit();
                    
                });
            }
        });
    };
    
    var RemoveRoute = function(){
        process.stdin.setEncoding('utf8');
        console.log("What is the name of the http route you wish to remove?");
        process.stdin.on('readable', function() {
            var chunk = process.stdin.read();
            if (chunk !== null) {
                console.log("Removing Route...");
                saver.SaveFileAccess(function(savedJson){
                    routeMod.RemoveRoute(chunk.trim(), savedJson.servers[0].mainFile);
                    console.log(chunk.trim() + " Route Removed");
                    process.exit();
                });
            }
        });
    };
    
    var GenHttpServer = function(){
        var model = {};
        var count = 0;
        process.stdin.setEncoding('utf8');
        console.log("What do you want to name your native NodeJS application?");
        process.stdin.on('readable', function() {
            var chunk = process.stdin.read();
            if (chunk !== null) {
                switch(count){
                    case 0:
                        model.name = chunk.trim();
                        console.log("What is your version number? Ex: 0.0.1");
                        break;
                    case 1:
                        if(chunk.split(".").length == 3){
                            model.version = chunk.trim();
                            console.log("How do you want to describe this application?");
                        } else {
                            return console.log("Your version number is incorrect Ex: 1.0.0");   
                        }
                        break;
                    case 2:
                        model.descript = chunk.trim();
                        console.log("What is your main starting file called?");
                        console.log("Ex: server.js or main.js or index.js");
                        break;
                    case 3:
                        if(chunk.indexOf(".js") == -1){
                            return console.log("Please include a valid starting file extention");
                        }
                        model.mainFile = chunk.trim();
                        console.log("Who is the author of this application?");
                        break;
                    case 4:
                        model.author = chunk.trim();
                        console.log("What license do you want for this app? Ex: MIT");
                        break;
                    case 5:
                        model.license = chunk.trim();
                        console.log(model);
                        console.log("Does this information look correct?");
                        console.log("Y/N");
                        break;
                    case 6:
                        if(chunk.trim() == "Y"){
                            var pkgJson = RJ.ReadTemplate("packagejsontemplate.json", model);
                            var serverJS = RJ.ReadTemplate("http_server_templates/httpservertemplate.js", model);
                            
                            fileMod.CreateFolder(model.name);
                            fileMod.CreateFolder(model.name + "/templates");
                            fileMod.CreateFile(model.name + "/package.json", pkgJson);
                            fileMod.CreateFile(model.name + "/" + model.mainFile, serverJS);
                            
                            saver.SaveFileAccess(function(aerekos, save){
                                aerekos.servers.push(model);
                                save(aerekos);
                                routeMod.CreateHttpRoute("home", model.mainFile);
                                process.exit();
                            });
                        } else {
                            count = 0;
                            console.log("Let's start over");
                            return console.log("What do you want to name your native NodeJS application?");
                        }
                }
                count = count += 1;
            }
        });
    };
    
    var GenExpressServer = function(){
        var model = {};
        var count = 0;
        process.stdin.setEncoding('utf8');
        console.log("What do you want to name your new Express application?");
        process.stdin.on('readable', function() {
            var chunk = process.stdin.read();
            if (chunk !== null) {
                switch(count){
                    case 0:
                        model.name = chunk.trim();
                        console.log("What is your version number? Ex: 0.0.1");
                        break;
                    case 1:
                        if(chunk.split(".").length == 3){
                            model.version = chunk.trim();
                            console.log("How do you want to describe this application?");
                        } else {
                            return console.log("Your version number is incorrect Ex: 1.0.0");   
                        }
                        break;
                    case 2:
                        model.descript = chunk.trim();
                        console.log("What is your main starting file called?");
                        console.log("Ex: server.js or main.js or index.js");
                        break;
                    case 3:
                        if(chunk.indexOf(".js") == -1){
                            return console.log("Please include a valid starting file extention");
                        }
                        model.mainFile = chunk.trim();
                        console.log("Who is the author of this application?");
                        break;
                    case 4:
                        model.author = chunk.trim();
                        console.log("What license do you want for this app? Ex: MIT");
                        break;
                    case 5:
                        model.license = chunk.trim();
                        console.log(model);
                        console.log("Does this information look correct?");
                        console.log("Y/N");
                        break;
                    case 6:
                        if(chunk.trim() == "Y"){
                            var pkgJson = RJ.ReadTemplate("expresspkgjsontemplate.json", model);
                            var serverJS = RJ.ReadTemplate("express_server_templates/express_starter_template.js", model);
                            
                            fileMod.CreateFolder(model.name);
                            fileMod.CreateFolder(model.name + "/templates");
                            fileMod.CreateFolder(model.name + "/public");
                            fileMod.CreateFile(model.name + "/package.json", pkgJson);
                            fileMod.CreateFile(model.name + "/" + model.mainFile, serverJS);
                            
                            saver.SaveFileAccess(function(aerekos, save){
                                aerekos.servers.push(model);
                                save(aerekos);
                                routeMod.CreateExpressRoute("home", model.mainFile);
                                process.exit();
                            });
                        } else {
                            count = 0;
                            console.log("Let's start over");
                            return console.log("What do you want to name your new Express application?");
                        }
                }
                count = count += 1;
            }
        });
    };
    
    
    askerman.GenHttpServer = GenHttpServer;
    askerman.GenHttpRoute = GenHttpRoute;
    askerman.RemoveRoute = RemoveRoute;
    askerman.GenExpressServer = GenExpressServer;
    askerman.GenExpressRoute = GenExpressRoute;
    
    
})
(
    module.exports,
    require('rick_j'),
    require('./file_mod.js'),
    require('./save_mod.js'),
    require('./route_mod.js'),
    require("./question_engines/view_engine.js")
);