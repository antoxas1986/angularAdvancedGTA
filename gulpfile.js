/*eslint no-undef: "error"*/
/*eslint-env node*/

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('./gulp.config')();
var wiredep = require('wiredep').stream;
var angularFileSort = require('gulp-angular-filesort');
var browserSync = require('browser-sync');
var args = require('yargs').argv;
var del = require('del');
var port = process.env.PORT || config.defaultPort;
var autoClose = require('browser-sync-close-hook');
var mainBowerFiles = require('main-bower-files');
var Server = require('karma').Server;

gulp.task('help', $.taskListing);

gulp.task('default', ['help'], function () {

    log('********************************************************');
    log('*************** GULP TASK DESCRIPTIONS *****************');
    log('********************************************************');
    log('***** build - build the project                    *****');
    log('***** css - inject custom css to index.html        *****');
    log('***** wiredep - wire up css and js                 *****');
    log('***** clean - clean build folders                  *****');
    log('***** serve-dev - start browser sync for project   *****');
    log('***** eslint - check code for linting              *****');
    log('***** jasmine - runs jasmine sever, manual reload  *****');
    log('***** karma - runs karma server, output to console *****');
    log('***** test - single test run on karma server       *****');
    log('***** report - run test once and show report       *****');
    log('********************************************************');

});

gulp.task('jasmine', function () {

    var files = mainBowerFiles().concat(config.jasmine);

    return gulp.src(files, { base: './' })
        .pipe($.watch(config.jasmine))
        .pipe($.jasmineBrowser.specRunner({ profile: true }))
        .pipe($.jasmineBrowser.server({ port: 8888 }));
});

gulp.task('create-index', function () {
    log('Creating index.html in root...');

    return gulp.src(config.template)
        .pipe(gulp.dest(config.root));
});

gulp.task('wiredep', ['clean', 'create-index'], function () {
    log('Wire up the bower css and js and custom css');
    var options = config.getWiredepDefaultOptions();

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js).pipe(angularFileSort())))
        .pipe(gulp.dest(config.root));
});

gulp.task('fonts', function () {
    log('Copying fonts');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('css', function () {
    log('Injecting custom css into html...');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.root));
});

gulp.task('build', ['wiredep'], function () {
    log('Optimizing the javascript, css and html');

    var assets = $.useref.assets({ searchPath: './' });
    var cssFilter = $.filter('**/*.css', { restore: true });
    var jsFilter = $.filter('/**/*.js', { restore: true });

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe(assets)
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest(config.root));
});


gulp.task('clean', function () {
    log('Cleaning: ' + $.util.colors.green(config.build));
    return del(config.clean);
});

gulp.task('serve-dev', ['wiredep'], function () {
    startBrowserSync(true);
});

gulp.task('eslint', function () {
    return gulp.src(['./client/**/*.js', '!node_modules/**', '!./client/lib/**'])
        .pipe($.eslint())
        .pipe($.eslint.format('table'))
        .pipe($.eslint.failAfterError());
});

gulp.task('test', function () {
    // Be sure to return the stream
    // NOTE: Using the fake './foobar' so as to run the files
    // listed in karma.conf.js INSTEAD of what was passed to
    // gulp.src !
    return gulp.src('./foobar')
        .pipe($.karma({ configFile: 'karma.conf.js', action: 'run' }))
        .on('error', function (err) {
            this.emit('end'); //instead of erroring the stream, end it
        });
});

gulp.task('karma', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('report', ['test'], function () {
    log('Start tests and show report to browserSync...');
    //Watch for specs file changes and run 'test' task,
    //'test' task create new report file (see karma.conf.js fo details), 
    //browserSync watch for report file changes and reload it
    gulp.watch(config.spec, function (event) {
        if (event.type === 'changed') {
            gulp.start('test');
        }
    });

    //If run on chrome change report to chrome folder in server options below
    var options = {
        files: ['./test_report/*.html'],
        server: {
            baseDir: 'test_report/',
            index: 'index.html'
        },
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0
    };
    //close browser window with report
    browserSync.use({
        plugin: function () { },
        hooks: {
            'client:js': autoClose
        },
    });
    browserSync(options);
});

gulp.task('serve', function () {
    serve(true);
});

//////////////////////////////////////////////////////////////////////

function serve(isDev) {

    var nodeOptions = {
        script: './server/app.js',
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: ['server/app.js', 'server/**/*.js']
    };
    return $.nodemon(nodeOptions)
        .on('restart', function (ev) {
            log('*** nodemon restarted ***');
            log('files changed on restart:\n' + ev);
            // setTimeout(function () {
            //     browserSync.notify('reloading now ...');
            //     browserSync.reload({ stream: false });
            // }, 1000);
        })
        .on('start', function () {
            log('*** nodemon started ***');
            // startBrowserSync(isDev);
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason ***');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly ***');
        });
}

function startBrowserSync(isDev) {

    if (args.nosync || browserSync.active) {
        return;
    }

    browserSync.use({
        plugin: function () { },
        hooks: {
            'client:js': autoClose
        },
    });

    log('Starting browser-sync on port ' + port);

    var options = {
        proxy: 'localhost:' + port,
        port: port,
        files: isDev ? [
            config.root + '**/*.*'
        ] : [],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0
    };

    browserSync(options);
}

function log(msg) {
    if (typeof msg === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.green(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.green(msg));
    }
}
