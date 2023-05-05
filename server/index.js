const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const fs = require('fs');

const User = require('./models/User');
const Post = require('./models/Post');
const cookieParser = require('cookie-parser');
const { error } = require('console');
const router = express.Router();

require('dotenv').config();

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_KEY;
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    // origin: 'http://localhost:5173',
    origin: '*',
  })
);
app.use('/upload', express.static(__dirname + '/upload'));

mongoose.connect(process.env.MONGO_URL);

router.post('/register', async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    const userDoc = await User.create({
      userName,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(200).json('Success');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const checkPassword = bcrypt.compareSync(password, userDoc.password);
    if (checkPassword) {
      jwt.sign(
        { email, user: userDoc.userName, id: userDoc._id },
        secret,
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json({
            id: userDoc._id,
            user: userDoc.userName,
          });
        }
      );
    } else {
      res.status(400).json('Wrong Password');
    }
  } else {
    res.status(401).json('Wrong Email');
  }
});

router.get('/profile', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(info);
  });
});

router.post('/post', upload.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const part = originalname.split('.');
  const ext = part[part.length - 1];
  const newPath = path + '.' + ext;
  const { token } = req.cookies;
  fs.renameSync(path, newPath);

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const doc = await Post.create({
      creator: info.id,
      title,
      summary,
      content,
      cover: newPath,
    });
    res.status(200).json(doc);
  });
});

router.put('/post', upload.single('file'), async (req, res) => {
  newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const part = originalname.split('.');
    const ext = part[part.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content, id } = req.body;

    const postDoc = await Post.findById(id);
    const isCreator =
      JSON.stringify(postDoc.creator) === JSON.stringify(info.id);
    if (!isCreator) {
      return res.status(400).json('You are not the creator');
    }

    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json(postDoc);
  });
});

router.get('/post', async (req, res) => {
  const posts = await Post.find()
    .populate('creator', ['userName'])

    .limit(20)
    .sort({ updatedAt: -1 });
  res.json(posts);
});

router.get(`/post/:id`, async (req, res) => {
  const { id } = req.params;
  const postInfo = await Post.findById(id).populate('creator', 'userName');
  res.json(postInfo);
});

app.use(router);

app.listen(PORT, (req, res) => {
  console.log(`Server is listen on http://localhost:${PORT}`);
});
