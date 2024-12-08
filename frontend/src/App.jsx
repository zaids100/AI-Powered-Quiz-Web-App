import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import QuizBox from './pages/QuizBox.jsx';
import Home from './pages/Home.jsx';
import CreateQuiz from './pages/CreateQuiz.jsx';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler.jsx';
import QuizResults from './pages/QuizResults.jsx';
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('token') ? true : false
    );

    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/login" />;
    };

    return (
        <div className="App">
            <Router>
                <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                    <Route path="/create-quiz" element={<PrivateRoute element={<CreateQuiz />} />} />
                    <Route path="/quiz-box" element={<QuizBox/>}/>
                    <Route path="/quiz-results" element={<QuizResults />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
