import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const NavItem = ({ title, items }) => {
  const theme = useTheme();
  const [activeLink, setActiveLink] = useState('');
  useEffect(() => {
    setActiveLink(window && window.location ? window.location.pathname : '');
  }, []);

  return (
    <Box>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>
      <Box marginBottom={2}>
        <Grid container>
          {items.map((p, i) => (
            <Grid item xs={12} key={i}>
              <Link
                variant="body2"
                component={'a'}
                href={p.href}
                color={activeLink === p.href ? 'primary' : 'text.primary'}
                sx={{
                  fontWeight: activeLink === p.href ? 600 : 400,
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.primary.dark,
                  },
                }}
              >
                {p.title}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

NavItem.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default NavItem;
