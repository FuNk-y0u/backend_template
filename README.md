# Backend Documentation

## Server console commands:

- To run the server:

```
$ npm run start
```

- To migrate the schema to db

```
$ npm run migrate
```

## Account Type Ids:

| Account Type Name | Account Type Id |
| ----------------- | --------------- |
| SUPER_ADMIN       | 0               |
| COMPANY           | 1               |
| PARTNER           | 2               |
| CUSTOMER          | 3               |

## Endpoints for user accounts:

### /register

methods:

- post

#### parameters:

```
{
    "email": "xyz@abc.com",
    "firstname": "ABC",
    "middlename": "XYZ",
    "lastname": "EFG",
    "password": "pass123"
}
```

#### response

```
{
    "message": "the message will appear here"
}
```

### /login

methods:

- post

#### parameters:

```
{
    "email": "xyz@abc.com",
    "password": "pass123"
}
```

#### response

```
{
    "message": "the message will appear here",
    "token": "JWT Token will be here"
}
```

### /session

validates the login token

methods:

- post

#### header:

```
Bearer [JWT TOKEN HERE]
```

#### parameters:

```
{
}
```

#### response

```
{
    "message": "the message will appear here",
    "email": "account@email.com",
    "id": [account_id],
    "firstname": "User first name",
    "middlename": "User middle name",
    "lastname": "User last name",
    "accountType": {
        "id": [account type id],
        "accountTypeName": "account type name"
    }
}
```

### /account_detail

methods:

- get

#### link

```
/account_detail/[account_id]
```

#### response

```
{
    "message": "Sucess",
    "user": {
        "id": 1,
        "email": "robesckeydangol2006@gmail.com",
        "firstname": "Robesckey",
        "middlename": "",
        "lastname": "Dangol Maharjan",
        "accountType": {
            "id": 0,
            "accountTypeName": "SUPER_ADMIN"
        },
        "products": [
            {
                "id": 100,
                "name": "Acer Nitro 6",
                "userId": 1,
                "price": 115000,
                "brand": "Acer",
                "details": "Test detail",
                "image": "https://th.bing.com/th?id=OVP._9gCXdKaU8N_36vouNdVtQHgFo&w=243&h=136&c=7&rs=1&qlt=90&o=5&pid=2.1"
            }
        ],
        "comments": [],
        "ratings": []
    }
}
```

## Endpoints for super admin account:

### /admin_create_account

methods:

- post

#### header

```
Bearer [JWT TOKEN FOR SUPER ADMIN ACCOUNT]
```

#### parameters:

```
{
    "email": "email@here.com",
    "firstname": "firstname here",
    "middlename": "middlename here",
    "lastname": "lastname here",
    "password": "password here",
    "accountTypeCode": [account type id]
}
```

#### response

```
{
    "message": "the message will appear here"
}
```

### /admin_delete_account

methods:

- post

#### header

```
Bearer [JWT TOKEN FOR SUPER ADMIN ACCOUNT]
```

#### parameters:

```
{
    "id": [id of account to delete]
}
```

#### response

```
{
    "message": "the message will appear here"
}
```

### /admin_update_account

methods:

- post

#### header

```
Bearer [JWT TOKEN FOR SUPER ADMIN ACCOUNT]
```

#### parameters:

```
{
    "id": [original account id],
    "newId": [new account id],
    "email": "new@email.com",
    "firstname": "new name",
    "middlename": "new middle name",
    "lastname": "new last name",
    "password": "new password",
    "accountTypeCode": [new account type id]
}
```

#### response

```
{
    "message": "the message will appear here"
}
```

### /admin_view_accounts

methods:

- post

#### header

```
Bearer [JWT TOKEN FOR SUPER ADMIN ACCOUNT]
```

#### parameters:

```
{
}
```

#### response

```
{
    "message": "message will appear here",
    "users": [
        {
            "id": 1,
            "email": "robesckeydangol2006@gmail.com",
            "firstname": "Robesckey",
            "middlename": "",
            "lastname": "Dangol Maharjan",
            "password": "$2b$10$Za9T6AizkLd3MOtbNdDXqeyCOPNi33b6xGrdgTgl8cglVmeypgnkW",
            "emailVerified": false,
            "accountTypeCode": 0
        },
        {
            "id": 69,
            "email": "Slokie@gmail.com",
            "firstname": "Slok",
            "middlename": "",
            "lastname": "Pradhan",
            "password": "$2b$10$IQ.06WwrMcTr2sxx4WK9weDCnYmfZSv6XIxczOc9bCxXk9KRotRWK",
            "emailVerified": false,
            "accountTypeCode": 2
        }
    ]
}
```

## Endpoints for product control account:

### /product_add

methods:

- post

#### header

```
Bearer [JWT TOKEN FOR SUPER ADMIN ACCOUNT]
```

#### parameters:

```
{
    "name": "Acer Nitro 5",
    "price": 115000,
    "brand": "Acer",
    "details": "Test detail",
    "image": "https://th.bing.com/th?id=OVP._9gCXdKaU8N_36vouNdVtQHgFo&w=243&h=136&c=7&rs=1&qlt=90&o=5&pid=2.1"
}
```

#### response

```
{
    "message": "the message will appear here"
}
```

### /product_update

methods:

- post

#### header

```
Bearer [JWT TOKEN FOR SUPER ADMIN ACCOUNT]
```

#### parameters:

```
{
    "id": [original product id],
    "newId": [new product id],
    "name": "Acer Nitro 6",
    "price": 115000,
    "brand": "Acer",
    "details": "Test detail",
    "image": "https://th.bing.com/th?id=OVP._9gCXdKaU8N_36vouNdVtQHgFo&w=243&h=136&c=7&rs=1&qlt=90&o=5&pid=2.1"
}
```

#### response

```
{
    "message": "the message will appear here"
}
```

### /product_delete

methods:

- post

#### header

```
Bearer [JWT TOKEN FOR SUPER ADMIN ACCOUNT]
```

#### parameters:

```
{
    "id": [product id to delete]
}
```

#### response

```
{
    "message": "the message will appear here"
}
```

### /product_search

methods:

- get

#### link

```
/product_search?search="[search name]"
```

#### response

```
{
    "message": "Sucess",
    "products": [
        {
            "id": 100,
            "name": "Acer Nitro 6",
            "userId": 1,
            "price": 115000,
            "brand": "Acer",
            "details": "Test detail",
            "image": "https://th.bing.com/th?id=OVP._9gCXdKaU8N_36vouNdVtQHgFo&w=243&h=136&c=7&rs=1&qlt=90&o=5&pid=2.1",
            "user": {
                "id": 1,
                "firstname": "Robesckey",
                "middlename": "",
                "lastname": "Dangol Maharjan",
                "email": "robesckeydangol2006@gmail.com"
            },
            "comments": [],
            "ratings": []
        }
    ]
}
```

### /product_detail

methods:

- get

#### link

```
/product_detail/[product_id]
```

#### response

```
{
    "message": "Sucess",
    "product": {
        "id": 100,
        "name": "Acer Nitro 6",
        "userId": 1,
        "price": 115000,
        "brand": "Acer",
        "details": "Test detail",
        "image": "https://th.bing.com/th?id=OVP._9gCXdKaU8N_36vouNdVtQHgFo&w=243&h=136&c=7&rs=1&qlt=90&o=5&pid=2.1",
        "user": {
            "id": 1,
            "firstname": "Robesckey",
            "middlename": "",
            "lastname": "Dangol Maharjan",
            "email": "robesckeydangol2006@gmail.com"
        },
        "comments": [],
        "ratings": []
    }
}
```

### /product_list

methods:

- get

#### link

```
/product_list
```

#### response

```
{
    "message": "Sucess",
    "products": [
        {
            "id": 100,
            "name": "Acer Nitro 6",
            "userId": 1,
            "price": 115000,
            "brand": "Acer",
            "details": "Test detail",
            "image": "https://th.bing.com/th?id=OVP._9gCXdKaU8N_36vouNdVtQHgFo&w=243&h=136&c=7&rs=1&qlt=90&o=5&pid=2.1",
            "user": {
                "id": 1,
                "firstname": "Robesckey",
                "middlename": "",
                "lastname": "Dangol Maharjan",
                "email": "robesckeydangol2006@gmail.com"
            },
            "comments": [],
            "ratings": []
        }
    ]
}
```
