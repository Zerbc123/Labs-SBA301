import ArchitectureFlow from "./components/ArchitectureFlow.jsx";
import CourseHeader from "./components/CourseHeader.jsx";
import EnvironmentStatus from "./components/EnvironmentStatus.jsx";
import Footer from "./components/Footer.jsx";
import LearningChecklist from "./components/LearningChecklist.jsx";
import ProjectSummary from "./components/ProjectSummary.jsx";
import StudentProfile from "./components/StudentProfile.jsx";
function App() {
    return (
        <>
            <CourseHeader />
            <main className="dashboard">
                <StudentProfile />
                <EnvironmentStatus />
                <LearningChecklist />
                <ProjectSummary />
                <ArchitectureFlow />
            </main>
            <Footer />
        </>
    );
}
export default App;