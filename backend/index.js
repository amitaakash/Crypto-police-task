const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const multer = require('multer');
const fs = require('fs-extra')
const Schema = mongoose.Schema;
const upload = multer({ dest: 'uploads/' })

mongoose.connect('mongodb+srv://amit:amit1234@cluster0-hquhb.mongodb.net/profile?retryWrites=true&w=majority', { useNewUrlParser: true })
.then(() => {
  console.log('Connected to MongoDB');
}).catch(() => {
  console.log('Connection Failed');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Authorization, x-Requested-With, Content-Type, Accept');
  next();
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

  var uploadStorage = multer({ storage: storage })


app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html')
});

const schema = new Schema ({
    img: {data: Buffer, contentType: String }
});

const userSchema = new Schema ({
 email: String, avatar: String, category: String, country: String,  name: String, password: String, securitycode: String, website: String
});
 const user = mongoose.model('user', userSchema);
const avatar = mongoose.model('avatar', schema);

app.post('/upload', upload.single('photo'), (req, res) => {
    const avImg = new avatar();
    avImg.img.data = fs.readFileSync(req.file.path);
    avImg.img.contentType =  req.file.mimetype;
 // console.log(req.file);
     avImg.save().then(result => {
       // console.log(result);
        res.status(201).send({
          message: 'Post added successfully!',
          imageId: result._id,
          imgData: result.img.data
        });
        });
  });
 
  app.get('/:id', (req, res) => {
    var filename = req.params.id;

    avatar.findOne({'_id': filename}, function(err, doc) {
        if (err)
        res.send(err);
        res.contentType(doc.img.contentType)
        //res.contentType('json');
        res.send(doc.img.data);
        
    })

    app.post('/user', (req,res, next) => {
      console.log(req.body)
      const User = new user({
        email: req.body.email, 
        avatar: req.body.avatar, 
        category: req.body.category, 
        country: req.body.country,  
        name:  req.body.name, 
        password:  req.body.password, 
        securitycode:  req.body.securitycode, 
        website:  req.body.website
      });
      User.save().then(result => {
      //console.log(post);
      res.status(201).send({
        message: 'User added successfully!',
        userId: result._id
      });
      });
    
    });

});



  
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));