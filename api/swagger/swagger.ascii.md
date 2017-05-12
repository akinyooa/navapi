# Luna Api


<a name="overview"></a>
## Overview

### Version information
*Version* : 0.0.1


### URI scheme
*Host* : ec2-35-176-19-95.eu-west-2.compute.amazonaws.com  
*BasePath* : /api/v1  
*Schemes* : HTTP, HTTPS


### Consumes

* `application/json`


### Produces

* `application/json`




<a name="paths"></a>
## Paths

<a name="userprofiles-post"></a>
### Insert a new user profile
```
POST /userProfiles
```


#### Description
Insert a new user profile


#### Parameters

|Type|Name|Schema|
|---|---|---|
|**Body**|**userProfile**  <br>*required*|[UserProfile](#userprofile)|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|OK|[UserProfile](#userprofile)|
|**405**|Invalid input|No Content|
|**default**|Error|[ErrorResponse](#errorresponse)|


#### Tags

* userprofile


<a name="userprofiles-get"></a>
### Gets all the user profiles
```
GET /userProfiles
```


#### Description
Returns list of user profiles to the caller


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[UserProfile](#userprofile)|
|**default**|Error|[ErrorResponse](#errorresponse)|


#### Tags

* userprofile


<a name="userprofiles-put"></a>
### Update a user specified by the id
```
PUT /userProfiles
```


#### Description
Update a user specified by the id


#### Parameters

|Type|Name|Schema|
|---|---|---|
|**Body**|**userProfile**  <br>*required*|[UserProfile](#userprofile)|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[UserProfile](#userprofile)|
|**default**|Error|[ErrorResponse](#errorresponse)|


#### Tags

* userprofile


<a name="userprofiles-id-get"></a>
### Gets a user profile secified by the id
```
GET /userProfiles/{id}
```


#### Description
Returns the requested user profile


#### Parameters

|Type|Name|Schema|
|---|---|---|
|**Path**|**id**  <br>*required*|string (uuid)|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|[UserProfile](#userprofile)|
|**400**|Invalid id supplied|No Content|
|**404**|User not found|No Content|
|**default**|Error|[ErrorResponse](#errorresponse)|


#### Tags

* userprofile


<a name="userprofiles-id-delete"></a>
### Deletes a user specified by the id
```
DELETE /userProfiles/{id}
```


#### Description
Deletes a user specified by the id


#### Parameters

|Type|Name|Schema|
|---|---|---|
|**Path**|**id**  <br>*required*|string (uuid)|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|OK|No Content|
|**default**|Error|[ErrorResponse](#errorresponse)|


#### Tags

* userprofile




<a name="definitions"></a>
## Definitions

<a name="errorresponse"></a>
### ErrorResponse

|Name|Schema|
|---|---|
|**message**  <br>*required*|string|


<a name="userprofile"></a>
### UserProfile

|Name|Description|Schema|
|---|---|---|
|**created**  <br>*optional*|Timestamp for when the user record was created|string|
|**description**  <br>*optional*|Optional field for user's summary of themselves|string|
|**devices**  <br>*optional*|List of devices used by the user|< string > array|
|**displayName**  <br>*optional*|Friendly display name as chosen by the user|string|
|**email**  <br>*optional*|Email address of the user|string|
|**fbid**  <br>*optional*|user's facebook Id|string|
|**firstName**  <br>*optional*|Users' first name|string|
|**id**  <br>*optional*|Unique identifier for a user|string|
|**lastName**  <br>*optional*|User's last name|string|
|**picture**  <br>*optional*|URL for user's picture|string|





