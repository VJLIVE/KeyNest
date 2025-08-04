'use client';

import {
  CircleAlert,
  BookOpen,
  Code,
  Shield,
  History,
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: 'Secure API Key Storage',
    description:
      'End-to-end encryption with zero-knowledge architecture. Your keys are encrypted before they reach our servers.',
  },
  {
    icon: <CircleAlert className="h-8 w-8 text-primary" />,
    title: 'Alerts',
    description:
      'Notifying users when the expiry date is close.',
  },
  {
    icon: <History className="h-8 w-8 text-primary" />,
    title: 'Version Tracking',
    description:
      'Maintain a secure, Git-style history of all key changes with timestamps and rollback capability.',
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: 'Developer-Friendly UI',
    description:
      'Clean, minimal interface designed for developers. Dark mode by default with easy navigation.',
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Integrated Documentation',
    description:
      'Easy access to API documentation, example usage etc.',
  },
];

export function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      className="container mx-auto px-4 py-16 sm:py-24"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="text-center mb-16 mt-20" variants={itemVariants}>
        <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tighter text-foreground">
          Everything You Need for <span className="text-primary">API Security</span>
        </h2>
        <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
          Built with modern security standards and developer experience in mind. Keynest provides all the tools you need to manage API keys at scale.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-card/50 border border-white/10 rounded-xl p-6 flex flex-col items-start gap-4 transition-all hover:bg-card/70 hover:border-primary/50"
          >
            <div className="bg-primary/10 p-3 rounded-lg">{feature.icon}</div>
            <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
            <p className="text-muted-foreground flex-1">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
