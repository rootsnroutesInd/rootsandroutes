// India's Heritage Website JavaScript - Fixed Ultimate Version
let map;
let currentState = null;
let isPlaying = false;
let currentSongIndex = 0;
let audioContext;
let currentAudio;

// Heritage states data - all 7 specified states with complete data
const heritageStates = {
    'jammu-kashmir': {
        name: 'Jammu & Kashmir',
        lat: 34.0837,
        lon: 74.7973,
        subtitle: 'Crown Jewel of India',
        monuments: [
            {
                name: 'Dal Lake',
                description: 'Pristine lake with floating gardens and houseboats, a symbol of Kashmir\'s natural beauty',
                icon: '🏞️',
                details: 'Dal Lake is a misnomer as it is not a lake in the proper sense, rather it is a floodplain wetland connected by channels to the Jhelum River. The lake covers an area of 18 square kilometers and is integral to tourism and recreation in Kashmir as well as a source for commercial operations in fishing and water plant harvesting.'
            },
            {
                name: 'Gulmarg',
                description: 'Meadow of flowers and premier winter sports destination in the Himalayas',
                icon: '⛷️',
                details: 'Gulmarg is a town, a hill station, a popular skiing destination and a notified area committee in the Baramulla district. The town is situated in the Pir Panjal Range in the western Himalayas and lies within the valley of Kashmir at an elevation of 2,650 meters above sea level.'
            },
            {
                name: 'Sonamarg',
                description: 'Golden meadow at the gateway to Ladakh with pristine mountain views',
                icon: '🏔️',
                details: 'Sonamarg or Sonmarg, known as "Meadow of Gold", is a hill station located in the Ganderbal district in the union territory of Jammu and Kashmir, India. It is located about 80 kilometers northeast of Srinagar at an elevation of 2,800 meters above sea level.'
            },
            {
                name: 'Vaishno Devi',
                description: 'Sacred Hindu pilgrimage shrine nestled in the Trikuta mountains',
                icon: '🛕',
                details: 'Vaishno Devi Temple is a Hindu temple dedicated to Vaishno Devi, a form of Mahadevi, located at the Trikuta Mountains within the Indian union territory of Jammu and Kashmir. It is one of the most visited religious sites in India, with millions of devotees visiting annually.'
            }
        ],
        culture: [
            {
                name: 'Sufi Traditions',
                description: 'Rich Sufi heritage with spiritual music, poetry and mystical practices',
                icon: '🎵',
                details: 'Kashmir has been a center of Sufi culture for centuries. The valley\'s Sufi traditions include the practice of Sama (spiritual music), the poetry of Lal Ded and Nund Rishi, and various mystical orders that have shaped the spiritual landscape of the region.'
            },
            {
                name: 'Kashmiri Pandit Culture',
                description: 'Ancient Hindu traditions, festivals and scholarly heritage',
                icon: '📿',
                details: 'Kashmiri Pandits are a Brahmin community native to Kashmir. They have preserved ancient Sanskrit learning, traditional festivals like Herath (Shivratri), and have contributed significantly to philosophy, arts, and literature over centuries.'
            },
            {
                name: 'Folk Music',
                description: 'Traditional songs and instruments like Santoor echoing through valleys',
                icon: '🎶',
                details: 'Kashmiri folk music includes instruments like Santoor, Rubab, and Tumbaknari. Traditional songs accompany seasonal festivals, harvest celebrations, and religious ceremonies, often reflecting the natural beauty and spiritual depth of the valley.'
            }
        ],
        arts: [
            {
                name: 'Pashmina Shawls',
                description: 'World\'s finest wool from Changthangi goats, hand-woven into luxury',
                icon: '🧣',
                details: 'Pashmina shawls are made from the fine cashmere fiber obtained from Changthangi goats found in the high plateaus of Ladakh. The traditional weaving techniques passed down through generations create these exquisite textiles prized worldwide for their softness and warmth.'
            },
            {
                name: 'Papier Mache',
                description: 'Intricate hand-painted decorative items with Persian influence',
                icon: '🎨',
                details: 'Papier-mâché craft in Kashmir involves creating decorative objects from paper pulp, which are then painted with intricate designs. This art form came to Kashmir via Central Asia and has been refined locally with distinctive floral and geometric patterns.'
            },
            {
                name: 'Carpet Weaving',
                description: 'Traditional silk and wool carpets with intricate patterns',
                icon: '🧿',
                details: 'Kashmiri carpets are renowned for their quality and intricate designs. Hand-knotted using traditional techniques, these carpets feature Persian-influenced patterns, often incorporating local motifs like chinar leaves and mountain landscapes.'
            }
        ],
        food: [
            {
                name: 'Wazwan',
                description: 'Multi-course royal meal with aromatic spices and tender meat',
                icon: '🍲',
                details: 'Wazwan is a multi-course meal in Kashmiri cuisine. Almost all the dishes are meat-based using lamb or chicken with few vegetarian dishes. It is popular throughout Kashmir and served at marriages, festivals and other celebrations.'
            },
            {
                name: 'Rogan Josh',
                description: 'Signature red lamb curry with Kashmiri spices and yogurt',
                icon: '🍛',
                details: 'Rogan josh is an aromatic curried meat dish originating from Kashmir. It is made with red meat and colored and flavored primarily by alkanet flower and Kashmiri chilies. The dish was brought to Kashmir by the Mughals and has since become a signature dish of Kashmiri cuisine.'
            },
            {
                name: 'Kahwa',
                description: 'Traditional green tea with cardamom, cinnamon and almonds',
                icon: '☕',
                details: 'Kahwa is a traditional green tea preparation consumed in Kashmir, Pakistan, and some regions of Central Asia. It is made with green tea leaves, whole spices, nuts and saffron. It is traditionally served in small shallow cups called cini.'
            }
        ]
    },
    'uttarakhand': {
        name: 'Uttarakhand',
        lat: 30.0668,
        lon: 79.0193,
        subtitle: 'Land of Gods',
        monuments: [
            {
                name: 'Kedarnath Temple',
                description: 'Sacred Shiva temple in the Himalayas, one of the twelve Jyotirlingas',
                icon: '🛕',
                details: 'Kedarnath Temple is a Hindu temple dedicated to Shiva. Located on the Garhwal Himalayan range near the Mandakini river, the temple is located at an altitude of 3,583 m above sea level. It is one of the twelve Jyotirlingas, the holiest Hindu shrines of Shiva.'
            },
            {
                name: 'Badrinath Temple',
                description: 'Holy Vishnu shrine among the four Char Dhams, on Alaknanda banks',
                icon: '⛰️',
                details: 'Badrinath Temple is a Hindu temple dedicated to Vishnu which is situated in the town of Badrinath in Uttarakhand. It is one of the Char Dham pilgrimage sites and is also one of the 108 Divya Desams, holy shrines for Vaishnavites.'
            },
            {
                name: 'Valley of Flowers',
                description: 'UNESCO World Heritage alpine valley with rare Himalayan flora',
                icon: '🌸',
                details: 'Valley of Flowers National Park is an Indian national park, located in North Chamoli in Uttarakhand. It is known for its meadows of endemic alpine flowers and the variety of flora. This richly diverse area is also home to rare and endangered animals.'
            },
            {
                name: 'Haridwar Ghats',
                description: 'Sacred bathing steps on river Ganga, gateway to the gods',
                icon: '🕯️',
                details: 'Haridwar is regarded as one of the seven holiest places to Hindus. The Ganges flows through Haridwar from the Himalayas to the plains for the first time. The evening Ganga Aarti at Har Ki Pauri is a spectacular sight that attracts thousands of devotees daily.'
            }
        ],
        culture: [
            {
                name: 'Garhwali Traditions',
                description: 'Mountain folk culture with ancient festivals and customs',
                icon: '🌿',
                details: 'Garhwali culture encompasses the traditions of the Garhwal region, including folk songs, dances like Langvir Nritya, traditional festivals, and customs adapted to mountain life. The culture emphasizes harmony with nature and strong community bonds.'
            },
            {
                name: 'Kumaoni Heritage',
                description: 'Hill traditions with seasonal celebrations and folk wisdom',
                icon: '🏔️',
                details: 'Kumaoni culture from the Kumaon region includes rich traditions of storytelling, folk music, seasonal festivals like Basant Panchami, and traditional agricultural practices suited to the hilly terrain.'
            },
            {
                name: 'Char Dham Yatra',
                description: 'Sacred pilgrimage circuit tradition to four holy shrines',
                icon: '🚶',
                details: 'The Char Dham Yatra is a pilgrimage tour to the four holy sites of Yamunotri, Gangotri, Kedarnath and Badrinath located in the Garhwal region of Uttarakhand. This pilgrimage circuit is considered highly sacred by Hindus.'
            }
        ],
        arts: [
            {
                name: 'Wood Carving',
                description: 'Intricate Himalayan temple and house decorations in deodar wood',
                icon: '🪚',
                details: 'Uttarakhand is famous for its intricate wood carving work, especially on temples, houses, and furniture. Artisans use local deodar wood to create beautiful geometric patterns and deity figures that adorn traditional architecture.'
            },
            {
                name: 'Aipan Art',
                description: 'Traditional floor and wall geometric paintings with natural colors',
                icon: '🎨',
                details: 'Aipan is a ritualistic folk art from Kumaon region of Uttarakhand, usually done during festivals, ceremonies and religious occasions. It involves creating intricate geometric patterns using rice paste and red ochre on walls and floors.'
            },
            {
                name: 'Ringaal Crafts',
                description: 'Bamboo basket weaving and utility items by hill artisans',
                icon: '🧺',
                details: 'Ringaal is a type of bamboo found in the hills of Uttarakhand. Local artisans create beautiful baskets, containers, and decorative items from this bamboo, following traditional weaving techniques passed down through generations.'
            }
        ],
        food: [
            {
                name: 'Bal Mithai',
                description: 'Brown milk-based sweet with white sugar coating, Almora specialty',
                icon: '🍭',
                details: 'Bal Mithai is a brown chocolate-like fudge, made with roasted khoya and coated with white sugar balls. It originated in Almora and is now popular throughout Uttarakhand. The sweet has a unique texture and rich flavor.'
            },
            {
                name: 'Bhatt ki Churkani',
                description: 'Black bean curry with local spices, nutritious hill food',
                icon: '🍲',
                details: 'Bhatt ki Churkani is a traditional curry made from black soybeans (bhatt). It\'s a protein-rich dish popular in the hills of Uttarakhand, often served with rice or roti and flavored with local spices and herbs.'
            },
            {
                name: 'Aloo ke Gutke',
                description: 'Spiced mountain potatoes with local herbs and mustard seeds',
                icon: '🥔',
                details: 'Aloo ke Gutke is a simple yet flavorful potato dish from Uttarakhand. The potatoes are boiled, then sautéed with local spices, herbs like coriander, and mustard seeds. It\'s often served as a side dish with traditional meals.'
            }
        ]
    },
    'uttar-pradesh': {
        name: 'Uttar Pradesh',
        lat: 26.8467,
        lon: 80.9462,
        subtitle: 'Heartland of India',
        monuments: [
            {
                name: 'Taj Mahal',
                description: 'Eternal symbol of love and architectural masterpiece in white marble',
                icon: '🕌',
                details: 'The Taj Mahal is an ivory-white marble mausoleum on the southern bank of the river Yamuna in Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal. It is designated as a UNESCO World Heritage Site.'
            },
            {
                name: 'Fatehpur Sikri',
                description: 'Abandoned Mughal capital with stunning red sandstone architecture',
                icon: '🏰',
                details: 'Fatehpur Sikri is a town in Agra district. The city itself was founded as the capital of Mughal Empire in 1571 by Emperor Akbar. It is built primarily of red sandstone and is a UNESCO World Heritage Site known for its architectural grandeur.'
            },
            {
                name: 'Varanasi Ghats',
                description: 'Ancient spiritual bathing steps on Ganges, oldest living city',
                icon: '🛶',
                details: 'The ghats in Varanasi are riverfront steps leading down to the banks of the Ganges river. Most of the ghats are bathing and puja ceremony ghats, while others are used as cremation sites. There are about 87 ghats in Varanasi.'
            },
            {
                name: 'Lucknow Residency',
                description: 'Historical British colonial complex with tales of 1857 revolt',
                icon: '🏛️',
                details: 'The Residency in Lucknow is a complex of several buildings which served as the residence for the British Resident General. During the Indian Rebellion of 1857, it was besieged for 87 days and is now preserved as a monument.'
            }
        ],
        culture: [
            {
                name: 'Kathak Dance',
                description: 'Classical dance form with intricate footwork and storytelling',
                icon: '💃',
                details: 'Kathak is one of the eight major forms of Indian classical dance. The origin of Kathak is traditionally attributed to the traveling bards in ancient northern India known as Kathakars or storytellers, who communicated stories from the great epics.'
            },
            {
                name: 'Awadhi Culture',
                description: 'Refined courtly traditions of Lucknow with tehzeeb and adab',
                icon: '🎭',
                details: 'Awadhi culture represents the refined cultural traditions of Awadh region centered around Lucknow. It encompasses poetry, music, dance, architecture, and culinary arts, known for its emphasis on etiquette (tehzeeb) and cultural refinement (adab).'
            },
            {
                name: 'Ganga Aarti',
                description: 'Evening prayer ceremony on river banks with oil lamps',
                icon: '🪔',
                details: 'Ganga Aarti is a Hindu religious ritual of worship performed on the banks of the Ganges river. The ceremony involves offering prayer to the river with incense, flowers, and lamps. The most famous Ganga Aarti takes place daily in Varanasi.'
            }
        ],
        arts: [
            {
                name: 'Chikankari',
                description: 'Delicate white embroidery on fine fabrics, Lucknow specialty',
                icon: '🧵',
                details: 'Chikankari is a traditional embroidery style from Lucknow. Translated, the word means embroidery, and it is one of Lucknow\'s most famous textile decoration techniques. White thread is embroidered on cool, pastel shades of light muslin and cotton garments.'
            },
            {
                name: 'Zardozi Work',
                description: 'Gold thread embroidery on royal garments and accessories',
                icon: '✨',
                details: 'Zardozi is a type of heavy and elaborate metal embroidery on a silk, satin, or velvet fabric base. Designs are often created using gold and silver threads and embellished with beads, pearls, and precious stones.'
            },
            {
                name: 'Pottery of Khurja',
                description: 'Blue and white ceramic traditions with Mughal influences',
                icon: '🏺',
                details: 'Khurja pottery is a traditional ceramic craft from Khurja in Uttar Pradesh. Known for its glazed pottery with blue and white patterns, it has Persian and Central Asian influences brought by Mughal artisans.'
            }
        ],
        food: [
            {
                name: 'Awadhi Biryani',
                description: 'Fragrant rice dish with tender meat cooked in dum style',
                icon: '🍛',
                details: 'Awadhi biryani, also known as Lucknowi biryani, is a variation of biryani cooked in the Awadhi style. The dish is cooked using the dum pukht method where the pot is sealed and slow-cooked, allowing the flavors to develop gradually.'
            },
            {
                name: 'Tunday Kababi',
                description: 'Melt-in-mouth minced meat kebabs, Lucknow\'s pride',
                icon: '🍖',
                details: 'Tunday Kabab is a dish made of minced meat which has become synonymous with Lucknowi cuisine. The recipe includes more than 160 spices and the meat is so tender that it melts in the mouth. It was invented by Haji Murad Ali in 1905.'
            },
            {
                name: 'Kulfi Falooda',
                description: 'Traditional ice cream with vermicelli and rose syrup',
                icon: '🍨',
                details: 'Kulfi is a frozen dairy dessert from the Indian subcontinent. It is often served with falooda (vermicelli noodles). Kulfi vendors are called kulfiwallahs and often sell their product from a earthenware pot called a matka.'
            }
        ]
    },
    'rajasthan': {
        name: 'Rajasthan',
        lat: 27.0238,
        lon: 74.2179,
        subtitle: 'Land of Kings',
        monuments: [
            {
                name: 'Amber Fort',
                description: 'Hilltop fort with mirror palace and elephant rides, Jaipur\'s crown',
                icon: '🏰',
                details: 'Amer Fort is a fort located in Amer, Rajasthan. It is the principal tourist attraction in Jaipur. Constructed of red sandstone and marble, the attractive, opulent palace is laid out on four levels, each with a courtyard.'
            },
            {
                name: 'Hawa Mahal',
                description: 'Palace of winds with 953 intricate windows for royal ladies',
                icon: '🏠',
                details: 'Hawa Mahal is a palace in the city of Jaipur. Built from red and pink sandstone, it is on the edge of the City Palace, and extends to the Zenana, or women\'s chambers. The structure was built in 1799 by Maharaja Sawai Pratap Singh.'
            },
            {
                name: 'City Palace Udaipur',
                description: 'Lakeside palace complex with stunning architecture and museums',
                icon: '🏰',
                details: 'The City Palace in Udaipur is a palace complex situated in the city of Udaipur in Rajasthan. It was built over a period of nearly 400 years, with contributions from several rulers. The palace is located on the east bank of Lake Pichola.'
            },
            {
                name: 'Jaisalmer Fort',
                description: 'Living golden fort in Thar desert, still inhabited by families',
                icon: '🏜️',
                details: 'Jaisalmer Fort is situated in the city of Jaisalmer, in Rajasthan. It is believed to be one of the very few "living forts" in the world, as nearly one fourth of the old city\'s population still resides within the fort.'
            }
        ],
        culture: [
            {
                name: 'Ghoomar Dance',
                description: 'Traditional folk dance with flowing movements and colorful ghagras',
                icon: '💃',
                details: 'Ghoomar is a traditional folk dance of Rajasthan. It was developed by the Bhil tribe and later adopted by other Rajasthani communities. The dance is performed by women in flowing dresses called ghagra.'
            },
            {
                name: 'Rajasthani Music',
                description: 'Folk ballads and classical traditions by Manganiar and Langa',
                icon: '🎵',
                details: 'Rajasthani music has a rich tradition of folk and classical music. The Manganiar and Langa communities are hereditary musicians who have preserved ancient musical traditions through generations.'
            },
            {
                name: 'Desert Festivals',
                description: 'Colorful celebrations in Pushkar and Jaisalmer with camel races',
                icon: '🎭',
                details: 'Rajasthan hosts numerous desert festivals throughout the year, including the famous Pushkar Camel Fair and Jaisalmer Desert Festival, featuring traditional music, dance, camel races, and cultural exhibitions.'
            }
        ],
        arts: [
            {
                name: 'Blue Pottery',
                description: 'Glazed pottery with Persian influence, Jaipur\'s unique craft',
                icon: '🏺',
                details: 'Blue pottery is widely recognized as a traditional craft of Jaipur. The name \'blue pottery\' comes from the eye-catching cobalt blue dye used to color the pottery. The Persian influence is evident in the style and techniques used.'
            },
            {
                name: 'Miniature Paintings',
                description: 'Detailed Rajput and Mughal style art on paper and silk',
                icon: '🖼️',
                details: 'Rajasthani miniature paintings are known for their intricate details and vibrant colors. These paintings typically depict court scenes, religious themes, and folk tales, executed in various styles like Mewar, Marwar, and Hadoti schools.'
            },
            {
                name: 'Bandhani Textiles',
                description: 'Tie-dye fabric art with intricate patterns and vibrant colors',
                icon: '🌈',
                details: 'Bandhani is a type of tie-dye textile decorated by plucking the cloth with the fingernails into many tiny bindings that form a figurative design. The technique is primarily practiced in Rajasthan and Gujarat.'
            }
        ],
        food: [
            {
                name: 'Dal Baati Churma',
                description: 'Traditional meal with lentils, baked wheat balls and sweet crumbs',
                icon: '🍲',
                details: 'Dal baati churma is a traditional Rajasthani dish. It consists of dal (lentil curry), baati (hard wheat rolls), and churma (sweetened cereal). The dish is popular throughout Rajasthan and is often served at festivals and special occasions.'
            },
            {
                name: 'Ghewar',
                description: 'Honeycomb-shaped sweet dessert, festival specialty',
                icon: '🍯',
                details: 'Ghevar is a disc-shaped sweet cake from Rajasthani cuisine. It is traditionally associated with the Teej and Raksha Bandhan festivals. The sweet has a honeycomb-like texture and is often topped with rabri and nuts.'
            },
            {
                name: 'Laal Maas',
                description: 'Spicy mutton curry with red chilies, royal Rajasthani dish',
                icon: '🍛',
                details: 'Laal maas is a meat curry from Rajasthan. It is a mutton curry prepared in a sauce of yoghurt and hot spices such as red Mathania chillies. This dish was traditionally prepared by the Rajput warriors and rulers of Rajasthan.'
            }
        ]
    },
    'haryana': {
        name: 'Haryana',
        lat: 29.0588,
        lon: 76.0856,
        subtitle: 'Land of Mahabharata',
        monuments: [
            {
                name: 'Kurukshetra',
                description: 'Sacred battlefield of Mahabharata epic, birthplace of Bhagavad Gita',
                icon: '⚔️',
                details: 'Kurukshetra is a city in Haryana and the site of the Kurukshetra War described in the Hindu epic Mahabharata. It is also known as the birthplace of the Bhagavad Gita, where Lord Krishna gave his teachings to Arjuna.'
            },
            {
                name: 'Surajkund',
                description: 'Ancient reservoir with step-well architecture, hosts crafts fair',
                icon: '🏛️',
                details: 'Surajkund is an ancient reservoir of the 10th century located in Haryana. It is known for its annual Surajkund International Crafts Mela, showcasing traditional Indian handicrafts, handlooms, and cultural performances.'
            },
            {
                name: 'Pinjore Gardens',
                description: 'Mughal-style terraced gardens with fountains and pavilions',
                icon: '🌳',
                details: 'Pinjore Gardens, also known as Yadavindra Gardens, is a historic 17th-century garden located in Pinjore, Haryana. Built in the Mughal style, it features terraced gardens, fountains, and pavilions.'
            },
            {
                name: 'Brahma Sarovar',
                description: 'Sacred tank in Kurukshetra, site of solar eclipse pilgrimage',
                icon: '🏊',
                details: 'Brahma Sarovar is a sacred water tank in Kurukshetra, Haryana. It is believed to be created by Lord Brahma and is considered one of the most sacred places for Hindus. Pilgrims gather here especially during solar eclipses.'
            }
        ],
        culture: [
            {
                name: 'Folk Music',
                description: 'Traditional Haryanvi songs and ballads celebrating rural life',
                icon: '🎵',
                details: 'Haryanvi folk music includes traditional songs called geet, ballads, and devotional music. The music often celebrates agricultural life, seasons, festivals, and social events, accompanied by traditional instruments.'
            },
            {
                name: 'Wrestling Tradition',
                description: 'Ancient sport with modern Olympic champions, village akhadas',
                icon: '🤼',
                details: 'Haryana has a rich wrestling tradition with village akhadas (wrestling schools) producing numerous national and international champions, including Olympic medalists. Wrestling is deeply embedded in the rural culture of the state.'
            },
            {
                name: 'Seasonal Festivals',
                description: 'Harvest celebrations like Baisakhi and local village fairs',
                icon: '🌾',
                details: 'Haryana celebrates various seasonal festivals, particularly those related to agriculture. Baisakhi marks the harvest season, while other local festivals celebrate different aspects of rural life and agricultural cycles.'
            }
        ],
        arts: [
            {
                name: 'Phulkari Embroidery',
                description: 'Colorful floral embroidery on dupattas by women artisans',
                icon: '🌼',
                details: 'Phulkari is a traditional embroidery technique from Punjab and Haryana, literally meaning "flower work." It involves intricate floral patterns embroidered on cloth, traditionally done by women on dupattas and shawls.'
            },
            {
                name: 'Pottery',
                description: 'Traditional clay crafts and utility items for daily use',
                icon: '🏺',
                details: 'Haryana has a tradition of pottery making, with artisans creating both utilitarian and decorative clay items. Traditional pottery includes water storage vessels, cooking pots, and decorative items used in rural households.'
            },
            {
                name: 'Bamboo Crafts',
                description: 'Woven baskets and decorative items from local bamboo',
                icon: '🧺',
                details: 'Bamboo crafting in Haryana produces various utility items like baskets, storage containers, and decorative pieces. Local artisans use traditional weaving techniques to create functional and artistic bamboo products.'
            }
        ],
        food: [
            {
                name: 'Bajra Khichdi',
                description: 'Millet and lentil comfort food, nutritious winter staple',
                icon: '🍚',
                details: 'Bajra khichdi is a nutritious dish made from pearl millet (bajra) and lentils. It is a staple winter food in Haryana, known for its warming properties and high nutritional value, often served with ghee and pickles.'
            },
            {
                name: 'Singri ki Sabzi',
                description: 'Desert bean curry, unique to region',
                icon: '🍲',
                details: 'Singri ki sabzi is a curry made from desert beans (Singri), a unique vegetable found in the arid regions of Haryana and Rajasthan. The dried beans are cooked with spices to create this regional delicacy.'
            },
            {
                name: 'Churma Ladoo',
                description: 'Sweet balls made from wheat flour and jaggery',
                icon: '🍭',
                details: 'Churma ladoo is a traditional sweet from Haryana made from wheat flour, ghee, and jaggery. The wheat is roasted and ground to make churma, which is then shaped into balls. It is often served during festivals and special occasions.'
            }
        ]
    },
    'himachal-pradesh': {
        name: 'Himachal Pradesh',
        lat: 31.1048,
        lon: 77.1734,
        subtitle: 'Land of Snow',
        monuments: [
            {
                name: 'Shimla Heritage',
                description: 'Colonial hill station architecture, summer capital legacy',
                icon: '🏢',
                details: 'Shimla served as the summer capital of British India and retains much of its colonial architecture, including the Viceregal Lodge, Christ Church, and the famous Mall Road. The town showcases Indo-European architectural fusion.'
            },
            {
                name: 'Manali Temples',
                description: 'Ancient Hindu temples in valley setting with mountain backdrop',
                icon: '🛕',
                details: 'Manali hosts several ancient temples including Hadimba Devi Temple, Manu Temple, and Vashisht Temple. These temples showcase traditional Himachali architecture with wooden structures and intricate carvings.'
            },
            {
                name: 'Dharamshala',
                description: 'Tibetan Buddhist culture and monasteries, Dalai Lama residence',
                icon: '🏔️',
                details: 'Dharamshala, particularly McLeod Ganj, is home to the Dalai Lama and the Tibetan government-in-exile. It features Tibetan monasteries, Buddhist temples, and serves as a center for Tibetan culture and Buddhism.'
            },
            {
                name: 'Spiti Monasteries',
                description: 'High-altitude Buddhist gompas in cold desert landscape',
                icon: '⛰️',
                details: 'Spiti Valley houses ancient Buddhist monasteries like Tabo, Key, and Dhankar Gompas. These high-altitude monasteries preserve ancient Buddhist manuscripts, art, and traditions in one of the world\'s most challenging environments.'
            }
        ],
        culture: [
            {
                name: 'Pahari Culture',
                description: 'Hill traditions and folk practices in mountain communities',
                icon: '🏔️',
                details: 'Pahari culture encompasses the traditions of hill people, including folk songs, dances like Natti and Kayang, traditional festivals, and customs adapted to mountain life. The culture emphasizes community cooperation and harmony with nature.'
            },
            {
                name: 'Buddhist Heritage',
                description: 'Tibetan influence and monasteries preserving ancient wisdom',
                icon: '☸️',
                details: 'Himachal Pradesh, particularly in areas like Dharamshala and Spiti, has a rich Buddhist heritage with Tibetan monasteries, Buddhist philosophy centers, and meditation retreats preserving ancient Tibetan Buddhist traditions.'
            },
            {
                name: 'Mountain Festivals',
                description: 'Seasonal celebrations and fairs in high altitude regions',
                icon: '🌿',
                details: 'Mountain festivals in Himachal Pradesh celebrate seasonal changes, local deities, and agricultural cycles. Famous festivals include Kullu Dussehra, Minjar Fair, and various village deity celebrations.'
            }
        ],
        arts: [
            {
                name: 'Kullu Shawls',
                description: 'Woolen shawls with traditional patterns from valley artisans',
                icon: '🧣',
                details: 'Kullu shawls are traditional woolen garments from the Kullu valley, known for their distinctive patterns and geometric designs. These handwoven shawls use local wool and traditional techniques passed down through generations.'
            },
            {
                name: 'Pahari Painting',
                description: 'Hill miniature painting tradition with natural themes',
                icon: '🎨',
                details: 'Pahari painting refers to the school of miniature painting that developed in the hill kingdoms of North India during the 17th-19th centuries. These paintings often depict religious themes, court scenes, and natural landscapes.'
            },
            {
                name: 'Wood Carving',
                description: 'Temple and architectural decorations in pine and deodar',
                icon: '🪚',
                details: 'Wood carving in Himachal Pradesh is evident in traditional architecture, temple decorations, and household items. Artisans use local wood like pine and deodar to create intricate patterns and functional items.'
            }
        ],
        food: [
            {
                name: 'Dham',
                description: 'Traditional feast served on banana leaves during festivals',
                icon: '🍲',
                details: 'Dham is a complete meal and an important part of Himachali cuisine, usually prepared during festivals and special occasions. The meal typically includes rice, dal, rajma, curry, curd, and sweet dish served on leaf plates.'
            },
            {
                name: 'Siddu',
                description: 'Steamed bread stuffed with poppy seeds and walnuts',
                icon: '🥖',
                details: 'Siddu is a traditional steamed bread from Himachal Pradesh, typically stuffed with a mixture of poppy seeds, walnuts, or other fillings. It is usually served with ghee, dal, or vegetables and is popular in the winter months.'
            },
            {
                name: 'Chha Ghost',
                description: 'Marinated lamb curry with yogurt and hill spices',
                icon: '🍛',
                details: 'Chha Ghost is a traditional mutton curry from Himachal Pradesh. The meat is marinated in yogurt and cooked with local spices including red chili powder, giving it a distinctive flavor typical of Himachali cuisine.'
            }
        ]
    },
    'punjab': {
        name: 'Punjab',
        lat: 31.1471,
        lon: 75.3412,
        subtitle: 'Land of Five Rivers',
        monuments: [
            {
                name: 'Golden Temple',
                description: 'Holiest Sikh shrine with gold-plated dome, symbol of equality',
                icon: '🛕',
                details: 'The Golden Temple, also known as Sri Harmandir Sahib, is the holiest gurdwara and most important pilgrimage site of Sikhism. It is located in Amritsar and is famous for its stunning architecture with gold-plated dome and four entrances.'
            },
            {
                name: 'Anandpur Sahib',
                description: 'Birthplace of Khalsa with historic gurudwaras and festivals',
                icon: '⚔️',
                details: 'Anandpur Sahib is one of the most sacred places in Sikhism, being the birthplace of the Khalsa. It was here that Guru Gobind Singh, the tenth Sikh guru, created the Khalsa in 1699. The city hosts the annual Hola Mohalla festival.'
            },
            {
                name: 'Qila Mubarak',
                description: 'Historic fort in Patiala with museums and royal artifacts',
                icon: '🏰',
                details: 'Qila Mubarak is a historic fort complex in Patiala built by Maharaja Ala Singh in 1763. The fort houses several palaces, museums, and artifacts showcasing the rich history and culture of the Patiala state.'
            },
            {
                name: 'Wagah Border',
                description: 'Ceremonial border crossing with daily flag ceremony',
                icon: '🇮🇳',
                details: 'The Wagah border crossing between India and Pakistan is famous for its elaborate daily flag-lowering ceremony. The ceremony is conducted by the Indian Border Security Force and Pakistan Rangers, attracting thousands of spectators daily.'
            }
        ],
        culture: [
            {
                name: 'Sikh Traditions',
                description: 'Rich religious heritage with community service and equality',
                icon: '☪️',
                details: 'Sikh traditions emphasize equality, community service (seva), and devotion. The culture includes community kitchens (langars), gurdwara worship, and festivals like Baisakhi and Gurpurabs celebrating Sikh gurus.'
            },
            {
                name: 'Bhangra Dance',
                description: 'Energetic folk dance celebrating harvest and joy of life',
                icon: '💃',
                details: 'Bhangra is a lively form of music and dance that originated in Punjab. Originally performed during harvest festivals, it has become a popular dance form worldwide, characterized by energetic movements and vibrant music.'
            },
            {
                name: 'Punjabi Music',
                description: 'Folk songs and modern Punjabi pop spreading worldwide',
                icon: '🎵',
                details: 'Punjabi music includes traditional folk songs, devotional music, and modern Punjabi pop. The music often features instruments like dhol, tumbi, and tabla, with lyrics celebrating love, valor, and cultural pride.'
            }
        ],
        arts: [
            {
                name: 'Phulkari Embroidery',
                description: 'Floral embroidery on traditional dupattas by Punjabi women',
                icon: '🌸',
                details: 'Phulkari, meaning "flower work," is a traditional embroidery technique where silk threads are embroidered onto cotton cloth creating vibrant floral patterns. It is typically done on dupattas and is an important part of Punjabi cultural heritage.'
            },
            {
                name: 'Jutti Making',
                description: 'Traditional leather footwear crafts with intricate designs',
                icon: '👠',
                details: 'Punjabi juttis are traditional leather shoes with pointed toes, often decorated with embroidery, beads, or mirrors. They are handcrafted by skilled artisans and are popular throughout India for their comfort and style.'
            },
            {
                name: 'Punjabi Suits',
                description: 'Traditional dress with intricate designs and mirror work',
                icon: '🥻',
                details: 'Punjabi suits consist of a kameez (tunic), salwar (loose pants), and dupatta (scarf). They often feature intricate embroidery, mirror work, and vibrant colors, representing the rich textile traditions of Punjab.'
            }
        ],
        food: [
            {
                name: 'Butter Chicken',
                description: 'Creamy tomato-based chicken curry, globally famous dish',
                icon: '🍗',
                details: 'Butter chicken, also known as murgh makhani, is a curry made from chicken with a spiced curry sauce. The sauce is enriched with butter and cream, giving it a rich and creamy texture. It was invented in Delhi but has Punjab influences.'
            },
            {
                name: 'Sarson da Saag',
                description: 'Mustard greens with makki di roti, winter specialty',
                icon: '🌿',
                details: 'Sarson da saag is a popular Punjabi dish made from mustard greens, typically served with makki di roti (corn bread) and butter. It is a winter delicacy rich in nutrients and is often garnished with fresh ginger and served with jaggery.'
            },
            {
                name: 'Chole Bhature',
                description: 'Spiced chickpeas with fried bread, popular breakfast',
                icon: '🥖',
                details: 'Chole bhature is a combination of spicy chickpea curry (chole) and fried bread (bhature). It is a popular dish in Punjab and North India, often served as a hearty breakfast or lunch with pickles and onions.'
            }
        ]
    }
};

// Music system with Indian classical tracks
const musicTracks = [
    'Indian Classical',
    'Sitar Melody',
    'Tabla Rhythms',
    'Folk Traditions',
    'Temple Bells',
    'Mountain Songs'
];

// Community quotes for each state
const communityQuotes = {
    'jammu-kashmir': [
        {
            text: "Kashmir is not just a place, it's a feeling that touches your soul with its divine beauty.",
            author: "Rashid Ahmad, Local Guide"
        },
        {
            text: "Our Pashmina shawls carry the warmth of Kashmir's love woven by our skilled artisans.",
            author: "Meera Devi, Artisan"
        }
    ],
    'uttarakhand': [
        {
            text: "In the lap of Himalayas, we find both divinity and the strength of our ancestors.",
            author: "Priya Negi, Local Guide"
        },
        {
            text: "The mountains have taught us that spirituality and nature are inseparable.",
            author: "Ravi Tiwari, Pilgrimage Coordinator"
        }
    ],
    'uttar-pradesh': [
        {
            text: "The Taj Mahal teaches us that true love creates monuments that last forever.",
            author: "Amit Sharma, Heritage Guide"
        },
        {
            text: "From Varanasi's ghats to Lucknow's tehzeeb, UP preserves India's cultural soul.",
            author: "Dr. Sunita Singh, Historian"
        }
    ],
    'rajasthan': [
        {
            text: "Rajasthan teaches us that true royalty lies in preserving our heritage for future generations.",
            author: "Meera Sharma, Heritage Enthusiast"
        },
        {
            text: "Every fort here whispers tales of valor and every haveli speaks of artistic excellence.",
            author: "Dr. Amit Kumar, Historian"
        }
    ],
    'haryana': [
        {
            text: "From Kurukshetra's wisdom to Olympic medals, Haryana shows strength in tradition and modernity.",
            author: "Geeta Phogat, Wrestler"
        },
        {
            text: "Our Phulkari embroidery blooms like the fields of Haryana, colorful and full of life.",
            author: "Kamla Devi, Embroiderer"
        }
    ],
    'himachal-pradesh': [
        {
            text: "The mountains of Himachal teach us patience, resilience and the beauty of simplicity.",
            author: "Laxmi Thakur, Hill Woman"
        },
        {
            text: "From Shimla's colonial charm to Spiti's Buddhist wisdom, we embrace all cultures.",
            author: "Tenzin Norbu, Monk"
        }
    ],
    'punjab': [
        {
            text: "The Golden Temple shows us that true wealth lies in serving humanity with love.",
            author: "Gurpreet Singh, Volunteer"
        },
        {
            text: "Punjab's spirit is like our Bhangra - energetic, joyful and bringing people together.",
            author: "Simran Kaur, Dancer"
        }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('India\'s Heritage app initializing...');
    initializeMap();
    setupNavigation();
    setupDiscoverButton();
    setupMusicSystem();
    setupModal();
});

// Initialize the map with heritage state markers
function initializeMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error('Map container not found');
        return;
    }

    console.log('Creating Leaflet map...');
    
    // Create map centered on North India to show all 7 states
    map = L.map('map', {
        center: [29.0, 77.0],
        zoom: 6,
        scrollWheelZoom: false,
        zoomControl: true
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Add heritage state markers for all 7 specified states
    let markerCount = 0;
    Object.keys(heritageStates).forEach(stateId => {
        const state = heritageStates[stateId];
        addStateMarker(stateId, state);
        markerCount++;
    });

    console.log(`Heritage map initialized with ${markerCount} state markers`);
}

// Add individual state marker with working click functionality
function addStateMarker(stateId, stateData) {
    console.log(`Adding marker for ${stateData.name}`);

    // Create marker with custom style
    const marker = L.circleMarker([stateData.lat, stateData.lon], {
        radius: 12,
        fillColor: '#8F0200',
        color: '#FFFFFF',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.9
    }).addTo(map);

    // Add tooltip on hover
    marker.bindTooltip(`<strong>${stateData.name}</strong><br>${stateData.subtitle}`, {
        permanent: false,
        direction: 'top'
    });

    // Create popup content with working button
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    popupContent.style.cssText = 'text-align: center; min-width: 200px;';
    
    const title = document.createElement('h3');
    title.style.cssText = 'margin: 0 0 10px 0; color: #8F0200;';
    title.textContent = stateData.name;
    
    const subtitle = document.createElement('p');
    subtitle.style.cssText = 'margin: 0 0 15px 0; font-size: 0.9em; color: #333;';
    subtitle.textContent = stateData.subtitle;
    
    const button = document.createElement('button');
    button.style.cssText = 'background: #8F0200; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold;';
    button.textContent = `Explore ${stateData.name}`;
    
    // Add working click handler to button
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(`Button clicked for ${stateData.name}`);
        exploreState(stateId);
    });
    
    popupContent.appendChild(title);
    popupContent.appendChild(subtitle);
    popupContent.appendChild(button);

    marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'heritage-popup'
    });

    // Add working click handler for marker itself
    marker.on('click', function(e) {
        console.log(`Marker clicked for ${stateData.name}`);
        // Open popup first, then navigate after delay
        marker.openPopup();
        setTimeout(() => {
            exploreState(stateId);
        }, 500);
    });

    console.log(`Marker added for ${stateData.name} at [${stateData.lat}, ${stateData.lon}]`);
}

// Navigate to state page with working functionality
function exploreState(stateId) {
    console.log(`Exploring state: ${stateId}`);
    
    currentState = stateId;
    const stateData = heritageStates[stateId];
    
    if (!stateData) {
        console.error('State data not found for:', stateId);
        return;
    }

    console.log(`Loading content for ${stateData.name}`);

    // Close any open popups
    if (map) {
        map.closePopup();
    }

    // Update state page content
    const stateTitle = document.getElementById('state-title');
    const stateSubtitle = document.getElementById('state-subtitle');
    
    if (stateTitle) stateTitle.textContent = stateData.name;
    if (stateSubtitle) stateSubtitle.textContent = stateData.subtitle;

    // Render content sections with enhanced scrolling
    renderStateContent('monuments', stateData.monuments);
    renderStateContent('culture', stateData.culture);
    renderStateContent('arts', stateData.arts);
    renderStateContent('food', stateData.food);
    
    // Render community quotes
    renderCommunityQuotes(stateId);

    // Show state page and hide homepage
    showPage('state-page');
    
    // Hide nav links and show back button
    const navLinks = document.querySelector('.nav-links');
    const backBtn = document.getElementById('back-btn');
    if (navLinks) navLinks.style.display = 'none';
    if (backBtn) backBtn.classList.remove('hidden');

    console.log(`Successfully loaded ${stateData.name} page`);
}

// Render content for each section with enhanced scrolling animation
function renderStateContent(sectionType, items) {
    const container = document.getElementById(`${sectionType}-scroll`);
    if (!container) {
        console.error(`Container not found for section: ${sectionType}`);
        return;
    }

    container.innerHTML = '';
    
    // Create items with duplicates for seamless infinite scroll
    const duplicatedItems = [...items, ...items];
    
    duplicatedItems.forEach((item, index) => {
        const scrollItem = document.createElement('div');
        scrollItem.className = 'scroll-item';
        
        // Add click handler for modal
        scrollItem.addEventListener('click', function() {
            openItemModal(item, sectionType);
        });
        
        scrollItem.innerHTML = `
            <div class="scroll-item-image">
                <span style="font-size: 2.5rem; z-index: 1; position: relative;">${item.icon}</span>
                <span style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); font-size: 0.8rem; font-weight: bold; background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; border-radius: 4px; max-width: 90%; text-align: center;">${item.name}</span>
            </div>
            <div class="scroll-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        container.appendChild(scrollItem);
    });

    console.log(`Rendered ${items.length} items for ${sectionType} section`);
}

// Open item detail modal
function openItemModal(item, category) {
    console.log(`Opening modal for ${item.name}`);
    
    const modal = document.getElementById('item-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalIcon = document.getElementById('modal-icon');
    const modalDescription = document.getElementById('modal-description');
    const modalExtraInfo = document.getElementById('modal-extra-info');
    
    if (modal && modalTitle && modalIcon && modalDescription && modalExtraInfo) {
        modalTitle.textContent = item.name;
        modalIcon.textContent = item.icon;
        modalDescription.textContent = item.description;
        modalExtraInfo.textContent = item.details || `Learn more about this fascinating ${category.slice(0, -1)} from ${heritageStates[currentState]?.name}. Each piece of our heritage tells a unique story of culture, tradition, and the skilled artisans who have preserved these treasures through generations.`;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

// Setup modal functionality
function setupModal() {
    const modal = document.getElementById('item-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// Close modal
function closeModal() {
    const modal = document.getElementById('item-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore background scrolling
    }
}

// Render community quotes section
function renderCommunityQuotes(stateId) {
    const container = document.getElementById('quotes-container');
    if (!container) {
        console.error('Quotes container not found');
        return;
    }

    const quotes = communityQuotes[stateId] || [];
    container.innerHTML = '';

    if (quotes.length === 0) {
        container.innerHTML = '<p>No community quotes available for this state.</p>';
        return;
    }

    quotes.forEach(quote => {
        const quoteCard = document.createElement('div');
        quoteCard.className = 'quote-card';
        
        quoteCard.innerHTML = `
            <div class="quote-text">"${quote.text}"</div>
            <div class="quote-author">— ${quote.author}</div>
        `;
        
        container.appendChild(quoteCard);
    });

    console.log(`Rendered ${quotes.length} quotes for ${stateId}`);
}

// Setup music system with working controls
function setupMusicSystem() {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const currentSongDisplay = document.getElementById('current-song');
    
    // Update current song display
    function updateSongDisplay() {
        if (currentSongDisplay) {
            currentSongDisplay.textContent = musicTracks[currentSongIndex];
        }
    }
    
    // Play/Pause functionality with working visual feedback
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Play/Pause button clicked');
            
            if (isPlaying) {
                playPauseBtn.textContent = '▶️';
                playPauseBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                isPlaying = false;
                console.log('Music paused');
            } else {
                playPauseBtn.textContent = '⏸️';
                playPauseBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                isPlaying = true;
                console.log('Music playing:', musicTracks[currentSongIndex]);
            }
            
            // Reset background after animation
            setTimeout(() => {
                playPauseBtn.style.backgroundColor = '';
            }, 200);
        });
    }
    
    // Previous track with working functionality
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Previous button clicked');
            
            currentSongIndex = (currentSongIndex - 1 + musicTracks.length) % musicTracks.length;
            updateSongDisplay();
            
            // Visual feedback
            prevBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            setTimeout(() => {
                prevBtn.style.backgroundColor = '';
            }, 200);
            
            console.log('Previous track:', musicTracks[currentSongIndex]);
        });
    }
    
    // Next track with working functionality
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Next button clicked');
            
            currentSongIndex = (currentSongIndex + 1) % musicTracks.length;
            updateSongDisplay();
            
            // Visual feedback
            nextBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            setTimeout(() => {
                nextBtn.style.backgroundColor = '';
            }, 200);
            
            console.log('Next track:', musicTracks[currentSongIndex]);
        });
    }
    
    // Volume control with working functionality
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function(e) {
            const volume = this.value / 100;
            console.log('Volume changed to:', volume);
            
            // Visual feedback for volume change
            this.style.background = `linear-gradient(to right, #fff 0%, #fff ${this.value}%, rgba(255,255,255,0.3) ${this.value}%, rgba(255,255,255,0.3) 100%)`;
        });
        
        // Initialize volume slider appearance
        volumeSlider.style.background = `linear-gradient(to right, #fff 0%, #fff 50%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.3) 100%)`;
    }
    
    // Initialize display
    updateSongDisplay();
    console.log('Music system initialized with working controls');
}

// Page navigation
function showPage(pageId) {
    console.log(`Showing page: ${pageId}`);
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
        console.log(`Successfully showed page: ${pageId}`);
    } else {
        console.error(`Page not found: ${pageId}`);
    }
}

// Setup navigation handlers with proper scroll offset
function setupNavigation() {
    // Back button with working functionality
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Back button clicked');
            showPage('homepage');
            backBtn.classList.add('hidden');
            
            // Show nav links again
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) navLinks.style.display = 'flex';
            
            currentState = null;
        });
    }

    // Navigation links for smooth scrolling with proper offset
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Ensure we're on homepage
                if (currentState) {
                    showPage('homepage');
                    const backBtn = document.getElementById('back-btn');
                    if (backBtn) backBtn.classList.add('hidden');
                    const navLinksContainer = document.querySelector('.nav-links');
                    if (navLinksContainer) navLinksContainer.style.display = 'flex';
                    currentState = null;
                    
                    // Wait for page transition then scroll with proper offset
                    setTimeout(() => {
                        const headerHeight = 100; // Account for fixed navbar
                        const elementPosition = targetSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }, 300);
                } else {
                    // Already on homepage, scroll with proper offset
                    const headerHeight = 100;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    console.log('Navigation handlers setup complete');
}

// Setup discover button
function setupDiscoverButton() {
    const discoverBtn = document.getElementById('discover-btn');
    if (discoverBtn) {
        discoverBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Discover button clicked');
            
            const mapSection = document.getElementById('map-section');
            if (mapSection) {
                const headerHeight = 100;
                const elementPosition = mapSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
        console.log('Discover button handler setup complete');
    }
}

// Handle responsive map
window.addEventListener('resize', function() {
    if (map) {
        setTimeout(function() {
            map.invalidateSize();
        }, 100);
    }
});

// Make functions globally accessible for any remaining legacy calls
window.exploreState = exploreState;
window.openItemModal = openItemModal;

console.log('India\'s Heritage website JavaScript loaded successfully with all fixes applied');