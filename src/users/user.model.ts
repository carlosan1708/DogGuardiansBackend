import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
UserSchema.pre<User>('save', function(next) {
  const user = this;

  // Make sure not to rehash the password if it is already hashed
  if (!user.isModified('password')) {
    return next();
  }

  // Generate a salt and use it to hash the user's password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    // tslint:disable-next-line:no-shadowed-variable
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.checkPassword = function(attempt, callback) {
  const user = this;

  bcrypt.compare(attempt, user.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

export interface User extends mongoose.Document {
  email: string;
  password: string;
  name: string;

  checkPassword(password: string, param2: (err, isMatch) => void): void;
}
