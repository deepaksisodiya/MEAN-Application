/**
 * Created by deepak on 01/06/15.
 */

var app = angular.module('meanApp', ['ngResource']);

app.controller('usersController', ['$scope', '$resource', 'userService', function($scope, $resource, userService) {


    $scope.getUsers = function () {
        userService.query(function(users) {
            $scope.users = users;
        });
    };

    $scope.getUsers();

    $scope.addUser = function() {
        var user = new userService();
        user.name = $scope.newUserName;
        user.$save(function (user) {
            $scope.getUsers();
            $scope.newUserName = '';
        });
    };
    
    $scope.deleteUser = function (user) {
        var user = userService.delete({userId : user._id}, function(res) {
            $scope.getUsers();
        });
    };
    
    $scope.editUser = function (user) {
        $scope.user = user;
        $scope.editUserName = user.name;
    };

    $scope.changeUserName = function (editUserName) {
        userService.update({userId : $scope.user._id}, {name : editUserName}, function (res) {
            $scope.getUsers();
            $scope.editUserName = '';
        });
    };

}]);