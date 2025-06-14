"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Book, Music, Building, Heart, Globe, Users } from "lucide-react"

const timelineData = {
  architecture: [
    {
      date: "3rd century BCE",
      title: "Mauryan Architecture",
      description: "Ashoka's pillars and stupas mark the beginning of monumental Indian architecture",
      location: "Pataliputra, Sanchi",
      category: "Ancient",
    },
    {
      date: "1st-2nd century CE",
      title: "Gandhara School",
      description: "Greco-Buddhist art flourishes in northwestern India",
      location: "Gandhara region",
      category: "Classical",
    },
    {
      date: "6th-8th century",
      title: "Chalukya Temples",
      description: "Rock-cut temples at Badami and structural temples showcase Dravidian style",
      location: "Karnataka",
      category: "Medieval",
    },
    {
      date: "11th-13th century",
      title: "Chola Temples",
      description: "Brihadeshwara Temple represents the pinnacle of Dravidian architecture",
      location: "Tamil Nadu",
      category: "Medieval",
    },
    {
      date: "1632-1653",
      title: "Taj Mahal",
      description: "Shah Jahan's monument to love becomes the epitome of Mughal architecture",
      location: "Agra",
      category: "Mughal",
    },
  ],
  philosophy: [
    {
      date: "6th century BCE",
      title: "Buddha's Enlightenment",
      description: "Siddhartha Gautama attains enlightenment, founding Buddhism",
      location: "Bodh Gaya",
      category: "Buddhism",
    },
    {
      date: "6th century BCE",
      title: "Mahavira's Teachings",
      description: "The 24th Tirthankara establishes Jain philosophy",
      location: "Bihar",
      category: "Jainism",
    },
    {
      date: "8th century",
      title: "Adi Shankara",
      description: "Establishes Advaita Vedanta philosophy and four cardinal mathas",
      location: "Kerala",
      category: "Vedanta",
    },
    {
      date: "11th century",
      title: "Ramanuja",
      description: "Propounds Vishishtadvaita philosophy, emphasizing devotion",
      location: "Tamil Nadu",
      category: "Vedanta",
    },
    {
      date: "13th century",
      title: "Madhvacharya",
      description: "Establishes Dvaita philosophy, dualistic interpretation of Vedanta",
      location: "Karnataka",
      category: "Vedanta",
    },
  ],
  bhaktas: [
    {
      date: "6th-9th century",
      title: "Alvars",
      description: "Tamil Vaishnavite saints compose devotional hymns to Vishnu",
      location: "Tamil Nadu",
      category: "Vaishnavism",
    },
    {
      date: "6th-9th century",
      title: "Nayanars",
      description: "Shaivite saints spread devotion to Shiva through Tamil poetry",
      location: "Tamil Nadu",
      category: "Shaivism",
    },
    {
      date: "15th century",
      title: "Kabir",
      description: "Mystic poet bridges Hindu-Muslim traditions through devotional verses",
      location: "Varanasi",
      category: "Nirguna Bhakti",
    },
    {
      date: "16th century",
      title: "Mirabai",
      description: "Rajput princess-saint composes passionate devotional songs to Krishna",
      location: "Rajasthan",
      category: "Krishna Bhakti",
    },
    {
      date: "16th century",
      title: "Tulsidas",
      description: "Composes Ramcharitmanas, making Ramayana accessible to common people",
      location: "Ayodhya",
      category: "Rama Bhakti",
    },
  ],
  music: [
    {
      date: "2nd century BCE",
      title: "Natya Shastra",
      description: "Bharata Muni codifies the principles of Indian performing arts",
      location: "Ancient India",
      category: "Classical Theory",
    },
    {
      date: "13th century",
      title: "Amir Khusrau",
      description: "Sufi musician innovates Hindustani classical music and invents sitar",
      location: "Delhi",
      category: "Hindustani",
    },
    {
      date: "15th-16th century",
      title: "Purandara Dasa",
      description: "Father of Carnatic music establishes systematic teaching methods",
      location: "Karnataka",
      category: "Carnatic",
    },
    {
      date: "18th century",
      title: "Tyagaraja",
      description: "Trinity of Carnatic music composes thousands of devotional compositions",
      location: "Andhra Pradesh",
      category: "Carnatic",
    },
    {
      date: "20th century",
      title: "Ravi Shankar",
      description: "Sitar maestro introduces Indian classical music to the Western world",
      location: "Global",
      category: "Modern",
    },
  ],
  literature: [
    {
      date: "4th century BCE",
      title: "Ramayana",
      description: "Valmiki composes the first Sanskrit epic poem",
      location: "Ancient India",
      category: "Sanskrit Epic",
    },
    {
      date: "4th century BCE",
      title: "Mahabharata",
      description: "Vyasa creates the world's longest epic poem including the Bhagavad Gita",
      location: "Ancient India",
      category: "Sanskrit Epic",
    },
    {
      date: "1st century BCE",
      title: "Tolkappiyam",
      description: "Earliest Tamil grammar and poetics treatise",
      location: "Tamil Nadu",
      category: "Tamil Classical",
    },
    {
      date: "5th century",
      title: "Kalidasa",
      description: "Shakespeare of Sanskrit writes Shakuntala and other masterpieces",
      location: "Ujjain",
      category: "Sanskrit Classical",
    },
    {
      date: "11th century",
      title: "Jayadeva's Gita Govinda",
      description: "Lyrical poem celebrating Krishna's love becomes influential across India",
      location: "Odisha",
      category: "Devotional",
    },
  ],
}

const categoryIcons = {
  architecture: Building,
  philosophy: Book,
  bhaktas: Heart,
  music: Music,
  literature: Book,
}

const categoryColors = {
  architecture: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  philosophy: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  bhaktas: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  music: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  literature: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
}

export default function Component() {
  const [selectedTimeline, setSelectedTimeline] = useState("architecture")
  const [selectedEvent, setSelectedEvent] = useState(null)

  const IconComponent = categoryIcons[selectedTimeline as keyof typeof categoryIcons]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Interactive Timeline of Indian Heritage
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Explore the rich tapestry of Indian culture through different lenses
          </p>
        </div>

        <Tabs value={selectedTimeline} onValueChange={setSelectedTimeline} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="architecture" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Architecture
            </TabsTrigger>
            <TabsTrigger value="philosophy" className="flex items-center gap-2">
              <Book className="w-4 h-4" />
              Philosophy
            </TabsTrigger>
            <TabsTrigger value="bhaktas" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Bhaktas
            </TabsTrigger>
            <TabsTrigger value="music" className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              Music/Dance
            </TabsTrigger>
            <TabsTrigger value="literature" className="flex items-center gap-2">
              <Book className="w-4 h-4" />
              Literature
            </TabsTrigger>
          </TabsList>

          {Object.entries(timelineData).map(([category, events]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="flex items-center gap-3 mb-6">
                <IconComponent className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 capitalize">
                  {category} Timeline
                </h2>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-600" />

                <div className="space-y-8">
                  {events.map((event, index) => (
                    <div key={index} className="relative flex items-start gap-6">
                      {/* Timeline dot */}
                      <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-600 rounded-full shadow-lg">
                        <Calendar className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                      </div>

                      {/* Event card */}
                      <Card
                        className="flex-1 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-l-4 border-l-slate-400 dark:border-l-slate-500"
                        onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className="text-xs font-medium">
                                  {event.date}
                                </Badge>
                                <Badge className={`text-xs ${categoryColors[category as keyof typeof categoryColors]}`}>
                                  {event.category}
                                </Badge>
                              </div>
                              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                                {event.title}
                              </CardTitle>
                            </div>
                            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {event.description}
                          </CardDescription>
                          {selectedEvent === index && (
                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                              <Button variant="outline" size="sm" className="mr-2">
                                Learn More
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Globe className="w-4 h-4 mr-1" />
                                Explore Location
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <Card className="inline-block p-6 bg-slate-50 dark:bg-slate-800 border-dashed">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <Users className="w-5 h-5" />
              <span className="text-sm">Click on any event to explore more details and related information</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
