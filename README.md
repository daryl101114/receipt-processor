# Project Title
Receipt Processor

## Table of Contents
- [Installation](#installation)
- [Endpoints](#Endpoints)
    - [GET All Receipts](#1-get-all-receipts)
    - [GET Receipt Points](#2-get-receipt-points)
    - [POST Receipt Information](#3-post-receipt-information)

## Installation
1. Make sure Docker is installed
    On terminal run ``` docker --version ```

2. Clone Repository 
    ```bash
    git clone https://github.com/daryl101114/receipt-processor.git
    ```
3. Open terminal and go to repository
    ``` bash
    cd <repo_PATH>
    ```

4. Build Docker Image
    ```bash 
    docker build --tag receipt-processor:latest .
    ```
5. List Docker Images
    ``` bash
    docker images
    ```

6. Run Docker Image from Image ID
    ``` bash
    docker run --env SERVER_PORT=8000 -d -p 8000:8000 <docker-image-id> 
    ```
> [!NOTE]
> Once Docker Container is running, App should be running under `http://localhost:3000/`
> Use postman to test endpoints


## Endpoints
## 1. GET All Receipts
- **Path**: `/`
- **Method**: `GET`
- **Payload**: N/A
- **Response**: JSON array of receipt items.

**Description**
This API is to retrieve all receipts within the Database

**Examples**
``` json
        [
                {
                "retailer": "Target",
                "purchaseDate": "2022-01-01",
                "purchaseTime": "13:01",
                "items": [
                    {
                    "shortDescription": "Mountain Dew 12PK",
                    "price": "6.49"
                    },{
                    "shortDescription": "Emils Cheese Pizza",
                    "price": "12.25"
                    },{
                    "shortDescription": "Knorr Creamy Chicken",
                    "price": "1.26"
                    },{
                    "shortDescription": "Doritos Nacho Cheese",
                    "price": "3.35"
                    },{
                    "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
                    "price": "12.00"
                    }
                ],
                "total": "35.35"
                },
                {
                "retailer": "Target",
                "purchaseDate": "2022-01-01",
                "purchaseTime": "13:01",
                "items": [
                    {
                    "shortDescription": "Mountain Dew 12PK",
                    "price": "6.49"
                    },{
                    "shortDescription": "Emils Cheese Pizza",
                    "price": "12.25"
                    },{
                    "shortDescription": "Knorr Creamy Chicken",
                    "price": "1.26"
                    },{
                    "shortDescription": "Doritos Nacho Cheese",
                    "price": "3.35"
                    },{
                    "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
                    "price": "12.00"
                    }
                ],
                "total": "35.35"
                }
        ]
```

## 2. GET Receipt Points
- **Path**: `/receipt/{id}/points`
- **Method**: `GET`
- **Payload**: N/A
- **Response**: A JSON object containing the number of points awarded.

***Sample Input JSON*** - Make a GET HTTP request to endpoint `/receipt/{id}/points
 ``` json
    {
        "id": "1"
        "retailer": "Target",
        "purchaseDate": "2022-01-01",
        "purchaseTime": "13:01",
        "items": [
            {
            "shortDescription": "Mountain Dew 12PK",
            "price": "6.49"
            },{
            "shortDescription": "Emils Cheese Pizza",
            "price": "12.25"
            },{
            "shortDescription": "Knorr Creamy Chicken",
            "price": "1.26"
            },{
            "shortDescription": "Doritos Nacho Cheese",
            "price": "3.35"
            },{
            "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
            "price": "12.00"
            }
        ],
        "total": "35.35"
    }
```
 ***Sample Output***
``` json
    { "points": 32 }
 ```
```
    Breakdown:
        6 points - retailer name has 6 characters
        10 points - 4 items (2 pairs @ 5 points each)
        3 Points - "Emils Cheese Pizza" is 18 characters (a multiple of 3)
                    item price of 12.25 * 0.2 = 2.45, rounded up is 3 points
        3 Points - "Klarbrunn 12-PK 12 FL OZ" is 24 characters (a multiple of 3)
                    item price of 12.00 * 0.2 = 2.4, rounded up is 3 points
        6 points - purchase day is odd
    + ---------
    = 28 points
 ```

## 3. POST Receipt Information
- **Path**: `/receipts/process`
- **Method**: `POST`
- **Payload**: Receipt JSON
- **Response**: JSON containing an id for the receipt.

**INPUT JSON**
``` json
    {
        "id": "1"
        "retailer": "Target",
        "purchaseDate": "2022-01-01",
        "purchaseTime": "13:01",
        "items": [
            {
            "shortDescription": "Mountain Dew 12PK",
            "price": "6.49"
            },{
            "shortDescription": "Emils Cheese Pizza",
            "price": "12.25"
            },{
            "shortDescription": "Knorr Creamy Chicken",
            "price": "1.26"
            },{
            "shortDescription": "Doritos Nacho Cheese",
            "price": "3.35"
            },{
            "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
            "price": "12.00"
            }
        ],
        "total": "35.35"
    }
```
***OUTPUT JSON***
```json
    { "id": "1" }
```