//Siviwe Xakaza
//Face Recognition App

//Getting the file upload element

const file = document.getElementById('img');

//Loading all machine learning algorithms...i'll use Promise.all() to fetch them all at once

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(begin);

function begin(){
    //adding a container
    const container = document.createElement('div');
    container.style.position='relative';
    document.body.append(container);
     //Adding an event listener to the file element
     file.addEventListener('change', async ()=>{

        //extracting the image from the file element
        const image = await faceapi.bufferToImage(file.files[0]);
        container.append(image);

        //now i will resize the canvas to match the image
        const imgSize = {
            width: image.width,
            height: image.height
        }

        

        //create a canvas to draw on

        const canvas = faceapi.createCanvasFromMedia(image);
        faceapi.matchDimensions(canvas,imgSize);
        container.append(canvas);

        

        //detect faces
        const faces = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();

        //resize detectors

        const detectSize = faceapi.resizeResults(faces,imgSize);

        //Draw boxes

        detectSize.forEach(data=>{
            const box = data.detection.box;
            const pen = new faceapi.draw.DrawBox(box,{label: 'faces'});
            pen.draw(canvas);
        });


     });
}

//fetching faces

function fetch_faces(){
    const names = ['J Cole','Jay Z','Kendrick Lamar','Lil Wayne','Offset','Quavo'];

    return Promise.all(names.map(async name=>{
        
    }));
}