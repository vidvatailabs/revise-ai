import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.quizAttempt.deleteMany();
  await prisma.mCQ.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.subject.deleteMany();

  // ═══════════════════════════════════════════
  //  CLASS 10  - SOCIAL SCIENCE
  // ═══════════════════════════════════════════

  // ── History ──
  const history = await prisma.subject.create({
    data: {
      class: 10,
      title: "History",
      icon: "📜",
      order: 1,
    },
  });

  const hist1 = await prisma.chapter.create({
    data: {
      subjectId: history.id,
      title: "The Rise of Nationalism in Europe",
      order: 1,
      topics: {
        create: [
          {
            title: "The French Revolution and Nationalism",
            order: 1,
            summary:
              "The French Revolution of 1789 was the first clear expression of nationalism. It transferred sovereignty from the monarchy to the French citizens. Measures like a new constitution, centralised administration, uniform laws, and the abolition of internal customs duties created a sense of collective identity. French became the common language. The revolutionaries declared that it was the mission of the French nation to liberate the peoples of Europe from despotism.",
          },
          {
            title: "The Making of Nationalism in Europe",
            order: 2,
            summary:
              "In the 19th century, Europe was divided into many kingdoms and duchies. Nationalist feelings were driven by a common culture, shared history, and language. Romanticism played a key role  - artists and poets developed national identity through folk culture. The unification of Germany under Otto von Bismarck (through wars) and Italy under Giuseppe Mazzini/Garibaldi were landmark events. Nationalism was no longer tied to democracy and revolution; it became aligned with conservatism and imperialism by the late 1800s.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "Which revolution is considered the first clear expression of nationalism?",
            optionA: "American Revolution",
            optionB: "French Revolution",
            optionC: "Russian Revolution",
            optionD: "Industrial Revolution",
            correctAnswer: "B",
            explanation: "The French Revolution of 1789 was the first clear expression of nationalism, transferring sovereignty from the monarchy to the citizens of France.",
          },
          {
            question: "Who was responsible for the unification of Germany?",
            optionA: "Giuseppe Mazzini",
            optionB: "Giuseppe Garibaldi",
            optionC: "Otto von Bismarck",
            optionD: "Napoleon Bonaparte",
            correctAnswer: "C",
            explanation: "Otto von Bismarck, the Chief Minister of Prussia, led the unification of Germany through a policy of 'blood and iron'  - three wars over seven years.",
          },
          {
            question: "The Treaty of Vienna of 1815 was drawn up at the Congress hosted by which country's Chancellor?",
            optionA: "Britain",
            optionB: "France",
            optionC: "Austria",
            optionD: "Prussia",
            correctAnswer: "C",
            explanation: "The Treaty of Vienna was hosted by Austrian Chancellor Duke Metternich in 1815 to undo the changes brought by Napoleon.",
          },
          {
            question: "What role did Romanticism play in developing nationalism?",
            optionA: "It promoted industrialisation",
            optionB: "It developed national sentiment through folk culture and traditions",
            optionC: "It supported monarchy",
            optionD: "It discouraged the use of local languages",
            correctAnswer: "B",
            explanation: "Romantic artists and poets used folk songs, poetry, and traditions to shape national identity and create a shared cultural past.",
          },
          {
            question: "Who founded 'Young Italy'?",
            optionA: "Count Cavour",
            optionB: "Garibaldi",
            optionC: "Victor Emmanuel II",
            optionD: "Giuseppe Mazzini",
            correctAnswer: "D",
            explanation: "Giuseppe Mazzini founded 'Young Italy' in 1831, a secret society to promote Italian unification as a democratic republic.",
          },
        ],
      },
    },
  });

  const hist2 = await prisma.chapter.create({
    data: {
      subjectId: history.id,
      title: "Nationalism in India",
      order: 2,
      topics: {
        create: [
          {
            title: "The Non -Cooperation Movement",
            order: 1,
            summary:
              "Mahatma Gandhi launched the Non -Cooperation Movement in 1920 against British rule. He proposed that if Indians refused to cooperate, British rule would collapse within a year. The movement involved boycotting foreign goods, surrendering government titles, and leaving government institutions. It was called off after the Chauri Chaura incident in 1922, where a violent mob set fire to a police station. Despite being withdrawn, the movement was significant in bringing masses into the national struggle.",
          },
          {
            title: "The Civil Disobedience Movement",
            order: 2,
            summary:
              "The Civil Disobedience Movement began with the Dandi March on 12 March 1930 when Gandhi marched 240 miles from Sabarmati to Dandi to break the salt law. Unlike Non -Cooperation (which involved boycotts), this movement asked people to break colonial laws. People manufactured salt, boycotted foreign cloth, and refused to pay taxes. It drew participation from rich peasants, poor peasants, business classes, and women. The movement was called off with the Gandhi -Irwin Pact of 1931.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "The Non -Cooperation Movement was launched in which year?",
            optionA: "1919",
            optionB: "1920",
            optionC: "1922",
            optionD: "1930",
            correctAnswer: "B",
            explanation: "The Non -Cooperation Movement was launched by Mahatma Gandhi in January 1920 to protest British colonial rule.",
          },
          {
            question: "Why was the Non -Cooperation Movement called off?",
            optionA: "British agreed to Indian demands",
            optionB: "The Jallianwala Bagh massacre",
            optionC: "The Chauri Chaura incident",
            optionD: "Gandhi was arrested",
            correctAnswer: "C",
            explanation: "Gandhi called off the movement in February 1922 after a violent mob at Chauri Chaura in UP set a police station on fire, killing 22 policemen.",
          },
          {
            question: "The Dandi March was associated with which movement?",
            optionA: "Non -Cooperation Movement",
            optionB: "Quit India Movement",
            optionC: "Civil Disobedience Movement",
            optionD: "Khilafat Movement",
            correctAnswer: "C",
            explanation: "Gandhi's Dandi March (Salt March) in March 1930 marked the beginning of the Civil Disobedience Movement.",
          },
          {
            question: "How far did Gandhi march during the Dandi March?",
            optionA: "150 miles",
            optionB: "200 miles",
            optionC: "240 miles",
            optionD: "300 miles",
            correctAnswer: "C",
            explanation: "Gandhi walked 240 miles from his Sabarmati Ashram to the coastal village of Dandi to break the salt law.",
          },
          {
            question: "The Gandhi -Irwin Pact was signed in which year?",
            optionA: "1929",
            optionB: "1930",
            optionC: "1931",
            optionD: "1932",
            correctAnswer: "C",
            explanation: "The Gandhi -Irwin Pact was signed on 5 March 1931, leading to the temporary suspension of the Civil Disobedience Movement.",
          },
        ],
      },
    },
  });

  const hist3 = await prisma.chapter.create({
    data: {
      subjectId: history.id,
      title: "The Making of a Global World",
      order: 3,
      topics: {
        create: [
          {
            title: "The Pre -Modern World and Silk Routes",
            order: 1,
            summary:
              "The Silk Routes are a good example of pre -modern trade and cultural links. These routes connected Asia with Europe and North Africa. Goods like Chinese pottery, textiles, and spices travelled these routes. Along with trade, ideas, inventions, and even diseases spread. Food crops like potatoes, soya, groundnuts, maize, and tomatoes were introduced to Europe from the Americas after Columbus's discovery. This 'Columbian exchange' transformed lives across the world.",
          },
          {
            title: "The Nineteenth Century Global Economy",
            order: 2,
            summary:
              "The 19th century saw the growth of a truly global economy. Britain grew by importing food and raw materials from colonies. Technology (railways, steamships, telegraph) enabled faster trade. Indentured labour from India replaced slave labour on plantations in the Caribbean, Mauritius, and Fiji. The Great Depression of 1929 devastated the world economy  - production and trade fell, unemployment rose, and prices collapsed. India's exports and imports halved during 1928 -1934.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "Which routes connected Asia with Europe and North Africa in pre -modern times?",
            optionA: "Spice Routes",
            optionB: "Silk Routes",
            optionC: "Trade Routes",
            optionD: "Maritime Routes",
            correctAnswer: "B",
            explanation: "The Silk Routes were ancient trade networks connecting Asia to Europe and North Africa, facilitating exchange of goods, ideas, and culture.",
          },
          {
            question: "Which food crops were introduced to Europe from the Americas?",
            optionA: "Rice and wheat",
            optionB: "Potatoes, tomatoes, and maize",
            optionC: "Barley and oats",
            optionD: "Sugarcane and tea",
            correctAnswer: "B",
            explanation: "Potatoes, soya, groundnuts, maize, tomatoes, and chillies were introduced to Europe after Columbus's discovery of the Americas.",
          },
          {
            question: "The Great Depression began in which year?",
            optionA: "1925",
            optionB: "1929",
            optionC: "1932",
            optionD: "1935",
            correctAnswer: "B",
            explanation: "The Great Depression began around 1929 with the crash of the US stock market, devastating economies worldwide.",
          },
          {
            question: "What replaced slave labour on plantations after slavery was abolished?",
            optionA: "Machine labour",
            optionB: "Indentured labour",
            optionC: "Free labour",
            optionD: "Prison labour",
            correctAnswer: "B",
            explanation: "Indentured labour from India and China replaced slave labour on plantations in the Caribbean, Mauritius, Fiji, and other colonies.",
          },
          {
            question: "Which technology did NOT contribute to 19th century globalisation?",
            optionA: "Railways",
            optionB: "Steamships",
            optionC: "Internet",
            optionD: "Telegraph",
            correctAnswer: "C",
            explanation: "The internet is a 20th century invention. Railways, steamships, and the telegraph were the key technologies enabling 19th century global trade.",
          },
        ],
      },
    },
  });

  // ── Geography ──
  const geography = await prisma.subject.create({
    data: {
      class: 10,
      title: "Geography",
      icon: "🌍",
      order: 2,
    },
  });

  await prisma.chapter.create({
    data: {
      subjectId: geography.id,
      title: "Resources and Development",
      order: 1,
      topics: {
        create: [
          {
            title: "Types of Resources",
            order: 1,
            summary:
              "Resources are classified based on origin (biotic/abiotic), exhaustibility (renewable/non -renewable), ownership (individual/community/national/international), and development status (potential/developed/stock/reserve). India has diverse resources  - from the black soil of the Deccan to the alluvial plains of the north. Sustainable development means using resources wisely so future generations can benefit too. Agenda 21 at the Rio Summit (1992) was a landmark declaration on sustainable development.",
          },
          {
            title: "Land Resources and Soil Types",
            order: 2,
            summary:
              "India has diverse soil types: Alluvial soil (most widespread, found in northern plains, very fertile), Black/Regur soil (Deccan plateau, ideal for cotton), Red and Yellow soil (eastern/southern Deccan, develops on crystalline rocks), Laterite soil (heavy rainfall areas, used for tea/coffee), Arid soil (western Rajasthan, sandy and saline), and Forest soil (hilly areas). Soil erosion by wind and water is a major problem  - solutions include contour ploughing, terrace farming, and shelter belts.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "Which type of soil is ideal for growing cotton?",
            optionA: "Alluvial soil",
            optionB: "Red soil",
            optionC: "Black soil (Regur)",
            optionD: "Laterite soil",
            correctAnswer: "C",
            explanation: "Black soil (also called Regur) is found in the Deccan plateau and is ideal for growing cotton due to its moisture -retaining capacity.",
          },
          {
            question: "Agenda 21 was declared at which international summit?",
            optionA: "Kyoto Summit 1997",
            optionB: "Rio Earth Summit 1992",
            optionC: "Paris Summit 2015",
            optionD: "Stockholm Summit 1972",
            correctAnswer: "B",
            explanation: "Agenda 21 was the declaration signed at the United Nations Conference on Environment and Development (Earth Summit) in Rio de Janeiro in 1992.",
          },
          {
            question: "Which soil type is the most widespread in India?",
            optionA: "Black soil",
            optionB: "Red soil",
            optionC: "Alluvial soil",
            optionD: "Laterite soil",
            correctAnswer: "C",
            explanation: "Alluvial soil is the most widespread soil in India, covering the entire northern plains formed by the Indus, Ganga, and Brahmaputra river systems.",
          },
          {
            question: "Shelter belts of trees are used to prevent which type of soil erosion?",
            optionA: "Sheet erosion",
            optionB: "Gully erosion",
            optionC: "Wind erosion",
            optionD: "Splash erosion",
            correctAnswer: "C",
            explanation: "Shelter belts  - rows of trees planted to break the wind  - are effective in preventing wind erosion, especially in desert and semi -arid areas.",
          },
          {
            question: "Resources that take millions of years to form are called:",
            optionA: "Renewable resources",
            optionB: "Biotic resources",
            optionC: "Non -renewable resources",
            optionD: "Community resources",
            correctAnswer: "C",
            explanation: "Non -renewable resources like fossil fuels and minerals take millions of years to form and get exhausted with use.",
          },
        ],
      },
    },
  });

  await prisma.chapter.create({
    data: {
      subjectId: geography.id,
      title: "Water Resources",
      order: 2,
      topics: {
        create: [
          {
            title: "Water Scarcity and Conservation",
            order: 1,
            summary:
              "India receives abundant rainfall but faces water scarcity due to uneven distribution, over -exploitation of groundwater, and growing demand from agriculture and industry. Only 1/3 of rainfall is effectively used. Urbanisation and industrialisation have increased water demand manifold. Rajasthan's Indira Gandhi Canal has transformed desert areas. Water harvesting  - like rooftop rainwater collection, tankas in Rajasthan, and bamboo drip irrigation in Meghalaya  - offers sustainable solutions.",
          },
          {
            title: "Dams  - Multipurpose River Valley Projects",
            order: 2,
            summary:
              "Multipurpose dams serve many purposes: irrigation, electricity generation, flood control, water supply, and recreation. Jawaharlal Nehru called them 'temples of modern India.' Major projects include Bhakra Nangal (Sutlej), Hirakud (Mahanadi), and Tehri Dam (Bhagirathi). However, dams face criticism: displacement of locals, environmental damage (deforestation, loss of biodiversity), sedimentation, and triggered earthquakes. The Narmada Bachao Andolan (led by Medha Patkar) opposed the Sardar Sarovar Dam due to displacement concerns.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "Who called dams 'the temples of modern India'?",
            optionA: "Mahatma Gandhi",
            optionB: "Jawaharlal Nehru",
            optionC: "B.R. Ambedkar",
            optionD: "Sardar Patel",
            correctAnswer: "B",
            explanation: "Jawaharlal Nehru called multipurpose dams the 'temples of modern India' as they were key to post -independence development.",
          },
          {
            question: "The Narmada Bachao Andolan was led by:",
            optionA: "Sunderlal Bahuguna",
            optionB: "Medha Patkar",
            optionC: "Amrita Devi Bishnoi",
            optionD: "Chandi Prasad Bhatt",
            correctAnswer: "B",
            explanation: "Medha Patkar led the Narmada Bachao Andolan, opposing the Sardar Sarovar Dam project on the Narmada river due to displacement of tribal people.",
          },
          {
            question: "Bhakra Nangal dam is built on which river?",
            optionA: "Ganga",
            optionB: "Mahanadi",
            optionC: "Sutlej",
            optionD: "Narmada",
            correctAnswer: "C",
            explanation: "Bhakra Nangal Dam is built on the Sutlej river in the state of Himachal Pradesh/Punjab.",
          },
          {
            question: "Bamboo drip irrigation is practised in which Indian state?",
            optionA: "Rajasthan",
            optionB: "Meghalaya",
            optionC: "Kerala",
            optionD: "Tamil Nadu",
            correctAnswer: "B",
            explanation: "Bamboo drip irrigation is an ingenious system practised in Meghalaya where water from streams is diverted through bamboo pipes to irrigate crops.",
          },
          {
            question: "Which is NOT a criticism of multipurpose dam projects?",
            optionA: "Displacement of local communities",
            optionB: "Loss of biodiversity",
            optionC: "Generation of hydroelectricity",
            optionD: "Sedimentation of reservoirs",
            correctAnswer: "C",
            explanation: "Generation of hydroelectricity is a benefit, not a criticism. Criticisms include displacement, environmental damage, sedimentation, and induced seismicity.",
          },
        ],
      },
    },
  });

  await prisma.chapter.create({
    data: {
      subjectId: geography.id,
      title: "Agriculture",
      order: 3,
      topics: {
        create: [
          {
            title: "Types of Farming in India",
            order: 1,
            summary:
              "India has diverse farming types: Subsistence farming (small plots, family labour, basic tools), Intensive subsistence (high labour input, small land), Commercial farming (large -scale, high inputs, sold in market), and Plantation (single crop, large estates  - tea, coffee, rubber). About 2/3 of India's population depends on agriculture. The Green Revolution (1960s -70s) introduced HYV seeds and modern technology, mainly benefiting wheat and rice in Punjab, Haryana, and western UP.",
          },
          {
            title: "Major Crops of India",
            order: 2,
            summary:
              "India's major crops include: Rice (Kharif, needs high temperature and rainfall  - WB, UP, Punjab), Wheat (Rabi, needs cool climate  - UP, Punjab, Haryana), Millets (Jowar, Bajra, Ragi  - dry regions), Sugarcane (UP, Maharashtra, Karnataka), Cotton (Maharashtra, Gujarat, MP), Jute (the 'Golden Fibre'  - WB, Bihar), Tea (Assam, Darjeeling, Nilgiris), and Coffee (Karnataka, Kerala). Kharif crops are sown in June -July and harvested in September -October. Rabi crops are sown in October -November and harvested in March -April.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "The Green Revolution primarily benefited which crops?",
            optionA: "Cotton and jute",
            optionB: "Wheat and rice",
            optionC: "Tea and coffee",
            optionD: "Sugarcane and tobacco",
            correctAnswer: "B",
            explanation: "The Green Revolution of the 1960s -70s primarily benefited wheat and rice production through HYV seeds, especially in Punjab, Haryana, and western UP.",
          },
          {
            question: "Which crop is called the 'Golden Fibre'?",
            optionA: "Cotton",
            optionB: "Silk",
            optionC: "Jute",
            optionD: "Hemp",
            correctAnswer: "C",
            explanation: "Jute is known as the 'Golden Fibre' due to its golden -brown colour. West Bengal is the largest producer.",
          },
          {
            question: "Rabi crops are sown in which season?",
            optionA: "June -July",
            optionB: "October -November",
            optionC: "March -April",
            optionD: "January -February",
            correctAnswer: "B",
            explanation: "Rabi crops (wheat, mustard, peas) are sown in October -November and harvested in March -April (winter season).",
          },
          {
            question: "Which state is the largest producer of tea in India?",
            optionA: "Kerala",
            optionB: "Karnataka",
            optionC: "Assam",
            optionD: "West Bengal",
            correctAnswer: "C",
            explanation: "Assam is the largest producer of tea in India, contributing over half of the country's total production.",
          },
          {
            question: "Coffee production in India is concentrated in which state?",
            optionA: "Assam",
            optionB: "Tamil Nadu",
            optionC: "Karnataka",
            optionD: "Kerala",
            correctAnswer: "C",
            explanation: "Karnataka accounts for about 70% of India's total coffee production, with major growing regions in Coorg, Chikmagalur, and Hassan.",
          },
        ],
      },
    },
  });

  // ── Political Science ──
  const polsci = await prisma.subject.create({
    data: {
      class: 10,
      title: "Political Science",
      icon: "⚖️",
      order: 3,
    },
  });

  await prisma.chapter.create({
    data: {
      subjectId: polsci.id,
      title: "Power Sharing",
      order: 1,
      topics: {
        create: [
          {
            title: "Why Power Sharing is Desirable",
            order: 1,
            summary:
              "Power sharing is desirable for two reasons: (1) Prudential  - it reduces conflict between social groups, ensures political stability, and prevents tyranny of the majority (as seen in Sri Lanka's ethnic conflict between Sinhalese and Tamils). (2) Moral  - it is the very spirit of democracy; citizens have a right to be consulted in governance. Belgium's power -sharing model (between Dutch, French, and German speakers) is a success story  - they amended their constitution four times to accommodate different communities.",
          },
          {
            title: "Forms of Power Sharing",
            order: 2,
            summary:
              "Power can be shared in four ways: (1) Horizontal  - among Legislature, Executive, and Judiciary (separation of powers, checks and balances). (2) Vertical  - between Central and State/Local governments (federalism). (3) Among social groups  - community government in Belgium, reserved constituencies in India. (4) Among political parties, pressure groups, and movements  - coalition governments, trade unions, etc. Modern democracies use a combination of all these forms.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "Belgium amended its constitution how many times to accommodate power sharing?",
            optionA: "Two times",
            optionB: "Three times",
            optionC: "Four times",
            optionD: "Five times",
            correctAnswer: "C",
            explanation: "Belgium amended its constitution four times between 1970 and 1993 to work out an arrangement that would enable everyone to live together peacefully.",
          },
          {
            question: "Which of the following is an example of horizontal power sharing?",
            optionA: "Power shared between central and state governments",
            optionB: "Power shared among different organs of government",
            optionC: "Power shared among different social groups",
            optionD: "Power shared among political parties",
            correctAnswer: "B",
            explanation: "Horizontal power sharing is among the Legislature, Executive, and Judiciary  - different organs at the same level of government.",
          },
          {
            question: "The ethnic conflict in Sri Lanka was between:",
            optionA: "Dutch and French speakers",
            optionB: "Hindus and Muslims",
            optionC: "Sinhalese and Sri Lankan Tamils",
            optionD: "Buddhists and Christians",
            correctAnswer: "C",
            explanation: "Sri Lanka's ethnic conflict was primarily between the majority Sinhalese community and the minority Sri Lankan Tamil community.",
          },
          {
            question: "Which is the prudential reason for power sharing?",
            optionA: "It is the spirit of democracy",
            optionB: "It reduces conflict and ensures stability",
            optionC: "Citizens have a right to be consulted",
            optionD: "It is morally correct",
            correctAnswer: "B",
            explanation: "The prudential reason is practical  - power sharing reduces social conflict and ensures political stability, preventing tyranny of the majority.",
          },
          {
            question: "Community government in Belgium is an example of power sharing among:",
            optionA: "Different organs of government",
            optionB: "Different levels of government",
            optionC: "Different social groups",
            optionD: "Different political parties",
            correctAnswer: "C",
            explanation: "Belgium's community government is elected by people belonging to one language community (Dutch, French, or German)  - an example of power sharing among social groups.",
          },
        ],
      },
    },
  });

  await prisma.chapter.create({
    data: {
      subjectId: polsci.id,
      title: "Federalism",
      order: 2,
      topics: {
        create: [
          {
            title: "What is Federalism?",
            order: 1,
            summary:
              "Federalism is a system where power is divided between a central authority and constituent units (states/provinces). Key features: two or more levels of government, each tier has its own jurisdiction, constitutional guarantee of powers, independent judiciary, and a mechanism for financial distribution. India follows a 'holding together' federation (power devolved from centre to states), unlike the USA which is a 'coming together' federation (independent states formed a union).",
          },
          {
            title: "Decentralisation in India",
            order: 2,
            summary:
              "Decentralisation means taking power away from the Central and State governments and giving it to local government. The 73rd and 74th Constitutional Amendments (1992) made the third tier of democracy (local government) more powerful. Panchayati Raj system: Gram Panchayat → Panchayat Samiti (Block) → Zila Parishad (District). Urban areas have Municipalities and Municipal Corporations. At least 1/3 of all elected positions are reserved for women. State Election Commissions conduct local body elections.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "India is an example of which type of federation?",
            optionA: "Coming together federation",
            optionB: "Holding together federation",
            optionC: "Unitary federation",
            optionD: "Confederal system",
            correctAnswer: "B",
            explanation: "India is a 'holding together' federation where a large country divides power between the central government and constituent states.",
          },
          {
            question: "The 73rd Amendment is related to:",
            optionA: "Fundamental Rights",
            optionB: "Rural local government (Panchayati Raj)",
            optionC: "Urban local government",
            optionD: "Emergency powers",
            correctAnswer: "B",
            explanation: "The 73rd Constitutional Amendment (1992) strengthened the Panchayati Raj system (rural local government) as the third tier of democracy.",
          },
          {
            question: "What percentage of elected positions in local bodies are reserved for women?",
            optionA: "25%",
            optionB: "33%",
            optionC: "40%",
            optionD: "50%",
            correctAnswer: "B",
            explanation: "At least one -third (33%) of all positions in local government bodies are reserved for women as per the 73rd and 74th Amendments.",
          },
          {
            question: "Which is the lowest tier of the Panchayati Raj system?",
            optionA: "Zila Parishad",
            optionB: "Panchayat Samiti",
            optionC: "Gram Panchayat",
            optionD: "Block Committee",
            correctAnswer: "C",
            explanation: "Gram Panchayat is the lowest tier of the three -tier Panchayati Raj system, followed by Panchayat Samiti and Zila Parishad.",
          },
          {
            question: "USA is an example of which type of federation?",
            optionA: "Holding together",
            optionB: "Coming together",
            optionC: "Unitary",
            optionD: "Confederal",
            correctAnswer: "B",
            explanation: "The USA is a 'coming together' federation where independent states came together to form a bigger unit while retaining their identity and sovereignty.",
          },
        ],
      },
    },
  });

  await prisma.chapter.create({
    data: {
      subjectId: polsci.id,
      title: "Political Parties",
      order: 3,
      topics: {
        create: [
          {
            title: "Role and Types of Political Parties",
            order: 1,
            summary:
              "A political party is a group of people who come together to contest elections and hold power. They have three components: leaders, active members, and followers. Functions include contesting elections, forming government policies, playing opposition role, shaping public opinion, and providing access to government welfare. India has a multi -party system with National Parties (recognised in 4+ states  - BJP, INC, BSP, CPI -M, NCP) and State/Regional Parties (recognised in one/two states).",
          },
          {
            title: "Challenges to Political Parties",
            order: 2,
            summary:
              "Major challenges facing political parties include: (1) Lack of internal democracy  - ordinary members have no say, leaders make all decisions. (2) Dynastic succession  - power is passed within families. (3) Growing role of money and muscle power in elections. (4) Parties do not offer meaningful choice  - their policies are often similar. Reforms suggested: laws to regulate internal affairs, mandatory financial transparency, state funding of elections, anti -defection laws, and independent candidate options.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "How many states must recognise a party for it to be called a National Party?",
            optionA: "Two states",
            optionB: "Three states",
            optionC: "Four states",
            optionD: "Five states",
            correctAnswer: "C",
            explanation: "A party must be recognised in at least four states to qualify as a National Party by the Election Commission of India.",
          },
          {
            question: "Which is NOT a function of a political party?",
            optionA: "Contesting elections",
            optionB: "Making laws",
            optionC: "Conducting census",
            optionD: "Shaping public opinion",
            correctAnswer: "C",
            explanation: "Conducting census is a government administrative function, not a function of political parties. Parties contest elections, make laws, and shape public opinion.",
          },
          {
            question: "Which of the following is a challenge faced by political parties?",
            optionA: "Too much internal democracy",
            optionB: "Dynastic succession",
            optionC: "Too much transparency",
            optionD: "Excessive voter turnout",
            correctAnswer: "B",
            explanation: "Dynastic succession  - where power is concentrated in one family within a party  - is a major challenge facing political parties in India.",
          },
          {
            question: "India has which type of party system?",
            optionA: "One -party system",
            optionB: "Two -party system",
            optionC: "Multi -party system",
            optionD: "No -party system",
            correctAnswer: "C",
            explanation: "India has a multi -party system with several national and regional parties competing for power at different levels.",
          },
          {
            question: "The three components of a political party are:",
            optionA: "Leaders, workers, and voters",
            optionB: "Leaders, active members, and followers",
            optionC: "President, secretary, and treasurer",
            optionD: "MPs, MLAs, and councillors",
            correctAnswer: "B",
            explanation: "Every political party has three components: the leaders, the active members, and the followers who support the party.",
          },
        ],
      },
    },
  });

  // ── Economics ──
  const economics = await prisma.subject.create({
    data: {
      class: 10,
      title: "Economics",
      icon: "💰",
      order: 4,
    },
  });

  await prisma.chapter.create({
    data: {
      subjectId: economics.id,
      title: "Development",
      order: 1,
      topics: {
        create: [
          {
            title: "What Development Promises  - Different People, Different Goals",
            order: 1,
            summary:
              "Development means different things to different people. A landless labourer wants higher wages, a farmer wants fair crop prices, an industrialist wants fewer regulations. Development involves thinking about the best mix of goals  - not just income, but quality of life. Countries are compared using Per Capita Income (total income divided by population). The World Bank uses this to classify countries: Rich/Developed (per capita income ≥ US$12,056) and Low -income countries.",
          },
          {
            title: "Human Development Index",
            order: 2,
            summary:
              "Income alone cannot measure development. The UNDP's Human Development Index (HDI) compares countries based on three factors: (1) Health  - measured by life expectancy at birth, (2) Education  - mean years of schooling and expected years of schooling, (3) Standard of living  - Gross National Income per capita. India ranked 132 out of 191 countries in the 2021 -22 HDI report. Sri Lanka has better HDI than India despite lower income, because of superior healthcare and education indicators.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "Per Capita Income is calculated as:",
            optionA: "Total income × total population",
            optionB: "Total income / total population",
            optionC: "Total population / total income",
            optionD: "GDP × population growth rate",
            correctAnswer: "B",
            explanation: "Per Capita Income = Total National Income divided by Total Population. It gives the average income per person in a country.",
          },
          {
            question: "The Human Development Index (HDI) is published by:",
            optionA: "World Bank",
            optionB: "IMF",
            optionC: "UNDP",
            optionD: "WTO",
            correctAnswer: "C",
            explanation: "The Human Development Index is published annually by the United Nations Development Programme (UNDP) in its Human Development Report.",
          },
          {
            question: "Which factor is NOT part of the HDI?",
            optionA: "Life expectancy",
            optionB: "Education levels",
            optionC: "Per capita income",
            optionD: "Military strength",
            correctAnswer: "D",
            explanation: "HDI measures three dimensions: health (life expectancy), education, and standard of living (GNI per capita). Military strength is not a factor.",
          },
          {
            question: "Which country has better HDI than India despite lower per capita income?",
            optionA: "Pakistan",
            optionB: "Bangladesh",
            optionC: "Sri Lanka",
            optionD: "Nepal",
            correctAnswer: "C",
            explanation: "Sri Lanka has a higher HDI rank than India due to better performance in health (life expectancy) and education indicators.",
          },
          {
            question: "According to the World Bank, a country is 'rich' if its per capita income is at least:",
            optionA: "US $5,000",
            optionB: "US $10,000",
            optionC: "US $12,056",
            optionD: "US $15,000",
            correctAnswer: "C",
            explanation: "The World Bank classifies countries with per capita income of US $12,056 or more per annum as rich or developed countries.",
          },
        ],
      },
    },
  });

  await prisma.chapter.create({
    data: {
      subjectId: economics.id,
      title: "Sectors of the Indian Economy",
      order: 2,
      topics: {
        create: [
          {
            title: "Three Sectors of the Economy",
            order: 1,
            summary:
              "Economic activities are classified into three sectors: Primary (agriculture, mining, fishing  - directly using natural resources), Secondary (manufacturing, construction  - processing raw materials into finished goods), and Tertiary/Service (transport, banking, IT, education  - providing services). In India, the tertiary sector has become the largest sector by GDP (over 50%), but the primary sector still employs the most people  - this shows 'disguised unemployment' where more people work in agriculture than needed.",
          },
          {
            title: "Organised and Unorganised Sectors",
            order: 2,
            summary:
              "The economy can also be divided into Organised sector (registered enterprises, follow labour laws, provide job security, provident fund, paid leave) and Unorganised sector (small/scattered units, no fixed employer, no job security, low wages). About 92% of India's workers are in the unorganised sector. MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act, 2005) guarantees 100 days of employment per year to rural households. Government intervention is needed to protect unorganised workers' rights.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "Which sector of the Indian economy contributes the most to GDP?",
            optionA: "Primary sector",
            optionB: "Secondary sector",
            optionC: "Tertiary sector",
            optionD: "All contribute equally",
            correctAnswer: "C",
            explanation: "The tertiary (service) sector contributes over 50% of India's GDP, making it the largest sector by economic output.",
          },
          {
            question: "MGNREGA guarantees how many days of employment per year?",
            optionA: "50 days",
            optionB: "75 days",
            optionC: "100 days",
            optionD: "150 days",
            correctAnswer: "C",
            explanation: "MGNREGA (2005) guarantees 100 days of wage employment in a financial year to every rural household whose adult members volunteer for unskilled manual work.",
          },
          {
            question: "Disguised unemployment is most commonly found in which sector?",
            optionA: "Secondary sector",
            optionB: "Tertiary sector",
            optionC: "Primary sector (agriculture)",
            optionD: "IT sector",
            correctAnswer: "C",
            explanation: "Disguised unemployment is most prevalent in the primary (agriculture) sector, where more people are employed than actually needed.",
          },
          {
            question: "What percentage of India's workforce is in the unorganised sector?",
            optionA: "50%",
            optionB: "70%",
            optionC: "80%",
            optionD: "92%",
            correctAnswer: "D",
            explanation: "About 92% of India's workers are employed in the unorganised sector, which lacks job security and labour law protections.",
          },
          {
            question: "Manufacturing and construction belong to which sector?",
            optionA: "Primary sector",
            optionB: "Secondary sector",
            optionC: "Tertiary sector",
            optionD: "Quaternary sector",
            correctAnswer: "B",
            explanation: "The secondary sector includes manufacturing, construction, and processing industries that convert raw materials into finished goods.",
          },
        ],
      },
    },
  });

  await prisma.chapter.create({
    data: {
      subjectId: economics.id,
      title: "Money and Credit",
      order: 3,
      topics: {
        create: [
          {
            title: "Modern Forms of Money and Banking",
            order: 1,
            summary:
              "Modern money includes currency (paper notes and coins) issued by the Reserve Bank of India (RBI) on behalf of the central government. No other individual or organisation can issue currency  - this is called 'legal tender.' Banks accept deposits and pay interest, then lend this money to borrowers at a higher interest rate  - the difference is their profit. Banks keep only about 15% of deposits as cash (Cash Reserve Ratio) and lend out the rest. This process of lending creates credit in the economy.",
          },
          {
            title: "Credit and Its Impact",
            order: 2,
            summary:
              "Credit (loan) is an agreement where a lender supplies money and the borrower repays with interest. Every loan has: collateral (security like land, property), interest rate, documentation, and mode of repayment. Credit has two faces: it can help people grow (a trader expanding business) or trap them in debt (a farmer whose crop fails). Formal sector loans come from banks and cooperatives (regulated by RBI). Informal sector loans come from moneylenders, traders, and relatives (often with very high interest rates  - leading to debt traps).",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "Who issues currency in India?",
            optionA: "State Bank of India",
            optionB: "Ministry of Finance",
            optionC: "Reserve Bank of India",
            optionD: "SEBI",
            correctAnswer: "C",
            explanation: "The Reserve Bank of India (RBI) issues currency notes on behalf of the central government. It is the sole authority to issue currency in India.",
          },
          {
            question: "What is collateral?",
            optionA: "The interest rate on a loan",
            optionB: "An asset pledged as security against a loan",
            optionC: "A type of bank account",
            optionD: "Monthly repayment amount",
            correctAnswer: "B",
            explanation: "Collateral is an asset (land, property, vehicle, deposits) that the borrower owns and pledges as a guarantee to the lender against the loan.",
          },
          {
            question: "Formal sources of credit include:",
            optionA: "Moneylenders and traders",
            optionB: "Friends and relatives",
            optionC: "Banks and cooperatives",
            optionD: "Landlords and employers",
            correctAnswer: "C",
            explanation: "Formal sources of credit  - banks and cooperatives  - are supervised and regulated by the RBI, ensuring fair interest rates and practices.",
          },
          {
            question: "What percentage of deposits do banks typically keep as cash reserves?",
            optionA: "5%",
            optionB: "15%",
            optionC: "25%",
            optionD: "50%",
            correctAnswer: "B",
            explanation: "Banks keep only about 15% of their deposits as cash (Cash Reserve Ratio) to meet day -to -day withdrawals, and lend out the remaining 85%.",
          },
          {
            question: "The RBI supervises which type of loans?",
            optionA: "Only government loans",
            optionB: "Only international loans",
            optionC: "Formal sector loans (banks and cooperatives)",
            optionD: "Informal sector loans (moneylenders)",
            correctAnswer: "C",
            explanation: "RBI supervises formal sector lending by banks and cooperatives. There is no regulatory body overseeing informal lenders like moneylenders.",
          },
        ],
      },
    },
  });

  // ═══════════════════════════════════════════
  //  CLASS 10  - SCIENCE
  // ═══════════════════════════════════════════

  const science = await prisma.subject.create({
    data: {
      class: 10,
      title: "Science",
      icon: "🔬",
      order: 5,
    },
  });

  await prisma.chapter.create({
    data: {
      subjectId: science.id,
      title: "Chemical Reactions and Equations",
      order: 1,
      topics: {
        create: [
          {
            title: "Types of Chemical Reactions",
            order: 1,
            summary:
              "Chemical reactions involve the transformation of reactants into products. Key types: Combination (two or more substances combine  - 2Mg + O₂ → 2MgO), Decomposition (one substance breaks down  - 2FeSO₄ → Fe₂O₃ + SO₂ + SO₃), Displacement (a more reactive element replaces a less reactive one  - Fe + CuSO₄ → FeSO₄ + Cu), Double Displacement (exchange of ions  - NaOH + HCl → NaCl + H₂O), and Redox (oxidation and reduction occur simultaneously).",
          },
          {
            title: "Balancing Chemical Equations",
            order: 2,
            summary:
              "A balanced chemical equation has equal numbers of atoms of each element on both sides (Law of Conservation of Mass). Steps: Write the word equation, convert to formula equation, count atoms on each side, add coefficients to balance (never change formulas). Oxidation means gain of oxygen or loss of hydrogen. Reduction means loss of oxygen or gain of hydrogen. In a redox reaction, one substance is oxidised while another is reduced simultaneously.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "What type of reaction is: 2Mg + O₂ → 2MgO?",
            optionA: "Decomposition",
            optionB: "Displacement",
            optionC: "Combination",
            optionD: "Double displacement",
            correctAnswer: "C",
            explanation: "This is a combination reaction where two substances (magnesium and oxygen) combine to form a single product (magnesium oxide).",
          },
          {
            question: "In a balanced equation, which law is obeyed?",
            optionA: "Law of Constant Proportions",
            optionB: "Law of Conservation of Mass",
            optionC: "Law of Multiple Proportions",
            optionD: "Avogadro's Law",
            correctAnswer: "B",
            explanation: "A balanced equation follows the Law of Conservation of Mass  - matter is neither created nor destroyed, so atoms must be equal on both sides.",
          },
          {
            question: "Oxidation involves:",
            optionA: "Gain of hydrogen",
            optionB: "Loss of oxygen",
            optionC: "Gain of oxygen",
            optionD: "Gain of electrons",
            correctAnswer: "C",
            explanation: "Oxidation involves gain of oxygen or loss of hydrogen. It can also be defined as loss of electrons.",
          },
          {
            question: "Fe + CuSO₄ → FeSO₄ + Cu is an example of:",
            optionA: "Combination reaction",
            optionB: "Decomposition reaction",
            optionC: "Displacement reaction",
            optionD: "Double displacement reaction",
            correctAnswer: "C",
            explanation: "Iron (more reactive) displaces copper (less reactive) from copper sulphate solution  - this is a displacement reaction.",
          },
          {
            question: "Rancidity can be prevented by:",
            optionA: "Adding water to food",
            optionB: "Adding antioxidants or storing in nitrogen",
            optionC: "Exposing food to sunlight",
            optionD: "Heating food continuously",
            correctAnswer: "B",
            explanation: "Rancidity (oxidation of fats) can be prevented by adding antioxidants, storing in airtight containers, flushing with nitrogen gas, or refrigeration.",
          },
        ],
      },
    },
  });

  await prisma.chapter.create({
    data: {
      subjectId: science.id,
      title: "Life Processes",
      order: 2,
      topics: {
        create: [
          {
            title: "Nutrition in Organisms",
            order: 1,
            summary:
              "Nutrition is the process of obtaining food for energy, growth, and repair. Autotrophic nutrition (plants)  - photosynthesis uses CO₂ + H₂O + sunlight → C₆H₁₂O₆ + O₂ in chloroplasts. Heterotrophic nutrition (animals, fungi)  - organisms depend on other organisms. In humans, digestion starts in the mouth (salivary amylase breaks starch), continues in the stomach (pepsin breaks proteins in HCl), and is completed in the small intestine where bile, pancreatic juice, and intestinal juice act. Absorption occurs through villi in the small intestine.",
          },
          {
            title: "Respiration and Transportation",
            order: 2,
            summary:
              "Respiration breaks down glucose to release energy. Aerobic respiration (with O₂): C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy (38 ATP). Anaerobic respiration (without O₂): produces ethanol + CO₂ in yeast, or lactic acid in muscles. In humans, the heart is a four -chambered pump. Oxygenated blood flows through arteries, deoxygenated through veins. Blood carries oxygen (via haemoglobin in RBCs), nutrients, hormones, and waste products. Plants transport water through xylem and food through phloem.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "The site of photosynthesis in a plant cell is:",
            optionA: "Mitochondria",
            optionB: "Chloroplast",
            optionC: "Ribosome",
            optionD: "Nucleus",
            correctAnswer: "B",
            explanation: "Photosynthesis occurs in the chloroplasts, which contain chlorophyll that absorbs sunlight for the process.",
          },
          {
            question: "How many chambers does the human heart have?",
            optionA: "Two",
            optionB: "Three",
            optionC: "Four",
            optionD: "Five",
            correctAnswer: "C",
            explanation: "The human heart has four chambers: two atria (upper) and two ventricles (lower), ensuring separation of oxygenated and deoxygenated blood.",
          },
          {
            question: "In anaerobic respiration in yeast, the products are:",
            optionA: "CO₂ and water",
            optionB: "Ethanol and CO₂",
            optionC: "Lactic acid and CO₂",
            optionD: "Ethanol and water",
            correctAnswer: "B",
            explanation: "In yeast, anaerobic respiration (fermentation) produces ethanol (alcohol) and carbon dioxide. This process is used in making bread and alcohol.",
          },
          {
            question: "Which tissue transports water in plants?",
            optionA: "Phloem",
            optionB: "Xylem",
            optionC: "Cambium",
            optionD: "Epidermis",
            correctAnswer: "B",
            explanation: "Xylem tissue transports water and dissolved minerals from roots to leaves. Phloem transports food (sucrose) from leaves to other parts.",
          },
          {
            question: "Villi are found in which part of the digestive system?",
            optionA: "Stomach",
            optionB: "Large intestine",
            optionC: "Small intestine",
            optionD: "Oesophagus",
            correctAnswer: "C",
            explanation: "Villi are finger -like projections in the inner lining of the small intestine that increase surface area for efficient absorption of digested food.",
          },
        ],
      },
    },
  });

  await prisma.chapter.create({
    data: {
      subjectId: science.id,
      title: "Electricity",
      order: 3,
      topics: {
        create: [
          {
            title: "Ohm's Law and Resistance",
            order: 1,
            summary:
              "Electric current is the flow of electric charge (electrons). Potential difference (voltage) drives the current through a conductor. Ohm's Law: V = IR (Voltage = Current × Resistance). Resistance (R) depends on length (longer = more resistance), cross -sectional area (thicker = less resistance), material, and temperature. Resistivity (ρ) is a material property  - metals have low resistivity (good conductors), rubber/glass have high resistivity (insulators). Resistors in series: R = R₁ + R₂. In parallel: 1/R = 1/R₁ + 1/R₂.",
          },
          {
            title: "Electric Power and Heating Effect",
            order: 2,
            summary:
              "Electric power is the rate of consuming energy. P = VI = I²R = V²/R. Unit: Watt (W). 1 kilowatt = 1000 W. Energy consumed is measured in kilowatt -hours (kWh)  - 1 kWh = 1 'unit' of electricity. Heating effect of current: when current flows through a resistor, electrical energy is converted to heat (Joule's Law: H = I²Rt). Applications include electric heaters, toasters, irons, and fuses. A fuse wire melts and breaks the circuit when current exceeds the safe limit.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "According to Ohm's Law, V = IR. If resistance doubles and voltage stays the same, current will:",
            optionA: "Double",
            optionB: "Halve",
            optionC: "Stay the same",
            optionD: "Quadruple",
            correctAnswer: "B",
            explanation: "From V = IR, if V is constant and R doubles, then I = V/R → current becomes half (inversely proportional to resistance).",
          },
          {
            question: "The SI unit of electric power is:",
            optionA: "Joule",
            optionB: "Ampere",
            optionC: "Watt",
            optionD: "Ohm",
            correctAnswer: "C",
            explanation: "The SI unit of electric power is the Watt (W), named after James Watt. Power = Voltage × Current (P = VI).",
          },
          {
            question: "Two resistors of 4Ω each are connected in parallel. The equivalent resistance is:",
            optionA: "8Ω",
            optionB: "4Ω",
            optionC: "2Ω",
            optionD: "1Ω",
            correctAnswer: "C",
            explanation: "For parallel resistors: 1/R = 1/4 + 1/4 = 2/4 = 1/2, so R = 2Ω. Parallel connection always gives less resistance than the smallest individual resistor.",
          },
          {
            question: "1 kilowatt -hour (kWh) is a unit of:",
            optionA: "Power",
            optionB: "Current",
            optionC: "Energy",
            optionD: "Resistance",
            correctAnswer: "C",
            explanation: "1 kWh (kilowatt -hour) is the commercial unit of electrical energy. It equals the energy consumed by a 1000W device running for 1 hour.",
          },
          {
            question: "A fuse wire should have:",
            optionA: "High melting point and high resistance",
            optionB: "Low melting point and high resistance",
            optionC: "High melting point and low resistance",
            optionD: "Low melting point and low resistance",
            correctAnswer: "B",
            explanation: "A fuse wire should have a low melting point (so it melts quickly) and high resistance (so it heats up easily when excess current flows).",
          },
        ],
      },
    },
  });

  // ═══════════════════════════════════════════
  //  CLASS 10  - MATHEMATICS
  // ═══════════════════════════════════════════

  const math = await prisma.subject.create({
    data: {
      class: 10,
      title: "Mathematics",
      icon: "📐",
      order: 6,
    },
  });

  await prisma.chapter.create({
    data: {
      subjectId: math.id,
      title: "Real Numbers",
      order: 1,
      topics: {
        create: [
          {
            title: "Euclid's Division Lemma and the Fundamental Theorem of Arithmetic",
            order: 1,
            summary:
              "Euclid's Division Lemma states: for any two positive integers a and b, there exist unique integers q and r such that a = bq + r (0 ≤ r < b). This is used to find HCF. The Fundamental Theorem of Arithmetic states: every composite number can be expressed as a product of primes uniquely (ignoring order). Example: 420 = 2 × 2 × 3 × 5 × 7. This theorem is used to find HCF (product of common prime factors with smallest powers) and LCM (product of all prime factors with highest powers). HCF × LCM = Product of two numbers.",
          },
          {
            title: "Irrational Numbers and Decimal Expansions",
            order: 2,
            summary:
              "An irrational number cannot be expressed as p/q where p, q are integers and q ≠ 0. Examples: √2, √3, √5, π. Proof that √2 is irrational uses contradiction: assume √2 = a/b (in lowest terms), then 2b² = a², so a is even, let a = 2c, then b is also even  - contradicting that a/b is in lowest terms. Decimal expansions: rational numbers have terminating or repeating decimals. A fraction p/q has terminating decimal if q = 2ⁿ × 5ᵐ (only prime factors 2 and 5).",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "HCF × LCM of two numbers equals:",
            optionA: "Sum of the two numbers",
            optionB: "Difference of the two numbers",
            optionC: "Product of the two numbers",
            optionD: "Square of the two numbers",
            correctAnswer: "C",
            explanation: "For any two positive integers a and b: HCF(a,b) × LCM(a,b) = a × b. This is a fundamental property used in number theory.",
          },
          {
            question: "Which of the following is irrational?",
            optionA: "0.333...",
            optionB: "√4",
            optionC: "√5",
            optionD: "22/7",
            correctAnswer: "C",
            explanation: "√5 is irrational because 5 is not a perfect square. 0.333... = 1/3 (rational), √4 = 2 (rational), 22/7 is rational (ratio of integers).",
          },
          {
            question: "The decimal expansion of 13/3125 is:",
            optionA: "Terminating",
            optionB: "Non -terminating repeating",
            optionC: "Non -terminating non -repeating",
            optionD: "Cannot be determined",
            correctAnswer: "A",
            explanation: "3125 = 5⁵. Since the denominator has only 5 as a prime factor, the decimal expansion is terminating. (13/3125 = 0.00416)",
          },
          {
            question: "Euclid's Division Lemma states: a = bq + r, where:",
            optionA: "0 < r < b",
            optionB: "0 ≤ r < b",
            optionC: "0 < r ≤ b",
            optionD: "0 ≤ r ≤ b",
            correctAnswer: "B",
            explanation: "In Euclid's Division Lemma, the remainder r satisfies 0 ≤ r < b (r can be zero but must be less than the divisor b).",
          },
          {
            question: "The Fundamental Theorem of Arithmetic is about:",
            optionA: "Every number is either prime or composite",
            optionB: "Every composite number has a unique prime factorisation",
            optionC: "There are infinitely many prime numbers",
            optionD: "Sum of two primes is always even",
            correctAnswer: "B",
            explanation: "The Fundamental Theorem of Arithmetic states that every composite number can be uniquely expressed as a product of prime numbers (apart from the order of factors).",
          },
        ],
      },
    },
  });

  await prisma.chapter.create({
    data: {
      subjectId: math.id,
      title: "Quadratic Equations",
      order: 2,
      topics: {
        create: [
          {
            title: "Solving Quadratic Equations",
            order: 1,
            summary:
              "A quadratic equation is of the form ax² + bx + c = 0 (a ≠ 0). Three methods to solve: (1) Factorisation  - split the middle term, e.g., x² + 5x + 6 = (x+2)(x+3) = 0 → x =  -2 or  -3. (2) Completing the square  - rewrite as (x + b/2a)² = (b² -4ac)/4a². (3) Quadratic formula: x = ( -b ± √(b² -4ac)) / 2a. The expression b²  - 4ac is called the discriminant (D). If D > 0: two distinct real roots. D = 0: two equal real roots. D < 0: no real roots.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "The discriminant of 2x²  - 4x + 3 = 0 is:",
            optionA: "4",
            optionB: " -8",
            optionC: "8",
            optionD: " -4",
            correctAnswer: "B",
            explanation: "D = b²  - 4ac = ( -4)²  - 4(2)(3) = 16  - 24 =  -8. Since D < 0, the equation has no real roots.",
          },
          {
            question: "If the discriminant is zero, the quadratic equation has:",
            optionA: "No real roots",
            optionB: "Two distinct real roots",
            optionC: "Two equal real roots",
            optionD: "Imaginary roots",
            correctAnswer: "C",
            explanation: "When D = 0, the quadratic formula gives x =  -b/2a (single value), meaning the equation has two equal (repeated) real roots.",
          },
          {
            question: "The roots of x²  - 5x + 6 = 0 are:",
            optionA: "2 and 3",
            optionB: " -2 and  -3",
            optionC: "1 and 6",
            optionD: " -1 and  -6",
            correctAnswer: "A",
            explanation: "x²  - 5x + 6 = (x -2)(x -3) = 0, so x = 2 or x = 3. We can verify: 2+3=5 (sum) and 2×3=6 (product).",
          },
          {
            question: "The quadratic formula is:",
            optionA: "x = ( -b ± √(b²+4ac)) / 2a",
            optionB: "x = ( -b ± √(b² -4ac)) / 2a",
            optionC: "x = (b ± √(b² -4ac)) / 2a",
            optionD: "x = ( -b ± √(4ac -b²)) / 2a",
            correctAnswer: "B",
            explanation: "The quadratic formula x = ( -b ± √(b² -4ac)) / 2a gives the roots of any quadratic equation ax² + bx + c = 0.",
          },
          {
            question: "Which is NOT a quadratic equation?",
            optionA: "x² + 3x  - 5 = 0",
            optionB: "2x²  - x = 0",
            optionC: "x³ + x² = 1",
            optionD: "3x² + 1 = 0",
            correctAnswer: "C",
            explanation: "x³ + x² = 1 is a cubic equation (degree 3), not quadratic. A quadratic equation has degree 2 (highest power of x is 2).",
          },
        ],
      },
    },
  });

  await prisma.chapter.create({
    data: {
      subjectId: math.id,
      title: "Statistics",
      order: 3,
      topics: {
        create: [
          {
            title: "Mean, Median, and Mode of Grouped Data",
            order: 1,
            summary:
              "For grouped data: Mean can be calculated by Direct method (Σfᵢxᵢ/Σfᵢ), Assumed Mean method, or Step Deviation method. Mode = l + [(f₁ -f₀)/(2f₁ -f₀ -f₂)] × h, where l = lower limit of modal class, f₁ = frequency of modal class, f₀ and f₂ = frequencies of preceding and succeeding classes, h = class size. Median = l + [(n/2 -cf)/f] × h, where cf = cumulative frequency of the class before the median class. The empirical relationship: 3 Median = Mode + 2 Mean.",
          },
        ],
      },
      mcqs: {
        create: [
          {
            question: "The empirical relationship between mean, median, and mode is:",
            optionA: "Mode = 3 Median  - 2 Mean",
            optionB: "Mode = 2 Median  - 3 Mean",
            optionC: "Mean = 3 Median  - 2 Mode",
            optionD: "Median = 3 Mode  - 2 Mean",
            correctAnswer: "A",
            explanation: "The empirical relationship is: Mode = 3 Median  - 2 Mean, or equivalently, 3 Median = Mode + 2 Mean.",
          },
          {
            question: "The modal class is the class interval with:",
            optionA: "Lowest frequency",
            optionB: "Highest frequency",
            optionC: "Middle frequency",
            optionD: "Cumulative frequency",
            correctAnswer: "B",
            explanation: "The modal class is the class interval with the highest frequency  - the mode lies within this class.",
          },
          {
            question: "For finding the median of grouped data, we need:",
            optionA: "Only frequencies",
            optionB: "Only class marks",
            optionC: "Cumulative frequencies",
            optionD: "Product of frequencies",
            correctAnswer: "C",
            explanation: "To find the median of grouped data, we need cumulative frequencies to locate the median class (where n/2th observation falls).",
          },
          {
            question: "The mean of first 5 natural numbers is:",
            optionA: "2",
            optionB: "2.5",
            optionC: "3",
            optionD: "3.5",
            correctAnswer: "C",
            explanation: "First 5 natural numbers: 1, 2, 3, 4, 5. Mean = (1+2+3+4+5)/5 = 15/5 = 3.",
          },
          {
            question: "In the formula for mode, 'l' represents:",
            optionA: "Length of the class",
            optionB: "Lower limit of the modal class",
            optionC: "Upper limit of the modal class",
            optionD: "Lower limit of the median class",
            correctAnswer: "B",
            explanation: "In the mode formula, 'l' represents the lower limit of the modal class (the class with the highest frequency).",
          },
        ],
      },
    },
  });

  console.log("✅ Seed complete!");
  console.log("   📜 History: 3 chapters");
  console.log("   🌍 Geography: 3 chapters");
  console.log("   ⚖️  Political Science: 3 chapters");
  console.log("   💰 Economics: 3 chapters");
  console.log("   🔬 Science: 3 chapters");
  console.log("   📐 Mathematics: 3 chapters");
  console.log("   Total: 18 chapters with topics and MCQs");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
