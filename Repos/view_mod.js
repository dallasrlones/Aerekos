(function(viewMod, fileMod, tagMod, saveMod, RJ){
    //remember this is for askerman to use not users
    
    viewMod.CreateView = function(viewName, folderPath, contents){
        var app = saveMod.GetSaveFileName();
        fileMod.CreateFile(app + "/" + folderPath + "/" + viewName + ".html", contents);
        console.log(viewName + " created");
    };
    
    viewMod.ReplaceView = function(viewName, folderPath, contents){
        var app = saveMod.GetSaveFileName();
        var oldView = fileMod.ReadFile(app + "/" + folderPath + "/" + viewName + ".html");
        fileMod.CreateFile(app + "/" + folderPath + "/" + viewName + ".html", contents);
        console.log(viewName + " replaced");
    };
    
    viewMod.RemoveView = function(viewName, folderPath){
        var app = saveMod.GetSaveFileName();
        fileMod.RemoveFile(app + "/" + folderPath, viewName + ".html");
        console.log(viewName + " removed");
    };
    
    viewMod.CreateSection = function(viewName, folderPath, sectionName){
        var app = saveMod.GetSaveFileName();
        var viewLocation = app + "/" + folderPath + "/" + viewName + ".html";
        
        var newSection = RJ.ReadTemplate("html_templates/html_section.html", { name: sectionName });
        tagMod.CreateSection(viewLocation, newSection);
        
        console.log("Section " + sectionName + " has been created in " + viewName);
    };
    
    viewMod.ReplaceSection = function(viewName, folderPath, sectionName, newContents){
        var app = saveMod.GetSaveFileName();
        var viewLocation = app + "/" + folderPath + "/" + viewName + ".html";
        
        tagMod.EditSection(viewLocation, sectionName, newContents);
        
        console.log("Section " + sectionName + " has been replaced in " + viewName);
    };
    
    viewMod.AppendToSection = function(viewName, folderPath, sectionName, newContents){
        var app = saveMod.GetSaveFileName();
        var viewLocation = app + "/" + folderPath + "/" + viewName + ".html";
        
        tagMod.EditSection(viewLocation, sectionName, newContents);
        
        console.log("Section " + sectionName + " has been appended in " + viewName);
    };
    
    viewMod.PrependToSection = function(viewName, folderPath, sectionName, newContents){
        var app = saveMod.GetSaveFileName();
        var viewLocation = app + "/" + folderPath + "/" + viewName + ".html";
        
        var newSection = (newContents + tagMod.ReadSection(viewLocation, sectionName)).toString();
        
        tagMod.EditSection(viewLocation, sectionName, newSection);
        
        console.log("Section " + sectionName + " has been prepended in " + viewName);
    };
    
    viewMod.RemoveSection = function(viewName, folderPath, sectionName){
        var app = saveMod.GetSaveFileName();
        var viewLocation = app + "/" + folderPath + "/" + viewName + ".html";
        tagMod.RemoveSectionAndContents(viewLocation, sectionName);
        
        console.log("Section " + sectionName + " has been removed in " + viewName);
    };
    
    function Read(fileName, model){
        return RJ.ReadTemplate("html_templates/elements/" + fileName, model);
    }
    
    viewMod.CreateElement = function(elementName, viewName, folderPath, sectionName, type){
        console.log("creating element");
        var app = saveMod.GetSaveFileName();
        var viewLocation = app + "/" + folderPath + "/" + viewName + ".html";
        console.log(viewLocation);
        var newElement = "";
        
        switch(type){
            case "div":
                newElement = Read("div_template.html", { name: elementName });
                break;
            case "form":
                newElement = Read("form_template.html", { name: elementName });
                break;
            case "h1":
                newElement = Read("h1_template.html", { name: elementName });
                break;
            case "p":
                newElement = Read("p_template.html", { name: elementName });
                break;
            case "span":
                newElement = Read("span_template.html", { name: elementName });
                break;
            case "script":
                newElement = Read("script_template.html", { name: elementName });
                break;
            case "link":
                newElement = Read("link_template.html", { name: elementName });
                break;
            case "a":
                newElement = Read("a_template.html", { name: elementName });
                break;
        }
        
        tagMod.PrependSection(app + "/templates/" + viewName + ".html", sectionName, newElement);
        console.log("Element " + elementName + " was created in " + sectionName);
    };
    
    function FindElement(contents, elementName){
        var identify = contents.indexOf('identify="' + elementName + '"');
        return identify;
    }
    
    function FindClosingTag(tag, contents, pointer){
        //if there is an opening tag before a closing tag...
        var openTag = "<" + tag;
        var closeTag = "</" + tag;
        
        var aStartTag = contents.indexOf(openTag, pointer);
        var aStopTag = contents.indexOf(closeTag, pointer);
        
        if(aStartTag == -1 && aStopTag != -1 || aStartTag > aStopTag){
            return aStopTag;
        }
        
        return FindClosingTag(tag, contents, aStopTag + closeTag.length);
    }
    
    function GetElementContents(elementName, viewName, folderPath){
        var app = saveMod.GetSaveFileName();
        var viewLocation = app + "/" + folderPath + "/" + viewName + ".html";
        var file = fileMod.ReadFile(viewLocation);
        
        var openGatorMatch = /</.exec(file);
        var openGator = /</g;
        var openGatorArray = [];
        while ((openGatorMatch = openGator.exec(file)) != null) {
            openGatorArray.push(openGatorMatch.index);
        }
        
        var closeGatorMatch = />/.exec(file);
        var closeGator = />/g;
        var closeGatorArray = [];
        while ((closeGatorMatch = closeGator.exec(file)) != null) {
            closeGatorArray.push(closeGatorMatch.index);
        }
        
        var elementsArray = [];
        if(openGatorArray.length == closeGatorArray.length){
            for(var i in openGatorArray){
                var innerContents = file.slice(openGatorArray[i], closeGatorArray[i] + 1);
                elementsArray.push(innerContents);
            }
            
            var ourElement = elementsArray.filter(function(val){
                return val.indexOf('identify="' + elementName + '"', 0) != -1;
            })[0];
            
            var elementStop = ourElement.indexOf(" ");
            console.log(ourElement);
            var elementType = ourElement.slice(1, elementStop);
            var ourElementPosition = file.indexOf(ourElement);
            var ourElementClosingPos = 
                FindClosingTag(elementType, file, ourElementPosition + ourElement.length);
                
            var elemContents = file.slice(ourElementPosition + ourElement.length, ourElementClosingPos);
            return elemContents;
        }
    }
    
    viewMod.GetElementContents = GetElementContents;
    
    function GetElementProps(elementName, viewName, folderPath){
        var app = saveMod.GetSaveFileName();
        var viewLocation = app + "/" + folderPath + "/" + viewName + ".html";
        var file = fileMod.ReadFile(viewLocation);
        
        var openGatorMatch = /</.exec(file);
        var openGator = /</g;
        var openGatorArray = [];
        while ((openGatorMatch = openGator.exec(file)) != null) {
            openGatorArray.push(openGatorMatch.index);
        }
        
        var closeGatorMatch = />/.exec(file);
        var closeGator = />/g;
        var closeGatorArray = [];
        while ((closeGatorMatch = closeGator.exec(file)) != null) {
            closeGatorArray.push(closeGatorMatch.index);
        }
        
        var elementsArray = [];
        if(openGatorArray.length == closeGatorArray.length){
            for(var i in openGatorArray){
                var innerContents = file.slice(openGatorArray[i], closeGatorArray[i] + 1);
                elementsArray.push(innerContents);
            }
            
            var ourElement = elementsArray.filter(function(val){
                return val.indexOf('identify="' + elementName + '"', 0) != -1;
            })[0];
            
            var elementStop = ourElement.indexOf(" ");
            console.log(ourElement);
            var elementType = ourElement.slice(1, elementStop);
            var ourElementPosition = file.indexOf(ourElement);
            var ourElementClosingPos = 
                FindClosingTag(elementType, file, ourElementPosition + ourElement.length);
            var ourElemContents = file.slice(ourElementPosition + ourElement.length, ourElementClosingPos);
                
            
            return { start: ourElementPosition, stop: ourElementClosingPos, 
                            element: ourElement, elemContents: ourElemContents };
        }
    }
    
    viewMod.GetElementProps = GetElementProps;
    
    viewMod.ReplaceElementContents = function(elementName, viewName, folderPath, newContents){
        var pos = GetElementProps(elementName, viewName, folderPath);
        var app = saveMod.GetSaveFileName();
        var viewLocation = app + "/" + folderPath + "/" + viewName + ".html";
        var file = fileMod.ReadFile(viewLocation);
        var newFile = file.slice(0 , pos.start) + pos.element + newContents + file.slice(pos.stop, file.length);
        fileMod.CreateFile(viewLocation, newFile);
    };
    
    viewMod.PrependElementContents = function(elementName, viewName, folderPath, newContents){
        var pos = GetElementProps(elementName, viewName, folderPath);
        var app = saveMod.GetSaveFileName();
        var viewLocation = app + "/" + folderPath + "/" + viewName + ".html";
        var file = fileMod.ReadFile(viewLocation);
        
        //HERE
        var newFile = file.slice(0 , pos.start) + pos.element + pos.elemContents + newContents + file.slice(pos.stop, file.length);
        fileMod.CreateFile(viewLocation, newFile);
    };
    
    viewMod.CreateAttribute = function(elementName, viewName, folderPath, sectionName, attribute, attrVal){
        var identSyntax = 'identify="' + elementName + '"';
        var app = saveMod.GetSaveFileName();
        var viewLocation = app + "/" + folderPath + "/" + viewName + ".html";
        var file = fileMod.ReadFile(viewLocation);
        var identifyPos = FindElement(file, elementName);
        
        var top = file.slice(0, identifyPos + identSyntax.length);
        var bottom = file.slice(identifyPos + identSyntax.length, file.length);
        
        var contents = "";
        
        switch(attribute){
            case "id":
                contents = Read("attributes/id_attr.html", { name: attrVal });
                break;
            case "class":
                contents = Read("attributes/class_attr.html", { name: attrVal });
                break;
            case "action":
                contents = Read("attributes/action_attr.html", { name: attrVal });
                break;
            case "method":
                contents = Read("attributes/method_attr.html", { name: attrVal });
                break;
        }
        
        fileMod.CreateFile(viewLocation, top + contents + bottom);
    };
    
    var ReplaceAttributeValue = function(){};
    var AppendAttribute = function(){};
    var PrependAttribute = function(){};
    var RemoveAttribute = function(){};
    
    
})
(
    module.exports,
    require('./file_mod.js'),
    require('./tag_mod.js'),
    require('./save_mod.js'),
    require('rick_j')
    
);