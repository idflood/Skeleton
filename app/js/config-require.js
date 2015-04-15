requirejs.config({
    baseUrl: '../../js/',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        mymodule: '../modules/mymodule/mymodule',
        mediaQuery: '../bower_components/sensible/mediaQuery',
        placeholder: '../bower_components/jquery-placehodler/jquery-placehodler',
        requestAnimationFrame: '../bower_components/requestAnimationFrame/app/requestAnimationFrame'
    },
    shim: {
        shimfull: {
            deps: ['jquery']
        },
        placeholder: {
          deps: ['jquery']
        }
    }
});
