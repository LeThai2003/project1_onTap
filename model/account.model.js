const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const accountSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    token: String,
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false 
    },
    deleteAt: Date,
},{
    timestamps: true,
});

const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;