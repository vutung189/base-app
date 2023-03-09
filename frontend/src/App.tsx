import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './assets/scss/app.scss';
import Routes from './routes/Routes';

function App() {
  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
      <Routes />
    </>
  );
}

export default App;
