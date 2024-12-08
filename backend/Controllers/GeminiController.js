const { GoogleGenerativeAI } = require("@google/generative-ai");

async function getQuizData(req, res) {
    const genAI = new GoogleGenerativeAI("AIzaSyBhvjoWYlYw__NasSctrXzpmBNkz9AqhB8");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Log the received request body
    console.log("Received Request:", req.body);

    const { topic, number } = req.body;

    // Ensure that the topic and number are provided
    if (!topic || !number) {
        return res.status(400).json({ msg: "Topic and number are required." });
    }

    // Create the prompt based on the user's request body
    const prompt = `Generate a Quiz questions for the topic: ${topic} with ${number} questions in json format like this 
       {
    "quizTitle": "Human Anatomy Quiz",
    "questions": [
        {
            "question": "Which organ is responsible for producing bile?",
            "options": [
                "Stomach",
                "Liver",
                "Pancreas",
                "Gallbladder"
            ],
            "answer": "Liver"
        },
     }
    `;

    try {
        const result = await model.generateContent(prompt);
        let quizText = result.response.candidates[0].content.parts[0].text;

        // Clean up the text (remove the code block markers)
        let cleanedText = quizText.replace("```json\n", "").replace("```", "");

        // Parse the cleaned-up text into JSON
        let quizData = JSON.parse(cleanedText);

        // Send the cleaned-up quiz data as a JSON response
        res.status(200).json(quizData);
    } catch (err) {
        console.error("Error Fetching Quiz Data:", err);
        res.status(500).json({ msg: "Error Fetching the Data" });
    }
}

module.exports = { getQuizData };
