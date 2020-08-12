# GpsPosition  
Api project receive data from SFT9001

## Steps

**Note**  
## PART I: Download & Build on local

### 1) Clone the repository, install node packages  and verify routes locally

``` 
//on local
git clone https://github.com/lipemiranda159/GpsPosition.git
cd GpsPosition
yarn
yarn start
yarn test
```

Open your local browser and try accessing
`https://localhost:3000/auth/` 
`https://localhost:3000/api/v1/location/<deviceId>`

### 2) Config file .env
PORT=
secret=
MONGODB=
URI=
MONGO_USER=
MONGO_PASSWORD=

### 3) File Structure
📁 GpsPosition
|__📁src
|   |__📁constants // The web project constants
|   |__📁controllers // The web project controllers
|   |__📁exceptions // The web project exceptions
|   |__📁middleware // The web project middlewares
|   |__📁models // Models folder
|   |__📁routes // routes folder
|   |__📁services // this folder contains the external integrations
|__📁test //test folder

### 4) Future features
- Implemente queue to process locations received from device







