angular.module('dm-16-q')
.service('mainService', function($http, $q) {
  var baseUrl = 'http://swapi.co/api/';

  this.getWorld = function(url) {
    return $http.get(url)
      .then(function(res) {
        return res.data;
      })
  }

  this.getPerson = function() {
    var that = this;
    var person = $q.defer();
    var homeworld = $q.defer();

    $http.get(baseUrl + 'people/1')
      .then(function(res) {
        person.resolve(res.data);

        return that.getWorld(res.data.homeworld)
      })
      .then(function(res) {
          homeworld.resolve(res)
        })

    return $q.all([person.promise, homeworld.promise])
      .then(function(res) {
        var _person = res[0];
        var _homeworld = res[1];

        _person.homeworld = _homeworld.name;
        console.dir(_person);
        return _person;
      })
  }

  // this.getPerson = function() {

  //   var defer = $q.defer();

  //   var person = {};

  //   $http.get(baseUrl + 'people/1')
  //     .then(function(res) {
  //       person = res.data;
  //       return $http.get(res.data.homeworld)
  //     })
  //     .then(function(res) {
  //       person.homeworld = res.data.name;
  //       defer.resolve(person);
  //     })
  //     .catch(function(err) {
  //       console.error(err);
  //     });

  //   return defer.promise;
  // }




  this.getPeople = function() {
    var defer = $q.defer();


    $http.get(baseUrl + 'people')
      .then(function(res) {
        defer.resolve(res.data.results)
      })
      .catch(function(err) {
        console.error(err);
      })

    return defer.promise;
  }














  this.getNames = function() {
    var defer = $q.defer();


    $http.get(baseUrl + 'people')
      .then(function(res) {
        return res.data.results;
      })
      .then(function(results) {
        var namesArr = results.map(function(person) {
          return person.name;
        })

        defer.resolve(namesArr);
        // defer.reject('Can\'t get names!')
      })

    return defer.promise;
  }
})