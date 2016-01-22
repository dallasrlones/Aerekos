(function(express, server, bodyPaser, fs){
    
    server.use(express.static("public"));
    server.use(bodyPaser.urlencoded({ extended: true }));
    server.use(bodyPaser.json());
    //modstart
    //tagstart.routes//
    //tagstop.routes//
    //tagstart.listener//
    server.listen(process.env.PORT || 8080,
        process.env.IP || 'localhost', function(){
            console.log("server online");
        });
    //tagstart.listener//
})
(
    require('express'),
    require('express')(),
    require('body-parser'),
    require('fs')
);