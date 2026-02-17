import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("📜 Expanding History chapters 1-3 (adding 4 topics + 5 MCQs each)...\n");

  // Find the existing History subject for Class 10
  const history = await prisma.subject.findFirst({
    where: { class: 10, title: "History" },
  });

  if (!history) {
    console.error("❌ History subject not found for Class 10.");
    return;
  }

  // ═══════════════════════════════════════════════════════
  // Chapter 1: The Rise of Nationalism in Europe
  // Existing: 2 topics (orders 1-2), 5 MCQs
  // Adding: 4 topics (orders 3-6), 5 MCQs
  // ═══════════════════════════════════════════════════════
  const ch1 = await prisma.chapter.findFirst({
    where: { subjectId: history.id, title: "The Rise of Nationalism in Europe" },
    include: { _count: { select: { topics: true, mcqs: true } } },
  });

  if (!ch1) {
    console.error("❌ Chapter 1 not found.");
  } else {
    console.log(`   Ch1: "${ch1.title}" - currently ${ch1._count.topics} topics, ${ch1._count.mcqs} MCQs`);

    // Add 4 new topics
    await prisma.topic.createMany({
      data: [
        {
          chapterId: ch1.id,
          title: "Napoleon's Reforms and the Civil Code of 1804",
          order: 3,
          summary:
            "Napoleon Bonaparte conquered large parts of Europe and introduced many reforms. The Civil Code of 1804, also known as the Napoleonic Code, did away with all privileges based on birth, established equality before the law, and secured the right to property. Administrative reforms included simplification of divisions, abolition of the feudal system, and freeing peasants from serfdom and manorial dues. However, Napoleon's rule was seen as political domination by the conquered peoples. Increased taxation, censorship, and forced conscription into the French armies outweighed the advantages of these reforms.",
        },
        {
          chapterId: ch1.id,
          title: "The Treaty of Vienna and New Conservatism after 1815",
          order: 4,
          summary:
            "After Napoleon's defeat in 1815, European governments driven by conservatism met at the Congress of Vienna. The Treaty was drawn up by Austrian Chancellor Duke Metternich. The goal was to undo the changes brought by Napoleon and restore the monarchies that had been overthrown. France lost the territories it had annexed under Napoleon. A series of states were set up on the boundaries of France to prevent future expansion. Conservative regimes were autocratic and did not tolerate criticism or dissent. They imposed censorship laws to control newspapers, books, plays, and songs that reflected liberal ideas.",
        },
        {
          chapterId: ch1.id,
          title: "The Unification of Germany and Italy",
          order: 5,
          summary:
            "Germany was unified by Otto von Bismarck, the Chief Minister of Prussia, through a policy of 'blood and iron' - three wars over seven years (with Austria, Denmark, and France) ended in Prussian victory and German unification in 1871. Kaiser William I was proclaimed German Emperor at Versailles. Italy's unification involved three key figures: Giuseppe Mazzini (founded Young Italy, inspired revolutionary ideals), Count Cavour (Chief Minister of Sardinia-Piedmont, led diplomatic efforts), and Giuseppe Garibaldi (led the famous Expedition of the Thousand to liberate southern Italy). In 1861, Victor Emmanuel II was declared King of united Italy.",
        },
        {
          chapterId: ch1.id,
          title: "Visualising the Nation and Nationalism and Imperialism",
          order: 6,
          summary:
            "Nations were often portrayed as female figures or allegories. In France, she was called Marianne - her images were displayed on coins, stamps, and statues. She symbolised liberty, republic, and reason. In Germany, the allegory was Germania, shown wearing a crown of oak leaves (representing heroism). By the late 19th century, nationalism moved away from its liberal democratic ideals. It became aligned with imperialism. The most serious consequence was in the Balkans, where the spread of nationalist tensions among Slavic peoples and rivalry between major European powers eventually led to the First World War in 1914.",
        },
      ],
    });

    // Add 5 new MCQs
    await prisma.mCQ.createMany({
      data: [
        {
          chapterId: ch1.id,
          question: "The Civil Code of 1804 is also known as:",
          optionA: "Code of Metternich",
          optionB: "Napoleonic Code",
          optionC: "Code of Bismarck",
          optionD: "Code of Vienna",
          correctAnswer: "B",
          explanation: "The Civil Code of 1804 is also known as the Napoleonic Code. It established equality before the law, secured property rights, and abolished privileges based on birth.",
        },
        {
          chapterId: ch1.id,
          question: "The female allegory of the French nation was known as:",
          optionA: "Germania",
          optionB: "Britannia",
          optionC: "Marianne",
          optionD: "Columbia",
          correctAnswer: "C",
          explanation: "Marianne was the female allegory of the French nation, symbolising liberty, republic, and reason. Her images were displayed on coins, stamps, and public statues across France.",
        },
        {
          chapterId: ch1.id,
          question: "In which year was the German Empire proclaimed?",
          optionA: "1861",
          optionB: "1866",
          optionC: "1871",
          optionD: "1875",
          correctAnswer: "C",
          explanation: "The German Empire was proclaimed in January 1871 at the Palace of Versailles after Prussia's victory in the Franco-Prussian War. Kaiser William I was declared the German Emperor.",
        },
        {
          chapterId: ch1.id,
          question: "The Greek struggle for independence began in which year?",
          optionA: "1815",
          optionB: "1821",
          optionC: "1830",
          optionD: "1848",
          correctAnswer: "B",
          explanation: "The Greek War of Independence began in 1821. Greece had been part of the Ottoman Empire since the 15th century. The Treaty of Constantinople in 1832 recognised Greece as an independent nation.",
        },
        {
          chapterId: ch1.id,
          question: "Which region's nationalist tensions eventually led to the First World War?",
          optionA: "Scandinavia",
          optionB: "Iberian Peninsula",
          optionC: "The Balkans",
          optionD: "The Alps",
          correctAnswer: "C",
          explanation: "The Balkans became a region of intense nationalist conflict. Slavic peoples' desire for independence and rivalry between major European powers over Balkan territories eventually contributed to the outbreak of World War I in 1914.",
        },
      ],
    });

    console.log("   ✅ Ch1: Added 4 topics (now 6 total) + 5 MCQs (now 10 total)\n");
  }

  // ═══════════════════════════════════════════════════════
  // Chapter 2: Nationalism in India
  // Existing: 2 topics (orders 1-2), 5 MCQs
  // Adding: 4 topics (orders 3-6), 5 MCQs
  // ═══════════════════════════════════════════════════════
  const ch2 = await prisma.chapter.findFirst({
    where: { subjectId: history.id, title: "Nationalism in India" },
    include: { _count: { select: { topics: true, mcqs: true } } },
  });

  if (!ch2) {
    console.error("❌ Chapter 2 not found.");
  } else {
    console.log(`   Ch2: "${ch2.title}" - currently ${ch2._count.topics} topics, ${ch2._count.mcqs} MCQs`);

    // Add 4 new topics
    await prisma.topic.createMany({
      data: [
        {
          chapterId: ch2.id,
          title: "Mahatma Gandhi and the Idea of Satyagraha",
          order: 3,
          summary:
            "Mahatma Gandhi returned to India from South Africa in January 1915, where he had successfully fought against racist discrimination through a novel method of mass agitation called Satyagraha. Satyagraha means 'the power of truth' - it emphasised truth and non-violence. Gandhi believed that if the cause was true and the struggle was against injustice, physical force was not necessary. In India, he organised satyagraha movements at Champaran (1917) against the oppressive indigo plantation system, at Kheda (1917) for crop failure relief, and at Ahmedabad (1918) for cotton mill workers' wages.",
        },
        {
          chapterId: ch2.id,
          title: "The Rowlatt Act and the Jallianwala Bagh Massacre",
          order: 4,
          summary:
            "In 1919, the British government passed the Rowlatt Act, which gave enormous powers to the police to arrest and detain people without trial. Mahatma Gandhi called for a nationwide hartal (strike) on 6 April 1919 to oppose the Act. On 13 April 1919, a large crowd had gathered at Jallianwala Bagh in Amritsar. General Dyer ordered his troops to fire on the unarmed gathering without warning, killing hundreds. The Jallianwala Bagh massacre shocked the entire nation and turned millions of Indians against British rule. Rabindranath Tagore renounced his knighthood in protest.",
        },
        {
          chapterId: ch2.id,
          title: "Differing Strands within the Movement",
          order: 5,
          summary:
            "The Non-Cooperation-Khilafat Movement drew different social groups into the national struggle, each with their own interpretation of Swaraj. In the countryside of Awadh, peasants led by Baba Ramchandra protested against talukdars and landlords who demanded high rents and begar (forced labour). In the Gudem Hills of Andhra Pradesh, a tribal leader Alluri Sitaram Raju led a militant guerrilla movement against colonial forest policies. The plantation workers in Assam left their plantations and headed home, as they understood Swaraj as freedom to move freely. Each group had a different vision of what independence meant.",
        },
        {
          chapterId: ch2.id,
          title: "The Sense of Collective Belonging",
          order: 6,
          summary:
            "The feeling of nationalism was built through a variety of cultural processes. Bankim Chandra Chattopadhyay wrote 'Vande Mataram' in the 1870s as a hymn to the motherland, which became a powerful nationalist song. Rabindranath Tagore wrote 'Amar Sonar Bangla' and contributed to the national spirit. The idea of India as 'Bharat Mata' became popular - Abanindranath Tagore painted a famous image of Bharat Mata as an ascetic figure. Symbols like the tricolour flag (with spinning wheel), folk songs, and reinterpretation of Indian history all helped unite people with a sense of collective identity and shared belonging.",
        },
      ],
    });

    // Add 5 new MCQs
    await prisma.mCQ.createMany({
      data: [
        {
          chapterId: ch2.id,
          question: "Mahatma Gandhi's first successful satyagraha in India was at:",
          optionA: "Kheda, Gujarat",
          optionB: "Champaran, Bihar",
          optionC: "Ahmedabad, Gujarat",
          optionD: "Dandi, Gujarat",
          correctAnswer: "B",
          explanation: "Gandhi's first successful satyagraha in India was at Champaran, Bihar in 1917, where he fought against the oppressive indigo plantation system that forced peasants to grow indigo.",
        },
        {
          chapterId: ch2.id,
          question: "The Rowlatt Act was passed in which year?",
          optionA: "1917",
          optionB: "1918",
          optionC: "1919",
          optionD: "1920",
          correctAnswer: "C",
          explanation: "The Rowlatt Act was passed in 1919 by the Imperial Legislative Council. It gave the British government enormous powers to repress political activities and allowed detention of political prisoners without trial.",
        },
        {
          chapterId: ch2.id,
          question: "The Jallianwala Bagh massacre took place on:",
          optionA: "6 April 1919",
          optionB: "13 April 1919",
          optionC: "30 January 1920",
          optionD: "5 February 1922",
          correctAnswer: "B",
          explanation: "The Jallianwala Bagh massacre occurred on 13 April 1919, when General Dyer ordered troops to fire on a peaceful gathering in Amritsar, killing hundreds of unarmed civilians.",
        },
        {
          chapterId: ch2.id,
          question: "Who wrote 'Vande Mataram'?",
          optionA: "Rabindranath Tagore",
          optionB: "Bankim Chandra Chattopadhyay",
          optionC: "Mahatma Gandhi",
          optionD: "Abanindranath Tagore",
          correctAnswer: "B",
          explanation: "Bankim Chandra Chattopadhyay wrote 'Vande Mataram' in the 1870s as a hymn to the motherland. It was included in his novel 'Anandamath' and became a widely sung national song during the freedom movement.",
        },
        {
          chapterId: ch2.id,
          question: "In the Gudem Hills of Andhra Pradesh, who led a militant guerrilla movement?",
          optionA: "Baba Ramchandra",
          optionB: "Venkata Raju",
          optionC: "Alluri Sitaram Raju",
          optionD: "Motilal Nehru",
          correctAnswer: "C",
          explanation: "Alluri Sitaram Raju led a militant guerrilla movement in the Gudem Hills of Andhra Pradesh. He claimed to have special powers, persuaded people to give up drinking, and led armed raids on police stations.",
        },
      ],
    });

    console.log("   ✅ Ch2: Added 4 topics (now 6 total) + 5 MCQs (now 10 total)\n");
  }

  // ═══════════════════════════════════════════════════════
  // Chapter 3: The Making of a Global World
  // Existing: 2 topics (orders 1-2), 5 MCQs
  // Adding: 4 topics (orders 3-6), 5 MCQs
  // ═══════════════════════════════════════════════════════
  const ch3 = await prisma.chapter.findFirst({
    where: { subjectId: history.id, title: "The Making of a Global World" },
    include: { _count: { select: { topics: true, mcqs: true } } },
  });

  if (!ch3) {
    console.error("❌ Chapter 3 not found.");
  } else {
    console.log(`   Ch3: "${ch3.title}" - currently ${ch3._count.topics} topics, ${ch3._count.mcqs} MCQs`);

    // Add 4 new topics
    await prisma.topic.createMany({
      data: [
        {
          chapterId: ch3.id,
          title: "Conquest, Disease and Trade in the Early Modern World",
          order: 3,
          summary:
            "In the 16th century, European conquest of the Americas was driven not just by superior weapons but also by germs. The Americas had been cut off from the rest of the world for millions of years, so the people had no immunity to diseases like smallpox, measles, and other infections that came from Europe. These diseases spread deep into the continent, even before the Europeans physically arrived, killing entire communities. The Portuguese and Spanish conquest and colonisation of America was decisively aided by the germs they carried. The resulting decimation of the native population transformed the Americas.",
        },
        {
          chapterId: ch3.id,
          title: "Rinderpest and the Scramble for Africa",
          order: 4,
          summary:
            "Africa had abundant land and relatively small populations. Europeans were attracted to its vast resources of land and minerals. In the 1890s, a cattle disease called Rinderpest spread like wildfire across Africa, killing 90% of cattle in some regions. The loss of cattle destroyed African livelihoods. Colonial powers used this crisis to force Africans into the labour market - people who had lost their cattle had no choice but to work in mines and plantations. Europeans also controlled what scarce cattle resources remained. Rinderpest effectively helped Europeans conquer and colonise Africa by destroying the local economy.",
        },
        {
          chapterId: ch3.id,
          title: "The Inter-War Economy and the Great Depression",
          order: 5,
          summary:
            "After World War I, the global economy was fragile. The USA had emerged as the dominant economic power. American companies and banks invested heavily in Europe's post-war recovery. However, in 1929, the US stock market crashed, triggering the Great Depression. Banks failed, factories closed, and unemployment soared across the world. By 1935, most industrial countries' output had halved. The US tried to recover through the 'New Deal' but the Depression lasted until World War II. In India, agricultural prices crashed - wheat prices fell by 50% - pushing peasants deeper into debt. The depression exposed the vulnerability of a globally connected economy.",
        },
        {
          chapterId: ch3.id,
          title: "Bretton Woods and the Post-War International Economic Order",
          order: 6,
          summary:
            "The post-World War II international economic order was shaped at the Bretton Woods Conference in New Hampshire, USA, in July 1944. The conference established the International Monetary Fund (IMF) to deal with external surpluses and deficits of member nations, and the International Bank for Reconstruction and Development (World Bank) to finance post-war reconstruction. The Bretton Woods system was based on fixed exchange rates linked to the US dollar. This system inaugurated an era of unprecedented economic growth and trade. Most developing nations did not benefit initially, leading to demands for a New International Economic Order (NIEO) in the 1970s.",
        },
      ],
    });

    // Add 5 new MCQs
    await prisma.mCQ.createMany({
      data: [
        {
          chapterId: ch3.id,
          question: "What was Rinderpest?",
          optionA: "A tropical plant disease",
          optionB: "A cattle disease that devastated African livelihoods",
          optionC: "A human epidemic in Europe",
          optionD: "A type of colonial tax",
          correctAnswer: "B",
          explanation: "Rinderpest was a fast-spreading cattle plague that arrived in Africa in the 1890s, killing 90% of cattle in some regions. It destroyed African livelihoods and helped European colonisers gain control over the continent.",
        },
        {
          chapterId: ch3.id,
          question: "The Bretton Woods Conference was held in which year?",
          optionA: "1939",
          optionB: "1944",
          optionC: "1947",
          optionD: "1950",
          correctAnswer: "B",
          explanation: "The Bretton Woods Conference was held in July 1944 in New Hampshire, USA. It established the IMF and the World Bank to manage the post-war international economic system.",
        },
        {
          chapterId: ch3.id,
          question: "Which of the following was established at Bretton Woods?",
          optionA: "United Nations and NATO",
          optionB: "IMF and World Bank",
          optionC: "WTO and GATT",
          optionD: "League of Nations and ILO",
          correctAnswer: "B",
          explanation: "The Bretton Woods Conference established the International Monetary Fund (IMF) and the International Bank for Reconstruction and Development (World Bank) to manage the post-war global economy.",
        },
        {
          chapterId: ch3.id,
          question: "Why did Europeans easily conquer the Americas?",
          optionA: "Superior military technology only",
          optionB: "Americans willingly surrendered",
          optionC: "Germs like smallpox killed millions of native people who had no immunity",
          optionD: "The Americas had no population",
          correctAnswer: "C",
          explanation: "European conquest of the Americas was aided decisively by germs like smallpox and measles. The native populations had been cut off from the rest of the world and had no immunity to these diseases, which killed millions.",
        },
        {
          chapterId: ch3.id,
          question: "Who introduced the assembly line method of mass production?",
          optionA: "Thomas Edison",
          optionB: "Henry Ford",
          optionC: "Andrew Carnegie",
          optionD: "John D. Rockefeller",
          correctAnswer: "B",
          explanation: "Henry Ford adopted the assembly line method for manufacturing automobiles in his Detroit factory. This dramatically reduced production time and cost, making the Model T car affordable for many American workers.",
        },
      ],
    });

    console.log("   ✅ Ch3: Added 4 topics (now 6 total) + 5 MCQs (now 10 total)\n");
  }

  console.log("🎉 Done! All 5 History chapters now have 6 topics and 10 MCQs each.");
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
