# Bubbles ![Vercel deployments](https://img.shields.io/github/deployments/binaryshrey/bubbles/production?style=flat&logo=vercel&label=vercel) ![Render deployments](https://img.shields.io/github/deployments/binaryshrey/bubbles/production?style=flat&logo=render&label=render) ![BetterStack deployments](https://img.shields.io/github/deployments/binaryshrey/bubbles/production?style=flat&logo=betterstack&label=betterstack)

Instantly Share & Celebrate Your Magical Moments - with Bubbles album links that pops after 5 mins: [View](https://chronos-inc.vercel.app/)

![Banner](https://raw.githubusercontent.com/binaryshrey/Bubbles/main/src/assets/product.webp)

### Development setup

```
git clone https://github.com/binaryshrey/Bubbles.git
cd Bubbles
npm i
npm run start
```

#### Firebase configs
- Create a .env file for Firebase
```
REACT_APP_FIREBASE_API_KEY=**********
REACT_APP_FIREBASE_AUTHDOMAIN=**********.firebaseapp.com
REACT_APP_FIREBASE_PROJECTID=**********
REACT_APP_FIREBASE_STORAGE_BUCKET=**********.appspot.com
REACT_APP_FIREBASE_MESSAGESENDER_ID=**********
REACT_APP_FIREBASE_APPID=**********
REACT_APP_FIREBASE_MEASUREMENTID=**********
REACT_APP_BUBBLE_LINK_EXPIRE_TIME=5
REACT_APP_BUBBLE_ALBUM_PICS_NO_LIMIT=8
REACT_APP_BUBBLE_ALBUM_PICS_SIZE_LIMIT=5
```

- Include Google & Github Auth under Firebase Authentication
- Include Firebase-Storage with prod db-rule:


Development server runs at `http://localhost:3000`






