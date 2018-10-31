// new versions will be backwards compatible 

////////// Request Body //////////
Accept:       application/vnd.api+json // omit if: no `response.body` OR `response.body` is `application/json` instead of `application/vnd.api+json`
Content-Type: application/vnd.api+json // omit if: no `request.body`
body = {/* see below: Response Body (Success) */}

////////// Response Body (Success) //////////
Content-Type: application/vnd.api+json // omit if no `response.body`
body = {
  "data": { // either a resource {} or collection [] (both called "resource" in the specification?)
    "type": "users", // plural noun (spec: should be consistently singular or plural, plural is more common)
    "id": "34",
    "attributes": {
      "firstName": "Alexia",
      "lastName": "Tamer",
      // foreign keys are relationships, not attributes (even 1-to-1 FK)
      // ...
    },
    "relationships": {
      "messages": { // 1-to-many relationships named as plural noun
        "data": [   // 1-to-many relationships "data" is an array []
          {"type":"message","id":"78"}, // identifier objects only have "type" & "id" 
          {"type":"message","id":"43"}, // (minimum required to uniquely identify an object)
          // ...
        ],
        "links": {
          "self": "/users/34/relationships/messages",
          "related": "/users/34/messages"
        }
      },
      "location": { // 1-to-1 relationships named as singular noun
        "data": {   // 1-to-1 relationships "data" is an object {}, specifically, an identifier object (type & id only)
          "type":"address",
          "id":"87"
        },
        "links": {
          "self": "/users/34/relationships/location",
          "related": "/users/34/location"
        }
      }
    }
  }, // end "data"
  "links": { // an object {} related to "data"
  },
  "included": [ // an array [] of resource objects related to "data"
    // GET /users/34?include=messages,location
    {"type":"messages","id":"78","attributes":{/* ... */},"relationships":{/* ... */},/* full message object */}, 
    {"type":"messages","id":"43","attributes":{/* ... */},"relationships":{/* ... */},/* full message object */}, 
    // more messages... 
    {"type":"location","id":"34","attributes":{/* ... */},"relationships":{/* ... */},/* full location object */}, 
  ],
  //"meta":{}
  "jsonapi": {"version": "1.0"} // an object {} describing the server’s implementation

}
body.data // (required) "primary data" 
              /* Resource */|/* Collection of same `data.type` */
body.data --> {Resouce}     |[ {Resouce},    {Resouce},    ... ]
          --> {Identifier}  |[ {Identifier}, {Identifier}, ... ]
          --> null          |[ /* empty */ ] 
body.included = [ {Resouce}, {Resouce}, ... ] // (optional) an [Array] of {Resouce} objects (can be of different `data.type`)
body.links --> {Links} // (optional)
body.meta --> {Object} // (optional) contains whatever you want
body.jsonapi = {version: "1.0"} // (optional) an {Object} describing the server’s implementation

////////// Resource {Identifier} object //////////
{Identifier} // a {Resouce} object with only the minimum required to uniquely identify it
{Identifier}.type // (required) use a plural noun (spec: should be consistently singular or plural, plural is more common)
{Identifier}.id   // (required) {String}?
{Identifier}.meta // (optional) contains whatever you want

////////// {Resouce} object //////////
{Resource}
{Resource}.type // (required) use a plural noun (spec: should be consistently singular or plural, plural is more common)
{Resource}.id   // (required) {String}?
{Resource}.attributes.'attributeName' --> (anything) // 'attributeName' != 'links'|'relationships' // RESERVED words
                                                     // 'attributeName' != foreign key // foreign keys are {Relationships}, NOT {Attributes}
{Resource}.relationships.'relationshipName' --> {Relationship} // 'relationshipName' may be different than `{Resource}.type`
{Resource}.links --> {Links} // (optional)
{Resource}.meta --> {Object} // (optional) contains whatever you want
{Resource}s "fields" are all its {Attributes} & {Relationships}

////////// {Relationship} object //////////
// all {Relationship} in {Resource}.relationships MUST have a relationship with `body.data` {Resource}
{Relationship}.data|.links|.meta // at least one
{Relationship}.data  --> [ {Identifier}, {Identifier}, ... ]
                     --> []
                     --> {Identifier}
                     --> null
{Relationship}.links --> {Links}  // MAY paginate. If so, MUST paginate {Relationship}.data
{Relationship}.meta  --> {Object} // contains whatever you want

////////// {Links} string/object //////////
{Links}.self|.related = 'url.com'|{ href: 'url.com',    // `href` contains link
                                    meta: {key:'value'} // `meta` contains whatever you want
                                  }

body.links --> {Links} // "top-level" {Links}
// GET `/objects/{id}`|`/parent/{id}/child` {Resource}
body.links = { self: '/objects/{id}'|'/parent/{id}/child' }
// GET `/objects`|`/parent/{id}/children` [Collection]
body.links = { 
  self: '/objects'|'/parent/{id}/children',
  // MAY paginate? If so, MUST paginate body.data --> [Collection]?
}
// GET `/parent/{id}/relationship/child` {Relationships}
body.links = { 
  self: '/parent/{id}/relationship/child',
  related: '/parent/{id}/child'
  // MAY paginate? If so, MUST paginate body.data --> [ {Identifier}, {Identifier}, ... ]?
}

{Resource}.links = {
  self: '/object/{id}'|'/parent/{id}/child'
}
{Relationship}.links = { 
  self: '/parent/{id}/relationship/child', // relationship
  related: '/parent/{id}/child' // resource
  // MAY paginate. If so, MUST paginate {Relationship}.data
}



////////// Response Body (Error) //////////
body = {
  "errors": [ // an array [] of error objects
    { // an error object {}
      "id": "1", // a unique identifier for this occurrence of the problem
      "status": "400",   // HTTP status code (as a string)
      "code": "666",     // an application-specific error code (as a string)
      "title": "invalid input", // a short, human-readable summary of the problem
      "detail": "...", // a long, human-readable  summary of the problem 
      "links": { 
        "about": "http://app.com/error/1" // more details about this problem
      },
      "source": {  // an object with the source of the error
        "pointer": "/data", // for a primary data object
        "pointer": "/data/attributes/title", // for a specific attribute
        "parameter": "param" // which URI query parameter caused the error
      },
      "meta": {
        // a meta object containing non-standard meta-information about the error
      }
    },
    // ... // more error objects
  ], // end of array of error objects
  "meta":{},
  "jsonapi": {"version": "1.0"}// an object describing the server’s implementation
}
// "title" SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
// "detail" explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
// "pointer" a JSON Pointer [RFC6901] to the associated entity in the request document.
body.errors --> [ {Error}, {Error}, ... ] // an [Array] of {Error} objects
body.meta 
body.links
body.jsonapi = {version: "1.0"} // an {Object} describing the server’s implementation

{Error}.id
{Error}.status
{Error}.code
{Error}.title
{Error}.detail
{Error}.links
{Error}.links.about
{Error}.source
{Error}.source.pointer
{Error}.source.parameter

////////// GET Request //////////
GET /* HTTP/1.1 */                     --> 200: OK
                                           404: Not Found // invalid path (usually invalid {id})
Accept: application/vnd.api+json       <-- Content-Type: application/vnd.api+json
GET '/objects'                             --> body.data = [{Resource},...]   || []
GET '/objects/{id}'                        --> body.data = {Resource}         || 404: Not Found // if bad `id`
GET '/parents/{id}/child'                  --> body.data = {Resource}         || null // 404: Not Found if bad `id`
GET '/parents/{id}/children'               --> body.data = [{Resource},...]   || []   // 404: Not Found if bad `id`
GET '/parents/{id}/relationships/child'    --> body.data = {Identifier}       || null // 404: Not Found if bad `id`
GET '/parents/{id}/relationships/children' --> body.data = [{Identifier},...] || []   // 404: Not Found if bad `id`

////////// POST Request //////////
POST '/objects' --> 201: Created --> response body.data = {Resource} // GET-like response <--(server updates more than attributes provided, eg - server-side `id`)
                    204: No Content // NO `body` (empty response) <--(server only updates attributes provided, eg - client-side `id`)
                    202: Accepted   // request is accepted, but not processed in time to respond
                    403: Forbidden  // unsupported request to create a resource
                    404: Not Found  // invalid path or invalid {Identifier} in `body`
                    409: Conflict   // client-generated `body.data.id` already exists
                    409: Conflict   // wrong request `body.data.type`
// Request Header                          // Response Header
Accept: application/vnd.api+json       <-- Content-Type: application/vnd.api+json
Content-Type: application/vnd.api+json     Location: '/objects/{id}' // same as: body.links.self (if it exists)
// Request Body
body.data.type // (required)
// NO `body.data.id` (unless client-generated)

////////// PATCH Attributes & Relationships ////////// 
// PATCH for partial update  
// all updates are partial updates because `id` never changes (after initial POST)
// relationships don't expose foreign keys
// server can delete an unused resource after removing a relationship (as garbage collection)
PATCH '/objects/{id}' --> 200: OK --> response body.data = {Resource} // GET-like response <--(server updates more than provided attributes, eg - `updatedAt` attribute)
                          204: No Content // NO `body` (empty response) <--(server only updates attributes provided)
                          202: Accepted   // request is accepted, but not processed in time to respond
                          403: Forbidden  // unsupported request to create a resource <--(server disabled updating many-to-many relationships this way)
                          404: Not Found  // invalid path {id} or invalid {Identifier} in `body`
                          409: Conflict   // request violates server-enforced constraint
                          409: Conflict   // wrong request `body.data.type`
// Request Header                          // Response Header
Accept: application/vnd.api+json       <-- Content-Type: application/vnd.api+json
Content-Type: application/vnd.api+json
// Request Body
body.data.attributes.'attributeName' = (anything) // updates attribute
body.data.relationships.'relationshipName'.data = {Identifier}|[{Identifier},{Identifier},...] // updates relationship
// relationship updates are complete replacements, so include past relationships you want to preserve
// omitted attributes/relationships remain the same (they're NOT deleted nor set to NULL)

////////// PATCH 1-to-1 Relationship ////////// 
PATCH '/parents/{id}/relationships/child' --> //200: OK --> response body.data = {Identifier} // GET-like response <--(NOT necessary, complete replacement)
                                                204: No Content // NO `body` (empty response)
                                                202: Accepted   // request is accepted, but not processed in time to respond
body.data = {Identifier} // update relationship
body.data = null         // remove relationship
// Request Header                          // Response Header
Accept: application/vnd.api+json       <-- Content-Type: application/vnd.api+json
Content-Type: application/vnd.api+json

////////// PATCH 1-to-many Relationship ////////// 
// replace all relationships (403: Forbidden, if complete replacements not allowed)
PATCH  '/parents/{id}/relationships/children'    --> //200: OK --> response body.data = {Identifier} // GET-like response <--(NOT necessary, complete replacement)
+ body.data = [ {Identifier} , {Identifier} , ... ]    204: No Content // NO `body` (empty response)
                                                       202: Accepted   // request is accepted, but not processed in time to respond
// remove all relationships (2##: Success, if relationship is already empty)
PATCH  '/parents/{id}/relationships/children'    --> //200: OK --> response body.data = {Identifier} // GET-like response <--(NOT necessary, complete replacement)
+ body.data = [/* empty */]                            204: No Content // NO `body` (empty response)
                                                       202: Accepted   // request is accepted, but not processed in time to respond
// add 1-or-more relationships (ignore duplicates)
POST   '/parents/{id}/relationships/children'    -->   200: OK --> response body.data = {Identifier} // GET-like response 
+ body.data = [ {Identifier} , {Identifier} , ... ]    204: No Content // NO `body` (empty response)
                                                       202: Accepted   // request is accepted, but not processed in time to respond
// remove 1-or-more relationships (2##: Success, if relationship(s) don't exist)
DELETE '/parents/{id}/relationships/children'    -->   200: OK --> response body.data = {Identifier} // GET-like response 
+ body.data = [ {Identifier} , {Identifier} , ... ]    204: No Content // NO `body` (empty response)
                                                       202: Accepted   // request is accepted, but not processed in time to respond
// Request Header                          // Response Header
Accept: application/vnd.api+json       <-- Content-Type: application/vnd.api+json
Content-Type: application/vnd.api+json

////////// DELETE Request ////////// 
DELETE '/objects/{id}' --> 204: No Content // NO `body` (empty response)
                           200: OK         // contains `body.meta`
                           202: Accepted   // request is accepted, but not processed in time to respond
                           404: Not Found  // invalid path {id}

////////// GET + `?include` //////////
GET /* HTTP/1.1 */                --> 200: OK
                                      404: Not Found // invalid path (usually invalid {id})
Accept: application/vnd.api+json  <-- Content-Type: application/vnd.api+json
GET '/users/{id}'                     --> body.data = {Resource} || 404: Not Found // if bad `id`
GET '/users/{id}?include=...'                    --> body.included = [ {Resouce},    {Resouce},    ... ]
GET '/users/{id}/relationships/tags?include=...' --> body.included = [ {Resouce},    {Resouce},    ... ]
                                   /* even though */ body.data = [ {Identifier}, {Identifier}, ... ] | {Identifier}
GET '/users/{id}?include=relationshipName'  // 'relationshipName' may be different than `{Resource}.type`
GET '/users/{id}?include=tags'              // all user's tags {Resource} objects
GET '/users/{id}?include=tags,posts'        // all user's tags & posts {Resource} objects
GET '/users/{id}?include=tags,posts.author' // all user's tags & posts, & all user's posts' authors {Resource} objects
// MAY `include` by default (without `?include` uri parameter)
// if request has `?include`, MAY NOT include unrequested {Resource}
// if request has `?include`, but `?include` is not supported, MUST respond with `400: Bad Request`


///// GET Resource (multiple times with ETag) /////
	// Request 1
	GET /objects/"id" HTTP/1.1
	Accept: application/vnd.api+json
	// Response 1
	HTTP/1.1 200 OK
	Content-Type: application/vnd.api+json
	ETag: "q83o2746c82qb6c8q6c..." // for Response 2 below
	{ "data": { "type":"objects", "id":"65", "attributes":{/* ... */}, "relationships":{/* ... */} } }
	// Request 2
	GET /objects/"id" HTTP/1.1
	Accept: application/vnd.api+json 	// if same object (matching ETag/token): HTTP 304 Not Modified
	If-None-Match: "q83o2746c82qb6c8q6c..." // else: respond with updated object
	// Response 2 (if object has NOT changed since Response 1 = if Response 1's "ETag" would match Response 2's "ETag")
	HTTP/1.1 304 Not Modified
	// Response 2 (if object has changed since Response 1 = if Response 1's "ETag" does NOT match Response 2's "ETag")
	HTTP/1.1 200 OK
	Content-Type: application/vnd.api+json
	ETag: "pmasicna02dqh0apaoi..." // different from Response 1's "ETag"
	{ "data": { "type":"objects", "id":"65", "attributes":{/* ... */}, "relationships":{/* ... */} } }








