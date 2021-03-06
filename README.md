# Trecipe
CPSC 436I Project: Team2 

**Trecipe lets you explore destinations all around the world, and mix and match different ingredients to build your next dream vacation. See what other travel experts have come up with and even integrate their trecipes into your own.**


## Project description

Trecipe helps travellers to discover wonderful destinations and put together their dream bucket list trip. Users will be able to create and store their travel bucket list on Trecipe. A destination can be searched based on the categories, country, and even review. Once a destination is added to a bucket list, users can track their progress and view all the destination on a map. A bucket list can also be made public for other users to discover it. To enable these activities, we will make use of data such as a bucket list (name, timestamp of creation, last modified timestamp, owner's id, privacy setting, destination ids, collaborator ids, and which destinations are checked off), destination info (destination id to retrieve info from external API), and user information (name, password, id, email).

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

**Legend:**
Completed: :heavy_check_mark: 
Amended: :large_orange_diamond:
Not Complete: :x:


## Unit 1-5 Learning Goals:
### Unit 1: HTML, CSS, JS
By setting up global variables with Mixins, a SCSS functionality for theme colors and font sizes, better codability was made possible. Since we had customised CSS designs for the entire project, this tool was important for us to maintain consistency in the look of our website.
We also decided to use TypeScript over JavaScript when developing our project to ensure type safety.

### Unit 2: React & Redux
Created more than 30 reusable react components with TypeScript such as the TrecipeCards, DestinationCards, and Buttons. Restricting types on the component props with the help of TS also increased robustness in our webapp. We also used redux to allow data change without reloading the entire page every time.

### Unit 3: Mongo DB
We set up MongoDB for a NoSQL Database to host all data related to Trecipe, destination, user information, and ratings etc, as NoSQL creates more flexibility in terms of having dynamic schemas for unstructured data. Mongoose provides a `virtual` attribute to give developers flexibilities, so that a given model’s values can be set either manually or automatically with defined functionality. <Example> When implementing destinations in Trecipes, many-to-many relationship is easily achieved by the use of Mongoose Virtual.

### Unit 4: Node & Express
Used Express with TypeScript to implement endpoints queried by our react frontend. We also attached OpenAPIValidation middleware to our endpoints for validating incoming requests and outgoing responses. This extension enabled better visibility of errors that occurred during querying.

### Unit 5: Release Engineering
Deployed and hosted Trecipe website on Heroku which is beginner/start-up friendly. We also used Heroku's GitHub integration to automate the deployment process, which leads to increased maintainability and fewer build breaks.

## Above and Beyond Functionalities
### Custom CSS
We chose not to use ready-made components/designs for our site, instead, most of our styles are done via custom CSS. This allowed us to have more flexibility in terms of styling, as well as maintaining an overall consistent theme that aligns with the setting of this project, making our site more memorable and outstanding.

### Integration with Google API
We have very good integration with Google API, we use Google to look up destinations, pull reviews as well as images for destinations. This integration enabled our users to perform powerful search, see the destinations being displayed on Google Map, and allowed us to display information-rich pages that will be useful for users.

## Next steps
Some of the functionality that we wanted to implement include adding collaborators to a bucket list, displaying popular bucket lists, and allowing full review of a destination upon checkoff. The UI could also be more responsive, all content on the webpage should adjust smoothly based on the screen size.
We also have a system of tracking any improvments each of us realizes, as github issues. With this system, we have better visibility of future development and can make continuous improvements on our project. Some sample issues are: [#74](https://github.com/shizuko-akamoto/Trecipe/issues/74), [#95](https://github.com/shizuko-akamoto/Trecipe/issues/95)

## List of Contributions

### Shizuko Akamoto (z8c1b): 
Mainly worked on integrating the many sub-components into pages, making sure the components were logically connected, both to each other and to the backend. Plus, did a lot of code architecture management and CI/CD setup, including express/react integration, husky+lint configuration and Heroku deployment.

### Yun Lin (k7y0b): 
Implemented component and backend for user rating and searching, and was responsible for filtering logic. Also produced some documentations for spikes. 

### Tianyan Zhu (c8y0b): 
Implemented front-end components, including Trecipe Cards, Search Result Page, etc. Drafted part of UI design such as Search Result Page and Login/Sign on component.

### Chee Yew Lim (o1u1b): 
Developed session less authentication (private route, protected endpoints, user-related endpoints), integrated google API to display static/dynamic maps and linked them to destinations, implemented some front end components, including the login page, menu, destination info window, etc. Reorganized the project structure and setup Prettier with pre-commit hook.

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
