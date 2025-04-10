import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import API from '../services/API';
import toast from 'react-hot-toast';

const CampaignSlider = ({ campaigns = [], userRole }) => {

  const sliderRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    slidesToShow: 1, // Ensure only one slide shown
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
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
    arrows: false,
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
      margin: '0 auto', // Add margin auto
      maxWidth: '1200px', // Control max width
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

  const handleInputChange = (field, value, nestedField = null, nestedValue = null) => {
    setFormData(prev => {
      if (nestedField && nestedValue) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [nestedField]: {
              ...prev[field][nestedField],
              [nestedValue]: value
            }
          }
        };
      } else if (nestedField) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [nestedField]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Format the data according to the required structure
      const volunteerData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        skills: formData.skills,
  
        status: 'active',
        documents: {
          idProof: formData.documents.idProof,
          certification: formData.documents.certification
        },
        organisation:"6614c218f88df5d7c73c4f92",

  

        availability: {
          available: true,
          availableDays: formData.availability.availableDays,
          availableHours: {
            start: formData.availability.availableHours.start,
            end: formData.availability.availableHours.end
          }
        }
      };

      const response = await API.post(`/campaigns/${selectedCampaign._id}/volunteers/add-contacts`, {
        volunteerContacts: [volunteerData]
      });
      
      if (response.data?.success) {
        toast.success('Volunteer added successfully!');
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
      }
    } catch (error) {
      console.error('Error adding volunteer:', error);
      toast.error(error.response?.data?.message || 'Failed to add volunteer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableSkills = [
    'First Aid',
    'CPR Certified',
    'Blood Collection',
    'Patient Care',
    'Vital Signs Monitoring',
    'Medical Record Keeping',
    'Emergency Response',
    'Phlebotomy',
    'Health Education',
    'Medical Equipment Operation',
    'Blood Pressure Monitoring',
    'Basic Life Support (BLS)',
    'Infection Control',
    'Sterilization Procedures',
    'Patient Communication'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
        maxWidth: '800px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <div className="border p-3 mb-3 rounded">
          <h3 className="mb-4">Add Volunteer</h3>
          <form onSubmit={handleSubmit} className="needs-validation">
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Volunteer Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              
              <div className="col-md-6">
                <label className="form-label">ID Proof URL</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://example.com/idproof.jpg"
                  value={formData.documents.idProof}
                  onChange={(e) => handleInputChange('documents', e.target.value, 'idProof')}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Certification URL</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://example.com/certificate.pdf"
                  value={formData.documents.certification}
                  onChange={(e) => handleInputChange('documents', e.target.value, 'certification')}
                  required
                />
              </div>
              
              <div className="col-12">
                <label className="form-label">Skills</label>
                <select
                  className="form-select mb-2"
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      setFormData({
                        ...formData,
                        skills: [...formData.skills, e.target.value]
                      });
                    }
                  }}
                >
                  <option value="">Select a skill to add</option>
                  {availableSkills
                    .filter(skill => !formData.skills.includes(skill))
                    .map(skill => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                </select>
                <div className="d-flex flex-wrap gap-2">
                  {formData.skills.map(skill => (
                    <span key={skill} className="badge bg-primary d-flex align-items-center">
                      {skill}
                      <button
                        type="button"
                        className="btn-close btn-close-white ms-2"
                        onClick={() => setFormData({
                          ...formData,
                          skills: formData.skills.filter(s => s !== skill)
                        })}
                      ></button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">Available Days</label>
                <div className="d-flex gap-2 flex-wrap">
                  {days.map(day => (
                    <div key={day} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={formData.availability.availableDays.includes(day)}
                        onChange={(e) => {
                          const updatedDays = e.target.checked
                            ? [...formData.availability.availableDays, day]
                            : formData.availability.availableDays.filter(d => d !== day);
                          setFormData({
                            ...formData,
                            availability: {
                              ...formData.availability,
                              availableDays: updatedDays
                            }
                          });
                        }}
                        id={`day-${day}`}
                      />
                      <label className="form-check-label" htmlFor={`day-${day}`}>
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Available Hours</label>
                <input
                  type="time"
                  className="form-control"
                  value={formData.availability.availableHours.start}
                  onChange={(e) => handleInputChange('availability', e.target.value, 'availableHours', 'start')}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">End Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={formData.availability.availableHours.end}
                  onChange={(e) => handleInputChange('availability', e.target.value, 'availableHours', 'end')}
                  required
                />
              </div>
            </div>
            <div className="mt-4 d-flex gap-2">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Adding...
                  </>
                ) : 'Add Volunteer'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

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
