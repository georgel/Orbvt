Posts = new Meteor.Collection("Orbvt");
default_message = "After hearing about Meteor.js, I couldn't wait to try it. So far it's amazing. We will see what I end up building with it :)";

Properties = new Meteor.Collection("OrbvtProperties");

months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

if (Meteor.is_client) {
  Template.stamp.stamp = function() { 
    var d = new Date();
    month = months[d.getMonth()];
    day   = d.getDate();
    year  = d.getFullYear();
    return month + "&nbsp;&nbsp;&nbsp;" + day + ",&nbsp;&nbsp;&nbsp;" + year ;
  };
  Template.stamp.events = {
    'click #new_post': function(event) { 
      post = {title: 'New post', author: 'georgel', content: new Date() + ' is when you created this new post.', date: 'April 11', timestamp: new Date()};
      Posts.insert(post);
    }
  }

  Template.orbvt.posts = function() { 
    // collection.find({}, {'skip':1, 'limit':1, 'sort':'a'},
    return Posts.find({}, {sort: {timestamp: -1}});
  };

  Template.properties.properties = function() {
    return Properties.find();
  };

  Template.orbvt.events = {
    'click h1': function(event) { 
      event.preventDefault();
    },
    'click .destroy': function (event) {
      Posts.remove(event.currentTarget.id);
      if(Posts.find().count() == 0) { 
        var post = {title: 'Test post', author: 'georgel', content: default_message, date: 'April 11', timestamp: new Date()};
        Posts.insert(post);
      }
    }
  }
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    if(Posts.find().count() === 0) { 
      var post = {title: 'Meteor.js', author: 'georgel', content: default_message, date: 'April 19', timestamp: new Date()};
      Posts.insert(post);
     }

    if(Properties.find().count() == 0) {
      Properties.insert({name: "@georgel",  		type: "link", href : "http://twitter.com/georgel/"});
      Properties.insert({name: "github.com/georgel",   	type: "link", href : "http://github.com/georgel/"});
    }
  });

  // Meteor.default_server.method_handlers['/Posts/insert'] = function () {};
  // Meteor.default_server.method_handlers['/Posts/remove'] = function () {};
  // Meteor.default_server.method_handlers['/Posts/update'] = function () {};
}
