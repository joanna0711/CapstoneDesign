import React, {useEffect, useRef } from 'react';

const WebcamComponent = () => {
    const videoRef = useRef(null);

    useEffect(()=>{
        const constraints = { video: true };

        navigator.mediaDevices.getUserMedia(constraints)
        .then((stream)=>{
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        }).catch((error)=> {
            console.error('Error on accessing webcam: '+error);
        });
    }, []);
    return(
        <div>
            <h1>webcam viewer</h1>
            <video ref = {videoRef} style={{width: '500px', height: 'auto'}} />
        </div>
    );
};

export default WebcamComponent;