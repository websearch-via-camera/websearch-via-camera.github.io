import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
// import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';

export default function App() {
  // const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  // const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const [resized, setResized] = useState(false);

  // const [type, setType] = useState(Camera.Constants.Type.back);
  const [queries, setQueries] = useState(null);

  function makeButton(data) {
    const websearch = 'https://result.websearch-via-camera.com/en/'.concat(data);
    return (
      <TouchableOpacity style={{marginTop:20, marginBottom:20}} href={websearch}>
        <Button  title={data}>
        </Button>
        </TouchableOpacity>
    );
}

const PureCanvas = React.forwardRef((props, ref) => <canvas width={imageWidth} height={imageHeight} ref={ref} />);
const canvasRef = useRef();

useEffect(() => {
  console.log(resized);
  if (!image) return () => {};
  const ctx = canvasRef.current.getContext("2d");

  var img = new window.Image();
  if (resized) {
    img.onload = function() {
      canvasRef.current.width = imageWidth;
      canvasRef.current.height = imageHeight;
      ctx.drawImage(this, 0, 0, imageWidth ,imageHeight);
      upload();
    }
  } else {
    img.onload = function() {
      let newImageWidth = imageWidth;
      let newImageHeight = imageHeight;
      let ratio = 1;
      if (imageWidth > imageHeight) ratio = 500/imageWidth;
      if (imageWidth <= imageHeight) ratio = 500/imageHeight;

      newImageHeight = imageHeight * ratio;
      newImageWidth = imageWidth * ratio;

      canvasRef.current.width = newImageWidth;
      canvasRef.current.height = newImageHeight;
      setImageWidth(newImageWidth);
      setImageHeight(newImageHeight);
      ctx.drawImage(this, 0, 0, newImageWidth ,newImageHeight);
      setImage(canvasRef.current.toDataURL('image/jpeg'))
      setResized(true);
    }
  }
  img.src = image;
  return () => {};
}, [image]);

useEffect(() => {
    (async () => {
      // const  cameraStatus  = await Camera.requestCameraPermissionsAsync();
      // setHasCameraPermission(cameraStatus.status === 'granted');
      const  galleryStatus  = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted')
      //setHasGalleryPermission(True);
})();
  }, []);
// const takePicture = async () => {
//     if(camera){
//       const data = await camera.takePictureAsync(null);
//       //console.log(data.uri)
//       setImage(data.uri)
      
//     }
//   }
  
 
  function upload() {
    // let resized = resize();
    const url = `https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doVision`;

    fetch(url, {
          method: "POST",
          body: JSON.stringify({
              base64: `${image}`
            }),
          headers: {
              "Content-Type": "application/json"
          }
      })
      .then((response) => response.json())
      .then((data) => {
        // File uploaded successfully
        console.log(data);
        setQueries(data);
      })
      .catch((error) => {
        console.error('Error uploading the file:', error);
      });
    
  }
const removeImage = () => {
  setImage(null);
}
const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
});
console.log(result.width);
console.log(result.height);
// console.log(result.uri);
console.log(result.assets);
setImage(result.uri);
setImageWidth(result.width);
setImageHeight(result.height);
};

if (hasGalleryPermission === false) {
  return <View ><Text style={{padding:20}}>No access to photo gallery. </Text><TouchableOpacity href="https://websearch-via-camera.com"><Button title="Start over"></Button></TouchableOpacity></View>;
}  

// if (hasCameraPermission === false || hasGalleryPermission === false) {
//     return <View ><Text style={{padding:20}}>No access to camera. </Text><TouchableOpacity href="https://websearch-via-camera.com"><Button title="Start over"></Button></TouchableOpacity></View>;
// }


return (
  
    <View style={styles.container}>
      {!queries && !image && <Text style={{padding:20}}>GPT Vision can't assist with requests involving the search of images with people in them.</Text>}
      {/* {!queries && !image && 
      <View style={{marginLeft:10, marginRight:10}}>
        <Button
        title="Flip Camera"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}>
      </Button>
      </View>
      } */}
      {/* {!queries && !image && <View style={{margin:10}}><Button title="Take Picture" onPress={() => takePicture()} /></View>} */}
      {!queries && !image && <View style={{marginLeft:10, marginRight:10}}><Button title="Pick an Image From Gallery" onPress={() => pickImage()} /></View>}

      {/* {!queries && !image && 
      <View style={styles.cameraContainer}>
        <Camera 
          ref={ref => setCamera(ref)} 
          style={styles.camera} 
          type={type} 
          ratio={'1:1'} 
        />
      </View>
      } */}

      {!queries && image && <View><Spinner visible={true}/>
      <Text style={{padding:20}}> Your picture is being uploaded now and then GPT will take a minute or two. Please wait! </Text>}
       <PureCanvas ref={canvasRef} /> 
       </View>
       }
      {/* {!queries && image && <Button title="Reset" onPress={() => removeImage()} />} */}

      {queries && queries.length > 0 && queries.map(makeButton, this)}
      {queries && queries.length==0 && <View ><Text style={{padding:20}}>No results for this image. </Text><TouchableOpacity href="https://websearch-via-camera.com"><Button title="Start over"></Button></TouchableOpacity></View>}

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center'
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    flex: 1
  },
});
