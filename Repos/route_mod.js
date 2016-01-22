(function(routeMod, RJ, tagMod, fileMod, saveMod, viewMod){
    
    var CreateHttpRoute = function(routeName, fileName){
        
        var model = {
            name: routeName
        };
        
        var route = RJ.ReadTemplate("http_server_templates/http_route.js", model);

        var app = saveMod.GetSaveFileName()
        var path = app + "/" + fileName;
        tagMod.InsertUnderModStart(path, route);
        
        var routeFile = RJ.ReadTemplate("html_templates/basicpage.html", model);
        fileMod.CreateFile(app + "/templates/" + routeName + ".html", routeFile);

        
    };
    
    var CreateExpressRoute = function(routeName, fileName){
        
        var model = {
            name: routeName
        };
        
        var route = RJ.ReadTemplate("express_server_templates/express_route.js", model);
        var app = saveMod.GetSaveFileName();
        var path = app + "/" + fileName;
        tagMod.PrependTag(path, "routes", route);
        
        var routePage = RJ.ReadTemplate("html_templates/basicpage.html", model);
        viewMod.CreateView(routeName, "templates", routePage);
    };
    
    var RemoveRoute = function(routeName, fileName){
        var path = saveMod.GetSaveFileName() + "/" + fileName;
        tagMod.RemoveTagAndContents(path, "route." + routeName);
        fileMod.RemoveFile(saveMod.GetSaveFileName() + "/templates/" + routeName + ".html");
    };
    
    routeMod.CreateHttpRoute = CreateHttpRoute;
    routeMod.CreateExpressRoute = CreateExpressRoute;
    routeMod.RemoveRoute = RemoveRoute;
    
})
(
    module.exports,
    require('rick_j'),
    require('./tag_mod.js'),
    require('./file_mod.js'),
    require('./save_mod.js'),
    require('./view_mod.js')
);