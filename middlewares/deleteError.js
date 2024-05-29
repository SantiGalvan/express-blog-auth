const posts = require("../database/db.json");

const deleteError = (req, res, next) => {
    const { slug } = req.params;
    const deletePost = posts.find(p => p.slug === slug);

    if (!deletePost) {
        return res.status(404).send(`Non esiste un post con slug ${slug}`);
    }
    next();
}

module.exports = deleteError;