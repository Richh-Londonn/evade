import os
import json

# Base path for the Evade repository
base_path = r"C:\Users\richl\evade"  # Replace with your local repository path

# Function to analyze the repository structure
def analyze_repository(base_path):
    repo_structure = {}
    for root, dirs, files in os.walk(base_path):
        # Calculate relative path
        relative_path = os.path.relpath(root, base_path)
        if relative_path == ".":
            relative_path = "/"
        
        # Record directories and files
        repo_structure[relative_path] = {"dirs": dirs, "files": files}
    
    return repo_structure

# Analyze the repository structure
evade_repo_analysis = analyze_repository(base_path)

# Print the analysis in a readable format
print(json.dumps(evade_repo_analysis, indent=4))
