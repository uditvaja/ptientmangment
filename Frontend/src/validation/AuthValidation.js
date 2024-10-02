import * as Yup from 'yup';

// Login Validation
export const loginValidationSchema = Yup.object({
  email: Yup.string()
  .email('Please enter a valid email address (e.g. example@example.com)')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

// forgot Password Validation
export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
  .email('Please enter a valid email address (e.g. example@example.com)')
    .required('Email is required')
});

// Otp Validation
export const otpValidationSchema = Yup.object().shape({
  otp: Yup.array()
    .of(
      Yup.string()
        .length(1, "Each OTP field must be 1 digit")
        .required("This field is required")
    )
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits"),
});

// Validation schema using Yup
export const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});