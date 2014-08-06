Orbit.ajax = Ember.$.ajax;
Orbit.Promise = Ember.RSVP.Promise;

LocalStorageSource = EO.Source.extend({
  orbitSourceClass: OC.LocalStorageSource,
  orbitSourceOptions: {
    namespace: "App"
  }
});

Schema = EO.Schema.extend({
  idField: 'id'
});

JSONAPIStore = EO.Store.extend({
  orbitSourceClass: OC.JSONAPISource,
  orbitSourceOptions: {
    host: "localhost",
    namespace: ""
  }
});

App.initializer({
  name: 'injectStore',
  initialize: function(container, application) {
    Orbit.Promise = Ember.RSVP.Promise;
    application.register('schema:main', Schema);
    application.register('store:main', EO.Store);
    application.register('store:jsonApi', JSONAPIStore);
    connectSources(container);
    application.inject('controller', 'store', 'store:main');
    application.inject('route', 'store', 'store:main');
  }
});

function connectSources(container) {
  var memorySource = container.lookup('store:main').orbitSource;
  var jsonApiSource = container.lookup('store:jsonApi').orbitSource;
  // Connect memorySource -> jsonApiSource (using default blocking strategy)
  setupConnectors(memorySource, jsonApiSource);

  logTransforms(memorySource, 'store:main');
  logTransforms(jsonApiSource, 'store:jsonApi');
}

function setupConnectors(primary, secondary) {

  new Orbit.TransformConnector(primary, secondary);
  new Orbit.TransformConnector(secondary, primary);
  //primary.on('assistFind', secondary.find);
}

function logTransforms(source, name) {
  source.on('didTransform', function(operation) {
    console.log('[ORBIT.JS] [' + name + ']', operation);
  });
}
