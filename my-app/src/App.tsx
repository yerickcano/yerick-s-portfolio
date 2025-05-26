import gundam from './assets/gundam.jpg';
import './App.scss';
import ProjectsFloatButton from './FloatButton/ProjectsFloatButton';
import SkillsButton from './FloatButton/SkillsButton';
import AboutMeFloatButton from './FloatButton/AboutMeFloatButton';
import ResumeFloatButton from './FloatButton/ResumeFloatButton';
import SocialFloatButton from './FloatButton/SocialFloatButton';
import CallToAction from './Cards/CallToAction';
function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${gundam})` }}>
      <img src={gundam} className="App-background" alt="logo" />
      <div className="App-content">
        <ProjectsFloatButton />
        <SkillsButton />
        <AboutMeFloatButton />
        <ResumeFloatButton />
        <SocialFloatButton />
        <CallToAction />
      </div>
     
    </div>
  );
}

export default App;
