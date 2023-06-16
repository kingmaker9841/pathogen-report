import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const CustomSelect = (props) => {
  const { label, options, labelProps, handleChange, value, ...other } = props
  const [val, setVal] = React.useState('')

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: '180px' }}>
        <label id={`mui-select-${label}`} {...labelProps}>
          {label}
        </label>
        <Select
          id={`mui-select-${label}`}
          value={value || val || ''}
          onChange={(e) => {
            handleChange(e)
            setVal(e.target.value)
          }}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          {...other}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default CustomSelect
