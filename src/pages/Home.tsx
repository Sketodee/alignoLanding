import DarkGradient from '../components/DarkGradient'
import Feature from '../components/Feature'
import TestimonialSlides from '../components/TestimonialSlides'
import WhyChooseUs from '../components/WhyChooseUs'
import AlignoHelp from '../components/AlignoHelp'
import Testimonials from '../components/Testimonials'
import HelpSection from '../components/HelpSection'
import Footer from '../components/Footer'
import PaymentPlan from '../components/PaymentPlan'

const Home = () => {
  return (
    <>
      <DarkGradient />
      <section id="features">
        <Feature />
      </section>
      <TestimonialSlides />
      <section id="why">
        <WhyChooseUs />
      </section>
      <AlignoHelp />
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="pricing">
        <PaymentPlan />
      </section>
      <HelpSection />
      <Footer />
    </>
  )
}

export default Home