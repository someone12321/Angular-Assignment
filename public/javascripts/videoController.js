angular.module('youtubeApp')
	.controller("videoController",["$http","$scope","$timeout","ngProgressFactory",'$location',"$sce",function($http,$scope,$timeout,ngProgressFactory,$location,$sce){
		// console.log("hi");	
		$scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.start();
        $scope.progressbar.complete();
		// $scope.items1 = [1,2,3,4,5,6,7,8,9];


		$scope.link = $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+$location.path().slice(7));

		console.log($location.path().slice(7));


		$scope.youtube =[
            
            {"title": "Udta Punjab New Movie | Official Trailer | Diljit | Shahid | Alia Bhatt","link":'EJylz_9KYf8',"channelname": "BalajiMotionPictures" , "views":"6,521,127", "upload_date": "3 days ago"},
            {"title": "Sachin A Billion Dreams | Official Teaser | Sachin Tendulkar","link":'TamUy_PZzBM', "channelname": "2OO NOT OUT" , "views":"3,490,131", "upload_date": "5 days ago"},
            {"title": "Sultan Official Teaser | Salman Khan | Anushka Sharma","link":'vU6A1jpe5k8', "channelname": "YRF" , "views":"11,367,670", "upload_date": "9 days ago"},
            {"title": "TVF's Truth or Dare with Dad | Season 1 | Part 1 | Jeetu And Father","link":'tP-15bw-7og', "channelname": "TheViralFeverVideos" , "views":"1,162,455", "upload_date": "5 days ago"},
            {"title": "Iron Man meets Iron Lady (VO) - Captain America : Civil War","link":'qmV8vVIDA2c', "channelname": "Marvel FR" , "views":"1,164,698", "upload_date": "2 days ago"},
            {"title": "Traffic | Official Trailer | Realeasing on 6 th May (English / Hindi)","link":'IGXw0NMwcS8', "channelname": "FoxStarHindi" , "views":"1,324,473", "upload_date": "7 days ago"},
            {"title": "Marvel's Doctor Strange Teaser Trailer | Offical Trailer | Latest ","link":'Lt-U_t2pUHI', "channelname": "Marvel Entertainment" , "views":"14,690,987", "upload_date": "9 days ago"},
            {"title": "Game of Thrones Season 6: Event Promo (HBO) | Latest One Watch ","link":'Gfmt5y8jfeQ', "channelname": "GameofThrones" , "views":"1,060,111", "upload_date": "2 days ago"},

         
          {"title": "Shah Rukh Khan in Aap Ki Adalat 2016 (Full Episode)","link": "t_FyYz1pOVg", "channelname": "IndiaTV" , "views":"212,408", "upload_date": "4 days ago"},
            {"title": "EIC vs Bollywood: Introduction","link": "3JFfX71vnyQ", "channelname": "East India Comedy" , "views":"58,248", "upload_date": "1 days ago"},
            {"title": "North East On India #BeingIndian","link": "vQEEEISiE20","channelname": "BeingIndian" , "views":"195,990", "upload_date": "4 days ago"},
            {"title": "How Insensitive! - The Startup","link": "P35M1jN8_4c", "channelname": "Kanan Gill" , "views":"327,396", "upload_date": "6 days ago"},
            {"title": "LEMONADE Preview | HBO | Offical Released ","link": "ecJrJ4Thn9k", "channelname": "Beyonce" , "views":"2,754,813", "upload_date": "4 days ago"},
            {"title": "Jabra FAN Anthem Song | Shah Rukh Khan","link": "d4_szl5EEww", "channelname": "YRF" , "views":"24,858,506", "upload_date": "2 months ago"},   
            {"title": "Evolution of Bollywood Music - Penn Masala", "link":"lErtjguuvSw","channelname": "Penn Masala" , "views":"1,864,573", "upload_date": "1 month ago"},
            {"title": "Can you solve the frog riddle? - Derek Abbott","link": "cpwSGsb-rTs", "channelname": "TED-ed" , "views":"1,267,122", "upload_date": "2 month ago"}



             

         ];

		$scope.comments;
		$scope.comment;
		$scope.name;


		//Fucntion to post the comment
		$scope.postComment = function(){
			// console.log("@");
			var details = {
				"username" : $scope.name,
				"body" : $scope.comment,
				"upvote" : 0,
				"downvote" : 0
			};
			// Post request to insert the comment in the mongo 
			$http.post("/insert",details)
	         .success(function(data){
	         	console.log(data);
	         	$scope.fetch();
	         	$scope.name="";
	         	$scope.comment="";
	         })
	         .error(function(err){
	                 console.log(err);
	         });
		};

		//update the post upvote in the mongo as well as 
		//at the frontend
		$scope.upvote = function(index){
			console.log($scope.comments[index].upvote);
			$http.post("/upvote",{"id" : $scope.comments[index]._id,"upvote" : $scope.comments[index].upvote+1})
	         .success(function(data){
	         	$scope.fetch();
	         })
	         .error(function(err){
	                 console.log(err);
	         });
		};

		//update the post downvote in the mongo as well as 
		//at the frontend
		$scope.downvote = function(index){
			$http.post("/downvote",{"id" : $scope.comments[index]._id,"downvote" : $scope.comments[index].downvote+1})
	         .success(function(data){
	         	$scope.fetch();
	         })
	         .error(function(err){
	                 console.log(err);
	         });
		};


		//To fetch all the comments 
		$scope.fetch = function(){
			$http.get("/fetch")
	         .success(function(data){
	         	console.log(data);
	         	$scope.comments = data;
	         })
	         .error(function(err){
	                 console.log(err);
	         });
		};


		//This is to call the fetch function 
		//when the controller is loaded
		$timeout($scope.fetch);
	}])