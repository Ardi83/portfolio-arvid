import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Experiences from './pages/Experiences';
import Contact from './pages/Contact';
import BlogPage from './pages/BlogPage';

const Portfolio = () => (
  <div className="grain relative">
    <Navbar />
    <main>
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="experiences">
        <Experiences />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/blog" element={<BlogPage />} />
    </Routes>
  );
}

export default App;
