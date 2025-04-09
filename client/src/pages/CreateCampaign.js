import React, { useState } from 'react';
import Layout from '../components/shared/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import API from '../services/API';
import toast from 'react-hot-toast';

const CreateCampaign = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        volunteers: []
    });
    const [volunteerForms, setVolunteerForms] = useState([{
        name: '',
        email: '',
        phone: '',
        skills: [],
        documents: {
            idProof: '',
            certification: ''
        },
        status: 'active',
        availability: {
            available: true,
            availableDays: [],
            availableHours: {
                start: '',
                end: ''
            }
        }
    }]);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/api/campaign/createcampaign', { ...formData, volunteers: volunteerForms });
            if (response.data?.success) {
                toast.success('Campaign created successfully');
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Error creating campaign');
        }
    };

    const handleVolunteerChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const updatedForms = [...volunteerForms];
        
        if (name === 'skills') {
            if (!updatedForms[index].skills.includes(value)) {
                updatedForms[index].skills = [...updatedForms[index].skills, value];
            }
        } else if (name === 'removeSkill') {
            updatedForms[index].skills = updatedForms[index].skills.filter(skill => skill !== value);
        } else if (name.startsWith('availableDays')) {
            const day = value;
            updatedForms[index].availability.availableDays = checked 
                ? [...updatedForms[index].availability.availableDays, day]
                : updatedForms[index].availability.availableDays.filter(d => d !== day);
        } else if (name.startsWith('hours.')) {
            const timeField = name.split('.')[1];
            updatedForms[index].availability.availableHours[timeField] = value;
        } else if (name.startsWith('documents.')) {
            const docField = name.split('.')[1];
            updatedForms[index].documents[docField] = value;
        } else {
            updatedForms[index][name] = value;
        }
        
        setVolunteerForms(updatedForms);
    };

    const addVolunteerForm = () => {
        setVolunteerForms([...volunteerForms, {
            name: '',
            email: '',
            phone: '',
            skills: [],
            documents: {
                idProof: '',
                certification: ''
            },
            status: 'active',
            availability: {
                available: true,
                availableDays: [],
                availableHours: {
                    start: '',
                    end: ''
                }
            }
        }]);
    };

    const removeVolunteerForm = (index) => {
        setVolunteerForms(volunteerForms.filter((_, i) => i !== index));
    };

    return (
        <Layout>
            <div className="container mt-4">
                <h2 className="text-center mb-4">Create Blood Donation Campaign</h2>
                <div className="card">
                    <div className="card-body" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Campaign Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="3"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Time</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5>Volunteers</h5>
                                    <button 
                                        type="button" 
                                        className="btn btn-success"
                                        onClick={addVolunteerForm}
                                    >
                                        <i className="fa fa-plus"></i> Add Another Volunteer
                                    </button>
                                </div>

                                {volunteerForms.map((volunteer, index) => (
                                    <div key={index} className="border p-3 mb-3 rounded">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6>Volunteer #{index + 1}</h6>
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => removeVolunteerForm(index)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Volunteer Name"
                                                    name="name"
                                                    value={volunteer.name}
                                                    onChange={(e) => handleVolunteerChange(index, e)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    name="email"
                                                    value={volunteer.email}
                                                    onChange={(e) => handleVolunteerChange(index, e)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    placeholder="Phone"
                                                    name="phone"
                                                    value={volunteer.phone}
                                                    onChange={(e) => handleVolunteerChange(index, e)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label">Skills</label>
                                                <div className="mb-2">
                                                    <select
                                                        className="form-select"
                                                        name="skills"
                                                        value=""
                                                        onChange={(e) => handleVolunteerChange(index, e)}
                                                    >
                                                        <option value="">Select a skill to add</option>
                                                        {availableSkills
                                                            .filter(skill => !volunteer.skills.includes(skill))
                                                            .map(skill => (
                                                                <option key={skill} value={skill}>
                                                                    {skill}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {volunteer.skills.map(skill => (
                                                        <span 
                                                            key={skill} 
                                                            className="badge bg-primary d-flex align-items-center"
                                                            style={{ fontSize: '0.9em', padding: '0.5em 1em' }}
                                                        >
                                                            {skill}
                                                            <button
                                                                type="button"
                                                                className="btn-close btn-close-white ms-2"
                                                                style={{ fontSize: '0.7em' }}
                                                                onClick={() => handleVolunteerChange(index, {
                                                                    target: { name: 'removeSkill', value: skill }
                                                                })}
                                                            ></button>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="ID Proof URL"
                                                    name="documents.idProof"
                                                    value={volunteer.documents.idProof}
                                                    onChange={(e) => handleVolunteerChange(index, e)}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Certification URL"
                                                    name="documents.certification"
                                                    value={volunteer.documents.certification}
                                                    onChange={(e) => handleVolunteerChange(index, e)}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label">Available Days</label>
                                                <div className="d-flex gap-2 flex-wrap">
                                                    {days.map(day => (
                                                        <div key={day} className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                name="availableDays"
                                                                value={day}
                                                                checked={volunteer.availability.availableDays.includes(day)}
                                                                onChange={(e) => handleVolunteerChange(index, e)}
                                                                id={`day-${day}-${index}`}
                                                            />
                                                            <label className="form-check-label" htmlFor={`day-${day}-${index}`}>
                                                                {day}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="time"
                                                    className="form-control"
                                                    name="hours.start"
                                                    value={volunteer.availability.availableHours.start}
                                                    onChange={(e) => handleVolunteerChange(index, e)}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="time"
                                                    className="form-control"
                                                    name="hours.end"
                                                    value={volunteer.availability.availableHours.end}
                                                    onChange={(e) => handleVolunteerChange(index, e)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Create Campaign with {volunteerForms.length} Volunteer{volunteerForms.length > 1 ? 's' : ''}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCampaign;
