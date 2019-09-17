
var table = new Array(13);
items_relation = [];
items_de = [0,0];
var jl = 0;
var zl = 0;

d3.json("https://raw.githubusercontent.com/tianshu-z/dataviz_AR-Goggles-Competitive-Analysis/master/data/ARglasses.json", function(error, data) {

	table = data;
	visualizing();

	var items=document.getElementsByClassName("initial");
	for (var i=0, l = items.length; i<l; i++){
			items[i].onclick = function (event) {
				relation(this.value, items);
				goggleinfo(this.value);
			};
	}

	// var gg = [];
	// gg = find_related(18, table);
	// console.log(gg[0]);
	// console.log(gg[1]);
});
			

//defining and visualizing relations
function relation(i, items){

	for (var j=0; j<jl; j+=2){
		items[items_relation[j]].classList.remove("highlight");
	}

	items_relation=[];
	items_relation=find_related(i, table);

	items[i].className += " highlight";
	jl = items_relation.length;

	// for (var j=0; j<jl; j+=2){
	// 	items[items_relation[j]].className += " highlight";
	// }

	// for (var z=items_de[0]; z<=items_de[1]; z++){
	// 	items[z].classList.remove("bright");
	// }

	// items_de=department_range(i);

	// for (var z=items_de[0]; z<=items_de[1]; z++){
	// 	items[z].className += " bright";
	// }
}

function goggleinfo(i) {
	$("#Goggle").html(table[i].B);
	var html = "<img src='"+table[i].A+"' alt='na' width='250px' class='symbol'>"
		+"</br></br>Company: </br>" + table[i].C + " | "+table[i].N
		+"</br></br> Key Features: </br>"+table[i].kFeature1+"</br>"+table[i].kFeature2+ "</br>"+table[i].kFeature3+"</br>"+table[i].kFeature4
		+"</br></br> <a href ='" + table[i].Homepage+ "'> Homepage </a>" + ' | ' 
		+"<a href ='" + table[i].Documentations+"'> Documentations </a>"
		+"</br></br> Product Line: </br>"+table[i].L1 + "  " + table[i].L1rT + "  " + table[i].L1p + "</br>" + table[i].L2 + "  " + table[i].L2rT + "  " + table[i].L2p + "</br>" + table[i].L3 + "  " + table[i].L3rT + "  " + table[i].L3p
	$("#GoggleInfo").html(html);
}

function visualizing(){
	var camera, scene, renderer;
	var controls;

	var objects = [];
	var targets = { table: [], sphere: [], helix: []/*, grid: [] */};

	init();
	animate();

	function init() {

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = 4000;

		scene = new THREE.Scene();

		// table

		for ( var i = 0; i < 13; i ++ ) {
			var div = document.createElement( 'div' );

				var button = document.createElement( 'button');
				button.className = 'initial';
				button.value = i;
				div.appendChild( button );

				var element = document.createElement( 'div' );
				element.className = 'element';
				element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 ) + ')';
				button.appendChild( element );

				var number = document.createElement( 'div' );
				number.className = 'number';
				number.textContent = table[i].B;
				element.appendChild( number );

				var symbol = document.createElement( 'img' );
				symbol.setAttribute('src', table[i].A);
            	symbol.setAttribute('alt', 'na');
            	symbol.setAttribute('width', '400px');
							symbol.className = 'symbol';
							document.body.appendChild(symbol);
							element.appendChild( symbol );

				var details = document.createElement( 'div' );
				details.className = 'details';
				details.innerHTML = table[ i ].B + ' | ' + table[ i ].C;
				element.appendChild( details );

				var object = new THREE.CSS3DObject( div );
				object.position.x = Math.random() * 400 - 200;
				object.position.y = Math.random() * 400 - 200;
				object.position.z = Math.random() * 4000 - 2000;
				scene.add( object );

				objects.push( object );

				var object = new THREE.Object3D();
				object.position.x = ( table[ i ].row * 450 ) - 1500;
				object.position.y = - ( table[ i ].col * 500 ) + 990;
				object.position.z = - ( table[ i ].row * 150 - table[ i ].col * 300 ) + 100;
				targets.table.push( object );


			}

			// sphere

			var vector = new THREE.Vector3();
			var spherical = new THREE.Spherical();

			for ( var i = 0, l = objects.length; i < l; i ++ ) {

				var phi = Math.acos( -1 + ( 2 * i ) / l );
				var theta = Math.sqrt( l * Math.PI ) * phi;

				var object = new THREE.Object3D();

				spherical.set( 1000, phi, theta );

				object.position.setFromSpherical( spherical );

				vector.copy( object.position ).multiplyScalar( 2 );

				object.lookAt( vector );

				targets.sphere.push( object );

			}

			// helix

			var vector = new THREE.Vector3();
			var cylindrical = new THREE.Cylindrical();

			for ( var i = 0, l = objects.length; i < l; i ++ ) {

				var theta = i * 0.6 + Math.PI;
				var y = - ( i * 120 ) + 700;

				var object = new THREE.Object3D();

				cylindrical.set( 800, theta, y );

				object.position.setFromCylindrical( cylindrical );

				vector.x = object.position.x * 2;
				vector.y = object.position.y;
				vector.z = object.position.z * 2;

				object.lookAt( vector );

				targets.helix.push( object );

			}

			// grid

			// for ( var i = 0; i < objects.length; i ++ ) {

			// 	var object = new THREE.Object3D();

			// 	object.position.x = ( ( i % 5 ) * 300 ) - 600;
			// 	object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 300 ) + 600;
			// 	object.position.z = ( Math.floor( i / 25 ) ) * 400 - 800;

			// 	targets.grid.push( object );

			// }


			//

			renderer = new THREE.CSS3DRenderer();
			renderer.setSize( window.innerWidth -500, window.innerHeight - 100 );
			document.getElementById( 'container' ).appendChild( renderer.domElement );

			//

			controls = new THREE.TrackballControls( camera, renderer.domElement );
			controls.rotateSpeed = 0.7;
			controls.minDistance = 300;
			controls.maxDistance = 6000;
			controls.addEventListener( 'change', render );

			var button = document.getElementById( 'table' );
			button.addEventListener( 'click', function ( event ) {

				transform( targets.table, 2000 );

			}, false );

			var button = document.getElementById( 'sphere' );
			button.addEventListener( 'click', function ( event ) {

				transform( targets.sphere, 2000 );

			}, false );

			var button = document.getElementById( 'helix' );
			button.addEventListener( 'click', function ( event ) {

				transform( targets.helix, 2000 );

			}, false );

			// var button = document.getElementById( 'grid' );
			// button.addEventListener( 'click', function ( event ) {

			// 	transform( targets.grid, 2000 );

			// }, false );

			transform( targets.table, 2000 );

			//


			window.addEventListener( 'resize', onWindowResize, false );

		}


		function transform( targets, duration ) {

			TWEEN.removeAll();

			for ( var i = 0; i < objects.length; i ++ ) {

				var object = objects[ i ];
				var target = targets[ i ];

				new TWEEN.Tween( object.position )
					.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
					.easing( TWEEN.Easing.Exponential.InOut )
					.start();

				new TWEEN.Tween( object.rotation )
					.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
					.easing( TWEEN.Easing.Exponential.InOut )
					.start();

			}

			new TWEEN.Tween( this )
				.to( {}, duration * 2 )
				.onUpdate( render )
				.start();

		}

		function onWindowResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth - 500, window.innerHeight - 100);

			render();

		}

		function animate() {

			requestAnimationFrame( animate );
			TWEEN.update();
			controls.update();

		}

		function render() {

			renderer.render( scene, camera );

		}

	}