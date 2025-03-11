const { Comment, Like, Post, Profile, User } = require("./models/index");

// Define your associations here
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
