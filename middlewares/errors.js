const errors = (err, req, res, next) => {
    const statusCode = 500;
    res.format({
        html: () => res.status(statusCode).send("Qualcosa non va " + err.message),
        json: () => res.status(statusCode).json({ statusCode, error: err.message })
    });
}

module.exports = errors;