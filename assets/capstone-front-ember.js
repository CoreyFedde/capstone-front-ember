"use strict";



define('capstone-front-ember/adapters/application', ['exports', 'capstone-front-ember/config/environment', 'active-model-adapter', 'ember'], function (exports, _capstoneFrontEmberConfigEnvironment, _activeModelAdapter, _ember) {
  exports['default'] = _activeModelAdapter['default'].extend({
    host: _capstoneFrontEmberConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),

    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('capstone-front-ember/adapters/loan', ['exports', 'capstone-front-ember/adapters/application'], function (exports, _capstoneFrontEmberAdaptersApplication) {
  exports['default'] = _capstoneFrontEmberAdaptersApplication['default'].extend({
    createRecord: function createRecord(store, type, record) {
      var serialized = this.serialize(record, { includeID: true });
      var api = this.get('host');
      var url = api + '/loans';
      delete serialized.monthly_payment;
      delete serialized.total_amount;
      delete serialized.total_interest;
      delete serialized.monthly_interest;
      delete serialized.monthly_principal;
      delete serialized.monthly_balance;
      var data = { loan: serialized };
      return this.ajax(url, 'POST', { data: data });
      return this.ajax(url, 'PUT', { data: data });
    },
    updateRecord: function updateRecord(store, type, record) {
      var serialized = this.serialize(record, { includeID: true });
      var api = this.get('host');
      var url = api + '/loans/' + record.id;
      delete serialized.monthly_payment;
      delete serialized.total_amount;
      delete serialized.total_interest;
      delete serialized.monthly_interest;
      delete serialized.monthly_principal;
      delete serialized.monthly_balance;
      var data = { loan: serialized };
      return this.ajax(url, 'PUT', { data: data });
    }
  });
});
define('capstone-front-ember/app', ['exports', 'ember', 'capstone-front-ember/resolver', 'ember-load-initializers', 'capstone-front-ember/config/environment'], function (exports, _ember, _capstoneFrontEmberResolver, _emberLoadInitializers, _capstoneFrontEmberConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _capstoneFrontEmberConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _capstoneFrontEmberConfigEnvironment['default'].podModulePrefix,
    Resolver: _capstoneFrontEmberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _capstoneFrontEmberConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('capstone-front-ember/components/change-password-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    passwords: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('passwords'));
      },

      reset: function reset() {
        this.set('passwords', {});
      }
    }
  });
});
define('capstone-front-ember/components/email-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('capstone-front-ember/components/ember-chart', ['exports', 'ember-cli-chart/components/ember-chart'], function (exports, _emberCliChartComponentsEmberChart) {
  exports['default'] = _emberCliChartComponentsEmberChart['default'];
});
define('capstone-front-ember/components/flash-message', ['exports', 'ember-cli-flash/components/flash-message'], function (exports, _emberCliFlashComponentsFlashMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashComponentsFlashMessage['default'];
    }
  });
});
define('capstone-front-ember/components/hamburger-menu', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'button',
    classNames: ['navbar-toggle', 'collapsed'],
    attributeBindings: ['toggle:data-toggle', 'target:data-target', 'expanded:aria-expanded'],
    toggle: 'collapse',
    target: '#navigation',
    expanded: false
  });
});
define('capstone-front-ember/components/home-text', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated')

  });
});
define('capstone-front-ember/components/loan-balance-chart', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('capstone-front-ember/components/loan-donut-chart', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('capstone-front-ember/components/loan-interest-chart', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('capstone-front-ember/components/loan-list/card', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      deleteLoan: function deleteLoan() {
        return this.sendAction('deleteLoan', this.get('loan'));
        // console.log(this)
      }
    }
  });
});
define('capstone-front-ember/components/loan-list/create-loan-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    newLoan: {
      name: null,
      lender: null,
      principal: null,
      interest_rate: null,
      loan_length: null
    },
    actions: {
      createLoan: function createLoan() {
        this.sendAction('createLoan', this.get('newLoan'));
        this.set("newLoan.name", null);
        this.set("newLoan.lender", null);
        this.set("newLoan.principal", null);
        this.set("newLoan.interest_rate", null);
        this.set("newLoan.loan_length", null);
      },
      reset: function reset() {
        this.set("newLoan.name", null);
        this.set("newLoan.lender", null);
        this.set("newLoan.principal", null);
        this.set("newLoan.interest_rate", null);
        this.set("newLoan.loan_length", null);
      }
    }
  });
});
define('capstone-front-ember/components/loan/loan-card', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      deleteLoan: function deleteLoan() {
        return this.sendAction('deleteLoan', this.get('loan'));
        // console.log(this)
      }
    }
  });
});
define('capstone-front-ember/components/loan/loan-parent', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    selectedTool: null,
    actions: {
      createLoan: function createLoan(newLoan) {
        return this.sendAction('createLoan', newLoan);
      },
      deleteLoan: function deleteLoan(loan) {
        // console.log('loan-parent:', loan)
        return this.sendAction('deleteLoan', loan);
        // console.log(this.get('loan'))
      },
      selectTool: function selectTool(selecttool) {
        this.set('selectedTool', selecttool);
      }
    }
  });
});
define('capstone-front-ember/components/loans-bar-chart', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('capstone-front-ember/components/loans-graphs', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    graph: null,
    selectedGraph: "principal",
    actions: {
      selectBarGraph: function selectBarGraph() {
        // let tool = this.get('store').peekRecord('tool', toolId)
        // console.log(selectedGraph)
        // console.log(selectedGraph.value)
        this.set('graph', event.target);
        this.set('selectedGraph', this.get('graph').id);
        // console.log(this.get('graph').id)
        return this.sendAction('selectGraph', this.get('selectedGraph'));
      }
    }
  });
});
define('capstone-front-ember/components/loans-parent', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    selectedLoan: null,
    selectedTool: null,
    selectedGraph: null,
    actions: {
      createLoan: function createLoan(newestLoan) {
        return this.sendAction('createLoan', newestLoan);
      },
      deleteLoan: function deleteLoan(loan) {
        // console.log(loan)
        return this.sendAction('deleteLoan', loan);
        // console.log(this.get('loan'))
      },
      selectLoan: function selectLoan(selectloan) {
        this.set('selectedLoan', selectloan);
        // console.log(this.get('selectedLoan'))
      },
      selectTool: function selectTool(selecttool) {
        this.set('selectedTool', selecttool);
      },
      selectBarGraph: function selectBarGraph(selectGraph) {
        this.set('selectedGraph', selectGraph);
      }
    }
  });
});
define('capstone-front-ember/components/loans/drop-down', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    // selectedLoan: null,
    actions: {
      createLoan: function createLoan(newLoan) {
        return this.sendAction('createLoan', newLoan);
      },
      selectLoan: function selectLoan(loanId) {
        var loan = "";
        if (loanId !== "new-loan") {
          loan = this.get('store').peekRecord('loan', loanId);
        } else {
          loan = loanId;
        };
        // console.log(loan)
        // return this.sendAction('fuckyLoan2', this.get('selectedLoan'))
        return this.sendAction('selectLoan', loan);
        // return this.sendAction('selectLoan', this.get('selectedLoan'))
      },
      deleteLoan: function deleteLoan(loan) {
        return this.sendAction('deleteLoan', this.get('loan'));
      }
    }
  });
});
define('capstone-front-ember/components/loans/tools-drop-down', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    selectedTool: null,
    actions: {
      selectTool: function selectTool(toolId) {
        // let tool = this.get('store').peekRecord('tool', toolId)
        this.set('selectedTool', toolId);
        return this.sendAction('selectTool', this.get('selectedTool'));
      }
    }
  });
});
define('capstone-front-ember/components/loans/update-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      updateLoan: function updateLoan() {
        this.sendAction('updateLoan', this.get('loan'));
      }
    }
  });
});
define('capstone-front-ember/components/my-application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),

    actions: {
      signOut: function signOut() {
        this.sendAction('signOut');
      }
    }
  });
});
define('capstone-front-ember/components/navbar-header', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['navbar-header']
  });
});
define('capstone-front-ember/components/page-header', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('capstone-front-ember/components/password-confirmation-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('capstone-front-ember/components/password-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('capstone-front-ember/components/sign-in-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define('capstone-front-ember/components/sign-up-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    credentials: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define('capstone-front-ember/components/tools-drop-down/card', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('capstone-front-ember/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('capstone-front-ember/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('capstone-front-ember/flash/object', ['exports', 'ember-cli-flash/flash/object'], function (exports, _emberCliFlashFlashObject) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashFlashObject['default'];
    }
  });
});
define('capstone-front-ember/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, _ember, _emberTruthHelpersHelpersAnd) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersAnd.andHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersAnd.andHelper);
  }

  exports['default'] = forExport;
});
define('capstone-front-ember/helpers/app-version', ['exports', 'ember', 'capstone-front-ember/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _capstoneFrontEmberConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _capstoneFrontEmberConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('capstone-front-ember/helpers/eq', ['exports', 'ember', 'ember-truth-helpers/helpers/equal'], function (exports, _ember, _emberTruthHelpersHelpersEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersEqual.equalHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersEqual.equalHelper);
  }

  exports['default'] = forExport;
});
define('capstone-front-ember/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, _ember, _emberTruthHelpersHelpersGt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGt.gtHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGt.gtHelper);
  }

  exports['default'] = forExport;
});
define('capstone-front-ember/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, _ember, _emberTruthHelpersHelpersGte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGte.gteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGte.gteHelper);
  }

  exports['default'] = forExport;
});
define('capstone-front-ember/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, _ember, _emberTruthHelpersHelpersIsArray) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  }

  exports['default'] = forExport;
});
define('capstone-front-ember/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _emberTruthHelpersHelpersIsEqual) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsEqual['default'];
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsEqual.isEqual;
    }
  });
});
define('capstone-front-ember/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, _ember, _emberTruthHelpersHelpersLt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLt.ltHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLt.ltHelper);
  }

  exports['default'] = forExport;
});
define('capstone-front-ember/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersHelpersLte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLte.lteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = forExport;
});
define('capstone-front-ember/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, _ember, _emberTruthHelpersHelpersNotEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  }

  exports['default'] = forExport;
});
define('capstone-front-ember/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, _ember, _emberTruthHelpersHelpersNot) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNot.notHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNot.notHelper);
  }

  exports['default'] = forExport;
});
define('capstone-front-ember/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, _ember, _emberTruthHelpersHelpersOr) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersOr.orHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersOr.orHelper);
  }

  exports['default'] = forExport;
});
define('capstone-front-ember/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('capstone-front-ember/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('capstone-front-ember/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, _ember, _emberTruthHelpersHelpersXor) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersXor.xorHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersXor.xorHelper);
  }

  exports['default'] = forExport;
});
define("capstone-front-ember/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelAdapterActiveModelSerializer) {
  exports["default"] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter["default"]);
      application.register('serializer:-active-model', _activeModelAdapterActiveModelSerializer["default"]);
    }
  };
});
define('capstone-front-ember/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'capstone-front-ember/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _capstoneFrontEmberConfigEnvironment) {
  var _config$APP = _capstoneFrontEmberConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('capstone-front-ember/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('capstone-front-ember/initializers/data-adapter', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('capstone-front-ember/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _emberDataSetupContainer, _emberData) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('capstone-front-ember/initializers/export-application-global', ['exports', 'ember', 'capstone-front-ember/config/environment'], function (exports, _ember, _capstoneFrontEmberConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_capstoneFrontEmberConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _capstoneFrontEmberConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_capstoneFrontEmberConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('capstone-front-ember/initializers/flash-messages', ['exports', 'ember', 'capstone-front-ember/config/environment'], function (exports, _ember, _capstoneFrontEmberConfigEnvironment) {
  exports.initialize = initialize;
  var deprecate = _ember['default'].deprecate;

  var merge = _ember['default'].assign || _ember['default'].merge;
  var INJECTION_FACTORIES_DEPRECATION_MESSAGE = '[ember-cli-flash] Future versions of ember-cli-flash will no longer inject the service automatically. Instead, you should explicitly inject it into your Route, Controller or Component with `Ember.inject.service`.';
  var addonDefaults = {
    timeout: 3000,
    extendedTimeout: 0,
    priority: 100,
    sticky: false,
    showProgress: false,
    type: 'info',
    types: ['success', 'info', 'warning', 'danger', 'alert', 'secondary'],
    injectionFactories: ['route', 'controller', 'view', 'component'],
    preventDuplicates: false
  };

  function initialize() {
    var application = arguments[1] || arguments[0];

    var _ref = _capstoneFrontEmberConfigEnvironment['default'] || {};

    var flashMessageDefaults = _ref.flashMessageDefaults;

    var _ref2 = flashMessageDefaults || [];

    var injectionFactories = _ref2.injectionFactories;

    var options = merge(addonDefaults, flashMessageDefaults);
    var shouldShowDeprecation = !(injectionFactories && injectionFactories.length);

    application.register('config:flash-messages', options, { instantiate: false });
    application.inject('service:flash-messages', 'flashMessageDefaults', 'config:flash-messages');

    deprecate(INJECTION_FACTORIES_DEPRECATION_MESSAGE, shouldShowDeprecation, {
      id: 'ember-cli-flash.deprecate-injection-factories',
      until: '2.0.0'
    });

    options.injectionFactories.forEach(function (factory) {
      application.inject(factory, 'flashMessages', 'service:flash-messages');
    });
  }

  exports['default'] = {
    name: 'flash-messages',
    initialize: initialize
  };
});
define('capstone-front-ember/initializers/injectStore', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('capstone-front-ember/initializers/local-storage-adapter', ['exports', 'ember-local-storage/initializers/local-storage-adapter'], function (exports, _emberLocalStorageInitializersLocalStorageAdapter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter.initialize;
    }
  });
});
define('capstone-front-ember/initializers/store', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('capstone-front-ember/initializers/text-field', ['exports', 'ember'], function (exports, _ember) {
  exports.initialize = initialize;

  function initialize() {
    _ember['default'].TextField.reopen({
      classNames: ['form-control']
    });
  }

  exports['default'] = {
    name: 'text-field',
    initialize: initialize
  };
});
define('capstone-front-ember/initializers/transforms', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('capstone-front-ember/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersUtilsRegisterHelper, _emberTruthHelpersHelpersAnd, _emberTruthHelpersHelpersOr, _emberTruthHelpersHelpersEqual, _emberTruthHelpersHelpersNot, _emberTruthHelpersHelpersIsArray, _emberTruthHelpersHelpersNotEqual, _emberTruthHelpersHelpersGt, _emberTruthHelpersHelpersGte, _emberTruthHelpersHelpersLt, _emberTruthHelpersHelpersLte) {
  exports.initialize = initialize;

  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (_ember['default'].Helper) {
      return;
    }

    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('and', _emberTruthHelpersHelpersAnd.andHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('or', _emberTruthHelpersHelpersOr.orHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('eq', _emberTruthHelpersHelpersEqual.equalHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not', _emberTruthHelpersHelpersNot.notHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('is-array', _emberTruthHelpersHelpersIsArray.isArrayHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not-eq', _emberTruthHelpersHelpersNotEqual.notEqualHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gt', _emberTruthHelpersHelpersGt.gtHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gte', _emberTruthHelpersHelpersGte.gteHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lt', _emberTruthHelpersHelpersLt.ltHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lte', _emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define("capstone-front-ember/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _emberDataInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataInstanceInitializersInitializeStoreService["default"]
  };
});
define('capstone-front-ember/models/loan', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    principal: _emberData['default'].attr('number'),
    lender: _emberData['default'].attr('string'),
    total_amount: _emberData['default'].attr('number'),
    total_interest: _emberData['default'].attr('number'),
    monthly_payment: _emberData['default'].attr('number'),
    interest_rate: _emberData['default'].attr('number'),
    loan_length: _emberData['default'].attr('number'),
    monthly_interest: _emberData['default'].attr(),
    monthly_principal: _emberData['default'].attr(),
    monthly_balance: _emberData['default'].attr()
  });
});
define('capstone-front-ember/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string'),
    first_name: _emberData['default'].attr('string'),
    income: _emberData['default'].attr('string'),
    rent: _emberData['default'].attr('string')
  });
});
define('capstone-front-ember/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('capstone-front-ember/router', ['exports', 'ember', 'capstone-front-ember/config/environment'], function (exports, _ember, _capstoneFrontEmberConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _capstoneFrontEmberConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('sign-up');
    this.route('sign-in');
    this.route('change-password');
    this.route('users');
    this.route('loans');
    this.route('profile');
    this.route('loan', { path: '/loans/:loan_id' });
    this.route('loans-edit', { path: '/loans/:loan_id/edit' });
    this.route('loan-review', { path: '/loans/:loan_id/review' });
    this.route('interest-vs-principal', { path: '/loans/:loan_id/versus' });
    this.route('balance-chart', { path: '/loans/:loan_id/balance' });
  });

  exports['default'] = Router;
});
define('capstone-front-ember/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signOut: function signOut() {
        var _this = this;

        this.get('auth').signOut().then(function () {
          return _this.get('store').unloadAll();
        }).then(function () {
          return _this.transitionTo('index');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Are you sure you\'re signed-in?');
        });
      },

      error: function error(reason) {
        var unauthorized = reason.errors && reason.errors.some(function (error) {
          return error.status === '401';
        });

        if (unauthorized) {
          this.get('flashMessages').danger('You must be authenticated to access this page.');
          this.transitionTo('/sign-in');
        } else {
          this.get('flashMessages').danger('There was a problem. Please try again.');
        }

        return false;
      }
    }
  });
});
define('capstone-front-ember/routes/balance-chart', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo('loans');
    }
  });
});
define('capstone-front-ember/routes/change-password', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      changePassword: function changePassword(passwords) {
        var _this = this;

        this.get('auth').changePassword(passwords).then(function () {
          return _this.get('auth').signOut();
        }).then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').success('Successfully changed your password!');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('capstone-front-ember/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service()
  });
});
define('capstone-front-ember/routes/interest-vs-principal', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo('loans');
    }
  });
});
define('capstone-front-ember/routes/loan-review', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo('loans');
    }
  });
});
define('capstone-front-ember/routes/loan', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      var allLoans = this.get('store').findAll('loan');
      var currentLoan = this.get('store').findRecord('loan', params.loan_id);
      return currentLoan.then(function () {
        // grabbing ticks for interest graph
        var loan_length_periods = currentLoan.get('loan_length') * 12;
        var interest_label_array = [];
        var counter = 0;
        var numberForArray = 0;
        if (loan_length_periods <= 120) {
          for (var i = 1; i <= loan_length_periods; i++) {
            counter++;
            if (i === 1) {
              interest_label_array.push(0);
            } else if (counter === 6) {
              interest_label_array.push(i);
              counter = 0;
            }
          }
        } else {
          for (var i = 1; i <= loan_length_periods; i++) {
            counter++;
            if (i === 1) {
              interest_label_array.push(0);
            } else if (counter === 12) {
              numberForArray += 1;
              interest_label_array.push(numberForArray);
              counter = 0;
            }
          }
        }

        // grabbing partial data for abridged interest graph
        var interest_array = currentLoan.get('monthly_interest');
        var interest_data_array = [0];
        var interestCounter = 0;
        if (interest_array.length <= 120) {
          for (var i = 0; i < interest_array.length; i++) {
            interestCounter++;
            if (i === interest_array.length) {
              interest_data_array.push(0);
            } else if (interestCounter === 6) {
              interest_data_array.push(interest_array[i]);
              interestCounter = 0;
            }
          }
        } else {
          for (var i = 0; i < interest_array.length; i++) {
            interestCounter++;
            if (i === interest_array.length) {
              interest_data_array.push(0);
            } else if (interestCounter === 12) {
              interest_data_array.push(interest_array[i]);
              interestCounter = 0;
            }
          }
        }
        // grabbing parital data of principal
        var principal_array = currentLoan.get('monthly_principal');
        var principal_data_array = [0];
        var principalCounter = 0;
        if (interest_array.length <= 120) {
          for (var i = 0; i < principal_array.length; i++) {
            principalCounter++;
            if (i === principal_array.length) {
              principal_data_array.push(0);
            } else if (principalCounter === 6) {
              principal_data_array.push(principal_array[i]);
              principalCounter = 0;
            }
          }
        } else {
          for (var i = 0; i < principal_array.length; i++) {
            principalCounter++;
            if (i === principal_array.length) {
              principal_data_array.push(0);
            } else if (principalCounter === 12) {
              principal_data_array.push(principal_array[i]);
              principalCounter = 0;
            }
          }
        }
        // grabbing parital data of balance
        var balance_array = currentLoan.get('monthly_balance');
        var first_balance = currentLoan.get('principal');
        var balance_data_array = [first_balance];
        var balanceCounter = 0;
        if (balance_array.length <= 120) {
          for (var i = 0; i < balance_array.length; i++) {
            balanceCounter++;
            if (i === balance_array.length || balance_array[i] < 0) {
              balance_data_array.push(0);
            } else if (balanceCounter === 6) {
              balance_data_array.push(balance_array[i]);
              balanceCounter = 0;
            }
          }
        } else {
          for (var i = 0; i < balance_array.length; i++) {
            balanceCounter++;
            if (i === balance_array.length || balance_array[i] < 0) {
              balance_data_array.push(0);
            } else if (balanceCounter === 12) {
              balance_data_array.push(balance_array[i]);
              balanceCounter = 0;
            }
          }
        }

        // colors
        // #885159	(136,81,89)
        // #645188	(100,81,136)
        // #886451	(136,100,81)
        // #528881	(82,136,129)
        // #000000	(0,0,0)

        // light purple #D0CADB (208,202,219)
        return {
          loanModel: currentLoan,
          donutChart: {
            labels: ['Principal', 'Interest'],
            datasets: [{
              backgroundColor: ['rgba(100, 81, 136, 0.7)', 'rgba(208, 202, 219, 0.7)'],
              data: [currentLoan.get('principal'), currentLoan.get('total_interest')]
            }]
          },
          interestChart: {
            labels: interest_label_array,
            datasets: [{
              label: 'Interest',
              borderColor: 'rgba(136, 81, 89, 1)',
              fill: false,
              data: interest_data_array
            }, {
              label: 'Principal',
              borderColor: 'rgba(100, 81, 136, 1)',
              fill: false,
              data: principal_data_array
            }]

          },
          balanceChart: {
            labels: interest_label_array,
            datasets: [{
              label: 'Remaining balance',
              borderColor: 'rgba(136, 81, 89, 1)',
              backgroundColor: 'rgba(207, 185, 188, .5)',
              data: balance_data_array
            }]
          }
        };
      });
    }
  });
});
define('capstone-front-ember/routes/loans-edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('loan');
    },
    actions: {
      updateLoan: function updateLoan(loan) {
        var _this = this;

        loan.save().then(function (loan) {
          _this.transitionTo('loans');
        }).then(function () {
          _this.get('flashMessages').success('Successfully updated a loan!');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('capstone-front-ember/routes/loans', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    flashMessages: _ember['default'].inject.service(),
    model: function model() {
      var allLoans = this.get('store').findAll('loan');
      var principalArray = [];
      var interestArray = [];
      var lengthArray = [];
      var nameArray = [];
      return allLoans.then(function (loan) {
        var allLoansArray = loan.toArray();
        for (var i = 0; i < allLoansArray.length; i++) {
          var principalValue = allLoansArray[i].get('principal');
          var interestValue = allLoansArray[i].get('interest_rate');
          var lengthValue = allLoansArray[i].get('loan_length');
          var _name = allLoansArray[i].get('name');
          principalArray.push(principalValue);
          interestArray.push(interestValue);
          lengthArray.push(lengthValue);
          nameArray.push(_name);
        }
        return {
          loansModel: allLoans,
          principalChart: {
            labels: nameArray,
            datasets: [{
              label: "Principal",
              backgroundColor: 'rgba(100, 81, 136, .7)',
              data: principalArray
            }]
          },
          interestChart: {
            labels: nameArray,
            datasets: [{
              label: "Interest Rate",
              backgroundColor: 'rgba(136, 100, 81, .7)',
              data: interestArray
            }]
          },
          lengthChart: {
            labels: nameArray,
            datasets: [{
              label: "Length",
              backgroundColor: 'rgba(136, 81, 89, .7)',
              data: lengthArray
            }]
          },
          barOptions: {
            scales: {
              xAxes: [{
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 10
                }
              }]
            }
          }
        };
      });
    },
    actions: {
      createLoan: function createLoan(loan) {
        var _this = this;

        var newestLoan = this.get('store').createRecord('loan', loan);
        newestLoan.save().then(function () {
          _this.transitionTo('profile');
        }).then(function () {
          _this.get('flashMessages').success('Successfully created a loan!');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
          newestLoan.destroyRecord();
        });
      },
      deleteLoan: function deleteLoan(loan) {
        var _this2 = this;

        // console.log(loan)
        loan.destroyRecord().then(function () {
          _this2.transitionTo('profile');
        }).then(function () {
          _this2.get('flashMessages').success('Successfully created a loan!');
        })['catch'](function () {
          _this2.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('capstone-front-ember/routes/profile', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo('loans');
    }
    // model () {
    //   return this.get('store').findAll('user');
    // },
  });
});
define('capstone-front-ember/routes/sign-in', ['exports', 'ember', 'rsvp'], function (exports, _ember, _rsvp) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    model: function model() {
      return _rsvp['default'].Promise.resolve({});
    },

    actions: {
      signIn: function signIn(credentials) {
        var _this = this;

        return this.get('auth').signIn(credentials).then(function () {
          return _this.transitionTo('loans');
        }).then(function () {
          return _this.get('flashMessages').success('Thanks for signing in!');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('capstone-front-ember/routes/sign-up', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signUp: function signUp(credentials) {
        var _this = this;

        this.get('auth').signUp(credentials).then(function () {
          return _this.get('auth').signIn(credentials);
        }).then(function () {
          return _this.transitionTo('application');
        }).then(function () {
          _this.get('flashMessages').success('Successfully signed-up! You have also been signed-in.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('capstone-front-ember/routes/users', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo('index');
    }
    // model () {
    //   return this.get('store').findAll('user');
    // },
  });
});
define('capstone-front-ember/serializers/application', ['exports', 'active-model-adapter'], function (exports, _activeModelAdapter) {
  exports['default'] = _activeModelAdapter.ActiveModelSerializer.extend({});
});
define('capstone-front-ember/services/ajax', ['exports', 'ember', 'ember-ajax/services/ajax', 'capstone-front-ember/config/environment'], function (exports, _ember, _emberAjaxServicesAjax, _capstoneFrontEmberConfigEnvironment) {
  exports['default'] = _emberAjaxServicesAjax['default'].extend({
    host: _capstoneFrontEmberConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),
    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('capstone-front-ember/services/auth', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Service.extend({
    ajax: _ember['default'].inject.service(),
    credentials: (0, _emberLocalStorage.storageFor)('auth'),
    isAuthenticated: _ember['default'].computed.bool('credentials.token'),

    signUp: function signUp(credentials) {
      return this.get('ajax').post('/sign-up', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation
          }
        }
      });
    },

    signIn: function signIn(credentials) {
      var _this = this;

      return this.get('ajax').post('/sign-in', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password
          }
        }
      }).then(function (result) {
        _this.get('credentials').set('id', result.user.id);
        _this.get('credentials').set('email', result.user.email);
        _this.get('credentials').set('token', result.user.token);
      });
    },

    changePassword: function changePassword(passwords) {
      return this.get('ajax').patch('/change-password/' + this.get('credentials.id'), {
        data: {
          passwords: {
            old: passwords.previous,
            'new': passwords.next
          }
        }
      });
    },

    signOut: function signOut() {
      var _this2 = this;

      return this.get('ajax').del('/sign-out/' + this.get('credentials.id'))['finally'](function () {
        return _this2.get('credentials').reset();
      });
    }
  });
});
define('capstone-front-ember/services/flash-messages', ['exports', 'ember-cli-flash/services/flash-messages'], function (exports, _emberCliFlashServicesFlashMessages) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashServicesFlashMessages['default'];
    }
  });
});
define('capstone-front-ember/storages/auth', ['exports', 'ember-local-storage/local/object'], function (exports, _emberLocalStorageLocalObject) {
  exports['default'] = _emberLocalStorageLocalObject['default'].extend({});
});
define("capstone-front-ember/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Q/HrPftL", "block": "{\"statements\":[[\"append\",[\"helper\",[\"my-application\"],null,[[\"signOut\"],[\"signOut\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/application.hbs" } });
});
define("capstone-front-ember/templates/balance-chart", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "rveEtXJp", "block": "{\"statements\":[[\"append\",[\"helper\",[\"page-header\"],null,[[\"title\"],[\"Balance\"]]],false],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 loan-card\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"loan/loan-card\"],null,[[\"deleteLoan\",\"loan\"],[\"deleteLoan\",[\"get\",[\"model\",\"loanModel\"]]]]],false],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"loans\"],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Loan Review\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"loan-review\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"loan-donut-chart\"],null,[[\"data\"],[[\"get\",[\"model\",\"donutChart\"]]]]],false],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"tools-drop-down/card\"],null,[[\"loan\"],[[\"get\",[\"model\",\"loanModel\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-6\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-12\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Interest vs Principal\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"loan-interest-chart\"],null,[[\"data\",\"height\"],[[\"get\",[\"model\",\"interestChart\"]],100]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-12\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Balance\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"loan-balance-chart\"],null,[[\"data\",\"height\"],[[\"get\",[\"model\",\"balanceChart\"]],100]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-standard\"],[\"flush-element\"],[\"text\",\"Back\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/balance-chart.hbs" } });
});
define("capstone-front-ember/templates/change-password", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "e80g5nY3", "block": "{\"statements\":[[\"append\",[\"helper\",[\"page-header\"],null,[[\"title\"],[\"Change Password\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"change-password-form\"],null,[[\"submit\"],[\"changePassword\"]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/change-password.hbs" } });
});
define("capstone-front-ember/templates/components/change-password-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "tjmq5w6E", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"previous\"],[\"flush-element\"],[\"text\",\"Old Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"previous\",\"Old password\",[\"get\",[\"passwords\",\"previous\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"next\"],[\"flush-element\"],[\"text\",\"New Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"next\",\"New password\",[\"get\",[\"passwords\",\"next\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn update-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Change Password\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn remove-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"link-to\"],[\"loans\"],null,0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-standard\"],[\"flush-element\"],[\"text\",\"Back\"],[\"close-element\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/change-password-form.hbs" } });
});
define("capstone-front-ember/templates/components/email-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "g13mZuZJ", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"email\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"email\",\"email\",\"Email\",[\"get\",[\"email\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/email-input.hbs" } });
});
define("capstone-front-ember/templates/components/hamburger-menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "tezLvWxZ", "block": "{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/hamburger-menu.hbs" } });
});
define("capstone-front-ember/templates/components/home-text", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "dwA1mgsh", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"cover\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"text-vertical-center\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"money-bag\"],[\"static-attr\",\"src\",\"http://i.imgur.com/VnsFmAC.png\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"DollarThoughts\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\" We're here to make money less confusing\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,4,2],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-lg btn-success signed-out-button\"],[\"static-attr\",\"type\",\"button\"],[\"flush-element\"],[\"text\",\"Sign In\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-lg btn-success signed-out-button\"],[\"static-attr\",\"type\",\"button\"],[\"flush-element\"],[\"text\",\"Sign Up\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"block\",[\"link-to\"],[\"sign-up\"],null,1],[\"text\",\"\\n    \"],[\"block\",[\"link-to\"],[\"sign-in\"],null,0],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-success signed-out-button\"],[\"static-attr\",\"type\",\"button\"],[\"flush-element\"],[\"text\",\"Check out your loans\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"block\",[\"link-to\"],[\"loans\"],null,3],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/home-text.hbs" } });
});
define("capstone-front-ember/templates/components/loan-balance-chart", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "CUlsBUP3", "block": "{\"statements\":[[\"append\",[\"helper\",[\"ember-chart\"],null,[[\"type\",\"data\",\"height\"],[\"line\",[\"get\",[\"data\"]],[\"get\",[\"height\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/loan-balance-chart.hbs" } });
});
define("capstone-front-ember/templates/components/loan-donut-chart", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ZDO3pQGQ", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"donutChart\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"ember-chart\"],null,[[\"type\",\"data\",\"height\"],[\"doughnut\",[\"get\",[\"data\"]],[\"get\",[\"height\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/loan-donut-chart.hbs" } });
});
define("capstone-front-ember/templates/components/loan-interest-chart", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "NsAkf3MT", "block": "{\"statements\":[[\"append\",[\"helper\",[\"ember-chart\"],null,[[\"type\",\"data\",\"height\"],[\"line\",[\"get\",[\"data\"]],[\"get\",[\"height\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/loan-interest-chart.hbs" } });
});
define("capstone-front-ember/templates/components/loan-list/card", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "6crx1SLp", "block": "{\"statements\":[[\"block\",[\"link-to\"],[\"loan\",[\"get\",[\"loan\",\"id\"]]],null,2],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"loan\",\"lender\"]]],null,1],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Principal: $ \"],[\"append\",[\"unknown\",[\"loan\",\"principal\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Interest rate: \"],[\"append\",[\"unknown\",[\"loan\",\"interest_rate\"]],false],[\"text\",\"%\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Length: \"],[\"append\",[\"unknown\",[\"loan\",\"loan_length\"]],false],[\"text\",\" year(s)\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn remove-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteLoan\"]],[\"flush-element\"],[\"text\",\"Delete\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"loans-edit\",[\"get\",[\"loan\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn update-button\"],[\"flush-element\"],[\"text\",\"Edit\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Lender: \"],[\"append\",[\"unknown\",[\"loan\",\"lender\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"loan\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/loan-list/card.hbs" } });
});
define("capstone-front-ember/templates/components/loan-list/create-loan-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "tmRosyhk", "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\" Create a new list\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"createLoan\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Name\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\",\"type\"],[\"Name\",[\"get\",[\"newLoan\",\"name\"]],\"text\"]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Lender\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\",\"type\"],[\"Lender\",[\"get\",[\"newLoan\",\"lender\"]],\"text\"]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Principal\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\",\"type\",\"step\"],[\"$\",[\"get\",[\"newLoan\",\"principal\"]],\"number\",\"0.01\"]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Interest Rate\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\",\"type\",\"step\"],[\"%\",[\"get\",[\"newLoan\",\"interest_rate\"]],\"number\",\"0.001\"]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Loan length\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\",\"type\",\"step\"],[\"years\",[\"get\",[\"newLoan\",\"loan_length\"]],\"number\",\"0.01\"]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn update-button\"],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn remove-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n    Cancel\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/loan-list/create-loan-form.hbs" } });
});
define("capstone-front-ember/templates/components/loan/loan-card", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "HSYVrLNW", "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"loan-name\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"loan\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"loan\",\"lender\"]]],null,0],[\"text\",\"  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Principal: $ \"],[\"append\",[\"unknown\",[\"loan\",\"principal\"]],false],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Interest rate: \"],[\"append\",[\"unknown\",[\"loan\",\"interest_rate\"]],false],[\"text\",\"%\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Length: \"],[\"append\",[\"unknown\",[\"loan\",\"loan_length\"]],false],[\"text\",\" year(s)\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Lender: \"],[\"append\",[\"unknown\",[\"loan\",\"lender\"]],false],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/loan/loan-card.hbs" } });
});
define("capstone-front-ember/templates/components/loan/loan-parent", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "EPQ2RCAH", "block": "{\"statements\":[[\"append\",[\"helper\",[\"page-header\"],null,[[\"title\"],[\"Loan Dashboard\"]]],false],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 loan-card\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Loan information:\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\" Take a quick glance at the data you've provided\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"loan/loan-card\"],null,[[\"deleteLoan\",\"loan\"],[\"deleteLoan\",[\"get\",[\"loan\"]]]]],false],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"loans\"],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Loan Review:\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Review the hidden costs of cumulative interest\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"loan-review\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"loan-donut-chart\"],null,[[\"data\"],[[\"get\",[\"data\"]]]]],false],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"tools-drop-down/card\"],null,[[\"loan\"],[[\"get\",[\"loan\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-6\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-12 divide\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Interest vs Principal:\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"This chart helps you see how much of your payments are going toward your principal\\n        and how much is being spent on interest \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"loan-interest-chart\"],null,[[\"data\",\"height\"],[[\"get\",[\"line-data\"]],100]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-12\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Balance Chart:\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"One day, that loan will be repaid. See your pay curve here \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"loan-balance-chart\"],null,[[\"data\",\"height\"],[[\"get\",[\"balance-data\"]],100]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-standard\"],[\"flush-element\"],[\"text\",\"Back\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/loan/loan-parent.hbs" } });
});
define("capstone-front-ember/templates/components/loans-bar-chart", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "3qgyiaWl", "block": "{\"statements\":[[\"append\",[\"helper\",[\"ember-chart\"],null,[[\"type\",\"data\",\"options\"],[\"horizontalBar\",[\"get\",[\"data\"]],[\"get\",[\"options\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/loans-bar-chart.hbs" } });
});
define("capstone-front-ember/templates/components/loans-graphs", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Kjlt61mF", "block": "{\"statements\":[[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav nav-tabs graph-tabs\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"nav-item\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"nav-link active\"],[\"static-attr\",\"id\",\"principal\"],[\"static-attr\",\"href\",\"\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"selectBarGraph\"]],[\"flush-element\"],[\"text\",\"Principal\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"nav-item\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"nav-link\"],[\"static-attr\",\"id\",\"interest\"],[\"static-attr\",\"href\",\"\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"selectBarGraph\"]],[\"flush-element\"],[\"text\",\"Interest Rate\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"nav-item\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"nav-link\"],[\"static-attr\",\"id\",\"length\"],[\"static-attr\",\"href\",\"\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"selectBarGraph\"]],[\"flush-element\"],[\"text\",\"Length\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"loans-graphs\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"selectedGraph\"]],\"principal\"],null]],null,4,3],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"append\",[\"helper\",[\"loans-bar-chart\"],null,[[\"data\",\"options\"],[[\"get\",[\"length-data\"]],[\"get\",[\"options\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"selectedGraph\"]],\"length\"],null]],null,0]],\"locals\":[]},{\"statements\":[[\"append\",[\"helper\",[\"loans-bar-chart\"],null,[[\"data\",\"options\"],[[\"get\",[\"interest-data\"]],[\"get\",[\"options\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"selectedGraph\"]],\"interest\"],null]],null,2,1]],\"locals\":[]},{\"statements\":[[\"append\",[\"helper\",[\"loans-bar-chart\"],null,[[\"data\",\"options\"],[[\"get\",[\"principal-data\"]],[\"get\",[\"options\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/loans-graphs.hbs" } });
});
define("capstone-front-ember/templates/components/loans-parent", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "8tQ+841q", "block": "{\"statements\":[[\"append\",[\"helper\",[\"page-header\"],null,[[\"title\"],[\"Loans\"]]],false],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-6\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Tracked Loans:\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"loans\"]]],null,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-6\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Loan Comparison:\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Compare your loans by principal, interest rate, or their lengths\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"loans-graphs\"],null,[[\"principal-data\",\"interest-data\",\"length-data\",\"loans\",\"selectBarGraph\",\"selectedBarGraph\",\"options\"],[[\"get\",[\"principal-data\"]],[\"get\",[\"interest-data\"]],[\"get\",[\"length-data\"]],[\"get\",[\"loans\"]],\"selectGraph\",[\"get\",[\"selectedGraph\"]],[\"get\",[\"options\"]]]]],false],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"loan-list/create-loan-form\"],null,[[\"class\",\"createLoan\",\"loan\"],[\"create-form\",\"createLoan\",[\"get\",[\"loan\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"append\",[\"helper\",[\"loan-list/card\"],null,[[\"class\",\"deleteLoan\",\"loan\"],[\"loans-list\",\"deleteLoan\",[\"get\",[\"loan\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"loan\"]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/loans-parent.hbs" } });
});
define("capstone-front-ember/templates/components/loans/drop-down", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "1vITOiHk", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"select\",[]],[\"static-attr\",\"class\",\"form-control\"],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"selectLoan\"],[[\"value\"],[\"target.value\"]]],null],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"selected\",\"\"],[\"flush-element\"],[\"text\",\"Choose a loan!\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"new-loan\"],[\"flush-element\"],[\"text\",\"Create New Loan\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"loans\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"option\",[]],[\"dynamic-attr\",\"value\",[\"unknown\",[\"loan\",\"id\"]],null],[\"flush-element\"],[\"append\",[\"unknown\",[\"loan\",\"name\"]],false],[\"close-element\"],[\"text\",\">\\n\"]],\"locals\":[\"loan\"]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/loans/drop-down.hbs" } });
});
define("capstone-front-ember/templates/components/loans/tools-drop-down", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "EAYcb2zE", "block": "{\"statements\":[[\"open-element\",\"select\",[]],[\"static-attr\",\"class\",\"form-control\"],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"selectTool\"],[[\"value\"],[\"target.value\"]]],null],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"disabled\",\"\"],[\"static-attr\",\"selected\",\"\"],[\"flush-element\"],[\"text\",\"Choose a tool!\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"option\",[]],[\"static-attr\",\"value\",\"loan-review\"],[\"flush-element\"],[\"text\",\"Loan Review\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"unless\"],[[\"get\",[\"selectedTool\"]]],null,1],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"selectedTool\"]],\"loan-review\"],null]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"loan-donut-chart\"],null,[[\"data\"],[[\"get\",[\"data\"]]]]],false],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"tools-drop-down/card\"],null,[[\"loan\"],[[\"get\",[\"loan\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\" Select a tool to use\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/loans/tools-drop-down.hbs" } });
});
define("capstone-front-ember/templates/components/loans/update-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "mdX+F3wg", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"updateLoan\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Name\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\",\"type\"],[[\"get\",[\"loan\",\"name\"]],[\"get\",[\"loan\",\"name\"]],\"text\"]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Lender\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\",\"type\"],[[\"get\",[\"loan\",\"lender\"]],[\"get\",[\"loan\",\"lender\"]],\"text\"]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Principal ($)\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\",\"type\",\"step\"],[[\"get\",[\"loan\",\"principal\"]],[\"get\",[\"loan\",\"principal\"]],\"number\",\"0.01\"]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Interest rate (%)\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\",\"type\",\"step\"],[[\"get\",[\"loan\",\"interest_rate\"]],[\"get\",[\"loan\",\"interest_rate\"]],\"number\",\"0.02\"]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Length (years)\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\",\"type\",\"step\"],[[\"get\",[\"loan\",\"loan_length\"]],[\"get\",[\"loan\",\"loan_length\"]],\"number\",\"0.01\"]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn update-button\"],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"loans\"],null,0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn remove-button\"],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Back\"],[\"close-element\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/loans/update-form.hbs" } });
});
define("capstone-front-ember/templates/components/my-application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "v+p9xQfo", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"id\",\"navbar\"],[\"static-attr\",\"class\",\"navbar-fixed-top navbar\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"navbar-header\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"navigation\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"text\",\"      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,4,1],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"text\",\"\\n\"],[\"text\",\"  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]},{\"statements\":[],\"locals\":[]},{\"statements\":[[\"text\",\"Change Password\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Loans\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"loans\"],null,3],[\"close-element\"],[\"text\",\"\\n\"],[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"dropdown-toggle\"],[\"static-attr\",\"data-toggle\",\"dropdown\"],[\"static-attr\",\"aria-haspopup\",\"true\"],[\"static-attr\",\"aria-expanded\",\"false\"],[\"flush-element\"],[\"text\",\"Account\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"dropdown\"],[\"static-attr\",\"class\",\"dropdown-menu\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"text\",\"            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"change-password\"],null,2],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/my-application.hbs" } });
});
define("capstone-front-ember/templates/components/navbar-header", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "QSiHfQPU", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hamburger-menu\"]],false],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"application\"],[[\"class\"],[\"navbar-brand\"]],0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"DollarThoughts\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/navbar-header.hbs" } });
});
define("capstone-front-ember/templates/components/page-header", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "jfdNni5L", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"static-attr\",\"class\",\"page-header\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"title\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/page-header.hbs" } });
});
define("capstone-front-ember/templates/components/password-confirmation-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ZW0l7bwc", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"password-confirmation\"],[\"flush-element\"],[\"text\",\"Password Confirmation\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password-confirmation\",\"Password Confirmation\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/password-confirmation-input.hbs" } });
});
define("capstone-front-ember/templates/components/password-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "R9JKsBtm", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"kind\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password\",\"Password\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/password-input.hbs" } });
});
define("capstone-front-ember/templates/components/sign-in-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "GEhS/6hq", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn update-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign In\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn remove-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/sign-in-form.hbs" } });
});
define("capstone-front-ember/templates/components/sign-up-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "MV5PKVxL", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn update-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign Up\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn remove-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/sign-up-form.hbs" } });
});
define("capstone-front-ember/templates/components/tools-drop-down/card", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "vJkn+x9S", "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Total Cost: $ \"],[\"append\",[\"unknown\",[\"loan\",\"total_amount\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Total Interest: $ \"],[\"append\",[\"unknown\",[\"loan\",\"total_interest\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Monthly Payments: $ \"],[\"append\",[\"unknown\",[\"loan\",\"monthly_payment\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/components/tools-drop-down/card.hbs" } });
});
define("capstone-front-ember/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "osm3ryF3", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"home-text\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/index.hbs" } });
});
define("capstone-front-ember/templates/interest-vs-principal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "3d8fbRKK", "block": "{\"statements\":[[\"append\",[\"helper\",[\"page-header\"],null,[[\"title\"],[\"Interest vs Principal\"]]],false],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 loan-card\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"loan/loan-card\"],null,[[\"deleteLoan\",\"loan\"],[\"deleteLoan\",[\"get\",[\"model\",\"loanModel\"]]]]],false],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"loans\"],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Loan Review\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"loan-review\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"loan-donut-chart\"],null,[[\"data\"],[[\"get\",[\"model\",\"donutChart\"]]]]],false],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"tools-drop-down/card\"],null,[[\"loan\"],[[\"get\",[\"model\",\"loanModel\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-6\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-12\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Interest vs Principal\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"loan-interest-chart\"],null,[[\"data\",\"height\"],[[\"get\",[\"model\",\"interestChart\"]],100]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-12\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Balance\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"loan-balance-chart\"],null,[[\"data\",\"height\"],[[\"get\",[\"model\",\"balanceChart\"]],100]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-standard\"],[\"flush-element\"],[\"text\",\"Back\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/interest-vs-principal.hbs" } });
});
define("capstone-front-ember/templates/loan-review", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "eW2VoT04", "block": "{\"statements\":[[\"append\",[\"helper\",[\"page-header\"],null,[[\"title\"],[\"Loan Review\"]]],false],[\"text\",\"\\nloan=model.loanModel data=model.donutChart\\n  line-data=model.interestChart balance-data=model.balanceChart\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3 loan-card\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"loan/loan-card\"],null,[[\"deleteLoan\",\"loan\"],[\"deleteLoan\",[\"get\",[\"model\",\"loanModel\"]]]]],false],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"loans\"],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-3\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Loan Review\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"loan-review\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"loan-donut-chart\"],null,[[\"data\"],[[\"get\",[\"model\",\"donutChart\"]]]]],false],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"tools-drop-down/card\"],null,[[\"loan\"],[[\"get\",[\"model\",\"loanModel\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-standard\"],[\"flush-element\"],[\"text\",\"Back\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/loan-review.hbs" } });
});
define("capstone-front-ember/templates/loan", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "TWyYNqvI", "block": "{\"statements\":[[\"append\",[\"helper\",[\"loan/loan-parent\"],null,[[\"loan\",\"data\",\"line-data\",\"balance-data\"],[[\"get\",[\"model\",\"loanModel\"]],[\"get\",[\"model\",\"donutChart\"]],[\"get\",[\"model\",\"interestChart\"]],[\"get\",[\"model\",\"balanceChart\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/loan.hbs" } });
});
define("capstone-front-ember/templates/loans-edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Pai7ef+/", "block": "{\"statements\":[[\"append\",[\"helper\",[\"page-header\"],null,[[\"title\"],[\"Editing\"]]],false],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-11 col-md-offset-1\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\" Edit Loan Title\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"loans/update-form\"],null,[[\"loan\",\"updateLoan\"],[[\"get\",[\"model\"]],\"updateLoan\"]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/loans-edit.hbs" } });
});
define("capstone-front-ember/templates/loans", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "9MrBA3PI", "block": "{\"statements\":[[\"append\",[\"helper\",[\"loans-parent\"],null,[[\"options\",\"deleteLoan\",\"principal-data\",\"interest-data\",\"length-data\",\"loans\",\"createLoan\"],[[\"get\",[\"model\",\"barOptions\"]],\"deleteLoan\",[\"get\",[\"model\",\"principalChart\"]],[\"get\",[\"model\",\"interestChart\"]],[\"get\",[\"model\",\"lengthChart\"]],[\"get\",[\"model\",\"loansModel\"]],\"createLoan\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/loans.hbs" } });
});
define("capstone-front-ember/templates/profile", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "yvzTSG0o", "block": "{\"statements\":[[\"append\",[\"helper\",[\"page-header\"],null,[[\"title\"],[\"Profile\"]]],false],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container profile-info\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Account Info\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"change-password\"],null,1],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"General information\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Name\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Income\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Rent\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Location\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"user\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"user\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"user\"]},{\"statements\":[[\"text\",\"Change Password\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/profile.hbs" } });
});
define("capstone-front-ember/templates/sign-in", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "xKIb30EL", "block": "{\"statements\":[[\"append\",[\"helper\",[\"page-header\"],null,[[\"title\"],[\"Sign-In\"]]],false],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"sign-in-form\"],null,[[\"submit\",\"reset\",\"credentials\"],[\"signIn\",\"reset\",[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/sign-in.hbs" } });
});
define("capstone-front-ember/templates/sign-up", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "7iGvnqnn", "block": "{\"statements\":[[\"append\",[\"helper\",[\"page-header\"],null,[[\"title\"],[\"sign-up\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"sign-up-form\"],null,[[\"submit\"],[\"signUp\"]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/sign-up.hbs" } });
});
define("capstone-front-ember/templates/users", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "lMiS0t7q", "block": "{\"statements\":[[\"append\",[\"helper\",[\"page-header\"],null,[[\"title\"],[\"Users\"]]],false],[\"text\",\"\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"user\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"user\"]}],\"hasPartials\":false}", "meta": { "moduleName": "capstone-front-ember/templates/users.hbs" } });
});


define('capstone-front-ember/config/environment', ['ember'], function(Ember) {
  var prefix = 'capstone-front-ember';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("capstone-front-ember/app")["default"].create({"name":"capstone-front-ember","version":"0.0.0+4c403b83"});
}
//# sourceMappingURL=capstone-front-ember.map
