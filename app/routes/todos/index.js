App.TodosRoute = Ember.Route.extend({
    setupController: function(controller, model) {
      this.store.add("todo", {name: "Test"});
    }
});

