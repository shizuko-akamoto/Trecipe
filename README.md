# Trecipe

CPSC 436I Project: Team2 

## Project description

Trecipe helps travellers to discover wonderful destinations and put together their dream bucket list trip. Users will be able to create and store their travel bucket list on Trecipe. A destination can be searched based on the categories, country, and even review. Once a destination is added to a bucket list, users can track their progress and view all the destination on a map. A bucket list can also be made public for other users to discover it. To enable these activies, we will make use of data such as a bucket list (name, timestamp of creation, last modified timestamp, owner's id, privacy setting, destination ids, collaborator ids, and which destinations are checked off), destination info (destination id to retreive info from external API), and user information (name, password, id, email).

Our stretch goals include adding collaborators to any bucket list, viewing popular bucket list, and allowing users to write a full review of a destination.  

## Project task requirements

### Minimal requirements (will definitely complete)
* User should be able to create, delete, edit buckets of travel destinations of interest
* User should be able to add, remove, move, destinations within a bucket
* Allow user to check-off destinations in a bucket when they are completed
* Display destinations in a bucket on a map with markers marking each destination
* Hover over each destination pin on map to see destination digest, and click to see a page with full detail
### Standard requirements (will most likely complete)
* Support for user/account system
* Support filtering by different categories (eg. food, accomodation, attraction, etc) when viewing destinations on map
* Allow user to perform search on bucket/destinations using name or keyword
* Implement various other bucket operations (duplicate, favorite)
* Checking off destination in a bucket changes the bucket progress and progress is reflected on the UI
* Allow user to rate a destination upon checking off
* Privacy setting that allows the user to hide/show specific buckets 
### Stretch requirements (plan to complete 1!)
* Add collaborator to bucket list (access control)
*	Display popular bucket list on homepage (highest star/favorite, etc)
* Allow	full review of destination (blog-style) upon check-off

## Tasks breakdown
Tasks have been broken-down into issues in this repository. [See Issues!](https://github.com/shizuko-akamoto/Trecipe/issues)

Here is a list of acronym definition:
Acronym | Definition
------------ | -------------
FE | FrontEnd
BE | BackEnd
TC | Trecipe Card
TP | Trecipe Page
SP | Story Points


## Prototypes

[See prototypes](prototypes.pdf)
