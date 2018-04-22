var faker = require("faker");
var request = require('request');
var jsonfile = require('jsonfile');



var appRouter = function (app, admin) {
  var db = admin.database();
  var lastId = 0;
  //var db = admin.database();
  //var ref = db.ref("server/saving-data/fireblog");*/

  app.get("/", function (req, res) {
    res.status(200).send({ message: 'Welcome to our restful API' });
  });


  app.get("/sendTracking/:user/:cep/:address/:chestId/:tracking/:lat/:lon", function (req, res) {

      var ref = db.ref("all");
      ref.once("value", function(snapshot) {
        lastId = snapshot.getPriority();
      });

      var trackingsRef = ref.child(ref.push().key);
      trackingsRef.set({ chest:
        { address: req.params.address,
          code: req.params.chestId,
          location: {
            lat: req.params.lat,
            lon: req.params.lon
          } 
        },
       history:{
         "0":{
          day: "12",
          month: "abr",
          status: "PS"
         }
         
       } ,
       status: 'DL',
       tracking: req.params.tracking,
       user: req.params.user });
    /*var file = 'trackings.json'
    
    jsonfile.writeFile(file, tracking, function (err) {
      console.error(err)
    })*/

    res.status(200).send(trackingsRef);

  });
}

module.exports = appRouter;