# Project Title
Receipt Processor

## Table of Contents
- [Installation](#installation)
- [Endpoints](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation
1. Make sure Docker is installed
    On terminal run ``` docker --version ```

2. Clone Repository 
    ```bash
    git clone https://github.com/yourusername/yourproject.git
    ```
3. Open terminal and go to repository
    ``` cd <repo PATH>```

4. Build Docker Image
    ``` docker build . -t <Docker-Name>```

5. Run Docker Image
    ``` docker run -d -p 3000:3000 <docker-image-id> ```

## Endpoints
1. GET All Receipts
    - Path: `/`
    - Method: `GET`
    - Payload Method: N/A
    - Response: JSON containing an array of receipt items.

    **Description**
    This API is to retrieve all receipts within the Database

    **Examples**
    ``` 
    JSON
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

2. GET Receipt Points
    - Path: `/receipt/{id}/points`
    - Method: `Get`
    - Response: A JSON object containing the number of points awarded.

    **INPUT JSON:**
    ``` json
    //Make a GET HTTP request to endpoint `/receipt/{id}/points`
    
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

3. POST Receipt Information
    - Path: /receipts/process
    - Method: POST
    - Payload: Receipt JSON
    - Response: JSON containing an id for the receipt.

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