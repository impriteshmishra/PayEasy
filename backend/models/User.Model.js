import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Ensures field doesn't have unnecessary spaces
    minLength: 5,
    maxLength: 10
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    
  },
  dateOfBirth: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: "Date of birth cannot be in the future."
    }
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"], //using the enum option in a schema to define a set of valid values for a field.
    required: true
  }
})

export const User = mongoose.model('User', userSchema);
// in future phone number is implement and otp verification