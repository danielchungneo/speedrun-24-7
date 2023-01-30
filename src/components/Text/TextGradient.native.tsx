import React from 'react';
import MaskedView from '@react-native-community/masked-view';

const TextGradient = ({ content, children }) => {
  //
  return (
    <MaskedView maskElement={content}>
      {content}

      {children}
    </MaskedView>
  );
};

export default React.memo(TextGradient);
