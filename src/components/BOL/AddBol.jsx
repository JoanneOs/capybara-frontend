import { useState } from 'react'; // used to track submission state
import { useNavigate } from 'react-router-dom';
import { createBOL } from '../../utilities/bols-api';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // added for form state/validation
import * as Yup from 'yup'; // added for validation schema
import './AddBol.css';

// validation schema using yup
const bolSchema = Yup.object().shape({
  loadNumber: Yup.string().required('Load Number is required'),
  shipper: Yup.string().required('Shipper is required'),
  consignee: Yup.string().required('Consignee is required'),
  rate: Yup.number().required('Rate is required').min(0, 'Rate must be positive'),
  miles: Yup.number().min(0, 'Miles must be positive'),
  status: Yup.string().oneOf(['Pending', 'Paid', 'Disputed'], 'Invalid status'),
  image: Yup.mixed() // optional file input
    .nullable()
    .test('fileSize', 'File size must be less than 2MB', (value) => !value || value.size <= 2 * 1024 * 1024)
    .test('fileType', 'Invalid file type', (value) =>
      !value || ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type)
    ),
});

const AddBol = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // tracks loading state

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setIsSubmitting(true); // disable form while submitting
    try {
      const formData = new FormData(); // to send image and text together
      for (const key in values) {
        if (key === 'image' && values.image) {
          formData.append('image', values.image); // append image file
        } else if (key !== 'image') {
          formData.append(key, values[key]); // append text fields
        }
      }

      await createBOL(formData); // send form data to backend
      navigate('/bol'); // redirect after success
    } catch (error) {
      console.error('Error creating BOL:', error);
      setErrors({ submit: 'Failed to create BOL. Please check your input and try again.' }); // show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-bol">
      <h1>Add New Bill of Lading</h1>
      <Formik
        initialValues={{
          loadNumber: '',
          shipper: '',
          consignee: '',
          rate: '',
          miles: '',
          status: 'Pending',
          image: null, // added to support file upload
        }}
        validationSchema={bolSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, touched, errors, setFieldValue, handleBlur }) => (
          <Form>
            {/* text inputs with validation */}
            <div className="form-group">
              <label htmlFor="loadNumber">Load Number:</label>
              <Field type="text" id="loadNumber" name="loadNumber" value={values.loadNumber}
                onChange={handleChange} onBlur={handleBlur}
                className={touched.loadNumber && errors.loadNumber ? 'error' : ''}
              />
              <ErrorMessage name="loadNumber" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="shipper">Shipper:</label>
              <Field type="text" id="shipper" name="shipper" value={values.shipper}
                onChange={handleChange} onBlur={handleBlur}
                className={touched.shipper && errors.shipper ? 'error' : ''}
              />
              <ErrorMessage name="shipper" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="consignee">Consignee:</label>
              <Field type="text" id="consignee" name="consignee" value={values.consignee}
                onChange={handleChange} onBlur={handleBlur}
                className={touched.consignee && errors.consignee ? 'error' : ''}
              />
              <ErrorMessage name="consignee" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="rate">Rate ($):</label>
              <Field type="number" id="rate" name="rate" value={values.rate}
                onChange={handleChange} onBlur={handleBlur} min="0" step="0.01"
                className={touched.rate && errors.rate ? 'error' : ''}
              />
              <ErrorMessage name="rate" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="miles">Miles:</label>
              <Field type="number" id="miles" name="miles" value={values.miles}
                onChange={handleChange} onBlur={handleBlur} min="0"
                className={touched.miles && errors.miles ? 'error' : ''}
              />
              <ErrorMessage name="miles" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <Field as="select" id="status" name="status" value={values.status}
                onChange={handleChange} onBlur={handleBlur}
                className={touched.status && errors.status ? 'error' : ''}
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Disputed">Disputed</option>
              </Field>
              <ErrorMessage name="status" component="div" className="error-message" />
            </div>

            {/* file input for image */}
            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input
                type="file" id="image" name="image"
                onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
                onBlur={handleBlur}
                className={touched.image && errors.image ? 'error' : ''}
                accept="image/jpeg, image/jpg, image/png, application/pdf"
                />
              <ErrorMessage name="image" component="div" className="error-message" />
            </div>

            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create BOL'} {/* shows loading state */}
            </button>

            {errors.submit && <div className="error-message">{errors.submit}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBol;
