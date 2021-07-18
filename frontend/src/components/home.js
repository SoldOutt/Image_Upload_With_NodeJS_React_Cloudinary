import { useState, useEffect } from 'react'
import { Image } from 'cloudinary-react'
const Home = () => {
    const [imageIds, setImageIds] = useState()
    const loadImages = async () => {
        try {
            const res = await fetch('/api/images')
            const data = await res.json()
            console.log(data)
            setImageIds(data)
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        loadImages()
    }, [])
    return (
        <div>
            <h1 className="title">Home</h1>
            {imageIds && imageIds.map((imageId, index) => {
                console.log(imageId)
                return (
                    < Image
                        key={index}
                        cloudName='nguyenvannam'
                        publicId={imageId}
                        width='300'
                        crop='scale'
                    />)
            })}
        </div>
    )
}
export default Home