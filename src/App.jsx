import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import NewArrivals from './components/sections/NewArrivals'
import CharacterShowcase from './components/sections/CharacterShowcase'
import Recommendations from './components/sections/Recommendations'
import Membership from './components/sections/Membership'
import Community from './components/sections/Community'

export default function App() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <NewArrivals />
        <CharacterShowcase />
        <Recommendations />
        <Membership />
        <Community />
      </main>
      <Footer />
    </>
  )
}