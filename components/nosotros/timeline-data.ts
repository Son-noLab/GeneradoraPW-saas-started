export type MediaItem = {
  type: 'photo' | 'video'
  src: string
  thumb: string
  caption: string
}

export type TimelineEntry = {
  id: string
  year: number
  granularity: 'decade' | 'lustrum' | 'year'
  label: string
  headline: string
  achievement: string
  description: string
  media: MediaItem[]
}

export const TIMELINE: TimelineEntry[] = [
  {
    id: 'decada-2010',
    year: 2010,
    granularity: 'decade',
    label: 'Década 2010',
    headline: 'La semilla del Territorio',
    achievement: 'Fundación del sueño',
    description: 'Una convicción nació en Ecuador: los mejores utensilios del mundo merecen llegar a los mejores hogares ecuatorianos — de la mano de personas comprometidas con el servicio, la honestidad y el crecimiento. Esa convicción se llamó CateonCook.',
    media: [
      { type: 'photo', src: '/img/hero-1.jpg', thumb: '/img/hero-1.jpg', caption: 'Los primeros pasos del Territorio' },
    ],
  },
  {
    id: 'lustro-2015',
    year: 2015,
    granularity: 'lustrum',
    label: 'Lustro 2015',
    headline: 'La comunidad toma forma',
    achievement: 'Primera red de distribuidores',
    description: 'Lo que empezó como una visión individual se convirtió en comunidad. Decenas de emprendedores ecuatorianos encontraron en CateonCook su fábrica de sueños — y juntos construyeron la primera red sólida de socios estratégicos del Territorio.',
    media: [
      { type: 'photo', src: '/img/hero-2.jpg', thumb: '/img/hero-2.jpg', caption: 'Equipo fundador — crecimiento en red' },
    ],
  },
  {
    id: 'ano-2018',
    year: 2018,
    granularity: 'year',
    label: '2018',
    headline: 'Reconocimiento a la excelencia',
    achievement: 'Top Royal Prestige Ecuador',
    description: 'Royal Prestige reconoció a CateonCook entre los distribuidores más destacados del país. No como resultado del volumen, sino de algo más profundo: la calidad humana del equipo, la cultura organizacional y el impacto real en las familias ecuatorianas.',
    media: [],
  },
  {
    id: 'ano-2020',
    year: 2020,
    granularity: 'year',
    label: '2020',
    headline: 'Resiliencia y transformación',
    achievement: 'Modelo digital pionero',
    description: 'Cuando el mundo se detuvo, CateonCook aceleró. Fuimos de los primeros en adoptar la venta y capacitación digital, protegiendo a nuestra comunidad sin perder el toque humano que nos define. La disciplina que predicamos fue la misma que nos sostuvo.',
    media: [
      { type: 'photo', src: '/img/hero-3.jpg', thumb: '/img/hero-3.jpg', caption: 'Transformación digital — sin bajar los brazos' },
    ],
  },
  {
    id: 'ano-2021',
    year: 2021,
    granularity: 'year',
    label: '2021',
    headline: 'Comunidad más fuerte',
    achievement: '500 familias transformadas',
    description: 'Alcanzamos el hito de 500 familias directamente beneficiadas por el Territorio CateonCook. Cada número es una historia real — una cocina mejor equipada, un emprendedor con ingresos propios, un sueño que dejó de ser solo sueño.',
    media: [],
  },
  {
    id: 'ano-2022',
    year: 2022,
    granularity: 'year',
    label: '2022',
    headline: 'Ecuador completo nos conoce',
    achievement: 'Expansión Sierra · Costa · Amazonía',
    description: 'La Comunidad que Nutre cruzó fronteras internas. Sierra, Costa y Amazonía — cada región del país conoció la oportunidad CateonCook. El Territorio demostró que un plan sólido y una cultura auténtica no tienen límites geográficos.',
    media: [],
  },
  {
    id: 'ano-2023',
    year: 2023,
    granularity: 'year',
    label: '2023',
    headline: 'Líderes consolidados',
    achievement: 'Top 3 distribuidores Royal Prestige',
    description: 'Cerramos el año entre los tres distribuidores más importantes de Royal Prestige en el Ecuador. Un logro que no se mide solo en ventas, sino en vidas transformadas, en líderes formados y en una cultura que ya es referente nacional.',
    media: [
      { type: 'photo', src: '/img/hero-4.jpg', thumb: '/img/hero-4.jpg', caption: 'Equipo CateonCook — líderes consolidados 2023' },
    ],
  },
  {
    id: 'ano-2024',
    year: 2024,
    granularity: 'year',
    label: '2024',
    headline: 'Comunidad que Nutre — el concepto',
    achievement: 'Lanzamiento de la propuesta de marketing',
    description: 'Nace oficialmente "Comunidad que Nutre" como concepto integral: Nutre tu Cocina, tu Agua, tu Aire, tu Tiempo y tu Negocio. No es solo un eslogan — es la articulación de todo lo que CateonCook representa para las familias y emprendedores ecuatorianos.',
    media: [],
  },
  {
    id: 'ano-2025',
    year: 2025,
    granularity: 'year',
    label: '2025',
    headline: 'El próximo capítulo',
    achievement: 'En construcción',
    description: 'La historia continúa. Cada día es una nueva oportunidad para sumar historias de éxito a esta línea del tiempo. Nuevos emprendedores, nuevas familias, nuevos sueños cumplidos — dentro del Territorio CateonCook. ¿Será el tuyo el siguiente capítulo?',
    media: [],
  },
]
