const i18next = require('../config/i18n');

const i18nMiddleware = (req, res, next) => {
    const userLanguage = req.user ? req.user.language_preference : 'en';
    req.i18n.changeLanguage(userLanguage);
    next();
};

module.exports = i18nMiddleware;
