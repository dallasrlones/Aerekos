(function(http, PORT, HOST, fs){
    
    function RequestHandler(req, res){
        switch(req.url){
            //modstart
        }
    }
    
    http.createServer(RequestHandler).listen(PORT, HOST, function(){
        console.log(" server online : " + HOST + ":" + PORT);
    });
    
})
(
    require('http'),
    (process.env.PORT || 8080),
    (process.env.IP || 'localhost'),
    require('fs')
);