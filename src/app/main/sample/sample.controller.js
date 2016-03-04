(function() {
    'use strict';

    angular
      .module('app.sample')
      .controller('SampleController', SampleController);

    /** @ngInject */
    function SampleController(SampleData, api, $http) {
      var vm = this;
      var PMIUrl = 'http://www.quandl.com/api/v1/datasets/ISM/MAN_PMI.csv?&trim_start=1948-01-01&trim_end=2100-12-31&sort_order=desc';
      // Data
      vm.helloText = SampleData.data.helloText;

      // Methods

      $http.get(PMIUrl).then(
        function(response) {
          console.log(csvToJSON(response.data));
        }
      );
      // api.getPMI.get({},
      //   function(response){
      //   console.log(response);
      //   console.log(csvToJSON(response.data));
      // },
      // function(response){
      //   console.log('error');
      //   console.log(response);
      // })
      //////////
    }

    // a,b
    // 1,2
    // 3,4
    // [{a:1,b:2},{a:3,b:4}]

    function csvToJSON(csv) {
      var lines = csv.split('\n');
      var headers = lines[0].split(',');
      var json = [];

      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentLine = lines[i].split(',');

        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentLine[j];
        }
        json.push(obj);
      }

      return JSON.stringify(json);
    }


})();
