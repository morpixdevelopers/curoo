import React, { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Doctors from "./Doctors";
import AppointmentForm from "./AppointmentForm";
import AppointmentModal from "./AppointmentModal";
import Contact from "./Contact";
import Footer from "./Footer";

const MainWebsite: React.FC = () => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const openAppointmentModal = () => {
    setIsAppointmentModalOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onBookAppointment={openAppointmentModal} />
      <main>
        <Hero onBookAppointment={openAppointmentModal} />
        <About />
        <Services />
        <Doctors onBookAppointment={openAppointmentModal} />
        <Contact />
      </main>
      <Footer onBookAppointment={openAppointmentModal} />

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={closeAppointmentModal}
      />
    </div>
  );
};

export default MainWebsite;
