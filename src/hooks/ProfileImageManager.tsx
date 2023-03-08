import {useContext} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {AuthContext} from '../context/AuthContext';

const useProfileImageManager = () => {
  const {updateProfilePic} = useContext(AuthContext);

  const pickPic = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 0.5},
      ({assets, didCancel}) => {
        //este array nunca tiene más de una posicion
        if (didCancel) return;
        if (assets) {
          updateProfilePic(assets[0]);
        }
      },
    );
  };

  return {pickPic};
};

export default useProfileImageManager;
