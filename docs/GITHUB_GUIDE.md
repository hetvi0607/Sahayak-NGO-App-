# GitHub Guide

## Create GitHub Account

1. Go to `https://github.com`.
2. Click Sign up.
3. Enter email, password, and username.
4. Verify your email.

## Create Repository

1. Login to GitHub.
2. Click the plus icon.
3. Click New repository.
4. Repository name: `sahayak`.
5. Select Public or Private.
6. Do not add README because this project already has one.
7. Click Create repository.

## Initialize Git

Run from project root:

```bash
git init
git add .
git commit -m "Initial SahayaK project"
```

## Connect Remote Repository

Replace the URL with your GitHub repository URL:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sahayak.git
git push -u origin main
```

## Update Code Later

```bash
git status
git add .
git commit -m "Describe your change"
git push
```

## Pull Latest Code

```bash
git pull origin main
```
