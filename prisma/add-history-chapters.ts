import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("📜 Adding missing History chapters (Ch4 & Ch5)...");

  // Find the existing History subject for Class 10
  const history = await prisma.subject.findFirst({
    where: { class: 10, title: "History" },
  });

  if (!history) {
    console.error("❌ History subject not found for Class 10. Run the full seed first.");
    return;
  }

  console.log(`   Found History subject: ${history.id}`);

  // Check if chapters already exist to avoid duplicates
  const existingCh4 = await prisma.chapter.findFirst({
    where: { subjectId: history.id, title: "The Age of Industrialisation" },
  });
  const existingCh5 = await prisma.chapter.findFirst({
    where: { subjectId: history.id, title: "Print Culture and the Modern World" },
  });

  // ── Chapter 4: The Age of Industrialisation ──
  if (existingCh4) {
    console.log("   ⏭️  Chapter 4 (The Age of Industrialisation) already exists, skipping.");
  } else {
    await prisma.chapter.create({
      data: {
        subjectId: history.id,
        title: "The Age of Industrialisation",
        order: 4,
        topics: {
          create: [
            {
              title: "Before the Industrial Revolution - Proto-industrialisation",
              order: 1,
              summary:
                "Even before factories appeared in England and Europe, there was large-scale industrial production for international markets. This was not based on factories but on a decentralised network of commercial exchanges controlled by merchants. In the 17th and 18th centuries, merchants moved to the countryside and offered advances to peasant households to produce goods for them. This system, known as proto-industrialisation, was a precursor to the factory system. It allowed peasants to remain in the countryside and earn supplementary income through spinning and weaving while continuing to tend their small plots.",
            },
            {
              title: "The Coming Up of the Factory",
              order: 2,
              summary:
                "The earliest factories in England came up in the 1730s. By the late 18th century, factories multiplied rapidly. In 1760, Richard Arkwright created the cotton mill, and the factory system began to take shape. The cotton mill brought all textile manufacturing processes together under one roof and under the supervision of a manager. Steam engines, developed by James Watt, powered these factories and enabled mass production. Cotton was the leading sector in the first phase of industrialisation up to the 1840s. After that, iron and steel industries took the lead as railways expanded.",
            },
            {
              title: "Hand Labour and Steam Power",
              order: 3,
              summary:
                "In Victorian Britain, there was no shortage of human labour. Industrialists did not always prefer machines over hand labour. Where labour was cheap and plentiful, there was no incentive to invest in expensive machinery. In many industries like bookbinding, furniture-making, and production of items for the upper classes, hand labour was preferred because goods required intricate designs and hand-finishing. The introduction of the Spinning Jenny in the woollen industry was fiercely opposed by workers who feared unemployment. Only when wages rose did manufacturers turn to machines in large numbers.",
            },
            {
              title: "Industrialisation in the Colonies - Indian Textiles",
              order: 4,
              summary:
                "Before the age of machine industries, silk and cotton goods from India dominated international trade. India was known for fine quality textiles like muslin (from Dhaka), chintz, calico, and jamdani. Armenian and Persian merchants took these goods overland to Afghanistan, Persia, and Central Asia. By the 1750s, Indian textile exports began to decline. The British imposed import duties on Indian textiles and the East India Company started exporting raw cotton and indigo from India to feed British factories. Indian weavers were forced to sell at prices dictated by the Company, destroying the Indian handloom industry.",
            },
            {
              title: "Factories Come Up in India - Early Entrepreneurs",
              order: 5,
              summary:
                "The first cotton mill in Bombay (Mumbai) was set up in 1854 and the first jute mill in Bengal in 1855. The first cotton mill in Ahmedabad was established in 1861. Early Indian industrialists like Dwarkanath Tagore, Jamsetjee Nusserwanjee Tata, Seth Hukumchand, and Dinshaw Petit played a pioneering role in setting up industries. Most Indian merchants had earned their capital through trade with China (opium, tea) and by acting as agents for European firms. Workers came from nearby villages, often recruited through a jobber who was an old, trusted worker.",
            },
            {
              title: "Market for Goods - Advertisements and the Swadeshi Movement",
              order: 6,
              summary:
                "To sell their products, manufacturers used advertisements extensively. British manufacturers used labels on cloth bundles featuring Indian gods and goddesses, temples, and important personalities to make the products appear familiar to Indian buyers. When Indian manufacturers began selling textiles in the domestic market, they adopted the same strategy - using nationalist symbols like 'Made in India' labels. The Swadeshi Movement (1905-08) gave a great stimulus to Indian industries by encouraging the boycott of British goods and promotion of Indian-made products.",
            },
          ],
        },
        mcqs: {
          create: [
            {
              question: "What is proto-industrialisation?",
              optionA: "Factory-based production using steam engines",
              optionB: "Large-scale industrial production for international markets before factories",
              optionC: "Computer-based manufacturing in modern times",
              optionD: "Government-run cottage industries",
              correctAnswer: "B",
              explanation: "Proto-industrialisation refers to the large-scale industrial production for international markets that existed before the factory system. It was based on a decentralised network controlled by merchants who gave advances to peasants in the countryside.",
            },
            {
              question: "Who created the cotton mill in 1760?",
              optionA: "James Watt",
              optionB: "Richard Arkwright",
              optionC: "Edmund Cartwright",
              optionD: "Samuel Crompton",
              correctAnswer: "B",
              explanation: "Richard Arkwright created the cotton mill in 1760. His invention brought all textile manufacturing processes together under one roof with supervision by a manager, marking the beginning of the factory system.",
            },
            {
              question: "Which was the leading sector in the first phase of industrialisation in Britain?",
              optionA: "Iron and steel",
              optionB: "Chemicals",
              optionC: "Cotton",
              optionD: "Coal mining",
              correctAnswer: "C",
              explanation: "Cotton was the leading sector in the first phase of industrialisation up to the 1840s. After that, the iron and steel industry led the way as railways expanded across the country.",
            },
            {
              question: "Why did Victorian industrialists prefer hand labour over machines in many industries?",
              optionA: "Machines were banned by the government",
              optionB: "Human labour was cheap and plentiful",
              optionC: "There was no electricity available",
              optionD: "Workers refused to operate machines",
              correctAnswer: "B",
              explanation: "In Victorian Britain, there was no shortage of human labour. Where labour was cheap and plentiful, industrialists had no incentive to invest in expensive machinery, especially for goods requiring intricate designs and hand-finishing.",
            },
            {
              question: "What were fine cotton textiles from Dhaka called?",
              optionA: "Chintz",
              optionB: "Calico",
              optionC: "Muslin",
              optionD: "Taffeta",
              correctAnswer: "C",
              explanation: "Muslin was the term used for fine cotton textiles woven in Dhaka (Dacca). It was highly valued in international markets for its exceptional quality and fine texture.",
            },
            {
              question: "When was the first cotton mill set up in Bombay?",
              optionA: "1834",
              optionB: "1844",
              optionC: "1854",
              optionD: "1864",
              correctAnswer: "C",
              explanation: "The first cotton mill in Bombay (now Mumbai) was set up in 1854, marking the beginning of the modern factory system in India.",
            },
            {
              question: "Who among the following was NOT an early Indian industrialist?",
              optionA: "Dwarkanath Tagore",
              optionB: "Jamsetjee Nusserwanjee Tata",
              optionC: "Robert Clive",
              optionD: "Dinshaw Petit",
              correctAnswer: "C",
              explanation: "Robert Clive was a British colonial administrator, not an Indian industrialist. Dwarkanath Tagore, J.N. Tata, and Dinshaw Petit were pioneering Indian industrialists.",
            },
            {
              question: "Which movement gave a great stimulus to Indian industries in the early 20th century?",
              optionA: "Non-Cooperation Movement",
              optionB: "Civil Disobedience Movement",
              optionC: "Swadeshi Movement",
              optionD: "Quit India Movement",
              correctAnswer: "C",
              explanation: "The Swadeshi Movement (1905-08) encouraged the use of Indian-made goods and boycott of British goods, giving a major boost to Indian industrial production.",
            },
            {
              question: "What happened to Indian textile exports after the 1750s?",
              optionA: "They increased rapidly",
              optionB: "They began to decline",
              optionC: "They remained the same",
              optionD: "They shifted to silk only",
              correctAnswer: "B",
              explanation: "After the 1750s, Indian textile exports began to decline as the British imposed import duties on Indian textiles and promoted raw material exports from India to feed British factories.",
            },
            {
              question: "The first jute mill in Bengal was set up in which year?",
              optionA: "1845",
              optionB: "1855",
              optionC: "1865",
              optionD: "1875",
              correctAnswer: "B",
              explanation: "The first jute mill in Bengal was established in 1855. Bengal became the centre of the jute industry in India due to the availability of raw jute in the region.",
            },
          ],
        },
      },
    });
    console.log("   ✅ Chapter 4: The Age of Industrialisation - added (6 topics, 10 MCQs)");
  }

  // ── Chapter 5: Print Culture and the Modern World ──
  if (existingCh5) {
    console.log("   ⏭️  Chapter 5 (Print Culture and the Modern World) already exists, skipping.");
  } else {
    await prisma.chapter.create({
      data: {
        subjectId: history.id,
        title: "Print Culture and the Modern World",
        order: 5,
        topics: {
          create: [
            {
              title: "The First Printed Books - China, Japan and Korea",
              order: 1,
              summary:
                "The earliest kind of print technology was developed in China, Japan and Korea. From 594 AD onwards, books in China were printed by rubbing paper against the inked surface of woodblocks. China was already a major producer of printed material - the imperial bureaucratic system recruited personnel through civil service examinations, and textbooks were printed in vast numbers. The Chinese accordion book (folded and stitched at the side) was the traditional format. In Japan, Buddhist missionaries from China introduced hand-printing technology around 768-770 AD. The oldest Japanese book printed in 868 AD was the Buddhist Diamond Sutra.",
            },
            {
              title: "Print Comes to Europe - Gutenberg and the Print Revolution",
              order: 2,
              summary:
                "In 1295, Marco Polo brought the knowledge of woodblock printing from China to Italy. Johann Gutenberg of Strasbourg, Germany, developed the first known printing press using moveable metal type in the 1430s. The first book he printed was the Bible - about 180 copies were produced, and it took three years to print them. By 1550, printing presses were set up in most European countries. The shift from hand printing to mechanical printing led to the 'print revolution.' Books became cheaper, produced in greater numbers, and flooded the market. Ideas could now spread rapidly and reach a much wider audience.",
            },
            {
              title: "The Reading Mania and Print Culture in Europe",
              order: 3,
              summary:
                "Through the 17th and 18th centuries, literacy rates rose across Europe. Churches set up charity schools for the poor. By the end of the 18th century, literacy was common in many parts of Europe. A new reading culture developed - people now had access to books, newspapers, periodicals, and almanacs. Printers published popular ballads, folk tales, and romances with attractive illustrations. In France, cheap small books called 'Bibliotheque Bleue' (printed on cheap paper, bound in blue covers) were sold by peddlers. The ideas of scientists like Isaac Newton and thinkers like Voltaire, Rousseau, and Thomas Paine circulated widely through print.",
            },
            {
              title: "Print Comes to India",
              order: 4,
              summary:
                "India had a very old tradition of handwritten manuscripts in Sanskrit, Arabic, Persian, and various vernacular languages, copied on palm leaves or handmade paper. Manuscripts were expensive, fragile, and difficult to read as the script was written in different styles. The printing press first came to Goa with Portuguese missionaries in the mid-16th century. Catholic priests printed the first Tamil book (Tampiran Vanakkam) in 1579 at Cochin. By 1710, Dutch Protestant missionaries had printed 32 Tamil texts. From 1780, James Augustus Hickey began editing the Bengal Gazette, the first newspaper in India.",
            },
            {
              title: "Religious Reform and Public Debates through Print",
              order: 5,
              summary:
                "Print created the possibility of wide circulation of ideas and introduced a new world of debate and discussion. In the 19th century, intense debates on social and religious issues took place in India through printed tracts and newspapers. Raja Rammohun Roy published the Sambad Kaumudi from 1821 to campaign against the practice of sati and promote widow remarriage. The orthodox Hindus countered by publishing Samachar Chandrika. Muslim reformers like Mumtaz Ali reinterpreted the Quran to argue for women's education. Print allowed women, lower castes, and factory workers to have their voices heard in public debates for the first time.",
            },
            {
              title: "Print and Censorship - The Vernacular Press Act 1878",
              order: 6,
              summary:
                "Before 1798, the colonial government was not very concerned about what Indians read in print. But after the Revolt of 1857, attitudes changed and the government tightened control over the press. In 1878, the Vernacular Press Act was passed by Lord Lytton, modelled on the Irish Press Laws. This gave the government wide powers to censor reports and editorials in the vernacular (Indian language) press. If a newspaper published anything considered 'seditious,' the press could be seized and its machinery confiscated. Despite this, nationalist newspapers grew - Bal Gangadhar Tilak's Kesari and Gandhi's Harijan, Indian Opinion, and Young India played key roles in spreading nationalist ideas.",
            },
          ],
        },
        mcqs: {
          create: [
            {
              question: "The earliest kind of print technology was developed in:",
              optionA: "Europe",
              optionB: "America",
              optionC: "China, Japan and Korea",
              optionD: "India",
              correctAnswer: "C",
              explanation: "The earliest print technology (woodblock printing) was developed in China, Japan and Korea. From 594 AD, books in China were printed by rubbing paper against the inked surface of woodblocks.",
            },
            {
              question: "Who developed the first known printing press with moveable type?",
              optionA: "Marco Polo",
              optionB: "Johann Gutenberg",
              optionC: "James Watt",
              optionD: "William Caxton",
              correctAnswer: "B",
              explanation: "Johann Gutenberg of Strasbourg, Germany, developed the first known printing press using moveable metal type in the 1430s. The first book he printed was the Bible.",
            },
            {
              question: "The first book printed by Gutenberg was:",
              optionA: "The Quran",
              optionB: "The Bible",
              optionC: "The Iliad",
              optionD: "The Canterbury Tales",
              correctAnswer: "B",
              explanation: "The first book that Gutenberg printed was the Bible. About 180 copies were produced, and it took three years to print them.",
            },
            {
              question: "Who started the first Indian newspaper - Bengal Gazette?",
              optionA: "Raja Rammohun Roy",
              optionB: "James Augustus Hickey",
              optionC: "Lord Lytton",
              optionD: "Bal Gangadhar Tilak",
              correctAnswer: "B",
              explanation: "James Augustus Hickey began editing the Bengal Gazette, a weekly magazine, from 1780. It was the first newspaper published in India.",
            },
            {
              question: "The Vernacular Press Act was passed in which year?",
              optionA: "1857",
              optionB: "1867",
              optionC: "1878",
              optionD: "1885",
              correctAnswer: "C",
              explanation: "The Vernacular Press Act was passed in 1878 by Lord Lytton. It was modelled on the Irish Press Laws and gave the government extensive rights to censor reports in the vernacular (Indian language) press.",
            },
            {
              question: "Who published the Sambad Kaumudi?",
              optionA: "Bal Gangadhar Tilak",
              optionB: "Raja Rammohun Roy",
              optionC: "Ishwar Chandra Vidyasagar",
              optionD: "Dayanand Saraswati",
              correctAnswer: "B",
              explanation: "Raja Rammohun Roy published the Sambad Kaumudi from 1821. He used it to campaign against the practice of sati and promote social reform including widow remarriage.",
            },
            {
              question: "The printing press first came to India with:",
              optionA: "The British",
              optionB: "The French",
              optionC: "Portuguese missionaries",
              optionD: "Dutch traders",
              correctAnswer: "C",
              explanation: "The printing press first came to Goa with Portuguese missionaries in the mid-16th century. Jesuit priests learnt the local language Konkani and printed several tracts.",
            },
            {
              question: "Which newspaper was edited by Bal Gangadhar Tilak?",
              optionA: "Bengal Gazette",
              optionB: "Sambad Kaumudi",
              optionC: "Kesari",
              optionD: "Harijan",
              correctAnswer: "C",
              explanation: "Bal Gangadhar Tilak edited the Kesari, a Marathi newspaper that became a powerful vehicle for spreading nationalist ideas and criticising British colonial rule.",
            },
            {
              question: "What were cheap small books sold by peddlers in France called?",
              optionA: "Penny Dreadfuls",
              optionB: "Bibliotheque Bleue",
              optionC: "Chapbooks",
              optionD: "Broadsheets",
              correctAnswer: "B",
              explanation: "Bibliotheque Bleue were cheap small books printed on low-quality paper and bound in blue covers, sold by travelling peddlers (called chapmen) across towns and villages in France.",
            },
            {
              question: "The first Tamil book was printed in which year?",
              optionA: "1556",
              optionB: "1579",
              optionC: "1612",
              optionD: "1710",
              correctAnswer: "B",
              explanation: "Catholic priests printed the first Tamil book (Tampiran Vanakkam) in 1579 at Cochin. This was one of the earliest books printed in an Indian language.",
            },
          ],
        },
      },
    });
    console.log("   ✅ Chapter 5: Print Culture and the Modern World - added (6 topics, 10 MCQs)");
  }

  console.log("\n🎉 Done! History now has all 5 CBSE chapters.");
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
