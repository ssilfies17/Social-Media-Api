const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
        minlength: 4,
      },
      thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
      ],
      friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
      ],
    },
    {
      toJSON: {
        getters: true,
        virtuals: true,
      },
      id: false,
    }
);

userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length;
});
  
const User = model('user', userSchema);

module.exports = User;