//React
import { useEffect, useState } from "react";

// Router
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Redux
import { useDispatch } from "react-redux";
import { setUser } from "./slices/userSlice";
import { setListener } from "./slices/listener.slice";

// Pages
import SignUpPage from "./pages/SignUpPage";
import LoginScreen from "./pages/LoginScreen";
import SignInPage from "./pages/SignInPage";
import Education from "./components/Register/Education";
import GeneralInfo from "./components/Register/GeneralInfo";
import Exam from "./components/Register/Exam";
import Quiz from "./components/Register/Quiz";
import Home from "./pages/Home"
import Explore from "./components/Explore/Explore";
import Conversations from "./components/Conversations/Conversations";
import Request from "./components/Requests/Request";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Profile from "./components/Profile/Profile";
import Password from "./components/Password/Password";
import History from "./components/History/History";
import Finance from "./components/Finance/Finance";
import Statistics from "./components/Statistics/Statistics";
import Notifications from "./components/Notification/Notifications";
import PoolRequestForm from "./components/Explore/PoolRequestForm";
import SuggestForm from "./components/Explore/SuggestForm";
import Layout from "./Layout/Layout";
import SpecificPoolRequestForm from "./components/Explore/SpecificPoolRequestForm";
import ComplaintAndInform from "./components/Complaint/ComplaintAndInform";
import ListenerProfile from "./components/ListenerProfile/ListenerProfile";
import Info from './components/ListenerProfile/Info/Info'
import StarMessages from "./components/ListenerProfile/StarMessages/StarMessages";
import Links from "./components/ListenerProfile/Links/Links";
import Media from "./components/ListenerProfile/Media/Media";
import Files from "./components/ListenerProfile/Files/Files";
import PrivateRoute from "./admin/PrivateRoute";
import AdminPanel from "./admin/AdminPanel";
import Inform from "./admin/Inform/Inform";
import AdminMusic from "./admin/Music/Music";
import Users from "./admin/Users/Users";
import AddMusic from "./admin/Music/AddMusic";
import ExplorePage from "./components/Explore/ExplorePage";
import ExploreListenerProfile from './components/Explore/Listener/Profile'
import AdminMusicPage from "./admin/Music/AdminMusicPage";
import AddPlaylist from "./admin/Music/AddPlaylist";

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(sessionStorage.getItem("user")) || null
  const listener = JSON.parse(sessionStorage.getItem("listener")) || null

  useEffect(() => {
    if (user) {
      dispatch(setUser(user))
    } else if (listener) {
      dispatch(setListener(listener))
    } else {
      navigate("/");
    }
  }, []);

  const quizData = [
    {
      "question": "What is the capital of France?",
      "options": ["Paris", "London", "Berlin", "Madrid"],
      "correctAnswer": "Paris"
    },
    {
      "question": "Who wrote 'Hamlet'?",
      "options": ["Shakespeare", "Hemingway", "Tolkien", "Dickens"],
      "correctAnswer": "Shakespeare"
    },
    {
      "question": "What is 2 + 2?",
      "options": ["3", "4", "5", "6"],
      "correctAnswer": "4"
    },
    {
      "question": "Which planet is known as the Red Planet?",
      "options": ["Mars", "Earth", "Jupiter", "Venus"],
      "correctAnswer": "Mars"
    }
  ]
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    email: '',
    phone: '',
    gender: '',
    birth: '',
    password: '',
    confirmpassword: '',
    education: '',
    diploma: '',
    fieldOfActivity: '',
    experience: '',
    languages: '',
    additions: '',
    category: '',
    profilePic: ''
  });

  const updateFormData = (data) => {
    setFormData(prevData => ({ ...prevData, ...data }));
  };
  return (

    <>
      <Routes>
        <Route path="admin" element={<PrivateRoute element={<AdminPanel />} />} >
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<Users />} />
          <Route path="music" element={<AdminMusicPage />}>
          <Route index element={<AdminMusic />} />
          <Route path='addmusic' element={<AddMusic />} />
          <Route path='addplaylist' element={<AddPlaylist />} />
          </Route>
          {/* <Route path="create" element={<AddMusic />} />
          </Route> */}
          {/* <Route path="create" element={<AddMusic />} /> */}

          <Route path="inform" element={<Inform />} />
        </Route>
        <Route path="/home" element={<Home />}>
          <Route index element={<Navigate to="explore" replace />} />
          {/* <Route path="explore" element={<Layout title="Kəşf Et"><Explore /></Layout>/}> */}

          <Route path="explore" element={<ExplorePage />}>
            <Route index  element={<Explore />} />
            <Route path='profile' element={<ExploreListenerProfile />} />
            {/* <Route path="poolrequest" element={<Layout title="Yeni Müraciət Yarat"><PoolRequestForm /></Layout>} /> */}
          </Route>
          <Route path="poolrequest" element={<Layout title="Yeni Müraciət Yarat"><PoolRequestForm /></Layout>} />
          <Route path="suggest" element={<Layout title="Təklif Et"><SuggestForm /></Layout>} />
          <Route path="specificpool" element={<Layout title="Anlıq Müraciət Yarat"><SpecificPoolRequestForm /></Layout>} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="dinleyiciprofil" element={<Layout title="Profil"><ListenerProfile /></Layout>}>
            <Route index element={<Navigate to="info" replace />} />
            <Route path="info" element={<Info />} />
            <Route path="media" element={<Media />} />
            <Route path="files" element={<Files />} />
            <Route path="starmessages" element={<StarMessages />} />
            <Route path="links" element={<Links />} />
          </Route>
          <Route path="requests" element={<Layout title="Müraciətlər"><Request /></Layout>} />
          <Route path="music" element={<Layout title="Musiqi"><Music /></Layout>} />
          <Route path="complaint" element={<Layout title="Bildir"><ComplaintAndInform /></Layout>} />
          <Route path="settings" element={<Settings />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="password" element={<Password />} />
            <Route path="history" element={<History />} />
            <Route path="finance" element={<Finance />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>

        <Route path="/" element={<LoginScreen />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />}>
          <Route path="general-info" element={<GeneralInfo formData={formData} updateFormData={updateFormData} />} />
          <Route path="education" element={<Education formData={formData} updateFormData={updateFormData} />} />
          <Route path="exam" element={<Exam formData={formData} updateFormData={updateFormData} />} />
        </Route>
        <Route path="/quiz" element={<Quiz quizData={quizData} formData={formData} />} />
      </Routes>
    </>
  );
};

export default App;

