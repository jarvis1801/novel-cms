import lazyLoading from './lazyLoading'

export default {
    name: 'NovelMain',
    meta: {
        icon: 'fa-bar-chart-o',
        expanded: true,
        label: 'Novels'
    },
    // component: lazyLoading('novels', true),

    children: [{
            name: 'Novel',
            path: '/novels/list',
            component: lazyLoading('novels/Novel'),
            meta: {
                link: 'novels/Novel.vue'
            }
        },
        {
            name: 'Create Novel',
            path: '/novels/createNovel',
            component: lazyLoading('novels/CreateNovel'),
            meta: {
                link: 'novels/CreateNovel.vue'
            }
        },
        {
            name: 'Volume',
            path: '/novels/volume',
            component: lazyLoading('novels/Volume'),
            meta: {
                link: 'novels/Volume.vue'
            }
        },
        {
            name: 'Create Volume',
            path: '/novels/createVolume',
            component: lazyLoading('novels/CreateVolume'),
            meta: {
                link: 'novels/CreateVolume.vue'
            }
        },
        {
            name: 'Chapter',
            path: '/novels/chapter',
            component: lazyLoading('novels/Chapter'),
            meta: {
                link: 'novels/Chapter.vue'
            }
        },
        {
            name: 'Create Chapter',
            path: '/novels/createChapter',
            component: lazyLoading('novels/CreateChapter'),
            meta: {
                link: 'novels/CreateChapter.vue'
            }
        }
    ]
}