(function() {
	
	"use strict";
	
	var canvas;
	var engine;
	var cube;
	
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
			scene.render();
		});	
	}
	
	function initScene() {
		
		var scene = new BABYLON.Scene(engine);
		
		var material = new BABYLON.StandardMaterial("mattesRot", scene);
		material.specularColor = new BABYLON.Color3(0, 0, 0);
		material.diffuseColor = new BABYLON.Color3(1, 0, 0);
		
		var texture = new BABYLON.StandardMaterial("album1", scene);
		texture.diffuseTexture = new BABYLON.Texture("assets/kill-em-all.jpg", scene);

		var ground = BABYLON.Mesh.CreateGround( "floor", 20, 20, 2, scene);
		ground.material = material;
		
		var light = new BABYLON.PointLight("smallLight", new BABYLON.Vector3(0, 2, 0), scene);
		
		cube = BABYLON.Mesh.CreateBox("cube1", 4, scene);
		cube.position = new BABYLON.Vector3(3, 2, 5);
		cube.material = texture;

		var camera = new BABYLON.FreeCamera("cam1", new BABYLON.Vector3(0, 3, -10), scene);
		camera.attachControl(canvas, true);
		
		return scene;
	}
	
})();
