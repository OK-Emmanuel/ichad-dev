import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FileUpload from '../FileUpload';

const FormBuilder = ({ 
  fields, 
  initialValues, 
  onSubmit, 
  validationSchema,
  submitLabel = 'Submit'
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, setFieldValue, isSubmitting }) => (
        <Form className="space-y-6">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              
              {field.type === 'file' ? (
                <FileUpload
                  accept={field.accept}
                  maxSize={field.maxSize}
                  onFileSelect={(file) => setFieldValue(field.name, file)}
                />
              ) : field.type === 'textarea' ? (
                <Field
                  as="textarea"
                  name={field.name}
                  rows={field.rows || 4}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors[field.name] && touched[field.name] ? 'border-red-500' : ''
                  }`}
                />
              ) : field.type === 'select' ? (
                <Field
                  as="select"
                  name={field.name}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors[field.name] && touched[field.name] ? 'border-red-500' : ''
                  }`}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
              ) : (
                <Field
                  type={field.type}
                  name={field.name}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors[field.name] && touched[field.name] ? 'border-red-500' : ''
                  }`}
                />
              )}
              
              {errors[field.name] && touched[field.name] && (
                <div className="text-red-500 text-sm mt-1">
                  {errors[field.name]}
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : submitLabel}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormBuilder; 