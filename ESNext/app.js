class MyObject {
	
	constructor() {
		// do something here
	}
	
	sayHello ()  {
		console.log("hello, world.");
	}
	
}


class AsyncDemo {
	
	httpGet(url) {
		return new Promise( (resolve, reject ) => {
			let request = new XMLHttpRequest();
			request.open("GET", url);
			
			request.onload = () => {
				if( request.status == 200 ) {
					resolve( request.response );
				} else {
					reject( Error( request.statustext ) );
				}
			};
			
			request.onerror = () => {
				reject( Error("Network error") );				
			};
			
			request.send();
		});
	}
	
	async function httpGetMSEdgeSite() {
		let url = "http://dev.microsoftedge.com";
		return await httpGet(url);
	}
	
}

document.addEventListener("DOMContentLoaded", () => {
	var obj = new MyObject();
	obj.sayHello();
	
	httpGetMSEdgeSite().then( ( response ) => {
		console.log( response );
	}).catch( ( error ) => {
		console.log( error );
	});
});