/**
 * This info was obtained from the following API of the Argentine government:
 * https://apis.datos.gob.ar/georef/api/departamentos?provincia=bsas&max=135
 */

interface Department extends Record<string, any> {
  centroide: {
    lat: number
    lon: number
  }
  id: string
  nombre: string
  provincia: {
    id: string
    nombre: string
  }
}

const raw: {
  cantidad: number
  departamentos: Department[]
  inicio: number
  parametros: {
    provincia: string
    max: number
  }
  total: number
} = {
  cantidad: 135,
  departamentos: [
    {
      centroide: {
        lat: -37.9646159068483,
        lon: -60.2482821323384
      },
      id: '06014',
      nombre: 'Adolfo Gonzales Chaves',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.676806451923,
        lon: -59.7026607444531
      },
      id: '06707',
      nombre: 'Saladillo',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.015826657022,
        lon: -59.1764609497072
      },
      id: '06455',
      nombre: 'Las Flores',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.1928173894529,
        lon: -60.7880234647739
      },
      id: '06686',
      nombre: 'Rojas',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.3286828340822,
        lon: -58.7711786108511
      },
      id: '06252',
      nombre: 'Escobar',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.511853162718,
        lon: -58.7776345982883
      },
      id: '06412',
      nombre: 'José C. Paz',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -38.5841892126256,
        lon: -62.1694174494415
      },
      id: '06056',
      nombre: 'Bahía Blanca',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.2207575658705,
        lon: -59.5194434817548
      },
      id: '06735',
      nombre: 'San Antonio de Areco',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.886933208215,
        lon: -57.5861191040468
      },
      id: '06511',
      nombre: 'Maipú',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -38.2026277127362,
        lon: -58.0718053725136
      },
      id: '06280',
      nombre: 'General Alvarado',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -37.9656831422541,
        lon: -57.743028347627
      },
      id: '06357',
      nombre: 'General Pueyrredón',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -37.4986405981654,
        lon: -57.6432660560016
      },
      id: '06518',
      nombre: 'Mar Chiquita',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -37.3670719558785,
        lon: -57.0633978822493
      },
      id: '06868',
      nombre: 'Villa Gesell',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -37.1110742904936,
        lon: -56.8702834122236
      },
      id: '06644',
      nombre: 'Pinamar',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.650750377237,
        lon: -56.9410029895247
      },
      id: '06336',
      nombre: 'General Lavalle',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.6971678213727,
        lon: -56.7159402751909
      },
      id: '06420',
      nombre: 'La Costa',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.1851030703307,
        lon: -57.6861279818118
      },
      id: '06505',
      nombre: 'Magdalena',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.52653142362,
        lon: -58.5044865130649
      },
      id: '06861',
      nombre: 'Vicente López',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.5721944489319,
        lon: -58.9441413666159
      },
      id: '06672',
      nombre: 'Rauch',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.6106807864965,
        lon: -58.8108985084565
      },
      id: '06560',
      nombre: 'Moreno',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.7703481015398,
        lon: -58.6254456945004
      },
      id: '06427',
      nombre: 'La Matanza',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -37.3364293166464,
        lon: -59.1819827896233
      },
      id: '06791',
      nombre: 'Tandil',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -37.534856250067,
        lon: -61.8890922422146
      },
      id: '06203',
      nombre: 'Coronel Suárez',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.6717775352133,
        lon: -63.0479735266054
      },
      id: '06721',
      nombre: 'Salliqueló',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.8182447703794,
        lon: -58.155461508679
      },
      id: '06091',
      nombre: 'Berazategui',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.466183010272,
        lon: -58.389651959253
      },
      id: '06343',
      nombre: 'General Paz',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.6660345415851,
        lon: -57.9957365952016
      },
      id: '06308',
      nombre: 'General Guido',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -37.1535157186092,
        lon: -57.2306605949345
      },
      id: '06315',
      nombre: 'General Juan Madariaga',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -38.2576421634805,
        lon: -62.2905659977374
      },
      id: '06819',
      nombre: 'Tornquist',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -38.1479172688233,
        lon: -61.2644174529926
      },
      id: '06196',
      nombre: 'Coronel Pringles',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -39.1285652325867,
        lon: -62.7245989548872
      },
      id: '06875',
      nombre: 'Villarino',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.6696214541604,
        lon: -62.0398536742269
      },
      id: '06351',
      nombre: 'General Pinto',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -38.3890731972465,
        lon: -59.5863264400332
      },
      id: '06742',
      nombre: 'San Cayetano',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -38.5118142752579,
        lon: -60.2374173247047
      },
      id: '06833',
      nombre: 'Tres Arroyos',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -38.6708176079735,
        lon: -61.0955505728699
      },
      id: '06189',
      nombre: 'Coronel Dorrego',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -38.2554110045679,
        lon: -59.1673869468897
      },
      id: '06581',
      nombre: 'Necochea',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.6186883086057,
        lon: -57.9039810685242
      },
      id: '06218',
      nombre: 'Chascomús',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.4260558765566,
        lon: -57.3992340402061
      },
      id: '06655',
      nombre: 'Punta Indio',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.8492083919939,
        lon: -57.8948443895452
      },
      id: '06466',
      nombre: 'Lezama',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.1383889592817,
        lon: -58.8829573786215
      },
      id: '06126',
      nombre: 'Campana',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -37.196762082356,
        lon: -63.0560551528803
      },
      id: '06007',
      nombre: 'Adolfo Alsina',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.2711917055859,
        lon: -63.2257521123403
      },
      id: '06616',
      nombre: 'Pellegrini',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.8421497421872,
        lon: -57.9791090925538
      },
      id: '06245',
      nombre: 'Ensenada',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -33.8360668139653,
        lon: -60.5447828161659
      },
      id: '06623',
      nombre: 'Pergamino',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -38.0760763207387,
        lon: -63.0574326099086
      },
      id: '06651',
      nombre: 'Puán',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.7702605023112,
        lon: -62.9541988413061
      },
      id: '06392',
      nombre: 'General Villegas',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.1558361119161,
        lon: -58.5345816568901
      },
      id: '06749',
      nombre: 'San Fernando',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.382019907997,
        lon: -58.5881738725709
      },
      id: '06805',
      nombre: 'Tigre',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.8760968437468,
        lon: -58.5647013731149
      },
      id: '06270',
      nombre: 'Ezeiza',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.0414897439213,
        lon: -57.6574251943684
      },
      id: '06168',
      nombre: 'Castelli',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.8356191132679,
        lon: -58.36737293295
      },
      id: '06028',
      nombre: 'Almirante Brown',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.9298478405731,
        lon: -58.3980842106611
      },
      id: '06648',
      nombre: 'Presidente Perón',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.5464751322689,
        lon: -61.0052501278322
      },
      id: '06413',
      nombre: 'Junín',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.2225197990076,
        lon: -58.1752339039367
      },
      id: '06119',
      nombre: 'Brandsen',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.915487328433,
        lon: -59.9584194881488
      },
      id: '06224',
      nombre: 'Chivilcoy',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.0369685106341,
        lon: -60.2819765918318
      },
      id: '06021',
      nombre: 'Alberti',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.0614122707821,
        lon: -60.6040466528095
      },
      id: '06112',
      nombre: 'Bragado',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.9094243780878,
        lon: -58.9954466211925
      },
      id: '06329',
      nombre: 'General Las Heras',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.7499222140362,
        lon: -61.3743777867738
      },
      id: '06147',
      nombre: 'Carlos Casares',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.8140029646158,
        lon: -58.8478312046572
      },
      id: '06525',
      nombre: 'Marcos Paz',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.9977788912459,
        lon: -61.0496572343522
      },
      id: '06385',
      nombre: 'General Viamonte',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.3797449374452,
        lon: -62.4297895789754
      },
      id: '06154',
      nombre: 'Carlos Tejedor',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.527208971772,
        lon: -60.2302837885052
      },
      id: '06854',
      nombre: '25 de Mayo',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.4812271475831,
        lon: -60.975425441559
      },
      id: '06588',
      nombre: '9 de Julio',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.8836208341768,
        lon: -61.9281257343997
      },
      id: '06609',
      nombre: 'Pehuajó',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.3471436403082,
        lon: -60.1310650281756
      },
      id: '06798',
      nombre: 'Tapalqué',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.0567662720701,
        lon: -62.6350797832329
      },
      id: '06826',
      nombre: 'Trenque Lauquen',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.8346623469788,
        lon: -58.6980799686583
      },
      id: '06301',
      nombre: 'General Belgrano',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.5098267581846,
        lon: -58.7672358382292
      },
      id: '06547',
      nombre: 'Monte',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.481635701192,
        lon: -59.3575118159751
      },
      id: '06693',
      nombre: 'Roque Pérez',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.8576340464573,
        lon: -60.6702054013071
      },
      id: '06595',
      nombre: 'Olavarría',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.7110032783084,
        lon: -58.7419584139756
      },
      id: '06539',
      nombre: 'Merlo',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.8312135656106,
        lon: -58.4769479291405
      },
      id: '06260',
      nombre: 'Esteban Echeverría',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.0118119181559,
        lon: -60.0626641477636
      },
      id: '06077',
      nombre: 'Arrecifes',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.1498445273572,
        lon: -59.8540147848747
      },
      id: '06140',
      nombre: 'Capitán Sarmiento',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.4067977883926,
        lon: -59.8844134882327
      },
      id: '06161',
      nombre: 'Carmen de Areco',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.2710777868364,
        lon: -60.3052878686828
      },
      id: '06714',
      nombre: 'Salto',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.2951342236201,
        lon: -59.1559461316089
      },
      id: '06266',
      nombre: 'Exaltación de la Cruz',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.5521343486779,
        lon: -58.6917835230047
      },
      id: '06760',
      nombre: 'San Miguel',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.4377314289072,
        lon: -59.4731985905145
      },
      id: '06728',
      nombre: 'San Andrés de Giles',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.6973213261419,
        lon: -59.4204811393582
      },
      id: '06532',
      nombre: 'Mercedes',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.4481640053043,
        lon: -58.9033327303822
      },
      id: '06638',
      nombre: 'Pilar',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.5673224195595,
        lon: -59.1584564399668
      },
      id: '06497',
      nombre: 'Luján',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.5992830551765,
        lon: -58.6495253867317
      },
      id: '06408',
      nombre: 'Hurlingham',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.6493861631091,
        lon: -58.6198317111492
      },
      id: '06568',
      nombre: 'Morón',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.6182002950801,
        lon: -60.3543081129662
      },
      id: '06210',
      nombre: 'Chacabuco',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.4873113444512,
        lon: -58.7121372415949
      },
      id: '06515',
      nombre: 'Malvinas Argentinas',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.4971002162064,
        lon: -62.8639077725213
      },
      id: '06847',
      nombre: 'Tres Lomas',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -37.0354309121063,
        lon: -58.4425565239465
      },
      id: '06042',
      nombre: 'Ayacucho',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.8906755108534,
        lon: -62.4185310608382
      },
      id: '06399',
      nombre: 'Guaminí',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.5527719180977,
        lon: -58.5642821761285
      },
      id: '06371',
      nombre: 'General San Martín',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.0704479695471,
        lon: -61.6824583851265
      },
      id: '06469',
      nombre: 'Lincoln',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -37.5165055849878,
        lon: -60.7681481810422
      },
      id: '06448',
      nombre: 'Laprida',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.4868929544319,
        lon: -58.5372090766799
      },
      id: '06756',
      nombre: 'San Isidro',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -37.586110705761,
        lon: -59.8883978406322
      },
      id: '06084',
      nombre: 'Benito Juárez',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -33.885864543958,
        lon: -61.0624837286828
      },
      id: '06175',
      nombre: 'Colón',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.6360716118614,
        lon: -58.6887595155761
      },
      id: '06410',
      nombre: 'Ituzaingó',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.6506156900812,
        lon: -58.9878467982653
      },
      id: '06364',
      nombre: 'General Rodríguez',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.7485741352291,
        lon: -59.7033860485774
      },
      id: '06784',
      nombre: 'Suipacha',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.5960100738691,
        lon: -58.5791883855736
      },
      id: '06840',
      nombre: 'Tres de Febrero',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.8777448240057,
        lon: -58.2585548857898
      },
      id: '06274',
      nombre: 'Florencio Varela',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.0304844816228,
        lon: -59.4293585541147
      },
      id: '06574',
      nombre: 'Navarro',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.1448044957896,
        lon: -58.6910941846835
      },
      id: '06134',
      nombre: 'Cañuelas',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.0715087168304,
        lon: -58.4318120603267
      },
      id: '06778',
      nombre: 'San Vicente',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.2195857860094,
        lon: -59.1457418827425
      },
      id: '06483',
      nombre: 'Lobos',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.0347106495852,
        lon: -60.1331531037654
      },
      id: '06287',
      nombre: 'General Alvear',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.7349707991152,
        lon: -58.2768580209942
      },
      id: '06658',
      nombre: 'Quilmes',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.2029842239612,
        lon: -58.3404430505536
      },
      id: '06630',
      nombre: 'Pila',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -37.3561277769109,
        lon: -61.3441308948924
      },
      id: '06322',
      nombre: 'General La Madrid',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.2989479582916,
        lon: -61.1498600852285
      },
      id: '06105',
      nombre: 'Bolívar',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -37.7146198082264,
        lon: -58.2717475616555
      },
      id: '06063',
      nombre: 'Balcarce',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.2591890205909,
        lon: -61.660187626031
      },
      id: '06406',
      nombre: 'Hipólito Yrigoyen',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.3989376730385,
        lon: -57.6319261244954
      },
      id: '06238',
      nombre: 'Dolores',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.7859352165928,
        lon: -59.696478337621
      },
      id: '06049',
      nombre: 'Azul',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.6408692174847,
        lon: -61.8912495525965
      },
      id: '06231',
      nombre: 'Daireaux',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -37.7706381329573,
        lon: -62.4343829136658
      },
      id: '06700',
      nombre: 'Saavedra',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -38.9616237886799,
        lon: -61.2921466954973
      },
      id: '06553',
      nombre: 'Monte Hermoso',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -38.090052818611,
        lon: -58.6935497786696
      },
      id: '06476',
      nombre: 'Lobería',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.9093551143988,
        lon: -57.8283797724826
      },
      id: '06098',
      nombre: 'Berisso',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -36.3905151218837,
        lon: -57.2738116449804
      },
      id: '06812',
      nombre: 'Tordillo',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -33.9970897980955,
        lon: -59.1282153004682
      },
      id: '06882',
      nombre: 'Zárate',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -33.5871861466481,
        lon: -60.0575064405905
      },
      id: '06665',
      nombre: 'Ramallo',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -33.4829873308981,
        lon: -60.2931487802824
      },
      id: '06763',
      nombre: 'San Nicolás',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.7056542439723,
        lon: -58.3946965048442
      },
      id: '06434',
      nombre: 'Lanús',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.4985652798534,
        lon: -61.6125874742962
      },
      id: '06462',
      nombre: 'Leandro N. Alem',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.2379020431362,
        lon: -61.2833812257449
      },
      id: '06294',
      nombre: 'General Arenales',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.581056985938,
        lon: -63.0947616852349
      },
      id: '06679',
      nombre: 'Rivadavia',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -40.1963833078675,
        lon: -62.8508023633523
      },
      id: '06602',
      nombre: 'Patagones',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -38.8490773280679,
        lon: -61.8355844196542
      },
      id: '06182',
      nombre: 'Coronel de Marina Leonardo Rosales',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -33.9319613769628,
        lon: -59.4927871380553
      },
      id: '06070',
      nombre: 'Baradero',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -33.7809860202918,
        lon: -59.7826260109294
      },
      id: '06770',
      nombre: 'San Pedro',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.8741058055206,
        lon: -62.4017162645879
      },
      id: '06277',
      nombre: 'Florentino Ameghino',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.7549679553956,
        lon: -58.4240954303406
      },
      id: '06490',
      nombre: 'Lomas de Zamora',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -34.6781993084404,
        lon: -58.3411445451106
      },
      id: '06035',
      nombre: 'Avellaneda',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    },
    {
      centroide: {
        lat: -35.0038470156345,
        lon: -58.0177777886077
      },
      id: '06441',
      nombre: 'La Plata',
      provincia: {
        id: '06',
        nombre: 'Buenos Aires'
      }
    }
  ],
  inicio: 0,
  parametros: {
    max: 135,
    provincia: 'bsas'
  },
  total: 135
}

export interface Item {
  label: string
  value: string
}

export const centers: Item[] = []

raw.departamentos.forEach((departament: Department): void => {
  const set = new Set(departament.id.split(''))
  for (let i = 0 ; i < set.size ; i++) {
    centers.push({
      value: `${departament.provincia.nombre} - ${departament.nombre} - ${i}`,
      label: `${departament.provincia.nombre} - ${departament.nombre} - ${i}`
    })
  }
})
