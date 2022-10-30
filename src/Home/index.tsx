import { useState, useEffect, useRef} from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Image, SafeAreaView, ScrollView, TextInput, View } from 'react-native';

import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { PositionChoice } from '../components/PositionChoice';

import { styles } from './styles';
import { POSITIONS, PositionProps } from '../utils/positions';

export function Home() {
  const [positionSelected, setPositionSelected] = useState<PositionProps>(POSITIONS[0]);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [photo, setPhotoURI] = useState<null | string>(null);

  const cameraRef = useRef<Camera>(null);

   async function handleTakePicture() {
    const photo = await cameraRef.current.takePictureAsync();
    // console.log(photo);
    setPhotoURI(photo.uri);
  }

  useEffect(() => {
    Camera.requestCameraPermissionsAsync()
      .then(response => setHasCameraPermission(response.granted));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View>
          <Header position={positionSelected} />

          <View style={styles.picture}>

               {
              hasCameraPermission && !photo ?
                <Camera
                  ref={cameraRef}
                  style={styles.camera}
                  type={CameraType.front}
                /> :
                <Image
                  source={{ uri: photo ? photo : 'https://images.gutefrage.net/media/fragen/bilder/meine-kamera-auf-windows-10-funktioniert-nicht-was-tun/0_big.jpg?v=1584606917000' }}
                  style={styles.camera}
                />
            }
            <View style={styles.player}>
              <TextInput
                placeholder="Digite seu nome aqui"
                style={styles.name}
              />
            </View>
          </View>
        </View>

        <PositionChoice
          onChangePosition={setPositionSelected}
          positionSelected={positionSelected}
        />

        <Button title="Compartilhar" onPress={handleTakePicture} />
      </ScrollView>
    </SafeAreaView>
  );
}