/*eslint no-undef: "error"*/
/*eslint-env node*/

module.exports = function () {

    var client = './client/';
    var clientApp = client + 'app/';
    var report = './report/';

    var config = {
        clean: ['./styles/', './js/', 'index.html'],
        bower: {
            json: require('./bower.json'),
            directory: './bower_components',
            ignorePath: '../..'
        },
        client: client,
        clientApp: clientApp,
        css: client + 'css/*.css',
        defaultPort: 8000,
        fonts:[
            client + 'fonts/*.*'
        ],
        index: 'index.html',
        js: [
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js',
            client + 'lib/*.js'

        ],
        libjs: [

        ],
        jasmine: [
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/sinon/pkg/sinon.js',
            'node_modules/bardjs/dist/bard.js',
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            clientApp + '**/*.spec.js'
        ],
        spec: [clientApp + '**/*.spec.js'],
        root: './',
        report: report,
        template: './template/index.html'
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };
    return config;
};