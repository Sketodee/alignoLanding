import DarkGradient from '../components/DarkGradient'
import Feature from '../components/Feature'
import TestimonialSlides from '../components/TestimonialSlides'
import WhyChooseUs from '../components/WhyChooseUs'
import EditLabHelp from '../components/AlignoHelp'
import Testimonials from '../components/Testimonials'
import HelpSection from '../components/HelpSection'
import PaymentPlan from '../components/PaymentPlan'
import WhyWeBuilt from '../components/WhyWeBuilt'

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
      <EditLabHelp />
      <section id="testimonials">
        <Testimonials />
      </section>
      {/* <FeatureCards /> */}
      <section id="pricing">
        <PaymentPlan />
      </section>
      <WhyWeBuilt />
      <HelpSection />
    </>
  )
}

export default Home