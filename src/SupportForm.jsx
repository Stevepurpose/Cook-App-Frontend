import React, { useState } from 'react';
import axios from 'axios';
import './index.css'

function SupportForm() {
    const [message, setMessage] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();

        // Post the message to the backend
        axios.post('http://localhost:8000/support', { message})
            .then(response => {
                console.log('Message sent:', response.data);
                setMessage('')
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
        
            
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your recipe suggestions here..."
                    rows="10"
                    cols="30"
                    required
                    className='shadow p-4'
                />
             <br/>
           
            <button type="submit" className='bg-green-900 text-yellow-300 shadow p-4'>Send Message</button>
        </form>
    );
}

export default SupportForm;
