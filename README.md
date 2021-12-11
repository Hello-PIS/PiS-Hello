# PiS-Hello
Business card holder app

Timeline:  
17.11 - 1 stage  
13.12 - 2 stage  
03.01 - 3 stage
24.01 - 4 stage

### Server

#### Run
To run the REST server, you either need to
```shell
cd server
gradle run
```
or straight from the root
```shell
server/gradlew -b server/build.gradle.kts run
```

### Mobile app

#### Run
To be able to run the mobile app in developer mode, you need to install node package manager in mobile app folder
```shell
npm install
```
Then, to run the development server, you need to
```shell
npm start
```
After that, you can run the app on an android/iOS device simulator or directly on your mobile device using Expo Go app.

Links:
* [Jira Board](https://hello-pis.atlassian.net/jira/software/projects/HPIS/boards/1)
* [CI documentation](https://circleci.com/docs/2.0/configuration-reference)
* [Documentation](https://www.overleaf.com/read/gyhnrhzrhfxw)
