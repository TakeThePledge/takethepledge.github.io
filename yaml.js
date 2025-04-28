name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install dependencies
        run: npm install # Or yarn install, etc.

      - name: Build the project
        env:
          FIREBASECONFIG: ${{ secrets.FIREBASECONFIG }}
        run: |
         
          sed -i "s/YOUR_API_KEY_PLACEHOLDER/$FIREBASE_API_KEY/g" public/index.html

      - name: Deploy to Firebase Hosting
        env:
          FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }} # Access the secret here
        run: |
          firebase use your-firebase-project-id --token "$FIREBASE_API_KEY" # Replace with your project ID
          firebase deploy --only hosting --token "$FIREBASE_API_KEY"
