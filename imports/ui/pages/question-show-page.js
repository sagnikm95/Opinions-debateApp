import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { Questions } from "../../api/questions.js";
import { Chats } from "../../api/chats.js";

import './question-show-page.html';

Template.Question_show_page.onCreated(function questionShowOnCreated() {
    this.getQuestionId = () => FlowRouter.getParameter('_id');
});

Template.Question_show_page.helpers({
    question() {
        const instance = Template.instance();
        const questionId = FlowRouter.getParam('_id');

        var query= Questions.findOne(questionId);
        // console.log(query);
        return query;
    },

    questionChatList() {
        const questionID = FlowRouter.getParam('_id');
        return Chats.find({questionId: questionID});
    }
});


function start_chat(isFor) {
    var questionId = FlowRouter.getParam('_id');
    var query = Questions.findOne(questionId);

    var against_list=query.against;
    var for_list=query.for;

    var chatId;
    if (isFor && against_list.length !== 0) {
        chatId = against_list.shift();
        console.log('1. ' + chatId);
        Chats.update(chatId, {
            $set: {for:Meteor.user().username }
        });
        FlowRouter.go('Chat.show', { _id: chatId });
    } else if (!isFor && for_list.length !== 0) {
        chatId = for_list.shift();
        console.log('2. ' + chatId);
        Chats.update(chatId, {
            $set: {against:Meteor.user().username }
        });
        FlowRouter.go('Chat.show', { _id: chatId });
    } else {
        if (isFor) {
            chatId = Chats.insert({
                createdAt: new Date(),
                questionId: questionId,
                completed: false,
                for: Meteor.user().username,
                against: 'Waiting for user',
                countVotedFor: 0,
                countVotedAgainst: 0
            });
            for_list.push(chatId);
            console.log('3. ' + chatId);
        } else {
            chatId = Chats.insert({
                createdAt: new Date(),
                questionId: questionId,
                completed: false,
                for:'Waiting for user',
                against: Meteor.user().username,
              countVotedFor: 0,
              countVotedAgainst: 0
            });
            against_list.push(chatId);
            console.log('4. ' + chatId);
        }
        // console.log(chatId)
        FlowRouter.go('Chat.show', { _id: chatId });
        // console.log(chatId);
    }
    Questions.update(questionId, {
        $set: { against: against_list, for: for_list }
    });
}

Template.Question_show_page.events({
    'click #for-button'(event) {
        start_chat(true);
    }
});

Template.Question_show_page.events({
    'click #against-button'(event) {
        start_chat(false);
    }
});

Template.Question_show_page.events({
  'click #start-debate-button'(event) {
    event.preventDefault();

    $('#start-debate-button').addClass('hide');
    $('#choose-options-div').removeClass('hide');
  }
});
