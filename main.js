require('sass').compile('index.scss', {
    importers: [{
      canonicalize(url) {
        console.log('Importer received: ' + url);
        return null;
      },
      load() {
        console.log('Importer received: ' + url);
        return {
          contents: `.whatever {}`,
          syntax: 'scss'
        };
      }
    }]
  });