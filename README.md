# About

FavourQuest makes helping people into a fun RPG style game. This is a gamification of real life volunteering and doing good deeds in the community.
When coming up with ideas, we decided we wanted to build an app that was beneficial for the community and would inspire people to be more helpful and kind to each other.

# Launching

To run the app, follow these instructions:

1 - Fork and clone this repo.

2 - Run npm install to add the libraries.

3 - You will need to have a Google API Key, more info here: https://developers.google.com/maps/documentation/places/web-service/get-api-key

4 - This key should be stored locally by assigning it to a variant. We have saved it in a secretKey.js file inside a secretkey folder, nested inside the App folder and then imported it into the QuestInput page. We would suggest that you follow a similar setup, however, if you choose not to, please make sure you change the import statement on line 18 of QuestInput.

5 - Then the app can be open through Expo on either xCode or an iPhone by running npm start on the terminal.
