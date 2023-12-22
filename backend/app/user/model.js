
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
// const AutoIncrement = require('mongoose-sequence')(mongoose);
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked'); 

const bcrypt = require('bcrypt');

let userSchema = Schema({

  full_name: {
    type: String, 
    required: [true, 'Nama harus diisi'], 
    maxlength: [255, 'Panjang nama harus antara 3 - 255 karakter'],
    minlength: [3, 'Panjang nama harus antara 3 - 255 karakter']
  }, 

  customer_id: {
    type: Number, 
  },

  email: {
    type: String,
    required: [false, 'Email harus diisi'],
    maxlength: [255, 'Panjang email Maksimal 255 karakter'],
    validate: [
        {
            validator: function (value) {
                const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return value === null || value === undefined || EMAIL_RE.test(value);
            },
            message: attr => `${attr.value} Harus merupakan email yang valid`
        },
        {
            validator: async function (value) {
                try {
                    if (value !== null && value !== undefined) {
                        const count = await this.constructor.countDocuments({ email: value });
                        return count === 0;
                    }
                    return true;
                } catch (err) {
                    throw err;
                }
            },
            message: attr => `${attr.value} Sudah terdaftar`
        }
    ]
},

  password: {
    type: String, 
    required: [true, 'Password harus diisi'], 
    maxlength: [255, 'Panjang password maksimal 255 karakter'], 
  }, 

  role: {
    type: String, 
    enum: ['user', 'admin'],
    default: 'user'
  },

  token: [String]

}, { timestamps: true });


MongooseAutoIncrementID.initialise('counters');

userSchema.plugin(MongooseAutoIncrementID.plugin, {
    modelName: 'User',
    field: 'customer_id',
    incrementBy: 1,
    startAt: 1,
    unique: true,
    nextCount: false,
    resetCount: false,
  });



const HASH_ROUND = 10;
userSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, HASH_ROUND); 
  next()
});


// userSchema.plugin(AutoIncrement, {inc_field: 'customer_id'});


module.exports = model('User', userSchema);