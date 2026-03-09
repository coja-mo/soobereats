// JSON-LD Structured Data for rich Google Search results
// Add this to layout.js via a <script> tag

export function getOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Soobér',
        alternateName: 'Soober Eats',
        url: 'https://soober.ca',
        logo: 'https://soober.ca/logo.png',
        description: 'Sault Ste. Marie\'s local delivery and mobility platform. 18+ restaurants, electric ride-hailing, Soo MRKT marketplace. 100% electric fleet.',
        foundingDate: '2025',
        sameAs: [
            'https://instagram.com/soobereats',
            'https://tiktok.com/@soobereats',
            'https://facebook.com/soobereats',
            'https://linkedin.com/company/soobereats',
        ],
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Sault Ste. Marie',
            addressRegion: 'ON',
            addressCountry: 'CA',
            postalCode: 'P6A',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Support',
            email: 'support@soober.ca',
            availableLanguage: ['English', 'French'],
        },
        areaServed: {
            '@type': 'GeoCircle',
            geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: 46.5136,
                longitude: -84.3358,
            },
            geoRadius: '30000',
        },
    };
}

export function getWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Soobér',
        url: 'https://soober.ca',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://soober.ca/?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
        },
    };
}

export function getLocalBusinessSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://soober.ca',
        name: 'Soobér',
        description: 'Local food delivery and electric ride-hailing platform serving Sault Ste. Marie and the Algoma District.',
        url: 'https://soober.ca',
        telephone: '+1-705-555-0100',
        email: 'hello@soober.ca',
        priceRange: '$$',
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 46.5136,
            longitude: -84.3358,
        },
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Downtown',
            addressLocality: 'Sault Ste. Marie',
            addressRegion: 'Ontario',
            postalCode: 'P6A',
            addressCountry: 'CA',
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '10:00',
            closes: '23:00',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '847',
            bestRating: '5',
        },
    };
}

export function getFAQSchema(faqs) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

export function getBreadcrumbSchema(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url ? `https://soober.ca${item.url}` : undefined,
        })),
    };
}
