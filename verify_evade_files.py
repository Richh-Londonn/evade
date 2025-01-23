import os

# Base path of the Evade repository
base_path = r"C:\Users\richl\evade"  # Replace with your local Evade repository path

# List of files that should exist in the repository
expected_files = [
    ".github/workflows/ci_cd_workflow.yml",
    ".vscode/settings.json",
    "README.md",
    "backend/Dockerfile",
    "backend/onstar/.gitkeep",
    "backend/security/.gitkeep",
    "backend/src/api/admin/userManagement.js",
    "backend/src/api/auth/login.js",
    "backend/src/api/auth/register.js",
    "backend/src/api/index.js",
    "backend/src/api/navigation/radarDetection.js",
    "backend/src/api/navigation/routePlanner.js",
    "backend/src/configs/appConfig.js",
    "backend/src/configs/database.js",
    "backend/src/db/index.js",
    "backend/src/db/models/Route.js",
    "backend/src/db/models/User.js",
    "backend/src/middlewares/authMiddleware.js",
    "backend/src/middlewares/errorHandler.js",
    "backend/src/services/navigationService.js",
    "backend/src/services/userService.js",
    "backend/tests/unit/userService.test.js",
    "devops/docker/docker-compose.yaml",
    "evade_setup.py",
    "frontend/navigation/.gitkeep",
    "frontend/web/Dockerfile",
    "frontend/web/public/index.html",
    "frontend/web/src/components/NavigationMap.jsx",
    "frontend/web/src/components/RadarAlertCard.jsx",
    "frontend/web/src/utils/apiClient.js",
    "ml/models/radarDetectionModel.pkl",
    "ml/scripts/trainRadarModel.py",
    "mobile/connectivity/.gitkeep",
    "offline/mapCache.js",
    "offline/offlineSync.js",
    "shared/utils/logger.js",
    "shared/utils/helpers.js",
    "infra/Dockerfile",
    "security/encryption.js",
    "security/authMiddleware.js",
    "analytics/src/analyticsEngine.js",
    "analytics/src/logParser.js",
    "community/src/feedbackHandler.js",
    "community/src/hazardAlert.js",
    "docs/API.md",
    "docs/CONTRIBUTING.md",
    "docs/README.md"
]

# Check for missing files
missing_files = [file for file in expected_files if not os.path.exists(os.path.join(base_path, file))]

# Output results
if missing_files:
    print("Missing files:")
    for file in missing_files:
        print(f"- {file}")
else:
    print("All files are present.")
