// Site Configuration
// Customize all content here to personalize your wedding website

const siteConfig = {
  // ============================================
  // SECRETS CONFIGURATION
  // ============================================
  // These are set in .env file, NOT here
  // Required secrets (all FREE - no credit card needed):
  // - GOOGLE_SERVICE_ACCOUNT_JSON (for photo upload)
  // - GOOGLE_DRIVE_FOLDER_ID (for photo storage)
  // - GOOGLE_SPREADSHEET_ID (for RSVP data)
  // - REACT_APP_RSVP_API_URL (optional: for RSVP form)
  // See README.md for complete free setup guide

  // ============================================
  // WEDDING TYPE
  // ============================================
  // Options: "hindu", "christian", "custom"
  // This determines which event presets are available
  weddingType: "christian", // Change to "hindu" or "custom" as needed

  // ============================================
  // FEATURE FLAGS - Enable/disable features
  // ============================================
  // All features are enabled by default - set to false to disable any feature
  features: {
    homepage: { enabled: true, label: "Home" },
    ourStory: { enabled: true, label: "Our Story" },
    events: { enabled: true, label: "Events & RSVP" },
    uploadPhotos: { enabled: true, label: "Upload Photos" },
    registry: { enabled: true, label: "Registry" },
    travel: { enabled: true, label: "Travel & Accommodation" },
    faq: { enabled: true, label: "FAQ" },
  },

  // ============================================
  // EVENT PRESETS
  // ============================================
  // Pre-built event templates based on wedding type
  // Use these as reference or copy to events array below
  eventPresets: {
    christian: [
      { name: "Rehearsal Dinner", description: "Pre-wedding dinner with close family and friends", dressCode: "Semi-formal" },
      { name: "Wedding Ceremony", description: "Church ceremony - join us as we say 'I do'", dressCode: "Formal" },
      { name: "Cocktail Hour", description: "Post-ceremony cocktails and mingling", dressCode: "Semi-formal" },
      { name: "Reception", description: "Wedding reception with dinner and dancing", dressCode: "Formal" },
      { name: "After Party", description: "Late night celebration", dressCode: "Casual" },
    ],
    custom: [], // User defines their own events
  },

  // Couple Information
  couple: {
    name1: "Chela",
    name2: "Josiah",
    displayName: "Chela weds Josiah", // Used in navbar and footer
    name1Image: "/images/partner1.svg", // Path to partner 1's photo (replace with your image)
    name2Image: "/images/partner2.svg", // Path to partner 2's photo (replace with your image)
  },

  // Wedding Date (for countdown timer)
  wedding: {
    date: "2027-02-06T10:00:00", // ISO format date/time
    location: "AIC Milimani, Nairobi, KE — State House Avenue, next to Lady North Nursery",
  },

  // Homepage
  homepage: {
    title: "Welcome to Our Wedding Website!",
    subtitle: "We're so excited to share our special day with you. Capture and share your favorite moments from our wedding here!",
    ctaButton: "Upload Photos",
    backgroundImage: "/images/homage_page_background.png",
    showCountdown: true,
  },

  // Our Story Section
  ourStory: {
    partner1Story: {
      name: "Chela's Story",
      image: "/images/partner1.svg", // Replace with your photo
      story: "Share your story here. This is where you can tell your guests about your journey, how you met, and what makes your relationship special.",
    },
    partner2Story: {
      name: "Josiah's Story",
      image: "/images/partner2.svg", // Replace with your photo
      story: "Share your story here. This is where you can tell your guests about your journey, how you met, and what makes your relationship special.",
    },
    howWeMet: {
      enabled: true,
      title: "How We Met",
      story: "Share the story of how you first met. This could be at college, through friends, online, or any other special way your paths crossed.",
    },
    proposal: {
      enabled: true,
      title: "The Proposal",
      story: "Tell your guests about your proposal story. Where did it happen? How did it go? Share those special moments!",
      image: "/images/photo1.svg", // Optional proposal photo
    },
    memories: {
      intro: "A few special moments from our journey together.",
      images: [
        "/images/photo1.svg", // Replace with your photos
        "/images/photo2.svg",
        "/images/photo3.svg",
        "/images/photo4.svg",
      ],
    },
    backgroundImage: "/images/homage_page_background.png",
  },

  // ============================================
  // EVENTS/RSVP PAGE
  // ============================================
  // Customize your events below
  // For Christian weddings: See eventPresets.christian above for common events
  // For custom weddings: Create your own event list
  events: {
    title: "Celebrate With Us",
    subtitle: "We are thrilled to have you join us for these cherished moments.",
    events: [
      {
        id: 1,
        name: "Wedding Event Details",
        date: "2027-02-06",
        time: "10:00 AM",
        venue: "AIC Milimani, Nairobi, KE — State House Avenue, next to Lady North Nursery",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d3988.8114145647123!2d36.80800067323749!3d-1.2872550987005096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x182f10cf42a495c9%3A0xd8eb6c8597d7b8eb!2sAIC%20Milimani%2C%20Nairobi%20KE%2C%20State%20House%20Avenue%2C%20Next%20to%20Lady%20North%20Nursery%2C%20Nairobi%2C%20Kenya!3m2!1d-1.2872550999999999!2d36.8105756!5e0!3m2!1sen!2sus!4v1792091356084!5m2!1sen!2sus",
        dressCode: "Semi-formal", // Optional
        description: "wedding ceremony", // Optional
        category: "wedding", // Optional: for filtering
      },
    ],
    backgroundImage: "/images/homage_page_background.png",
  },

  // Upload Photos Page
  uploadPhotos: {
    title: "Upload Your Photos",
    subtitle: "Share your favorite moments from our special day!",
    backgroundImage: "/images/homage_page_background.png",
    enableCaptions: true, // Allow users to add captions
    maxFileSize: 10, // MB
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  },

  // Registry/Gifts
  registry: {
    title: "Wedding Registry",
    subtitle: "Your presence is the greatest gift, but if you'd like to honor us with something special...",
    enableGiftTracking: true, // Enable gift reservation system
    registries: [
      {
        name: "Amazon",
        url: "https://www.amazon.com/wedding-registry",
        description: "Our Amazon registry",
      },
      {
        name: "Contributions towards wedding day",
        description: "Help us with the costs of celebrating our wedding day.",
      },
    ],
    cashFunds: [
      {
        name: "Cash Fund",
        description: "If you would like to contribute in cash, please use either phone number below.",
        phoneNumbers: [
          { name: "Josiah", number: "+254715552779" },
          { name: "Chela", number: "+254119012680" },
        ],
      },
    ],
    thankYouMessage: "Thank you for your generous gifts!",
  },

  // Travel & Accommodation
  travel: {
    title: "Travel & Accommodation",
    subtitle: "Everything you need to know about getting here and staying here",
    // Coordinates for weather forecast (optional)
    // Get coordinates from: https://www.latlong.net/
    coordinates: {
      lat: null, // e.g., 40.7128 for New York
      lon: null, // e.g., -74.0060 for New York
    },
    hotels: [
      {
        category: "Luxury & Upscale",
        name: "Sarova Stanley Hotel",
        class: "5-star",
        rating: "4.6/5 (9.5K reviews)",
        location: "Junction of Kenyatta Avenue and Kimathi Street",
        description: "Nairobi's historic first luxury hotel (open since 1902), with elegant rooms, an outdoor pool, a full-service spa, multiple restaurants, a bar, and a 5-minute walk to the KICC.",
      },
      {
        category: "Luxury & Upscale",
        name: "Sarova Panafric",
        class: "4-star",
        rating: "4.5/5 (7.7K reviews)",
        location: "Valley Road, at the Kenyatta Avenue and Ngong Road junction (edge of Upper Hill/CBD)",
        description: "A contemporary business hotel with rich African heritage, easy access to Kenyatta Avenue and the city center, outdoor spaces, and business-friendly amenities.",
      },
      {
        category: "Mid-Range & Business",
        name: "Sentrim 680 Hotel",
        class: "3-star, 253 rooms",
        rating: "4.1/5 (1.7K reviews)",
        location: "Kenyatta Avenue / Muindi Mbingu Street",
        description: "Centrally located on Kenyatta Avenue with conference spaces, meeting rooms, a restaurant, storage rooms, and secure parking, roughly 400-550 meters from the KICC.",
      },
      {
        category: "Mid-Range & Business",
        name: "Clarion Hotel Nairobi",
        class: "3-star",
        rating: "4.2/5 (2.2K reviews)",
        location: "Moi Avenue (a short walk off Kenyatta Avenue)",
        description: "Open 24 hours, with a restaurant, trendy bar, cafe, gym, sauna, and terrace.",
      },
      {
        category: "Budget & Simple",
        name: "The Geed Hotel",
        class: "3-star",
        rating: "4.0/5 (150 reviews)",
        location: "Moi Avenue, near the CBD core",
        description: "Clean, budget-friendly rooms within walking distance of Kenyatta Avenue.",
      },
      {
        category: "Budget & Simple",
        name: "Hotel Embassy",
        class: "Hotel (no star rating given)",
        rating: "4.0/5 (562 reviews)",
        location: "Tubman Road, Nairobi (close to Kenyatta Avenue)",
        description: "Open 24 hours with straightforward rooms and a casual on-site restaurant.",
      },
    ],
    transportation: {
      airport: {
        name: "Jomo Kenyatta International Airport (NBO)- Nairobi, Kenya",
        iatacode: "NBO",
        icadcode: "HKJK",
        distance: "11.1 miles",
        directions: "\n" +
"Travel Overview\n" +
"\n" +
"• Driving Time: It typically takes about 26 minutes to drive between the two locations under usual traffic conditions.\n" +

"• Primary Route: The most recommended route is via the Nairobi Expressway/A8, exiting toward Processional Way, then taking Cathedral Road and Ngong Road to State House Avenue. Please note that using the Expressway involves paying a toll fee.",
      },
      parking: "Free parking available at the venue",
      shuttle: "Shuttle service available from hotel (details TBD)",
    },
    localAttractions: [
      {
        category: "Wildlife & Nature (Within Nairobi)",
        intro: "These iconic sites are close to the city center and ideal for quick morning or afternoon group excursions.",
        name: "Nairobi National Park",
        type: "Wildlife and safari park",
        location: "Langata Rd",
        description: "A unique wildlife reserve where guests can see lions, rhinos, and giraffes against a backdrop of city skyscrapers. Half-day or full-day safaris are available, ranging from $30 to $200 per adult.",
      },
      {
        category: "Wildlife & Nature (Within Nairobi)",
        intro: "These iconic sites are close to the city center and ideal for quick morning or afternoon group excursions.",
        name: "Giraffe Centre",
        type: "Nature preserve",
        rating: "4.6/5 (18.2K reviews)",
        location: "Duma Rd",
        description: "A conservation sanctuary where visitors can get up close to hand-feed endangered Rothschild giraffes from a raised wooden platform. It is incredibly popular for couples and wedding photo opportunities.",
      },
      {
        category: "Wildlife & Nature (Within Nairobi)",
        intro: "These iconic sites are close to the city center and ideal for quick morning or afternoon group excursions.",
        name: "Sheldrick Wildlife Trust",
        type: "Animal shelter",
        rating: "4.6/5 (5.8K reviews)",
        location: "KWS Central Workshop Gate, Magadi Rd",
        description: "A world-famous orphanage for baby elephants. Guests can watch the calves being bottle-fed and playing in the mud during the daily public viewing hour.",
      },
      {
        category: "Wildlife & Nature (Within Nairobi)",
        intro: "These iconic sites are close to the city center and ideal for quick morning or afternoon group excursions.",
        name: "Karura Forest",
        description: "A tranquil urban upland forest ideal for group hikes, trail bike rides, and viewing hidden waterfalls and caves. It is a renowned hotspot for local events and pre-wedding photography.",
      },
      {
        category: "Outskirts & Scenic Day Trips (Within 1-2 Hours)",
        intro: "For wedding guests who want to escape the city bustle, these stunning ridge and highland locations offer dramatic views and refreshing climates.",
        name: "Ngong Hills",
        description: "Located just southwest of the city along the Great Rift Valley, these rolling ridges offer panoramic views and refreshing hiking trails framed by massive wind turbines. It is a top romantic escape and hosts popular garden wedding venues.",
      },
      {
        category: "Outskirts & Scenic Day Trips (Within 1-2 Hours)",
        intro: "For wedding guests who want to escape the city bustle, these stunning ridge and highland locations offer dramatic views and refreshing climates.",
        name: "Tigoni Tea Green Highlands",
        description: "A lush, cool highland area just outside Nairobi characterized by sprawling emerald tea plantations. Guests can enjoy nature trails at locations like the One-Stop Waterfall or book a cheese-tasting experience at the nearby Brown's Cheese Factory & Farm.",
      },
      {
        category: "Outskirts & Scenic Day Trips (Within 1-2 Hours)",
        intro: "For wedding guests who want to escape the city bustle, these stunning ridge and highland locations offer dramatic views and refreshing climates.",
        name: "Lake Naivasha & Hell's Gate",
        description: "Roughly a 2-hour drive from Nairobi, this freshwater lake is famous for boat rides alongside hippos, spectacular bird watching, and sunsets. Guests can pair this with a trip to Hell's Gate National Park for rock climbing and cycling.",
      },
      {
        category: "Cultural & Creative Gems",
        intro: "Perfect for picking up traditional wedding attire, bespoke accessories, or exploring Kenyan heritage.",
        name: "Maasai Market",
        type: "Handicraft fair",
        rating: "4.3/5 (8.3K reviews)",
        rotatingNote: "This is a rotating market — check where it's held on your visit day.",
        location: "Supreme Court (note: this is a rotating market)",
        description: "An open-air, rotating market where tourists can bargain for handmade African jewelry, wood carvings, and vibrant kanga/shuka fabrics.",
      },
      {
        category: "Cultural & Creative Gems",
        intro: "Perfect for picking up traditional wedding attire, bespoke accessories, or exploring Kenyan heritage.",
        name: "Kazuri Beads Factory",
        type: "Stores and shopping",
        description: "This workshop empowers local women who handcraft vibrant ceramic beads and pottery. Guests can tour the facility to see the step-by-step creation process.",
      },
    ],
    maps: {
      venue: "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d3988.8114145647123!2d36.80800067323749!3d-1.2872550987005096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x182f10cf42a495c9%3A0xd8eb6c8597d7b8eb!2sAIC%20Milimani%2C%20Nairobi%20KE%2C%20State%20House%20Avenue%2C%20Next%20to%20Lady%20North%20Nursery%2C%20Nairobi%2C%20Kenya!3m2!1d-1.2872550999999999!2d36.8105756!5e0!3m2!1sen!2sus!4v1792091356084!5m2!1sen!2sus",
      hotels: "https://www.google.com/maps/embed?pb=YOUR_HOTELS_MAP",
    },
  },

  // FAQ
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know",
    questions: [
      {
        title: "What should I wear?",
        content: "Any semi-formal attire is requested",
      },
      {
        title: "Can I bring a plus one?",
        content: "Please check your invitation for plus one details.",
      },
      {
        title: "Will there be parking?",
        content: "Yes, free parking is available at the venue.",
      },
      {
        title: "What time should I arrive?",
        content: "Please arrive 15-30 minutes before the ceremony begins.",
      },
      {
        title: "Are children welcome?",
        content: "Yes the little ones and people of all ages are welcomed",
      },
    ],
  },

  // Footer
  footer: {
    tagline: "True love is the greatest adventure. Thank you for being a part of our journey!",
    contactEmail: "wedding@example.com", // Optional
    socialMedia: {
      instagram: "https://instagram.com/yourhandle", // Optional
      facebook: "https://facebook.com/yourpage", // Optional
    },
  },

  // Navigation
  navigation: {
    ourStoryLabel: "Our Story",
    eventsLabel: "Events",
    uploadLabel: "Upload",
    registryLabel: "Registry",
    travelLabel: "Travel",
    faqLabel: "FAQ",
  },

  // App Metadata
  app: {
    name: "Wedding Invite",
    shortName: "Wedding",
    description: "A beautiful wedding website to share your special day",
  },
};

export default siteConfig;
