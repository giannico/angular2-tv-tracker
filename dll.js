////////////////////////////////////////////////////////////////////////////////////////////////////
//// IMPORTANT: Any time changes are made to this file, the application DLLs need to be regenerated
////
//// * Run npm run dll:dev, or npm run clean and then restart development (npm run dev)
//// * The DLLs are also regenerated each time npm run build is executed.
////////////////////////////////////////////////////////////////////////////////////////////////////

exports.polyfills = function(env) {
    var polyfills = [
        'core-js/client/shim',
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