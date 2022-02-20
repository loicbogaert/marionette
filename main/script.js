const UserTracker = new Mn.Application();

const User = Backbone.Model.extend({});
const Users = Backbone.Collection.extend({
  model: User
});

////////////////////////
const Books = Backbone.Model.extend({
  url: 'http://localhost:8080/api/books'
})
////////////////////////
///////Books view////////
const CollectionBook = Backbone.Collection.extend({
  model: Books,
  parse : function(response, options){  
    console.log(document.write(JSON.stringify(response))) 
  }
});
var books = new Books();
books.fetch();
var myCollection = new CollectionBook(books, { parse:true })

console.log(myCollection)

const BookView = Mn.ItemView.extend({
  template: Handlebars.compile($("#booksView").html()),
  ui: {
    name: "#name",
    age: "#age"
  },
})

const NoBooksView = Mn.ItemView.extend({
  template: "#NoBooksView"
})

const BooksView = Mn.CollectionView.extend({
  childView: BookView,
  emptyView: NoBooksView
})


////////Users view/////////
const UserView = Mn.ItemView.extend({
  template: Handlebars.compile($("#userView").html())
});

const NoUsersView = Mn.ItemView.extend({
  template: "#noUsersView"
});

const UsersView = Mn.CollectionView.extend({
  childView: UserView,
  emptyView: NoUsersView
});
////////////////////////////

/////form view/////
const FormView = Mn.ItemView.extend({
  template: "#formView",
  events: {
    "click button": "createNewUser"
  },
  ui: {
    name: "#name",
    age: "#age"
  },
  createNewUser: function() {
    this.collection.add({
      name: this.ui.name.val(),
      age: this.ui.age.val()
    });
    this.ui.name.val("");
    this.ui.age.val("");
  }
});
/////////////////////////


UserTracker.addRegions({
  form: '#form',
  list: '#list',
  books: '#books'
})

UserTracker.addInitializer(function() {
  UserTracker.users = new Users();
  UserTracker.books = new Books();
  UserTracker.form.show(new FormView({collection: UserTracker.users}));
  UserTracker.list.show(new UsersView({collection: UserTracker.users}));
  UserTracker.books.show(new BooksView({collection : UserTracker.books}));
});

UserTracker.start();