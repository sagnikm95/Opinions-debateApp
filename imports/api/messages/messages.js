import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Messages = new Mongo.Collection( 'messages' );

Messages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Messages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let MessagesSchema = new SimpleSchema({
  'chatId': {
    type: String,
    label: 'The ID of the chat this message belongs to.'
  },
  'owner': {
    type: String,
    label: 'The ID of the user that created this message.'
  },
  'createdAt': {
    type: Date,
    label: 'The date and time this message was created.'
  },
  'message': {
    type: String,
    label: 'The content of this message.'
  }
});

Messages.attachSchema( MessagesSchema );