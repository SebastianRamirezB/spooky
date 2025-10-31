
import DragZone from './components/DragZone';
import Hero from './components/Hero';

import './App.css'
import Footer from './components/Footer';
import DecorativeEmojis from './components/DecorativeEmojis';
import { Toaster } from 'sonner';

function App() {

  return (
    <>
      <div className="wrapper">
        <main className="container">
          <div className="blur-background">
            <div className="blur-circle blur-circle--top"></div>
            <div className="blur-circle blur-circle--bottom"></div>
          </div>
          <Hero />
          <DragZone />

        </main>

      </div>
      <Footer />
      <DecorativeEmojis />
      <Toaster richColors />
    </>
  )
}

export default App;
