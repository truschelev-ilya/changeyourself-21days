const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Target = require('../models/target');
const upload = require('./middlewares/multer');



router.post('/profile/edit/img/:id', upload.single('profileImg'), async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const name = user.profileImg;
  res.json({name})
})

router.get('/target/:id', async (req, res) => {
  const { id } = req.params;
  const target = await Target.findById(id)
  res.json({ target })
});

router.delete('/target/:id', async (req, res) => {
  const { id } = req.params;
  await Target.findByIdAndDelete(id)
});

router.post('/deleteAccount', async (req, res) => {
  await User.findByIdAndDelete(req.body.id);
});


router.post('/profile/edit', async (req, res) => {
  const { login, name, about, email, tel, instagram } = req.body;
  console.log('req.body', req.body);
  await User.findOneAndUpdate({ login }, { name, about, email, tel, instagram });
  res.json({res:true})
})

router.post('/profile/:login', async (req, res) => {
  const { login } = req.params;
  const profile = await User.findOne({ login });
  return res.json(profile)
});

router.post('/:login', async (req, res) => {
  const { login } = req.params;
  const user = await User.findOne({ login })
  const targets = await Target.find({ author: user._id });

  targets.map(async (target) => {
    if (new Date() > target.endDate && target.status === 'active') {
      let doneTasks = 0;
      target.actions.forEach(action => {
        action.status && doneTasks++;
      });
      const personts = ((doneTasks * 100) / target.actions.length).toFixed(0);
      let newStatus = ''
      if (personts > 80) {
        newStatus = 'completed'
      } else {
        newStatus = 'fallen'
      }
      target.status = newStatus;
      await Target.findByIdAndUpdate(target._id, { status: newStatus })
    }
    return target
  })
  res.json({ targets })
});

module.exports = router;
