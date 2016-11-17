angular.module('dm-16-q')
.controller('mainCtrl', function($scope, mainService) {
  mainService.getNames()
    .then(function(names) {
      $scope.people = names;
    })
    .catch(function(err) {
      $scope.error = err;
    })

  mainService.getPerson()
    .then(function(person) {
      console.dir(person);
      $scope.person = person;
    })

})