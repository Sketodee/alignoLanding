import axiosInstance from '../utils/auth';
import { AllowedProviders, UserType } from '../types/appScopeTypes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleSignIn from './GoogleSignIn';
import { useAuth } from '../context/AuthContext';
// import editLab from '../assets/images/editLab.png'

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What software do you mainly edit in?",
    options: ["Premiere Pro & After Effects", "DaVinci Resolve", "Final Cut Pro", "Other"]
  },
  {
    id: 2,
    question: "How long have you been editing?",
    options: ["Less than 1 year (Beginner)", "1–3 years (Intermediate)", "3–5 years (Advanced)", "5+ years (Pro)"]
  },
  {
    id: 3,
    question: "What type of projects do you edit most?",
    options: ["Music Videos", "YouTube / Social Content", "Commercials / Corporate", "Film / Narrative", "Other"]
  },
  {
    id: 4,
    question: "What's your editing workflow like?",
    options: [
      "I use a lot of drag-and-drop overlays and presets",
      "I build custom effects but still rely on shortcuts",
      "I do everything from scratch, no presets",
      "Depends on the project"
    ]
  },
  {
    id: 5,
    question: "How important is speed in your edits?",
    options: [
      "I need to edit FAST (turnarounds are tight)",
      "I like to balance speed and quality",
      "I focus more on creativity, not deadlines"
    ]
  },
  {
    id: 6,
    question: "What's your monthly editing budget? (helps us recommend the right plan)",
    options: [
      "Under $20 (I'm just starting out)",
      "$20–$50 (I edit regularly but not full-time)",
      "$50–$100 (Editing is part of my income)",
      "$100+ (Full-time / serious projects)"
    ]
  },
  {
    id: 7,
    question: "What kind of tools & effects do you want most?",
    options: [
      "Hits / Shakes / Transitions",
      "Overlays (film burns, grunge, flickers, etc.)",
      "Stylized looks (night vision, CRT, thermal, etc.)",
      "Workflow tools (motion blur, glow, slow motion, sound effects, AI search tools, etc.)",
      "All of the above"
    ]
  },
  {
    id: 8,
    question: "What's your biggest frustration when editing?",
    options: [
      "Too time-consuming",
      "Hard to make things look unique",
      "Don't know where to start with effects",
      "Not enough creative options"
    ]
  },
  {
    id: 9,
    question: "How often do you collaborate with other editors?",
    options: [
      "Never, I work solo",
      "Sometimes, I share presets with friends",
      "Often, I work in teams / studios"
    ]
  },
  {
    id: 10,
    question: "What are you hoping EditLabs helps you with the most?",
    options: [
      "Save time with instant effects",
      "Make my edits stand out visually",
      "Improve workflow and organization",
      "All of the above"
    ]
  }
];

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showSignUp, setShowSignUp] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { isAuthenticated, loading } = useAuth();

  if (isAuthenticated) {
    return null; // Don't render anything, redirect will happen via AuthProvider
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Create user with provider info
  const createUser = async (userData: any) => {
    try {
      const response = await axiosInstance.post('/user/create', userData, { skipAuthRefresh: true });
      console.log('User creation response:', response.data);

      if (response.status === 200) {
        console.log('User created successfully');
      }
      navigate('/login');
      return response.data;
    } catch (error: any) {
      if (error.response) {
        setErrors({ email: error.response.data?.message || 'Registration failed' });
      } else if (error.request) {
        setErrors({ email: 'No response received from server.' });
      } else {
        setErrors({ email: 'Error setting up request: ' + error.message });
      }
      throw error;
    }
  };

  // Handle regular email submission (custom provider)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setIsLoading(true);

      const dataToSend = {
        email,
        userType: UserType.USER,
        provider: AllowedProviders.CUSTOM,
        providerId: null,
      };

      try {
        await createUser(dataToSend);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAnswerSelect = (answer: string) => {
    const questionId = questions[currentQuestion].id;
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);

    // Console log the selected answer
    console.log({
      questionId,
      question: questions[currentQuestion].question,
      selectedAnswer: answer
    });

    // Move to next question or complete questionnaire
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Questionnaire completed - move to signup
      console.log('All answers:', updatedAnswers);
      setShowSignUp(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSkipAll = () => {
    console.log('User skipped questionnaire');
    setShowSignUp(true);
  };

  const handleSkipQuestion = () => {
    console.log('Skipping question:', {
      questionId: questions[currentQuestion].id,
      question: questions[currentQuestion].question,
      selectedAnswer: 'Skipped'
    });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowSignUp(true);
    }
  };

  // Show signup form after questionnaire is completed or skipped
  if (showSignUp) {
    return (
      <div className='h-screen flex bg-black'>
        <div className="w-full md:w-[70%] mx-auto bg-transparent p-4 flex flex-col justify-center">
          <div className="max-w-2xl mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-8">
              {/* <div className='flex items-center justify-center mb-4'>
                <img src={editLab} alt="" className='h-16 w-16' />
              </div> */}
              <h1 className="text-white text-3xl font-bold">
                Welcome to Editlabs <span className="text-2xl">👋</span>
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                Create your account to get started
              </p>
            </div>

            {/* Social Login Buttons */}
            <GoogleSignIn />

            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-1 border-t border-[#323133]"></div>
              <span className="px-4 text-gray-400 text-sm">or</span>
              <div className="flex-1 border-t border-[#323133]"></div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full h-[44px] bg-transparent border-[1px] border-[#282729] text-white placeholder-gray-400 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[44px] bg-white text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Sign up'}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <button onClick={() => navigate('/login')} className="text-white hover:text-purple-400 transition-colors">
                  Log in
                </button>
              </p>
            </div>

            <div className="text-center mt-4">
              <p className="text-gray-500 text-xs">
                By continuing, you agree to Editlabs{' '}
                <button className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </button>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Questionnaire flow - shown first
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  return (
    <div className='h-screen flex bg-black'>
      <div className="w-full md:w-[70%] mx-auto bg-transparent p-4 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-8">
            {/* <div className='flex items-center justify-center mb-4'>
              <img src={editLab} alt="" className='h-16 w-16' />
            </div> */}
            <h1 className="text-white text-3xl font-bold mb-4">
              Welcome to Editlabs <span className="text-2xl">👋</span>
            </h1>
            <p className="text-gray-400 text-sm">
              Let's get to know you better to personalize your experience
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-gray-400 text-sm">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-[#282729] rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <h2 className="text-white text-2xl font-bold mb-2">
              {questions[currentQuestion].question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className="w-full p-4 bg-transparent border border-[#282729] text-white text-left rounded-lg hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <span className="group-hover:text-purple-200">{option}</span>
                  <div className="w-2 h-2 rounded-full border border-gray-600 group-hover:border-purple-400"></div>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {currentQuestion > 0 && (
                <button
                  onClick={handleBack}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              )}
              
              <button
                onClick={handleSkipAll}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Skip all questions
              </button>
            </div>

            <button
              onClick={handleSkipQuestion}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Skip this question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;


// import axiosInstance from '../utils/auth';
// import { AllowedProviders, UserType } from '../types/appScopeTypes';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import GoogleSignIn from './GoogleSignIn';
// import { useAuth } from '../context/AuthContext';
// // import editLab from '../assets/images/editLab.png'

// const SignIn = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
//   const { isAuthenticated, loading } = useAuth();

//   if (isAuthenticated) {
//     return null; // Don't render anything, redirect will happen via AuthProvider
//   }

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-black">
//         <div className="text-white text-xl">Loading...</div>
//       </div>
//     );
//   }

 
//   const validate = () => {
//     const newErrors: { email?: string; password?: string } = {};

//     if (!email) {
//       newErrors.email = 'Email is required.';
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'Email is invalid.';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Create user with provider info
//   const createUser = async (userData:any) => {
//     try {
//       const response = await axiosInstance.post('/user/create', userData, { skipAuthRefresh: true });
//       console.log('User creation response:', response.data);

//       if (response.status === 200) {
//         console.log('User created successfully');
//       }
//       navigate('/login');
//       return response.data;
//     } catch (error: any) {
//       // navigate('/login');
//       if (error.response) {
//         setErrors({ email: error.response.data?.message || 'Registration failed' });
//       } else if (error.request) {
//         setErrors({ email: 'No response received from server.' });
//       } else {
//         setErrors({ email: 'Error setting up request: ' + error.message });
//       }
//       throw error;
//     }
//   };

//   // Handle regular email submission (custom provider)
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (validate()) {
//       setIsLoading(true);

//       const dataToSend = {
//         email,
//         userType: UserType.USER,
//         provider: AllowedProviders.CUSTOM,
//         providerId: null,
//       };

//       try {
//         await createUser(dataToSend);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className='h-screen flex bg-black'>

//       <div className="w-full md:w-[70%] mx-auto bg-transparent p-4 flex flex-col justify-center">
//         <div className="max-w-2xl mx-auto w-full">
//           {/* Header */}
//           <div className="text-center mb-8">
//             {/* <div className='flex items-center justify-center mb-4'>
//               <img src={editLab} alt="" className='h-16 w-16' />
//             </div> */}
//             <h1 className="text-white text-3xl font-bold">
//               Welcome to Editlabs <span className="text-2xl">👋</span>
//             </h1>
//           </div>

//           {/* Social Login Buttons */}
//          <GoogleSignIn />

//           {/* Divider */}
//           <div className="flex items-center mb-6">
//             <div className="flex-1 border-t border-[#323133]"></div>
//             <span className="px-4 text-gray-400 text-sm">or</span>
//             <div className="flex-1 border-t border-[#323133]"></div>
//           </div>

//           {/* Email Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <input
//                 type="email"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={isLoading}
//                 className="w-full h-[44px] bg-transparent border-[1px] border-[#282729] text-white placeholder-gray-400 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full h-[44px] bg-white text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? 'Processing...' : 'Sign up'}
//             </button>
//           </form>

//           {/* Footer */}
//           <div className="text-center mt-6">
//             <p className="text-gray-400 text-sm">
//               Already have an account?{' '}
//               <button onClick={() => navigate('/login')} className="text-white hover:text-purple-400 transition-colors">
//                 Log in
//               </button>
//             </p>
//           </div>

//           <div className="text-center mt-4">
//             <p className="text-gray-500 text-xs">
//               By continuing, you agree to Editlabs{' '}
//               <button className="text-gray-400 hover:text-white transition-colors">
//                 Terms of Service
//               </button>{' '}
//               and{' '}
//               <button className="text-gray-400 hover:text-white transition-colors">
//                 Privacy Policy
//               </button>
//               .
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;




