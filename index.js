var path = require('path');
var fs   = require('fs');
var pickFiles = require('broccoli-static-compiler');

module.exports = {
  name: 'ember-cli-topcoat',
  treeFor: function treeFor(name) {
    if (name !== 'vendor') { return; }

    var treePath = path.join('node_modules', 'ember-cli-topcoat', 'node_modules', 'topcoat');

    var addon;

    if (fs.existsSync(treePath)) {
      addon = pickFiles(treePath, {
        srcDir: '/',
        destDir: '/topcoat'
      });
    }

    if (typeof addon === 'undefined') {
      treePath = path.join(__dirname, 'node_modules', 'topcoat');
      if (fs.existsSync(treePath)) {
        addon = pickFiles(treePath, {
          srcDir: '/',
          destDir: '/topcoat'
        });
      }
    }

    return addon;
  },
  afterInstall: function(options) {
    return this.addBowerPackageToProject('topcoat', '0.8.0');
  },
  included: function topcoat_included(app) {
    this._super.included(app);

    var options = this.app.options.topcoatOptions || {
        enabled: true,
        mobile: false,
        dark: false,
        fonts: true,
        images: true
      };


    var theme = options.dark ? 'dark' : 'light';

    var desktop = app.bowerDirectory + '/topcoat/css/topcoat-desktop-' + theme + '.css';
    var mobile = app.bowerDirectory + '/topcoat/css/topcoat-mobile-' + theme + '.css';

    var fonts = [
      'SourceCodePro-Black.otf',
      'SourceCodePro-Bold.otf',
      'SourceCodePro-ExtraLight.otf',
      'SourceCodePro-Light.otf',
      'SourceCodePro-Regular.otf',
      'SourceCodePro-Semibold.otf',
      'SourceSansPro-Black.otf',
      'SourceSansPro-BlackIt.otf',
      'SourceSansPro-Bold.otf',
      'SourceSansPro-BoldIt.otf',
      'SourceSansPro-ExtraLight.otf',
      'SourceSansPro-ExtraLightIt.otf',
      'SourceSansPro-It.otf',
      'SourceSansPro-Light.otf',
      'SourceSansPro-LightIt.otf',
      'SourceSansPro-Regular.otf',
      'SourceSansPro-Semibold.otf',
      'SourceSansPro-SemiboldIt.otf'
    ];

    var images = [
      'avatar.png',
      'bg_dark.png',
      'breadcrumb.png',
      'checkbox_checked.png',
      'checkbox_checked_dark.png',
      'checkbox_unchecked.png',
      'checkbox_unchecked_dark.png',
      'checkmark_bw.svg',
      'dark-combo-box-bg.png',
      'dark-combo-box-bg2x.png',
      'dark-grips.png',
      'dark-sprites2x.png',
      'dialog-zone-bg.png',
      'drop-down-triangle.png',
      'drop-down-triangle-dark.png',
      'hamburger_bw.svg',
      'hamburger_dark.svg',
      'hamburger_light.svg',
      'light-combo-box-bg.png',
      'light-combo-box-bg2x.png',
      'light-grips.png',
      'light-sprites2x.png',
      'pop-up-triangle.png',
      'pop-up-triangle-dark.png',
      'search.svg',
      'search-bg.png',
      'search-bg2x.png',
      'search_bw.svg',
      'search_dark.svg',
      'search_light.svg',
      'spinner.png',
      'spinner2x.png'
    ];

    if (options.enabled) {

      if (options.mobile) {
        app.import(mobile);
      } else {
        app.import(desktop);
      }

      if (app.env === 'development' || process.env.DIST) {
        app.import(app.bowerDirectory + '/topcoat/demo/css/main.css');
        app.import(app.bowerDirectory + '/topcoat/demo/css/brackets.css');
        app.import(app.bowerDirectory + '/topcoat/demo/css/theme.css');
        app.import(app.bowerDirectory + '/topcoat/demo/js/rainbow-custom.min.js');
        app.import(app.bowerDirectory + '/topcoat/demo/js/rainbow.linenumbers.min.js');
      }

      if (options.fonts) {
        fonts.forEach(function(font){
          app.import(app.bowerDirectory + '/topcoat/font/'+font, { destDir: "font" });
        });
      }

      if (options.images) {
        images.forEach(function(image){
          app.import(app.bowerDirectory + '/topcoat/img/'+image, { destDir: "img" });
        });
      }
    }
  }
};
