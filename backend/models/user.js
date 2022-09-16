const mongoose = require('mongoose');
const regulatoryExpression = require('../utils/regulatoryExpression');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: false,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: false,
    validate: regulatoryExpression.linkRegulatoryExpression,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    validate: regulatoryExpression.emailRegulatoryExpression,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
