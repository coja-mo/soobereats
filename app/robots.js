export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/vendor/', '/dispatch/', '/scheduler/', '/founder/'],
            },
        ],
        sitemap: 'https://soober.ca/sitemap.xml',
    };
}
