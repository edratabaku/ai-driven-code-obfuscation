function f() {
      'use strict';
      var t = this.async(), a = this, r = commonPrompts.greetings(a, a.placeholder.artifactType);
      q = commonPrompts.prompts(a.placeholder.artifactType, a.placeholder), s = {
         name: 'k',
         message: 'Integration technology:',
         type: 'list',
         choices: [ 'plain', 'angular' ]
      };
      if (a.options.activity) {
         q.push(s);
      } else {
         s.choices = [ 'plain', 'angular', 'react' ];
         q.push(s);
      }
      q.push({
         name: 'm',
         message: 'Create project infrastructure (README.md, bower.json)?',
         type: 'confirm',
         default: false
      });
      a.prompt(q, function(c) {
         for (var n in c) {
            if (c.hasOwnProperty(n)) {
               a.placeholder[n] = c[n];
            }
         }
         var d = util.createLicenseText(c.licenses);
         a.license = d[1], e = {}, f;
         for (f in d[0]) {
            if (d[0].hasOwnProperty(f)) {
               e[f] = d[0][f];
            }
         }
         a.placeholder = Object.assign({}, a.placeholder, e);
         a.placeholder.angularModuleName = _.camelCase(a.placeholder.name), a.placeholder.angularControllerName = _.capitalize(_.camelCase(a.placeholder.name)) + 'Controller', a.placeholder.cssClassName = _.kebabCase(a.placeholder.name) 
         if (!a.options.activity) a.placeholder.banner = util.createBanner(a);
         t();
      }.bind(a));
   }