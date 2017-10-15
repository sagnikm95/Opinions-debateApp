import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Questions } from '/imports/api/questions.js';

import './app-body.html';

Template.App_body.events({
    /* 'submit .new-question'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        Questions.insert({
            text:text,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),
            username: Meteor.user().username,
            for:[],
            against: []
        });

        // Clear form
        target.text.value = '';
    }, */

    'click #post-button' (event) {
        event.preventDefault();
        // Get value from form element
        // const target = event.target;
        const text = $('#title-input').val();
        const description = $('#description-input').val();

        // Insert a task into the collection
        Questions.insert({
            text:text,
            description:description,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),
            username: Meteor.user().username,
            for: [],
            against: []
        });

        // Clear form
        $('#title-input').val('');
        $('#description-input').val('');
    }
});
