const fs = window.__TAURI__.fs
const path = window.__TAURI__.path
const win = window.__TAURI__.window

function getFilePath(file) {
	return file.substring(0, file.lastIndexOf("/"))
}

function readFile(filePath)
{
	monaco.editor.getModels().forEach(model => model.dispose())
	fs.readTextFile(filePath).then(res => {
		const model = monaco.editor.createModel(
		  res,
		  undefined, 
		  monaco.Uri.file(filePath) 
		)
		
		editor.setModel(model)
	  })
}

const getAllFiles = function(dirPath) {
	document.getElementById("browser").innerHTML = ""

	const fileDiv = document.getElementById('browser')
	const upSide = document.createElement("li")

	upSide.appendChild(document.createTextNode("../"))
	upSide.addEventListener('click', event => {
		getAllFiles(getFilePath(dirPath))
	  })

	fileDiv.appendChild(upSide)
	files = fs.readDir(dirPath)
	
	files.then(res => {
		res.forEach(file => {
			var tag = document.createElement("li")
			var text = document.createTextNode(file.name)
			if(file.children)
			{
				text.nodeValue += "/"
				tag.addEventListener('click', () => getAllFiles(file.path))
			}
			else
			{
				tag.addEventListener('click', event => 	{
					if(event.shiftKey)
						new win.WebviewWindow(file.name, { url: 'index.html?file='+file.path  })
					else
						readFile(file.path)
				})
			}
			tag.appendChild(text)
			fileDiv.appendChild(tag)
		})
	})
}

const urlParams = new URLSearchParams(window.location.search);
if(urlParams.get('file'))
{
	getAllFiles(getFilePath(urlParams.get('file')))
	readFile(urlParams.get('file'))
}	
else
	path.homeDir().then(res => getAllFiles(res))