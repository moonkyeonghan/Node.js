const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
{
     name: {
        type: String,
        required: true
    },
    email: {
        type: String,

    },
    phone: {
        type: String,
        required: [true, "전화번호는 필수입니다."]
    },
},
    {
        timestamps: true
    });
    const Contact = mongoose.model('Contact', contactSchema);

    module.exports = Contact;