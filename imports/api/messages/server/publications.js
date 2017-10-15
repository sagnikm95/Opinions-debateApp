import { Meteor } from 'meteor/meteor';

import { Messages } from '../messages.js';

Meteor.publish('chat.messages', function chatMessages(chatId) {
  return Messages.find({
    chatId: { $eq: chatId },
  });
});