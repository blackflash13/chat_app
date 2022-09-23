# Server documentation

### Registration endpoint

**type**: POST

**url**: [localhost:3001/users](localhost:3001/users)

**fields**:

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1. email - String

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 2. password - String

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 3. name - String
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

**fields**:

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1. :id - ObjectId
#
### Unfollow new user endpoint
#### With Bearer(authorization) token
**type**: GET
**url**: [localhost:3001/users/unfollow/:id](localhost:3001/users/follow/632c73d35ed09aeb9c3586d2)

**fields**:

&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; 1. :id - ObjectId

