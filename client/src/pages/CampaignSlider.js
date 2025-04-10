import React, { useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CampaignSlider = ({ campaigns = [] }) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false, // Change to false for better spacing
    centerPadding: '0px', // Remove center padding
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    arrows: false, // Hide default arrows
    pauseOnHover: true,
  };

  const sliderStyles = {
    container: {
      position: 'relative',
      margin: '0',
      padding: '40px 20px',
      background: '#f8f9fa',
      width: '100%',
      maxWidth: '100%', // Full width
    },
    navigationButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid #ddd',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    prevButton: {
      left: '20px',
    },
    nextButton: {
      right: '20px',
    },
    slide: {
      padding: '0 15px',
      height: '500px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    card: {
      width: '100%',
      height: '480px',
      maxWidth: '1000px', // Increased max-width
      margin: '0 auto',
      border: '1px solid #ddd',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
    },
    imageContainer: {
      height: '300px', // Increased height for better full-width appearance
      width: '100%',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
    },
    content: {
      padding: '20px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#333',
    },
    description: {
      fontSize: '0.875rem',
      color: '#666',
      marginBottom: '15px',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    info: {
      borderTop: '1px solid #eee',
      paddingTop: '15px',
      marginTop: 'auto',
    }
  };

  const goToPrevious = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  if (!campaigns.length) return null;

  return (
    <div className="slider-fullwidth-container">
      <div style={sliderStyles.container} className="campaign-slider-wrapper">
        <button 
          onClick={goToPrevious}
          style={{...sliderStyles.navigationButton, ...sliderStyles.prevButton}}
          className="nav-button prev"
          aria-label="Previous slide"
        >
          ←
        </button>
        
        <button 
          onClick={goToNext}
          style={{...sliderStyles.navigationButton, ...sliderStyles.nextButton}}
          className="nav-button next"
          aria-label="Next slide"
        >
          →
        </button>

        {/* <h2 className="text-center mb-4">Upcoming Campaigns</h2> */}
        <Slider ref={sliderRef} {...settings}>
          {campaigns.map((campaign) => (
            <div key={campaign._id} style={sliderStyles.slide}>
              <div style={sliderStyles.card}>
                <div style={sliderStyles.imageContainer}>
                  <img 
                    src={campaign.image} 
                    alt={campaign.title}
                    style={sliderStyles.image}
                    onError={(e) => {
                      e.target.src = '/default-campaign-image.jpg';
                    }}
                  />
                </div>
                <div style={sliderStyles.content}>
                  <div>
                    <h3 style={sliderStyles.title}>{campaign.title}</h3>
                    <p style={sliderStyles.description}>{campaign.description}</p>
                  </div>
                  <div style={sliderStyles.info}>
                    <p className="mb-2">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      {campaign.location.city}, {campaign.location.state}
                    </p>
                    <p className="mb-2">
                      <i className="far fa-calendar-alt me-2"></i>
                      {new Date(campaign.date).toLocaleDateString()}
                    </p>
                    <p className="mb-0">
                      <i className="fas fa-users me-2"></i>
                      {campaign.volunteerContacts.length} volunteers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CampaignSlider;
