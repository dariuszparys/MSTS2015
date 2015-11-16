(function() {
	
	"use strict";
	
	var canvas;
	var engine;
	
	var albums = [
		{ art: "assets/kill-em-all.jpg", x: -10, y: 2, z: 10 },
		{ art: "assets/ride-the-lightning.jpg", x: -3, y: 2, z: 10 },
		{ art: "assets/master-of-puppets.jpg", x: 3, y: 2, z: 10 },
		{ art: "assets/and-justice-for-all.jpg", x: 10, y: 2, z: 10 },
		{ art: "assets/metallica.jpg", x: -10, y: 2, z: -2 },
		{ art: "assets/load.jpg", x: -3, y: 2, z: -2 },
		{ art: "assets/reload.jpg", x: 3, y: 2, z: -2 },
		{ art: "assets/st-anger.jpg", x: 10, y: 2, z: -2 },
		{ art: "assets/death-magnetic.jpg", x: -10, y: 2, z: -13 }
	];
	
	document.addEventListener("DOMContentLoaded", initialize);	
	
	function initialize() {
		
		if(BABYLON.Engine.isSupported) {
			
			canvas = document.querySelector("#render");
			engine = new BABYLON.Engine(canvas, true);
			
			startUpScene();
			
		}
		
	}
	
	function startUpScene() {
		
		var scene = initScene();

		engine.runRenderLoop(function() {
			for( var n = 0; n < scene.meshes.length; n++ ) {
				if(scene.meshes[n].name !== "floor") {
					scene.meshes[n].rotation.y += 0.01;
				}
			}
			scene.render();
		});	
	}
	
	function initScene() {
		
		var scene = new BABYLON.Scene(engine);
		
		var material = new BABYLON.StandardMaterial("mattesRot", scene);
		material.specularColor = new BABYLON.Color3(0, 0, 0);
		material.diffuseColor = new BABYLON.Color3(1, 0, 0);
		
		var ground = BABYLON.Mesh.CreateGround( "floor", 40, 40, 2, scene);
		ground.material = material;
		
		var light1 = new BABYLON.PointLight("smallLight", new BABYLON.Vector3(0, 2, 5), scene);
		var light2 = new BABYLON.PointLight("smallLight", new BABYLON.Vector3(0, 2, -8), scene);
		var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(-10, 30, -10), new BABYLON.Vector3(0, -1, 0.2), 0.8, 10, scene);
		light0.diffuse = new BABYLON.Color3(1, 0, 0);
		light0.specular = new BABYLON.Color3(1, 1, 1);
		
		
		for( var n = 0; n < albums.length; n++ ) {
			var texture = new BABYLON.StandardMaterial("album" + (n + 1), scene);
			texture.diffuseTexture = new BABYLON.Texture(albums[n].art, scene);
			var cube = BABYLON.Mesh.CreateBox("cube" + (n + 1), 4, scene);
			cube.position = new BABYLON.Vector3(albums[n].x, albums[n].y, albums[n].z);
			cube.material = texture;
		}
		
		var camera = new BABYLON.FreeCamera("cam1", new BABYLON.Vector3(0, 3, -10), scene);
		camera.attachControl(canvas, true);
		
		return scene;
	}
	
})();
