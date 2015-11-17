class MyObject {
	
	constructor() {
		// do something here
	}
	
	sayHello ()  {
		console.log("hello, world.");
	}
	
}

function sleep(ms) {
	return new Promise( (resolve) => {
		setTimeout( () => {
			resolve();
		}, ms);
	});	
};
	
async function sleepForSeconds( seconds ) {
	let milliSeconds = seconds * 1000;
	return await sleep( milliSeconds );
};

class GeneratorDemo {
	
	* speakers() {
		yield "Dariusz Parys";
		yield "Daniel Meixner";
		yield "Christian Binder";
		yield "Marco Richardson";
		yield "Christian Weyer";
	};

	* [Symbol.iterator] () {
		yield "Dariusz Parys";
		yield "Daniel Meixner";
		yield "Christian Binder";
		yield "Marco Richardson";
		yield "Christian Weyer";		
	}	
};
	
document.addEventListener("DOMContentLoaded", () => {
	
	// Demo Classes
	var obj = new MyObject();
	obj.sayHello();
	
	// Demo Promises and Async/Await
	sleepForSeconds(2).then( () => {
		console.log("It works");
	})
		
	let waiting = async () => await sleep( 4000 ).then( () => { console.log( "4 seconds" )});
	waiting();
	
	
	// Demo Generators
	let generatorDemo = new GeneratorDemo();

	let speakersGen = generatorDemo.speakers();
	console.log(`Speaker: ${speakersGen.next().value}`);
	console.log(`Speaker: ${speakersGen.next().value}`);
	console.log(`Speaker: ${speakersGen.next().value}`);
		
	for( var name of new GeneratorDemo()) {
		console.log(`Speaker: ${name}`);
	}
	
	
	
});