ReadMe

- Clone from Github repository 
  - git@github.com:SanDiegoCodeSchool/street-eatz.git
- Npm install expo-cli
- Navigate to Mobile folder and type npm install in the terminal
- Navigate to Server folder and type  npm install in the terminal
- Add .env file in Mobile folder:
  - HOST=<http://route-to-your-local-host:3000>
  - $ifconfig => en0: inet <your ip is here>
  ![Screen Shot 2020-03-20 at 3 21 29 PM](https://user-images.githubusercontent.com/17171899/77211426-2fb75d80-6ac1-11ea-944c-4f7fb7a754e5.png)

  - EXAMPLE: HOST=’http://192.168.1.132:3000’
- Install expo on your phone from the app store
- Scan QR code after npm start in mobile folder to start app
- Make sure your phone and computer are on the same Wifi.
- RECOMMENDED: Install Xcode to use ios simulator.
  - Npm start in mobile folder then click use ios simulator to start app
- Install MongoDB on your local computer.
  - https://docs.mongodb.com/manual/installation/
  - Install community version
- Owners and businesses must be added in loopback.
  - localhost:3000/explorer
  - Adding Owner:
    - Email, password, business fields are required.
    - Owners could be associated with one or more businesses.
  - Adding businesses:
    - Businesses should be added with the following format:
    {
    "name": 
    "number": "",
    "food style": "",
    "price range":"",
    "menu": [
          {
            "item": "",
            "category": "",
            "image": "",
            "desc": "",
            "price": ""
          }
        ],
        "image": "",
        "url": "",
        "ownerId": ""
    } 

    *note the "food style" and "price range" section is used with the filter to find food trucks.
    "Price Range" can range between "$" and "$$$".
  
- Customers can be created through the register page.
- In order to run the app properly, do an npm start in the Mobile and Server folder.
- Plus make sure your MongoDB server is running.

-------------------------------------------------------------------------------------
NOTE ON MAP ICONS
If this app is pushed to production, please make sure that a custom icon is used on maps. If the present icon is used ("food-truck.png"), attribute must be given to icon author (Good Ware). See https://www.flaticon.com/free-icon/food-truck_2676380?term=food%20truck&page=1&position=35 for instructions on giving attribute.
-------------------------------------------------------------------------------------
NOTE ON SHARE FEATURE
Once app is pushed into production. Please add a link to the app download page in the share button message (./mobile/ShareFeature).