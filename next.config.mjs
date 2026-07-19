/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      // Las fotos se envían como data URL (base64) dentro del Server Action,
      // así que el límite por defecto de 1MB se queda corto. Con 4MB de imagen
      // original, el base64 puede pesar ~5.3MB; dejamos margen.
      bodySizeLimit: "6mb",
    },
  },
}

export default nextConfig
