import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CampaignSlider = ({ campaigns = [], userRole }) => {

  const sliderRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    skills: [],
    documents: {
      idProof: '',
      certification: ''
    },
    availability: {
      available: true,
      availableDays: [],
      availableHours: {
        start: '',
        end: ''
      }
    }
  });

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
      overflow: 'visible', // Change from 'hidden' to 'visible'
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative', // Add this
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
      position: 'relative', // Add this
    },
    titleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
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
    },
    volunteerButton: {
      position: 'absolute',
      top: '-15px',
      right: '20px',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      zIndex: 10,
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      '&:hover': {
        backgroundColor: '#0056b3'
      }
    }
  };

  const goToPrevious = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const handleAddVolunteer = (campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post(`/campaigns/${selectedCampaign._id}/volunteers/add-contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ volunteerContacts: [formData] }),
      });
      
      if (response.ok) {
        setShowModal(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          organisation: '',
          skills: [],
          documents: {
            idProof: '',
            certification: ''
          },
          availability: {
            available: true,
            availableDays: [],
            availableHours: {
              start: '',
              end: ''
            }
          }
        });
        // Refresh campaigns data if needed
      }
    } catch (error) {
      console.error('Error adding volunteer:', error);
    }
  };

  const VolunteerModal = () => (
    <div className="modal" style={{
      display: showModal ? 'block' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      overflowY: 'auto'
    }}>
      <div className="modal-content" style={{
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px'
      }}>
        <h3>Add Volunteer</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={inputStyle}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            style={inputStyle}
          />
          <select
            multiple
            value={formData.skills}
            onChange={(e) => setFormData({...formData, skills: Array.from(e.target.selectedOptions, option => option.value)})}
            style={inputStyle}
          >
            <option value="First Aid">First Aid</option>
            <option value="Coordination">Coordination</option>
          </select>
          <div>
            <h4>Availability</h4>
            <select
              multiple
              value={formData.availability.availableDays}
              onChange={(e) => setFormData({
                ...formData,
                availability: {
                  ...formData.availability,
                  availableDays: Array.from(e.target.selectedOptions, option => option.value)
                }
              })}
              style={inputStyle}
            >
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <input
                type="time"
                value={formData.availability.availableHours.start}
                onChange={(e) => setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    availableHours: { ...formData.availability.availableHours, start: e.target.value }
                  }
                })}
                style={inputStyle}
              />
              <input
                type="time"
                value={formData.availability.availableHours.end}
                onChange={(e) => setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    availableHours: { ...formData.availability.availableHours, end: e.target.value }
                  }
                })}
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button type="submit" style={{...buttonStyle, backgroundColor: '#28a745'}}>
              Submit
            </button>
            <button type="button" onClick={() => setShowModal(false)} style={buttonStyle}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Add these styles
  const inputStyle = {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    color: 'white',
    backgroundColor: '#6c757d',
    cursor: 'pointer'
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
                    {(userRole === 'hospital' || userRole === 'organization') && (
                  <button
                    onClick={() => handleAddVolunteer(campaign)}
                    style={sliderStyles.volunteerButton}
                    className="volunteer-btn"
                  >
                    <i className="fas fa-user-plus me-2"></i>
                    Add Volunteer
                  </button>
                )}
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
      <VolunteerModal />
    </div>
  );
};

export default CampaignSlider;
