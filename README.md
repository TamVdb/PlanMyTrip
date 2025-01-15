# PlanMyTrip 🗺️ ✈️
A full stack travel planning application developed in React. 

This application lets you create cards representing your trips, including location, dates of stay and a map. <br />
The number of days is automatically calculated according to the selected dates.  <br />
Clicking on a trip card takes you to a page dedicated to managing activities specific to that trip.  <br />
You can easily add activities in real time and organize them by day, thanks to drag-and-drop functionality.

&nbsp;
##  Test the online API
👩‍💻 Username : User <br />
🔓 Password : password <br />
🤗 Enjoy

&nbsp;
## 👀 Visuels

![Imgur](https://tinyurl.com/35hzp8hy)
![Imgur](https://tinyurl.com/mr29asax)
![Imgur](https://tinyurl.com/yef9dcn4)
![Imgur](https://tinyurl.com/2jyejcfs)
![Imgur](https://tinyurl.com/msjcaaxy)
![Imgur](https://tinyurl.com/259mahfx)
![Imgur](https://tinyurl.com/y8nwvysy)
![Imgur](https://tinyurl.com/4p7jedf8)
![Imgur](https://tinyurl.com/bddj42sd)

&nbsp;
## ⚙️ Installation
### Backend
Install dependencies
```
npm i
```

Create a `planmytrip` DB with MongoDB and a `users` collection.

Create a `.env` file with the following variables:
```
MONGO_URI="mongodb://localhost/planmytrip"
API_URL="http://localhost:5173"
NODE_ENV=developement
JWT_SECRET=abc123
``` 

Start the server
```
npm run dev
```

### Frontend
Install dependencies
```
npm i
```

Create a `.env` file with the following variable:
```
VITE_APP_URL:"http://localhost:8000"
``` 

Start the server
```
npm run dev
```

&nbsp;
## 🔗 Dependencies
### Backend
* Express
* Mongoose
* Bcrypt
* Cookie Parser
* Cors
* Dotenv
* JSON Web Token
* Nodemon

### Frontend
* VITE
* REACT
* Tailwind
* Redux
* Leaflet
* Axios
* React toastify
* React icons
* React Router Dom
* React Date Picker
