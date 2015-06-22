angular.module("FinalApp")
.controller("MainController",function($scope,$resource,PostResource){

	User = $resource("http://jsonplaceholder.typicode.com/users/:id",{id: "@id"});

	$scope.posts = PostResource.query();
	//query lo que hace es -Get/pots -> un arreglo de posts
	$scope.users = User.query();

	$scope.removePost = function(post){
		PostResource.delete({id: post.id},function(data){
			console.log(data);
		});
		$scope.posts = $scope.posts.filter(function(elemet){
			return elemet.id !== post.id;
		});
	}
})

.controller("PostController",function($scope,PostResource,$routeParams){

	$scope.post = PostResource.get({id: $routeParams.id});
})
.controller("NewPostController",function($scope,PostResource){
	$scope.post = {};
	$scope.title="Crear Post"
	$scope.savePost = function(){
		PostResource.save({data: $scope.post},function(data){
			console.log(data);
		});
	}
});
