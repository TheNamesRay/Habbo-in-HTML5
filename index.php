<!DOCTYPE html>
<html ng-app="Habbo">
	<head>
		<meta charset="utf-8">
		<base href="/">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>Habbo</title>
		<link rel="shortcut icon" href="favicon.ico">
		<link rel="stylesheet" href="assets/css/game.css">
	</head>
	<body ng-controller="MainController">
		<script>
			var clientVars = {
				host: '185.25.197.210',
				port: '7858',
		sso: '<?php echo isset($_GET["sso"]) ? $_GET["sso"] : "abc"; ?>'
		};
		</script>
		<div id="hotel-view-faststats" class="ng-hide" ng-show="isBootstrapped">
			<ul id="hotel-view-faststats-stats">
				<li class="diamonds">{{ userinfo.diamonds | limitTo:5 }} <i class="icon diamonds"></i></li>
				<li class="credits">{{ userinfo.credits | limitTo: 5 }}<i class="icon credits"></i></li>
				<li class="duckets">{{ userinfo.duckets | limitTo:5 }} <i class="icon duckets"></i></li>
			</ul>
			<span id="hotel-view-faststats-hc" ng-click="hcWindow.enabled = true">
				<i class="icon hc"></i>
				<p>Join</p>
			</span>
			<ul id="hotel-view-faststats-buttons">
				<li><a class="window-manager-button blue">Help</a></li>
				<li ng-click="logout()"><a class="window-manager-button red"><i class="icon logout"></i></a></li>
				<li><a class="window-manager-button purple"><i class="icon settings"></i></a></li>
			</ul>
		</div>
		<div class="dialog alert ng-hide" ng-draggable ng-show="dialog.enabled && isBootstrapped">
			<div class="title">{{ dialog.title }}</div>
			<p>{{ dialog.body }}</p>
			<div class="bottom">
				<a class="button" ng-click="dialog.enabled = false">OK</a>
			</div>
		</div>
		<div class="dialog ng-hide" ng-draggable id="hc-window" ng-show="hcWindow.enabled && isBootstrapped">
			<div class="title"><a class="close" ng-click="hcWindow.enabled = false"></a>Purchase HC</div>
			<div id="hc-window-rag"></div>
			<h1>Stand Out From The Crowd</h1>
			<div id="hc-window-benefits">
				<div id="hc-window-benefits-image"></div>
				<span><h1>Create</h1><p>Your own groups and awesome rooms!</p></span>
				<span><h1>Show Off</h1><p>Your style with exclusive clothing and hairstyles!</p></span>
			</div>
			<div id="hc-window-bean">
				<h1><img src="assets/images/hotelview/hcWindow/hc_icon.png"> 1 month</h1>
				<div>
					<a class="button green" ng-click="buyHabboClub()">Buy</a>
					<span id="hc-window-bean-credits">25 <img src="assets/images/hotelview/hcWindow/credit.png"></span>
				</div>
			</div>
			<div class="bottom">
				<p><strong>What You Get:</strong> HC Badge, 2-colored clothing, extra hairstyles, additional room layouts, exclusive Furniture gifts, ability to create your own Groups, more friends on your list and more!</p>
			</div>
		</div>



		<div class="dialog ng-hide" ng-draggable id="navigator-window" ng-show="navigatorWindow.enabled && isBootstrapped">
			<div class="title"><a class="close" ng-click="navigatorWindow.enabled = false"></a>Navigator</div>

		</div>



		<div id="hotel-view-bar" class="ng-hide" ng-show="isBootstrapped">
			<div id="hotel-view-bar-icons">
				<div id="hotel-view-bar-more" ng-class="{ flip: !superfluousBarItems }" ng-click="toggleSuperfluousBarItems()" >
					<img src="assets/images/hotelview/barIcons/arrow.png">
				</div>
				<span id="hotel-view-bar-icon-house" ng-if="superfluousBarItems && !isInRoom" ng-click="enterRoom()"></span>
				<span id="hotel-view-bar-icon-h" ng-if="superfluousBarItems && isInRoom" ng-click="leaveRoom()"></span>
				<span id="hotel-view-bar-icon-rooms" ng-if="superfluousBarItems" ng-click="featureNotImplemented()"></span>
				<span id="hotel-view-bar-icon-catalogue" ng-click="featureNotImplemented()"></span>
				<span id="hotel-view-bar-icon-bc" ng-click="featureNotImplemented()"></span>
				<span id="hotel-view-bar-icon-inventory" ng-if="!superfluousBarItems" ng-click="featureNotImplemented()"></span>
				<span id="hotel-view-bar-icon-user" ng-click="featureNotImplemented()">
					<img src="https://www.habbo.com.tr/habbo-imaging/avatarimage?figure={{ userinfo.figure }}&size=n&direction=2&head_direction=2&crr=3&gesture=sml&frame=3">
				</span>
			</div>
			<div id="hotel-view-bar-friends">
				<div id="hotel-view-bar-friends-icons">
					<span class="hotel-view-bar-friends-icon-all" ng-click="featureNotImplemented()"></span>
					<span class="hotel-view-bar-friends-icon-search" ng-click="featureNotImplemented()"></span>
				</div>
				<div class="hotel-view-bar-friends-slots" ng-if="superfluousFriendBarItems">
					<div class="hotel-view-bar-friends-slot no-friends" ng-click="featureNotImplemented()">
						<img src="assets/images/hotelview/barIcons/friend_head.png">
						Find new <br>friends
					</div>
					<div class="hotel-view-bar-friends-slot no-friends" ng-click="featureNotImplemented()">
						<img src="assets/images/hotelview/barIcons/friend_head.png">
						Find new <br>friends
					</div>
					<div class="hotel-view-bar-friends-slot no-friends" ng-click="featureNotImplemented()">
						<img src="assets/images/hotelview/barIcons/friend_head.png">
						Find new <br>friends
					</div>
				</div>
				<div id="hotel-view-bar-friends-more" class="flip" ng-class="{ flip: superfluousFriendBarItems }" ng-click="toggleSuperfluousFriendBarItems()" >
					<img src="assets/images/hotelview/barIcons/arrow.png">
				</div>
			</div>
		</div>
		<div id="game" ng-view></div>
		<script src="assets/js/dependencies.js" type="text/javascript"></script>
		<script src="assets/js/ng.js" type="text/javascript"></script>
		<script src="assets/js/ng-route.js" type="text/javascript"></script>
		<script src="assets/js/io.js" type="text/javascript"></script>
		<script src="assets/js/client.js" type="text/javascript"></script>
		<script src="assets/js/sockets.js" type="text/javascript"></script>
		<script src="assets/js/directives/ng-draggable.js" type="text/javascript"></script>
		<script src="assets/js/handlers/rooms/roomHandler.js" type="text/javascript"></script>
		<script src="assets/js/handlers/rooms/userHandler.js" type="text/javascript"></script>
		<script src="assets/js/controllers/main.js" type="text/javascript"></script>
		<script src="assets/js/controllers/splash.js" type="text/javascript"></script>
		<script src="assets/js/controllers/view.js" type="text/javascript"></script>
		<script src="assets/js/controllers/room.js" type="text/javascript"></script>
	</body>
</html>