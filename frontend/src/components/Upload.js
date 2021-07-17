import { useState } from 'react'
const Upload = () => {
    const [fileInputState, setFileInputState] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    const onHandleChange = (e) => { //khi thay đôi ảnh
        const file = e.target.files[0]
        previewFile(file)       //hiển thị image
        console.log("onHandleChange")
        // setFileInputState()
    }
    const onHandleSubmitFile = (e) => { //khi submit
        e.preventDefault()
        if (!previewSource) return
        uploadImage(previewSource)      //tải ảnh lên
    }
    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {      //khi load file xong
            setPreviewSource(reader.result) //đổi dữ liệu state previewSource lưu bas64, state thay đổi nên ảnh thay đổi
        }
    }
    const uploadImage = async (base64Image) => {
        console.log(base64Image)
        try {
            await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64Image }),
                headers: { 'Content-type': 'application/json' }
            }).then(url => (console.log(url)))
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="upload">
            <h1>Upload</h1>
            <form onSubmit={onHandleSubmitFile}>
                <input type="file" className="form-input" name="image" onChange={onHandleChange} value={fileInputState} />
                <button type="submit">Upload</button>
            </form>
            {previewSource && (
                <img src={previewSource} alt='chosen' style={{ height: '300px' }}></img>
            )}
        </div>
    )
}
export default Upload