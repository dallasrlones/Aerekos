(function(jsMod){
    //OBJECTS
    jsMod.CreateString = function(stringVal){
        return '"' + stringVal + '"';
    };
    
    jsMod.CreateStringVar = function(varName, varValue){
        return "var " + varName + ' = "' + varValue + '"';
    };
    
    jsMod.CreateConcatStringVar = function(varName, stringArray){
        var varValue = '"' + stringArray[0] + '"';
        for(var i = 1; i < stringArray.length; i++){
            varValue += ' += "' + stringArray[i] + '"';
        }
        
        return "var " + varName + " = " + varValue;
    };
    
    jsMod.CreateIntVar = function(varName, varValue){
        return "var " + varName + " = " + varValue;
    };
    
    jsMod.CreateTimestamp = function(){};
    jsMod.CreateTimestampVar = function(){};
    
    jsMod.CreateArrayVar = function(varName, varArray){
        var stringArray = "[" + varArray[0];
        for(var i = 1; i < varArray.length; i++){
            stringArray += ", " + varArray[i];
        }
        stringArray += "]";
        return "var " + varName + " = " + stringArray;
    };
    jsMod.RemoveFromArray = function(){};
    
    jsMod.CreateObject = function(){};
    jsMod.CreateObjectVar = function(){};
    jsMod.AppendToObject = function(){};
    jsMod.RemoveFromObject = function(){};
    
    jsMod.CreateJSON = function(){};
    jsMod.CreateJSONVar = function(){};
    
    //FUNCTIONS
    jsMod.CreateFunction = function(){};
    jsMod.CreateFunctionVar = function(){};
    jsMod.CreateFunctionReturn = function(){};
    jsMod.CreateFunctionReturnVar = function(){};
    
    //LOOPS
    jsMod.CreateFor = function(){};
    jsMod.CreateForVar = function(){};
    
    jsMod.CreateForIn = function(){};
    jsMod.CreateForInVar = function(){};
    
    jsMod.CreateWhile = function(){};
    jsMod.CreateWhileVar = function(){};
    
    //CONDITIONAL
    jsMod.CreateIf = function(){};
    jsMod.CreateAndConditional = function(){};
    jsMod.CreateOrConditional = function(){};
    jsMod.CreateNotVarConditional = function(){};
    jsMod.CreateElse = function(){};
    jsMod.CreateElseIf = function(){};
    
    jsMod.CreateSwitch = function(){};
    jsMod.CreateCase = function(){};
    jsMod.AddToSwitch = function(){};
    jsMod.RemoveFromSwitch = function(){};
    
    jsMod.AppendToConditionalBlock = function(){};
    jsMod.PrependToConditionalBlock = function(){};
    jsMod.ReplaceConditionalBlock = function(){};
    jsMod.RemoveConditional = function(){};
    
    //FINDING  
    jsMod.FindVarDeclaration = function(){};
    jsMod.FindVarInUse = function(){};
    jsMod.FindFunctionDeclaration = function(){};
    
    //BUILD IN METHODS
    jsMod.CreateDotToString = function(){};
    jsMod.CreateJSONstringify = function(){};
    jsMod.CreateJSONparse = function(){};
    jsMod.CreateDotLength = function(){};
    jsMod.CreateTypeOf = function(){};
    jsMod.CreateSetTimeout = function(){};
    jsMod.CreateSetInterval = function(){};
    jsMod.CreateClearInterval = function(){};
    
})(module.exports);