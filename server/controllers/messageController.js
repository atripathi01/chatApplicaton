const Message = require('../model/messageModel');

module.exports.addmessages = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: 'message added successfully' });
    return res.json({ msg: 'failed to add message' });
  } catch (err) {
    next(err);
    // return res.status(400).json({ error: 'something went wrong' });
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const data = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    console.log(data, 'All message');
    const msgs = data?.map((ms) => {
      return {
        fromSelf: ms.sender.toString() === from,
        message: ms.message.text,
        _id: ms._id,
      };
    });
    return res.status(201).json({ message: 'List of all messages', msgs });
  } catch (err) {
    next(err);
    // return res.status(400).json({ error: 'something went wrong' });
  }
};
