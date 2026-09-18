import heroManali from "@/assets/hero-manali.jpg";
import heroUttarakhand from "@/assets/hero-uttarakhand.jpg";
import packageJaipur from "@/assets/package-jaipur.jpg";
import packageGoa from "@/assets/package-goa.jpg";
import packageLadakh from "@/assets/package-ladakh.jpg";
import heroKashmir from "@/assets/hero-kashmir.jpg";

export const WHATSAPP_NUMBER = "8652885584";

export const BOOKING_CONTACTS = ["9136340844", "9082236015", "7900150620"];

export const whatsappLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const bookPackageMessage = (pkg: { title: string; duration: string }): string =>
  `Hello SNAV Tourism! I want to book the ${pkg.title} (${pkg.duration}). Please share availability and booking details.`;

export interface PricingRow {
  sharing: string;
  occupancy?: string;
  boarding?: string;
  price: number;
}

export interface PricingGroup {
  label: string;
  rows: PricingRow[];
}

export interface ItineraryDay {
  title: string;
  points: string[];
  meals: string;
  stay?: string;
}

export interface StayPlanRow {
  day: string;
  accommodation: string;
  meals: string;
}

export interface HotelRow {
  location: string;
  hotels: string;
}

export interface CancellationTableRow {
  before: string;
  deduction: string;
}

export interface ChildPolicyRow {
  age: string;
  charge: string;
}

export interface TourPackage {
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  shortDuration: string;
  route: string[];
  transport: string;
  startingPrice: number;
  startingPriceNote?: string;
  highlights: string[];
  activities: string[];
  image: string;
  imageAlt: string;
  days: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  pricingGroups: PricingGroup[];
  installments?: string;
  pricingNotes?: string[];
  bookingAmount?: string;
  childPolicy?: ChildPolicyRow[];
  stayPlan: StayPlanRow[];
  hotels: HotelRow[];
  terms: string[];
  cancellationPoints: string[];
  cancellationTable: CancellationTableRow[];
  cancellationTail?: string[];
  notes?: string[];
}

export const tourPackages: TourPackage[] = [
  {
    slug: "himachal-09n-10d",
    title: "Himachal Grand Escape",
    tagline: "Shimla, Manali, Kasol, Dharamshala & Amritsar",
    duration: "9 Nights / 10 Days",
    shortDuration: "09N / 10D",
    route: ["Mumbai", "Chandigarh", "Shimla", "Manali", "Kasol", "Dharamshala", "Amritsar", "Mumbai"],
    transport: "Train (Mumbai–Mumbai) + Pushback Bus",
    startingPrice: 14999,
    highlights: [
      "Kufri & Jakhu Temple in Shimla",
      "Solang Valley & the Atal Tunnel",
      "Manikaran Sahib & Kasol",
      "McLeodganj & the Dalai Lama Temple",
      "Golden Temple & Wagah Border",
    ],
    activities: ["River Rafting", "DJ Night", "Bonfire"],
    image: heroManali,
    imageAlt: "Snow-capped peaks and pine valleys of Himachal Pradesh",
    days: [
      {
        title: "Mumbai to Chandigarh Journey",
        points: [
          "Assemble at the designated railway station in Mumbai.",
          "Meet the tour coordinator and fellow travellers.",
          "Begin your journey towards Chandigarh.",
        ],
        meals: "Not Included",
        stay: "Overnight train",
      },
      {
        title: "Chandigarh to Shimla",
        points: [
          "Arrive in Chandigarh and load luggage into the vehicle.",
          "Scenic drive towards Shimla with beautiful hills and valleys en route.",
          "Check in to the hotel, freshen up and relax.",
        ],
        meals: "Lunch, Dinner",
        stay: "Shimla stay",
      },
      {
        title: "Shimla Sightseeing & Transfer to Manali",
        points: ["Breakfast and check out from the hotel.", "Local sightseeing — Kufri, Jakhu Temple and Mall Road.", "Evening: journey towards Manali, dinner en route."],
        meals: "Breakfast, Dinner",
        stay: "Overnight journey",
      },
      {
        title: "Arrival in Manali & Local Sightseeing",
        points: ["On arrival in Manali, enjoy River Rafting and check in to the hotel.", "Local sightseeing — Hidimba Devi Temple and Mall Road.", "Return to the hotel for dinner."],
        meals: "Breakfast, Dinner",
        stay: "Manali stay",
      },
      {
        title: "Solang Valley & Atal Tunnel Excursion",
        points: ["Breakfast at the hotel.", "Proceed towards Solang Valley and spend time amidst snow-capped mountains.", "Visit the iconic Atal Tunnel and return in the evening."],
        meals: "Breakfast, Dinner",
        stay: "Manali stay",
      },
      {
        title: "Manali – Kasol – Dharamshala",
        points: ["Breakfast and check out.", "Drive towards Kasol; visit Manikaran Sahib Gurudwara.", "Explore Kasol Market and continue to Dharamshala, dinner en route."],
        meals: "Breakfast, Dinner",
        stay: "Overnight journey",
      },
      {
        title: "Dharamshala & McLeodganj Sightseeing",
        points: ["Arrive, check in and freshen up.", "McLeodganj, Dalai Lama Temple, Tibetan Market and HPCA Cricket Stadium.", "Return to the hotel, dinner and overnight stay."],
        meals: "Breakfast, Dinner",
        stay: "Dharamshala stay",
      },
      {
        title: "Dharamshala to Amritsar Sightseeing",
        points: ["Breakfast and check out.", "Local sightseeing: Golden Temple, Jallianwala Bagh and the Wagah Border ceremony.", "Evening check in, dinner and overnight stay."],
        meals: "Breakfast, Dinner",
        stay: "Amritsar stay",
      },
      {
        title: "Amritsar to Mumbai Journey",
        points: ["Breakfast and check out.", "Transfer to the railway station.", "Begin the return journey towards Mumbai."],
        meals: "Breakfast",
        stay: "Overnight train",
      },
      {
        title: "Arrival in Mumbai",
        points: ["Arrive in Mumbai.", "Tour concludes with unforgettable memories."],
        meals: "Not Included",
        stay: "—",
      },
    ],
    inclusions: [
      "Mumbai–Mumbai train tickets as per the selected train/class.",
      "3-star hotel accommodation on quad-sharing basis.",
      "Meals as mentioned in the itinerary.",
      "River Rafting adventure as per the itinerary.",
      "DJ Night and Bonfire evening.",
      "Professional Tour Manager throughout the journey.",
      "Pick-up, drop-off and local sightseeing in a pushback bus.",
      "Parking charges, luxury tax, toll tax, green tax and driver stay charges.",
    ],
    exclusions: [
      "Additional costs due to train/flight delays, cancellations or unforeseen circumstances.",
      "Any adventure activity or service not mentioned in the inclusions.",
      "Entry tickets, camera fees and applicable permits.",
      "Drinks and beverages — alcoholic, soft, aerated and mineral water.",
      "Personal expenses and optional activities.",
      "Anything not specifically mentioned under package inclusions.",
    ],
    pricingGroups: [
      {
        label: "Mumbai to Mumbai (SL Train)",
        rows: [
          { sharing: "Quad", occupancy: "4 in one room", price: 14999 },
          { sharing: "Triple", occupancy: "3 in one room", price: 15999 },
          { sharing: "Dual", occupancy: "2 in one room", price: 17499 },
        ],
      },
      {
        label: "Mumbai to Mumbai (3AC Train)",
        rows: [
          { sharing: "Quad", occupancy: "4 in one room", price: 17499 },
          { sharing: "Triple", occupancy: "3 in one room", price: 18499 },
          { sharing: "Dual", occupancy: "2 in one room", price: 19999 },
        ],
      },
    ],
    installments: "First ₹4,000 per person (non-refundable) · Second ₹8,000 per person · Third — balance amount.",
    pricingNotes: [
      "For triple and quad sharing, the hotel provides an extra mattress; no extra bed is provided. Hotels are subject to availability.",
      "Rates are not valid for the 31st December week batch. Separate rates apply.",
    ],
    stayPlan: [
      { day: "1", accommodation: "Train journey Mumbai to Chandigarh", meals: "Not included" },
      { day: "2", accommodation: "Shimla stay", meals: "Lunch, Dinner" },
      { day: "3", accommodation: "Manali overnight journey", meals: "Breakfast, Dinner" },
      { day: "4", accommodation: "Manali stay", meals: "Breakfast, Dinner" },
      { day: "5", accommodation: "Manali stay", meals: "Breakfast, Dinner" },
      { day: "6", accommodation: "Overnight to Dharamshala", meals: "Breakfast, Dinner" },
      { day: "7", accommodation: "Dharamshala stay", meals: "Breakfast, Dinner" },
      { day: "8", accommodation: "Amritsar stay", meals: "Breakfast, Dinner" },
      { day: "9", accommodation: "Train journey to Mumbai", meals: "Breakfast" },
      { day: "10", accommodation: "Reach Mumbai", meals: "Not included" },
    ],
    hotels: [
      { location: "Shimla", hotels: "3 Star Luxury" },
      { location: "Manali", hotels: "3 Star Luxury" },
      { location: "Dharamshala", hotels: "3 Star Luxury" },
      { location: "Amritsar", hotels: "3 Star Luxury" },
    ],
    terms: [
      "SNAV Tourism LLP is not responsible for additional charges from unforeseen events — accidents, vehicle breakdowns, riots, train delays, etc.",
      "An additional amount will be charged if the government declares new guidelines on hotel stays or transportation.",
      "The tour manager may modify and amend the tour schedule without prior intimation for everyone's convenience.",
      "SNAV is not responsible for unconfirmed or RAC train tickets. Train ticket confirmation must be made at least 62 days prior.",
      "The on-trip manager may dismiss any person creating an unhealthy environment for others.",
      "SNAV is not responsible if sightseeing is cancelled due to natural calamities or man-made incidents.",
      "SNAV is not responsible for false or incorrect information submitted by participants to government authorities.",
      "Any discrepancy during the tour is the sole responsibility of the customer.",
      "Photo ID proof must be submitted for all travelling persons at the time of booking.",
      "No refund during the trip or within 10 days before the trip for train ticket cancellations.",
      "Confirmed railway seats are subject to availability — book early.",
    ],
    cancellationPoints: [
      "First installment is strictly non-refundable and non-transferable.",
      "If a guest books air tickets independently after booking the train package, SNAV must be informed well in advance. If informed within 48 hours of the scheduled train journey, no refund is provided for the train ticket.",
      "No refund for unutilised services.",
      "If a phenomenon makes the tour impossible to conduct, the advance paid can be transferred to another tour.",
    ],
    cancellationTable: [
      { before: "Booking date to 45 days", deduction: "30% of total tour cost" },
      { before: "45 to 30 days", deduction: "50% of total tour cost" },
      { before: "30 to 15 days", deduction: "75% of total tour cost" },
      { before: "15 days or less", deduction: "100% — no refund" },
    ],
    cancellationTail: ["No refund for train ticket cancellations within 10 days of departure or during the trip."],
  },
  {
    slug: "uttarakhand-08n-09d",
    title: "Majestic Uttarakhand",
    tagline: "Nature's masterpiece — Corbett, Nainital, Mussoorie & Rishikesh",
    duration: "8 Nights / 9 Days",
    shortDuration: "08N / 09D",
    route: ["Mumbai", "Delhi", "Jim Corbett", "Nainital", "Mussoorie", "Rishikesh", "Delhi", "Mumbai"],
    transport: "3AC Train (Mumbai–Mumbai) + Non-AC Pushback Private Bus",
    startingPrice: 16999,
    highlights: [
      "Jim Corbett jungle safari",
      "Naini Lake & Kaichi Dham",
      "Kempty Falls & Gun Hill, Mussoorie",
      "Ganga Aarti at Rishikesh",
      "Har Ki Pauri & Ram Jhula",
    ],
    activities: ["Jungle Safari", "River Rafting", "DJ Night", "Bonfire"],
    image: heroUttarakhand,
    imageAlt: "Emerald Himalayan foothills of Uttarakhand",
    days: [
      {
        title: "Mumbai to Delhi",
        points: ["Assemble at Bandra Terminus for the overnight train journey towards Haridwar — the gateway to the Himalayas."],
        meals: "No meals",
        stay: "Overnight train",
      },
      {
        title: "Delhi to Jim Corbett",
        points: ["Arrive at Delhi and continue the drive to Jim Corbett.", "By evening, check in at the hotel, dinner and relax amidst nature."],
        meals: "Dinner",
        stay: "Jim Corbett stay",
      },
      {
        title: "Jungle Safari & Kaichi Dham Darshan",
        points: ["Early morning jungle safari.", "Return to the hotel for brunch.", "Proceed to Kaichi Dham — Neem Karoli Baba Ashram for darshan.", "Evening free for fun, music and good vibes."],
        meals: "Brunch, Dinner",
        stay: "Jim Corbett stay",
      },
      {
        title: "Nainital to Mussoorie",
        points: ["Breakfast and check out.", "Explore Nainital — Naina Devi Temple, Naini Lake, Mall Road, Tibetan Market and local cafés.", "Board the bus for the overnight journey to Mussoorie; dinner en route."],
        meals: "Breakfast, Dinner",
        stay: "Overnight journey",
      },
      {
        title: "Mussoorie",
        points: ["Reach Mussoorie by morning; visit Kempty Waterfall.", "Check in at the hotel and relax.", "Evening: Mall Road and Gun Hill Point. Landour can be visited on your own."],
        meals: "Breakfast, Dinner",
        stay: "Mussoorie stay",
      },
      {
        title: "Mussoorie to Rishikesh",
        points: ["Breakfast and check out; head towards Rishikesh.", "Adventure activities including river rafting.", "Evening: Ganga Aarti, local market and Ram Jhula."],
        meals: "Breakfast, Dinner",
        stay: "Rishikesh stay",
      },
      {
        title: "Rishikesh to Delhi",
        points: ["Morning river rafting session.", "Breakfast and Rishikesh sightseeing.", "Evening: begin the overnight journey to Delhi, visiting Har Ki Pauri on the way."],
        meals: "Breakfast, Dinner",
        stay: "Overnight journey",
      },
      {
        title: "Delhi to Mumbai",
        points: ["Arrive in Delhi by morning and catch the train back to Mumbai."],
        meals: "No meals",
        stay: "Overnight train",
      },
      {
        title: "Mumbai",
        points: ["Arrive in Mumbai with dreams, memories and beautiful moments from the trip."],
        meals: "No meals",
        stay: "—",
      },
    ],
    inclusions: [
      "3AC train tickets from Mumbai to Mumbai.",
      "3-star accommodations on quad-sharing basis.",
      "Jungle Safari.",
      "Professional Tour Manager throughout the journey.",
      "Meals as per itinerary (buffet system in hotels; veg-only option for en-route meals).",
      "River Rafting.",
      "Pick-up and drop sightseeing in a non-AC pushback private bus.",
      "DJ Night session and Bonfire.",
      "Parking charges, luxury tax, toll tax, green tax and driver stay.",
    ],
    exclusions: [
      "Train meals.",
      "Entry tickets at sightseeing places.",
      "Rental clothes, accessories and any activity cost.",
      "Vehicle service on leisure days and after the day's sightseeing is finished.",
      "Additional costs due to train/flight cancellation, etc.",
      "Anything not specifically included in the inclusions section.",
    ],
    pricingGroups: [
      {
        label: "Sharing Price / Person",
        rows: [
          { sharing: "Quad", price: 16999 },
          { sharing: "Triple", price: 17999 },
          { sharing: "Dual", price: 18999 },
        ],
      },
    ],
    installments: "First (booking amount) ₹4,000 · Second ₹8,000 · Third — balance amount.",
    pricingNotes: [
      "Booking amount is non-refundable under any circumstances.",
      "The above rates are not applicable for the 25 December and 27 December batches. 27 December batch: ₹1,500 per person extra.",
    ],
    stayPlan: [
      { day: "1", accommodation: "Train journey to Delhi", meals: "No meals" },
      { day: "2", accommodation: "Jim Corbett stay", meals: "Dinner" },
      { day: "3", accommodation: "Jim Corbett stay", meals: "Brunch, Dinner" },
      { day: "4", accommodation: "Overnight journey to Mussoorie", meals: "Breakfast, Dinner" },
      { day: "5", accommodation: "Mussoorie stay", meals: "Breakfast, Dinner" },
      { day: "6", accommodation: "Rishikesh stay", meals: "Breakfast, Dinner" },
      { day: "7", accommodation: "Overnight journey to Delhi", meals: "Breakfast, Dinner" },
      { day: "8", accommodation: "Train journey to Mumbai", meals: "No meals" },
      { day: "9", accommodation: "Arrive in Mumbai", meals: "No meals" },
    ],
    hotels: [
      { location: "Jim Corbett", hotels: "3 Star Luxury" },
      { location: "Nainital", hotels: "3 Star Luxury" },
      { location: "Mussoorie", hotels: "3 Star Luxury" },
      { location: "Rishikesh", hotels: "3 Star Luxury" },
    ],
    terms: [
      "The organisers/company are not responsible for additional price due to accidents, vehicle breakdown, riot, train delay, etc.",
      "Extra will be charged if the government declares new guidelines on hotel stay or transportation. The schedule may be changed on the spot by the manager.",
      "The company is not responsible for unconfirmed or RAC train tickets. Train ticket confirmation must be made at least 120 days prior.",
      "The on-trip manager may dismiss any person creating an unhealthy environment for others.",
      "The company is not responsible if sightseeing is cancelled due to natural calamities or man-made incidents.",
      "The company is not responsible for false or incorrect information submitted to government authorities.",
      "Any discrepancy during the tour is the sole responsibility of the customer.",
      "Photo ID proof must be submitted for all travelling persons at the time of booking.",
      "No refund during the trip or within 10 days before the trip for train ticket cancellations.",
      "The above rates are not applicable for the 25 December and 27 December batches, which follow a different itinerary.",
      "Room allocation is decided by gender ratio and room-sharing availability at the time of allocation. SNAV may adjust the booking from triple to quad sharing or vice versa.",
    ],
    cancellationPoints: [
      "Booking amount is non-refundable.",
      "If you book air tickets on your own after paying for the 3AC package, no train ticket cancellation amount will be transferred to you.",
      "No refund for any unutilised service.",
      "The tour may be cancelled or postponed due to circumstances — the amount is non-refundable but transferable.",
    ],
    cancellationTable: [
      { before: "Booking date to 30 days", deduction: "30% of tour cost" },
      { before: "29 to 15 days", deduction: "75% of tour cost" },
      { before: "15 days or less", deduction: "100% — total amount forfeited" },
    ],
    cancellationTail: ["No refund during the trip or within 10 days before the trip for train ticket cancellations."],
  },
  {
    slug: "royal-rajasthan-08n-09d",
    title: "Royal Rajasthan",
    tagline: "Forts, dunes & palaces — Jodhpur, Jaisalmer, Jaipur & Udaipur",
    duration: "8 Nights / 9 Days",
    shortDuration: "08N / 09D",
    route: ["Mumbai", "Jodhpur", "Jaisalmer", "Jaipur", "Kishangarh", "Udaipur", "Mumbai"],
    transport: "Train (Mumbai–Mumbai) + AC Bus Sightseeing",
    startingPrice: 15999,
    highlights: [
      "Mehrangarh Fort & Jaswant Thada",
      "Sam Sand Dunes desert camp",
      "Jaisalmer Fort — the living golden fort",
      "Amber Fort, Hawa Mahal & Jantar Mantar",
      "City Palace & Lake Pichola, Udaipur",
    ],
    activities: ["Camel Ride", "Jeep Desert Safari", "Rajasthani Folk Dance", "DJ Night", "Bonfire"],
    image: packageJaipur,
    imageAlt: "Hawa Mahal and the royal palaces of Rajasthan",
    days: [
      {
        title: "Mumbai to Jodhpur",
        points: ["Assemble at Mumbai Railway Station in the afternoon.", "Board the train to Jodhpur and begin your Rajasthan journey.", "Overnight train journey towards the Blue City."],
        meals: "Not Included",
        stay: "Overnight train",
      },
      {
        title: "Jodhpur Arrival & Sightseeing",
        points: ["Arrive in Jodhpur, check in, freshen up and have breakfast.", "Visit the magnificent Mehrangarh Fort.", "Explore Jaswant Thada and Umaid Bhawan Palace.", "Evening shopping at Clock Tower Market.", "Dinner and overnight stay."],
        meals: "Breakfast, Dinner",
        stay: "Jodhpur stay",
      },
      {
        title: "Jodhpur to Jaisalmer | Desert Camp Experience",
        points: ["Breakfast, check out and proceed towards Jaisalmer.", "Visit Patwon Ki Haveli and Gadisar Lake.", "Proceed to Sam Sand Dunes Desert Camp — camel ride and jeep safari across the desert.", "Traditional cultural evening with Rajasthani folk dance and music.", "DJ Night followed by dinner; overnight at the desert camp."],
        meals: "Breakfast, Dinner",
        stay: "Jaisalmer desert camp",
      },
      {
        title: "Jaisalmer Sightseeing to Jaipur",
        points: ["Breakfast and check out from the desert camp.", "Visit Jaisalmer Fort (Sonar Quila).", "Explore Salim Singh Ki Haveli and Nathmal Ki Haveli.", "Begin the overnight journey to Jaipur by bus."],
        meals: "Breakfast, Dinner",
        stay: "Overnight journey",
      },
      {
        title: "Jaipur Arrival & Sightseeing",
        points: ["Arrive in Jaipur, check in, freshen up and relax.", "After lunch, visit Albert Hall Museum, Birla Temple and Hawa Mahal.", "Evening shopping at Bapu Bazaar / Johri Bazaar.", "Return to the hotel for dinner and overnight stay."],
        meals: "Breakfast, Dinner",
        stay: "Jaipur stay",
      },
      {
        title: "Jaipur Sightseeing",
        points: ["Breakfast, then a full-day Jaipur sightseeing tour.", "Visit Amber Fort, Jal Mahal, City Palace and Jantar Mantar (UNESCO World Heritage Site).", "Evening free for leisure or optional activities."],
        meals: "Breakfast, Dinner",
        stay: "Jaipur stay",
      },
      {
        title: "Jaipur – Kishangarh – Udaipur",
        points: ["Breakfast and check out.", "Depart for the City of Lakes — Udaipur.", "En route, visit the Kishangarh Snow Yard photo spot.", "On arrival in Udaipur, check in and relax. Evening free for the local market."],
        meals: "Breakfast, Dinner",
        stay: "Udaipur stay",
      },
      {
        title: "Udaipur Sightseeing to Mumbai",
        points: ["Breakfast, then Udaipur sightseeing.", "Visit City Palace, Lake Pichola, Saheliyon Ki Bari and Fateh Sagar Lake.", "Evening: board the train for Mumbai; overnight journey."],
        meals: "Breakfast",
        stay: "Overnight train",
      },
      {
        title: "Arrival in Mumbai",
        points: ["Arrive in Mumbai in the morning.", "Conclude your Rajasthan journey with beautiful memories."],
        meals: "Not Included",
        stay: "—",
      },
    ],
    inclusions: [
      "Train ticket (Mumbai to Mumbai).",
      "Accommodation in the best 3-star hotels on sharing basis.",
      "Meals as per the itinerary.",
      "Sightseeing by AC bus.",
      "Bonfire and DJ Night session.",
      "Camel ride, desert safari and cultural activities (Rajasthani folk dance).",
      "Professional tour guide throughout the tour.",
      "Parking charges, luxury tax, toll tax, green tax and driver stay.",
    ],
    exclusions: [
      "Additional costs due to train/flight cancellation, etc.",
      "Any adventure activity not mentioned under inclusions.",
      "Entry tickets.",
      "Any kind of drinks (alcoholic, mineral, aerated) and camera fees.",
      "Any extra services or activity charges other than those included in the itinerary.",
    ],
    pricingGroups: [
      {
        label: "Mumbai to Mumbai (SL Train)",
        rows: [
          { sharing: "Quad", occupancy: "4 in one room", price: 15999 },
          { sharing: "Triple", occupancy: "3 in one room", price: 16999 },
          { sharing: "Dual", occupancy: "2 in one room", price: 19999 },
        ],
      },
      {
        label: "Mumbai to Mumbai (3AC Train)",
        rows: [
          { sharing: "Quad", occupancy: "4 in one room", price: 17999 },
          { sharing: "Triple", occupancy: "3 in one room", price: 18999 },
          { sharing: "Dual", occupancy: "2 in one room", price: 21999 },
        ],
      },
    ],
    installments: "First ₹4,000 per person (non-refundable) · Second ₹8,000 per person · Third — balance amount.",
    pricingNotes: [
      "Rates below apply to regular batches. The 26 December and 27 December batches follow the same itinerary with an additional charge of ₹2,500 per person; applicable rates will be communicated separately.",
      "Rates are not valid for the 31st December week batch. Separate rates apply.",
      "For triple and quad sharing, the hotel provides an extra mattress; no extra bed is provided.",
    ],
    stayPlan: [
      { day: "1", accommodation: "Train journey Mumbai to Jodhpur", meals: "Not included" },
      { day: "2", accommodation: "Jodhpur stay", meals: "Breakfast, Dinner" },
      { day: "3", accommodation: "Jaisalmer camp stay", meals: "Breakfast, Dinner" },
      { day: "4", accommodation: "Overnight journey towards Jaipur", meals: "Breakfast, Dinner" },
      { day: "5", accommodation: "Jaipur stay", meals: "Breakfast, Dinner" },
      { day: "6", accommodation: "Jaipur stay", meals: "Breakfast, Dinner" },
      { day: "7", accommodation: "Udaipur stay", meals: "Breakfast, Dinner" },
      { day: "8", accommodation: "Overnight train journey", meals: "Breakfast" },
      { day: "9", accommodation: "Reach Mumbai", meals: "Not included" },
    ],
    hotels: [
      { location: "Jodhpur", hotels: "3 Star Luxury" },
      { location: "Jaisalmer", hotels: "3 Star Luxury" },
      { location: "Jaipur", hotels: "3 Star Luxury" },
      { location: "Udaipur", hotels: "3 Star Luxury" },
    ],
    terms: [
      "SNAV Tourism LLP is not responsible for additional charges from unforeseen events — accidents, vehicle breakdowns, riots, train delays, etc.",
      "An additional amount will be charged if the government declares new guidelines on hotel stays or transportation.",
      "The tour manager may modify and amend the tour schedule without prior intimation.",
      "SNAV is not responsible for unconfirmed or RAC train tickets. Confirmation must be made at least 62 days prior.",
      "The on-trip manager may dismiss any person creating an unhealthy environment for others.",
      "SNAV is not responsible if sightseeing is cancelled due to natural calamities or man-made incidents.",
      "SNAV is not responsible for false or incorrect information submitted to government authorities.",
      "Any discrepancy during the tour is the sole responsibility of the customer.",
      "Photo ID proof must be submitted for all travelling persons at the time of booking.",
      "No refund during the trip or within 10 days before the trip for train ticket cancellations.",
      "In case of heavy traffic or prevailing conditions, the operator may use Jaipur Metro or other local transport; tickets borne by the customer.",
      "Nuisance behaviour during the trip or with the coordinator will result in strict action.",
    ],
    cancellationPoints: [
      "First installment is strictly non-refundable and non-transferable.",
      "If a guest books air tickets independently after booking the train package, SNAV must be informed well in advance. If informed within 48 hours of the scheduled train journey, no refund is provided for the train ticket.",
      "No refund for unutilised services.",
      "If a phenomenon makes the tour impossible to conduct, the advance paid can be transferred to another tour.",
    ],
    cancellationTable: [
      { before: "Booking date to 45 days", deduction: "30% of total tour cost" },
      { before: "45 to 30 days", deduction: "50% of total tour cost" },
      { before: "30 to 15 days", deduction: "75% of total tour cost" },
      { before: "15 days or less", deduction: "100% — no refund" },
    ],
    cancellationTail: [
      "No refund for train ticket cancellations within 10 days of departure or during the trip.",
      "Room allocation is subject to gender ratio and availability; triple sharing may be adjusted to quad sharing or vice versa.",
    ],
  },
  {
    slug: "hampi-gokarna-5n-6d",
    title: "Hampi & Gokarna",
    tagline: "Ancient ruins by day, golden beaches by night",
    duration: "5 Nights / 6 Days",
    shortDuration: "05N / 06D",
    route: ["Mumbai / Pune", "Hampi", "Honnavar", "Murudeshwar", "Gokarna", "Yana", "Mumbai / Pune"],
    transport: "AC Bus (Mumbai–Mumbai & Pune–Pune)",
    startingPrice: 12999,
    startingPriceNote: "Pune boarding, quad sharing",
    highlights: [
      "Sanapur Lake coracle ride",
      "Virupaksha & Vittala Temples, Stone Chariot",
      "Anjanadri Hill trek",
      "Murudeshwar Shiva statue",
      "Gokarna beaches & Yana Caves",
    ],
    activities: ["Coracle Ride", "Anjanadri Trek", "Honnavar Backwater Boating", "Yana Caves Trek"],
    image: packageGoa,
    imageAlt: "Golden beaches and tropical coast of the Konkan",
    days: [
      {
        title: "Mumbai / Pune Pickup",
        points: [
          "Reporting at respective pickup points; pinned locations conveyed to the group before the trip.",
          "Mumbai: Borivali – Goregaon – Andheri – Sion – Nerul – Kalamboli.",
          "Pune: Wakad – Navle Bridge – Chandani Chowk.",
          "Bus starts from Borivali at 04:30 PM; Chandani Chowk is the last pickup around 08:30 PM.",
        ],
        meals: "Not Included",
        stay: "Overnight bus",
      },
      {
        title: "Sanapur Lake & Anjanadri Hill",
        points: ["Reach the hotel, freshen up and have breakfast.", "Visit Sanapur Lake for a coracle ride.", "Anjanadri Hill Trek (1.5–2 hrs) and visit Shri Durgamma Devi Temple.", "Return to the hotel, dinner and relax."],
        meals: "Breakfast, Dinner",
        stay: "Hampi stay",
      },
      {
        title: "Hampi Sightseeing & Journey to Honnavar",
        points: ["Explore Hampi Bazaar, Virupaksha Temple, Monolithic Nandi and Vittala Temple.", "Visit the Stone Chariot and Musical Pillars.", "Hike up to Hemakuta Hills for the sunset.", "Journey towards Honnavar with dinner en route; late-night check-in at the homestay."],
        meals: "Breakfast, Dinner",
        stay: "Honnavar homestay",
      },
      {
        title: "Honnavar, Murudeshwar & Gokarna",
        points: ["Breakfast and a 45-minute backwater boat ride in Honnavar.", "Proceed to Murudeshwar — Temple, Beach and the iconic Shiva Statue.", "Proceed to Gokarna, check in, visit the beach for the sunset.", "Dinner and a peaceful local walk."],
        meals: "Breakfast, Dinner",
        stay: "Gokarna stay",
      },
      {
        title: "Yana Caves & Return to Mumbai",
        points: ["Early visit to Mahabaleshwar Temple and Maha Ganpati Deva Temple.", "Breakfast, check out and proceed to Yana Caves — 20–25 min trek.", "Lunch at a local restaurant.", "Depart for Mumbai."],
        meals: "Breakfast",
        stay: "Overnight bus",
      },
      {
        title: "Arrival: Mumbai / Pune",
        points: ["Reach Pune at 5:30 AM and Mumbai at 09:00 AM. Timings may vary due to traffic and unpredictable situations."],
        meals: "Not Included",
        stay: "—",
      },
    ],
    inclusions: [
      "AC bus travel: Mumbai–Mumbai and Pune–Pune.",
      "3 nights accommodation on sharing basis — quad, triple or double, as selected.",
      "Professional Tour Manager throughout the journey.",
      "4 breakfasts and 3 dinners.",
      "Coracle ride — available once during the trip.",
      "Honnavar backwater boating.",
      "Complete guided sightseeing as per the itinerary.",
      "Parking charges, toll tax, green tax and driver stay.",
    ],
    exclusions: [
      "Lunch and travelling meals.",
      "Entry charges, if any.",
      "Any cost not mentioned in the inclusions.",
      "Extended stay due to weather conditions or situations beyond human control.",
      "Personal expenses and beverages.",
      "GST.",
    ],
    pricingGroups: [
      {
        label: "Sharing & Boarding / Person",
        rows: [
          { sharing: "Quad", boarding: "Pune", price: 12999 },
          { sharing: "Quad", boarding: "Mumbai", price: 13999 },
          { sharing: "Dual", boarding: "Pune", price: 15999 },
          { sharing: "Dual", boarding: "Mumbai", price: 16999 },
        ],
      },
    ],
    bookingAmount: "₹3,000 per person, non-refundable, payable at the time of booking. Remaining balance to be paid one day prior to the trip.",
    childPolicy: [
      { age: "Below 5 years", charge: "Complimentary (no separate bus seat). Separate seat: ₹5,500 as travelling charges" },
      { age: "5 to 10 years", charge: "₹7,500 per child" },
      { age: "Above 10 years", charge: "Considered an adult — full tour cost" },
    ],
    stayPlan: [
      { day: "1", accommodation: "Overnight bus journey", meals: "Not included" },
      { day: "2", accommodation: "Hampi stay", meals: "Breakfast, Dinner" },
      { day: "3", accommodation: "Honnavar homestay", meals: "Breakfast, Dinner" },
      { day: "4", accommodation: "Gokarna stay", meals: "Breakfast, Dinner" },
      { day: "5", accommodation: "Overnight bus journey", meals: "Breakfast" },
      { day: "6", accommodation: "Reach Mumbai / Pune", meals: "Not included" },
    ],
    hotels: [
      { location: "Hampi", hotels: "3 Star Luxury" },
      { location: "Honnavar", hotels: "3 Star Luxury" },
      { location: "Gokarna", hotels: "3 Star Luxury" },
    ],
    terms: [
      "The company is not responsible for additional price due to accidents, vehicle breakdown, riot, train delay, etc.",
      "Extra will be charged if the government declares new guidelines on hotel stay or transportation. The schedule may be changed on the spot by the manager.",
      "The on-trip manager may dismiss any person creating an unhealthy environment for others.",
      "The company is not responsible if sightseeing is cancelled due to natural calamities or man-made incidents.",
      "SNAV Tourism is not responsible for false or incorrect information submitted to government authorities.",
      "Any discrepancy during the tour is the sole responsibility of the customer.",
      "Photo ID proof must be submitted for all travelling persons at the time of booking.",
      "No refund during the trip or within 10 days before the trip for cancellations.",
      "If Pune participants outnumber Mumbai participants, AC seater tickets may be arranged from Mumbai–Pune, and the private bus will operate from Pune for the entire trip, with the same arrangement for the return journey.",
    ],
    cancellationPoints: [
      "If you book any tickets on your own after paying for the package, no refund or money will be transferred to you.",
      "No refund for any unutilised service.",
      "The tour may be cancelled or postponed due to circumstances — the amount is non-refundable but transferable.",
    ],
    cancellationTable: [
      { before: "Booking date to 30 days", deduction: "30% of tour cost" },
      { before: "29 to 15 days", deduction: "50% of tour cost" },
      { before: "14 to 08 days", deduction: "75% of tour cost" },
      { before: "10 days or less", deduction: "100% — total amount forfeited" },
    ],
    cancellationTail: ["No refund during the trip or within 10 days before the trip for train ticket cancellations."],
    notes: [
      "As the trip travels through Karnataka, the buffet system is not available in Hampi and Gokarna. Meals are served in thali or plate-wise format only.",
      "Guests must select one option from the available thali choices for each meal.",
      "Homemade local cuisine is provided in Gokarna for authentic taste and freshness.",
      "Inform your meal preference to the tour leader at least one day prior to the tour. Last-minute changes in meal orders will not be entertained.",
    ],
  },
];

export interface WhatsAppCard {
  kind: "backpackers" | "treks";
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  whatsappMessage: string;
  cta: string;
}

export const whatsAppCards: WhatsAppCard[] = [
  {
    kind: "backpackers",
    title: "Backpackers Packages",
    description:
      "Budget-friendly group trips for the young at heart — shared stays, local transport and raw experiences across India's most loved trails.",
    image: packageLadakh,
    imageAlt: "High-altitude backpacker trails in Ladakh",
    cta: "Backpackers packages — this month's departures",
    whatsappMessage:
      "Hello SNAV Tourism! I'm interested in your backpackers packages. Please share the latest options, batches and dates.",
  },
  {
    kind: "treks",
    title: "Weekly Treks",
    description:
      "A fresh mountain trail every week — weekend escapes, sunrise summits and riverside camps. Meet the group, hit the trail.",
    image: heroKashmir,
    imageAlt: "Mountain trekking trail in the Himalayas",
    cta: "Weekly treks — this week's departure",
    whatsappMessage:
      "Hello SNAV Tourism! I'm interested in the weekly treks. Please share this week's trek details and departure.",
  },
];