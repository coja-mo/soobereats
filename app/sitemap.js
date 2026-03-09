export default function sitemap() {
    const baseUrl = 'https://soober.ca';

    const routes = [
        '', '/about', '/rides', '/rides/airport', '/rides/events',
        '/market', '/community', '/business', '/rewards', '/delivery-zone',
        '/how-it-works', '/faq', '/support', '/contact', '/for-drivers',
        '/academy', '/corporate', '/safety', '/accessibility', '/careers',
        '/investors', '/press', '/socials', '/login', '/download',
        '/checkout', '/account', '/refer', '/links', '/terms', '/privacy',
        '/driver-portal', '/orders', '/status', '/partner', '/changelog',
        '/gift-cards', '/impact', '/pricing',
        '/fleet', '/blog', '/notifications',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route === '/rides' || route === '/market' ? 0.9 : 0.7,
    }));
}
