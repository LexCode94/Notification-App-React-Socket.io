import './card.css';
import { useState } from 'react';
import { Favorite, FavoriteBorder, ChatBubbleOutline, IosShare, Info } from '@mui/icons-material'

const Card = ({post, socket, user}) => {
    const [liked, setLiked] = useState(false)

    const handleNotification = (type) => {
        type===1 && setLiked(true)
        socket.emit("sendNotification", {
            senderName: user,
            receiverName: post.username,
            type
        })
    }

    return (
        <div className="card">
            <div className='info'>
                <img src={post.userImg} alt="" className='userImg' />
                <span>{post.fullname}</span>
            </div>
            <img src={post.postImg} alt="" className="postImg" />
            <div className="interaction">
                {liked ? (
                <Favorite className="cardIcon"/>
                ) : (
                    <FavoriteBorder className="cardIcon" onClick={() => handleNotification(1)}/>
                )}
                
                <ChatBubbleOutline className="cardIcon" onClick={() => handleNotification(2)}/>
                <IosShare className="cardIcon" onClick={() => handleNotification(3)}/>
                <Info className="cardIcon infoIcon"/>
            </div>
        </div>
    )
}

export default Card;