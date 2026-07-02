export type Categoria    = 'cocina' | 'agua' | 'eficiencia' | 'accesorios'
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

  /* ═══════════════════ COCINA ═══════════════════ */

  {
    id: 1,
    slug: 'sistemas-cocina-15',
    categoria: 'cocina',
    nombre: 'Batería de Sistemas de Cocina 15 Piezas',
    serie: 'Línea Completa',
    eslogan: 'Todo lo que tu cocina necesita, en un solo set',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    badge: 'Más Completo',
    img: '/img/productos/bateria-set-15.jpg',
    imgs: ['/img/productos/bateria-set-15.jpg'],
    usos: ['gastronomia-pro', 'familiar', 'vapor'],
    descripcion:
      'El set de 15 piezas reúne el sistema de cocción completo Royal Prestige: sartenes, cacerolas y sistemas de cocina grandes en acero inoxidable con fondo encapsulado, cubriendo desde el desayuno hasta la cena de fin de semana sin repetir una sola pieza.',
    caracteristicas: [
      'Acero inoxidable con fondo encapsulado multicapa',
      'Tapas de vidrio templado con válvula de vapor',
      'Mangos ergonómicos remachados en frío',
      'Compatible con inducción, gas, vitrocerámica y halógeno',
      'Apto para lavavajillas',
      'Garantía de 50 años sin condiciones',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Piezas incluidas': '15',
      'Compatibilidad': 'Inducción · Gas · Vitrocerámica · Halógeno',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Menú Completo de Domingo',
        descripcion: 'Sopa, plato fuerte y guarnición cocinados al mismo tiempo usando distintas piezas del set — cada una calibrada para su propio propósito, desde la cocción lenta hasta el sellado rápido.',
        tecnica: 'Cocción simultánea multi-pieza',
        tiempo: '1 h 30 min',
        dificultad: 'Media',
      },
    ],
  },

  {
    id: 2,
    slug: 'sistemas-cocina-10',
    categoria: 'cocina',
    nombre: 'Batería de Sistemas de Cocina 10 Piezas',
    serie: 'Línea Familiar',
    eslogan: 'El equilibrio perfecto entre variedad y espacio',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/bateria-set-10.jpg',
    imgs: ['/img/productos/bateria-set-10.jpg'],
    usos: ['familiar', 'vapor'],
    descripcion:
      'Diez piezas seleccionadas para la cocina familiar de todos los días — suficientes para variar el menú sin saturar la alacena. Acero inoxidable de alta durabilidad con la misma tecnología de cocción que el resto de la línea Royal Prestige.',
    caracteristicas: [
      'Acero inoxidable de alta durabilidad',
      'Fondo encapsulado para distribución uniforme del calor',
      'Tapas con válvula de vapor regulable',
      'Mangos que se mantienen fríos al tacto',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Piezas incluidas': '10',
      'Compatibilidad': 'Inducción · Gas · Vitrocerámica',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Arroz con Vegetales al Vapor',
        descripcion: 'La tapa con válvula regulable sella el vapor dentro de la pieza — el arroz y las verduras se cocinan juntos sin perder textura ni color.',
        tecnica: 'Cocción al vapor sellada',
        tiempo: '25 min',
        dificultad: 'Fácil',
      },
    ],
  },

  {
    id: 3,
    slug: 'sistemas-cocina-8',
    categoria: 'cocina',
    nombre: 'Batería de Sistemas de Cocina 8 Piezas',
    serie: 'Línea Esencial',
    eslogan: 'Lo esencial para empezar con el estándar correcto',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/bateria-set-8.jpg',
    imgs: ['/img/productos/bateria-set-8.jpg'],
    usos: ['familiar'],
    descripcion:
      'Ocho piezas que cubren la cocina diaria de una pareja o familia pequeña, con la misma calidad de acero inoxidable y garantía que el resto de la línea Royal Prestige — sin pagar de más por piezas que no usarás.',
    caracteristicas: [
      'Acero inoxidable de alta durabilidad',
      'Fondo encapsulado antiadherente natural',
      'Tapas de vidrio templado',
      'Compatible con todo tipo de cocina',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Piezas incluidas': '8',
      'Compatibilidad': 'Inducción · Gas · Vitrocerámica',
      'Garantía': '50 años',
    },
    recetas: [],
  },

  {
    id: 4,
    slug: 'sistemas-cocina-7',
    categoria: 'cocina',
    nombre: 'Batería de Sistemas de Cocina 7 Piezas',
    serie: 'Línea Compacta',
    eslogan: 'Tu entrada al mundo Royal Prestige',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/bateria-set-7.jpg',
    imgs: ['/img/productos/bateria-set-7.jpg'],
    usos: ['familiar'],
    descripcion:
      'Siete piezas cuidadosamente seleccionadas para cubrir las necesidades de cocina diaria con la misma calidad de acero que usa el resto de la familia Royal Prestige — el punto de entrada sin renunciar al estándar.',
    caracteristicas: [
      'Acero inoxidable de alta durabilidad',
      'Fondo encapsulado',
      'Apto para lavavajillas',
      'Compatible con todo tipo de cocina',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Piezas incluidas': '7',
      'Compatibilidad': 'Inducción · Gas · Vitrocerámica',
      'Garantía': '50 años',
    },
    recetas: [],
  },

  {
    id: 5,
    slug: 'sistemas-cocina-grandes',
    categoria: 'cocina',
    nombre: 'Set de Sistemas de Cocina Grandes',
    serie: 'Línea Familiar',
    eslogan: 'Para cuando cocinas para todos',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/ollas-grandes.jpg',
    imgs: ['/img/productos/ollas-grandes.jpg'],
    usos: ['familiar', 'gastronomia-pro'],
    descripcion:
      'Tres piezas de gran capacidad para caldos, guisos y reuniones familiares grandes — el volumen que necesitas cuando la mesa se llena, con la misma construcción de acero inoxidable de toda la línea.',
    caracteristicas: [
      'Acero inoxidable pulido espejo',
      'Gran capacidad — ideal para caldos y guisos de familia numerosa',
      'Asas remachadas de sujeción firme',
      'Tapas ajustadas que retienen la humedad',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Piezas incluidas': '3 tamaños grandes',
      'Compatibilidad': 'Inducción · Gas · Vitrocerámica',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Caldo de Res para 12 Personas',
        descripcion: 'La capacidad grande permite cocinar un caldo generoso de una sola vez — hueso, verduras de raíz y hierbas durante horas a fuego mínimo, sin necesidad de dividir en varias tandas.',
        tecnica: 'Cocción lenta de gran volumen',
        tiempo: '3 h',
        dificultad: 'Fácil',
      },
    ],
  },

  {
    id: 6,
    slug: 'sistema-coccion-presion',
    categoria: 'cocina',
    nombre: 'Sistema de Cocción a Presión Gourmet 6.5 L',
    serie: 'Línea Premium',
    eslogan: 'Tiempo sin renunciar a la profundidad de sabor',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    badge: 'Top Ventas',
    img: '/img/productos/ollas-presion.jpg',
    imgs: ['/img/productos/ollas-presion.jpg'],
    usos: ['gastronomia-pro', 'familiar', 'conservacion'],
    descripcion:
      'Combina la velocidad de la presión con la calidad del acero inoxidable Royal Prestige. Un pollo entero en 20 minutos, legumbres en 8, costillas en 45. Sistema de seguridad múltiple certificado — sin válvula que temer, sin ruido que estrese.',
    caracteristicas: [
      'Acero inoxidable — sin aluminio en contacto con alimentos',
      'Sistema de seguridad múltiple certificado',
      'Válvula de presión graduable — baja, media, alta',
      'Tapa abatible con bloqueo de seguridad automático',
      'Indicador de presión visual',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Capacidad': '6.5 litros',
      'Material': 'Acero inoxidable',
      'Presión de trabajo': 'Graduable — baja, media, alta',
      'Compatibilidad': 'Gas · Vitrocerámica · Inducción',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Pollo Entero en 20 Minutos',
        descripcion: 'Un pollo de 1.5 kg, condimentado con hierbas y ajo, cocido entero a presión máxima con 200 ml de vino blanco. La carne se separa del hueso sin esfuerzo.',
        tecnica: 'Presión alta · Infusión de aromas',
        tiempo: '22 min',
        dificultad: 'Fácil',
      },
      {
        nombre: 'Frijoles Negros desde Cero',
        descripcion: 'Sin remojo previo, listos en 35 minutos a presión alta. Ajo, cebolla, laurel y comino desde el inicio concentran el sabor bajo presión.',
        tecnica: 'Presión sin remojo previo',
        tiempo: '40 min',
        dificultad: 'Fácil',
      },
    ],
  },

  {
    id: 7,
    slug: 'deluxe-easy-release',
    categoria: 'cocina',
    nombre: 'Batería Deluxe Easy Release',
    serie: 'Línea Antiadherente',
    eslogan: 'Antiadherente real, sin comprometer la salud',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    badge: 'Novedad',
    img: '/img/productos/deluxe-easy-release.jpg',
    imgs: ['/img/productos/deluxe-easy-release.jpg', '/img/productos/extension-deluxe-easy-release.jpg'],
    usos: ['familiar', 'reposteria'],
    descripcion:
      'Recubrimiento antiadherente de liberación fácil sobre base de acero — lo que se pega en otras sartenes, aquí sale con agua tibia. Diseño en rojo profundo que identifica la línea, disponible con piezas de extensión para ampliar el set.',
    caracteristicas: [
      'Recubrimiento antiadherente de liberación fácil',
      'Base de acero compatible con inducción',
      'Mangos ergonómicos con acabado suave',
      'Tapas de vidrio templado',
      'Fácil limpieza — apto para lavavajillas',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Recubrimiento': 'Antiadherente Easy Release',
      'Compatibilidad': 'Inducción · Gas · Vitrocerámica',
      'Garantía': '25 años',
    },
    recetas: [
      {
        nombre: 'Tortilla Francesa sin Pegar',
        descripcion: 'El recubrimiento antiadherente permite cocinar huevo sin aceite en exceso — se desliza y se dobla sin romperse, sin dejar residuo en la sartén.',
        tecnica: 'Cocción en seco',
        tiempo: '5 min',
        dificultad: 'Fácil',
      },
    ],
  },

  {
    id: 8,
    slug: 'cacerola-individual',
    categoria: 'cocina',
    nombre: 'Cacerola Individual',
    serie: 'Línea Esencial',
    eslogan: 'La pieza que falta en cualquier cocina',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/casserole.jpg',
    imgs: ['/img/productos/casserole.jpg'],
    usos: ['familiar'],
    descripcion:
      'Una cacerola versátil de acero inoxidable, del tamaño justo para salsas, guarniciones o porciones individuales — la pieza que se usa todos los días y rara vez se menciona.',
    caracteristicas: [
      'Acero inoxidable pulido',
      'Fondo encapsulado de distribución uniforme',
      'Asa remachada de sujeción firme',
      'Compatible con todo tipo de cocina',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Compatibilidad': 'Inducción · Gas · Vitrocerámica',
      'Garantía': '50 años',
    },
    recetas: [],
  },

  {
    id: 9,
    slug: 'hervidor-1-cuarto',
    categoria: 'cocina',
    nombre: 'Hervidor 1 Cuarto',
    serie: 'Línea Esencial',
    eslogan: 'Precisión en la medida justa',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/hervidor-un-cuarto.jpg',
    imgs: ['/img/productos/hervidor-un-cuarto.jpg'],
    usos: ['familiar', 'reposteria'],
    descripcion:
      'Hervidor de acero inoxidable de 1 cuarto de capacidad, ideal para salsas, leche o porciones para uno o dos — con la misma construcción de fondo encapsulado del resto de la línea.',
    caracteristicas: [
      'Acero inoxidable con fondo encapsulado',
      'Mango que se mantiene frío al tacto',
      'Vertedor integrado para servir sin derrames',
      'Compatible con todo tipo de cocina',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Capacidad': '1 cuarto',
      'Material': 'Acero inoxidable',
      'Garantía': '50 años',
    },
    recetas: [],
  },

  {
    id: 10,
    slug: 'hervidor-medio-cuarto',
    categoria: 'cocina',
    nombre: 'Hervidor 1/2 Cuarto',
    serie: 'Línea Esencial',
    eslogan: 'Para las porciones más pequeñas, la misma calidad',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/hervidor-medio-cuarto.jpg',
    imgs: ['/img/productos/hervidor-medio-cuarto.jpg'],
    usos: ['familiar', 'reposteria'],
    descripcion:
      'La versión compacta del hervidor Royal Prestige — perfecta para calentar salsas pequeñas, derretir mantequilla o preparar una sola porción sin usar una pieza de más tamaño del necesario.',
    caracteristicas: [
      'Acero inoxidable con fondo encapsulado',
      'Tamaño compacto para porciones individuales',
      'Mango ergonómico',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Capacidad': '1/2 cuarto',
      'Material': 'Acero inoxidable',
      'Garantía': '50 años',
    },
    recetas: [],
  },

  {
    id: 11,
    slug: 'paellera-14',
    categoria: 'cocina',
    nombre: 'Paellera 14"',
    serie: 'Línea Gourmet',
    eslogan: 'El socarrat perfecto empieza con la superficie correcta',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/paelleras.jpg',
    imgs: ['/img/productos/paelleras.jpg'],
    usos: ['gastronomia-pro', 'familiar'],
    descripcion:
      'Superficie amplia de 14 pulgadas para que el arroz se cocine en una capa fina y pareja — la clave del socarrat, ese fondo dorado y crujiente que define una paella auténtica.',
    caracteristicas: [
      'Superficie amplia de 14"',
      'Acero inoxidable con distribución uniforme del calor',
      'Asas laterales para manejo seguro',
      'Tapa de vidrio templado incluida',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Diámetro': '14"',
      'Material': 'Acero inoxidable',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Paella Valenciana',
        descripcion: 'La superficie amplia permite una capa de arroz perfecta para el socarrat — el calor uniforme garantiza que cada grano reciba la misma cocción desde todos los ángulos.',
        tecnica: 'Socarrat · Absorción de caldo',
        tiempo: '45 min',
        dificultad: 'Alta',
      },
    ],
  },

  {
    id: 12,
    slug: 'paellera-10',
    categoria: 'cocina',
    nombre: 'Paellera 10"',
    serie: 'Línea Gourmet',
    eslogan: 'Formato compacto, mismo resultado',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/paelleras-2.jpg',
    imgs: ['/img/productos/paelleras-2.jpg'],
    usos: ['familiar'],
    descripcion:
      'La versión de 10 pulgadas de la paellera Royal Prestige — ideal para porciones familiares sin necesidad de la superficie extendida del formato grande.',
    caracteristicas: [
      'Diámetro compacto de 10"',
      'Acero inoxidable de distribución uniforme',
      'Tapa de vidrio templado incluida',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Diámetro': '10"',
      'Material': 'Acero inoxidable',
      'Garantía': '50 años',
    },
    recetas: [],
  },

  {
    id: 13,
    slug: 'pavera',
    categoria: 'cocina',
    nombre: 'Pavera Royal Prestige',
    serie: 'Línea Ocasiones Especiales',
    eslogan: 'Para el plato que reúne a toda la familia',
    garantia: '50 años',
    disponibilidad: '3-7-dias',
    img: '/img/productos/pavera.jpg',
    imgs: ['/img/productos/pavera.jpg'],
    usos: ['familiar', 'gastronomia-pro'],
    descripcion:
      'Pieza de gran formato diseñada para pavo, piernas grandes de carne o cualquier plato central de una celebración — construcción de acero inoxidable que retiene y distribuye el calor uniformemente durante cocciones largas.',
    caracteristicas: [
      'Gran capacidad para piezas enteras',
      'Acero inoxidable de alta durabilidad',
      'Tapa ajustada que retiene la humedad',
      'Asas reforzadas para manejo seguro con carga',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Uso recomendado': 'Piezas grandes · Ocasiones especiales',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Pavo Navideño al Horno',
        descripcion: 'La capacidad de la pavera permite cocinar un pavo entero conservando los jugos gracias a la tapa ajustada — el resultado es una carne húmeda incluso en las partes más magras.',
        tecnica: 'Cocción lenta con retención de humedad',
        tiempo: '3 h',
        dificultad: 'Media',
      },
    ],
  },

  {
    id: 14,
    slug: 'planchas',
    categoria: 'cocina',
    nombre: 'Set de Planchas Royal Prestige',
    serie: 'Línea Parrilla',
    eslogan: 'La parrilla, sin salir de la cocina',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/planchas.jpg',
    imgs: ['/img/productos/planchas.jpg'],
    usos: ['gastronomia-pro', 'familiar'],
    descripcion:
      'Tres formatos de plancha — doble, redonda y sencilla — para dorar carnes, vegetales y antojitos con marcas de parrilla, directo sobre la hornilla.',
    caracteristicas: [
      'Tres formatos: doble, redonda y sencilla',
      'Superficie con relieve para marcas de parrilla',
      'Acero de distribución uniforme del calor',
      'Mangos que se mantienen fríos al tacto',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Piezas incluidas': '3 (doble, redonda, sencilla)',
      'Material': 'Acero',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Brochetas a la Parrilla Casera',
        descripcion: 'La plancha con relieve marca la carne igual que una parrilla de carbón, sin salir de la cocina — ideal para brochetas de pollo, res o vegetales.',
        tecnica: 'Marcado directo · Sellado a fuego alto',
        tiempo: '20 min',
        dificultad: 'Fácil',
      },
    ],
  },

  {
    id: 15,
    slug: 'sartenes-gourmet',
    categoria: 'cocina',
    nombre: 'Sartenes Gourmet',
    serie: 'Línea Gourmet',
    eslogan: 'Control de temperatura para resultados de restaurante',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/sartenes-gourmet.jpg',
    imgs: ['/img/productos/sartenes-gourmet.jpg'],
    usos: ['gastronomia-pro', 'familiar'],
    descripcion:
      'Set de sartenes en distintos tamaños, pensadas para el sellado, el salteado y la cocción a fuego directo con el control de un chef — acero inoxidable que responde rápido a los cambios de temperatura.',
    caracteristicas: [
      'Acero inoxidable de respuesta térmica rápida',
      'Distintos tamaños para cada preparación',
      'Mangos ergonómicos remachados',
      'Compatible con todo tipo de cocina, incluido horno',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Compatibilidad': 'Inducción · Gas · Vitrocerámica · Horno',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Salteado de Vegetales a Fuego Alto',
        descripcion: 'El acero responde al instante a los cambios de temperatura — ideal para saltear en movimiento constante sin que los vegetales pierdan color ni textura.',
        tecnica: 'Salteado a fuego alto',
        tiempo: '10 min',
        dificultad: 'Fácil',
      },
    ],
  },

  {
    id: 16,
    slug: 'set-complementario-5',
    categoria: 'cocina',
    nombre: 'Set Complementario 5 Piezas',
    serie: 'Línea Esencial',
    eslogan: 'Completa tu batería con lo que realmente usas',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/set-5-complementario.jpg',
    imgs: ['/img/productos/set-5-complementario.jpg'],
    usos: ['familiar'],
    descripcion:
      'Cinco piezas pensadas para complementar cualquier batería Royal Prestige existente, cubriendo los tamaños intermedios que más se usan en la cocina del día a día.',
    caracteristicas: [
      'Acero inoxidable compatible con toda la línea Royal Prestige',
      'Tamaños intermedios de alta rotación',
      'Tapas de vidrio templado',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Piezas incluidas': '5',
      'Garantía': '50 años',
    },
    recetas: [],
  },

  {
    id: 17,
    slug: 'tazones-mezclar',
    categoria: 'cocina',
    nombre: 'Juego de Tazones para Mezclar',
    serie: 'Línea Repostería',
    eslogan: 'Cinco tamaños, un solo sistema de preparación',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/tazones-mezclar.jpg',
    imgs: ['/img/productos/tazones-mezclar.jpg', '/img/productos/tazones-mezclar-detalle.jpg', '/img/productos/tazones-mezclar-mandolina.jpg'],
    usos: ['reposteria', 'conservacion', 'familiar'],
    descripcion:
      'Cinco tazones de acero inoxidable con tapa hermética, más un accesorio mandolina/rallador incorporado — mezcla, mide, guarda y ralla con un solo sistema apilable que ahorra espacio en la alacena.',
    caracteristicas: [
      'Acero inoxidable con base antideslizante',
      'Tapas herméticas para conservar o transportar',
      'Accesorio mandolina/rallador incluido',
      'Diseño apilable — ahorra espacio de almacenamiento',
      'Apto para lavavajillas',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Piezas incluidas': '5 tazones + accesorio mandolina',
      'Garantía': '25 años',
    },
    recetas: [
      {
        nombre: 'Masa de Repostería sin Ensuciar la Cocina',
        descripcion: 'Los tazones apilables con tapa permiten preparar, tapar y guardar la masa en el mismo recipiente — sin trasvasar entre bowls ni ensuciar más de lo necesario.',
        tecnica: 'Mezcla y reposo en un solo recipiente',
        tiempo: '15 min',
        dificultad: 'Fácil',
      },
    ],
  },

  /* ═══════════════════ AGUA ═══════════════════ */

  {
    id: 18,
    slug: 'fresca-flow',
    categoria: 'agua',
    nombre: 'Fresca Flow',
    serie: 'RoyalPure™ · Ósmosis Inversa',
    eslogan: 'Agua de manantial, directo de tu grifo',
    garantia: '50 años',
    disponibilidad: '3-7-dias',
    badge: 'Sistema Completo',
    img: '/img/productos/fresca-flow.jpg',
    imgs: ['/img/productos/fresca-flow.jpg'],
    usos: ['familiar', 'bebidas'],
    descripcion:
      'Sistema de purificación por ósmosis inversa con grifo dedicado y mineralizador integrado — instalación bajo mesón, sin obras. Convierte el agua de la red en agua de calidad de manantial en segundos, filtrando cloro, metales pesados y microplásticos.',
    caracteristicas: [
      'Ósmosis inversa multietapa',
      'Mineralizador integrado — hidratación real, no solo agua limpia',
      'Grifo dedicado de acabado cromado',
      'Filtro de repuesto con indicador de vida útil',
      'Instalación bajo mesón, sin obras',
      'Garantía de 50 años del sistema',
    ],
    especificaciones: {
      'Tecnología': 'Ósmosis inversa + mineralización',
      'Instalación': 'Bajo mesón, sin obras',
      'Incluye': 'Grifo dedicado, filtro, mineralizador',
      'Garantía': '50 años (sistema)',
    },
    recetas: [
      {
        nombre: 'Agua para Infusiones Premium',
        descripcion: 'El agua mineralizada extrae mejor los polifenoles del té y las hierbas medicinales, sin el sabor a cloro que arruina las infusiones delicadas.',
        tecnica: 'Infusión a temperatura controlada',
        tiempo: '5 min',
        dificultad: 'Fácil',
      },
    ],
  },

  /* ═══════════════════ EFICIENCIA ═══════════════════ */

  {
    id: 19,
    slug: 'barista-kit',
    categoria: 'eficiencia',
    nombre: 'Barista Kit',
    serie: 'Royal Prestige® Café',
    eslogan: 'Todo lo que necesitas para tu ritual de café',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/barista-kit.jpg',
    imgs: ['/img/productos/barista-kit.jpg'],
    usos: ['bebidas', 'familiar'],
    descripcion:
      'Kit completo con los accesorios esenciales para preparar café de especialidad en casa — desde la medida hasta el servicio, en un solo set presentado en estuche.',
    caracteristicas: [
      'Set completo de accesorios de café',
      'Presentación en estuche — ideal para regalo',
      'Materiales de grado alimentario',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Uso recomendado': 'Preparación de café de especialidad',
      'Garantía': '25 años',
    },
    recetas: [],
  },

  {
    id: 20,
    slug: 'barista-prensa-francesa',
    categoria: 'eficiencia',
    nombre: 'Cafetera Prensa Francesa Barista',
    serie: 'Royal Prestige® Café',
    eslogan: 'Extracción completa, sabor sin filtrar',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/barista.jpg',
    imgs: ['/img/productos/barista.jpg'],
    usos: ['bebidas', 'familiar'],
    descripcion:
      'Prensa francesa de doble pared que mantiene la temperatura por más tiempo — el café de grano grueso libera todo su cuerpo y aceites naturales sin pasar por un filtro de papel que los retenga.',
    caracteristicas: [
      'Doble pared — retiene la temperatura por más tiempo',
      'Émbolo de malla fina de acero inoxidable',
      'Diseño que evita quemaduras al servir',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable de doble pared',
      'Uso recomendado': 'Café de grano grueso',
      'Garantía': '25 años',
    },
    recetas: [
      {
        nombre: 'Café de Prensa Francesa Clásico',
        descripcion: 'Grano grueso, agua a 93°C, cuatro minutos de infusión antes de presionar — el resultado es un café con cuerpo completo y los aceites naturales intactos.',
        tecnica: 'Infusión por inmersión',
        tiempo: '6 min',
        dificultad: 'Fácil',
      },
    ],
  },

  {
    id: 21,
    slug: 'chocolatera',
    categoria: 'eficiencia',
    nombre: 'Chocolatera Royal Prestige',
    serie: 'Royal Prestige® Bebidas',
    eslogan: 'El ritual del chocolate caliente, hecho pieza',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/chocolatera.jpg',
    imgs: ['/img/productos/chocolatera.jpg'],
    usos: ['bebidas', 'familiar'],
    descripcion:
      'Jarra especializada para batir y servir chocolate caliente tradicional — diseño con vertedor preciso y acabado decorativo que la hace tan bonita en la mesa como funcional en la estufa.',
    caracteristicas: [
      'Diseño tradicional con vertedor de precisión',
      'Acero inoxidable de calidad alimentaria',
      'Mango ergonómico resistente al calor',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Uso recomendado': 'Chocolate caliente, atoles, bebidas espesas',
      'Garantía': '25 años',
    },
    recetas: [
      {
        nombre: 'Chocolate Caliente Tradicional',
        descripcion: 'Chocolate de mesa batido directamente en la chocolatera hasta espumar — la forma y el vertedor están diseñados específicamente para este ritual.',
        tecnica: 'Batido tradicional',
        tiempo: '10 min',
        dificultad: 'Fácil',
      },
    ],
  },

  {
    id: 22,
    slug: 'expertea',
    categoria: 'eficiencia',
    nombre: 'ExperTea',
    serie: 'Royal Prestige® Bebidas',
    eslogan: 'La infusión perfecta, cada vez',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/expertea.jpg',
    imgs: ['/img/productos/expertea.jpg'],
    usos: ['bebidas', 'familiar'],
    descripcion:
      'Tetera de acero inoxidable diseñada para infusiones de té a la temperatura correcta, con vertedor que evita goteos y mango que se mantiene frío durante todo el servicio.',
    caracteristicas: [
      'Acero inoxidable de calidad alimentaria',
      'Vertedor sin goteo',
      'Mango que se mantiene frío al tacto',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Uso recomendado': 'Té e infusiones',
      'Garantía': '25 años',
    },
    recetas: [
      {
        nombre: 'Té Verde en su Punto',
        descripcion: 'Agua a 80°C, nunca hirviendo, para no amargar las hojas — la ExperTea mantiene la temperatura estable durante toda la infusión.',
        tecnica: 'Infusión a temperatura controlada',
        tiempo: '3 min',
        dificultad: 'Fácil',
      },
    ],
  },

  {
    id: 23,
    slug: 'royal-expreso',
    categoria: 'eficiencia',
    nombre: 'Royal Expreso',
    serie: 'Royal Prestige® Café',
    eslogan: 'Café de cafetería, sin salir de casa',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    badge: 'Dos Tamaños',
    img: '/img/productos/royal-expreso.jpg',
    imgs: ['/img/productos/royal-expreso.jpg'],
    usos: ['bebidas', 'familiar'],
    descripcion:
      'Cafetera moka de aluminio y acero disponible en dos capacidades, para expreso concentrado directo sobre la hornilla — el sistema tradicional italiano con el respaldo de garantía Royal Prestige.',
    caracteristicas: [
      'Disponible en dos capacidades',
      'Base de acero compatible con inducción',
      'Mango resistente al calor',
      'Válvula de seguridad integrada',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Compatibilidad': 'Inducción · Gas · Vitrocerámica',
      'Presentaciones': '2 tamaños',
      'Garantía': '25 años',
    },
    recetas: [
      {
        nombre: 'Expreso Casero Clásico',
        descripcion: 'Café molido fino, agua hasta la válvula, fuego medio hasta escuchar el burbujeo característico — el resultado es un expreso concentrado, listo para tomar solo o con leche.',
        tecnica: 'Extracción por presión de vapor',
        tiempo: '8 min',
        dificultad: 'Fácil',
      },
    ],
  },

  {
    id: 24,
    slug: 'power-blender-fresh-max',
    categoria: 'eficiencia',
    nombre: 'Power Blender Fresh Max',
    serie: 'Royal Prestige® Cocina Rápida',
    eslogan: 'Licuados frescos, en cualquier lugar',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    badge: 'Portátil',
    img: '/img/productos/power-blender-fresh-max.jpg',
    imgs: ['/img/productos/power-blender-fresh-max.jpg'],
    usos: ['bebidas', 'familiar', 'reposteria'],
    descripcion:
      'Licuadora personal recargable, compacta y potente — licúa directo en el vaso de viaje, ideal para batidos rápidos en la mañana o después de entrenar, sin cables ni base fija.',
    caracteristicas: [
      'Motor recargable de alto torque',
      'Licúa directo en vaso de viaje',
      'Cuchillas de acero inoxidable',
      'Diseño compacto y portátil',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Tipo': 'Licuadora personal recargable',
      'Material cuchillas': 'Acero inoxidable',
      'Garantía': '25 años',
    },
    recetas: [
      {
        nombre: 'Batido Verde para Llevar',
        descripcion: 'Espinaca, plátano, agua de coco y semillas — todo directo en el vaso de viaje, listo en menos de un minuto y sin lavar una licuadora entera.',
        tecnica: 'Licuado directo en vaso de viaje',
        tiempo: '2 min',
        dificultad: 'Fácil',
      },
    ],
  },

  {
    id: 25,
    slug: 'power-blender-vaso-vidrio',
    categoria: 'eficiencia',
    nombre: 'Power Blender Vaso de Vidrio',
    serie: 'Royal Prestige® Cocina Rápida',
    eslogan: 'Potencia de cocina profesional en tu mesón',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/power-blender-vaso-vidrio.jpg',
    imgs: ['/img/productos/power-blender-vaso-vidrio.jpg'],
    usos: ['bebidas', 'familiar', 'reposteria'],
    descripcion:
      'Licuadora de mesón con vaso de vidrio resistente a manchas y olores — motor potente para hielo, frutas congeladas y masas espesas sin perder velocidad.',
    caracteristicas: [
      'Vaso de vidrio resistente a manchas y olores',
      'Motor de alto rendimiento — muele hielo sin esfuerzo',
      'Múltiples velocidades más función pulso',
      'Base antideslizante segura',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Material del vaso': 'Vidrio',
      'Velocidades': 'Múltiples + pulso',
      'Garantía': '25 años',
    },
    recetas: [
      {
        nombre: 'Margarita de Hielo Frappé',
        descripcion: 'El motor de alto rendimiento tritura hielo hasta textura de nieve en segundos — la base para cualquier bebida frappé casera.',
        tecnica: 'Triturado de alta velocidad',
        tiempo: '3 min',
        dificultad: 'Fácil',
      },
    ],
  },

  {
    id: 26,
    slug: 'perfect-pop',
    categoria: 'eficiencia',
    nombre: 'Perfect Pop',
    serie: 'Royal Prestige® Snacks',
    eslogan: 'Palomitas caseras, sin aceite ni microondas',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/perfect-pop.jpg',
    imgs: ['/img/productos/perfect-pop.jpg'],
    usos: ['familiar'],
    descripcion:
      'Recipiente especializado para reventar maíz directo sobre la hornilla, sin aceite ni bolsas de microondas — solo el maíz y el calor, con un diseño que evita que se queme.',
    caracteristicas: [
      'Preparación sin aceite',
      'Diseño que distribuye el calor uniformemente',
      'Sin necesidad de bolsas desechables',
      'Fácil de limpiar',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Uso recomendado': 'Palomitas de maíz',
      'Compatibilidad': 'Gas · Vitrocerámica · Inducción',
      'Garantía': '25 años',
    },
    recetas: [
      {
        nombre: 'Palomitas Naturales de la Tarde',
        descripcion: 'Solo maíz y calor — el diseño del recipiente distribuye el calor para que cada grano reviente sin quemarse, sin una gota de aceite.',
        tecnica: 'Calor seco directo',
        tiempo: '5 min',
        dificultad: 'Fácil',
      },
    ],
  },

  {
    id: 27,
    slug: 'salad-machine',
    categoria: 'eficiencia',
    nombre: 'Salad Machine',
    serie: 'Royal Prestige® Cocina Rápida',
    eslogan: 'Ensaladas listas en minutos, sin cuchillo',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/salad-machine.jpg',
    imgs: ['/img/productos/salad-machine.jpg'],
    usos: ['familiar', 'reposteria'],
    descripcion:
      'Sistema manual de corte y rallado que reduce vegetales a juliana, rodajas o ralladura en segundos — sin electricidad, sin cables, listo para guardar en cualquier cajón.',
    caracteristicas: [
      'Múltiples discos de corte intercambiables',
      'Operación manual — sin electricidad',
      'Cuchillas de acero inoxidable',
      'Compacta para almacenar',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Tipo': 'Cortador/rallador manual',
      'Material cuchillas': 'Acero inoxidable',
      'Garantía': '25 años',
    },
    recetas: [
      {
        nombre: 'Ensalada de Repollo en Juliana',
        descripcion: 'El disco de corte fino reduce un repollo entero a juliana pareja en menos de dos minutos — la base perfecta para cualquier ensalada rápida.',
        tecnica: 'Corte en juliana manual',
        tiempo: '5 min',
        dificultad: 'Fácil',
      },
    ],
  },

  {
    id: 28,
    slug: 'smart-temp',
    categoria: 'eficiencia',
    nombre: 'Smart Temp',
    serie: 'Royal Prestige® Tecnología',
    eslogan: 'Sabe cuándo tu sartén está lista, para que tú no adivines',
    garantia: '25 años',
    disponibilidad: '3-7-dias',
    badge: 'Tecnología',
    img: '/img/productos/smart-temp.jpg',
    imgs: ['/img/productos/smart-temp.jpg'],
    usos: ['gastronomia-pro', 'familiar'],
    descripcion:
      'Indicador de temperatura integrado que cambia de color cuando la superficie de cocción alcanza el punto ideal para sellar, saltear o cocinar sin pegar — elimina la adivinanza del precalentado.',
    caracteristicas: [
      'Indicador visual de temperatura óptima',
      'Elimina el precalentado por prueba y error',
      'Compatible con piezas de la línea Royal Prestige',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Función': 'Indicador de temperatura de cocción',
      'Garantía': '25 años',
    },
    recetas: [],
  },

  /* ═══════════════════ ACCESORIOS ═══════════════════ */

  {
    id: 29,
    slug: 'accesorios-precision-series',
    categoria: 'accesorios',
    nombre: 'Accesorios Precision Series 3TM',
    serie: 'Royal Prestige® Precision',
    eslogan: 'Las herramientas de precisión que un chef nunca presta',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/accesorios-precision-series.jpg',
    imgs: ['/img/productos/accesorios-precision-series.jpg'],
    usos: ['gastronomia-pro', 'familiar', 'reposteria'],
    descripcion:
      'Set de utensilios de precisión — pelador, espátulas, batidor y más — diseñados para el trabajo detallado de la cocina profesional, en materiales que resisten el uso diario intenso.',
    caracteristicas: [
      'Set de utensilios de precisión multiuso',
      'Materiales resistentes al uso diario',
      'Diseño ergonómico para trabajo prolongado',
      'Apto para lavavajillas',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Uso recomendado': 'Preparación de precisión',
      'Garantía': '25 años',
    },
    recetas: [],
  },

  {
    id: 30,
    slug: 'cutlery-set',
    categoria: 'accesorios',
    nombre: 'Set de Cuchillos Cutlery',
    serie: 'Cuchillería Royal · Acero Alemán',
    eslogan: 'Precisión y equilibrio en cada corte',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    badge: 'Acero Alemán',
    img: '/img/productos/cutlery-set.jpg',
    imgs: ['/img/productos/cutlery-set.jpg'],
    usos: ['gastronomia-pro', 'familiar'],
    descripcion:
      'El set de cuchillos más completo de la línea Royal Prestige — acero de alto carbono, filo láser de precisión, presentado en bloque de madera que organiza y protege el filo.',
    caracteristicas: [
      'Acero inoxidable de alto carbono',
      'Filo láser ultrapreciso',
      'Bloque de madera incluido',
      'Mango ergonómico triple remachado',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Acero': 'Alto carbono',
      'Incluye': 'Bloque de madera organizador',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Juliana Perfecta de Verduras',
        descripcion: 'El cuchillo de chef con filo láser permite cortes finos y parejos sin esfuerzo — la técnica correcta: guía de nudillos, movimiento de balancín desde la punta.',
        tecnica: 'Técnica de balancín',
        tiempo: '10 min',
        dificultad: 'Media',
      },
    ],
  },

  {
    id: 31,
    slug: 'kitchen-knife-set',
    categoria: 'accesorios',
    nombre: 'Royal Prestige® Kitchen Knife Set',
    serie: 'Cuchillería Royal · Acero Alemán',
    eslogan: 'El set diario para toda tarea de cocina',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/kitchen-knife-set.jpg',
    imgs: ['/img/productos/kitchen-knife-set.jpg'],
    usos: ['gastronomia-pro', 'familiar'],
    descripcion:
      'Set de cuchillos de cocina para el trabajo diario — de la verdura a la proteína, con el mismo acero alemán de alto carbono que distingue a la línea Royal Prestige.',
    caracteristicas: [
      'Acero inoxidable de alto carbono',
      'Set completo para tareas diarias',
      'Mango ergonómico antideslizante',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Acero': 'Alto carbono',
      'Garantía': '50 años',
    },
    recetas: [],
  },

  {
    id: 32,
    slug: 'carving-knife-set',
    categoria: 'accesorios',
    nombre: 'Royal Prestige® Carving Knife Set',
    serie: 'Cuchillería Royal · Acero Alemán',
    eslogan: 'El corte limpio que merece cada asado',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/carving-knife-set.jpg',
    imgs: ['/img/productos/carving-knife-set.jpg'],
    usos: ['gastronomia-pro', 'familiar'],
    descripcion:
      'Cuchillo trinchador y tenedor de servicio, diseñados para cortar carnes asadas en rebanadas limpias y parejas — la pieza central de cualquier mesa de domingo.',
    caracteristicas: [
      'Hoja larga de acero alemán',
      'Tenedor de servicio incluido',
      'Mango ergonómico de sujeción firme',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Acero': 'Alto carbono',
      'Incluye': 'Cuchillo trinchador + tenedor',
      'Garantía': '50 años',
    },
    recetas: [
      {
        nombre: 'Corte de Asado de Domingo',
        descripcion: 'La hoja larga permite rebanadas parejas de un solo movimiento — el tenedor de servicio sostiene la pieza firme sin perder los jugos.',
        tecnica: 'Corte en una sola pasada',
        tiempo: '10 min',
        dificultad: 'Media',
      },
    ],
  },

  {
    id: 33,
    slug: 'steak-knife-set',
    categoria: 'accesorios',
    nombre: 'Royal Prestige® Steak Knife Set',
    serie: 'Cuchillería Royal · Acero Alemán',
    eslogan: 'Un cuchillo de mesa para cada comensal',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/steak-knife-set.jpg',
    imgs: ['/img/productos/steak-knife-set.jpg'],
    usos: ['gastronomia-pro', 'familiar'],
    descripcion:
      'Set de cuchillos de mesa para carne, con filo serrado que corta sin desgarrar — la diferencia entre una cena elegante y una que requiere sierra.',
    caracteristicas: [
      'Filo serrado de acero alemán',
      'Set completo para servicio de mesa',
      'Mango ergonómico',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Acero': 'Alto carbono',
      'Uso recomendado': 'Servicio de mesa',
      'Garantía': '50 años',
    },
    recetas: [],
  },

  {
    id: 34,
    slug: 'cuchillo-santoku-127',
    categoria: 'accesorios',
    nombre: 'Cuchillo Santoku 12.7 cm',
    serie: 'Cuchillería Royal · Acero Alemán',
    eslogan: 'El equilibrio japonés para el corte diario',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/cuchillo-santoku-127.jpg',
    imgs: ['/img/productos/cuchillo-santoku-127.jpg'],
    usos: ['gastronomia-pro', 'familiar'],
    descripcion:
      'Hoja santoku de 12.7 cm con hendiduras que evitan que los alimentos se peguen — versátil para verduras, carnes y pescado en un solo cuchillo.',
    caracteristicas: [
      'Hoja santoku con hendiduras antiadherentes',
      'Acero alemán de alto carbono',
      'Mango triple remachado',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Longitud de hoja': '12.7 cm',
      'Acero': 'Alto carbono',
      'Garantía': '50 años',
    },
    recetas: [],
  },

  {
    id: 35,
    slug: 'cuchillo-santoku-889',
    categoria: 'accesorios',
    nombre: 'Cuchillo Santoku 8.89 cm',
    serie: 'Cuchillería Royal · Acero Alemán',
    eslogan: 'Precisión de bolsillo para cortes pequeños',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/cuchillo-santoku-889.jpg',
    imgs: ['/img/productos/cuchillo-santoku-889.jpg'],
    usos: ['gastronomia-pro', 'familiar'],
    descripcion:
      'Versión compacta del santoku, ideal para ajos, chiles y cortes de precisión donde una hoja grande estorba.',
    caracteristicas: [
      'Hoja compacta de precisión',
      'Acero alemán de alto carbono',
      'Mango ergonómico',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Longitud de hoja': '8.89 cm',
      'Acero': 'Alto carbono',
      'Garantía': '50 años',
    },
    recetas: [],
  },

  {
    id: 36,
    slug: 'cuchillo-multiusos-5',
    categoria: 'accesorios',
    nombre: 'Cuchillo Multiusos Royal Prestige® 5"',
    serie: 'Cuchillería Royal · Acero Alemán',
    eslogan: 'El cuchillo que usas sin pensarlo',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/cuchillo-multiusos-5.jpg',
    imgs: ['/img/productos/cuchillo-multiusos-5.jpg'],
    usos: ['familiar'],
    descripcion:
      'Cuchillo de 5 pulgadas para las tareas de todos los días — de la fruta al sándwich, el que siempre está a la mano en cualquier cocina.',
    caracteristicas: [
      'Hoja de 5" de acero alemán',
      'Versátil para tareas diarias',
      'Mango ergonómico',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Longitud de hoja': '5"',
      'Acero': 'Alto carbono',
      'Garantía': '50 años',
    },
    recetas: [],
  },

  {
    id: 37,
    slug: 'cuchillo-pelar-275',
    categoria: 'accesorios',
    nombre: 'Cuchillo para Pelar Royal Prestige® 2.75"',
    serie: 'Cuchillería Royal · Acero Alemán',
    eslogan: 'Precisión pequeña para el trabajo detallado',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/cuchillo-pelar-2-75.jpg',
    imgs: ['/img/productos/cuchillo-pelar-2-75.jpg'],
    usos: ['familiar', 'reposteria'],
    descripcion:
      'Hoja corta de 2.75 pulgadas para pelar, descorazonar y hacer trabajo de precisión que un cuchillo grande no permite controlar bien.',
    caracteristicas: [
      'Hoja corta de 2.75"',
      'Acero alemán de alto carbono',
      'Control preciso para trabajo detallado',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Longitud de hoja': '2.75"',
      'Acero': 'Alto carbono',
      'Garantía': '50 años',
    },
    recetas: [],
  },

  {
    id: 38,
    slug: 'hacha-cocina',
    categoria: 'accesorios',
    nombre: 'Hacha de Cocina',
    serie: 'Cuchillería Royal · Acero Alemán',
    eslogan: 'Fuerza controlada para cortes que exigen potencia',
    garantia: '50 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/hacha-cocina.jpg',
    imgs: ['/img/productos/hacha-cocina.jpg'],
    usos: ['gastronomia-pro', 'familiar'],
    descripcion:
      'Hoja pesada y ancha para cortar a través de huesos pequeños y cartílago — la herramienta que reemplaza la fuerza bruta por peso y filo bien distribuidos.',
    caracteristicas: [
      'Hoja ancha de acero alemán',
      'Peso balanceado para cortes con fuerza',
      'Mango de sujeción firme',
      'Garantía de 50 años',
    ],
    especificaciones: {
      'Acero': 'Alto carbono',
      'Uso recomendado': 'Cortes con hueso pequeño y cartílago',
      'Garantía': '50 años',
    },
    recetas: [],
  },

  {
    id: 39,
    slug: 'tabla-cortar',
    categoria: 'accesorios',
    nombre: 'Tabla para Cortar',
    serie: 'Accesorios Premium',
    eslogan: 'La superficie que todo chef serio merece',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/tabla-cortar.jpg',
    imgs: ['/img/productos/tabla-cortar.jpg'],
    usos: ['gastronomia-pro', 'familiar'],
    descripcion:
      'Tabla de madera de alta densidad con superficie antibacterial natural, del tamaño suficiente para trabajar con espacio real — la base de cualquier mise en place profesional.',
    caracteristicas: [
      'Madera de alta densidad — antibacterial natural',
      'Sistema antideslizante integrado',
      'Ranura perimetral para captura de jugos',
      'No requiere aceite de mantenimiento frecuente',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Material': 'Madera de alta densidad',
      'Antideslizante': 'Sí, integrado',
      'Garantía': '25 años',
    },
    recetas: [
      {
        nombre: 'Mise en Place Profesional',
        descripcion: 'El ritual antes de cocinar — todos los ingredientes cortados y organizados sobre una superficie amplia que permite cortar, empujar a un lado y continuar sin cambiar de tabla.',
        tecnica: 'Organización · Mise en place',
        tiempo: '20 min',
        dificultad: 'Fácil',
      },
    ],
  },

  {
    id: 40,
    slug: 'base-magnetica',
    categoria: 'accesorios',
    nombre: 'Base Magnética',
    serie: 'Accesorios Premium',
    eslogan: 'Tus cuchillos, siempre a la vista y sin filo dañado',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/base-magnetica.jpg',
    imgs: ['/img/productos/base-magnetica.jpg'],
    usos: ['familiar'],
    descripcion:
      'Soporte magnético para organizar cuchillos sin guardarlos en un cajón donde el filo se golpea contra otros utensilios — visibles, accesibles y protegidos.',
    caracteristicas: [
      'Sujeción magnética de alta resistencia',
      'Protege el filo del contacto con otros utensilios',
      'Diseño compacto de mesón',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Tipo': 'Soporte magnético',
      'Garantía': '25 años',
    },
    recetas: [],
  },

  {
    id: 41,
    slug: 'coladores',
    categoria: 'accesorios',
    nombre: 'Set de Coladores',
    serie: 'Accesorios Esenciales',
    eslogan: 'El paso que ninguna receta se salta',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/coladores.jpg',
    imgs: ['/img/productos/coladores.jpg'],
    usos: ['familiar', 'reposteria'],
    descripcion:
      'Set de coladores en distintos tamaños de malla, de acero inoxidable, para escurrir pastas, lavar granos o tamizar harina sin doblarse ni oxidarse con el uso.',
    caracteristicas: [
      'Acero inoxidable resistente a la oxidación',
      'Distintos tamaños de malla incluidos',
      'Asas firmes con apoyo estable',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Piezas incluidas': 'Set de tamaños variados',
      'Garantía': '25 años',
    },
    recetas: [],
  },

  {
    id: 42,
    slug: 'recipiente-utensilios',
    categoria: 'accesorios',
    nombre: 'Recipiente para Utensilios de Cocina',
    serie: 'Accesorios Esenciales',
    eslogan: 'Orden en el mesón, a un brazo de distancia',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/recipiente-utensilios.jpg',
    imgs: ['/img/productos/recipiente-utensilios.jpg'],
    usos: ['familiar'],
    descripcion:
      'Recipiente de acero inoxidable para mantener las cucharas y espátulas de uso frecuente organizadas y al alcance de la mano mientras cocinas.',
    caracteristicas: [
      'Acero inoxidable de fácil limpieza',
      'Base amplia y estable',
      'Diseño que evita que los utensilios se resbalen',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Garantía': '25 años',
    },
    recetas: [],
  },

  {
    id: 43,
    slug: 'utensilios-cocina-6',
    categoria: 'accesorios',
    nombre: 'Set de Utensilios de Cocina 6 Piezas',
    serie: 'Accesorios Esenciales',
    eslogan: 'Los seis utensilios que se usan todos los días',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/utensilios-cocina-6.jpg',
    imgs: ['/img/productos/utensilios-cocina-6.jpg'],
    usos: ['familiar', 'reposteria'],
    descripcion:
      'Espátulas, cucharas y pinzas en un solo set — los seis utensilios que realmente se usan a diario, sin cajón lleno de piezas que nunca tocas.',
    caracteristicas: [
      'Set de 6 piezas esenciales',
      'Materiales resistentes al calor',
      'Diseño ergonómico',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Piezas incluidas': '6',
      'Garantía': '25 años',
    },
    recetas: [],
  },

  {
    id: 44,
    slug: 'cubiertos-americana-24',
    categoria: 'accesorios',
    nombre: 'Juego de Cubiertos Americana 24 Piezas',
    serie: 'Vajilla Royal Prestige',
    eslogan: 'Una mesa completa, servida con estilo',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/cubiertos-americana-24.jpg',
    imgs: ['/img/productos/cubiertos-americana-24.jpg'],
    usos: ['familiar'],
    descripcion:
      'Juego de cubiertos para seis personas en acero inoxidable pulido — cuchillo, tenedor, cuchara y cucharita, con el peso y equilibrio de una vajilla que se pasa de generación en generación.',
    caracteristicas: [
      'Acero inoxidable pulido espejo',
      'Set completo para 6 personas',
      'Resistente a manchas y oxidación',
      'Apto para lavavajillas',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Piezas incluidas': '24 (servicio para 6)',
      'Garantía': '25 años',
    },
    recetas: [],
  },

  {
    id: 45,
    slug: 'juego-servir-complementario',
    categoria: 'accesorios',
    nombre: 'Juego de Servir Complementario',
    serie: 'Vajilla Royal Prestige',
    eslogan: 'Los cubiertos de servicio que faltan en toda mesa',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/juego-servir-complementario.jpg',
    imgs: ['/img/productos/juego-servir-complementario.jpg'],
    usos: ['familiar'],
    descripcion:
      'Set de cubiertos de servicio — pala, tenedor y cuchara grandes — para complementar la vajilla principal en reuniones y comidas familiares.',
    caracteristicas: [
      'Acero inoxidable pulido',
      'Piezas de tamaño de servicio',
      'Diseño que combina con la línea completa',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Garantía': '25 años',
    },
    recetas: [],
  },

  {
    id: 46,
    slug: 'juego-servir-fiesta-6',
    categoria: 'accesorios',
    nombre: 'Juego de Servir Fiesta 6 Piezas',
    serie: 'Vajilla Royal Prestige',
    eslogan: 'Preparado para cualquier celebración',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/juego-servir-fiesta-6.jpg',
    imgs: ['/img/productos/juego-servir-fiesta-6.jpg'],
    usos: ['familiar'],
    descripcion:
      'Seis piezas de servicio variado para reuniones grandes — desde ensaladas hasta postres, cubriendo cada tipo de plato que se sirve en una celebración.',
    caracteristicas: [
      'Set de 6 piezas de servicio variado',
      'Acero inoxidable pulido',
      'Ideal para reuniones y celebraciones',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Piezas incluidas': '6',
      'Garantía': '25 años',
    },
    recetas: [],
  },

  {
    id: 47,
    slug: 'set-deluxe-3',
    categoria: 'accesorios',
    nombre: 'Set Deluxe 3 Piezas',
    serie: 'Vajilla Royal Prestige',
    eslogan: 'Las tres piezas de servicio que más se repiten',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/set-deluxe-3.jpg',
    imgs: ['/img/productos/set-deluxe-3.jpg'],
    usos: ['familiar'],
    descripcion:
      'Cuchara sólida, cuchara ranurada y cuchara para salsa en un set compacto de tres piezas — las herramientas de servicio de mayor rotación en cualquier mesa.',
    caracteristicas: [
      'Set de 3 piezas de alta rotación',
      'Acero inoxidable pulido',
      'Diseño ergonómico',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Piezas incluidas': '3',
      'Garantía': '25 años',
    },
    recetas: [],
  },

  {
    id: 48,
    slug: 'tazas-termicas',
    categoria: 'accesorios',
    nombre: 'Juego de 4 Tazas Térmicas',
    serie: 'Royal Prestige® Café',
    eslogan: 'Tu bebida caliente, caliente por más tiempo',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/tazas-termicas.jpg',
    imgs: ['/img/productos/tazas-termicas.jpg'],
    usos: ['bebidas', 'familiar'],
    descripcion:
      'Cuatro tazas de doble pared en acero inoxidable que mantienen la bebida caliente por más tiempo sin quemar la mano que la sostiene.',
    caracteristicas: [
      'Doble pared aislante',
      'Acero inoxidable de calidad alimentaria',
      'Exterior que no transmite el calor al tacto',
      'Set de 4 unidades',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable de doble pared',
      'Piezas incluidas': '4',
      'Garantía': '25 años',
    },
    recetas: [],
  },

  {
    id: 49,
    slug: 'recipientes-helado',
    categoria: 'accesorios',
    nombre: 'Juego de 2 Recipientes para Helado',
    serie: 'Vajilla Royal Prestige',
    eslogan: 'El postre se sirve bien, o no se sirve',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/recipientes-helado.jpg',
    imgs: ['/img/productos/recipientes-helado.jpg'],
    usos: ['familiar', 'reposteria'],
    descripcion:
      'Par de copas de acero inoxidable pulido para servir helado, postres fríos o frutas — el acabado espejo que hace lucir cualquier postre casero.',
    caracteristicas: [
      'Acero inoxidable pulido espejo',
      'Diseño elegante de copa',
      'Set de 2 unidades',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Material': 'Acero inoxidable',
      'Piezas incluidas': '2',
      'Garantía': '25 años',
    },
    recetas: [],
  },

  {
    id: 50,
    slug: 'royalware-6',
    categoria: 'accesorios',
    nombre: 'Royalware 6 Piezas',
    serie: 'Royal Prestige® Conservación',
    eslogan: 'Guarda más, desperdicia menos',
    garantia: '25 años',
    disponibilidad: 'inmediato',
    img: '/img/productos/royalware-6.jpg',
    imgs: ['/img/productos/royalware-6.jpg'],
    usos: ['conservacion', 'familiar'],
    descripcion:
      'Set de recipientes herméticos apilables en distintos tamaños, para guardar sobras, preparar comidas de la semana o transportar alimentos sin derrames.',
    caracteristicas: [
      'Cierre hermético que evita derrames',
      'Diseño apilable — ahorra espacio en el refrigerador',
      'Apto para microondas y lavavajillas',
      'Set de 6 piezas',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Piezas incluidas': '6',
      'Cierre': 'Hermético',
      'Garantía': '25 años',
    },
    recetas: [],
  },

  {
    id: 51,
    slug: 'royal-shine',
    categoria: 'accesorios',
    nombre: 'Royal Shine',
    serie: 'Royal Prestige® Cuidado',
    eslogan: 'El brillo del primer día, cada día',
    garantia: 'N/A',
    disponibilidad: 'inmediato',
    img: '/img/productos/royal-shine.jpg',
    imgs: ['/img/productos/royal-shine.jpg'],
    usos: ['familiar'],
    descripcion:
      'Limpiador especializado formulado para restaurar el brillo del acero inoxidable Royal Prestige, eliminando marcas de agua y residuos sin rayar la superficie pulida.',
    caracteristicas: [
      'Fórmula especializada para acero inoxidable',
      'Elimina marcas de agua sin rayar',
      'Restaura el brillo original',
      'Uso sencillo con paño suave',
    ],
    especificaciones: {
      'Uso recomendado': 'Acero inoxidable pulido',
      'Presentación': 'Botella dosificadora',
    },
    recetas: [],
  },

  {
    id: 52,
    slug: 'extension-deluxe-easy-release',
    categoria: 'cocina',
    nombre: 'Extensión Deluxe Easy Release',
    serie: 'Línea Antiadherente',
    eslogan: 'Amplía tu batería Deluxe sin perder consistencia',
    garantia: '25 años',
    disponibilidad: '3-7-dias',
    img: '/img/productos/extension-deluxe-easy-release.jpg',
    imgs: ['/img/productos/extension-deluxe-easy-release.jpg'],
    usos: ['familiar'],
    descripcion:
      'Piezas adicionales compatibles con la línea Deluxe Easy Release, para quienes ya tienen el set base y quieren sumar tamaños sin cambiar de línea.',
    caracteristicas: [
      'Compatible con la batería Deluxe Easy Release',
      'Mismo recubrimiento antiadherente de liberación fácil',
      'Acero apto para inducción',
      'Garantía de 25 años',
    ],
    especificaciones: {
      'Compatibilidad': 'Línea Deluxe Easy Release',
      'Garantía': '25 años',
    },
    recetas: [],
  },
]

/* Helpers */
export function getBySlug(slug: string): Producto | undefined {
  return PRODUCTOS.find(p => p.slug === slug)
}

export const CATEGORIAS: { id: Categoria | 'todo'; label: string }[] = [
  { id: 'todo',        label: 'Todo el Catálogo' },
  { id: 'cocina',      label: 'Sistemas de Cocina' },
  { id: 'agua',        label: 'Purificación de Agua' },
  { id: 'eficiencia',  label: 'Eficiencia y Bebidas' },
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
