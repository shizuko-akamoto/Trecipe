# Trecipe

CPSC 436I Project: Team2 

## Project description

Trecipe helps travellers to discover wonderful destinations and put together their dream bucket list trip. Users will be able to create and store their travel bucket list on Trecipe. A destination can be searched based on the categories, country, and even review. Once a destination is added to a bucket list, users can track their progress and view all the destination on a map. A bucket list can also be made public for other users to discover it. To enable these activies, we will make use of data such as a bucket list (name, timestamp of creation, last modified timestamp, owner's id, privacy setting, destination ids, collaborator ids, and which destinations are checked off), destination info (destination id to retreive info from external API), and user information (name, password, id, email).

Our stretch goals include adding collaborators to any bucket list, viewing popular bucket list, and allowing users to write a full review of a destination.  

## Project task requirements

|          | Tasks                                                                                                                   | Completed?              |
|----------|------------------------------------------------------------------------------------------------------------------------|-------------------------|
| **Minimum**  | User should be able to create, delete, edit buckets of travel destinations of interest                                 | :heavy_check_mark:      |
|          | User should be able to add, remove, reorder, destinations within a bucket                                              | :heavy_check_mark:      |
|          | Allow user to check-off destinations in a bucket when they are completed                                               | :heavy_check_mark:      |
|          | Display destinations in a bucket on a map with markers marking each destination                                        | :heavy_check_mark:      |
|          | Hover over each destination pin on map to see destination digest, and click to see a page with full detail             | :heavy_check_mark:      |
| **Standard** | Support for user/account system                                                                                        | :heavy_check_mark:      |
|          | Support filtering by different categories (eg. food, accomodation, attraction, etc) when viewing destinations on map| :large_orange_diamond: |
|          | Allow user to perform search on bucket/destinations using name or keyword                                              | :heavy_check_mark:      |
|          | Implement various other bucket operations (copy Trecipe within/across accounts)                                        | :heavy_check_mark:      |
|          | Checking off destination in a bucket changes the bucket progress and progress is reflected on the UI                   | :heavy_check_mark:      |
| **Stretch**  | Add collaborator to bucket list (access control)                                                                       | :x:                     |
|          | Display popular bucket list on homepage (highest star/favorite, etc)                                                   | :x:                     |
|          | Allow full review of destination (blog-style) upon check-off                                                           | :x:                     |
|          | Allow user to rate a destination upon checking off                                                                     | :heavy_check_mark:      |



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
