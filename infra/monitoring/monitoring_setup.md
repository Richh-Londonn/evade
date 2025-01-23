
# Monitoring Setup

## Sentry Integration
1. Create a project in Sentry (https://sentry.io).
2. Add your Sentry DSN to the `.env` file in the backend:
   - `SENTRY_DSN=your_sentry_dsn_here`

## Datadog Integration
1. Set up a Datadog account (https://www.datadoghq.com).
2. Install the Datadog agent on your server:
   - `DD_API_KEY=your_datadog_api_key`
   - Follow instructions: https://docs.datadoghq.com/agent/basic_agent_usage/

## Metrics to Monitor
- **API Latency**: Track response times for critical endpoints.
- **Error Rates**: Monitor 4xx and 5xx errors.
- **Traffic**: Measure concurrent users and request volumes.
