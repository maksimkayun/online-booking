import type { NextConfig } from 'next'

const config: NextConfig = {
    experimental: {
        typedRoutes: true
    },
    webpack: (
        config: any,
        { buildId, dev, isServer, defaultLoaders, webpack }: {
            buildId: string
            dev: boolean
            isServer: boolean
            defaultLoaders: any
            webpack: any
        }
    ) => {
        // Perform customizations to webpack config
        return config
    }
}

export default config