import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

interface KnifeType {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  uses: string[];
  history: string;
  care: string;
}

const KnifeTypes: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('chef');
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  // Observador para animaciones al scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    // Observar elementos con animación
    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Datos de los tipos de cuchillos
  const knifeTypes: KnifeType[] = [
    {
      id: 'chef',
      name: 'Cuchillo de Chef',
      description: 'La herramienta más versátil en cualquier cocina. Su hoja ancha y punta afilada permiten realizar todo tipo de cortes con precisión y eficiencia.',
      image: 'https://cdn.shopify.com/s/files/1/0372/6232/7941/products/Wu_estof_Classic_8-inch_Chef_Bobbi_Lin_0348x_58ab572f-cc6f-40b4-9597-451149205c05.jpg?v=1718306645',
      features: [
        'Hoja de 8 a 10 pulgadas para máxima versatilidad',
        'Perfil de hoja curvado para técnica de balanceo',
        'Amplia superficie para aplastar ajos y especias',
        'Punta versátil para trabajos delicados'
      ],
      uses: [
        'Picar, cortar en dados, rebanar y trocear verduras',
        'Deshuesar y filetear carnes',
        'Picar hierbas y especias',
        'Cortar frutas y verduras grandes'
      ],
      history: 'El cuchillo de chef moderno tiene sus raíces en el siglo XIX en Europa, particularmente en Francia donde se le conoce como "couteau de chef". Su diseño ha sido refinado a lo largo de siglos para convertirse en la herramienta multifuncional por excelencia en las cocinas profesionales y hogareñas.',
      care: 'Lave a mano inmediatamente después de usar y seque completamente. Afílelo regularmente con una chaira o piedra de afilar. Guárdelo en un bloque de cuchillos o con protectores de hoja.'
    },
    {
      id: 'santoku',
      name: 'Cuchillo Santoku',
      description: 'Originario de Japón, el Santoku ("tres virtudes") es conocido por su capacidad para cortar, picar y rebanar con precisión. Su diseño permite cortes limpios con un mínimo esfuerzo.',
      image: 'https://acdn-us.mitiendanube.com/stores/003/770/282/products/233500_01-f58a5d5a9a69238fbf16977521542863-1024-1024.jpg',
      features: [
        'Hoja más corta y ligera que el cuchillo de chef (5-7 pulgadas)',
        'Perfil de hoja recta para cortes precisos',
        'A menudo presenta alvéolos para evitar que los alimentos se adhieran',
        'Punta redondeada para mayor seguridad'
      ],
      uses: [
        'Cortes precisos en verduras',
        'Rebanado fino de pescado para sashimi',
        'Corte en juliana y brunoise',
        'Trabajo minucioso con ingredientes delicados'
      ],
      history: 'El Santoku apareció en Japón a mediados del siglo XX como una adaptación del cuchillo tradicional japonés para satisfacer las necesidades de la cocina moderna. Su nombre "santoku" significa "tres virtudes" o "tres usos", refiriéndose a su capacidad para cortar carne, pescado y verduras con igual eficiencia.',
      care: 'Requiere cuidados especiales debido a su afilado tradicional. Nunca use una chaira metálica, solo piedras de afilar japonesas. Evite cortar sobre superficies duras o alimentos congelados que puedan dañar el filo.'
    },
    {
      id: 'nakiri',
      name: 'Cuchillo Nakiri',
      description: 'Especializado en el corte de verduras, el Nakiri cuenta con una hoja rectangular que permite cortes rectos y precisos hasta la tabla, ideal para vegetales de todo tipo.',
      image: 'https://allrightcheftools.com/cdn/shop/articles/que-es-un-cuchillo-nakiri-y-su-funcion-506170.jpg?v=1664141000',
      features: [
        'Hoja recta y rectangular sin punta',
        'Doble filo para cortes precisos',
        'Perfil delgado para mínima resistencia al cortar',
        'Longitud típica de 5-7 pulgadas'
      ],
      uses: [
        'Corte preciso de verduras en rodajas uniformes',
        'Procesamiento de grandes volúmenes de vegetales',
        'Cortes finos y decorativos',
        'Técnica de empuje y tracción sin balanceo'
      ],
      history: 'El Nakiri tiene sus raíces en los cuchillos vegetales japoneses tradicionales. Su diseño ha evolucionado específicamente para la cocina vegetariana budista en Japón. La forma rectangular permite un contacto completo con la tabla de cortar, proporcionando cortes limpios y precisos de vegetales.',
      care: 'Mantenga el filo con piedras de agua japonesas. Séquelo completamente después de usar y guárdelo en un lugar seco. La hoja fina puede ser susceptible a mellas, así que evite cortar huesos o alimentos congelados.'
    },
    {
      id: 'deba',
      name: 'Cuchillo Deba',
      description: 'Diseñado para el procesamiento de pescado, el Deba es un cuchillo japonés robusto con una hoja gruesa que permite cortar a través de espinas pequeñas y desarticular pescados enteros.',
      image: 'https://sharpedgeshop.com/cdn/shop/articles/Japanese_Deba_knife_cover.jpg?v=1692908667',
      features: [
        'Hoja robusta y pesada con un solo filo',
        'Espina gruesa para mayor durabilidad',
        'Longitud típica de 6-8 pulgadas',
        'Punta estrecha para trabajos detallados'
      ],
      uses: [
        'Filetear y desarticular pescados enteros',
        'Cortar a través de espinas pequeñas y cartílagos',
        'Decapitar y preparar pescados de todos los tamaños',
        'Cortar carne de aves con huesos pequeños'
      ],
      history: 'El Deba es un cuchillo tradicional japonés desarrollado específicamente para el trabajo con pescado, esencial en la dieta japonesa. Su diseño se remonta a varios siglos y refleja la importancia del pescado en la cultura culinaria japonesa. A diferencia de muchos cuchillos occidentales, está diseñado para ser usado con técnicas específicas que maximizan la precisión y minimizan el desperdicio.',
      care: 'Límpielo inmediatamente después de usar, especialmente tras contacto con pescado. Mantenga el filo con piedras de agua japonesas y proteja la hoja con aceite de camelia para prevenir la oxidación. Nunca use este cuchillo para cortar huesos duros o alimentos congelados.'
    },
    {
      id: 'paring',
      name: 'Cuchillo Paring',
      description: 'Pequeño pero poderoso, el cuchillo paring es esencial para trabajos detallados. Su tamaño compacto permite un control preciso para pelar, decorar y realizar cortes intrincados.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_940574-MLA70119682182_062023-O.webp',
      features: [
        'Hoja pequeña de 3-4 pulgadas',
        'Punta afilada para trabajos detallados',
        'Mango ergonómico para control preciso',
        'Ligero y maniobrable'
      ],
      uses: [
        'Pelar frutas y verduras',
        'Descorazonar y quitar semillas',
        'Crear decoraciones y garnishes',
        'Trabajos detallados que requieren precisión'
      ],
      history: 'El cuchillo paring evolucionó como una versión más pequeña y manejable del cuchillo de utilidad. Se convirtió en una herramienta imprescindible en las cocinas europeas desde el siglo XVIII, donde se utilizaba para pelado y trabajo decorativo. Su nombre proviene del francés "parer", que significa "recortar" o "preparar".',
      care: 'Debido a su uso frecuente, requiere afilado regular. Lávelo a mano y séquelo completamente. La punta delicada puede dañarse fácilmente, así que guárdelo en una funda protectora o bloque de cuchillos.'
    }
  ];

  // Encontrar el cuchillo seleccionado
  const selectedKnife = knifeTypes.find(knife => knife.id === selectedType) || knifeTypes[0];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://img.freepik.com/premium-photo/casting-steel-various-chef-knife-set-modern-sharp-kitchen-knives-dark-background_206268-15804.jpg"
              alt="Colección de cuchillos profesionales"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative container-custom h-full flex flex-col justify-center text-white">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">LA ANATOMÍA DEL ARTE</h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                Descubre los diferentes tipos de cuchillos, sus características únicas y los usos para los que fueron diseñados
              </p>
            </div>
          </div>
        </section>

        {/* Introducción */}
        <section id="intro" className="py-16 bg-white animate-on-scroll">
          <div className="container-custom">
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                GUÍA DE CUCHILLOS
              </span>
              <h2 className="text-4xl font-bold mb-6 text-primary">
                LA HERRAMIENTA CORRECTA PARA CADA TAREA
              </h2>
              <p className="text-lg text-secondary max-w-3xl mx-auto">
                Un cuchillo bien diseñado es una extensión de la mano del chef. Cada estilo de cuchillo ha sido perfeccionado a lo largo de siglos para realizar tareas específicas con la máxima eficiencia y precisión.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className={`transition-all duration-1000 ${isVisible.intro ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="prose prose-lg max-w-none text-secondary">
                  <p>
                    Al igual que un artista selecciona pinceles específicos para diferentes trazos, un chef elige cuchillos diseñados para tareas particulares. La forma, tamaño, peso y equilibrio de cada cuchillo influyen directamente en su funcionalidad y la técnica necesaria para usarlo.
                  </p>
                  <p>
                    Nuestros cuchillos artesanales honran tanto las tradiciones occidentales como las japonesas, cada una con sus filosofías y enfoques únicos hacia el diseño y la utilización de estas herramientas esenciales.
                  </p>
                  <p>
                    Comprender las diferencias entre los diversos tipos de cuchillos no solo mejorará tu experiencia culinaria, sino que también te ayudará a tomar decisiones informadas a la hora de invertir en estas herramientas que, con el cuidado adecuado, pueden durar toda una vida.
                  </p>
                  <p className="font-semibold text-primary">
                    Explora nuestra guía de cuchillos para descubrir cuál es el más adecuado para tus necesidades culinarias.
                  </p>
                </div>
              </div>

              <div className={`relative transition-all duration-1000 ${isVisible.intro ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <img
                  src="https://www.nothingbutknives.com/wp-content/uploads/2021/05/Damascus-Steel-Pattern-on-a-Folding-KNife-1024x683.jpg"
                  alt="Detalle de cuchillo artesanal"
                  className="rounded-xl shadow-2xl w-full h-auto"
                />
                <div className="absolute -bottom-8 -right-8 bg-accent text-white p-6 rounded-xl shadow-xl">
                  <p className="text-xl font-bold">100%</p>
                  <p className="text-sm">Artesanal</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selector de tipos de cuchillos */}
        <section id="knife-selector" className="py-16 bg-gray-50 animate-on-scroll">
          <div className="container-custom">
            <div className={`mb-12 transition-all duration-1000 ${isVisible['knife-selector'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl font-bold mb-6 text-primary">Tipos de Cuchillos</h2>
              <p className="text-lg text-secondary max-w-3xl">
                Selecciona un tipo de cuchillo para conocer sus características, historia y usos recomendados.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-16">
              {knifeTypes.map((knife) => (
                <button
                  key={knife.id}
                  onClick={() => setSelectedType(knife.id)}
                  className={`p-4 rounded-lg transition-all ${
                    selectedType === knife.id
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-white hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="aspect-square rounded-full overflow-hidden mb-3 mx-auto w-16 h-16 border-2 border-current p-0.5">
                    <img
                      src={knife.image}
                      alt={knife.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <p className="font-medium text-center text-sm">{knife.name}</p>
                </button>
              ))}
            </div>

            {/* Detalles del cuchillo seleccionado */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative p-6 lg:p-10">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                    {selectedKnife.name}
                  </span>
                  <h3 className="text-3xl font-bold mb-6 text-primary">{selectedKnife.name}</h3>
                  <p className="text-lg text-secondary mb-8">{selectedKnife.description}</p>

                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 text-primary">Características</h4>
                    <ul className="space-y-2">
                      {selectedKnife.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-accent mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 text-primary">Usos recomendados</h4>
                    <ul className="space-y-2">
                      {selectedKnife.uses.map((use, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-accent mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="text-secondary">{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={`/shop?type=${selectedKnife.id}`}
                    className="inline-flex items-center bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    Ver {selectedKnife.name}s
                    <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>

                <div className="bg-gray-50 p-6 lg:p-10">
                  <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={selectedKnife.image}
                      alt={selectedKnife.name}
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xl font-semibold mb-4 text-primary">Historia</h4>
                      <p className="text-secondary">{selectedKnife.history}</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold mb-4 text-primary">Cuidado y mantenimiento</h4>
                      <p className="text-secondary">{selectedKnife.care}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Anatomía de un cuchillo */}
        <section id="knife-anatomy" className="py-16 bg-white animate-on-scroll">
          <div className="container-custom">
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['knife-anatomy'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                CONOCIMIENTO ESENCIAL
              </span>
              <h2 className="text-4xl font-bold mb-6 text-primary">
                ANATOMÍA DE UN CUCHILLO
              </h2>
              <p className="text-lg text-secondary max-w-3xl mx-auto">
                Entender las partes de un cuchillo te ayudará a apreciar su diseño y a seleccionar la herramienta perfecta para cada tarea.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={`relative transition-all duration-1000 ${isVisible['knife-anatomy'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="relative">
                  <img
                    src="https://o.quizlet.com/qTNOR06eo27TQIcrCHjmYQ.jpg"
                    alt="Anatomía de un cuchillo"
                    className="rounded-xl shadow-lg"
                  />
                  
                  {/* Marcadores de partes del cuchillo */}
                  <div className="absolute top-[15%] left-[75%]">
                    <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center cursor-pointer relative group">
                      <span>1</span>
                      <div className="absolute left-full ml-2 px-3 py-2 bg-white text-primary rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Punta
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-[30%] left-[55%]">
                    <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center cursor-pointer relative group">
                      <span>2</span>
                      <div className="absolute left-full ml-2 px-3 py-2 bg-white text-primary rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Filo
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-[40%] left-[35%]">
                    <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center cursor-pointer relative group">
                      <span>3</span>
                      <div className="absolute left-full ml-2 px-3 py-2 bg-white text-primary rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Espina
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-[60%] left-[25%]">
                    <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center cursor-pointer relative group">
                      <span>4</span>
                      <div className="absolute left-full ml-2 px-3 py-2 bg-white text-primary rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Talón
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-[70%] left-[15%]">
                    <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center cursor-pointer relative group">
                      <span>5</span>
                      <div className="absolute left-full ml-2 px-3 py-2 bg-white text-primary rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Espiga
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-[50%] left-[5%]">
                    <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center cursor-pointer relative group">
                      <span>6</span>
                      <div className="absolute left-full ml-2 px-3 py-2 bg-white text-primary rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Mango
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`transition-all duration-1000 ${isVisible['knife-anatomy'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                      <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center mr-3">1</span>
                      Punta
                    </h3>
                    <p className="text-secondary ml-9">
                      El extremo delantero afilado de la hoja. Utilizada para trabajos precisos y detallados como decorar o hacer incisiones.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                      <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center mr-3">2</span>
                      Filo
                    </h3>
                    <p className="text-secondary ml-9">
                      El borde afilado de la hoja. La parte que realiza el corte. Su ángulo y tipo de afilado varían según el estilo de cuchillo.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                      <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center mr-3">3</span>
                      Espina
                    </h3>
                    <p className="text-secondary ml-9">
                      La parte superior no afilada de la hoja. Proporciona resistencia y peso al cuchillo. Su grosor indica la robustez de la hoja.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                      <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center mr-3">4</span>
                      Talón
                    </h3>
                    <p className="text-secondary ml-9">
                      La parte trasera del filo, cerca del mango. Es la sección más fuerte de la hoja, utilizada para cortes que requieren más presión.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                      <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center mr-3">5</span>
                      Espiga
                    </h3>
                    <p className="text-secondary ml-9">
                      La prolongación de la hoja que se extiende dentro del mango. Una espiga completa recorre todo el mango, proporcionando mayor resistencia y equilibrio.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                      <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center mr-3">6</span>
                      Mango
                    </h3>
                    <p className="text-secondary ml-9">
                      La parte que se sostiene durante el uso. Puede estar fabricado en diversos materiales como madera, sintéticos o metal. Un buen mango proporciona comodidad, agarre y control.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

       {/* CTA */}
       <section className="py-16 bg-gradient-to-r from-primary to-primary/90 text-white">
          <div className="container-custom text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ENCUENTRA EL CUCHILLO PERFECTO PARA TI
              </h2>
              <p className="text-xl mb-12">
                Explora nuestra colección de cuchillos artesanales, cada uno meticulosamente elaborado para ofrecer rendimiento, equilibrio y belleza excepcionales.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/shop"
                  className="bg-white text-primary hover:bg-gray-100 font-semibold px-10 py-4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Ver Colección
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-10 py-4 rounded-lg transition-all duration-300 hover:shadow-xl"
                >
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tips y Técnicas */}
        <section id="tips" className="py-16 bg-white animate-on-scroll">
          <div className="container-custom">
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.tips ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                CONSEJOS PROFESIONALES
              </span>
              <h2 className="text-4xl font-bold mb-6 text-primary">
                TÉCNICAS DE CORTE FUNDAMENTALES
              </h2>
              <p className="text-lg text-secondary max-w-3xl mx-auto">
                Dominar estas técnicas básicas mejorará tu eficiencia y precisión en la cocina.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Agarre del cuchillo",
                  description: "Sujeta el mango con los tres últimos dedos, coloca el pulgar e índice en lados opuestos de la hoja. Este agarre de 'pinza' proporciona máximo control y precisión.",
                  image: "https://mx.santokuknives.co.uk/cdn/shop/articles/Hand_holding_knife.jpg?v=1620998235"
                },
                {
                  title: "Técnica de balanceo",
                  description: "Mantén la punta del cuchillo en contacto con la tabla mientras balanceas la hoja hacia arriba y abajo. Esto permite cortes eficientes y rápidos en vegetales y hierbas.",
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxTSmSxFOPBlIuPiky4Kca--63QqJT4ijjwQ&s"
                },
                {
                  title: "Juliana y Brunoise",
                  description: "Corta el alimento en láminas finas, apílalas y córtalas en tiras (juliana). Para brunoise, gira las tiras 90° y córtalas en cubos pequeños uniformes.",
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS339LtgvZ7ldqPxO7r9HYLiGTCWgWW4Hr1GA&s"
                },
                {
                  title: "Posición de la mano guía",
                  description: "Curva los dedos como una 'garra' y usa los nudillos como guía para el cuchillo. Esto protege tus dedos mientras mantienes el control del alimento.",
                  image: "https://www.wikihow.com/images_en/thumb/8/83/Hold-a-Knife-Step-7-Version-6.jpg/v4-1200px-Hold-a-Knife-Step-7-Version-6.jpg"
                },
                {
                  title: "Chiffonade",
                  description: "Apila hojas de hierbas, enrollalas firmemente y córtalas en tiras finas. Ideal para albahaca, menta y otras hierbas para garnish o incorporar en platos.",
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCFIGawkj4_iwJ1O6xm5XXpTMGrxJk17xRRw&s"
                },
                {
                  title: "Corte en media luna",
                  description: "Corta vegetales redondos (como cebollas o pepinos) por la mitad y luego en rodajas semicirculares uniformes. Útil para sofritos y guarniciones.",
                  image: "https://i.ytimg.com/vi/sNAZ-OmPScU/maxresdefault.jpg"
                }
              ].map((tip, index) => (
                <div
                  key={index}
                  className={`bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible.tips ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={tip.image}
                      alt={tip.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-primary">{tip.title}</h3>
                    <p className="text-secondary">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-secondary mb-6">
                Perfecciona estas técnicas con cuchillos adecuados para maximizar tu rendimiento en la cocina
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Descubre nuestra colección
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Cuidado de los cuchillos */}
        <section id="care" className="py-16 bg-gray-50 animate-on-scroll">
          <div className="container-custom">
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.care ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                LONGEVIDAD
              </span>
              <h2 className="text-4xl font-bold mb-6 text-primary">
                CUIDADO Y MANTENIMIENTO
              </h2>
              <p className="text-lg text-secondary max-w-3xl mx-auto">
                Un cuchillo bien cuidado puede durar generaciones. Sigue estas pautas esenciales para mantener tus cuchillos en condiciones óptimas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-1000 ${isVisible.care ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                        <svg className="w-6 h-6 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Limpieza adecuada
                      </h3>
                      <p className="text-secondary">
                        Lava tus cuchillos a mano inmediatamente después de usar con agua tibia y jabón suave. Sécalos completamente con un paño suave. Nunca los dejes en remojo ni los pongas en el lavavajillas, donde pueden dañarse por el contacto con otros utensilios y los detergentes abrasivos.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                        <svg className="w-6 h-6 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Afilado regular
                      </h3>
                      <p className="text-secondary">
                        Mantén el filo usando una chaira regularmente para cuchillos occidentales. Para cuchillos japoneses, utiliza piedras de agua japonesas. Un cuchillo afilado no solo es más eficiente, sino también más seguro, ya que requiere menos presión para cortar.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                        <svg className="w-6 h-6 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Almacenamiento apropiado
                      </h3>
                      <p className="text-secondary">
                        Guarda tus cuchillos en un bloque de madera, una barra magnética o con protectores de hoja individuales. Nunca los guardes sueltos en un cajón donde pueden chocar entre sí o dañar el filo.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                        <svg className="w-6 h-6 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Superficie de corte adecuada
                      </h3>
                      <p className="text-secondary">
                        Utiliza siempre tablas de madera o de plástico suave. Evita superficies duras como vidrio, granito o cerámica, que pueden dañar el filo rápidamente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`transition-all duration-1000 ${isVisible.care ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        src="https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/knife-maintenance-section-3.jpg"
                        alt="Mantenimiento de cuchillos"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        src="https://cdn0.uncomo.com/es/posts/9/5/5/como_afilar_un_cuchillo_51559_600.jpg"
                        alt="Afilado de cuchillos"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVAd4Q9BFpyn1c4bf4sqq3a1aBqZK6zmaa_A&s"
                        alt="Almacenamiento de cuchillos"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-accent/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-accent mb-4">Programa de Mantenimiento</h3>
                  <p className="text-secondary mb-4">
                    Ofrecemos un servicio exclusivo de mantenimiento y afilado para nuestros clientes, garantizando que tus cuchillos permanezcan en condiciones óptimas durante toda su vida útil.
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors"
                  >
                    Conoce nuestro programa
                    <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default KnifeTypes;