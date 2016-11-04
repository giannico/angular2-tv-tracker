////////////////////////////////////////////////////////////////////////////////////////////////////
//// IMPORTANT: Any time changes are made to this file, the application DLLs need to be regenerated
////
//// * Run npm run dll:dev, or npm run clean and then restart development (npm run dev)
//// * The DLLs are also regenerated each time npm run build is executed.
////////////////////////////////////////////////////////////////////////////////////////////////////

exports.polyfills = function(env) {
  var polyfills = [
    'core-js/es6/symbol',
    'core-js/es6/object',
    'core-js/es6/function',
    'core-js/es6/parse-int',
    'core-js/es6/parse-float',
    'core-js/es6/number',
    'core-js/es6/math',
    'core-js/es6/string',
    'core-js/es6/date',
    'core-js/es6/array',
    'core-js/es6/regexp',
    'core-js/es6/map',
    'core-js/es6/set',
    'core-js/es6/weak-map',
    'core-js/es6/weak-set',
    'core-js/es6/typed',
    'core-js/es6/reflect',
    'core-js/es7/reflect',

    'core-js/es7/reflect',
    'reflect-metadata',

    'zone.js/dist/zone',
    'ts-helpers'
  ];

  if (env !== 'build') {
      polyfills.push('zone.js/dist/long-stack-trace-zone');
  }

  return polyfills;
};

exports.vendor = function(env) {
  return [
    // angular libraries
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/core',
    '@angular/common',
    '@angular/http',
    '@angular/router',

    // RxJS
    'rxjs/Observable',
    'rxjs/BehaviorSubject',
    'rxjs/Subscription',

    'rxjs/add/operator/bufferCount',
    'rxjs/add/operator/cache',
    'rxjs/add/operator/combineLatest',
    'rxjs/add/operator/debounce',
    'rxjs/add/operator/delay',
    'rxjs/add/operator/do',
    'rxjs/add/operator/filter',
    'rxjs/add/operator/finally',
    'rxjs/add/operator/first',
    'rxjs/add/operator/map',
    'rxjs/add/operator/reduce',
    'rxjs/add/operator/scan',
    'rxjs/add/operator/switchMap',
    'rxjs/add/operator/take',
    'rxjs/add/operator/toPromise',

    'rxjs/add/observable/combineLatest',
    'rxjs/add/observable/from',
    'rxjs/add/observable/interval',
    'rxjs/add/observable/of',
    'rxjs/add/observable/zip',

    // other vendor libraries
    'ng2-bootstrap/ng2-bootstrap',
    'angular2-toaster/angular2-toaster',
    'angularfire2',

    // other vendor css
    'bootstrap/dist/css/bootstrap.css',
    'angular2-toaster/lib/toaster.css'
  ];
};