const mongoose = require('mongoose')
const {model, Schema} = mongoose

const productSchema = Schema({
    name: { 
        type: String,
        minlenght: [3, 'Panjang nama makanan minimal 3 karakter'],
        required: [true, 'Nama makanan harus diisi']
    },

    description: {
        type: String,
        maxlenght: [1000, 'Panjang deskripsi maksimal 1000 karakter']
    },

    price: {
        type: Number,
        default: 0
    },

    image_url: String,

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },

    tags: {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    },
    
} , {timestamps: true})


module.exports = model('Products', productSchema)
