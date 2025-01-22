
# Evade Security Documentation

## Environment Variables
Store all sensitive configurations in environment variables:
- **DB_URI**: MongoDB connection URI.
- **JWT_SECRET**: Secret key for JWT authentication.
- **STRIPE_SECRET_KEY**: Stripe secret key for processing payments.
- **STRIPE_WEBHOOK_SECRET**: Webhook secret for Stripe events.

## Secrets Management
Use a secure secrets management tool like:
- HashiCorp Vault
- AWS Secrets Manager
- Azure Key Vault

## Best Practices
- Do not hardcode sensitive data in source code.
- Rotate keys periodically.
- Limit access to secrets based on roles.
