# Setting Up Remote Repository

Follow these steps to connect and push your project to a remote repository:

1. First, create a new repository on your preferred platform (GitHub, GitLab, etc.)

2. Configure your Git identity (if not already done):
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

3. Add your remote repository:
```bash
git remote add origin <your-repository-url>
```

4. Stage and commit all files:
```bash
git add .
git commit -m "Initial commit: EcoSynthAI platform setup"
```

5. Push to the remote repository:
```bash
git push -u origin main
```

Note: If your default branch is different (e.g., 'master' instead of 'main'), adjust the branch name accordingly.

## Important Files to Check

Make sure these important files are included in your commit:

- `client/` - Frontend React application
- `server/` - Backend Express server
- `shared/` - Shared types and schemas
- `.gitignore` - Git ignore rules
- `README.md` - Project documentation
- Configuration files (package.json, tsconfig.json, etc.)

## Environment Variables

Remember to:
1. Never commit your `.env` file
2. Create a `.env.example` file with placeholder values
3. Document all required environment variables in README.md
