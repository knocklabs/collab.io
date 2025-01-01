This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Database Setup

Before starting the development server, you'll need to set up and seed the database:

1. Initialize Prisma and create the database:

```bash
npx prisma generate
npx prisma db push
```

2. Seed the database with initial data:

```bash

npm run seed
```

To reset the database, you can run:

```bash

npm run destroy
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Account  
| **Character Name** | **Email Address** | **Password** |
|----------------------|-----------------------------|-----------------|
| Dr. Alan Grant | agrant@jurassicmail.com | password |
| Dr. Ellie Sattler | esattler@jurassicmail.com | password |
| Dr. Ian Malcolm | imalcolm@chaostheory.com | password |
| Sarah Harding | sharding@dinoexplorer.com | password |
| Roland Tembo | rtembo@biggamehunter.com | password |
| Amanda Kirby | akirby@dinoescape.com | password |
| Paul Kirby | pkirby@kirbyconstruction.com| password |
| Owen Grady | owen@raptortrainer.com | password |
| Claire Dearing | claire@dinosafer.org | password |
| Zach Mitchell | zach@jurassicmail.com | password |
| Maisie Lockwood | maisie@lockwoodlegacy.com | password |

Workspaces
| **Name** | **Slug** | **Url** |
|---------------------------|--------------------|
| InGen | ingen |/assets/workspaces/ingen.webp
| BioSyn | biosyn |/assets/workspaces/biosyn.webp
| Masrani Global Corporation | masrani-global |/assets/workspaces/masrani.webp

Projects
| **Name** | **Slug** | **Url** |
|---------------------------|--------------------|
| InGen | ingen |/assets/workspaces/ingen.webp
| BioSyn | biosyn |/assets/workspaces/biosyn.webp
| Masrani Global Corporation | masrani-global |/assets/workspaces/masrani.webp| **Project Name** | **Description** | **Company** |
|------------------------------------|----------------------------------------------------------------------------------------------|-------------------|
| Dinosaur Genome Repository | A shared database for cataloging and storing all known dinosaur genetic material. | ingen |
| Cross-Species Hybrid Development | Joint research to create and monetize new hybrid dinosaurs for theme parks and private buyers.| masrani-global |
| Dinosaur Behavioral AI | Development of AI systems to monitor and predict dinosaur behavior for safety and control. | biosyn |
| Sustainable Dino Enclosures | Design of eco-friendly, secure dinosaur habitats for parks and research facilities. | masrani-global |
| Global Dinosaur Monitoring Network | A satellite-based system to track free-roaming dinosaurs in the wild post-_Jurassic World_. | biosyn |
| Advanced Dino Medicine Program | A collaboration to study dinosaur biology and create medical solutions for sick dinosaurs. | ingen |
| Military Dino Application Program | A joint venture to explore weaponizing dinosaurs for strategic and defense purposes. | biosyn |
| DNA Editing Ethics Committee | Establishing ethical standards and controls for the use of genetic engineering in dinosaurs. | ingen |
| Dino-Themed Augmented Reality | Creating AR experiences to let the public interact with dinosaurs virtually for safe monetization. | masrani-global |

Assets
| **Project Name** | **Asset Name** | **Author** | **Description** | **Image URL** |
|------------------------------------|--------------------------------|--------------------|-------------------------------------------------------------------|------------------------------------|
| Dinosaur Genome Repository | Dino DNA Sequencer | Dr. Ellie Sattler | A high-precision tool for decoding dinosaur genetic material. | https://via.placeholder.com/150 |
| Dinosaur Genome Repository | Genome Storage Vault | Dr. Alan Grant | A secure facility for storing DNA samples from various species. | https://via.placeholder.com/150 |
| Dinosaur Genome Repository | Dinosaur Species Catalog | Dr. Ian Malcolm | A comprehensive digital archive of all cloned dinosaur species. | https://via.placeholder.com/150 |
| Cross-Species Hybrid Development | Hybrid Creation Lab | Owen Grady | A facility for experimenting with and creating hybrid dinosaurs. | https://via.placeholder.com/150 |
| Cross-Species Hybrid Development | Indominus rex Blueprint | Claire Dearing | The original genetic blueprint for the Indominus rex. | https://via.placeholder.com/150 |
| Cross-Species Hybrid Development | Ethical Breeding Guidelines | Dr. Ellie Sattler | Documentation on ethical practices for hybrid development. | https://via.placeholder.com/150 |
| Dinosaur Behavioral AI | Dino AI Training Dataset | Dr. Ian Malcolm | A dataset of behavioral patterns used to train AI models. | https://via.placeholder.com/150 |
| Dinosaur Behavioral AI | Behavioral Monitoring Chip | Claire Dearing | A chip implanted in dinosaurs to monitor and predict their actions.| https://via.placeholder.com/150 |
| Dinosaur Behavioral AI | Behavioral Anomaly Dashboard | Owen Grady | A software tool for visualizing and analyzing behavioral anomalies.| https://via.placeholder.com/150 |
| Sustainable Dino Enclosures | Eco-Habitat Design Plan | Sarah Harding | A blueprint for creating sustainable and naturalistic enclosures. | https://via.placeholder.com/150 |
| Sustainable Dino Enclosures | Renewable Energy Fence | Roland Tembo | A perimeter fence powered by renewable energy. | https://via.placeholder.com/150 |
| Sustainable Dino Enclosures | Habitat Condition Analyzer | Maisie Lockwood | A system for assessing and maintaining habitat conditions. | https://via.placeholder.com/150 |
| Global Dinosaur Monitoring Network | Satellite Dino Tracker | Dr. Ian Malcolm | A satellite-based tracker for monitoring wild dinosaur movements. | https://via.placeholder.com/150 |
| Global Dinosaur Monitoring Network | Dino Tagging Drones | Sarah Harding | Autonomous drones for tagging and tracking free-roaming dinosaurs.| https://via.placeholder.com/150 |
| Global Dinosaur Monitoring Network | Dino Migration Heatmap | Claire Dearing | A tool for visualizing migration patterns of dinosaur populations.| https://via.placeholder.com/150 |
| Advanced Dino Medicine Program | Dino Medical Scanner | Dr. Alan Grant | A portable device for diagnosing dinosaur health issues. | https://via.placeholder.com/150 |
| Advanced Dino Medicine Program | Dino Vaccine Development Kit | Sarah Harding | A kit for creating vaccines tailored to dinosaur biology. | https://via.placeholder.com/150 |
| Advanced Dino Medicine Program | Medical Case Archive | Maisie Lockwood | A repository of medical cases and treatments for dinosaurs. | https://via.placeholder.com/150 |
| Military Dino Application Program | Combat Dino Control System | Roland Tembo | A system for remotely controlling weaponized dinosaurs. | https://via.placeholder.com/150 |
| Military Dino Application Program | Tactical Dino Armor | Owen Grady | Protective armor designed for military-trained dinosaurs. | https://via.placeholder.com/150 |
| Military Dino Application Program | Training Dino Command Module | Dr. Ian Malcolm | A module for training dinosaurs to respond to tactical commands. | https://via.placeholder.com/150 |
| DNA Editing Ethics Committee | Ethical Editing Framework | Dr. Ellie Sattler | Guidelines for ethical genetic editing of dinosaurs. | https://via.placeholder.com/150 |
| DNA Editing Ethics Committee | Genetic Editing Oversight Board| Claire Dearing | A governing body for approving and monitoring genetic edits. | https://via.placeholder.com/150 |
| DNA Editing Ethics Committee | Genetic Risk Assessment Tool | Dr. Ian Malcolm | A tool for assessing the risks of proposed genetic modifications. | https://via.placeholder.com/150 |
| Dino-Themed Augmented Reality | AR Dino Safari Experience | Zach Mitchell | A virtual safari experience for interacting with dinosaurs safely.| https://via.placeholder.com/150 |
| Dino-Themed Augmented Reality | Virtual Dino Holograms | Maisie Lockwood | Holographic projections for realistic dinosaur interactions. | https://via.placeholder.com/150 |
| Dino-Themed Augmented Reality | Educational AR Dino Guide | Dr. Alan Grant | An educational app showcasing facts about dinosaurs in AR. | https://via.placeholder.com/150 |

Comments
| **Asset Name** | **Author** | **Text** |
|---------------------------------|--------------------|-----------------------------------------------------------------------------------------|
| Dino DNA Sequencer | Dr. Ian Malcolm | "Just because we can decode DNA doesn't mean we should. Proceed with caution." |
| Dino DNA Sequencer | Claire Dearing | "This is groundbreaking! It will help us ensure genetic diversity in the park." |
| Genome Storage Vault | Dr. Ellie Sattler | "Impressive, but let's ensure this vault has redundancies to prevent data loss." |
| Genome Storage Vault | Maisie Lockwood | "Feels like a Jurassic version of a time capsule—fascinating!" |
| Dinosaur Species Catalog | Sarah Harding | "This will be invaluable for field researchers tracking species in the wild." |
| Dinosaur Species Catalog | Zach Mitchell | "Pretty cool, but can we make it more user-friendly for students and educators?" |
| Hybrid Creation Lab | Owen Grady | "The hybrids are unpredictable. We need stricter safety protocols in this lab." |
| Hybrid Creation Lab | Dr. Ian Malcolm | "You’re creating something with no precedent in nature. I hope you’re ready for chaos." |
| Indominus rex Blueprint | Claire Dearing | "A cautionary tale. Let’s use this as a lesson rather than a template." |
| Indominus rex Blueprint | Owen Grady | "This thing was a disaster from the start—delete this blueprint before it causes more problems." |
| Ethical Breeding Guidelines | Dr. Ellie Sattler | "Finally, some standards we can be proud of. Let’s make these mandatory for all projects." |
| Ethical Breeding Guidelines | Dr. Ian Malcolm | "Ethics are great, but will the board actually follow through with these?" |
| Behavioral Monitoring Chip | Claire Dearing | "This is a great start, but I’m worried about potential misuse of these chips." |
| Behavioral Monitoring Chip | Owen Grady | "Monitoring is fine, but these animals aren’t machines. Treat them with respect." |
| Eco-Habitat Design Plan | Sarah Harding | "These enclosures look incredible. The dinosaurs will thrive in these conditions." |
| Eco-Habitat Design Plan | Roland Tembo | "Can’t argue with the design, but we’ll need to fortify them against breakouts." |
| Renewable Energy Fence | Dr. Ian Malcolm | "As long as this fence doesn’t rely solely on renewable energy during a storm, I’m onboard." |
| Renewable Energy Fence | Maisie Lockwood | "Great for sustainability, but can we make it less intrusive in the environment?" |
| AR Dino Safari Experience | Zach Mitchell | "This app is going to be a hit with kids and adults alike! Can’t wait to try it out." |
| AR Dino Safari Experience | Dr. Alan Grant | "It’s a fun idea, but don’t let it replace the value of real-world exploration." |
