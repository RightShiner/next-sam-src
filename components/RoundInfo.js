import Box from '@mui/material/Box';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import {styled} from '@mui/material/styles';

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgba(0, 0, 0, 0.8)'
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
}));

export default function RoundInfo({caption, ...rest}) {
  return (
    <Box>
      {caption ? (
        <BootstrapTooltip title={caption} placement="top">
          <Box {...rest}>
            <Box className='round-info'>
              <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" className="tooltip-comp_icon_37Hup">
                <circle cx="8" cy="8" r="8" className="circle"></circle>
                <path d="M7.2 11.2c0 .44.36.8.8.8a.8.8 0 0 0 .8-.8V8a.8.8 0 0 0-.8-.8.8.8 0 0 0-.8.8v3.2zM8.8 4H7.2v1.6h1.6V4z" className="i"></path>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM8 1.6a6.4 6.4 0 1 1 0 12.8A6.4 6.4 0 0 1 8 1.6z" className="outline"></path>
              </svg>
            </Box>
          </Box>
        </BootstrapTooltip>
      ) : (
        <Box {...rest}>
          <Box className='round-info'>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" className="tooltip-comp_icon_37Hup">
              <circle cx="8" cy="8" r="8" className="circle"></circle>
              <path d="M7.2 11.2c0 .44.36.8.8.8a.8.8 0 0 0 .8-.8V8a.8.8 0 0 0-.8-.8.8.8 0 0 0-.8.8v3.2zM8.8 4H7.2v1.6h1.6V4z" className="i"></path>
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM8 1.6a6.4 6.4 0 1 1 0 12.8A6.4 6.4 0 0 1 8 1.6z" className="outline"></path>
            </svg>
          </Box>
        </Box>
      )}
    </Box>
  );
};