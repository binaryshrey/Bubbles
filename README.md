# Bubbles ![Vercel deployments](https://img.shields.io/github/deployments/binaryshrey/bubbles/production?style=flat&logo=vercel&label=vercel) ![Render deployments](https://img.shields.io/github/deployments/binaryshrey/bubbles/production?style=flat&logo=render&label=render) ![BetterStack deployments](https://img.shields.io/github/deployments/binaryshrey/bubbles/production?style=flat&logo=betterstack&label=betterstack) ![supabase](https://img.shields.io/github/deployments/binaryshrey/bubbles/production?style=flat&logo=supabase&label=supabase) ![Upstash-redis](https://img.shields.io/github/deployments/binaryshrey/bubbles/production?style=flat&logo=upstash&label=upstash) 

Instantly Share & Celebrate Your Magical Moments - with Bubbles view-once album links that pops after 5 mins: [View](https://bubbles-inc.vercel.app/)

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
- Include Firebase-Storage with prod db-rule


#### Supabase configs
- Create Supabase PostgreSQL DB with below cols:

| Col Name   | Col Type |
| --------   | -------- |
| link_id    | text  |
| user_id    | text  |
| user_email | text  |
| album_id   | text  |
| album_name | text  |
| album_photos  | text  |
| is_active  | bool  |
| created_at | text  |
| expires_at | text  |
| viewed_by  | text  |
| link_analytics  | json  |


Development server runs at `http://localhost:3000`






