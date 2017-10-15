import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Questions } from '../../api/questions.js'
import { Chats } from '../../api/chats.js';
import { Messages } from '../../api/messages.js';

import './chat-show-page.html';

Template.Chat_show_page.helpers({
  chatText() {
    const chatID = FlowRouter.getParam('_id');
    console.log(chatID);
    const questionID = Chats.findOne(chatID).questionId;
    console.log(questionID);
    const res = Questions.findOne(questionID).text;
    console.log(res);
    return res;
  },

  messageList() {
    const chatId = FlowRouter.getParam('_id');
    return Messages.find({chatId: chatId});
  },

  assignColor(userName) {
      const chatID = FlowRouter.getParam('_id');
      if (userName === Chats.findOne(chatID).for) {
          return 'for-motion';
      }
      else {
          return 'against-motion';
      }
  },

  getLR(userName) {
    const user = Meteor.user().username;
    if (userName === user) {
      return 'message-left';
    }
    else {
      return 'message-right';
    }
  },

  editable() {
    const chatId = FlowRouter.getParam('_id');
    return !Chats.findOne(chatId).completed;
  },

  countVotedFor() {
    const chatId = FlowRouter.getParam('_id');
    return Chats.findOne(chatId).countVotedFor;
  },

  countVotedAgainst() {
    const chatId = FlowRouter.getParam('_id');
    return Chats.findOne(chatId).countVotedAgainst;
  }
});

Template.Chat_show_page.events({
    'submit .js-message-new'(event) {
        event.preventDefault();

        // Get value from form element
        const chatId = FlowRouter.getParam('_id');
        const target = event.target;

        if (!target.message.value) {
          return;
        }

        var text = target.message.value;

        console.log(chatId);
        console.log(text);

        Messages.insert({
          chatId: chatId,
          owner: Meteor.user().username,
          createdAt: new Date(),
          message: text,
        });

        target.message.value = '';
        var element = document.getElementById("messages");
        element.scrollTop = element.scrollHeight;
    },

    'click .js-leave-conv'(event) {
      event.preventDefault();

      const chatId = FlowRouter.getParam('_id');
      Chats.update(chatId, { $set: { completed: true }});

      FlowRouter.go('App.home');
    },

    'click .inc-voted-for'(event) {
      event.preventDefault();

      const chatId = FlowRouter.getParam('_id');
      const countVotedFor = Chats.findOne(chatId).countVotedFor;
      Chats.update(chatId, { $set: { countVotedFor: countVotedFor + 1 }});
    },

  'click .inc-voted-against'(event) {
    event.preventDefault();

    const chatId = FlowRouter.getParam('_id');
    const countVotedAgainst = Chats.findOne(chatId).countVotedAgainst;
    Chats.update(chatId, { $set: { countVotedAgainst: countVotedAgainst + 1 }});
  },
});

Template.Chat_show_page.onRendered(function () {
    // not working
    Tracker.afterFlush(function () {
        var element = document.getElementById("messages");
        element.scrollTop = element.scrollHeight;
    });
});
