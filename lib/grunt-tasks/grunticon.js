module.exports = {
    options: {
        datasvgcss: 'icons.data.svg.scss',
        cssprefix: '.icon--'
    },
    dev: {
        files: [{
            src    : ['*.svg', '*.png'],
            cwd    : '<%= config.srcDir %>' + '/' + '<%= config.assetsDir %>' + '/icons',
            dest   : '<%= config.srcDir %>' + '/css/styles/icons/grunticon.generated/',
            expand : true
        }]
    },
    prod: {
        files: [{
            src    : ['*.svg', '*.png'],
            cwd    : '<%= config.targetDir %>' + '/' + '<%= config.assetsDir %>' + '/icons',
            dest   : '<%= config.targetDir %>' + '/css/icons',
            expand : true
        }]
    }
};
