import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Questions } from '/imports/api/questions.js';

import './question-list-show-page.html';

Template.Question_list_show_page.helpers({
    questions() {
        const instance = Template.instance();
        return Questions.find({}, { sort: { createdAt: -1 } });
    }
});
