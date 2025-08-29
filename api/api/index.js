const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false });
    }

    const fullName = 'john_doe'; 
    const dob = '17091999';
    const user_id = `${fullName}_${dob}`;
    const email = 'john@xyz.com';
    const roll_number = 'ABCD123';

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let all_alpha_chars = '';

    data.forEach(item => {
      if (typeof item !== 'string') return; 

      if (!isNaN(item) && item.trim() !== '') {
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        all_alpha_chars += item;
      } else {
        special_characters.push(item);
      }
    });

    const reversed = all_alpha_chars.split('').reverse().join('');
    let concat_string = '';
    for (let i = 0; i < reversed.length; i++) {
      concat_string += (i % 2 === 0) ? reversed[i].toUpperCase() : reversed[i].toLowerCase();
    }

    const sum_str = sum.toString();

    res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum_str,
      concat_string
    });
  } catch (error) {
    res.status(500).json({ is_success: false, error: 'Internal server error' });
  }
});

module.exports = app;
