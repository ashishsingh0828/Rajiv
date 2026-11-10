import { useState } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import ConsultationModal from "../../components/ConsultationModal/ConsultationModal";
import BookingModal from "../../components/BookingModal/BookingModal";

import Hero from "../../sections/Hero/Hero";
import About from "../../sections/About/About";
import Programs from "../../sections/Programs/Programs";
import Transformations from "../../sections/Transformations/Transformations";
import Videos from "../../sections/Videos/Videos";
import Contact from "../../sections/Contact/Contact";

function Home() {
  const [
    consultationOpen,
    setConsultationOpen,
  ] = useState(false);

  const [
    bookingOpen,
    setBookingOpen,
  ] = useState(false);

  const [
    selectedProgram,
    setSelectedProgram,
  ] = useState(null);


  const openConsultation = () => {
    setConsultationOpen(true);
  };


  const closeConsultation = () => {
    setConsultationOpen(false);
  };


  const openBooking = (program) => {
    setSelectedProgram(program);
    setBookingOpen(true);
  };


  const closeBooking = () => {
    setBookingOpen(false);
    setSelectedProgram(null);
  };


  return (
    <>
      <Header
        onConsultationOpen={
          openConsultation
        }
      />

      <main>

        <Hero
          onConsultationOpen={
            openConsultation
          }
        />

        <About
          onConsultationOpen={
            openConsultation
          }
        />

        <Programs
          onBookProgram={
            openBooking
          }
          onConsultationOpen={
            openConsultation
          }
        />

        <Transformations
          onConsultationOpen={openConsultation}
        />
<Videos
  onConsultationOpen={openConsultation}
/>
<Contact
  onConsultationOpen={openConsultation}
/>
      </main>


      <Footer
        onConsultationOpen={
          openConsultation
        }
      />


      <ConsultationModal
        isOpen={
          consultationOpen
        }
        onClose={
          closeConsultation
        }
      />


      <BookingModal
        isOpen={
          bookingOpen
        }
        onClose={
          closeBooking
        }
        program={
          selectedProgram
        }
      />

    </>
  );
}

export default Home;