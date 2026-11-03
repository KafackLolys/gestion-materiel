/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Si tu utilises le dossier src/
  // Next le détecte automatiquement, rien à faire ici

  // Exemple si tu veux autoriser des images externes
  images: {
    domains: [],
  },

  // Désactive ESLint au build si besoin
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },

  // Désactive TypeScript errors au build si besoin
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
}

module.exports = nextConfig
