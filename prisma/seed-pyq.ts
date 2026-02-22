import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Sample PYQ data mapped by topic title (partial match)
// This covers key topics across subjects for Class 10
const PYQ_DATA: {
  topicTitleMatch: string;
  pyqs: { year: number; marks: number | null; question: string | null }[];
}[] = [
  // ── History ──
  {
    topicTitleMatch: "French Revolution and Nationalism",
    pyqs: [
      { year: 2024, marks: 3, question: "Describe the role of the French Revolution in the development of nationalism." },
      { year: 2023, marks: 5, question: "How did the French Revolution lead to the transfer of sovereignty from the monarchy to the citizens?" },
      { year: 2022, marks: 3, question: "What measures were taken during the French Revolution to create a sense of collective identity?" },
    ],
  },
  {
    topicTitleMatch: "Making of Nationalism in Europe",
    pyqs: [
      { year: 2024, marks: 5, question: "Explain the role of Romanticism in developing nationalist sentiments in Europe." },
      { year: 2023, marks: 3, question: "How did Otto von Bismarck unify Germany?" },
    ],
  },
  {
    topicTitleMatch: "Nationalist Movement in Indo-China",
    pyqs: [
      { year: 2024, marks: 3, question: "Who was the founder of the Vietnamese Communist Party? Describe his role in the nationalist movement." },
      { year: 2022, marks: 5, question: "Explain the role of schools and education in the resistance against French colonialism in Vietnam." },
    ],
  },
  {
    topicTitleMatch: "Nationalism in India",
    pyqs: [
      { year: 2025, marks: 5, question: "Describe the events of the Salt March and its significance in the Indian freedom movement." },
      { year: 2024, marks: 5, question: "Explain the impact of the Non-Cooperation Movement on the national movement." },
      { year: 2023, marks: 3, question: "Why did Gandhiji decide to launch the Civil Disobedience Movement?" },
      { year: 2022, marks: 5, question: "How did different social groups participate in the Civil Disobedience Movement?" },
    ],
  },
  // ── Geography ──
  {
    topicTitleMatch: "Types of Resources",
    pyqs: [
      { year: 2024, marks: 3, question: "Distinguish between renewable and non-renewable resources with examples." },
      { year: 2023, marks: 1, question: "What is a resource? Give two examples of abiotic resources." },
    ],
  },
  {
    topicTitleMatch: "Soil as a Resource",
    pyqs: [
      { year: 2024, marks: 3, question: "Describe the different types of soil found in India and their characteristics." },
      { year: 2023, marks: 5, question: "What is soil erosion? Explain the methods of soil conservation." },
      { year: 2022, marks: 3, question: "Why is alluvial soil considered the most fertile soil in India?" },
    ],
  },
  {
    topicTitleMatch: "Forest and Wildlife Resources",
    pyqs: [
      { year: 2024, marks: 3, question: "Explain the importance of biodiversity and the threats it faces in India." },
      { year: 2022, marks: 5, question: "Describe the community-based conservation efforts in India with examples." },
    ],
  },
  {
    topicTitleMatch: "Types of Farming",
    pyqs: [
      { year: 2025, marks: 3, question: "Differentiate between subsistence farming and commercial farming." },
      { year: 2024, marks: 3, question: "What is plantation agriculture? Give examples of plantation crops in India." },
      { year: 2023, marks: 1, question: "Define intensive subsistence farming." },
    ],
  },
  {
    topicTitleMatch: "Food Crops and Non-Food Crops",
    pyqs: [
      { year: 2024, marks: 5, question: "Describe the geographical conditions required for growing rice and wheat in India." },
      { year: 2023, marks: 3, question: "What are the two main cropping seasons in India? Give examples of crops grown in each." },
    ],
  },
  // ── Political Science ──
  {
    topicTitleMatch: "Power Sharing",
    pyqs: [
      { year: 2025, marks: 3, question: "Why is power sharing desirable? Give any three reasons." },
      { year: 2024, marks: 5, question: "Describe the power-sharing arrangement in Belgium with reference to its community government." },
      { year: 2023, marks: 3, question: "Explain the ethnic composition of Belgium and why it led to tensions." },
      { year: 2022, marks: 1, question: "What is the difference between horizontal and vertical power sharing?" },
    ],
  },
  {
    topicTitleMatch: "Federalism",
    pyqs: [
      { year: 2024, marks: 5, question: "What makes India a federal country? Explain with examples." },
      { year: 2023, marks: 3, question: "Distinguish between the 'coming together' and 'holding together' types of federations." },
    ],
  },
  {
    topicTitleMatch: "Democracy and Diversity",
    pyqs: [
      { year: 2024, marks: 3, question: "How do social differences affect politics? Explain with examples." },
      { year: 2022, marks: 5, question: "Describe the civil rights movement in the USA and the role of the 1968 Olympics protest." },
    ],
  },
  {
    topicTitleMatch: "Gender, Religion and Caste",
    pyqs: [
      { year: 2025, marks: 5, question: "Describe the role of women in public life in India. What are the challenges they face?" },
      { year: 2024, marks: 3, question: "How does communalism affect Indian politics?" },
      { year: 2023, marks: 3, question: "Explain how caste inequalities continue in Indian politics." },
    ],
  },
  // ── Economics ──
  {
    topicTitleMatch: "Development",
    pyqs: [
      { year: 2025, marks: 3, question: "Why do different people have different developmental goals? Explain with examples." },
      { year: 2024, marks: 3, question: "What is Human Development Index (HDI)? What are the key indicators used to measure it?" },
      { year: 2023, marks: 1, question: "What is per capita income? Why is it used as a measure of development?" },
    ],
  },
  {
    topicTitleMatch: "Income and Other Criteria",
    pyqs: [
      { year: 2024, marks: 5, question: "Why is per capita income not a sufficient indicator of development? What other criteria should be considered?" },
      { year: 2023, marks: 3, question: "Compare the development of Kerala and Punjab using social indicators." },
    ],
  },
  {
    topicTitleMatch: "Sectors of the Indian Economy",
    pyqs: [
      { year: 2025, marks: 5, question: "Explain the importance of the tertiary sector in the Indian economy." },
      { year: 2024, marks: 3, question: "What is GDP? How are sectors classified based on economic activity?" },
      { year: 2023, marks: 3, question: "Why has the primary sector's share in GDP declined while employment remains high?" },
    ],
  },
  {
    topicTitleMatch: "Money and Credit",
    pyqs: [
      { year: 2024, marks: 5, question: "Explain the role of banks in the credit system. Why are formal sources of credit preferred?" },
      { year: 2023, marks: 3, question: "What is the difference between formal and informal sources of credit?" },
      { year: 2022, marks: 3, question: "How do Self-Help Groups (SHGs) help in providing credit to the rural poor?" },
    ],
  },
  {
    topicTitleMatch: "Globalisation",
    pyqs: [
      { year: 2025, marks: 5, question: "How has globalisation affected the Indian economy? Discuss both positive and negative impacts." },
      { year: 2024, marks: 3, question: "What is the role of MNCs in the process of globalisation?" },
      { year: 2023, marks: 3, question: "How has technology enabled globalisation?" },
      { year: 2022, marks: 5, question: "What is the role of WTO in trade liberalisation? Has it been fair to developing countries?" },
    ],
  },
];

async function main() {
  console.log("📝 Seeding PYQ (Previous Year Questions) data...\n");

  // Clear existing PYQ data
  const deleted = await prisma.topicPYQ.deleteMany();
  console.log(`   Cleared ${deleted.count} existing PYQ records.\n`);

  let totalCreated = 0;
  let topicsMatched = 0;

  for (const entry of PYQ_DATA) {
    // Find topics whose title contains the match string
    const topics = await prisma.topic.findMany({
      where: {
        title: { contains: entry.topicTitleMatch, mode: "insensitive" },
      },
      select: { id: true, title: true },
    });

    if (topics.length === 0) {
      console.log(`   ⚠  No topic found matching: "${entry.topicTitleMatch}"`);
      continue;
    }

    for (const topic of topics) {
      topicsMatched++;
      const created = await prisma.topicPYQ.createMany({
        data: entry.pyqs.map((pyq) => ({
          topicId: topic.id,
          year: pyq.year,
          marks: pyq.marks,
          question: pyq.question,
        })),
      });
      totalCreated += created.count;
      console.log(`   ✓  ${topic.title} - ${created.count} PYQ entries`);
    }
  }

  console.log(`\n✅ Done! Created ${totalCreated} PYQ records across ${topicsMatched} topics.`);
}

main()
  .catch((e) => {
    console.error("Error seeding PYQ data:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
