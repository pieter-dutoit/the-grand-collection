'use client'
import { useFormFields } from '@payloadcms/ui'

interface FileField {
  value?: {
    size?: number
  }
}

const FILE_SIZE_LIMIT = 4500000

export default function FileSizeDisplay(): JSX.Element | null {
  const file = useFormFields(([fields]) => fields.file) as FileField
  const currentSize = file?.value?.size

  if (currentSize && currentSize > FILE_SIZE_LIMIT) {
    return (
      <span style={{ color: 'red' }}>
        <strong style={{ textDecoration: 'underline', marginBottom: '1rem' }}>
          File size exceeds the limit of
          {(FILE_SIZE_LIMIT / 1000000).toFixed(2)}MB. Current size:
          {(currentSize / 1000000).toFixed(2)}MB.
        </strong>
        <br />
        Please upload a smaller file.
        <br />
        Tips to reduce image size:
        <ul style={{ margin: '1rem' }}>
          <li>Use image compression tools like TinyPNG or JPEG-Optimizer.</li>
          <li>Reduce the dimensions of the image.</li>
          <li>
            Save the image in a different format (e.g., JPEG instead of PNG).
          </li>
          <li>Adjust the image quality settings in your image editor.</li>
        </ul>
      </span>
    )
  }
  return null
}
