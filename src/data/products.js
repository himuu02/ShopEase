const products = [
  // =====================================================
  // ELECTRONICS
  // =====================================================

  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    brand: "SoundMax",
    price: 2499,
    originalPrice: 3999,
    rating: 4.8,
    reviews: 248,
    stock: 18,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80",
    description:
      "Premium wireless headphones designed for immersive sound, comfortable listening and everyday use.",
    specifications: {
      "Connectivity": "Bluetooth 5.3",
      "Battery Life": "35 Hours",
      "Charging": "USB-C",
      "Noise Control": "Active Noise Cancellation",
      "Warranty": "1 Year",
    },
  },

  {
    id: 2,
    name: "Smart Watch Series 8",
    category: "Electronics",
    brand: "TimeTech",
    price: 3299,
    originalPrice: 4999,
    rating: 4.7,
    reviews: 192,
    stock: 25,
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80",
    description:
      "A modern smartwatch combining fitness tracking, notifications and everyday convenience in a stylish design.",
    specifications: {
      Display: "AMOLED",
      Connectivity: "Bluetooth",
      "Battery Life": "7 Days",
      Sensors: "Heart Rate, SpO2",
      WaterResistance: "IP68",
    },
  },

  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    brand: "SoundMax",
    price: 1799,
    originalPrice: 2999,
    rating: 4.5,
    reviews: 156,
    stock: 32,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700&auto=format&fit=crop&q=80",
    description:
      "Compact portable speaker delivering powerful audio with wireless connectivity for indoor and outdoor entertainment.",
    specifications: {
      Connectivity: "Bluetooth 5.2",
      "Battery Life": "18 Hours",
      Power: "20W",
      Charging: "USB-C",
      WaterResistance: "IPX5",
    },
  },

  {
    id: 4,
    name: "Wireless Gaming Mouse",
    category: "Electronics",
    brand: "GamePro",
    price: 1299,
    originalPrice: 1999,
    rating: 4.6,
    reviews: 174,
    stock: 41,
    badge: "Sale",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=700&auto=format&fit=crop&q=80",
    description:
      "Responsive wireless gaming mouse with ergonomic design and precise tracking for competitive gaming.",
    specifications: {
      Sensor: "High Precision Optical",
      DPI: "Up to 12000 DPI",
      Connectivity: "2.4GHz Wireless",
      Buttons: "6 Programmable",
      Battery: "Rechargeable",
    },
  },

  {
    id: 5,
    name: "Mechanical Gaming Keyboard",
    category: "Electronics",
    brand: "GamePro",
    price: 2499,
    originalPrice: 3499,
    rating: 4.7,
    reviews: 221,
    stock: 20,
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop&q=80",
    description:
      "Mechanical keyboard built for gamers and professionals with responsive switches and a durable construction.",
    specifications: {
      Switches: "Mechanical",
      Layout: "Full Size",
      Connectivity: "USB",
      Backlight: "RGB",
      Compatibility: "Windows / macOS",
    },
  },

  {
    id: 6,
    name: "Wireless Earbuds",
    category: "Electronics",
    brand: "SoundMax",
    price: 1599,
    originalPrice: 2499,
    rating: 4.4,
    reviews: 134,
    stock: 29,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=700&auto=format&fit=crop&q=80",
    description:
      "Lightweight wireless earbuds with clear sound, comfortable fit and a compact charging case.",
    specifications: {
      Connectivity: "Bluetooth 5.3",
      "Battery Life": "24 Hours",
      Charging: "USB-C",
      Microphone: "Dual Mic",
      WaterResistance: "IPX4",
    },
  },

  {
    id: 7,
    name: "Smart LED Desk Monitor",
    category: "Electronics",
    brand: "ViewTech",
    price: 11999,
    originalPrice: 15999,
    rating: 4.6,
    reviews: 89,
    stock: 12,
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&auto=format&fit=crop&q=80",
    description:
      "High-quality smart monitor designed for productivity, entertainment and modern workspaces.",
    specifications: {
      Display: "27-inch Full HD",
      RefreshRate: "100Hz",
      Connectivity: "HDMI / DisplayPort",
      Panel: "IPS",
      Warranty: "2 Years",
    },
  },

  // =====================================================
  // FASHION
  // =====================================================

  {
    id: 8,
    name: "Classic Running Sneakers",
    category: "Fashion",
    brand: "UrbanStep",
    price: 1899,
    originalPrice: 2999,
    rating: 4.6,
    reviews: 203,
    stock: 36,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80",
    description:
      "Comfortable running sneakers designed for everyday walking, workouts and active lifestyles.",
    specifications: {
      Material: "Mesh & Synthetic",
      Sole: "Rubber",
      Closure: "Lace-up",
      Use: "Running / Casual",
      Gender: "Unisex",
    },
  },

  {
    id: 9,
    name: "Casual White Sneakers",
    category: "Fashion",
    brand: "UrbanStep",
    price: 2199,
    originalPrice: 3499,
    rating: 4.5,
    reviews: 167,
    stock: 28,
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=700&auto=format&fit=crop&q=80",
    description:
      "Minimal white sneakers that pair easily with casual outfits and everyday streetwear.",
    specifications: {
      Material: "Synthetic Leather",
      Sole: "Rubber",
      Closure: "Lace-up",
      Style: "Casual",
      Gender: "Unisex",
    },
  },

  {
    id: 10,
    name: "Classic Denim Jacket",
    category: "Fashion",
    brand: "DenimCraft",
    price: 1799,
    originalPrice: 2799,
    rating: 4.4,
    reviews: 118,
    stock: 24,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=700&auto=format&fit=crop&q=80",
    description:
      "Classic denim jacket with a versatile design suitable for casual everyday styling.",
    specifications: {
      Material: "Premium Denim",
      Fit: "Regular",
      Closure: "Button",
      Pockets: "4",
      Wash: "Classic Blue",
    },
  },

  {
    id: 11,
    name: "Premium Cotton T-Shirt",
    category: "Fashion",
    brand: "CottonWear",
    price: 699,
    originalPrice: 999,
    rating: 4.5,
    reviews: 301,
    stock: 55,
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&auto=format&fit=crop&q=80",
    description:
      "Soft premium cotton T-shirt designed for everyday comfort and effortless styling.",
    specifications: {
      Material: "100% Cotton",
      Fit: "Regular",
      Sleeve: "Half Sleeve",
      Neck: "Round Neck",
      WashCare: "Machine Wash",
    },
  },

  {
    id: 12,
    name: "Urban Travel Backpack",
    category: "Fashion",
    brand: "CarryPro",
    price: 1499,
    originalPrice: 2299,
    rating: 4.6,
    reviews: 145,
    stock: 31,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80",
    description:
      "Practical everyday backpack with multiple compartments for college, work and travel.",
    specifications: {
      Capacity: "25 Litres",
      Material: "Water Resistant Fabric",
      Compartments: "5",
      LaptopSupport: "Up to 15.6 inch",
      Warranty: "1 Year",
    },
  },

  {
    id: 13,
    name: "Classic Leather Watch",
    category: "Fashion",
    brand: "TimeCraft",
    price: 2999,
    originalPrice: 4499,
    rating: 4.7,
    reviews: 92,
    stock: 14,
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700&auto=format&fit=crop&q=80",
    description:
      "Elegant leather wristwatch combining classic styling with reliable everyday timekeeping.",
    specifications: {
      Strap: "Genuine Leather",
      Dial: "Analog",
      Movement: "Quartz",
      Glass: "Mineral",
      WaterResistance: "3 ATM",
    },
  },

  {
    id: 14,
    name: "Elegant Handbag",
    category: "Fashion",
    brand: "StyleNest",
    price: 2299,
    originalPrice: 3499,
    rating: 4.5,
    reviews: 83,
    stock: 17,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&auto=format&fit=crop&q=80",
    description:
      "Elegant handbag designed for daily use with a spacious interior and premium finish.",
    specifications: {
      Material: "Synthetic Leather",
      Closure: "Zip",
      Compartments: "3",
      Strap: "Adjustable",
      Style: "Shoulder Bag",
    },
  },

  {
    id: 15,
    name: "Classic Casual Hoodie",
    category: "Fashion",
    brand: "ComfortWear",
    price: 1299,
    originalPrice: 1999,
    rating: 4.6,
    reviews: 211,
    stock: 43,
    badge: "Sale",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=700&auto=format&fit=crop&q=80",
    description:
      "Warm and comfortable casual hoodie perfect for cool weather and relaxed everyday wear.",
    specifications: {
      Material: "Cotton Blend",
      Fit: "Regular",
      Hood: "Adjustable",
      Pockets: "Front Pocket",
      WashCare: "Machine Wash",
    },
  },

  // =====================================================
  // ACCESSORIES
  // =====================================================

  {
    id: 16,
    name: "Premium Sunglasses",
    category: "Accessories",
    brand: "VisionPro",
    price: 999,
    originalPrice: 1599,
    rating: 4.4,
    reviews: 124,
    stock: 33,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&auto=format&fit=crop&q=80",
    description:
      "Stylish sunglasses designed to complement everyday outfits while providing comfortable outdoor vision.",
    specifications: {
      Lens: "UV Protected",
      Frame: "Acetate",
      Style: "Classic",
      Gender: "Unisex",
      Case: "Included",
    },
  },

  {
    id: 17,
    name: "Classic Leather Belt",
    category: "Accessories",
    brand: "LeatherCraft",
    price: 599,
    originalPrice: 999,
    rating: 4.2,
    reviews: 78,
    stock: 48,
    badge: "Sale",
    image:
      "https://images.unsplash.com/photo-1624222247344-550fb8b2c5c5?w=700&auto=format&fit=crop&q=80",
    description:
      "Classic leather belt with a durable buckle and versatile design for everyday formal and casual wear.",
    specifications: {
      Material: "Leather",
      Buckle: "Metal",
      Width: "35mm",
      Style: "Classic",
      Length: "Adjustable",
    },
  },

  {
    id: 18,
    name: "Minimalist Wallet",
    category: "Accessories",
    brand: "PocketPro",
    price: 799,
    originalPrice: 1299,
    rating: 4.5,
    reviews: 145,
    stock: 40,
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=700&auto=format&fit=crop&q=80",
    description:
      "Slim minimalist wallet designed to carry essential cards and cash without unnecessary bulk.",
    specifications: {
      Material: "Leather",
      CardSlots: "6",
      CashCompartment: "1",
      RFID: "Protected",
      Style: "Slim",
    },
  },

  {
    id: 19,
    name: "Elegant Silver Bracelet",
    category: "Accessories",
    brand: "SilverLine",
    price: 1099,
    originalPrice: 1799,
    rating: 4.8,
    reviews: 63,
    stock: 15,
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700&auto=format&fit=crop&q=80",
    description:
      "Elegant bracelet featuring a minimal design suitable for everyday and special occasions.",
    specifications: {
      Material: "Silver Finish",
      Style: "Minimal",
      Size: "Adjustable",
      Finish: "Polished",
      Packaging: "Gift Box",
    },
  },

  {
    id: 20,
    name: "Premium Leather Wallet",
    category: "Accessories",
    brand: "LeatherCraft",
    price: 899,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 116,
    stock: 27,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80",
    description:
      "Premium everyday wallet with practical storage and a clean leather finish.",
    specifications: {
      Material: "Premium Leather",
      CardSlots: "8",
      CashCompartment: "2",
      RFID: "Protected",
      Warranty: "6 Months",
    },
  },

  {
    id: 21,
    name: "Classic Analog Sunglasses",
    category: "Accessories",
    brand: "VisionPro",
    price: 1199,
    originalPrice: 1899,
    rating: 4.5,
    reviews: 91,
    stock: 22,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=700&auto=format&fit=crop&q=80",
    description:
      "Classic sunglasses with a timeless frame designed for comfortable everyday use.",
    specifications: {
      Lens: "UV400",
      Frame: "Lightweight",
      Style: "Classic",
      Gender: "Unisex",
      Case: "Included",
    },
  },

  // =====================================================
  // HOME & LIVING
  // =====================================================

  {
    id: 22,
    name: "Luxury Cushion Set",
    category: "Home & Living",
    brand: "HomeAura",
    price: 999,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 137,
    stock: 35,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=700&auto=format&fit=crop&q=80",
    description:
      "Soft decorative cushion set designed to add comfort and style to modern living spaces.",
    specifications: {
      Material: "Cotton Blend",
      Pieces: "4",
      Filling: "Soft Fiber",
      WashCare: "Machine Wash",
      Style: "Modern",
    },
  },

  {
    id: 23,
    name: "Modern Wall Clock",
    category: "Home & Living",
    brand: "HomeAura",
    price: 1099,
    originalPrice: 1699,
    rating: 4.3,
    reviews: 71,
    stock: 19,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=700&auto=format&fit=crop&q=80",
    description:
      "Modern decorative wall clock designed to complement contemporary interiors.",
    specifications: {
      Material: "Metal",
      Movement: "Quartz",
      Diameter: "30cm",
      Display: "Analog",
      Power: "AA Battery",
    },
  },

  {
    id: 24,
    name: "Premium Coffee Mug",
    category: "Home & Living",
    brand: "BrewHome",
    price: 399,
    originalPrice: 699,
    rating: 4.7,
    reviews: 268,
    stock: 64,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=700&auto=format&fit=crop&q=80",
    description:
      "Premium ceramic coffee mug designed for everyday tea, coffee and hot beverages.",
    specifications: {
      Material: "Ceramic",
      Capacity: "350ml",
      MicrowaveSafe: "Yes",
      DishwasherSafe: "Yes",
      Finish: "Glossy",
    },
  },

  {
    id: 25,
    name: "Decorative Indoor Plant",
    category: "Home & Living",
    brand: "GreenNest",
    price: 599,
    originalPrice: 899,
    rating: 4.5,
    reviews: 104,
    stock: 30,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=700&auto=format&fit=crop&q=80",
    description:
      "Decorative indoor plant designed to bring a natural touch to desks, shelves and living spaces.",
    specifications: {
      Type: "Indoor Plant",
      Pot: "Decorative",
      Placement: "Indoor",
      Care: "Low Maintenance",
      Size: "Medium",
    },
  },

  {
    id: 26,
    name: "Soft Luxury Blanket",
    category: "Home & Living",
    brand: "ComfortHome",
    price: 1499,
    originalPrice: 2299,
    rating: 4.6,
    reviews: 89,
    stock: 23,
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=700&auto=format&fit=crop&q=80",
    description:
      "Soft premium blanket designed to provide warmth and comfort during relaxing evenings.",
    specifications: {
      Material: "Microfiber",
      Size: "Queen",
      Weight: "1.4kg",
      WashCare: "Machine Wash",
      Season: "All Season",
    },
  },

  {
    id: 27,
    name: "Modern Desk Organizer",
    category: "Home & Living",
    brand: "DeskCraft",
    price: 699,
    originalPrice: 1099,
    rating: 4.4,
    reviews: 62,
    stock: 44,
    badge: "Sale",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=700&auto=format&fit=crop&q=80",
    description:
      "Minimal desk organizer that keeps stationery and everyday workspace essentials neatly arranged.",
    specifications: {
      Material: "Wood & Metal",
      Compartments: "6",
      Style: "Minimal",
      Use: "Office / Study",
      Assembly: "Not Required",
    },
  },

  {
    id: 28,
    name: "Minimalist Table Lamp",
    category: "Home & Living",
    brand: "GlowHome",
    price: 1299,
    originalPrice: 1999,
    rating: 4.5,
    reviews: 97,
    stock: 21,
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700&auto=format&fit=crop&q=80",
    description:
      "Minimal table lamp designed to provide warm lighting for bedrooms, desks and living spaces.",
    specifications: {
      Light: "LED",
      Power: "10W",
      Color: "Warm White",
      Material: "Metal",
      Control: "Switch",
    },
  },

  {
    id: 29,
    name: "Decorative Ceramic Vase",
    category: "Home & Living",
    brand: "HomeAura",
    price: 799,
    originalPrice: 1299,
    rating: 4.3,
    reviews: 58,
    stock: 26,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=700&auto=format&fit=crop&q=80",
    description:
      "Modern ceramic vase designed to enhance tables, shelves and contemporary interiors.",
    specifications: {
      Material: "Ceramic",
      Height: "25cm",
      Finish: "Matte",
      Style: "Modern",
      Use: "Decorative",
    },
  },

  {
    id: 30,
    name: "Cozy Pet Bed",
    category: "Home & Living",
    brand: "PetComfort",
    price: 1199,
    originalPrice: 1899,
    rating: 4.7,
    reviews: 112,
    stock: 18,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=700&auto=format&fit=crop&q=80",
    description:
      "Soft and comfortable pet bed designed to provide a cozy resting space for pets.",
    specifications: {
      Material: "Soft Fabric",
      Size: "Medium",
      Filling: "Polyfiber",
      Washable: "Yes",
      Use: "Indoor",
    },
  },
];

export default products;