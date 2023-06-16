import * as React from 'react'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'

const CustomTextField = (props) => {
  const { endAdornment, label, id, labelProps, value, handleChange, ...other } = props
  const [val, setVal] = React.useState('')

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        {label && (
          <label htmlFor={`outlined-adornment-fahrenheight-${id}`} {...labelProps}>
            {label}
          </label>
        )}
        <OutlinedInput
          id={`outlined-adornment-fahrenheight-${id}`}
          value={value || val}
          onChange={(e) => {
            handleChange(e)
            setVal(e.target.value)
          }}
          endAdornment={endAdornment && endAdornment}
          aria-describedby="outlined-fahrenheight-helper-text"
          inputProps={{
            'aria-label': 'fahrenheit',
          }}
          {...other}
        />
      </FormControl>
    </Box>
  )
}

export default CustomTextField
