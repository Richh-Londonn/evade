
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

function initializeSentry() {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [
            new Sentry.Integrations.Http({ tracing: true }),
            new Tracing.Integrations.Express({ app: require('../server') }),
        ],
        tracesSampleRate: 1.0, // Adjust for production environments
    });

    console.log('Sentry monitoring initialized.');
}

module.exports = initializeSentry;
