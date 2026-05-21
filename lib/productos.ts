export type Categoria    = 'cocina' | 'agua' | 'aire' | 'eficiencia' | 'accesorios'
export type UsoTag       = 'gastronomia-pro' | 'familiar' | 'reposteria' | 'vapor' | 'conservacion' | 'bebidas'
export type Disponibilidad = 'inmediato' | '3-7-dias' | 'bajo-pedido'

export interface Receta {
  nombre: string
  descripcion: string
  tecnica: string
  tiempo: string
  dificultad: 'Fácil' | 'Media' | 'Alta'
}

export interface Producto {
  id: number
  slug: string
  categoria: Categoria
  nombre: string
  serie: string
  eslogan: string
  garantia: string
  disponibilidad: Disponibilidad
  badge?: string
  img: string
  imgs: string[]
  usos: UsoTag[]
  descripcion: string
  caracteristicas: string[]
  especificaciones: Record<string, string>
  recetas: Receta[]
}

export const PRODUCTOS: Producto[] = [

  /* ── BATERÍA ENDURE 17 ─────────────────────────────────────────────── */
  {
    id: 1,
    slug: 'endure-17',
    categoria: 'cocina',
    nombre: 'Batería Endure 17 Piezas',
    serie: 'Serie Endure · Flagship',
    eslogan: 'La colección más completa para quienes no negocian calidad',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    badge: 'Más Vendido',
    img: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['gastronomia-pro', 'familiar', 'vapor'],
    descripcion:
      'La Batería Endure 17 Piezas es la colección insignia de Royal Prestige — el sistema de cocción completo diseñado para familias y profesionales que exigen resultados de nivel gourmet en casa. Con tecnología Surround Heat™, el calor envuelve cada pieza de manera uniforme, eliminando puntos calientes y conservando los nutrientes naturales de cada ingrediente. Acero inoxidable quirúrgico 316L, garantía de 50 años sin condiciones.',
    caracteristicas: [
      'Acero inoxidable quirúrgico 316L — el más puro para contacto alimentario',
      'Tecnología Surround Heat™ — calor en todo el cuerpo de la olla',
      'Fondo multicapa de 5 capas encapsuladas — distribución perfecta',
      'Compatible con inducción, vitrocerámica, gas y halógeno',
      'Mangos ergonómicos remachados en frío — asa fresca siempre',
      'Tapas de acero con válvula de vapor regulable',
      'Sin PFOA, sin PFAS — seguro para toda la familia',
      'Garantía de 50 años sin condiciones',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable 316L',
      'Piezas incluidas': '17 (ollas, sartenes, tapas, vaporera)',
      'Compatibilidad': 'Inducción · Gas · Vitrocerámica · Halógeno',
      'Tecnología': 'Surround Heat™',
      'Fondo': '5 capas encapsuladas',
      'Certificación': 'NSF Internacional',
      'Garantía': '50 años',
      'Origen': 'Estados Unidos',
    },
    recetas: [
      {
        nombre: 'Risotto alla Milanese',
        descripcion: 'El arroz Arborio cocido sin agitación constante gracias al calor uniforme Surround Heat™. El resultado: granos perfectamente al dente, cremosidad natural sin añadir crema. La clave está en el control de temperatura que solo el acero 316L permite mantener.',
        tecnica: 'Cocción controlada · Surround Heat™',
        tiempo: '28 min',
        dificultad: 'Media',
      },
      {
        nombre: 'Ossobuco Milanés',
        descripcion: 'El jarrete de ternera braseado durante 3 horas en la olla de 6 litros. La distribución de calor evita que el colágeno se queme en el fondo — solo transformación lenta y perfecta. Servido con gremolata y risotto.',
        tecnica: 'Braseado largo · Sellado a fuego alto',
        tiempo: '3 h 20 min',
        dificultad: 'Alta',
      },
      {
        nombre: 'Verduras al Vapor Natural',
        descripcion: 'Con la vaporera incluida y el sistema de tapa con válvula regulable, las verduras se cocinan en su propio vapor sin perder vitaminas hidrosolubles. Brócoli, zanahoria y choclo en 8 minutos — color vivo, textura perfecta.',
        tecnica: 'Vapor natural · Sin agua extra',
        tiempo: '8 min',
        dificultad: 'Fácil',
      },
      {
        nombre: 'Caldo de Huesos 24 Horas',
        descripcion: 'El colágeno de los huesos de res se libera lentamente durante 24 horas a fuego mínimo. El acero 316L no transfiere sabores ni metales al caldo. El resultado es un caldo gelificado, mineral y profundo — base de la cocina profesional.',
        tecnica: 'Cocción lenta · Extracción de colágeno',
        tiempo: '24 h',
        dificultad: 'Fácil',
      },
      {
        nombre: 'Paella Valenciana',
        descripcion: 'La sartén de 32 cm de la batería permite una capa de arroz perfecta para la socarrat — ese fondo crujiente y dorado que define una paella auténtica. El Surround Heat™ garantiza que cada grano reciba el mismo calor desde todos los ángulos.',
        tecnica: 'Socarrat · Absorción de caldo',
        tiempo: '45 min',
        dificultad: 'Alta',
      },
    ],
  },

  /* ── BATERÍA ENDURE 12 ─────────────────────────────────────────────── */
  {
    id: 2,
    slug: 'endure-12',
    categoria: 'cocina',
    nombre: 'Batería Endure 12 Piezas',
    serie: 'Serie Endure',
    eslogan: 'El sistema completo para la cocina familiar de alto nivel',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['familiar', 'vapor', 'gastronomia-pro'],
    descripcion:
      'La Batería Endure 12 Piezas combina lo esencial de la cocina diaria en un sistema cohesionado de acero quirúrgico 316L. Diseñada para familias que cocinan con intención — no solo para alimentarse, sino para disfrutar el proceso. Cada pieza trabaja en armonía con las demás.',
    caracteristicas: [
      'Acero inoxidable quirúrgico 316L',
      'Sin PFOA, sin PFAS — seguro para bebés y embarazadas',
      'Mangos ergonómicos remachados en frío',
      'Tapas de vidrio templado con válvula de vapor',
      'Fondo encapsulado de 3 capas',
      'Compatible con todo tipo de cocina',
      'Apto para lavavajillas',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable 316L',
      'Piezas incluidas': '12 (ollas, sartén, tapas)',
      'Compatibilidad': 'Inducción · Gas · Vitrocerámica · Halógeno',
      'Fondo': '3 capas encapsuladas',
      'Garantía': '50 años',
      'Origen': 'Estados Unidos',
    },
    recetas: [
      {
        nombre: 'Pasta Carbonara Auténtica',
        descripcion: 'La olla de 4 litros permite cocinar la pasta con menos agua de lo habitual — el almidón concentrado mejora la cremosidad de la salsa carbonara. Sin nata, solo huevo, guanciale y pecorino. La temperatura controlada evita que el huevo se cuaje.',
        tecnica: 'Reducción de almidón · Emulsión de huevo',
        tiempo: '20 min',
        dificultad: 'Media',
      },
      {
        nombre: 'Guiso de Cordero Especiado',
        descripcion: 'Las piernas de cordero cocinadas durante 2.5 horas en la olla de 6 litros con especias del Medio Oriente. El sellado inicial en acero 316L crea una costra perfecta sin que nada se pegue — solo el sabor de la carne.',
        tecnica: 'Sellado + cocción lenta',
        tiempo: '2 h 40 min',
        dificultad: 'Media',
      },
      {
        nombre: 'Arroz Perfecto sin Agua Extra',
        descripcion: 'Con la técnica Waterless Cooking de Royal Prestige: el arroz solo necesita el agua propia del lavado. La tapa con válvula crea un ambiente de vapor cerrado que cuece cada grano perfectamente. Esponjoso, sin apelmazarse.',
        tecnica: 'Waterless Cooking · Vapor sellado',
        tiempo: '15 min',
        dificultad: 'Fácil',
      },
      {
        nombre: 'Sopa de Tomate Asado',
        descripcion: 'Los tomates se asan directamente en la sartén de acero a fuego alto hasta caramelizar. Luego se procesan con caldo de pollo casero. El acero 316L no altera la acidez del tomate — el sabor queda puro, intenso, sin metálicos.',
        tecnica: 'Asado en seco · Caramelización',
        tiempo: '35 min',
        dificultad: 'Fácil',
      },
    ],
  },

  /* ── BATERÍA ENDURE 7 ──────────────────────────────────────────────── */
  {
    id: 3,
    slug: 'endure-7',
    categoria: 'cocina',
    nombre: 'Batería Endure 7 Piezas',
    serie: 'Serie Endure',
    eslogan: 'Tu entrada al mundo Royal Prestige — sin concesiones',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: 'https://images.unsplash.com/photo-1481671703460-040cb8a2d909?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1481671703460-040cb8a2d909?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['familiar', 'vapor'],
    descripcion:
      'La Batería Endure 7 Piezas es la puerta de entrada al sistema Royal Prestige. Siete piezas cuidadosamente seleccionadas para cubrir las necesidades de cocina diaria con la misma calidad de acero quirúrgico 316L que usa el resto de la familia Endure.',
    caracteristicas: [
      'Acero inoxidable quirúrgico 316L',
      'Fondo encapsulado 3 capas',
      'Apto para lavavajillas',
      'Compatible con todo tipo de cocina',
      'Sin PFOA, sin PFAS',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable 316L',
      'Piezas incluidas': '7',
      'Compatibilidad': 'Inducción · Gas · Vitrocerámica',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Huevos Revueltos del Chef',
        descripcion: 'La técnica del chef Gordon Ramsay aplicada en acero 316L: huevos a fuego mínimo, removiendo constantemente, retirando del fuego cada 30 segundos. El acero responde al instante a los cambios de temperatura — el resultado son huevos cremosos, nunca gomosos.',
        tecnica: 'Temperatura mínima · Técnica de remoción',
        tiempo: '5 min',
        dificultad: 'Media',
      },
      {
        nombre: 'Pollo Salteado con Verduras',
        descripcion: 'La sartén de acero a fuego máximo para sellado rápido de pechugas en cuadros. Las verduras añadidas en orden de dureza — el resultado: colores vivos, texturas distintas, proteína jugosa. Sin aceite en exceso.',
        tecnica: 'Wok-style · Sellado rápido',
        tiempo: '15 min',
        dificultad: 'Fácil',
      },
      {
        nombre: 'Salsa Boloñesa Traditional',
        descripcion: 'La olla de 3 litros permite un sofrito perfecto — la cebolla se carameliza lentamente en acero sin riesgo de quemarse. El ragú de carne cocina durante 2 horas a fuego mínimo hasta alcanzar la consistencia tradicional italiana.',
        tecnica: 'Sofrito lento · Reducción',
        tiempo: '2 h 10 min',
        dificultad: 'Fácil',
      },
    ],
  },

  /* ── BATERÍA CLASSIC 9 ─────────────────────────────────────────────── */
  {
    id: 4,
    slug: 'classic-9',
    categoria: 'cocina',
    nombre: 'Batería Classic 9 Piezas',
    serie: 'Serie Classic',
    eslogan: 'La tradición Royal Prestige — durabilidad probada',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['familiar'],
    descripcion:
      'La Batería Classic representa la línea de acceso al universo Royal Prestige sin renunciar al estándar de calidad que define a la marca. Acero inoxidable 18/10, fondo encapsulado y mangos de acero sólido — diseñada para durar generaciones.',
    caracteristicas: [
      'Acero inoxidable 18/10',
      'Fondo encapsulado de aluminio',
      'Mangos de acero fundido sólido',
      'Apto para lavavajillas',
      'Compatible con inducción',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable 18/10',
      'Piezas incluidas': '9',
      'Fondo': 'Aluminio encapsulado',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Estofado de Res Clásico',
        descripcion: 'Cubos de res sellados en la olla de 5 litros, luego cocinados lentamente con verduras de raíz durante 2 horas. El acero 18/10 retiene el calor uniformemente para una cocción pareja.',
        tecnica: 'Sellado + cocción lenta',
        tiempo: '2 h 20 min',
        dificultad: 'Fácil',
      },
      {
        nombre: 'Sopa de Pollo con Fideos',
        descripcion: 'El caldo casero de pollo como base — 3 horas de cocción con carcasa, verduras y hierbas. Los fideos añadidos al final absorben todo el sabor del caldo reducido.',
        tecnica: 'Extracción lenta · Reducción',
        tiempo: '3 h 15 min',
        dificultad: 'Fácil',
      },
    ],
  },

  /* ── SARTÉN TITANIUM 28 cm ─────────────────────────────────────────── */
  {
    id: 5,
    slug: 'titanium-28',
    categoria: 'cocina',
    nombre: 'Sartén Titanium 28 cm',
    serie: 'Línea Titanium',
    eslogan: 'Alta performance antiadherente sin compromisos de salud',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    badge: 'Novedad',
    img: 'https://images.unsplash.com/photo-1540189549336-e6e99b36d44b?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1540189549336-e6e99b36d44b?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['gastronomia-pro', 'familiar', 'reposteria'],
    descripcion:
      'La Sartén Titanium 28 cm eleva el concepto de antiadherente a un estándar de nivel profesional. Cinco capas de titanio puro — el metal más duro y biológicamente neutro — sobre una base de acero. Sin PFOA, sin PFAS. Apta para horno hasta 260°C y compatible con mango desmontable.',
    caracteristicas: [
      'Recubrimiento de titanio en 5 capas',
      'Sin PFOA, sin PFAS — seguro al 100%',
      'Mango desmontable — pasa directo al horno',
      'Apta para horno hasta 260°C',
      'Fondo reforzado compatible con inducción',
      'Fácil limpieza — lo más difícil se va con agua tibia',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Diámetro': '28 cm',
      'Recubrimiento': 'Titanio 5 capas',
      'Temperatura máxima': '260°C (horno)',
      'Compatibilidad': 'Inducción · Gas · Vitrocerámica · Horno',
      'Sin': 'PFOA · PFAS · PTFE pesado',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Atún Rojo Sellado en 90 Segundos',
        descripcion: 'El lomo de atún rojo a temperatura ambiente — la sartén precalentada en seco a fuego máximo. 45 segundos por cada cara, sin mover. El titanio distribuye el calor instantáneamente creando una costra de Maillard perfecta con el interior crudo-rosado. Solo sal en escamas.',
        tecnica: 'Searing · Maillard a alta temperatura',
        tiempo: '5 min',
        dificultad: 'Media',
      },
      {
        nombre: 'Pancakes de Avena Perfectos',
        descripcion: 'Sin mantequilla, sin aceite — el titanio permite cocinar pancakes completamente en seco. La masa de avena y plátano se vierte en la sartén tibia y se cocina hasta que los bordes estén secos. Se voltean solos. Textura esponjosa, fondo dorado uniforme.',
        tecnica: 'Cocción en seco · Sin materia grasa',
        tiempo: '20 min',
        dificultad: 'Fácil',
      },
      {
        nombre: 'Pollo con Piel Crujiente',
        descripcion: 'Los muslos de pollo con piel van en la sartén fría, sin aceite. La grasa de la piel se va derritiendo gradualmente mientras la temperatura sube — el resultado es una piel crocante, dorada, sin quemarse, y una carne jugosa que no se pegó en ningún momento.',
        tecnica: 'Cocción en cold start · Rendering de grasa',
        tiempo: '30 min',
        dificultad: 'Media',
      },
      {
        nombre: 'Crêpes Francesas Clásicas',
        descripcion: 'La masa perfecta de harina, leche, huevo y mantequilla derretida. La sartén ligeramente engrasada con papel absorbente — la capa de titanio garantiza que cada crêpe se despegue sin romperse. Finas como papel, uniformemente doradas.',
        tecnica: 'Capa fina · Despegue preciso',
        tiempo: '30 min',
        dificultad: 'Fácil',
      },
    ],
  },

  /* ── OLLA DE PRESIÓN 6.5L ──────────────────────────────────────────── */
  {
    id: 6,
    slug: 'olla-presion-65',
    categoria: 'cocina',
    nombre: 'Olla de Presión Gourmet 6.5 L',
    serie: 'Línea Premium',
    eslogan: 'Tiempo sin renunciar a la profundidad de sabor',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['gastronomia-pro', 'familiar', 'conservacion'],
    descripcion:
      'La Olla de Presión Gourmet 6.5L combina la velocidad de la presión con la calidad del acero inoxidable 18/10. Cocina un pollo entero en 20 minutos, legumbres en 8 minutos, costillas en 45 minutos. Sistema de seguridad múltiple certificado — sin válvula que temer, sin ruido que stresée.',
    caracteristicas: [
      'Acero inoxidable 18/10 — sin aluminio en contacto con alimentos',
      'Sistema de seguridad múltiple certificado',
      'Válvula de presión graduable — baja, media, alta',
      'Vaporera interna de acero incluida',
      'Tapa abatible con bloqueo de seguridad automático',
      'Indicador de presión visual',
      'Capacidad neta de cocción: 5.5 litros',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Capacidad': '6.5 litros (5.5 L útiles)',
      'Material': 'Acero inoxidable 18/10',
      'Presión de trabajo': '60–90 kPa graduable',
      'Compatibilidad': 'Gas · Vitrocerámica · Inducción',
      'Incluye': 'Vaporera de acero, cesta de cocción',
      'Certificación': 'Seguridad alimentaria EU',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Pollo Entero en 20 Minutos',
        descripcion: 'Un pollo de 1.5 kg, condimentado con hierbas mediterráneas y ajo, cocido entero en la olla a presión máxima con 200ml de vino blanco. La presión inyecta los sabores en la carne. La piel no queda crujiente — pero la carne es perfectamente jugosa y se separa del hueso sin esfuerzo.',
        tecnica: 'Presión alta · Infusión de aromas',
        tiempo: '22 min',
        dificultad: 'Fácil',
      },
      {
        nombre: 'Frijoles Negros desde Cero',
        descripcion: 'Frijoles negros sin remojar previo cocinados en 35 minutos a presión alta. Con ajo, cebolla, laurel y comino desde el inicio — los sabores se concentran bajo presión. El resultado: frijoles enteros, con piel intacta, en un caldo oscuro y espeso.',
        tecnica: 'Presión sin remojo previo',
        tiempo: '40 min',
        dificultad: 'Fácil',
      },
      {
        nombre: 'Costillas de Cerdo Braseadas',
        descripcion: 'Las costillas selladas primero en la base de la olla sin tapa, luego cocinadas con presión y salsa BBQ casera durante 45 minutos. El colágeno se convierte en gelatina, la carne se separa del hueso — terminadas bajo el grill del horno para lacado final.',
        tecnica: 'Sellado previo + presión + grill',
        tiempo: '55 min',
        dificultad: 'Media',
      },
      {
        nombre: 'Flan Casero al Baño María',
        descripcion: 'Los moldes de flan colocados sobre la vaporera con 300ml de agua — la presión crea un baño maría de alta temperatura que cuaja el flan en 8 minutos. Textura perfectamente lisa, sin burbujas, sin grietas. El caramelo no se cristaliza por la humedad.',
        tecnica: 'Baño maría a presión',
        tiempo: '15 min',
        dificultad: 'Media',
      },
    ],
  },

  /* ── ROYALPURE 7 ETAPAS ────────────────────────────────────────────── */
  {
    id: 7,
    slug: 'royalpure-7',
    categoria: 'agua',
    nombre: 'RoyalPure 7 Etapas',
    serie: 'RoyalPure™ · Bajo Mesón',
    eslogan: 'Agua viva en tu grifo — sin garrafones, sin incertidumbre',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    badge: 'Top Ventas',
    img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['familiar', 'bebidas'],
    descripcion:
      'El RoyalPure 7 Etapas transforma el agua de tu grifo en agua de manantial en segundos. Siete etapas de filtración certificadas NSF eliminan cloro, metales pesados, bacterias, virus y microplásticos. La etapa final mineraliza y alcaliniza el agua — hidratación real, no solo limpia.',
    caracteristicas: [
      '7 etapas de filtración certificadas NSF',
      'Elimina cloro, metales pesados, bacterias y virus',
      'Membrana de filtración ultrafina 0.001 micras',
      'Mineralización alcalina en etapa final — pH 7.8–8.5',
      'Capacidad: 200 litros/día',
      'Instalación bajo mesón sin obras',
      'Grifo dedicado incluido (cromo o dorado)',
      'Garantía de 50 años sistema · Filtros cada 12 meses',
    ],
    especificaciones: {
      'Etapas de filtración': '7',
      'Tamaño de filtración': '0.001 micras',
      'Capacidad diaria': '200 litros',
      'pH del agua': '7.8–8.5 (alcalina)',
      'Certificación': 'NSF Internacional',
      'Instalación': 'Bajo mesón, sin obras',
      'Vida del filtro': '12 meses o 1,500 L',
      'Garantía': '50 años (sistema)',
    },
    recetas: [
      {
        nombre: 'Agua para Infusiones Premium',
        descripcion: 'El agua alcalinizada extrae mejor los polifenoles del té verde y las propiedades de hierbas medicinales. A 80°C (no hervir), el agua RoyalPure produce infusiones más claras, más aromáticas y sin el sabor a cloro que arruina los tés delicados.',
        tecnica: 'Infusión a temperatura controlada',
        tiempo: '5 min',
        dificultad: 'Fácil',
      },
      {
        nombre: 'Caldo Base para Cocina Profesional',
        descripcion: 'Los chefs profesionales saben que el agua define la calidad del caldo. Con agua sin cloro ni metales, el caldo de huesos o verduras desarrolla un sabor limpio y puro — sin los sabores extraños que contamina el agua de red sin filtrar.',
        tecnica: 'Base limpia · Sin interferencia',
        tiempo: '4 h',
        dificultad: 'Fácil',
      },
      {
        nombre: 'Pan Artesanal de Masa Madre',
        descripcion: 'El cloro del agua de red mata los microorganismos de la masa madre. Con agua RoyalPure, la fermentación es más activa, el alveolado más pronunciado y el sabor más complejo. El pan del domingo que merece el tiempo que le dedicamos.',
        tecnica: 'Fermentación natural sin cloro',
        tiempo: '18 h',
        dificultad: 'Alta',
      },
    ],
  },

  /* ── ROYALPURE ÓSMOSIS INVERSA ─────────────────────────────────────── */
  {
    id: 8,
    slug: 'royalpure-ro',
    categoria: 'agua',
    nombre: 'RoyalPure Ósmosis Inversa',
    serie: 'RoyalPure™ Pro',
    eslogan: 'El mayor nivel de purificación disponible para el hogar',
    garantia: '50 años',
    disponibilidad: '3-7-dias',
    img: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['familiar', 'bebidas'],
    descripcion:
      'La membrana de ósmosis inversa elimina hasta el 99.9% de todos los contaminantes — incluyendo nitratos, flúor, arsénico y microplásticos. El nivel de purificación más alto disponible para instalación doméstica, con depósito de acero inoxidable de 12 litros.',
    caracteristicas: [
      'Membrana de ósmosis inversa 0.0001 micras',
      'Elimina hasta el 99.9% de contaminantes',
      'Depósito de acero inoxidable 12 L',
      'Dispensador de caudal premium',
      'Pre-filtros sedimento y carbón activado',
      'Post-filtro de pulido carbón de coco',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Tecnología': 'Ósmosis inversa',
      'Tamaño membrana': '0.0001 micras',
      'Depósito': '12 L acero inoxidable',
      'Caudal': '190 L/día',
      'Etapas': '5',
      'Garantía': '50 años (sistema)',
    },
    recetas: [
      {
        nombre: 'Agua para Bebés y Primera Infancia',
        descripcion: 'El agua de ósmosis es la más pura disponible — recomendada por pediatras para preparar fórmulas y purés. Sin nitratos, sin flúor en exceso, sin microplásticos. La salud del primer año se construye con lo más básico y lo más puro.',
        tecnica: 'Purificación extrema · Seguridad máxima',
        tiempo: 'Inmediato',
        dificultad: 'Fácil',
      },
      {
        nombre: 'Kombucha Artesanal',
        descripcion: 'El cultivo de SCOBY requiere agua sin cloro ni flúor que puedan inhibir la fermentación. Con agua de ósmosis, la kombucha desarrolla sus ácidos orgánicos naturales de forma óptima — más efervescente, más compleja, más saludable.',
        tecnica: 'Fermentación sin inhibidores',
        tiempo: '7–14 días',
        dificultad: 'Media',
      },
    ],
  },

  /* ── JARRA FILTRADORA ──────────────────────────────────────────────── */
  {
    id: 9,
    slug: 'jarra-filtradora',
    categoria: 'agua',
    nombre: 'Jarra Filtradora RoyalPure',
    serie: 'RoyalPure™ Portable',
    eslogan: 'Agua filtrada en cualquier lugar, en cualquier momento',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['familiar', 'bebidas'],
    descripcion:
      'La Jarra Filtradora RoyalPure lleva la filtración a donde la necesites — la oficina, el gym, los viajes. Capacidad 3.5 litros, filtro de carbón activado e intercambio iónico, indicador de vida útil. Libre de BPA, diseño elegante.',
    caracteristicas: [
      'Capacidad 3.5 litros',
      'Filtro de carbón activado e intercambio iónico',
      'Indicador digital de vida útil del filtro',
      'Libre de BPA',
      'Diseño ergonómico con tapa de llenado superior',
      'Garantía de 50 años (jarra)',
    ],
    especificaciones: {
      'Capacidad': '3.5 litros (2.5 L filtrados)',
      'Filtración': 'Carbón activado + intercambio iónico',
      'Vida del filtro': '150 litros / 4–6 semanas',
      'Material': 'Tritan libre de BPA',
      'Garantía': '50 años (jarra)',
    },
    recetas: [
      {
        nombre: 'Agua con Gas Natural Casera',
        descripcion: 'El agua bien filtrada es la base de un buen agua con gas. Con un gasificador casero y agua RoyalPure, el resultado es equivalente al agua mineral de alta montaña — sin el plástico del envase, sin el peso de los bidones.',
        tecnica: 'Gasificación natural',
        tiempo: '2 min',
        dificultad: 'Fácil',
      },
    ],
  },

  /* ── ROYALAIRE PRO ─────────────────────────────────────────────────── */
  {
    id: 10,
    slug: 'royalaire-pro',
    categoria: 'aire',
    nombre: 'RoyalAire Pro',
    serie: 'RoyalAire™',
    eslogan: 'El aire que respiras define la salud que construyes',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    badge: 'HEPA H13',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['familiar'],
    descripcion:
      'El RoyalAire Pro combina filtro HEPA H13, carbón activado y ionizador UV en un sistema de purificación de nivel hospitalario para hogares y oficinas de hasta 65 m². Sensor de calidad de aire en tiempo real y modo automático que ajusta la velocidad según la contaminación detectada.',
    caracteristicas: [
      'Filtro HEPA H13 — nivel hospitalario',
      'Pre-filtro + carbón activado + ionizador UV',
      'Elimina virus, bacterias, ácaros y alérgenos al 99.97%',
      'Cobertura hasta 65 m²',
      'Sensor de PM2.5 en tiempo real',
      'Modo silencioso: < 22 dB',
      'Control táctil + app móvil',
      'Garantía de 50 años (unidad)',
    ],
    especificaciones: {
      'Cobertura': '65 m²',
      'Filtro': 'HEPA H13',
      'Adicional': 'Carbón activado + UV ionizador',
      'Ruido mínimo': '22 dB',
      'Sensor': 'PM2.5 en tiempo real',
      'CADR': '350 m³/h',
      'Garantía': '50 años (unidad)',
    },
    recetas: [
      {
        nombre: 'Ambiente para Alérgicos',
        descripcion: 'Los ácaros, el polvo y el pelaje de mascotas son los alérgenos más comunes en hogares cerrados. El RoyalAire Pro filtra el 99.97% de partículas PM2.5 — el resultado es un aire equivalente al de alta montaña, sin restricciones para quienes sufren rinitis o asma.',
        tecnica: 'Filtración HEPA continua',
        tiempo: 'Permanente',
        dificultad: 'Fácil',
      },
      {
        nombre: 'Espacio para Meditación y Yoga',
        descripcion: 'El aire puro potencia la práctica. En modo silencioso (22 dB), el RoyalAire Pro crea un entorno sin partículas ni olores que distraigan la concentración. La ionización UV elimina bacterias del ambiente compartido post-clase.',
        tecnica: 'Ionización + silencio absoluto',
        tiempo: 'Continuo',
        dificultad: 'Fácil',
      },
    ],
  },

  /* ── ROYALAIRE MINI ────────────────────────────────────────────────── */
  {
    id: 11,
    slug: 'royalaire-mini',
    categoria: 'aire',
    nombre: 'RoyalAire Mini',
    serie: 'RoyalAire™',
    eslogan: 'Para habitaciones, cuartos de niños y espacios compactos',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['familiar'],
    descripcion:
      'El RoyalAire Mini es la versión compacta del sistema Pro — diseñado específicamente para dormitorios, cuartos de niños y oficinas privadas de hasta 25 m². Ultra silencioso en modo nocturno, con temporizador programable y pre-filtro lavable.',
    caracteristicas: [
      'Filtro HEPA H11',
      'Pre-filtro lavable — reduce costo de mantenimiento',
      'Cobertura hasta 25 m²',
      'Ultra silencioso: < 28 dB en modo nocturno',
      'Control táctil con temporizador programable',
      'Luz indicadora regulable',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Cobertura': '25 m²',
      'Filtro': 'HEPA H11',
      'Ruido nocturno': '< 28 dB',
      'CADR': '120 m³/h',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Sueño Reparador para Niños',
        descripcion: 'Los niños respirando aire filtrado durante 8 horas desarrollan menos cuadros respiratorios. El modo nocturno elimina el ruido y la luz — el niño no lo nota, pero cada respiración está purificada. Especialmente recomendado en ciudades con alta contaminación exterior.',
        tecnica: 'Filtración nocturna continua',
        tiempo: '8 h',
        dificultad: 'Fácil',
      },
    ],
  },

  /* ── ROYALKITCHEN PRO ──────────────────────────────────────────────── */
  {
    id: 12,
    slug: 'royalkitchen-pro',
    categoria: 'eficiencia',
    nombre: 'RoyalKitchen Pro System',
    serie: 'RoyalKitchen™',
    eslogan: 'Tu asistente culinario todo-en-uno — recupera horas de tu día',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    badge: 'Kit Completo',
    img: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540189549336-e6e99b36d44b?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['gastronomia-pro', 'familiar', 'bebidas', 'reposteria'],
    descripcion:
      'El RoyalKitchen Pro System integra licuadora de alto rendimiento, procesador de alimentos y sistema de calentamiento en un único aparato. Motor 1200W, vaso de acero inoxidable, 8 velocidades más función pulso — para quienes cocinan en serio.',
    caracteristicas: [
      'Motor 1200W con 8 velocidades + pulso',
      'Vaso de acero inoxidable 2 L + vaso personal 600ml',
      'Procesador con cuchillas intercambiables',
      'Función calentamiento hasta 80°C',
      'Base magnética de seguridad certificada',
      'Silenciador integrado — 40% menos ruido',
      'Sin BPA en todos los contactos',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Motor': '1200W',
      'Velocidades': '8 + pulso',
      'Vaso principal': '2 L acero inoxidable',
      'Vaso personal': '600 ml',
      'Temperatura máx.': '80°C (función calor)',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Crema de Tomate Asado al Instante',
        descripcion: 'Los tomates rostizados con ajo y tomillo, trasladados al vaso RoyalKitchen con caldo de pollo caliente. La función de calentamiento mantiene la temperatura durante el procesado — el resultado en 2 minutos es una crema aterciopelada lista para servir.',
        tecnica: 'Licuado caliente · Emulsión',
        tiempo: '12 min',
        dificultad: 'Fácil',
      },
      {
        nombre: 'Leche Vegetal Fresca Cada Mañana',
        descripcion: 'La avena, almendras o coco remojados licuados durante 60 segundos a velocidad máxima. El colador de acero incluido separa el okara. Sin aditivos, sin conservantes — leche vegetal del día, lista en 5 minutos desde la mañana.',
        tecnica: 'Licuado de alta velocidad',
        tiempo: '5 min',
        dificultad: 'Fácil',
      },
      {
        nombre: 'Masa de Repostería en 30 Segundos',
        descripcion: 'La masa de crepes, tortas o galletas mezclada en el vaso RoyalKitchen — sin grumos, sin esfuerzo, sin múltiples recipientes que lavar. El procesador pica las nueces y frutas desecadas a la textura exacta que cada receta necesita.',
        tecnica: 'Mezcla + procesado simultáneo',
        tiempo: '5 min',
        dificultad: 'Fácil',
      },
    ],
  },

  /* ── EXPRIMIDOR ROYAL CITRUS ───────────────────────────────────────── */
  {
    id: 13,
    slug: 'exprimidor-citrus',
    categoria: 'eficiencia',
    nombre: 'Exprimidor Royal Citrus',
    serie: 'Línea Premium',
    eslogan: 'Jugos naturales frescos sin esfuerzo, cada mañana',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['familiar', 'bebidas'],
    descripcion:
      'El Exprimidor Royal Citrus extrae el máximo jugo sin amargor — la velocidad del motor está calibrada para no triturar la membrana blanca que amarga. Motor 70W silencioso, doble filtro, jarra de 1 L libre de BPA.',
    caracteristicas: [
      'Motor 70W silencioso',
      'Doble filtro — controla cantidad de pulpa',
      'Jarra de 1 L libre de BPA',
      'Cono universal para naranja, toronja y limón',
      'Apto para lavavajillas',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Motor': '70W',
      'Capacidad jarra': '1 litro',
      'Filtros': 'Doble (pulpa regulable)',
      'Material jarra': 'Tritan libre de BPA',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Jugo Mañanero Anti-Inflamatorio',
        descripcion: 'Naranja + zanahoria + jengibre rallado + cúrcuma. El exprimidor extrae el jugo de naranja sin amargor, luego se mezcla con el resto en el vaso. Bebido en ayunas activa el sistema digestivo y aporta vitamina C del día completo.',
        tecnica: 'Extracción fría · Sin oxidación',
        tiempo: '5 min',
        dificultad: 'Fácil',
      },
    ],
  },

  /* ── FOODSEAL ──────────────────────────────────────────────────────── */
  {
    id: 14,
    slug: 'foodseal',
    categoria: 'eficiencia',
    nombre: 'Sistema de Vacío FoodSeal',
    serie: 'Conservación Royal',
    eslogan: 'Conserva hasta 5 veces más — menos desperdicio, más ahorro',
    garantia: '50 años',
    disponibilidad: '3-7-dias',
    img: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['familiar', 'conservacion', 'gastronomia-pro'],
    descripcion:
      'El Sistema FoodSeal extrae el aire de bolsas y recipientes herméticos para multiplicar la vida útil de los alimentos. Compatible con técnica sous vide — la misma que usan los chefs de alta cocina para cocciones de precisión.',
    caracteristicas: [
      'Sellador al vacío automático con doble sello',
      'Compatible con sous vide y cocción al vacío',
      'Incluye 20 bolsas reutilizables',
      'Modo seco y húmedo',
      'Sistema de sellado por calor de doble barra',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Potencia': '130W',
      'Sellado': 'Doble barra calefactora',
      'Modos': 'Seco · Húmedo · Marinado',
      'Bolsas incluidas': '20 reutilizables',
      'Compatible con': 'Sous vide',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Sous Vide de Salmón a 52°C',
        descripcion: 'El filete de salmón condimentado con eneldo, limón y mantequilla, sellado al vacío y cocinado en baño maría a 52°C durante 30 minutos. La temperatura exacta coagula perfectamente las proteínas sin resecar — textura de mantequilla, color salmón vivo.',
        tecnica: 'Sous vide · Temperatura de precisión',
        tiempo: '35 min',
        dificultad: 'Media',
      },
      {
        nombre: 'Pechuga Marinada en 20 Minutos',
        descripcion: 'El modo "marinado" del FoodSeal aplica ciclos de vacío y presión que abren los poros de la carne, permitiendo que el marinado penetre profundamente en 20 minutos lo que normalmente toma 12 horas. Pollo más sabroso, más tierno, sin espera.',
        tecnica: 'Marinado acelerado por vacío',
        tiempo: '20 min',
        dificultad: 'Fácil',
      },
    ],
  },

  /* ── CUCHILLOS 7 PIEZAS ────────────────────────────────────────────── */
  {
    id: 15,
    slug: 'cuchillos-7',
    categoria: 'accesorios',
    nombre: 'Set de Cuchillos Profesional 7 Piezas',
    serie: 'Cuchillería Royal · Acero Alemán',
    eslogan: 'Precisión y equilibrio en cada corte — para los que cocinan en serio',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    badge: 'Acero Alemán',
    img: 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566454419290-57a0589c9e07?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['gastronomia-pro', 'familiar'],
    descripcion:
      'El set de cuchillos más completo de la línea Royal — acero de alto carbono alemán, filo láser a 15° de cada lado, dureza 58+ HRC. El bloque de bambú antimicrobial mantiene el filo y organiza tu espacio. Cuchillo de chef, pan, filetear, Santoku, verduras, pelar y tijeras de cocina.',
    caracteristicas: [
      'Acero inoxidable de alto carbono alemán X50CrMoV15',
      'Filo láser ultrapreciso — ángulo 15° por lado',
      'Dureza 58+ HRC — mantiene el filo por más tiempo',
      'Mango ergonómico triple remachado — acero-resina',
      'Bloque de bambú antimicrobial incluido',
      'Resistente al lavavajillas (aunque recomendamos a mano)',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Acero': 'X50CrMoV15 alto carbono alemán',
      'Dureza': '58+ HRC',
      'Ángulo de filo': '15° por lado (30° total)',
      'Mango': 'Triple remachado acero-resina',
      'Incluye': 'Chef 20cm · Pan 20cm · Filetear 18cm · Santoku 17cm · Verduras 14cm · Pelar 9cm · Tijeras',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Juliana Perfecta de Verduras',
        descripcion: 'El cuchillo de chef a 20 cm con filo láser permite cortes de 2mm de grosor en zanahoria, pepino y calabacín sin esfuerzo. La técnica correcta: guía de nudillos, movimiento balancín desde la punta. El resultado: juliana perfecta, uniforme, que cocina de manera pareja.',
        tecnica: 'Técnica de balancín · Guía de nudillos',
        tiempo: '10 min',
        dificultad: 'Media',
      },
      {
        nombre: 'Filetear Pescado Entero',
        descripcion: 'El filetero de 18 cm sigue el esqueleto del pescado con un solo movimiento fluido gracias a su flexibilidad y filo de 15°. Sin desperdicios, sin carne destrozada. Con el Santoku para picar las hierbas a brunoise perfecta.',
        tecnica: 'Fileteo en una pasada',
        tiempo: '8 min',
        dificultad: 'Alta',
      },
    ],
  },

  /* ── TABLA BAMBOO XL ───────────────────────────────────────────────── */
  {
    id: 16,
    slug: 'tabla-bamboo-xl',
    categoria: 'accesorios',
    nombre: 'Tabla de Corte Royal Bamboo XL',
    serie: 'Accesorios Premium',
    eslogan: 'La superficie que todo chef serio merece',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=85&auto=format&fit=crop',
    imgs: [
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=85&auto=format&fit=crop',
    ],
    usos: ['gastronomia-pro', 'familiar'],
    descripcion:
      'La tabla XL de bambú de alta densidad con superficie antibacterial natural. A 45×30 cm con grosor de 2 cm, ofrece espacio para trabajar como un profesional. La ranura perimetral captura jugos y el sistema antideslizante mantiene la tabla fija incluso con las manos mojadas.',
    caracteristicas: [
      'Bambú de densidad alta — antibacterial natural',
      'Dimensiones: 45 × 30 cm, grosor 2 cm',
      'Sistema antideslizante integrado (pies de caucho)',
      'Ranura perimetral para captura de jugos',
      'No requiere aceite de mantenimiento',
      'Apta para cuchillos de alto carbono',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Dimensiones': '45 × 30 cm',
      'Grosor': '2 cm',
      'Material': 'Bambú de densidad alta',
      'Antideslizante': 'Pies de caucho',
      'Ranura': 'Perimetral para jugos',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Mise en Place Profesional',
        descripcion: 'El ritual del chef antes de cocinar — todos los ingredientes cortados, pesados y organizados en la tabla XL. Los 45cm de ancho permiten cortar, empujar a un lado y continuar sin cambiar de superficie. La ranura captura los jugos del pollo o la carne mientras se trabaja.',
        tecnica: 'Organización · Mise en place',
        tiempo: '20 min',
        dificultad: 'Fácil',
      },
    ],
  },
]

/* Helpers */
export function getBySlug(slug: string): Producto | undefined {
  return PRODUCTOS.find(p => p.slug === slug)
}

export const CATEGORIAS: { id: Categoria | 'todo'; label: string }[] = [
  { id: 'todo',        label: 'Todo el Catálogo' },
  { id: 'cocina',      label: 'Batería de Cocina' },
  { id: 'agua',        label: 'Purificación' },
  { id: 'aire',        label: 'Calidad de Aire' },
  { id: 'eficiencia',  label: 'Eficiencia' },
  { id: 'accesorios',  label: 'Accesorios' },
]

export const USOS_TAGS: { id: UsoTag | 'todo'; label: string }[] = [
  { id: 'todo',            label: 'Todos los Usos' },
  { id: 'gastronomia-pro', label: 'Gastronomía Profesional' },
  { id: 'familiar',        label: 'Cocina Familiar' },
  { id: 'reposteria',      label: 'Repostería' },
  { id: 'vapor',           label: 'Cocción al Vapor' },
  { id: 'conservacion',    label: 'Conservación' },
  { id: 'bebidas',         label: 'Bebidas' },
]

export const DISPONIBILIDAD_TAGS: { id: Disponibilidad | 'todo'; label: string }[] = [
  { id: 'todo',          label: 'Cualquier disponibilidad' },
  { id: 'inmediato',     label: 'Disponible ahora' },
  { id: '3-7-dias',      label: '3–7 días' },
  { id: 'bajo-pedido',   label: 'Bajo pedido' },
]
