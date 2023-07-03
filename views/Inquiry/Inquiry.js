import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';

import { InputField } from './components';

const validationSchema = yup.object({
  name: yup.string().required('Please enter a name'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Please enter a name'),
  message: yup.string().required('Please enter a message'),
});

const Inquiry = () => {
  const initialValues = {
    name: '',
    email: '',
    company: '',
    website: '',
    message: '',
  };
  const [alert, setAlert] = useState(false);

  const onSubmit = (values) => {
    const templateParams = {
      from_name: values.name,
      from_email: values.email,
      company: values.company,
      homepage: values.website,
      message: values.message,
    };
    emailjs
      .send(
        'service_vm5qekq',
        'template_aahmalk',
        templateParams,
        'user_N3aAXWjxNdbi4jQ6uZHv6',
      )
      .then(
        (response) => {
          setAlert(true);
          // toast.success('Sent successfully');
          console.log('SUCCESS!', response.status, response.text);
        },
        (err) => {
          toast.error(err.text);
          console.log('FAILED...', err);
        },
      );
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Container>
      <Collapse in={alert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mt: 5, width: '600px', mx: 'auto' }}
        >
          Email sent successfully!
        </Alert>
      </Collapse>
      <Box component="main" py={10}>
        <Box component="section">
          <Typography variant="h1" color="#00204c" textAlign="center">
            Contact us
          </Typography>
          <Typography variant="body1" textAlign="center">
            Drop us an inquiry below and our Sales Team will contact you
            accordingly.
          </Typography>
        </Box>
        <Box component="section" py={10}>
          <form onSubmit={formik.handleSubmit} className="inquiry-form">
            <InputField
              label="Name"
              name="name"
              placeholder="Full Name"
              height="55px"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              required
            />
            <InputField
              label="E-mail"
              name="email"
              placeholder="email@example.com"
              height="55px"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              required
            />
            <InputField
              label="Company's Name"
              name="company"
              placeholder="CHU HAI Company"
              height="70px"
              value={formik.values.company}
              onChange={formik.handleChange}
              helperText={formik.touched.company && formik.errors.company}
            />
            <InputField
              label="Company's website"
              name="website"
              placeholder="https://www.chuhaiand.com"
              height="55px"
              value={formik.values.website}
              onChange={formik.handleChange}
              helperText={formik.touched.website && formik.errors.website}
            />
            <InputField
              label="Message"
              name="message"
              placeholder="Message"
              height="140px"
              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
              required
            />
            <Button
              type="submit"
              variant="contained"
              className="inquiry-button"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Inquiry;
