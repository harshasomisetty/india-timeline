import { Book, Building, Heart, Music } from 'lucide-react';
import timelineJson from '../india-timeline.json';

export type TimelineEvent = {
  date: string;
  year: number;
  title: string;
  description: string;
  location: string;
  category: string;
};

export type TimelineCategory = {
  [key: string]: TimelineEvent[];
};

export const categoryIcons = {
  architecture: Building,
  philosophy: Book,
  bhaktas: Heart,
  music: Music,
  literature: Book,
};

export const categoryColors = {
  architecture: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  philosophy:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  bhaktas: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  music: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  literature:
    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
};

export const transformTimelineData = (): TimelineCategory => {
  const { categories } = timelineJson;
  return {
    architecture: categories.architecture.temples.map((temple) => ({
      date: temple.period || temple.year.toString(),
      year: temple.year,
      title: temple.name,
      description: temple.details || temple.event || 'Built',
      location: 'India',
      category: 'Temple',
    })),
    philosophy: categories.philosophy.thinkers.map((thinker) => ({
      date: thinker.period,
      year: parseInt(thinker.period.split(' ')[0]),
      title: thinker.name,
      description: `${thinker.school || ''} ${thinker.details || ''}`.trim(),
      location: thinker.location || 'India',
      category: thinker.school || 'Philosophy',
    })),
    bhaktas: categories.bhaktas.map((bhakta) => ({
      date: bhakta.period,
      year: parseInt(bhakta.period.split(' ')[0]),
      title: bhakta.name,
      description: `${bhakta.tradition || ''} ${bhakta.deity || ''} ${
        bhakta.details || ''
      }`.trim(),
      location: bhakta.location || 'India',
      category: bhakta.tradition || 'Bhakti',
    })),
    music: [
      ...categories.music_dance.carnatic.map((musician) => ({
        date: musician.period,
        year: parseInt(musician.period.split(' ')[0]),
        title: musician.name,
        description: musician.title || 'Carnatic Musician',
        location: 'South India',
        category: 'Carnatic',
      })),
      ...categories.music_dance.theorists.map((theorist) => ({
        date: theorist.period,
        year: parseInt(theorist.period.split(' ')[0]),
        title: theorist.name,
        description:
          theorist.works?.join(', ') || theorist.details || 'Music Theorist',
        location: 'India',
        category: 'Theory',
      })),
      {
        date: categories.music_dance.hindustani.split.year.toString(),
        year: categories.music_dance.hindustani.split.year,
        title: 'Hindustani-Carnatic Split',
        description: categories.music_dance.hindustani.split.details,
        location: 'India',
        category: 'Music History',
      },
      ...categories.music_dance.dance.map((dancer) => ({
        date: dancer.period,
        year: parseInt(dancer.period.split(' ')[0]),
        title: dancer.name,
        description: dancer.details || 'Dance Form',
        location: 'India',
        category: 'Dance',
      })),
    ],
    literature: [
      ...categories.literature.mahabharata.map((author) => ({
        date: author.period,
        year: parseInt(author.period.split(' ')[0]),
        title: author.name,
        description: author.works?.join(', ') || 'Mahabharata Author',
        location: 'Andhra Pradesh',
        category: 'Mahabharata',
      })),
      ...categories.literature.ramayana.map((author) => ({
        date: author.period,
        year: parseInt(author.period.split(' ')[0]),
        title: author.name,
        description: author.works?.join(', ') || 'Ramayana Author',
        location: author.language
          ? `${author.language} Speaking Region`
          : 'India',
        category: 'Ramayana',
      })),
      ...categories.literature.other.map((author) => ({
        date: author.period,
        year: parseInt(author.period.split(' ')[0]),
        title: author.name,
        description: author.works?.join(', ') || 'Literary Figure',
        location: 'India',
        category: 'Literature',
      })),
    ],
  };
};

export const timelineData = transformTimelineData();
