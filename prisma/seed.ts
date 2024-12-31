import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { Knock } from "@knocklabs/node";

const prisma = new PrismaClient();
const knock = new Knock(process.env.KNOCK_SECRET_API_KEY);

async function main() {
  console.log("🌱 Starting seed...");

  // Users
  console.log("\n📝 Creating users...");
  const users = [
    {
      name: "Dr. Alan Grant",
      email: "agrant@jurassicmail.com",
      image: "/assets/users/alan-grant.webp",
    },
    {
      name: "Dr. Ellie Sattler",
      email: "esattler@jurassicmail.com",
      image: "/assets/users/ellie-sattler.webp",
    },
    {
      name: "Dr. Ian Malcolm",
      email: "imalcolm@chaostheory.com",
      image: "/assets/users/ian-malcolm.webp",
    },
    {
      name: "Sarah Harding",
      email: "sharding@dinoexplorer.com",
      image: "/assets/users/sarah-harding.webp",
    },
    {
      name: "Roland Tembo",
      email: "rtembo@biggamehunter.com",
      image: "/assets/users/roland-tembo.webp",
    },
    {
      name: "Amanda Kirby",
      email: "akirby@dinoescape.com",
      image: "/assets/users/amanda-kirby.webp",
    },
    {
      name: "Paul Kirby",
      email: "pkirby@kirbyconstruction.com",
      image: "/assets/users/paul-kirby.webp",
    },
    {
      name: "Owen Grady",
      email: "owen@raptortrainer.com",
      image: "/assets/users/owen-grady.webp",
    },
    {
      name: "Claire Dearing",
      email: "claire@dinosafer.org",
      image: "/assets/users/claire-dearing.webp",
    },
    {
      name: "Zach Mitchell",
      email: "zach@jurassicmail.com",
      image: "/assets/users/zach-mitchell.webp",
    },
    {
      name: "Maisie Lockwood",
      email: "maisie@lockwoodlegacy.com",
      image: "/assets/users/maisie-lockwood.webp",
    },
  ];

  const hashedPassword = await hash("password", 10);

  const createdUsers = [];
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });

    // Create user in Knock
    await knock.users.identify(createdUser.id, {
      name: createdUser.name as string,
      avatar: createdUser.image as string,
      email: createdUser.email as string,
    });

    createdUsers.push(createdUser);
    console.log(`✓ Created user: ${user.name}`);
  }
  console.log(`✅ Created ${users.length} users`);

  // Workspaces
  console.log("\n🏢 Creating workspaces...");
  const workspaces = [
    { name: "InGen", slug: "ingen", url: "/assets/workspaces/ingen.webp" },
    { name: "BioSyn", slug: "biosyn", url: "/assets/workspaces/biosyn.webp" },
    {
      name: "Masrani Global",
      slug: "masrani-global",
      url: "/assets/workspaces/masrani.webp",
    },
  ];

  const createdWorkspaces = [];
  for (const workspace of workspaces) {
    const createdWorkspace = await prisma.workspace.create({
      data: workspace,
    });

    // Create tenant in Knock
    await knock.tenants.set(createdWorkspace.id, {
      name: createdWorkspace.name,
    });

    createdWorkspaces.push(createdWorkspace);
    console.log(`✓ Created workspace: ${workspace.name}`);
  }
  console.log(`✅ Created ${workspaces.length} workspaces`);

  // Create workspace seats
  console.log("\n💺 Creating workspace seats...");
  let seatCount = 0;
  for (const user of createdUsers) {
    for (const workspace of createdWorkspaces) {
      await prisma.workspace_seat.create({
        data: {
          userId: user.id,
          workspaceId: workspace.id,
        },
      });
      seatCount++;
    }
  }
  console.log(`✅ Created ${seatCount} workspace seats`);
  // Projects
  console.log("\n📋 Creating projects...");
  const projects = [
    {
      name: "Dinosaur genome repository",
      description:
        "A shared database for cataloging and storing all known dinosaur genetic material. Includes advanced encryption and backup systems to prevent unauthorized access. Features real-time collaboration tools for researchers worldwide.",
      workspaceSlug: "ingen",
    },
    {
      name: "Cross-species hybrid development",
      description:
        "Joint research to create and monetize new hybrid dinosaurs for theme parks and private buyers. Utilizes cutting-edge genetic splicing techniques and behavioral modification. Includes extensive testing protocols for viability and safety.",
      workspaceSlug: "masrani-global",
    },
    {
      name: "Dinosaur behavioral AI",
      description:
        "Development of AI systems to monitor and predict dinosaur behavior for safety and control. Incorporates machine learning models trained on thousands of hours of observed behavior patterns. Features real-time alert systems for anomalous activities.",
      workspaceSlug: "biosyn",
    },
    {
      name: "Sustainable dino enclosures",
      description:
        "Design of eco-friendly, secure dinosaur habitats for parks and research facilities. Implements renewable energy systems and natural enrichment features. Includes advanced containment protocols and emergency response systems.",
      workspaceSlug: "masrani-global",
    },
    {
      name: "Global dinosaur monitoring network",
      description:
        "A satellite-based system to track free-roaming dinosaurs in the wild post-Jurassic World. Features thermal imaging and DNA detection capabilities. Includes a global alert system for local authorities and response teams.",
      workspaceSlug: "biosyn",
    },
    {
      name: "Advanced dino medicine program",
      description:
        "A collaboration to study dinosaur biology and create medical solutions for sick dinosaurs. Includes development of specialized surgical techniques and pharmaceutical treatments. Features a comprehensive database of dinosaur diseases and treatments.",
      workspaceSlug: "ingen",
    },
    {
      name: "Military dino application program",
      description:
        "A joint venture to explore weaponizing dinosaurs for strategic and defense purposes. Includes training protocols and behavioral conditioning methods. Features specialized equipment development for dinosaur control and deployment.",
      workspaceSlug: "biosyn",
    },
    {
      name: "DNA editing ethics committee",
      description:
        "Establishing ethical standards and controls for the use of genetic engineering in dinosaurs. Includes comprehensive review processes for all genetic modification proposals. Features regular audits and compliance monitoring of all participating facilities.",
      workspaceSlug: "ingen",
    },
    {
      name: "Dino-themed augmented reality",
      description:
        "Creating AR experiences to let the public interact with dinosaurs virtually for safe monetization. Features photorealistic 3D models based on actual genetic data. Includes educational content and gamified learning experiences.",
      workspaceSlug: "masrani-global",
    },
  ];

  const createdProjects = [];
  let projectCount = 0;
  for (const project of projects) {
    const workspace = createdWorkspaces.find(
      (w) => w.slug === project.workspaceSlug
    );
    if (workspace) {
      const createdProject = await prisma.project.create({
        data: {
          name: project.name,
          description: project.description,
          workspaceId: workspace.id,
        },
      });
      createdProjects.push(createdProject);
      console.log(`✓ Created project: ${project.name}`);
      projectCount++;
    }
  }
  console.log(`✅ Created ${projectCount} projects`);

  // Set all projects in Knock
  for (const project of createdProjects) {
    await knock.objects.set("projects", project.id, {
      name: project.name,
      description: project.description,
      tenant: project.workspaceId,
    });
  }

  // Assets
  console.log("\n🖼️ Creating assets...");
  const assets = [
    {
      projectName: "Dinosaur genome repository",
      name: "Dino DNA sequencer",
      author: "Dr. Ellie Sattler",
      description:
        "A high-precision tool for decoding dinosaur genetic material. Features advanced error correction algorithms and can process degraded samples with 99.9% accuracy. Includes real-time visualization of the sequencing process.",
      url: "/assets/assets/dino-dna-sequencer.png",
    },
    {
      projectName: "Dinosaur genome repository",
      name: "Genome storage vault",
      author: "Dr. Alan Grant",
      description:
        "A secure facility for storing DNA samples from various species. Maintains samples at optimal preservation temperatures and features redundant backup systems. Equipped with biometric security and environmental monitoring.",
      url: "/assets/assets/genome-storage-vault.png",
    },
    {
      projectName: "Dinosaur genome repository",
      name: "Dinosaur species catalog",
      author: "Dr. Ian Malcolm",
      description:
        "A comprehensive digital archive of all cloned dinosaur species. Includes detailed genetic markers, behavioral traits, and evolutionary relationships. Features an AI-powered search system for quick reference and comparison.",
      url: "/assets/assets/dinosaur-species-catalog.png",
    },
    {
      projectName: "Cross-species hybrid development",
      name: "Hybrid creation lab",
      author: "Owen Grady",
      description:
        "A facility for experimenting with and creating hybrid dinosaurs. Contains specialized containment units and advanced genetic splicing equipment. Features fail-safe protocols and emergency containment measures.",
      url: "/assets/assets/hybrid-creation-lab.png",
    },
    {
      projectName: "Cross-species hybrid development",
      name: "Indominus rex blueprint",
      author: "Claire Dearing",
      description:
        "The original genetic blueprint for the Indominus rex. Details the complete genetic makeup and modification points used in creation. Includes annotations on behavioral predictions and containment requirements.",
      url: "/assets/assets/indominus-rex-blueprint.png",
    },
    {
      projectName: "Cross-species hybrid development",
      name: "Ethical breeding guidelines",
      author: "Dr. Ellie Sattler",
      description:
        "Documentation on ethical practices for hybrid development. Outlines risk assessment protocols and animal welfare considerations. Includes case studies of previous hybrid experiments and their outcomes.",
      url: "/assets/assets/ethical-breeding-guidelines.png",
    },
    {
      projectName: "Dinosaur behavioral AI",
      name: "Dino AI training dataset",
      author: "Dr. Ian Malcolm",
      description:
        "A dataset of behavioral patterns used to train AI models. Contains over 10,000 hours of recorded dinosaur interactions and responses. Includes detailed metadata and behavioral classification systems.",
      url: "/assets/assets/dino-ai-training-dataset.png",
    },
    {
      projectName: "Dinosaur behavioral AI",
      name: "Behavioral monitoring chip",
      author: "Claire Dearing",
      description:
        "A chip implanted in dinosaurs to monitor and predict their actions. Provides real-time data on vital signs and movement patterns. Features wireless connectivity and long-term battery life.",
      url: "/assets/assets/behavioral-monitoring-chip.png",
    },
    {
      projectName: "Dinosaur behavioral AI",
      name: "Behavioral anomaly dashboard",
      author: "Owen Grady",
      description:
        "A software tool for visualizing and analyzing behavioral anomalies. Provides real-time alerts and predictive analytics for potential issues. Features customizable thresholds and historical trend analysis.",
      url: "/assets/assets/behavioral-anomaly-dashboard.png",
    },
    {
      projectName: "Sustainable dino enclosures",
      name: "Eco-habitat design plan",
      author: "Sarah Harding",
      description:
        "A blueprint for creating sustainable and naturalistic enclosures. Incorporates native plant species and natural water management systems. Features modular designs adaptable to different species and climate zones.",
      url: "/assets/assets/eco-habitat-design-plan.png",
    },
    {
      projectName: "Sustainable dino enclosures",
      name: "Renewable energy fence",
      author: "Roland Tembo",
      description:
        "A perimeter fence powered by renewable energy. Integrates solar panels and wind turbines for continuous operation. Features smart grid technology and automated maintenance systems.",
      url: "/assets/assets/renewable-energy-fence.png",
    },
    {
      projectName: "Sustainable dino enclosures",
      name: "Habitat condition analyzer",
      author: "Maisie Lockwood",
      description:
        "A system for assessing and maintaining habitat conditions. Monitors soil quality, air composition, and vegetation health in real-time. Includes automated irrigation and climate control systems.",
      url: "/assets/assets/habitat-condition-analyzer.png",
    },
    {
      projectName: "Global dinosaur monitoring network",
      name: "Satellite dino tracker",
      author: "Dr. Ian Malcolm",
      description:
        "A satellite-based tracker for monitoring wild dinosaur movements. Provides global coverage with centimeter-level accuracy. Features weather-resistant hardware and extended battery life.",
      url: "/assets/assets/satellite-dino-tracker.png",
    },
    {
      projectName: "Global dinosaur monitoring network",
      name: "Dino tagging drones",
      author: "Sarah Harding",
      description:
        "Autonomous drones for tagging and tracking free-roaming dinosaurs. Equipped with tranquilizer systems and RFID tag applicators. Features obstacle avoidance and night vision capabilities.",
      url: "/assets/assets/dino-tagging-drones.png",
    },
    {
      projectName: "Global dinosaur monitoring network",
      name: "Dino migration heatmap",
      author: "Claire Dearing",
      description:
        "A tool for visualizing migration patterns of dinosaur populations. Shows seasonal movements and territory overlaps in real-time. Includes predictive modeling for future migration patterns.",
      url: "/assets/assets/dino-migration-heatmap.png",
    },
    {
      projectName: "Advanced dino medicine program",
      name: "Dino medical scanner",
      author: "Dr. Alan Grant",
      description:
        "A portable device for diagnosing dinosaur health issues. Uses advanced imaging technology and blood analysis capabilities. Features instant results and treatment recommendations.",
      url: "/assets/assets/dino-medical-scanner.png",
    },
    {
      projectName: "Advanced dino medicine program",
      name: "Dino vaccine development kit",
      author: "Sarah Harding",
      description:
        "A kit for creating vaccines tailored to dinosaur biology. Contains specialized equipment for rapid prototyping and testing. Includes safety protocols and quality control measures.",
      url: "/assets/assets/dino-vaccine-development-kit.png",
    },
    {
      projectName: "Advanced dino medicine program",
      name: "Medical case archive",
      author: "Maisie Lockwood",
      description:
        "A repository of medical cases and treatments for dinosaurs. Documents successful procedures and treatment outcomes. Features searchable database and collaborative annotation tools.",
      url: "/assets/assets/medical-case-archive.png",
    },
    {
      projectName: "Military dino application program",
      name: "Combat dino control system",
      author: "Roland Tembo",
      description:
        "A system for remotely controlling weaponized dinosaurs. Features encrypted communications and fail-safe override protocols. Includes tactical command interface and status monitoring.",
      url: "/assets/assets/combat-dino-control-system.png",
    },
    {
      projectName: "Military dino application program",
      name: "Tactical dino armor",
      author: "Owen Grady",
      description:
        "Protective armor designed for military-trained dinosaurs. Made from lightweight, bullet-resistant materials. Features integrated cooling system and vital sign monitors.",
      url: "/assets/assets/tactical-dino-armor.png",
    },
    {
      projectName: "Military dino application program",
      name: "Training dino command module",
      author: "Dr. Ian Malcolm",
      description:
        "A module for training dinosaurs to respond to tactical commands. Uses positive reinforcement and behavioral conditioning techniques. Includes progress tracking and performance analytics.",
      url: "/assets/assets/training-dino-command-module.png",
    },
    {
      projectName: "DNA editing ethics committee",
      name: "Ethical editing framework",
      author: "Dr. Ellie Sattler",
      description:
        "Guidelines for ethical genetic editing of dinosaurs. Establishes clear boundaries and approval processes for modifications. Includes risk assessment tools and environmental impact considerations.",
      url: "/assets/assets/ethical-editing-framework.png",
    },
    {
      projectName: "DNA editing ethics committee",
      name: "Genetic editing oversight board",
      author: "Claire Dearing",
      description:
        "A governing body for approving and monitoring genetic edits. Maintains detailed records of all approved modifications. Features transparent decision-making processes and appeal procedures.",
      url: "/assets/assets/genetic-editing-oversight-board.png",
    },
    {
      projectName: "DNA editing ethics committee",
      name: "Genetic risk assessment tool",
      author: "Dr. Ian Malcolm",
      description:
        "A tool for assessing the risks of proposed genetic modifications. Uses predictive modeling to evaluate potential outcomes. Features comprehensive reporting and recommendation system.",
      url: "/assets/assets/genetic-risk-assessment-tool.png",
    },
    {
      projectName: "Dino-themed augmented reality",
      name: "AR dino safari experience",
      author: "Zach Mitchell",
      description:
        "A virtual safari experience for interacting with dinosaurs safely. Features photorealistic animations and accurate behavioral patterns. Includes educational commentary and interactive quizzes.",
      url: "/assets/assets/ar-dino-safari-experience.png",
    },
    {
      projectName: "Dino-themed augmented reality",
      name: "Virtual dino holograms",
      author: "Maisie Lockwood",
      description:
        "Holographic projections for realistic dinosaur interactions. Uses advanced light field technology for true 3D visualization. Features gesture-based controls and environmental awareness.",
      url: "/assets/assets/virtual-dino-holograms.png",
    },
    {
      projectName: "Dino-themed augmented reality",
      name: "Educational AR dino guide",
      author: "Dr. Alan Grant",
      description:
        "An educational app showcasing facts about dinosaurs in AR. Includes interactive 3D models and detailed anatomical information. Features age-appropriate content and learning assessments.",
      url: "/assets/assets/educational-ar-dino-guide.png",
    },
  ];

  let assetCount = 0;
  for (const asset of assets) {
    const project = await prisma.project.findFirst({
      where: { name: asset.projectName },
    });

    const author = await prisma.user.findFirst({
      where: { name: asset.author },
    });

    if (project && author) {
      await prisma.asset.create({
        data: {
          name: asset.name,
          description: asset.description,
          url: asset.url,
          workspaceId: project.workspaceId,
          projectId: project.id,
          authorId: author.id,
        },
      });
      console.log(`✓ Created asset: ${asset.name}`);
      assetCount++;
    }
  }
  console.log(`✅ Created ${assetCount} assets`);
  // Comments
  console.log("\n💭 Creating comments...");
  const comments = [
    {
      assetName: "Dino DNA Sequencer",
      author: "Dr. Ian Malcolm",
      text: "Just because we can decode DNA doesn't mean we should. Proceed with caution.",
    },
    {
      assetName: "Dino DNA Sequencer",
      author: "Claire Dearing",
      text: "This is groundbreaking! It will help us ensure genetic diversity in the park.",
    },
    {
      assetName: "Genome Storage Vault",
      author: "Dr. Ellie Sattler",
      text: "Impressive, but let's ensure this vault has redundancies to prevent data loss.",
    },
    {
      assetName: "Genome Storage Vault",
      author: "Maisie Lockwood",
      text: "Feels like a Jurassic version of a time capsule—fascinating!",
    },
    {
      assetName: "Dinosaur Species Catalog",
      author: "Sarah Harding",
      text: "This will be invaluable for field researchers tracking species in the wild.",
    },
    {
      assetName: "Dinosaur Species Catalog",
      author: "Zach Mitchell",
      text: "Pretty cool, but can we make it more user-friendly for students and educators?",
    },
    {
      assetName: "Hybrid Creation Lab",
      author: "Owen Grady",
      text: "The hybrids are unpredictable. We need stricter safety protocols in this lab.",
    },
    {
      assetName: "Hybrid Creation Lab",
      author: "Dr. Ian Malcolm",
      text: "You're creating something with no precedent in nature. I hope you're ready for chaos.",
    },
    {
      assetName: "Indominus rex Blueprint",
      author: "Claire Dearing",
      text: "A cautionary tale. Let's use this as a lesson rather than a template.",
    },
    {
      assetName: "Indominus rex Blueprint",
      author: "Owen Grady",
      text: "This thing was a disaster from the start—delete this blueprint before it causes more problems.",
    },
    {
      assetName: "Ethical Breeding Guidelines",
      author: "Dr. Ellie Sattler",
      text: "Finally, some standards we can be proud of. Let's make these mandatory for all projects.",
    },
    {
      assetName: "Ethical Breeding Guidelines",
      author: "Dr. Ian Malcolm",
      text: "Ethics are great, but will the board actually follow through with these?",
    },
    {
      assetName: "Behavioral Monitoring Chip",
      author: "Claire Dearing",
      text: "This is a great start, but I'm worried about potential misuse of these chips.",
    },
    {
      assetName: "Behavioral Monitoring Chip",
      author: "Owen Grady",
      text: "Monitoring is fine, but these animals aren't machines. Treat them with respect.",
    },
    {
      assetName: "Eco-Habitat Design Plan",
      author: "Sarah Harding",
      text: "These enclosures look incredible. The dinosaurs will thrive in these conditions.",
    },
    {
      assetName: "Eco-Habitat Design Plan",
      author: "Roland Tembo",
      text: "Can't argue with the design, but we'll need to fortify them against breakouts.",
    },
    {
      assetName: "Renewable Energy Fence",
      author: "Dr. Ian Malcolm",
      text: "As long as this fence doesn't rely solely on renewable energy during a storm, I'm onboard.",
    },
    {
      assetName: "Renewable Energy Fence",
      author: "Maisie Lockwood",
      text: "Great for sustainability, but can we make it less intrusive in the environment?",
    },
    {
      assetName: "AR Dino Safari Experience",
      author: "Zach Mitchell",
      text: "This app is going to be a hit with kids and adults alike! Can't wait to try it out.",
    },
    {
      assetName: "AR Dino Safari Experience",
      author: "Dr. Alan Grant",
      text: "It's a fun idea, but don't let it replace the value of real-world exploration.",
    },
  ];

  let commentCount = 0;
  for (const comment of comments) {
    const asset = await prisma.asset.findFirst({
      where: { name: comment.assetName },
      include: { project: true },
    });

    const author = await prisma.user.findFirst({
      where: { name: comment.author },
    });

    if (asset && author) {
      await prisma.comment.create({
        data: {
          text: comment.text,
          workspaceId: asset.project.workspaceId,
          projectId: asset.projectId,
          assetId: asset.id,
          authorId: author.id,
        },
      });
      console.log(`✓ Created comment on: ${comment.assetName}`);
      commentCount++;
    }
  }
  console.log(`✅ Created ${commentCount} comments`);

  console.log("\n✨ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("\n❌ Seed failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Disconnected from database");
  });
