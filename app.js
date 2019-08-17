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
        document.body.append(image);

        //detect faces
        const faces = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();


     });
}