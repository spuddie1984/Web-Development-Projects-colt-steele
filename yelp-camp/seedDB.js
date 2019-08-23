const mongoose = require('mongoose'),
      Campgrounds = require('./models/campgrounds'),
      Comments = require('./models/comments');


const seeds = [{ 
    name : "Pine Hill", 
    "image" : "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80", 
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper quis lectus nulla at. Egestas purus viverra accumsan in nisl nisi scelerisque. Scelerisque purus semper eget duis. Ut venenatis tellus in metus vulputate. Tincidunt dui ut ornare lectus. Maecenas accumsan lacus vel facilisis volutpat est velit. Suspendisse ultrices gravida dictum fusce. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Proin libero nunc consequat interdum. Elementum nisi quis eleifend quam adipiscing. Neque sodales ut etiam sit amet nisl purus in mollis. Orci ac auctor augue mauris. Bibendum arcu vitae elementum curabitur vitae nunc sed velit. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Morbi tristique senectus et netus et malesuada fames. Ac auctor augue mauris augue neque gravida."
},{ 
    "name" : "Ocean View ", 
    "image" : "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", 
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper quis lectus nulla at. Egestas purus viverra accumsan in nisl nisi scelerisque. Scelerisque purus semper eget duis. Ut venenatis tellus in metus vulputate. Tincidunt dui ut ornare lectus. Maecenas accumsan lacus vel facilisis volutpat est velit. Suspendisse ultrices gravida dictum fusce. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Proin libero nunc consequat interdum. Elementum nisi quis eleifend quam adipiscing. Neque sodales ut etiam sit amet nisl purus in mollis. Orci ac auctor augue mauris. Bibendum arcu vitae elementum curabitur vitae nunc sed velit. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Morbi tristique senectus et netus et malesuada fames. Ac auctor augue mauris augue neque gravida."
},{ 
    "name" : "Boulder Hill", 
    "image" : "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", 
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper quis lectus nulla at. Egestas purus viverra accumsan in nisl nisi scelerisque. Scelerisque purus semper eget duis. Ut venenatis tellus in metus vulputate. Tincidunt dui ut ornare lectus. Maecenas accumsan lacus vel facilisis volutpat est velit. Suspendisse ultrices gravida dictum fusce. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Proin libero nunc consequat interdum. Elementum nisi quis eleifend quam adipiscing. Neque sodales ut etiam sit amet nisl purus in mollis. Orci ac auctor augue mauris. Bibendum arcu vitae elementum curabitur vitae nunc sed velit. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Morbi tristique senectus et netus et malesuada fames. Ac auctor augue mauris augue neque gravida."
},{ 
    "name" : "Pine Forest", "image" : "https://images.unsplash.com/photo-1519395612667-3b754d7b9086?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper quis lectus nulla at. Egestas purus viverra accumsan in nisl nisi scelerisque. Scelerisque purus semper eget duis. Ut venenatis tellus in metus vulputate. Tincidunt dui ut ornare lectus. Maecenas accumsan lacus vel facilisis volutpat est velit. Suspendisse ultrices gravida dictum fusce. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Proin libero nunc consequat interdum. Elementum nisi quis eleifend quam adipiscing. Neque sodales ut etiam sit amet nisl purus in mollis. Orci ac auctor augue mauris. Bibendum arcu vitae elementum curabitur vitae nunc sed velit. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Morbi tristique senectus et netus et malesuada fames. Ac auctor augue mauris augue neque gravida."
}];

const seedDB = () => {
    Campgrounds.deleteMany({}, (err, DeletedCollections) => {
        if(err) {
            console.log(err);
        } else {
            console.log("You sucessfully deleted all the Campgrounds");
            console.log(DeletedCollections)
        }
    });
    // seed the DB
    for(seed of seeds){
        Campgrounds.create({
            name: seed.name,
            image: seed.image,
            description: seed.description,
        }, (err,createCampground) => {
            if(err) {
                console.log(err);
            } else {
                console.log(`You've successfully created ${createCampground.name} Campground`);
                Comments.create({
                    author: "nathan",
                    text: "I love camping!!!"
                }, (err, newComment) => {
                    if(err) {
                        console.log(err);
                    } else {
                        createCampground.comment.push(newComment);
                        createCampground.save();
                        console.log("Added New Comment");
                    }
                });
            }
        });
    } 
}

module.exports = seedDB;