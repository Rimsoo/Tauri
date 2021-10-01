const fs = window.__TAURI__.fs
const path = window.__TAURI__.path

const getAllFiles = function(dirPath) {
	
	const fileDiv = document.getElementById('browser')
	files = fs.readDir(dirPath)
	arrayOfFiles = []
	
	files.then(res => {
		res.forEach(file => {
			var tag = document.createElement("li");
			var text = document.createTextNode(file.name);
			tag.appendChild(text);
			fileDiv.appendChild(tag);
			console.log(tag)
		})
	})
}

getAllFiles("/Users/Rimso/Documents/Tauri/Tauri")
