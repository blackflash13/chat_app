### How to start server?

- **cd server**
- **npm install**
- **npm run dev**

# Server documentation

### Registration endpoint

**type**: POST

**url**: [localhost:3001/users](localhost:3001/users)

**fields**:

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1. email - String

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 2. name - String

#

### Login endpoint

**type**: POST

**url**: [localhost:3001/users/login](localhost:3001/users/login)

**fields**:

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1. email - String

**login only by email + OTP code**

#

### Verify OTP-code endpoint

**type**: POST

**url**: [localhost:3001/users/verify](localhost:3001/users/verify)

**fields**:

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1. email - String

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1. code - String

#

### Follow new user endpoint

#### With Bearer(authorization) token

**type**: GET

**url**: [localhost:3001/users/follow/:id](localhost:3001/users/follow/632c73d35ed09aeb9c3586d2)

**params**:

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1. :id - ObjectId

#

### Unfollow new user endpoint 

#### With Bearer(authorization) token

**type**: GET

**url**: [localhost:3001/users/unfollow/:id](localhost:3001/users/follow/632c73d35ed09aeb9c3586d2)

**params**:

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1. :id - ObjectId

#

#

### Get chat rooms

**type**: GET

**url**: [localhost:3001/rooms](localhost:3001/rooms)

**fields**:

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1. _id - ObjectId

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1. name - String

#

### Create new chat room

**type**: POST

**url**: [localhost:3001/rooms](localhost:3001/rooms)

**fields**:

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1. name - String

#

### Update chat room

**type**: PUT

**url**: [localhost:3001/rooms/:id](localhost:3001/rooms/632d7c006f59b1f7c30f73e9)

**params**:

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1. :id - String

**field**:

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1. :name - String

#

### Delete chat room

**type**: DELETE

**url**: [localhost:3001/rooms/:name](localhost:3001/rooms/:test)

**params**:

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1. :name - String

