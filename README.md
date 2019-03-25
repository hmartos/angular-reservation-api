# angular-reservation REST API

This project is a REST API implementation example for [angular-reservation]() module. This is only an example with NodeJS and Express and may need some protection since there is no Authentication nor Authorization control.

## Requirements

- NodeJS and npm
- MongoDB

## Installation

- Clone the repo: `git clone https://github.com/hmartos/angular-reservation-api.git`
- Install dependencies: `npm install`
- Start the server: `node server.js` There is a preconfifigured start script so you can run `npm start` instead

## Database initialization

There is a Python script to initialize database with a schedule for 10 years. Edit start date, end date and time slots in the script and execute

```bash
cd app
pip install timedelta pymongo json date
python fillDb.py
```

## REST API Specification

### Get available hours for selected date

  _Called on select date, return the list of available hours for selected date._

* **URL**
  _/availableHours_

* **Method:**
  `GET`
  
*  **URL Params**

   * **Required:**
  `selectedDate=[string]`

* **Success Response:**
  _Returns an array with available hours for selected date, a SUCCESS status and a message. <br/> You can use status to return a 200 code response with an error and an optional message to explain what has happened._
  * **Code:** 200 <br />
    **Content:** 
```json
{
	"availableHours": [
	  "10:00",
	  "10.30",
	  "11.30",
	  "12.30",
	  "13.00",
	  "17.00",
	  "17.30",
	  "18.00",
	  "18.30",
	  "19.00"
	],
	"status": "SUCCESS",
	"message": ""
}
```


### Reserve hour for selected date

  _Called on reserve action. Reserve selected hour from list of available hours for selected date passing user data._

* **URL**
  _/reserve_

* **Method:**
  `POST`
  
* **Data Params**
_Include selected date, selected data and user data._
```json
{
	"selectedDate": "2017-03-25",
	"selectedHour": "10:00",
	"userData": {
		"name": "Héctor",
		"phone": "123456789",
		"email": "hector@email.com"
	}
}
```

* **Success Response:**
  _Returns a SUCCESS status and a message. <br/> You can use status to return a 200 code response with an error and an optional message to explain what has happened._
  
  * **Code:** 200 <br />
    **Content:** 
```json
{
  "status": "SUCCESS",
  "message": ""
}
```

## Testing the API

Test your API using [Postman](https://www.getpostman.com/) and the included `angular-reservation.postman_collection.json`
