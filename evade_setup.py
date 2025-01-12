import os
import logging
from contextlib import suppress

# Set up logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def check_prerequisites():
    """Check if all prerequisites for running the script are met."""
    prerequisites = {
        "Python Version": lambda: os.sys.version_info >= (3, 7),
        "Node.js Installed": lambda: os.system("node --version > /dev/null 2>&1") == 0,
        "Flutter Installed": lambda: os.system("flutter --version > /dev/null 2>&1") == 0,
    }

    missing = []
    for name, check in prerequisites.items():
        if not check():
            missing.append(name)

    if missing:
        logging.error("Missing prerequisites:")
        for item in missing:
            logging.error(f"- {item}")
        logging.error("Please install the required prerequisites before running the script.")
        exit(1)
    else:
        logging.info("All prerequisites are met.")

def create_directory_structure(base_path):
    """Create the directory structure for Evade."""
    structure = {
        "backend": ["routes", "controllers", "models", "middleware", "tests", "fleet_analytics"],
        "frontend": ["components", "screens", "styles", "utils", "tests", "accessibility"],
        "mobile": ["ios", "android", "lib", "tests"],
        "desktop": ["src", "native", "assets", "tests"],
        "usb": ["core", "drivers", "offline_maps", "portable_runtime", "tests"],
        "offline": ["ai", "sync_manager"],
        "shared": ["constants", "locales", "utilities", "assets", "regions"],
        "infra": ["Docker", "k8s", "terraform", "CI-CD", "monitoring"],
        "analytics": ["telemetry", "reports"],
        "docs": ["end_user", "contributors", "api"],
        "security": ["audit", "secrets_manager", "pen_tests", "permissions"],
        "community": ["feature_requests", "bug_reports", "user_feedback", "moderation", "gamification", "leaderboards"],
        "ml": ["models", "training", "versioning"],
        "future": ["ev", "drones", "autonomous"],
        "tests": ["e2e", "performance", "accessibility"]
    }

    for folder, subfolders in structure.items():
        folder_path = os.path.join(base_path, folder)
        os.makedirs(folder_path, exist_ok=True)
        for subfolder in subfolders:
            subfolder_path = os.path.join(folder_path, subfolder)
            os.makedirs(subfolder_path, exist_ok=True)
        logging.info(f"Created directory: {folder_path}")

def generate_ci_cd_workflow(environment="production"):
    """Generate the CI/CD workflow content for the specified environment."""
    branch = "main" if environment == "production" else "staging"
    return f"""name: CI/CD Pipeline for Evade ({environment.capitalize()})

on:
  push:
    branches:
      - {branch}
  pull_request:
    branches:
      - {branch}

jobs:
  build:
    name: Build and Test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install and Test Backend
        working-directory: ./backend
        run: |
          npm install
          npm run lint
          npm test

      - name: Install and Test Frontend
        working-directory: ./frontend
        run: |
          npm install
          npm run lint
          npm test

      - name: Install and Test Mobile
        working-directory: ./mobile
        run: |
          flutter pub get
          flutter test

  deploy:
    name: Deploy to {environment.capitalize()}
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/{branch}'

    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Deploy Backend
        working-directory: ./backend
        run: |
          echo "Deploying backend to {environment}..."

      - name: Deploy Frontend
        working-directory: ./frontend
        run: |
          echo "Deploying frontend to {environment}..."

      - name: Deploy Mobile App
        working-directory: ./mobile
        run: |
          echo "Distributing mobile app for {environment}..."
"""

def create_workflows(base_path):
    """Create GitHub workflows."""
    workflows_path = os.path.join(base_path, ".github", "workflows")
    os.makedirs(workflows_path, exist_ok=True)
    try:
        with open(os.path.join(workflows_path, "ci-cd-production.yml"), "w") as workflow_file:
            workflow_file.write(generate_ci_cd_workflow(environment="production"))
        logging.info("Created CI/CD production workflow.")
    except OSError as e:
        logging.error(f"Error writing CI/CD production workflow: {e}")

    try:
        with open(os.path.join(workflows_path, "ci-cd-staging.yml"), "w") as workflow_file:
            workflow_file.write(generate_ci_cd_workflow(environment="staging"))
        logging.info("Created CI/CD staging workflow.")
    except OSError as e:
        logging.error(f"Error writing CI/CD staging workflow: {e}")

def create_readme(base_path):
    """Create a README.md file."""
    readme_content = """# Evade

Evade is a multi-platform navigation system with advanced features...

[Truncated for brevity]
"""
    try:
        with open(os.path.join(base_path, "README.md"), "w") as readme_file:
            readme_file.write(readme_content)
        logging.info("Created README file.")
    except OSError as e:
        logging.error(f"Error writing README file: {e}")

def main():
    check_prerequisites()

    base_path = "./Evade"
    os.makedirs(base_path, exist_ok=True)

    # Create directory structure
    create_directory_structure(base_path)

    # Create workflows
    create_workflows(base_path)

    # Create README
    create_readme(base_path)

    logging.info(f"Evade project structure created at {base_path}")

if __name__ == "__main__":
    main()
