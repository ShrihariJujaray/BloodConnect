import React from 'react';
import Form from '../../components/shared/Form/Form';
import { useSelector } from 'react-redux';
import { DNA } from 'react-loader-spinner';

const Register = () => {
  const { loading, error } = useSelector(state => state.auth);

  return (
    <>
      {error && <span>{alert(error)}</span>}
      <div className="register-container min-vh-100 d-flex justify-content-center align-items-center" style={{ 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
        padding: '20px'
      }}>
        <div className="card shadow-lg" style={{ 
          maxWidth: '1000px',
          width: '100%',
          overflow: 'hidden',
          borderRadius: '12px',
          border: 'none'
        }}>
          <div className="row g-0">
            {/* Left Side: Welcome Section */}
            <div className="col-md-3 bg-primary text-white d-flex flex-column justify-content-center align-items-center" style={{ 
              background: 'linear-gradient(45deg, #3a7bd5, #00d2ff)',
              padding: '2rem'
            }}>
              <div className="text-center mb-4">
                <img src="./assets/logo.png" className="logo-login" alt="Red Gold" style={{ 
                  maxWidth: '150px',
                  marginBottom: '20px'
                }} />
                <h3 className="fw-bold">Welcome</h3>
                <p>Join our community to access exclusive features and content</p>
              </div>
            </div>

            {/* Right Side: Form Section */}
            <div className="col-md-9 d-flex align-items-center justify-content-center">
              <div className="p-4 p-md-5 w-100">
                <h4 className="mb-4 text-center fw-bold">Create Account</h4>
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <DNA
                      visible={true}
                      height="150"
                      width="150"
                      ariaLabel="dna-loading"
                      wrapperStyle={{}}
                      wrapperClass="dna-wrapper"
                    />
                  </div>
                ) : (
                  <Form formTitle={""} submitBtn={"Register"} formType={'register'} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;