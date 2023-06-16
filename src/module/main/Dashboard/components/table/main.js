import React from 'react'
import { columns } from '@module/main/Dashboard/components/columns'
// import { process } from '@module/main/Dashboard/components/process'
import { Typography, Box } from '@mui/material'
import { useTheme } from '@emotion/react'
import ActionBtns from '@module/main/Dashboard/components/action/buttons'
import AddIcon from '@mui/icons-material/Add'
import Checkbox from '@mui/material/Checkbox'
import CustomModal from '@components/modal/Modal'
import CustomSelect from '@components/select/Select'
import CustomTextField from '@components/textfield/TextField'
import DeleteIcon from '@mui/icons-material/Delete'
import nextId from 'react-id-generator'
import rows from '@src/data/bioHazardData.json'
import styled from '@emotion/styled'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import process from '@src/data/process.json'

const style = {
  adornment: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(400%, -50%)',
    right: '-150%'
  },
  table: {
    borderCollapse: 'separate',
    maxWidth: '1920px',
    margin: '0 auto',

  },
  stickyHeader: {
    position: 'sticky',
    right: '0px',
    borderLeft: '1px solid #D2D6DB'

  },
  stickyCell: {
    position: 'sticky',
    right: 0,
    background: '#F5F5F5',
    zIndex: 1000,
    borderLeft: '1px solid #D2D6DB'
  }
}

const intervalOption = [
  {
    id: 1,
    label: 'hour',
    value: 'hour',
  },
  {
    id: 2,
    label: 'minute',
    value: 'minute',
  },
  {
    id: 3,
    label: 'second',
    value: 'second',
  },
]

const AnalyzeBtn = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: '12px 20px',
  color: 'white',
  cursor: 'pointer',
  border: '1px solid transparent',
  borderRadius: '8px',
  fontSize: theme.typography.body1.fontSize,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}))

export default function BasicTable() {
  const theme = useTheme()
  const [processOption, setProcessOption] = React.useState([])
  const [arrangedRows, setArrangedRows] = React.useState([])
  const [openModal, setOpenModal] = React.useState(false)

  React.useEffect(() => {
    if (Array.isArray(process) && process.length) {
      const newProcessOptions = process.map((p) => ({
        ...p,
        id: p.BioHazardProcessId,
        label: p.ProcessTitle,
        value: p.ProcessTitle,
      }))
      setProcessOption(newProcessOptions)
    }

    if (Array.isArray(rows) && rows.length) {
      let newRows = rows.sort((a, b) => a.IngredientId - b.IngredientId)
      newRows = rows.map((r) => ({
        ...r,
        checked: false,
        id: nextId(),
        process: '',
        minUnits: '',
        maxUnits: '',
        duration: '',
        interval: ''
      }))
      setArrangedRows(newRows)
    }
  }, [rows])

  const handleAdd = (row) => {
    const newRow = {
      RecipeCategoryId: row.RecipeCategoryId,
      RecipeSubCategoryId: row.RecipeSubCategoryId,
      BiologicalHazardId: row.BiologicalHazardId,
      CategoryTitle: row.CategoryTitle,
      RecipeSubCategoryTitle: row.RecipeSubCategoryTitle,
      BiologicalHazardTitle: row.BiologicalHazardTitle,
      IsExists: row.IsExists,
      Status: row.Status,
      IngredientName: row.IngredientName,
      RecipeClientDetailId: row.RecipeClientDetailId,
      IngredientId: row.IngredientId,
      id: nextId(),
      checked: row.checked,
      process: row.process,
      minUnits: row.minUnits,
      maxUnits: row.maxUnits,
      duration: row.duration,
      interval: row.interval
    }

    const newRows = arrangedRows.map(r => {
      if (r.id === row.id) {
        return [r, newRow]
      }
      return r
    }).flat().sort((a, b) => a.IngredientId - b.IngredientId)
    setArrangedRows(newRows)
  }

  const handleDelete = (row) => {
    const newRows = [...arrangedRows].filter(r => r.id !== row.id)
    setArrangedRows(newRows)
  }

  const handleCheckboxChange = (row) => {
    arrangedRows.forEach((r) => {
      if (r.id === row.id) r.checked = !r.checked
    })
  };

  const handleProcessOptionChange = (e, row) => {
    arrangedRows.forEach(r => {
      if (r.id === row.id) {
        r.process = e.target.value
      }
    })
  }

  const handleMinUnitsChange = (e, row) => {
    arrangedRows.forEach(r => {
      if (r.id === row.id) r.minUnits = e.target.value
    })
  }

  const handleMaxUnitsChange = (e, row) => {
    arrangedRows.forEach(r => {
      if (r.id === row.id) r.maxUnits = e.target.value
    })
  }

  const handleDurationChange = (e, row) => {
    arrangedRows.forEach(r => {
      if (r.id === row.id) r.duration = e.target.value
    })
  }

  const handleIntervalChange = (e, row) => {
    arrangedRows.forEach(r => {
      if (r.id === row.id) r.interval = e.target.value
    })
  }

  const handleBtnClick = (e, row) => {
    let bool = true
    if (row.minUnits === '' || row.maxUnits === '' || row.duration === '' || !row.process || !row.interval) {
      console.log('here')
      bool = false
    }
    if (bool) {
      setOpenModal(!openModal)
    }
  }

  return (
    <>
      <TableContainer>
        <Table style={style.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <React.Fragment key={column.id}>
                    <TableCell align={column.align}>
                      <Typography variant="h6">{column.headerName}</Typography>
                    </TableCell>
                  </React.Fragment>
                )
              })}
              <TableCell style={style.stickyHeader}       >
                <Typography variant="h6">ANALYZE</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arrangedRows.map((row, index) => (
              <React.Fragment key={row.id}>
                <TableRow
                  sx={{
                    '&:hover, &:hover #sticky-table-cell': {
                      backgroundColor: '#FEFEFE !important',
                    },
                    '& td': {
                      borderBottom: '1px solid #D2D6DB',
                    }
                  }}
                >
                  {index === 0 || row.IngredientId !== arrangedRows[index - 1]?.IngredientId ? (
                    <>
                      <TableCell align="left">
                        <Typography variant="body1">{row.IngredientName}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row.CategoryTitle}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1">{row.RecipeSubCategoryTitle}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          variant="body1"
                          color={theme.palette.primary.main}
                          sx={{ textDecoration: 'underline' }}
                        >
                          {row.BiologicalHazardTitle}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox onChange={() => handleCheckboxChange(row)} defaultChecked={row.checked || false} inputProps={{ 'aria-label': 'Checkbox demo' }} />
                      </TableCell>
                      <TableCell align="center">
                        <div>
                          <AddIcon
                            sx={{ color: theme.palette.success.main, cursor: 'pointer' }}
                            onClick={() => handleAdd(row, index)}
                          />
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <CustomSelect
                          id={row.id.toString()}
                          handleChange={(e) => handleProcessOptionChange(e, row)}
                          value={row.process}
                          label="Process"
                          options={processOption}
                          labelProps={{
                            style: {
                              fontSize: '1rem',
                              fontWeight: 400,
                              lineHeight: 1.5,
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <CustomTextField
                          value={row.minUnits}
                          label="&nbsp;"
                          id={`min-units-${row.id}`}
                          handleChange={(e) => handleMinUnitsChange(e, row)}
                          endAdornment={
                            <Box position='relative'>
                              <Typography variant='body1' style={style.adornment}>F</Typography>
                            </Box>
                          }
                        />
                      </TableCell>
                      <TableCell align="left">
                        <CustomTextField
                          value={row.maxUnits}
                          label="&nbsp;"
                          id={`max-units-${row.id}`}
                          handleChange={(e) => handleMaxUnitsChange(e, row)}
                          endAdornment={
                            <Box position='relative'>
                              <Typography variant='body1' style={style.adornment}>F</Typography>
                            </Box>
                          }
                        />
                      </TableCell>
                      <TableCell align="left">
                        <CustomTextField
                          value={row.duration}
                          label="&nbsp;"
                          id={`duration-${row.id}`}
                          handleChange={(e) => handleDurationChange(e, row)}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <CustomSelect
                          id={row.id.toString()}
                          label="&nbsp;"
                          options={intervalOption}
                          value={row.interval}
                          handleChange={(e) => handleIntervalChange(e, row)}
                        />
                      </TableCell>

                      <TableCell
                        style={style.stickyCell}
                        id='sticky-table-cell'
                      >
                        <AnalyzeBtn onClick={(e) => handleBtnClick(e, row)} >
                          Analyze
                        </AnalyzeBtn>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>

                      <TableCell align="left">
                        <Typography
                          variant="body1"
                          color={theme.palette.primary.main}
                          sx={{ textDecoration: 'underline' }}
                        >
                          {row.BiologicalHazardTitle}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox onChange={() => handleCheckboxChange(row)} defaultChecked={row.checked || false} inputProps={{ 'aria-label': 'Checkbox demo' }} />
                      </TableCell>
                      <TableCell align="center">
                        <div style={{ display: 'flex' }}>
                          <AddIcon
                            sx={{ color: theme.palette.success.main, cursor: 'pointer' }}
                            onClick={() => handleAdd(row, index)}
                          />
                          <DeleteIcon
                            sx={{ color: theme.palette.error.main, cursor: 'pointer' }}
                            onClick={() => handleDelete(row, index)}
                          />
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <CustomSelect
                          id={row.id.toString()}
                          label="Process"
                          value={row.process}
                          handleChange={(e) => handleProcessOptionChange(e, row)}
                          options={processOption}
                          labelProps={{
                            style: {
                              fontSize: '1rem',
                              fontWeight: 400,
                              lineHeight: 1.5,
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <CustomTextField
                          value={row.minUnits}
                          label="&nbsp;"
                          id={`min-units-${row.id}`}
                          handleChange={(e) => handleMinUnitsChange(e, row)}
                          endAdornment={
                            <Box position={'relative'}>
                              <Typography variant='body1' style={style.adornment}>F</Typography>
                            </Box>
                          }
                        />
                      </TableCell>
                      <TableCell align="left">
                        <CustomTextField
                          value={row.maxUnits}
                          label="&nbsp;"
                          id={`max-units-${row.id}`}
                          handleChange={(e) => handleMaxUnitsChange(e, row)}
                          endAdornment={
                            <Box position={'relative'}>
                              <Typography variant='body1' style={style.adornment}>F</Typography>
                            </Box>
                          }

                        />
                      </TableCell>
                      <TableCell align="left">
                        <CustomTextField
                          value={row.duration}
                          label="&nbsp;"
                          id={`duration-${row.id}`}
                          handleChange={(e) => handleDurationChange(e, row)}

                        />
                      </TableCell>
                      <TableCell align="left">
                        <CustomSelect
                          id={row.id}
                          label="&nbsp;"
                          options={intervalOption}
                          value={row.interval}
                          handleChange={(e) => handleIntervalChange(e, row)}
                        />
                      </TableCell>

                      <TableCell
                        style={style.stickyCell}
                        id='sticky-table-cell'
                      >
                        <Box sx={{ position: 'relative', bottom: 0, height: '100%' }}>

                          <AnalyzeBtn >Analyze</AnalyzeBtn>
                        </Box>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ minHeight: '10vh', width: '100%' }}>
        <ActionBtns />
      </Box>
      <CustomModal open={openModal} handleClose={() => {
        setOpenModal(!openModal)
      }} >
        <Box>

          <Box display='flex' justifyContent='flex-start' alignItems='center'>

            <TaskAltIcon
              sx={{
                color: theme.palette.success.main
              }}
            />
            <Typography variant='body1' ml={2}>Pathogens Controlled</Typography>
          </Box>
          <Box mt={8} sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
            <AnalyzeBtn onClick={() => setOpenModal(!openModal)}>Ok</AnalyzeBtn>
          </Box>
        </Box>
      </CustomModal>
    </>
  )
}
