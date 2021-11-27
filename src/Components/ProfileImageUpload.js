//source: https://dev.to/asimdahall/client-side-image-upload-in-react-5ffc

import React from 'react'
import ReactDOM from 'react-dom'
import '../Styles/Profile.css'

function ProfileImageUpload() {
    const uploadedImage = React.useRef(null)
    const imageUploader = React.useRef(null)

    const handleImageUpload = (e) => {
        const [file] = e.target.files
        if (file) {
            const reader = new FileReader()
            const { current } = uploadedImage
            current.file = file
            reader.onload = (e) => {
                current.src = e.target.result
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{ display: 'none' }}
            />
            <div
                style={{ height: '100px', width: '100px' }}
                onClick={() => imageUploader.current.click()}
            >
                <img
                    ref={uploadedImage}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>
        </div>
    )
}

export default ProfileImageUpload
