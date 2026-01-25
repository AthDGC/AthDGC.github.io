'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, MapPinIcon, CalendarIcon, UserGroupIcon, AcademicCapIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import logos from '../content/logos.json';
import homeContent from '../content/home.json';
import abstractsData from '../content/abstracts.json';
import SimpleModal from './components/SimpleModal';
import ClickableSpeakerText from './components/ClickableSpeakerText';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const keynotes = [
  {
    name: 'Dag Trygve Truslew Haug',
    institution: 'University of Oslo, Norway',
    title: 'Keynote Speaker',
    talk: 'Diachronic corpora from Greek to Norwegian: Lessons learned and future plans',
    abstractKey: 'dag-haug'
  },
  {
    name: 'George Mikros',
    institution: 'Hamad Bin Khalifa University (HBKU), Qatar',
    title: 'Keynote Speaker',
    talk: 'Authenticating the Artificial: LLMs and the Stylometric Challenge of Ancient Greek Prose',
    abstractKey: 'george-mikros'
  },
  {
    name: 'Carola Trips',
    institution: 'University of Mannheim, Germany',
    title: 'Keynote Speaker',
    talk: 'Enriching annotated corpora to identify contact-induced change: new tools and methods',
    abstractKey: 'carola-trips'
  },
  {
    name: 'Alexandros Tantos',
    institution: 'Aristotle University of Thessaloniki, Greece',
    title: 'Keynote Speaker',
    talk: 'From Network Theory to Linguistic Insights',
    abstractKey: 'alexandros-tantos'
  },
  {
    name: 'Ioanna Sitaridou',
    institution: 'University of Cambridge, UK',
    title: 'Keynote Speaker',
    talk: 'Cue-based reconstruction: what annotated corpora can and cannot help with',
    abstractKey: 'ioanna-sitaridou'
  }
];

const schedule = {
  day0: {
    date: 'Wednesday, November 26',
    title: 'Arrival Day',
    sessions: [
      { time: '15:30', event: 'Departure from Syntagma Square, Athens' },
      { time: '19:00', event: 'Arrival at Delphi (approx.)' },
      { time: '20:30', event: 'Welcome Dinner at Vakhos Taverna in Delphi' }
    ]
  },
  day1: {
    date: 'Thursday, November 27',
    title: 'Opening & Foundations',
    sessions: [
      { time: '09:30', event: 'Registration & Welcome' },
      { time: '09:45', event: 'Workshop Opening by the Organizing Committee: Nikolaos Lavidas, Kiki Nikiforidou, Vassiliki Geka, Vassilios Symeonidis, Sofia Chionidi, Anastasia Tsiropina, Eleni Plakoutsi, Theodoros Michalareas (30 min)' },
      { time: '10:15', event: 'Presenting the Athens Digital Glossa Chronos (AthDGC) Project, NKUA: Retranslations Across Millennia - A diachronic Contrastive Corpus for Studying Interlingual and Intralingual Contact. By Nikolaos Lavidas, Theodoros Michalareas, Vassilios Symeonidis, Sofia Chionidi, Anastasia Tsiropina, Eleni Plakoutsi (75 min)' },
      { time: '11:30', event: 'Coffee Break' },
      { time: '12:00', event: 'KEYNOTE: Diachronic corpora from Greek to Norwegian: Lessons learned and future plans. By Dag Trygve Truslew Haug (60 min)' },
      { time: '13:00', event: 'Insubordination phenomena as a quintessential example of \'genre\'-dependent language change. By Mirjam Fried (30 min)' },
      { time: '13:30', event: 'Lunch at European Cultural Centre' },
      { time: '15:00', event: 'KEYNOTE: Enriching annotated corpora to identify contact-induced change: new tools and methods. By Carola Trips (60 min)' },
      { time: '16:00', event: 'Reportative constructions with inanimate subjects: The role of Latin and of genres in the evidential development of Italian volere. By Francesca Dell\'Oro (30 min)' },
      { time: '16:30', event: 'Coffee Break' },
      { time: '17:00', event: 'The semantic structured polysemy of the Ancient Greek Genitive: a holistic proposal. By Daniel Riaño Rufilanchas (30 min)' },
      { time: '17:30', event: 'On speakers and influential texts: Homeric epics and the anatomical lexicon in Greek literature. By Iván Andrés-Alba (30 min)' },
      { time: '18:00', event: 'Grammar in Motion: Diachronic Variation and the Linguistic Adaptability of Advertising. By Stavroula Kefala (30 min)' },
      { time: '18:30', event: 'Survival and revival of Latin derivational patterns in Romance languages. General trends and individual histories. By Claudio Iacobini (30 min)' },
      { time: '20:30', event: 'Dinner at Omphalos Tavern, Arachova' }
    ]
  },
  day2: {
    date: 'Friday, November 28',
    title: 'Deep Dive & Collaboration',
    sessions: [
      { time: '09:15', event: 'KEYNOTE: Authenticating the Artificial: LLMs and the Stylometric Challenge of Ancient Greek Prose. By George Mikros (60 min)' },
      { time: '10:15', event: 'Arrested change and construction preservation in the context of genre. The conservative effect of stage directions in English and Greek. By Kiki Nikiforidou (30 min)' },
      { time: '10:45', event: 'Coffee Break' },
      { time: '11:15', event: 'Tracks to the past and genre dynamics in zero/that complementation of the verb \'think\'. By Vassiliki Geka (30 min)' },
      { time: '11:45', event: 'Approaching anticipated events in the past: Linguistic, affective and genre-based motivations in language diachrony. By Anna Piata (30 min)' },
      { time: '12:15', event: 'Coffee Break' },
      { time: '12:45', event: 'Departure for the archaeological site of Delphi' },
      { time: '13:00', event: 'Guided Tour of Delphi Archaeological Site (2.5 hrs)' },
      { time: '16:00', event: 'Lunch at European Cultural Centre' },
      { time: '17:30', event: 'KEYNOTE: From Network Theory to Linguistic Insights. By Alexandros Tantos (60 min)' },
      { time: '18:30', event: 'Coffee Break #5' },
      { time: '19:00', event: 'KEYNOTE: Cue-based reconstruction: what annotated corpora can and cannot help with. By Ioanna Sitaridou (60 min)' },
      { time: '21:00', event: 'Gala Dinner at Vakhos Tavern' }
    ]
  },
  day3: {
    date: 'Saturday, November 29',
    title: 'Technology & Future Directions',
    sessions: [
      { time: '09:30', event: 'Special Session: Technology in the Service of Classical and Historical Languages. By Esteban Belmehdi, Ioanna Papadopoulou, Julien Razanajao, Mark Schiefsky (ARCAS Team, CHS Harvard University), and joint work with AthDGC, NKUA (60 min)' },
      { time: '10:30', event: 'Coffee Break #6' },
      { time: '11:00', event: 'Final Discussion: Planning Next Project (60 min)' },
      { time: '12:00', event: 'Closing Ceremony (30 min)' },
      { time: '12:30', event: 'Lunch at European Cultural Centre' },
      { time: '14:30', event: 'Departure' }
    ]
  }
};

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAbstract, setSelectedAbstract] = useState<{
    speaker: string;
    title: string;
    abstract: string;
  } | null>(null);

  const openAbstractModal = (abstractKey: string) => {
    const abstract = abstractsData.abstracts[abstractKey as keyof typeof abstractsData.abstracts];
    if (abstract) {
      setSelectedAbstract({
        speaker: abstract.name,
        title: abstract.title,
        abstract: abstract.abstract
      });
      setModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary-600">Delphi Workshop 2025</span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a href="#about" className="border-transparent text-gray-700 hover:border-primary-500 hover:text-primary-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                About
              </a>
              <a href="#keynotes" className="border-transparent text-gray-700 hover:border-primary-500 hover:text-primary-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Speakers
              </a>
              <a href="#program" className="border-transparent text-gray-700 hover:border-primary-500 hover:text-primary-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Program
              </a>
              <a href="#venue" className="border-transparent text-gray-700 hover:border-primary-500 hover:text-primary-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Venue
              </a>
              <a href="#contact" className="border-transparent text-gray-700 hover:border-primary-500 hover:text-primary-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-cover bg-center text-white py-24 sm:py-32"
        style={{ backgroundImage: `url(${homeContent.hero_background})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
            >
              Delphi Workshop 2025
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-4 text-xl sm:text-2xl font-light"
            >
              Corpora and Diachrony: Influential Texts, Text Types and Genres
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-lg"
            >
              <div className="flex items-center">
                <CalendarIcon className="h-6 w-6 mr-2" />
                <span>November 26-29, 2025</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-6 w-6 mr-2" />
                <span>Delphi, Greece</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About the Workshop
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              An intensive four-day workshop at the heart of ancient Delphi
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src={homeContent.about_image} alt="Ancient Manuscript" className="rounded-lg shadow-lg" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                This workshop represents the culmination of a major research project funded by the Hellenic Foundation for Research and Innovation (HFRI/ELIDEK). We are developing corpus-based valency lexica for ancient and medieval languages using innovative computational methods integrated with traditional philological expertise.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Set in the inspiring archaeological site of Delphi - ancient center of wisdom and prophecy - we explore how corpus-based methods illuminate patterns of language change across millennia.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-lg p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Fully Funded Workshop</h3>
            <p className="text-lg mb-4">
              All expenses are covered for participants. No registration fees. Accommodation, meals, and cultural program included.
            </p>
            <p className="text-base">
              Funded by the Hellenic Foundation for Research and Innovation (HFRI) under the "2nd Call for H.F.R.I. Research Projects to support Faculty Members & Researchers".
            </p>
            <p className="text-base mt-2">
              In cooperation with the Naxos School project on Diachronic Linguistics.
            </p>
          </motion.div>

          {/* Organizing Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Project Team (AthDGC)</h3>
              <p className="mt-2 text-gray-600">Athens Digital Glossa Chronos | National and Kapodistrian University of Athens</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                'Nikolaos Lavidas',
                'Kiki Nikiforidou',
                'Vassiliki Geka',
                'Vassileios Symeonidis',
                'Sofia Chionidi',
                'Anastasia Tsiropina',
                'Eleni Plakoutsi',
                'Theodoros Michalareas',
                'Evangelos Argyropoulos'
              ].map((organizer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <p className="text-gray-900 font-medium">{organizer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 items-center justify-items-center">
            {logos.items.map((logo: { name: string; src: string; href: string }) => (
              <a key={logo.name} href={logo.href} target="_blank" rel="noopener noreferrer" className="flex justify-center hover:opacity-80 hover:scale-105 transition-all duration-300">
                <img src={logo.src} alt={logo.name} className="h-40 object-contain" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* All Speakers Section */}
      <section id="keynotes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Speakers
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Distinguished scholars in the field
            </p>
          </div>

          {/* Keynote Speakers */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Keynote Speakers</h3>
            <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {keynotes.map((speaker, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all border border-gray-200"
                >
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{speaker.name}</h4>
                  <p className="text-base text-gray-600 mb-2">{speaker.institution}</p>
                  <button
                    onClick={() => openAbstractModal(speaker.abstractKey)}
                    className="text-sm text-gray-700 italic mb-3 hover:text-primary-600 transition-colors cursor-pointer text-left w-full underline decoration-dotted hover:decoration-solid"
                  >
                    {speaker.talk}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Invited Speakers */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Invited Speakers</h3>
            <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Iván Andrés-Alba", institution: "Universidad de Murcia, Spain", talk: "On speakers and influential texts: Homeric epics and the anatomical lexicon in Greek literature", abstractKey: "ivan-andres" },
                { name: "Francesca Dell'Oro", institution: "University of Bologna, Italy", talk: "Reportative constructions with inanimate subjects: The role of Latin and of genres in the evidential development of Italian volere", abstractKey: "francesca-delloro" },
                { name: "Mirjam Fried", institution: "Charles University, Prague, Czech Republic", talk: "Insubordination phenomena as a quintessential example of 'genre'-dependent language change", abstractKey: "mirjam-fried" },
                { name: "Stavroula Kefala", institution: "Hellenic Open University, Greece", talk: "Grammar in Motion: Diachronic Variation and the Linguistic Adaptability of Advertising", abstractKey: "stavroula-kefala" },
                { name: "Claudio Iacobini", institution: "University of Salerno, Italy", talk: "Survival and revival of Latin derivational patterns in Romance languages. General trends and individual histories", abstractKey: "claudio-iacobini" },
                { name: "Kiki Nikiforidou", institution: "National and Kapodistrian University of Athens, Greece", talk: "Arrested change and construction preservation in the context of genre. The conservative effect of stage directions in English and Greek", abstractKey: "kiki-nikiforidou" },
                { name: "Vassiliki Geka", institution: "National and Kapodistrian University of Athens, Greece", talk: "Tracks to the past and genre dynamics in zero/that complementation of the verb 'think'", abstractKey: "vassiliki-geka" },
                { name: "Anna Piata", institution: "National and Kapodistrian University of Athens, Greece", talk: "Approaching anticipated events in the past: Linguistic, affective and genre-based motivations in language diachrony", abstractKey: "anna-piata" },
                { name: "Daniel Riaño Rufilanchas", institution: "ILC, CCHS-CSIC, Spain", talk: "The semantic structured polysemy of the Ancient Greek Genitive: a holistic proposal", abstractKey: "daniel-riano" },
                { name: "Esteban Belmehdi, Ioanna Papadopoulou, Julien Razanajao, Mark Schiefsky", institution: "ARCAS Team, CHS, Harvard University, USA", talk: "Technology in the Service of Classical and Historical Languages", abstractKey: "chs-team" }
              ].map((speaker, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all border border-gray-200"
                >
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{speaker.name}</h4>
                  <p className="text-base text-gray-600 mb-2">{speaker.institution}</p>
                  <button
                    onClick={() => openAbstractModal(speaker.abstractKey)}
                    className="text-sm text-gray-700 italic mb-3 hover:text-primary-600 transition-colors cursor-pointer text-left w-full underline decoration-dotted hover:decoration-solid line-clamp-3"
                  >
                    {speaker.talk}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Project Presentation */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Project Presentation</h3>
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all border border-gray-200 text-center"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-2">Nikolaos Lavidas, Theodoros Michalareas, Vassilios Symeonidis, Sofia Chionidi, Anastasia Tsiropina, Eleni Plakoutsi</h4>
                <p className="text-base text-gray-600 mb-2">Athens Digital Glossa Chronos (AthDGC) | National and Kapodistrian University of Athens</p>
                <button
                  onClick={() => openAbstractModal("lavidas-team")}
                  className="text-sm text-gray-700 italic mb-3 hover:text-primary-600 transition-colors cursor-pointer underline decoration-dotted hover:decoration-solid"
                >
                  Retranslations Across Millennia: A diachronic Contrastive Corpus for Studying Interlingual and Intralingual Contact
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section id="program" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Four-Day Program
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              November 26-29, 2025
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {Object.entries(schedule).map(([key, day], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-primary-600 to-blue-600 p-6 text-white">
                  <h3 className="text-xl font-bold">{day.title}</h3>
                  <p className="mt-1 text-primary-100">{day.date}</p>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {day.sessions.map((session, idx) => (
                      <div key={idx} className="flex items-start border-l-2 border-primary-200 pl-4 py-2">
                        <span className="text-sm font-semibold text-primary-600 min-w-[60px]">{session.time}</span>
                        <div className="ml-3">
                          <ClickableSpeakerText text={session.event} onSpeakerClick={openAbstractModal} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section id="venue" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Venue & Travel
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              European Cultural Centre of Delphi
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <img src={homeContent.venue_image} alt="European Cultural Centre of Delphi" className="rounded-lg shadow-lg w-full h-auto" />
              <img src="images/Delphi-Eur Cultural Center-2.webp" alt="Conference venue interior" className="rounded-lg shadow-lg w-full h-auto" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Venue</h3>
              <p className="text-gray-700 mb-4">
                The workshop takes place at the European Cultural Centre of Delphi, located in the heart of the archaeological site. The Centre provides an inspiring setting for intellectual exchange, with modern facilities in a historically significant location.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Main conference room
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Breakout spaces for discussions
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  On-site guesthouse accommodation
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  WiFi and modern facilities
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Contact Information
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
              For inquiries about the workshop
            </p>
          </div>

          <div className="mt-10">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Organizers</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <p>Nikolaos Lavidas, Kiki Nikiforidou, Vassiliki Geka, Vassileios Symeonidis, Sofia Chionidi, Anastasia Tsiropina, Eleni Plakoutsi, Theodoros Michalareas</p>
                      <p className="mt-2 text-gray-600">National and Kapodistrian University of Athens</p>
                      <p className="mt-1">
                        <a href="mailto:nlavidas@enl.uoa.gr" className="text-primary-600 hover:text-primary-500">
                          nlavidas@enl.uoa.gr
                        </a>
                      </p>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <a href="#about" className="text-base text-gray-300 hover:text-white">
                About
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#keynotes" className="text-base text-gray-300 hover:text-white">
                Speakers
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#program" className="text-base text-gray-300 hover:text-white">
                Program
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#venue" className="text-base text-gray-300 hover:text-white">
                Venue
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#contact" className="text-base text-gray-300 hover:text-white">
                Contact
              </a>
            </div>
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
            <a href="https://github.com/nlavidas" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://github.com/AthDiaCorpus" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" title="AthDiaCorpus GitHub">
              <span className="sr-only">AthDiaCorpus GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            Licensed under CC BY-NC-SA 4.0
          </p>
        </div>
      </footer>

      {/* Abstract Modal */}
      {selectedAbstract && (
        <SimpleModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          speaker={selectedAbstract.speaker}
          title={selectedAbstract.title}
          abstract={selectedAbstract.abstract}
        />
      )}
    </div>
  );
}
