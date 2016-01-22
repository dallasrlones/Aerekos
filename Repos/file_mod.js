(function(fileMod, RJ, fs){
    var dirPath = process.cwd() + "/";
    
    var ReadFile = function(fileName){
        var path = dirPath + fileName;
        console.log(path);
        return fs.readFileSync(path).toString();
    };
    
    var CreateFile = function(fileName, contents){
        var newPath = dirPath + fileName;
        fs.writeFileSync(newPath, contents);
    };
    
    var CreateFolder = function(folderName){
        fs.mkdirSync(dirPath + folderName);
    };
    
    var ReadDirectory = function(dirName){
        return fs.readdirSync(dirPath + dirName, function(err){
            if(err){
                return console.log(err.message);
            }
        });
    };
    
    var RemoveFile = function(fileName){
        fs.unlink(dirPath + fileName, function(err){
            if(err){
                return console.log(err.message);
            }
            console.log(fileName + " removed");
        });
    };
    
    var RemoveFolder = function(path) {
        if( fs.existsSync(path) ) {
            fs.readdirSync(path).forEach(function(file,index){
                var curPath = dirPath + path + "/" + file;
                console.log(curPath);
                if(fs.lstatSync(curPath).isDirectory()) { // recurse
                    RemoveFolder(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            
            fs.rmdirSync(path);
        }
    };
    
    fileMod.ReadFile = ReadFile;
    fileMod.CreateFile = CreateFile;
    fileMod.RemoveFile = RemoveFile;
    fileMod.RemoveFolder = RemoveFolder;
    fileMod.CreateFolder = CreateFolder;
    fileMod.ReadDirectory = ReadDirectory;
})(
    module.exports,
    require('rick_j'),
    require('fs')
);