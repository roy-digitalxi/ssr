import React from 'react';

// constants
import fonts from '../../../styles/fonts';

const PageTemplateTitle = ({ title }) => {
  const { titleContainerStyle, titleStyle } = styles;

  return (
    <div style={titleContainerStyle}>
      <p style={titleStyle}>{title}</p>
    </div>
  );
};

const styles = {
  titleContainerStyle: {
    marginBottom: 6,
    paddingLeft: 12,
    paddingRight: 12
  },
  titleStyle: {
    fontSize: fonts.h4,
    margin: 0
  }
};

export default PageTemplateTitle;
