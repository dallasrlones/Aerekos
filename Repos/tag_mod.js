(function(tagMod, fileMod, saveMod){
    require('colors');
    var InsertUnderModStart = function(fileName, contents){
        var file = fileMod.ReadFile(fileName);
        var modStart = file.indexOf("//modstart");
        var fileTop = file.slice(0, modStart + 10);
        var fileBottom = file.slice(modStart + 10, file.length);
        if(modStart != -1){
            
            file = fileTop + "\n" + contents + "\n" + fileBottom;
            fileMod.CreateFile(fileName, file);
            
        } else {
            console.log("Could not find //modstart in your file " + fileName);
        }
    };
    
    var InsertUnderModStartHTML = function(fileName, contents){
        var file = fileMod.ReadFile(fileName);
        var modstartSyntax = "<!--modstart-->";
        var modStart = file.indexOf(modstartSyntax,0);
        var fileTop = file.slice(0, modStart + modstartSyntax.length);
        var fileBottom = file.slice(modStart + modstartSyntax.length, file.length);
        if(modStart != -1){
            
            file = fileTop + "\n" + contents +  fileBottom;
            fileMod.CreateFile(fileName, file);
            
        } else {
            console.log("Could not find <!--modstart--> in your file " + fileName);
        }
    };
    
    var CreateTag = function(fileName, tagName){
        var contents = "\n//tagstart." + tagName + "\n" + "//tagstop." + tagName + "\n"; 
        InsertUnderModStart(fileName, contents);
    };
    
    var EditTag = function(fileName, tagName, contents){
        var file = fileMod.ReadFile(fileName);
        var openSyntax = "//tagstart." + tagName;
        var closeSyntax = "//tagstop." + tagName;
        var startTag = file.indexOf(openSyntax, 0);
        var stopTag = file.indexOf(closeSyntax, 0);
        var top = file.slice(0, startTag + openSyntax.length);
        var bottom = file.slice(stopTag, file.length);
        
        file = top + contents + bottom;
        fileMod.CreateFile(fileName, file);
    };
    
    var PrependTag = function(fileName, tagName, contents){
        var file = fileMod.ReadFile(fileName);
        var openSyntax = "//tagstart." + tagName;
        var closeSyntax = "//tagstop." + tagName;
        var startTag = file.indexOf(openSyntax, 0);
        var stopTag = file.indexOf(closeSyntax, 0);
        var top = file.slice(0, startTag + openSyntax.length);
        var middle = file.slice(startTag + openSyntax.length, stopTag);
        var bottom = file.slice(stopTag, file.length);
        
        file = top + middle + contents + "\n" + bottom;
        fileMod.CreateFile(fileName, file);
    };
    
    var RemoveTagAndContents = function(fileName, tagName){
        var file = fileMod.ReadFile(fileName);
        var openSyntax = "//tagstart." + tagName + "//";
        var closeSyntax = "//tagstop." + tagName  + "//";
        var startTag = file.indexOf(openSyntax, 0);
        var stopTag = file.indexOf(closeSyntax, 0);
        var top = file.slice(0, startTag);
        var bottom = file.slice(stopTag + closeSyntax.length, file.length);
        
        file = top + bottom;
        fileMod.CreateFile(fileName, file);
    };
    
    var CreateSection = function(fileName, tagName){
        InsertUnderModStartHTML(fileName, tagName);
    };
    
    var ReadSection = function(fileName, sectionName){
        var file = fileMod.ReadFile(fileName);
        var openSyntax = "<!--sectionstart." + sectionName + "-->";
        var closeSyntax = "<!--sectionstop." + sectionName + "-->";
        var startSection = file.indexOf(openSyntax, 0);
        var stopSection = file.indexOf(closeSyntax, 0);
        if(startSection != -1 && stopSection != -1){
            var section = file.slice(startSection + startSection.length, stopSection);
            return section;
        }
        console.log("Error reading the section " + section + " at " + fileName);
    };
    
    var EditSection = function(fileName, tagName, contents){
        console.log("editing section");
        var file = fileMod.ReadFile(saveMod.GetSaveFileName() + "/" + fileName);
        var openSyntax = "<!--sectionstart." + tagName + "-->";
        var closeSyntax = "<!--sectionstop." + tagName + "-->";
        var startTag = file.indexOf(openSyntax, 0);
        var stopTag = file.indexOf(closeSyntax, 0);
        var top = file.slice(0, startTag + openSyntax.length);
        var bottom = file.slice(stopTag, file.length);
        
        console.log(top);
        
        file = top + contents + bottom;
        console.log(file);
        //fileMod.CreateFile(saveMod.GetSaveFileName() + "/" + fileName, file);
    };
    
    var PrependSection = function(fileName, tagName, contents){
        console.log("prepending section");
        var file = fileMod.ReadFile(fileName);
        var openSyntax = "<!--sectionstart." + tagName + "-->";
        var closeSyntax = "<!--sectionstop." + tagName + "-->";

        var startTag = file.indexOf(openSyntax, 0);
        var stopTag = file.indexOf(closeSyntax, 0);
        var top = file.slice(0, startTag + openSyntax.length);
        var middle = file.slice(startTag + openSyntax.length, stopTag);
        var bottom = file.slice(stopTag, file.length);
        
        file = top + middle + contents + "\n" + bottom;
        fileMod.CreateFile(fileName, file);
    };
    
    var RemoveSectionAndContents = function(fileName, tagName){
        var file = fileMod.ReadFile(fileName);
        var openSyntax = "<!--sectionstart." + tagName + "-->";
        var closeSyntax = "<!--sectionstop." + tagName + "-->";
        var startTag = file.indexOf(openSyntax, 0);
        var stopTag = file.indexOf(closeSyntax, 0);
        var top = file.slice(0, startTag);
        var bottom = file.slice(stopTag + closeSyntax.length, file.length);
        
        file = top + bottom;
        fileMod.CreateFile(fileName, file);
    };
    
    tagMod.InsertUnderModStart = InsertUnderModStart;
    tagMod.CreateTag = CreateTag;
    tagMod.EditTag = EditTag;
    tagMod.PrependTag = PrependTag;
    tagMod.RemoveTagAndContents = RemoveTagAndContents;
    
    
    tagMod.CreateSection = CreateSection;
    tagMod.ReadSection = ReadSection;
    tagMod.EditSection = EditSection;
    tagMod.PrependSection = PrependSection;
    tagMod.RemoveSectionAndContents = RemoveSectionAndContents;
})
(
    module.exports,
    require('./file_mod.js'),
    require('./save_mod.js')
);