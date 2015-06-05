/**
 * Created by deepak on 01/06/15.
 */

var app = angular.module('meanApp', ['ngResource']);

app.controller('usersController', ['$scope', '$resource', function($scope, $resource) {

    var users = $resource('/users');

    $scope.getUsers = function () {
        users.query(function(users) {
            $scope.users = users;
        });
    };

    $scope.getUsers();

    $scope.addUser = function() {
        var user = new users();
        user.name = $scope.userName;
        user.$save(function (user) {
            $scope.getUsers();
        });
        $scope.userName = '';
    };
    
    $scope.deleteUser = function (user) {
        var User = $resource('/users/:name', {name:'@name'});

        var user = User.delete({name:user.name}, function(res) {
            $scope.getUsers();
        });
    };
    
    $scope.editUser = function (user) {
        $scope.user = user;
        $scope.newUserName = user.name;
    };

    $scope.changeUserName = function (newUserName) {
        var updateUser = $resource('users/:name', {name : '@name'}, {
            update : {
                method : 'PUT'
            }
        });
        updateUser.update({name : $scope.user.name}, {name : newUserName}, function (res) {
            $scope.getUsers();
            $scope.newUserName = '';
        });
    }

}]);