module.exports = function(app){
    
    var Usuarios = require('./models/usuarios');

    app.use(function(req, res, next) {
    	res.header("Access-Control-Allow-Origin", "*");
	res.header("access-control-allow-methods", "GET,PUT,POST,DELETE,OPTIONS");
	next();
    });    
    
    //esto deberia ir en el controller
    //GET
    findAllUsuarios = function(req,res,next){
        Usuarios.find(function(err, usuario){
            if(!err) res.send(usuario);
            else console.log('Error:' + err);
        });  
    };
    
    //GET
    findById = function(req, res,next){
        Usuarios.findById(req.params.mail, function(err, usuario){
            if(!err ){
		 res.send(usuario);
            }else console.log('Error:' + err);
        });
    };
    //POST LOGINUSUARIO
    loginUsuario = function(req, res,next){
 	Usuarios.findOne({"mail": req.body.mail, "pwd": req.body.pwd}).exec(function(err, usuario){
		if (err) {
		    res.sendStatus(500);
		    res.json({
		        type: false,
		        data: "Error occured: " + err
		    });
		    
		    console.log("error" + err);
		} else {
		    if (usuario) {
		       res.json({
		            type: true,
		            data: usuario,
		            token: usuario.token
		        }); 
			console.log("login hecho: " + usuario.nombre);
		    } else {
			res.sendStatus(401);
		        res.json({
		            type: false,
		            data: "Incorrect email/password"
		        });
			
			console.log("[ERROR] Claves incorrectas");
		    }
		}
        });
    };


    addUsuario = function(req, res) {
	   Usuarios.findOne({"mail": req.body.mail}, function(err, usuario) {
		if (err) {
		    res.sendStatus(500);
		    res.json({
		        type: false,
		        data: "Error occured: " + err
		    });
		} else {
		    if (usuario) {
			res.sendStatus(409);
		        res.json({
		            type: false,
		            data: "El usuario ya existe"
		        });
		    } else {
		       var usuario = new Usuarios({
			    nombre: req.body.nombre,
			    mail: req.body.mail,
			    pwd: req.body.pwd,
			    idFavorito: req.body.idFavorito
			});
		        usuario.save(function(err, user) {
		            user.token = jwt.sign(user, process.env.JWT_SECRET || "123456789");
		            user.save(function(err, user1) {
		                res.json({
		                    type: true,
		                    data: user1,
		                    token: user1.token
		                });
		            });
		        })
		    }
		}
	    });
	};
    
    //UPDATE
    updateUsuario = function(req, res,next){
        Usuarios.findOne({"mail": req.body.mail}, function(err, usuario) {
	    if(!req.body.nombre == '')
            usuario.nombre = req.body.nombre;
	    if(!req.body.pwd == '')
            usuario.pwd = req.body.pwd;
            if(!req.body.idFavorito == '')
            usuario.idFavorito = req.body.idFavorito;
            
            if (usuario.token === req.body.token){
		console.log("[OK] - Los tokens son iguales, intentamos modificar");
		usuario.save(function(err){
		    if(err){
			    res.sendStatus(500);
			    res.json({
				type: false,
				data: "Error occured: " + err
			    });
			    console.log('Error: ' + err);
		     }else {
			    res.json({
				type: true,
				data: usuario,
				token: usuario.token
			    }); 
			    console.log("Usuario modificado: " + usuario);
		     }
		});
	    }else{
		console.log("[ERROR] Los tokens son diferentes");
		res.sendStatus(403);
	    }
        });
        

    };
    
    
    //DELETE
    deleteUsuario = function(req,res,next){
        Usuarios.findById(req.params.id,function(err, usuario){
            usuario.remove(function(err){
                if(!err) console.log('Usuario borrado');
                else console.log('Error: ' + err);
            });
        });
        
    };


	
    //API ROUTES
    app.get('/usuario', findAllUsuarios);
    app.get('/usuario/:id', findById);
    app.post('/loginUsuario', loginUsuario);
    app.post('/addUsuario', addUsuario);
    app.post('/updateUsuario/', updateUsuario);
    app.delete('/usuario/:id', deleteUsuario);
}
