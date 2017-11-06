// (function() {
//   'use strict';
//
//   angular
//     .module('frontend')
//     .config(ravenConfig);
//
//   function ravenConfig(EnvironmentConfig) {
//     var options = {
//         logger: 'frontend-logger',
//         ignoreUrls: [
//             // Facebook flakiness
//             /graph\.facebook\.com/i,
//             // Facebook blocked
//             /connect\.facebook\.net\/en_US\/all\.js/i,
//             // Woopra flakiness
//             /eatdifferent\.com\.woopra-ns\.com/i,
//             /static\.woopra\.com\/js\/woopra\.js/i,
//             // Chrome extensions
//             /extensions\//i,
//             /^chrome:\/\//i,
//             // Other plugins
//             /127\.0\.0\.1:4001\/isrunning/i,  // Cacaoweb
//             /webappstoolbarba\.texthelp\.com\//i,
//             /metrics\.itunes\.apple\.com\.edgesuite\.net\//i
//         ]
//
//     };
//     Raven.config(EnvironmentConfig.site.sentry.dsn,options).install();
//   }
// })();
