# HOW TO USE THIS TEMPLATE

### Creating Your App

1. $ npx create-expo-app YourProjectName --template https://github.com/50thand2nd/ExpoProjectQuickstart
2. $ cd YourProjectName
3. $ yarn install
4. yarn add --dev typescript @types/react @types/react-native
5. npx tsc --init

### Linking EAS

1. Create an account at: https://expo.dev/signup and add your project
2. $ yarn install -g eas-cli
3. Paste the $ eas token command that shows up on the dashboard
4. $ eas secret:create --scope project --name EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY --value pk_test_dHJ1c3R5LWNpY2FkYS03LmNsZXJrLmFjY291bnRzLmRldiQ --type string
5. Run step 4 for every .env variable you have
6. $ eas secret:list

### Linking Clerk

1. Create a new app in https://dashboard.clerk.com/
2. Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in .env
3. Change "scheme": "com.name_of_your_app.app" to the expo part of /app.json
4. Add desired login methods to /src/screens/LoginScreen.js
5. Make sure to add token to all request headers, as shown in /src/screens/HomeScreen.js

### Running The App

1. $ npx expo start

### Adding Notifications

1. $ npx expo install expo-notifications
2. $ Add your projectId from app.json to src/screens/HomeScreen.js
3. Store the generated token in your database

### Publishing To Apple App Store

1. $ npm install -g eas-cli
2. $ eas login
3. $ eas build:configure
4. $ eas secret:push --scope project --env-file .env
5. $ eas build --platform ios
6. $ eas submit -p ios
7. Repeat steps 5 and 6 for new builds

### Tips

- Make sure the name of your app in /app.json is unique enough and short enough or Apple won't let you submit to their store
- Make sure to increment "ios.buildNumber" in /app.json when rebuilding
