import { useCallback, useEffect, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'
import { BACKEND_DOMIN } from '@/redux/slices/AuthSlice'

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void,
  mediaUrl: string
}
export default function FileUploader({ fieldChange, mediaUrl }: FileUploaderProps) {
  const [file, setFile] = useState<File[]>([])
  const [isImage, setIsImage] = useState(true)
  const [fileUrl, setFileUrl] = useState(mediaUrl?BACKEND_DOMIN+mediaUrl:mediaUrl)
  const onDrop = useCallback((acceptedFiles: FileWithPath) => {
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'file/*': ['.png', '.jpg', 'jpeg', '.svg','.mp4'],
    }
  })
  useEffect(()=>{
    if (file[0]?.type==='video/mp4') {
      setIsImage(false)
    }else{
      setIsImage(true)

    }
  },[file])
  
  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ?
          (
            <>
            <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
              {isImage? <img src={fileUrl} alt='imagup' className='file_uploader-img' />:
              <video src={fileUrl} controls className='file_uploader-img' />}
            </div>
            <p className='file_uploader-label'>Click or drag photo to replace</p>
            </>
          )
          : (
            <div className='file_uploader-box'>
              <img src="/assets/icons/file-upload.svg" alt="file-upload" width={96} height={77} />
              <h3 className='base-medium text-light-2 mt-6'>Drag file here</h3>
              <p className=' text-light-4 small-regular mb-6'>Photo or Video</p>
              <Button type='button' className='shad-button_dark_4'>Select File</Button>
            </div>
          )
      }
    </div>
  )
}
