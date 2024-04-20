const adminApiKey = process.env.ADMIN_API_KEY;

const adminAuthMiddleware = (req, res, next) => {
    const apiKey = req.headers['api-key'];

    if (!apiKey || apiKey !== adminApiKey) {
        return res.status(403).json({ message: 'Unauthorized: Invalid API Key' });
    }

    next();
};

module.exports = adminAuthMiddleware;
