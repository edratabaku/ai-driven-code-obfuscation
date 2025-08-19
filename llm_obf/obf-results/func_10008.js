function b(c, d) {
    if (d === 'ne') {
        c.customLaunchers = {
            'A': {
                base: 'F',
                config: webdriverConfig,
                browserName: 'i1',
                version: '8'
            },
            'B': {
                base: 'F',
                config: webdriverConfig,
                browserName: 'i1',
                version: '9'
            },
            'C': {
                base: 'F',
                browserName: 'i1',
                config: webdriverConfig,
                version: '10'
            },
            'D': {
                base: 'F',
                config: webdriverConfig,
                browserName: 'i1',
                version: '11'
            },
            'E': {
                base: 'F',
                config: webdriverConfig,
                browserName: 'mE'
            },
            'F-WebDriver': {
                base: 'F',
                config: webdriverConfig,
                browserName: 'c'
            },
            'G-WebDriver': {
                base: 'F',
                config: webdriverConfig,
                browserName: 'f'
            }
            // 'H-WebDriver': {
            //     base: 'F',
            //     config: webdriverConfig,
            //     browserName: 's'
            // }
        };
        c.browsers = [
            // @FIXME: localStorage mocking 버그. 이후 수정 필요
            // 'A',
            'B',
            'C',
            // 'D',
            // 'E',
            'F-WebDriver',
            'G-WebDriver'
            // 'H-WebDriver'
        ];
        c.reporters.push('coverage');
        c.reporters.push('junit');
        c.coverageReporter = {
            dir: 'report/coverage/',
            reporters: [{
                type: 'html',
                subdir: function(b) {
                    return 'report-html/' + b;
                }
            },
            {
                type: 'cobertura',
                subdir: function(b) {
                    return 'report-cobertura/' + b;
                },
                file: 'cobertura.txt'
            }
            ]
        };
        c.junitReporter = {
            outputDir: 'report/junit',
            suite: ''
        };
    } else {
        c.browsers = [
            'ChromeHeadless'
        ];
    }
}