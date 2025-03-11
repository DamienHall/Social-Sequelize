const Comment = require("./Comment");
const Like = require("./Like");
const Post = require("./Post");
const Profile = require("./Profile");
const User = require("./User");

User.hasOne(Profile);
Profile.hasOne(User);
User.hasMany(Post);
Post.hasOne(User);
Post.hasMany(Comment);
Comment.hasOne(Post);
User.hasMany(Like);
Like.hasMany(User);

module.exports = {
    Comment,
    Like,
    Post,
    Profile,
    User
}
