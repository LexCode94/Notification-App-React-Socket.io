import './navbar.css';
import { Notifications, MailOutline, SettingsOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const Navbar = ({socket}) => {
    const [notifications, setNotifications] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        socket.on("getNotification", data => {
            setNotifications(prev => [...prev, data])
        })
    }, [socket])

    console.log(notifications)

    const displayNotification = ({senderName, type}) => {
        let action;
        if(type===1){
            action="liked"
        } else if(type===2){
            action="commented"
        } else {
            action="shared"
        }

        return (
            <span className='notification'>{`${senderName} ${action} your post`}</span>
        )
    }

    const handleRead = () => {
        setNotifications([])
        setOpen(false)
    }

    return (
        <div className="navbar">
            <span className='logo'>Lama app</span>
            <div className='icons'>
                <div className='icon' onClick={() => setOpen(!open)}>
                    <Notifications className='iconImg' />
                    {
                        notifications.length > 0 &&
                        <div className='counter'>{notifications.length}</div>
                    }
                </div>
                <div className='icon' onClick={() => setOpen(!open)}>
                    <MailOutline className='iconImg' />
                </div>
                <div className='icon' onClick={() => setOpen(!open)}>
                    <SettingsOutlined className='iconImg'/>
                </div>
            </div>
            {open && 
            <div className='notifications'>
                {notifications.map(n => displayNotification(n))}
                <button className='nButton' onClick={handleRead}>Mark as read</button>
            </div>}
        </div>
    )
}

export default Navbar;