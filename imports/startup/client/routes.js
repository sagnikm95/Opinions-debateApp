import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/app-body.js';
import '../../ui/pages/question-list-show-page';
import '../../ui/pages/question-show-page';
import '../../ui/pages/chat-show-page';

FlowRouter.route('/questions/:_id', {
    name: 'Question.show',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'Question_show_page' });
    }
});

FlowRouter.route('/chats/:_id', {
    name: 'Chat.show',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'Chat_show_page' });
    },
});

FlowRouter.route('/', {
   name: 'App.home',
   action() {
       BlazeLayout.render('App_body', { main: 'Question_list_show_page' });
   },
});