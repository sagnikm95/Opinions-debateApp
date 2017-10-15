import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Chats = new Mongo.Collection( 'chats' );

Chats.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Chats.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let ChatsSchema = new SimpleSchema({
  'questionId': {
    type: String,
    label: 'The question the channel belongs to'
  },
  'name': {
    type: String,
    label: 'The name of the channel.'
  },
  'completed': {
    type: Boolean,
    label: 'Whether the chat is completed'
  },
  'for': {
    type: String,
    label: 'ID of user for the argument'
  },
  'against': {
    type: String,
    label: 'ID of user for the argument'
  }
});

Chats.attachSchema( ChatsSchema );