import * as React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'

import InputField from '../../atoms/input-field'
import FormSubmitBtn from '../../atoms/buttons/form-submit-btn'

import { createSession } from '../../../actions/users'

interface SignInFormProps {
  history: any // historyの型付け

  createSession: any
}

interface CreateSessionValues {
  email: string
  password: string
}

class SignInForm extends React.Component<SignInFormProps, {}> {
  render() {
    return (
      <div className="signin-form">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values: CreateSessionValues, actions: any) => {
            this.props.createSession(values.email, values.password)
            actions.setSubmitting(false)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <InputField
                type="email"
                name="email"
                placeholder="EMAIL ADRESS"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && errors.email}
              <InputField
                type="password"
                name="password"
                placeholder="PASSWORD"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && errors.password}
              <FormSubmitBtn label="SIGN IN" isSubmit={isSubmitting} />
            </form>
          )}
        </Formik>
      </div>
    )
  }
}

export default connect(
  null,
  { createSession }
)(SignInForm)
