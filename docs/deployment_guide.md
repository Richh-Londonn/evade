
# Deployment Guide

## Local Deployment
1. Run the backend: `cd backend && npm start`
2. Run the frontend: `cd frontend && npm start`

## Cloud Deployment
1. Set up a cloud environment (e.g., AWS, Azure, GCP).
2. Use Docker for containerized deployment:
   - Build images: `docker-compose build`
   - Start services: `docker-compose up`
3. Configure CI/CD using GitHub Actions or similar tools.

