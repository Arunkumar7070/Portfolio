export type Certificate = {
  id: string
  image: string
  label: string
}

export const certificates: Certificate[] = [
  { id: 'cert-1', image: '/certificate_1.png', label: 'Certificate 01' },
  { id: 'cert-2', image: '/certificate_2.png', label: 'Certificate 02' },
]
