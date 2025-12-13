// src/content/config.ts

import { defineCollection, z } from 'astro:content';

// 1. PROJECTS COLLECTION (Folder-based collection - for dynamic pages)
const projectCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string().max(60, 'Title should be under 60 characters.'),
        date: z.date().optional(),
        slug: z.string().optional(),
        featured_image: image().optional(), // This image is for the project card on the homepage
        
        tags: z.array(z.string()).optional(),
        is_featured: z.boolean().default(false), 
    }),
});

// 2. HOMEPAGE SINGLETONS (File-based collections - New Sidebar Entries)

// A. HOME & CONTACT INFO (Hero Section Data)
const homeCollection = defineCollection({
    type: 'content', // Assuming you use JSON/YAML for data files
    schema: ({ image }) => z.object({
        // Fields matching the Hero section's static content
        full_name: z.string().max(100),
        pro_title: z.string().max(150),
        phone: z.string().optional(),
        email: z.string().email(),
        location: z.string().optional(),
        linkedin_url: z.string().url().optional(),
        
        intro_headline: z.string().optional(),
        intro_body: z.string(), // Use string for Markdown text body
        profile_image: z.string().optional(),

        // NEW: Array for the cards
        highlights: z.array(z.object({
            title: z.string(),
            value: z.string(),
            icon: z.string().optional(),
        })).optional(),
    }),
});

// B. CAREER HIGHLIGHTS (Timeline)
const careerCollection = defineCollection({
    type: 'content',
    schema: z.object({
        jobs: z.array(z.object({
            title: z.string(),
            company: z.string(),
            from: z.string(),
            to: z.string(),
            description: z.string().optional(),
            bullets: z.array(z.string()).optional(),
            logo_image: z.string().optional(),
            resume_pdf: z.string().optional(),
        })).optional(),
    }),
});

// C. SKILLS SECTION
const skillsCollection = defineCollection({
    type: 'data',
    schema: z.object({
        skill_groups: z.array(z.object({
            group_name: z.string(),
            list: z.array(z.string()),
        })).optional(),
    }),
});

// D. EDUCATION & CERTS
const educationCollection = defineCollection({
    type: 'content',
    schema: z.object({
        education_entries: z.array(z.object({
            type: z.string(),
            institution: z.string(),
            degree: z.string(),
            year: z.string(),
        })).optional(),
        certifications: z.array(z.string()).optional(),
    }),
});

// E. TESTIMONIALS
const testimonialsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        testimonials_list: z.array(z.object({
            quote: z.string(),
            source: z.string(),
        })).optional(),
    }),
});


// 3. Export Collections
// Astro now registers 6 distinct collections for clean separation!
export const collections = {
    'projects': projectCollection,
    'home': homeCollection, 
    'career': careerCollection,
    'skills': skillsCollection,
    'education': educationCollection,
    'testimonials': testimonialsCollection,
};