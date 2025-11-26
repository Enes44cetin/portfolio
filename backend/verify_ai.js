import axios from 'axios';

async function test() {
    try {
        console.log('Testing AI Assistant Endpoint...');
        const response = await axios.post('http://localhost:5000/api/assistant', {
            message: "Merhaba, Enes burada. Portfolyo asistanını test ediyorum.",
            history: []
        });
        console.log('Success! Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    }
}

test();
