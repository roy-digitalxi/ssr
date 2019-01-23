import React, { Component } from 'react';

// components
import ThumbnailPage from './ThumbnailPage';
import DxModal from '../../../components/dxModal/DxModal';

// Libraries
import Slider from 'react-slick';

const displayNumber = 4;

class PageCarousel extends Component {
  state = {
    isModalOpen: false,
    targetPage: null
  };

  handleDeletePage = pageGUID => {
    this.setState({
      isModalOpen: true,
      pageGUID: pageGUID
    });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleConfirmDeleteCarouselPage = () => {
    const { pageGUID } = this.state;
    this.props.handleConfirmDeleteCarouselPage(pageGUID);
    this.handleCloseModal();
  };

  render() {
    const { experience } = this.props;
    let { Pages, NewPage } = experience;

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: displayNumber,
      slidesToScroll: displayNumber
    };

    const { mainContainerStyle } = styles;

    return (
      <div>
        {Pages.length > displayNumber ? (
          <Slider {...settings}>
            {Pages.map((page, index) => (
              <ThumbnailPage
                key={index}
                title={page.Title}
                active={page.PageGUID == NewPage.PageGUID ? true : false}
                page={page}
                isRoot={page.IsRoot}
                handleClickActivePage={() =>
                  this.props.handleClickActivePage(page.PageGUID)
                }
                handleDeletePage={() => this.handleDeletePage(page.PageGUID)}
              />
            ))}
          </Slider>
        ) : (
          <div style={mainContainerStyle}>
            {Pages.map((page, index) => (
              <ThumbnailPage
                key={index}
                title={page.Title}
                active={page.PageGUID == NewPage.PageGUID ? true : false}
                page={page}
                isRoot={page.IsRoot}
                handleClickActivePage={() =>
                  this.props.handleClickActivePage(page.PageGUID)
                }
                handleDeletePage={() => this.handleDeletePage(page.PageGUID)}
              />
            ))}
          </div>
        )}
        <DxModal
          open={this.state.isModalOpen}
          title="Confirm Delete Page"
          hasBottomDiv={true}
          description="Do you want to proceed?"
          cancel={true}
          confirm={true}
          isDanger={true}
          handleConfirm={() => this.handleConfirmDeleteCarouselPage()}
          onCloseModal={() => this.handleCloseModal()}
        />
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    cursor: 'default'
  }
};

export default PageCarousel;
