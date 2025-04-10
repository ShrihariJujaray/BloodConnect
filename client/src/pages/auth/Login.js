import React from 'react'
import Form from '../../components/shared/Form/Form'
import { useSelector } from 'react-redux'
import { DNA } from 'react-loader-spinner'
import toast from 'react-hot-toast'

const Login = () => {
  const { loading, error } = useSelector(state => state.auth)

  return (
    <>
      {error && toast.error(error)}
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          minHeight: '1vh',
          backgroundColor: '#f8f9fa',
          padding: '1rem'
        }}
      >
        <div className="col-11 col-sm-8 col-md-6 col-lg-4 bg-white p-2 rounded shadow">
          <h2 className="mb-4 fw-bold text-center text-danger">BLOOD CONNECT</h2>
          {loading ? (
            <div className="d-flex align-items-center justify-content-center">
              <DNA
                visible={true}
                height="200"
                width="200"
                ariaLabel="dna-loading"
              />
            </div>
          ) : (
            <Form
              formTitle={"Log In"}
              submitBtn={"Login"}
              formType={'login'}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Login
