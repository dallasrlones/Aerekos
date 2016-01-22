(function(fileMod, askerman, saver){
    
    function SayHelp(){
        console.log('--help');
        console.log('--touch');
        console.log('--mkdir');
        console.log('--rm');
        console.log('--rmdir');
        console.log('--ls');
        console.log('--resetSaveFile');
        console.log('--gen http-server-starter');
        console.log('--gen http-route');
        console.log('--remove http-route');
        console.log('--gen express-server-starter');
        console.log('--gen express-route');
        console.log('--remove express-route');
    }
    
    function LookAtGenCommand(command){
        switch(command){
            case "http-server-starter":
                askerman.GenHttpServer();
                return;
            case "express-server-starter":
                askerman.GenExpressServer();
                return;
            case "http-route":
                askerman.GenHttpRoute();
                return;
            case "express-route":
                askerman.GenExpressRoute();
                return;
        }
    }
    
    function LookAtGenHTMLCommand(command){
        switch(command){
            case 'section':
                askerman.GenViewSection();
                break;
            case 'element':
                askerman.GenViewElement();
                return;
            case 'attribute':
                askerman.GenViewAttribute();
                break;
            case 'replace':
                askerman.ReplaceElementContents();
                break;
        }
    }
    
    function LookAtRemoveCommand(command){
        switch(command){
            case "route":
                askerman.RemoveRoute();
                break;
            case 'section':
                askerman.RemoveViewSection();
                break;
            case 'element':
                askerman.RemoveViewElement();
                return;
        }
    }
    
    var secondCommand = process.argv[3];
    if(typeof(process.argv[2]) == 'undefined'){
        SayHelp();
    }
    
    switch(process.argv[2]){
        case '--help':
            SayHelp();
            break;
        case '--touch':
            fileMod.CreateFile(secondCommand);
            break;
        case '--mkdir':
            fileMod.CreateFolder(secondCommand);
            break;
        case '--rm':
            fileMod.RemoveFile(secondCommand);
            break;
        case '--rmdir':
            fileMod.RemoveFolder(secondCommand);
            break;
        case '--ls':
            console.log(fileMod.ReadDirectory(secondCommand));
            break;
        case '--gen':
            LookAtGenCommand(secondCommand);
            break;
        case '--genHTML':
            LookAtGenHTMLCommand(secondCommand);
            break;
        case '--remove':
            LookAtRemoveCommand(secondCommand);
            break;
        case '--resetSaveFile':
            saver.SaveFileReset();
            break;
    }
    
})(
    require('./Repos/file_mod.js'),
    require('./Repos/askerman.js'),
    require('./Repos/save_mod.js')
);