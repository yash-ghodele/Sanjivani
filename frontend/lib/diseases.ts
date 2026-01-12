// Disease information database
export interface Disease {
    id: string;
    name: string;
    scientificName: string;
    crop: string;
    description: string;
    symptoms: string[];
    causes: string[];
    treatments: {
        chemical: string[];
        organic: string[];
        prevention: string[];
    };
    imageUrl: string;
    severity: 'low' | 'medium' | 'high';
}

export const diseases: Record<string, Disease> = {
    'early-blight': {
        id: 'early-blight',
        name: 'Early Blight',
        scientificName: 'Alternaria solani',
        crop: 'Tomato',
        description: 'Early blight is a common fungal disease affecting tomato plants, characterized by dark brown spots with concentric rings on older leaves.',
        symptoms: [
            'Dark brown spots with concentric rings (target-like pattern) on lower, older leaves',
            'Yellowing of leaves around the spots',
            'Leaf drop starting from the bottom of the plant',
            'Stems may develop dark lesions',
            'Fruit may show leathery, sunken spots near the stem'
        ],
        causes: [
            'Warm, humid weather (75-85°F)',
            'Overhead watering or heavy dew',
            'Infected plant debris in soil',
            'Weakened plants due to nutrient deficiency',
            'Poor air circulation'
        ],
        treatments: {
            chemical: [
                'Apply copper-based fungicides (Copper hydroxide, Copper sulfate)',
                'Use chlorothalonil fungicide every 7-10 days',
                'Mancozeb can be effective for prevention',
                'Rotate fungicides to prevent resistance'
            ],
            organic: [
                'Neem oil spray (apply weekly)',
                'Baking soda solution (1 tbsp per gallon of water)',
                'Compost tea to boost plant immunity',
                'Remove and destroy infected leaves immediately',
                'Apply sulfur-based organic fungicides'
            ],
            prevention: [
                'Use disease-resistant tomato varieties',
                'Practice crop rotation (3-4 year cycle)',
                'Mulch around plants to prevent soil splash',
                'Water at soil level, avoid wetting foliage',
                'Ensure adequate spacing for air circulation',
                'Remove plant debris at end of season',
                'Apply balanced fertilizer to keep plants healthy'
            ]
        },
        imageUrl: 'https://images.pexels.com/photos/6314416/pexels-photo-6314416.jpeg?auto=compress&cs=tinysrgb&w=800',
        severity: 'medium'
    },
    'late-blight': {
        id: 'late-blight',
        name: 'Late Blight',
        scientificName: 'Phytophthora infestans',
        crop: 'Tomato',
        description: 'Late blight is a devastating fungal disease that can destroy entire tomato crops within days under favorable conditions.',
        symptoms: [
            'Water-soaked, grey-green spots on leaves',
            'White fuzzy growth on leaf undersides',
            'Rapid browning and death of leaves',
            'Firm, brown spots on fruits',
            'Blackened stems and plant collapse'
        ],
        causes: [
            'Cool, wet weather (60-70°F)',
            'High humidity and extended leaf wetness',
            'Infected seed potatoes or transplants',
            'Wind-borne spores from infected plants'
        ],
        treatments: {
            chemical: [
                'Apply copper fungicides immediately upon detection',
                'Use systemic fungicides like Ridomil',
                'Spray preventively in cool, wet weather',
                'Apply fungicides to both sides of leaves'
            ],
            organic: [
                'Remove and destroy infected plants immediately',
                'Apply copper soap fungicide',
                'Use biological controls like Bacillus subtilis',
                'Improve air circulation around plants'
            ],
            prevention: [
                'Plant resistant varieties (Mountain Magic, Iron Lady)',
                'Avoid overhead irrigation',
                'Space plants widely for air flow',
                'Monitor weather and apply preventive sprays',
                'Remove volunteer potato and tomato plants',
                'Don\'t compost infected plant material'
            ]
        },
        imageUrl: 'https://images.unsplash.com/photo-1592921870789-04563d55041c?auto=format&fit=crop&q=80&w=800',
        severity: 'high'
    },
    'leaf-mold': {
        id: 'leaf-mold',
        name: 'Leaf Mold',
        scientificName: 'Passalora fulva',
        crop: 'Tomato',
        description: 'Leaf mold is a fungal disease common in greenhouse and high-humidity conditions, primarily affecting leaves.',
        symptoms: [
            'Pale green or yellowish spots on upper leaf surface',
            'Olive-green to brown velvety mold on leaf undersides',
            'Leaves curl and become brittle',
            'Older leaves affected first, progressing upward',
            'Severe cases lead to defoliation'
        ],
        causes: [
            'High humidity (above 85%)',
            'Poor ventilation in greenhouses',
            'Temperatures between 70-80°F',
            'Prolonged leaf wetness'
        ],
        treatments: {
            chemical: [
                'Apply fungicides containing chlorothalonil',
                'Use copper-based sprays',
                'Mancozeb for preventive control'
            ],
            organic: [
                'Increase ventilation to reduce humidity',
                'Remove infected leaves promptly',
                'Apply sulfur-based fungicides',
                'Use biological fungicides (Bacillus subtilis)'
            ],
            prevention: [
                'Maintain humidity below 85%',
                'Ensure good air circulation',
                'Space plants adequately',
                'Use resistant varieties',
                'Avoid overhead watering',
                'Remove lower leaves to improve airflow'
            ]
        },
        imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800',
        severity: 'medium'
    }
};

export function getDiseaseById(id: string): Disease | undefined {
    return diseases[id];
}

export function getAllDiseases(): Disease[] {
    return Object.values(diseases);
}
