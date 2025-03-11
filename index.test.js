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
})
