var config = {
    srcDir: 'app',
    targetDir: 'dist',
    libDir: 'lib',
    componentListDir: 'styleguide',
    localesDir: 'data',
    assetsDir: 'assets'
};

module.exports = function(grunt) {
    'use strict';
    var path = require('path');

    require('time-grunt')(grunt);

    // Loads grunt tasks found on package.json automatically
    require('jit-grunt')(grunt);

    // Requiring our custom grunt tasks from the toolset
    // TODO: move to npm
    require('./lib/toolset/grunt-tasks/assembler/pagesAssembler.js')(grunt, {
        config: config
    });
    require('./lib/toolset/grunt-tasks/assembler/styleguideAssembler.js')(grunt, {
        config: config
    });

    require('./lib/toolset/grunt-tasks/assembler/stylesAssembler.js')(grunt, {
        config: config
    });

    require('./lib/toolset/grunt-tasks/assembler/addComponent.js')(grunt, {
        config: config
    });


    // require('./lib/toolset/grunt-tasks/build-angular-widgets/task.coffee')(grunt, {
    //     config: config
    // });

    // Loads grunt tasks' configuration in lib/grunt-tasks/<task-name>.js
    require('load-grunt-config')(grunt, {
        jitGrunt: true,
        data: {
            config: config
        },
        configPath: path.join(process.cwd(), 'lib/grunt-tasks')
    });
};
