import React, {useEffect, type ReactNode} from 'react';
import {BackHandler} from 'react-native';

interface AndroidBackButtonProps {
  children: ReactNode;
}

const AndroidBackButton: React.FC<AndroidBackButtonProps> = ({children}) => {
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => subscription.remove();
  }, []);

  return <>{children}</>;
};

export default AndroidBackButton;
