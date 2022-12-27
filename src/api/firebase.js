import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCkHSXYyLpPCSbNquRv9nQRzXGxvODGxfs',
    authDomain: 'plant-seeds-home.firebaseapp.com',
    projectId: 'plant-seeds-home',
    storageBucket: 'plant-seeds-home.appspot.com',
    messagingSenderId: '808607833641',
    appId: '1:808607833641:web:06969ea051e791766e0638',
    measurementId: 'G-ZFQ3MP365C',
};

const app = initializeApp(firebaseConfig);

const handleUpload = (image, setURL) => {
    const storage = getStorage(app, 'gs://plant-seeds-home.appspot.com');
    const metadata = {
        contentType: 'image/jpeg',
    };
    const storageRef = ref(storage, `/images/${image?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default:
                    console.log('DONE');
            }
        },
        (error) => {
            switch (error.code) {
                case 'storage/unauthorized':
                    console.log('err unauthorized', error);
                    break;
                case 'storage/canceled':
                    console.log('err canceled', error);
                    break;

                case 'storage/unknown':
                    console.log('err unknown', error);
                    break;
                default:
                    console.log('err', error);
            }
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setURL(downloadURL);
            });
        },
        console.log('URLL', URL),
    );
};
export default handleUpload;
