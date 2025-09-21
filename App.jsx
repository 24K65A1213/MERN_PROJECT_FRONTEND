import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import StudentRegistration from "./students/RegisterStudent";
// import ViewAllStudents from "./students/ViewAllStudents";
// import EditStudent from "./students/EditStudent";
import "./index.css";
import LoginPage from "./loginpage";
import AdminPage from "./administrator/adminpage";
import Createstudent from "./administrator/createstudent.jsx";
import Readstudent from "./administrator/readstudent.jsx";
import Updatestudent from "./administrator/updatestudent.jsx";
import Deletestudent from "./administrator/deletestudent.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/admin/create" element={<Createstudent />} />
        <Route path="/admin/read" element={<Readstudent />} />
        <Route path="/admin/update" element={<Updatestudent />} />
        <Route path="/admin/delete" element={<Deletestudent />} />
        <Route path="/students" element={<div>Students Page</div>} />


        {/* <Route path="/register" element={<StudentRegistration />} />
        <Route path="/allstudents" element={<VewAllStudents />} />
        <Route path="/updatestudent/:id" element={<EditStudent />} /> */}
      </Routes>
    </Router>
  );
}

export default App;