const mongoose = require('mongoose')
const {model, Schema} = mongoose

const deliveryAddressSchema = Schema({

    nama: {
        type: String,
        maxlength: [255, 'Panjang Alamat maksimal 255 karakter'],
        required: [true, 'Nama Alamat harus diisi']
    },

    kelurahan: {
        type: String,
        maxlength: [255, 'Panjang kelurahan maksimal 255 karakter'],
        required: [true, 'Kelurahan harus diisi']
    },

    kecamatan: {
        type: String,
        maxlength: [255, 'Panjang kecamatan maksimal 255 karakter'],
        required: [true, 'kecamatan harus diisi']
    },

    kabupaten: {
        type: String,
        maxlength: [255, 'Panjang kabupaten maksimal 255 karakter'],
        required: [true, 'kabupaten harus diisi']
    },

    provinsi: {
        type: String,
        maxlength: [255, 'Panjang provinsi maksimal 255 karakter'],
        required: [true, 'provinsi harus diisi']
    },

    detail: {
        type: String,
        maxlength: [1000, 'Panjang detail maksimal 255 karakter'],
        required: [true, 'detail harus diisi']
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    
}, {timestamps: true})


module.exports = model('DeliverAddress', deliveryAddressSchema)
