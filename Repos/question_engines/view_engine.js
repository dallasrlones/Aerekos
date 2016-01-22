(function(view_engine_questions, saveMod, viewMod){
    
    var CreateSection = function(){
        process.stdin.setEncoding('utf8');
        console.log("What is the name of the View you wish to add the Section to?");
        var count = 0;
        process.stdin.on('readable', function() {
            var chunk = process.stdin.read();
            if (chunk !== null) {
                chunk = chunk.trim();
                switch(count){
                    case 0:
                        this.viewName = chunk;
                        console.log("What is the name of the Section you want to add?");
                        break;
                    case 1:
                        this.sectionName = chunk;
                        viewMod.CreateSection(this.viewName, "templates", this.sectionName);
                        process.exit();
                        break;
                }
                count += 1;
            }
        });
    };
    
    var RemoveSection = function(){
        process.stdin.setEncoding('utf8');
        console.log("What is the name of the View you wish to remove the Section from?");
        var count = 0;
        process.stdin.on('readable', function() {
            var chunk = process.stdin.read();
            if (chunk !== null) {
                chunk = chunk.trim();
                switch(count){
                    case 0:
                        this.viewName = chunk;
                        console.log("What is the name of the Section you want to remove?");
                        break;
                    case 1:
                        this.sectionName = chunk;
                        viewMod.RemoveSection(this.viewName, "templates", this.sectionName);
                        process.exit();
                        break;
                }
                count += 1;
            }
        });
    };
    
    var CreateElement = function(){
        process.stdin.setEncoding('utf8');
        console.log("What is the name of the View you wish to add an element to?");
        var count = 0;
        process.stdin.on('readable', function() {
            var chunk = process.stdin.read();
            if (chunk !== null) {
                chunk = chunk.trim();
                switch(count){
                    case 0:
                        this.viewName = chunk;
                        console.log("What is the name of the Section you want to add this element to?");
                        break;
                    case 1:
                        this.sectionName = chunk;
                        console.log("What is the name of the Element you want to add?")
                        break;
                    case 2:
                        this.elemName = chunk;
                        console.log("What type of Element do you want to add?");
                        break;
                    case 3:
                        this.elemType = chunk;
                        viewMod.CreateElement(this.elemName, this.viewName, "templates", this.sectionName, this.elemType);
                        process.exit();
                        break;
                }
                count += 1;
            }
        });
    };
    
    var CreateAttribute = function(){
        process.stdin.setEncoding('utf8');
        console.log("What is the name of the View you wish to add an attribute to?");
        var count = 0;
        process.stdin.on('readable', function() {
            var chunk = process.stdin.read();
            if (chunk !== null) {
                chunk = chunk.trim();
                switch(count){
                    case 0:
                        this.viewName = chunk;
                        console.log("What is the name of the Element you want to add this attribute to?");
                        break;
                    case 1:
                        this.elemName = chunk;
                        console.log("What type of Attribute do you want to add?");
                        break;
                    case 2:
                        this.attr = chunk;
                        viewMod.CreateAttribute(this.elemName, this.viewName, 
                            "templates", this.sectionName, this.attr, "");
                        process.exit();
                        break;
                }
                count += 1;
            }
        });
    };
    
    var ReplaceElementContents = function(){
        viewMod.ReplaceElementContents("test", "testah", "templates", "woohoo");
        
    };
    
    
    view_engine_questions.CreateSection = CreateSection;
    view_engine_questions.RemoveSection = RemoveSection;
    view_engine_questions.CreateElement = CreateElement;
    view_engine_questions.CreateAttribute = CreateAttribute;
    view_engine_questions.ReplaceElementContents = ReplaceElementContents;
})
(
    module.exports,
    require('../save_mod.js'),
    require('../view_mod.js')
);