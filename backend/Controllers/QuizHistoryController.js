const User = require('../Models/User.js');

async function addQuizHistory(req, res) {
    const { score, quizTitle, email } = req.body;

    // Validate the request body
    // if (typeof score !== 'number' || typeof quizTitle !== 'string' || typeof email !== 'string') {
    //     return res.status(400).json({ success: false, message: 'Invalid data types for fields: score, quizTitle, or email.' });
    // }

    // Check for missing required fields
    if (!quizTitle || !email) {
        return res.status(400).json({ success: false, message: 'Missing required fields: score, quizTitle, or email.' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Add the quiz history entry
        user.quizHistory.push({ title: quizTitle, score });

        // Save the updated user document
        await user.save();

        // Send a success response
        res.status(201).json({
            success: true,
            message: 'Quiz history added successfully.',
            quizHistory: user.quizHistory
        });
    } catch (error) {
        console.error('Error adding quiz history:', error);
        // Send a detailed error response
        res.status(500).json({
            success: false,
            message: 'An error occurred while adding quiz history.',
            error: error.message // Only send the error message to avoid exposing sensitive info
        });
    }
}

module.exports = { addQuizHistory };
