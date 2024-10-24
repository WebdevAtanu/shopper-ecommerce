import * as Yup from 'yup';

const loginValidation = Yup.object({
  email: Yup.string()
    .email('Invalid email format') // Optional: add email format validation
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required') 
    .min(8, 'Password must be at least 8 characters')
});

const signupValidation = Yup.object({
  email: Yup.string()
    .email('Invalid email format') // Optional: add email format validation
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required') 
    .min(8, 'Password must be at least 8 characters'),
  name: Yup.string()
  	.required('Name is required'),
  address: Yup.string()
  	.required('Address is required')
  	.min(10,'Give proper address'),
  phone: Yup.string()
    .required('Contact number is required')
    .min(10,'Invalid phone number')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')

});

export { loginValidation,signupValidation };
