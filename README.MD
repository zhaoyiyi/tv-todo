#TV todo list
HTTP 5303 project.

##Project Scope
###Description
An app helps people to keep track of tv shows they are following. Because most tv shows have new episode every week, this app creates a weekly todo list of tv shows.

First, after user adds a show to the list, it reads information about the show, and gets the date for next episode. After that date, user can mark that show as watched, and app will fetch the time for next episode.

This app also tells users which episode they watched based on todo list, and what is the newest episode.

Ideally, when a user opens this app, he or she will be able to know which tv shows have updated and which shows have not been watched this week. User will also mark the shows he or she has watched so the app can keep watch history up to date.
###Languages

JavaScript, Typescript
###Libraries
####Front-end:
- [Angular 2](https://angular.io): core framework for build this project.
- [Moment.js](http://momentjs.com/): display and manipulate date and time.
- [Angular Material](https://github.com/angular/material2): quick and easy material design.
- [ngrx](https://github.com/ngrx/store)(hopefully): it combines two things which I would really like to learn and practice, [Redux](https://github.com/reactjs/redux) and [RxJS](https://github.com/ReactiveX/rxjs).
####Back-end:
- [Express](http://expressjs.com/): server side framework
- [request](https://github.com/request/request): make http calls to api
- [mongoose](http://mongoosejs.com/): database connection
####Database:
MongoDB
####API:
[The TVDB REST API](https://api.thetvdb.com/swagger)
###Taks List:
- [ ] Setup server, database, front end
- [ ] Wrap TVDB API
- [ ] Create API to be consumed by front-end
    - [ ] TVDB
    - [ ] App related(user login, save todo list ...)
- [ ] Front end functions
- [ ] Add beautiful interface