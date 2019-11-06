/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
    {
        path: '/',
        // Relative to /src/views
        view: 'Home'
    },
    {
        path: '/analyze-test',
        name: 'Analyze Test',
        view: 'Test'
    },
    {
        path: '/analyze-course',
        name: 'Analyze Course',
        view: 'Course'
    },
    {
        path: '/about',
        view: 'About'
    },
    {
        path: '/help',
        view: 'Help'
    },
    {
        path: '/privacy',
        view: 'Privacy'
    }
]
