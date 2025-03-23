import { CloudUpload } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function UploadImage() {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <Box 
            {...getRootProps()}
            sx={{
                border: 'dashed 3px #eee',
                borderColor: isDragActive ? 'green' : '#eee',
                borderRadius: '5px',
                paddingTop: '30px',
                textAlign: 'center',
                height: '280px'
            }}
        >
            <input {...getInputProps()} />
            <CloudUpload sx={{fontSize: 80}} />
            <Typography variant="h5">Drop image here</Typography>
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </Box>
    )
}
