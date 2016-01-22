(function(saveMod, fileMod, RJ){
    
    saveMod.GetSaveFileName = function(){
        var saveFile = require('../save_file.json');
        return saveFile.servers[0].name;
    };
    
    var SaveFileAccess = function(cb){
        var saveFile = require('../save_file.json');
        cb(saveFile, function(contents){
            fileMod.CreateFile("save_file.json", JSON.stringify(contents));
        });
    };
    
    var SaveFileReset = function(){
        var saveFile = require('../save_file.json');
        fileMod.CreateFile("save_file.json", RJ.ReadTemplate("savefile_jsontemplate.json", {}));
    };
    
    saveMod.SaveFileAccess = SaveFileAccess;
    saveMod.SaveFileReset = SaveFileReset;
})
(
    module.exports,
    require('./file_mod.js'),
    require('rick_j')
);