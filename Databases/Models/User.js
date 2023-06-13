// Models/User.js

const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    Name: { type: String, required: false },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Address: { type: String, required: false },
    Phone: { type: String },
    AvatarUrl: { type: String },    
    IsActive: { type: Boolean, default: true },
    PubsId: [{ type: String }]
    },
  { timestamps: true }
);

// module.exports = mongoose.model("User", UserSchema);
module.exports = mongoose.models.Users || mongoose.model('Users', UsersSchema);