import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import { Booking } from "./models/Booking.js";
import { Consultation } from "./models/Consultation.js";
import { Contact } from "./models/Contact.js";

const realIndianBookings = [
  {
    bookingId: "RJV-2026-0941",
    name: "Vikramjit Sangwan",
    email: "vikram.sangwan88@gmail.com",
    phone: "+91 98124 55670",
    programId: "2",
    programName: "Pro Coaching",
    programSubtitle: "Closer guidance for consistent progress",
    mode: "online",
    amount: 2499,
    billingText: "/ month",
    paymentMethod: "PhonePe UPI",
    upiId: "9996889494@ybl",
    payeeName: "Rajiv Dalal",
    transactionId: "T261108142389104",
    paymentStatus: "verified",
    notes: "Target: 10kg fat loss, desk job in Gurugram Cyber City, vegetarian diet.",
    createdAt: new Date("2026-11-08T09:15:00Z"),
  },
  {
    bookingId: "RJV-2026-0883",
    name: "Ankit Sehrawat",
    email: "ankit.sehrawat92@yahoo.in",
    phone: "+91 94162 33419",
    programId: "3",
    programName: "Personal Training",
    programSubtitle: "Train directly with Rajiv in Bahadurgarh",
    mode: "offline",
    amount: 4999,
    billingText: "/ month",
    paymentMethod: "PhonePe UPI",
    upiId: "9996889494@ybl",
    payeeName: "Rajiv Dalal",
    transactionId: "T261105183920144",
    paymentStatus: "verified",
    notes: "In-person evening batch in Bahadurgarh. Form correction on squats and deadlifts.",
    createdAt: new Date("2026-11-05T13:20:00Z"),
  },
  {
    bookingId: "RJV-2026-0792",
    name: "Pooja Deshmukh",
    email: "pooja.deshmukh24@gmail.com",
    phone: "+91 97654 81230",
    programId: "1",
    programName: "Starter",
    programSubtitle: "Start with the right structure",
    mode: "online",
    amount: 999,
    billingText: "/ month",
    paymentMethod: "PhonePe UPI",
    upiId: "9996889494@ybl",
    payeeName: "Rajiv Dalal",
    transactionId: "T261102110294812",
    paymentStatus: "verified",
    notes: "Post-pregnancy stamina recovery, home dumbbell workout.",
    createdAt: new Date("2026-11-02T10:45:00Z"),
  },
  {
    bookingId: "RJV-2026-0648",
    name: "Devender Rathee",
    email: "devender.rathee@gmail.com",
    phone: "+91 99912 77801",
    programId: "4",
    programName: "Elite Coaching",
    programSubtitle: "Complete one-to-one transformation support",
    mode: "offline",
    amount: 7499,
    billingText: "/ month",
    paymentMethod: "PhonePe UPI",
    upiId: "9996889494@ybl",
    payeeName: "Rajiv Dalal",
    transactionId: "T261028165039281",
    paymentStatus: "verified",
    notes: "Full transformation support, body recomp & strength peaking.",
    createdAt: new Date("2026-10-28T16:50:00Z"),
  },
  {
    bookingId: "RJV-2026-0519",
    name: "Rohit Rathi",
    email: "rohit.rathi19@gmail.com",
    phone: "+91 98991 40582",
    programId: "2",
    programName: "Pro Coaching",
    programSubtitle: "Closer guidance for consistent progress",
    mode: "online",
    amount: 2499,
    billingText: "/ month",
    paymentMethod: "PhonePe UPI",
    upiId: "9996889494@ybl",
    payeeName: "Rajiv Dalal",
    transactionId: "T261021124409381",
    paymentStatus: "verified",
    notes: "Working professional in Delhi NCR. Gym 4 days a week.",
    createdAt: new Date("2026-10-21T12:44:00Z"),
  },
];

const realIndianConsultations = [
  {
    name: "Harish Malik",
    phone: "+91 98132 44901",
    email: "harish.malik07@gmail.com",
    goal: "Fat Loss",
    message: "Weight is 86kg at 5'9\". Gained weight in the last 2 years due to late work hours. Want a realistic diet that doesn't eliminate roti and dal.",
    status: "contacted",
    createdAt: new Date("2026-11-09T07:30:00Z"),
  },
  {
    name: "Sandeep Hooda",
    phone: "+91 94169 88120",
    email: "sandeep.hooda.rohtak@gmail.com",
    goal: "Strength & Performance",
    message: "Want to train in person with Rajiv Dalal in Bahadurgarh. Plateaued on bench press and deadlift for 6 months.",
    status: "new",
    createdAt: new Date("2026-11-09T14:10:00Z"),
  },
  {
    name: "Neha Kadian",
    phone: "+91 98965 22019",
    email: "neha.kadian94@gmail.com",
    goal: "Lifestyle Transformation",
    message: "Suffering from low energy, mild PCOD, and back stiffness. Need a guided coach to stay accountable every week.",
    status: "contacted",
    createdAt: new Date("2026-11-07T11:25:00Z"),
  },
  {
    name: "Deepak Kaushik",
    phone: "+91 99960 11483",
    email: "deepak.kaushik@outlook.com",
    goal: "Muscle Gain",
    message: "Skinny fat build. Need advice on whether online pro coaching is sufficient or if in-person supervision is necessary for form correction.",
    status: "converted",
    createdAt: new Date("2026-11-04T18:00:00Z"),
  },
  {
    name: "Manjeet Gill",
    phone: "+91 98721 90432",
    email: "manjeet.gill29@gmail.com",
    goal: "General Fitness",
    message: "Looking for sustainable habit coaching and injury-free workout planning.",
    status: "new",
    createdAt: new Date("2026-11-01T15:40:00Z"),
  },
];

const realIndianContacts = [
  {
    name: "Ramesh Chhikara",
    phone: "+91 98120 77610",
    email: "ramesh.chhikara@gmail.com",
    message: "Hi Rajiv, my son is preparing for army physical tests. Can he join your in-person personal training batch in Bahadurgarh?",
    status: "replied",
    createdAt: new Date("2026-11-06T08:15:00Z"),
  },
  {
    name: "Gaurav Gulia",
    phone: "+91 99923 66145",
    email: "gaurav.gulia91@gmail.com",
    message: "Are weekend batch slots available for personal training sessions in Bahadurgarh?",
    status: "unread",
    createdAt: new Date("2026-11-09T17:20:00Z"),
  },
  {
    name: "Sunil Dahiya",
    phone: "+91 98961 88321",
    email: "sunil.dahiya@gmail.com",
    message: "Loved your deadlift form breakdown video. Interested in 1:1 online coaching starting next Monday.",
    status: "replied",
    createdAt: new Date("2026-11-03T12:05:00Z"),
  },
];

async function seedDatabase() {
  console.log("=== POPULATING REAL INDIAN DUMMY DATA TO FREE TIER MONGODB ATLAS ===");
  await connectDB();

  // Clear any previous mock entries to have clean, real data
  await Booking.deleteMany({});
  await Consultation.deleteMany({});
  await Contact.deleteMany({});

  console.log("1. Inserting verified Bookings & PhonePe payments...");
  const insertedBookings = await Booking.insertMany(realIndianBookings);
  console.log(`   -> Successfully inserted ${insertedBookings.length} real bookings.`);

  console.log("2. Inserting real Consultations...");
  const insertedConsultations = await Consultation.insertMany(realIndianConsultations);
  console.log(`   -> Successfully inserted ${insertedConsultations.length} consultations.`);

  console.log("3. Inserting real Contact messages...");
  const insertedContacts = await Contact.insertMany(realIndianContacts);
  console.log(`   -> Successfully inserted ${insertedContacts.length} contacts.`);

  console.log("\n=== DATABASE SEEDING COMPLETED SUCCESSFULLY! ===");
  process.exit(0);
}

seedDatabase().catch((err) => {
  console.error("SEEDING FAILED:", err);
  process.exit(1);
});
