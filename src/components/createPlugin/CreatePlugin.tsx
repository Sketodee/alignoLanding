import axiosInstance from '../../utils/auth';
import { CreatePluginForm } from './CreatePluginForm';
import { useState } from 'react';

const About = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formKey, setFormKey] = useState(Date.now()); // key to re-render form

  const handleFormSubmit = async (formData:any) => {
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    console.log('Form data submitted:', formData);

    try {
      const res = await axiosInstance.post('/plugin/createplugin', formData);

      if (res.status !== 200) {
        throw new Error(res.data?.message || 'Failed to create plugin');
      }

      console.log('Plugin created successfully:', res.data);
      setSubmitSuccess(true);
      setFormKey(Date.now()); // trigger form reset by re-rendering the form

    } catch (error: any) {
      console.error('Error creating plugin:', error);
      setSubmitError(
        error.response?.data?.message || 'An error occurred while creating the plugin'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      {submitSuccess && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Success!</span>
            <span className="ml-1">Plugin created successfully.</span>
          </div>
        </div>
      )}

      {submitError && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Error:</span>
            <span className="ml-1">{submitError}</span>
          </div>
        </div>
      )}

      {isSubmitting && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
          <div className="flex items-center">
            <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Creating plugin...</span>
          </div>
        </div>
      )}

      {/* Key forces form to reset */}
      <CreatePluginForm key={formKey} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default About;
