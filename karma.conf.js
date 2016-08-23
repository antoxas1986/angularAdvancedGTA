/*eslint no-undef: "error"*/
/*eslint-env node*/
module.exports = function (config) {

    var gulpConfig = require('./gulp.config')();
    var mainBowerFiles = require('main-bower-files');

    var files = mainBowerFiles().concat(gulpConfig.jasmine);

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: files,

        // list of files to exclude
        exclude: ['./**/*.less', './**/*.scss'],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['html', 'spec', 'progress'],

        htmlReporter: {
            outputFile: 'test_report/index.html',
            // Optional 
            pageTitle: 'Unit Tests for Angular JS',
            subPageTitle: 'Jasmine tests for Game Tracker app',
            groupSuites: true,
            useCompactStyle: true,
            useLegacyStyle: true
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'PhantomJS',
            //'Chrome'
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false

    });
};
