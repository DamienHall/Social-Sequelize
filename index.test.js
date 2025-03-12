const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require('./db/connection.js');

describe('Social Sequelzie Test', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the test suite is run
        await db.sync({ force: true });
    })

    test("Can create User", async () => {
        const user = await User.create({ username: "Damien", email: "damien.z.hall@gmail.com" });
        expect(user.username).toBe("Damien");
    });

    test("Can create Profile", async () => {
        const profile = await Profile.create({ bio: "My name is Damien and I program :)", profilePicture: "pfp.jpeg", birthday: "11/08/2003" });
        expect(profile.profilePicture).toBe("pfp.jpeg");
    });

    test("Can create Post", async () => {
        const post = await Post.create({ title: "Why I like my 97 Miata", body: "Its pretty cool because its from 1997 and is a JDM car! It may not be exported straight from japan making it not a TRUE JDM car but thats okay! Its still got the spirit :)", createdAt: "3/11/2025" });
        expect(post.title).toBe("Why I like my 97 Miata");
    });

    test("Can create Comment", async () => {
        const comment = await Comment.create({ body: "Thats so cool!", createdAt: "3/11/2025" });
        expect(comment.body).toBe("Thats so cool!");
    });

    test("Can create Like", async () => {
        const like = await Like.create({ reactionType: "Like", createdAt: "3/11/2025" })
        expect(like.reactionType).toBe("Like");
    });
    
    // ASSOCIATION TESTS
    test("User has one Profile", async () => {
        const user = await User.create({ username: "Damien", email: "damien.z.hall@gmail.com" });
        const profile = await Profile.create({ bio: "My name is Damien and I program :)", profilePicture: "pfp.jpeg", birthday: "11/08/2003" });
        await user.setProfile(profile);
        expect(await (await user.getProfile()).bio).toBe(profile.bio);
    });

    test("Profile has one User", async () => {
        const user = await User.create({ username: "Damien", email: "damien.z.hall@gmail.com" });
        const profile = await Profile.create({ bio: "My name is Damien and I program :)", profilePicture: "pfp.jpeg", birthday: "11/08/2003" });
        await profile.setUser(user);
        expect(await (await profile.getUser()).username).toBe(user.username);
    });

    test("User has many Post", async () => {
        const user = await User.create({ username: "Damien", email: "damien.z.hall@gmail.com" });
        const posts = [
            await Post.create({ title: "This is a Post 1", body: "Post content 1", createdAt: "3/12/2025" }),
            await Post.create({ title: "This is a Post 2", body: "Post content 2", createdAt: "3/12/2025" })
        ];
        await user.addPosts(posts[0]);
        await user.addPosts(posts[1]);
        expect(await ( await user.getPosts() )[0].title).toBe(posts[0].title);
    });

    test("Post has one User", async () => {
        const user = await User.create({ username: "Damien", email: "damien.z.hall@gmail.com" });
        const post = await Post.create({ title: "This is a Post", body: "Post content", createdAt: "3/12/2025" });
        await post.setUser(user);
        expect(await (await post.getUser()).username).toBe(user.username);
    });
    
    test("Post has many Comment", async () => {  
        const post = await Post.create({ title: "This is a Post", body: "Post content", createdAt: "3/12/2025" });
        const comments = [
            await Comment.create({ body: "This is a comment 1", createdAt: "3/12/2025" }),
            await Comment.create({ body: "This is a comment 2", createdAt: "3/12/2025" })
        ];
        await post.addComment(comments[0]);
        await post.addComment(comments[1]);
        expect(await (await post.getComments())[0].body).toBe(comments[0].body);
    });

    test("Comment has one Post", async () => {
        const post = await Post.create({ title: "This is a Post", body: "Post content", createdAt: "3/12/2025" });
        const comment = await Comment.create({ body: "This is a comment", createdAt: "3/12/2025" });
        await comment.setPost(post);
        expect(await (await comment.getPost()).title).toBe(post.title);
    });

    test("User has many Like", async () => {
        const user = await User.create({ username: "Damien", email: "damien.z.hall@gmail.com" });
        const likes = [
            await Like.create({ reactionType: "Like", createdAt: "3/12/2025" }),
            await Like.create({ reactionType: "Heart", createdAt: "3/12/2025" })
        ];
        await user.addLike(likes[0]);
        await user.addLike(likes[1]);
        expect(await (await user.getLikes())[0].reactionType).toBe(likes[0].reactionType);
    });

    test("Like has many User", async () => {
        const like = await Like.create({ reactionType: "Like", createdAt: "3/12/2025" });
        const users = [
            await User.create({ username: "Damien", email: "damien.z.hall@gmail.com" }),
            await User.create({ username: "Chris", email: "chris.z.hall@gmail.com" })
        ];
        await like.addUser(users[0]); 
        await like.addUser(users[1]); 
        expect(await (await like.getUsers())[0].username).toBe(users[0].username);
    }); 
})
