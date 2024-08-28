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
1. Get All Receipts
    - Path: `\`
    - Method: `GET`
    - Payload Method: N/A
    - Response: JSON containing an array of receipt items.

    **Description**
    This API is to retrieve all receipts within the Database

    **Example  Output**
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

