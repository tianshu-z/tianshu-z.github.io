<!DOCTYPE html>
<html>

	<head>
		<title>AR Goggles</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<link rel = 'stylesheet' href = 'style.css'>
		<link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet">

	</head>


	<body>
		<script src="build/three.js"></script>
		<script src="js/libs/tween.min.js"></script>
		<script src="js/controls/TrackballControls.js"></script>
		<script src="js/renderers/CSS3DRenderer.js"></script>
		<script src="build/d3.js"></script>
        <script src="build/d3.tip.js"></script>
        <script src="js/jquery-2.1.4.min.js"></script>
        <script src="relationship.js"></script>

		<div id="info">AR Goggles - Competitive Product Analysis</div>


		<div id = "index">

			<div id="content">
				<div id="Goggle"> <p>Select a Pair of Goggles</p></div>
	            <br>
				<div id="GoggleInfo"></div>            
        	</div>

			<div id="container"></div>
		</div>

		<div id="menu">

			<button class ="btn" id="table">table</button>
			<button class ="btn active" id="sphere">sphere</button>
			<button class ="btn" id="helix">helix</button>
			<!-- <button class ="btn" id="grid">GRID</button> -->

		</div>

		<script src="index.js"></script>

	</body>
</html>
