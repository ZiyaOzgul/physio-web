import { BONE_ZONE_PALETTE, type BoneSubanatomySpec } from './domain';

export const CRANIAL_FACIAL_BONE_SPECS: readonly BoneSubanatomySpec[] = [
  // ============================================================================
  // 1. OS FRONTALE (FJ3200)
  // ============================================================================
  {
    boneId: 'os-frontale',
    partIds: ['FJ3200'],
    primaryPartId: 'FJ3200',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Os frontale',
    title: { tr: 'Os Frontale (Alın Kemiği)', en: 'Frontal Bone' },
    summary: {
      tr: 'Nörokranyumun ön-üst kubbesini (alın bölgesini) ve göz çukurlarının (orbita) tavanını oluşturan tek kemiktir; içinde paranazal sinüslerden Sinus frontalis’i barındırır.',
      en: 'Unpaired neurocranial bone forming the forehead (squamous part) and the roofs of the orbits, containing the paired frontal paranasal sinuses.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Squama Frontalis ve Tuber Frontale (Alın Kubbesi)', en: 'Squamous Part & Frontal Eminence' },
      shaft: { tr: 'Arcus Superciliaris, Glabella ve Linea Temporalis', en: 'Superciliary Arch, Glabella & Temporal Line' },
      distal: { tr: 'Margo Supraorbitalis ve Pars Orbitalis (Orbita Tavanı)', en: 'Supraorbital Margin & Orbital Roof' },
    },
    landmarks: [
      {
        id: 'frontale-squama-tuber',
        number: 1,
        latinName: 'Squama frontalis & Tuber frontale',
        name: { tr: 'Frontal Pul (Alın Yüzeyi) ve Alın Tümsekleri', en: 'Squamous Part and Frontal Eminences' },
        synonyms: ['squama frontalis', 'tuber frontale', 'alin kemigi', 'frontal squama'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.25, ml: 0.45, ap: 0.28, radius: [0.24, 0.45, 0.40], normalHint: 'anterior' },
        description: {
          tr: 'Alnın geniş, dışbükey ön duvarını oluşturan dikey yapraktır; iki yanındaki belirgin kemikleşme merkezlerine Tuber frontale (Eminentia frontalis) denir.',
          en: 'Broad convex vertical plate forming the forehead, featuring the paired frontal eminences (primary ossification centers).',
        },
        attachments: [
          {
            id: 'att-occipitofrontalis-frontalis',
            kind: 'origo',
            muscleLatin: 'M. occipitofrontalis (Venter frontalis — Galea aponeurotica’dan alın derisine)',
            muscleName: { tr: 'Oksipitofrontalis kası (Frontal karın)', en: 'Occipitofrontalis muscle (Frontal belly)' },
            function: {
              tr: 'Kaşları yukarı kaldırır ve alın derisini enine kırıştırır (hayret ifadesi — CN VII üst yüz motor testi).',
              en: 'Elevates the eyebrows and wrinkles the forehead skin horizontally (expression of surprise).',
            },
            innervation: { nerve: 'N. facialis (CN VII — Rami temporales)', roots: 'CN VII' },
          },
        ],
      },
      {
        id: 'frontale-glabella-linea-temporalis',
        number: 2,
        latinName: 'Glabella, Arcus superciliaris & Linea temporalis',
        name: { tr: 'Glabella, Kaş Kemerleri ve Temporal Çizgi', en: 'Glabella, Superciliary Arch & Temporal Line' },
        synonyms: ['glabella', 'arcus superciliaris', 'linea temporalis', 'sinus frontalis'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.62, ml: 0.80, ap: 0.42, radius: [0.22, 0.38, 0.38], normalHint: 'lateral' },
        description: {
          tr: 'İki kaş kemeri (Arcus superciliaris) arasındaki düz alan Glabella (derininde Sinus frontalis yer alır), dış yanlarda ise processus zygomaticus’tan yukarı-arkaya uzanarak temporal çukuru sınırlayan Linea temporalis.',
          en: 'Midline glabella between the superciliary arches (overlying the frontal sinuses) and the lateral temporal line bounding the temporal fossa.',
        },
        attachments: [
          {
            id: 'att-corrugator-temporalis-frontale',
            kind: 'origo',
            muscleLatin: 'M. corrugator supercilii (Arcus superciliaris iç ucu) & M. temporalis / Fascia temporalis (Linea temporalis)',
            muscleName: { tr: 'Korrugator supersilii (Kaş çatan kas) ve Temporal kas ön lifleri', en: 'Corrugator supercilii & Anterior Temporalis fibers' },
            function: {
              tr: 'Corrugator supercilii kaşları birbirine yaklaştırarak dikey kırışıklık oluşturur (kaş çatma); Temporalis alt çeneyi kapatır.',
              en: 'Corrugator supercilii draws the eyebrows medially and inferiorly (frowning); temporalis elevates the mandible.',
            },
            innervation: { nerve: 'Corrugator: N. facialis (CN VII); Temporalis: N. mandibularis (CN V3)', roots: 'CN VII, CN V3' },
          },
        ],
      },
      {
        id: 'frontale-margo-supraorbitalis-pars-orbitalis',
        number: 3,
        latinName: 'Margo supraorbitalis, Incisura/Foramen supraorbitale & Pars orbitalis',
        name: { tr: 'Supraorbital Kenar, Supraorbital Delik ve Orbita Tavanı', en: 'Supraorbital Margin, Foramen/Notch & Orbital Plate' },
        synonyms: ['margo supraorbitalis', 'foramen supraorbitale', 'incisura supraorbitalis', 'pars orbitalis'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.82, ml: 0.45, ap: 0.22, radius: [0.20, 0.45, 0.40], normalHint: 'inferior' },
        description: {
          tr: 'Göz çukurunun üst kenarı (Margo supraorbitalis) ile ön kafa çukurunu (Fossa cranii anterior) orbitadan ayıran yatay Pars orbitalis; iç yan 1/3’ünde N. supraorbitalis’in geçtiği çentik/delik ve iç-üst köşesinde M. obliquus superior’un makarası (Spina/Fovea trochlearis) yer alır.',
          en: 'Superior orbital rim and horizontal orbital roof; features the supraorbital notch/foramen at the medial third and the trochlear fovea for the superior oblique pulley.',
        },
        neurovascularRelation: {
          structureLatin: 'N. supraorbitalis & N. supratrochlearis (N. ophthalmicus — CN V1)',
          note: {
            tr: 'Trigeminal sinirin 1. dalının (CN V1) uç duyu dalı olan N. supraorbitalis, bu çentikten/delikten çıkarak alın ve ön saçlı deriyi duyulandırır (trigeminal muayene basınç noktası!).',
            en: 'Transmits the supraorbital nerve and vessels (CN V1) to supply sensation to the forehead and anterior scalp.',
          },
        },
        attachments: [
          {
            id: 'att-orbicularis-oculi-trochlea',
            kind: 'origo',
            muscleLatin: 'M. orbicularis oculi (Pars orbitalis) & Trochlea musculi obliqui superioris (Spina trochlearis)',
            muscleName: { tr: 'Orbikülaris oküli ve Üst oblik göz kası makarası', en: 'Orbicularis oculi & Trochlea of Superior oblique' },
            function: {
              tr: 'Orbicularis oculi göz kapaklarını sıkıca kapatır; Trochlea üzerinden kıvrılan M. obliquus superior göz küresini aşağı ve dışa (intorsiyon + depresyon) bakar.',
              en: 'Orbicularis oculi closes the eyelids; the fibrocartilaginous trochlea redirects the superior oblique tendon to depress and intort the eyeball.',
            },
            innervation: { nerve: 'Orbicularis oculi: N. facialis (CN VII); Obliquus superior: N. trochlearis (CN IV)', roots: 'CN VII, CN IV' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 2. OS PARIETALE (FJ3380 Right, FJ3274 Left)
  // ============================================================================
  {
    boneId: 'os-parietale',
    partIds: ['FJ3380', 'FJ3274'],
    primaryPartId: 'FJ3380',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Os parietale',
    title: { tr: 'Os Parietale (Yan Duvar / Çeper Kemiği)', en: 'Parietal Bone' },
    summary: {
      tr: 'Kafatası kubbesinin (Calvaria) üst ve yan duvarlarının büyük bölümünü oluşturan dörtgen biçimli çift kemiktir; orta hatta Sutura sagittalis, önde Sutura coronalis (Bregma) ve arkada Sutura lambdoidea (Lambda) ile eklemleşir.',
      en: 'Paired quadrilateral bones forming the superior and lateral walls of the calvaria, meeting at the sagittal suture between bregma and lambda.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Margo Sagittalis ve Tuber Parietale (Üst Kubbe)', en: 'Sagittal Margin & Parietal Eminence' },
      shaft: { tr: 'Linea Temporalis Superior et Inferior (Yan Yüz)', en: 'Superior & Inferior Temporal Lines' },
      distal: { tr: 'Angulus Sphenoidalis (Pterion) ve Sulcus A. Meningeae Mediae', en: 'Sphenoidal Angle (Pterion) & MMA Grooves' },
    },
    landmarks: [
      {
        id: 'parietale-tuber-margo-sagittalis',
        number: 1,
        latinName: 'Tuber parietale (Eminentia parietalis) & Margo sagittalis',
        name: { tr: 'Parietal Tümsek ve Sagital Kenar (Vertex)', en: 'Parietal Eminence and Sagittal Border' },
        synonyms: ['tuber parietale', 'eminentia parietalis', 'margo sagittalis', 'parietal kemik'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.25, ml: 0.45, ap: 0.50, radius: [0.24, 0.45, 0.45], normalHint: 'superior' },
        description: {
          tr: 'Parietal kemiğin dış yüzünün en kabarık merkezi noktası (Tuber parietale — kafatasının transvers çapının en geniş olduğu yer) ve iç yüzünde Sinus sagittalis superior oluğunu barındıran üst kenar.',
          en: 'Most prominent lateral convexity of the parietal bone (widest transverse diameter of the skull) and the superior sagittal border.',
        },
        attachments: [],
      },
      {
        id: 'parietale-lineae-temporales',
        number: 2,
        latinName: 'Linea temporalis superior et inferior',
        name: { tr: 'Üst ve Alt Temporal Çizgiler (Temporal Kas ve Fasya Sınırı)', en: 'Superior and Inferior Temporal Lines' },
        synonyms: ['linea temporalis superior', 'linea temporalis inferior', 'temporal cizgi'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.58, ml: 0.85, ap: 0.45, radius: [0.22, 0.35, 0.42], normalHint: 'lateral' },
        description: {
          tr: 'Kemiğin dış yüzünde önden arkaya yay çizen iki paralel kavisli çizgidir: üst çizgiye Fascia temporalis, alt çizgi ve altındaki Fossa temporalis yüzeyine ise M. temporalis tutunur.',
          en: 'Twin arched ridges crossing the lateral surface: the superior line anchors the temporal fascia, while the inferior line bounds the origin of the temporalis muscle.',
        },
        attachments: [
          {
            id: 'att-temporalis-parietal-origo',
            kind: 'origo',
            muscleLatin: 'M. temporalis (Linea temporalis inferior ve Fossa temporalis) & Fascia temporalis (Linea temporalis superior)',
            muscleName: { tr: 'Temporal kas (Şakak kası) ve Temporal fasya', en: 'Temporalis muscle and Temporal fascia' },
            function: {
              tr: 'Mandibulanın processus coronoideus’una tutunarak alt çeneyi güçlüce kaldırır (elevasyon / ısırma) ve arka lifleriyle çeneyi geriye çeker (retraksiyon).',
              en: 'Elevates the mandible powerfully to close the jaw and retracts the protruded mandible via its posterior horizontal fibers.',
            },
            innervation: { nerve: 'Nn. temporales profundi (N. mandibularis — CN V3)', roots: 'CN V3' },
          },
        ],
      },
      {
        id: 'parietale-angulus-sphenoidalis-pterion',
        number: 3,
        latinName: 'Angulus sphenoidalis (Pterion) & Sulci arteriosi (A. meningea media)',
        name: { tr: 'Sfenoidal Köşe (Pterion Noktası) ve Orta Meningeal Arter Olukları', en: 'Sphenoidal Angle (Pterion) & Middle Meningeal Artery Grooves' },
        synonyms: ['angulus sphenoidalis', 'pterion', 'arteria meningea media', 'sulcus arteriae meningeae mediae'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.82, ml: 0.88, ap: 0.18, radius: [0.20, 0.32, 0.32], normalHint: 'lateral' },
        description: {
          tr: 'Parietal, Frontal, Temporal ve Sfenoid (büyük kanat) kemiklerinin H harfi biçiminde birleştiği ön-alt köşedir (Pterion); kafatasının en ince noktasıdır ve iç yüzündeki dallanan oluklarda A. meningea media’nın ön dalı seyreder.',
          en: 'Anteroinferior corner forming the H-shaped Pterion junction of four bones (Frontal, Parietal, Temporal, Sphenoid); grooved internally by the anterior branch of the middle meningeal artery.',
        },
        neurovascularRelation: {
          structureLatin: 'A. meningea media (A. maxillaris dalı)',
          note: {
            tr: 'Şakak bölgesine (Pterion üzerine) alınan künt darbelerde ince kemik kırılarak A. meningea media’yı yırtar ve hayatı tehdit eden akut "Epidural (Ekstradural) Hematom"a (BT’de bikonveks / mercek görünümü) yol açar!',
            en: 'Blunt trauma to the thin pterion fractures the bone and lacerates the middle meningeal artery, causing a life-threatening biconvex (lentiform) acute Epidural Hematoma.',
          },
        },
        attachments: [],
      },
    ],
  },

  // ============================================================================
  // 3. OS TEMPORALE (FJ3386 Right, FJ3281 Left)
  // ============================================================================
  {
    boneId: 'os-temporale',
    partIds: ['FJ3386', 'FJ3281'],
    primaryPartId: 'FJ3386',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Os temporale',
    title: { tr: 'Os Temporale (Şakak Kemiği)', en: 'Temporal Bone' },
    summary: {
      tr: 'Kafatasının yan duvarını ve tabanını oluşturan, içinde işitme ve denge organlarını (koklea, vestibül ve orta kulak kemikçikleri) barındıran karmaşık kemiktir; Pars squamosa, Pars petrosa, Pars tympanica ve Processus mastoideus/styloideus bölümlerinden oluşur.',
      en: 'Complex lateral cranial base bone housing the middle and inner ear (vestibulocochlear apparatus), forming the TMJ socket, and bearing the mastoid, styloid, and zygomatic processes.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Pars Squamosa, Processus Zygomaticus ve Fossa Mandibularis', en: 'Squamous Part, Zygomatic Process & Mandibular Fossa' },
      shaft: { tr: 'Pars Petrosa (Piramis) ve Akustik Meatuslar', en: 'Petrous Part (Pyramid) & Acoustic Meatuses' },
      distal: { tr: 'Processus Mastoideus ve Processus Styloideus', en: 'Mastoid & Styloid Processes' },
    },
    landmarks: [
      {
        id: 'temporale-zygomaticus-fossa-mandibularis',
        number: 1,
        latinName: 'Processus zygomaticus, Fossa mandibularis & Tuberculum articulare',
        name: { tr: 'Zigomatik Çıkıntı, Mandibula Çukuru (TME) ve Eklem Tüberkülü', en: 'Zygomatic Process, Mandibular Fossa & Articular Tubercle' },
        synonyms: ['processus zygomaticus', 'fossa mandibularis', 'tuberculum articulare', 'arcus zygomaticus'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.56, ml: 0.77, ap: 0.28, radius: [0.24, 0.35, 0.35], normalHint: 'lateral' },
        description: {
          tr: 'Öne uzanarak zigomatik kemikle elmacık kemerini (Arcus zygomaticus) kuran çıkıntı ve kökünün alt yüzünde mandibula kondili ile Temporomandibüler Eklemi (TME) kuran Fossa mandibularis + önündeki Tuberculum articulare (esneme sırasında çene bu tüberkülün önüne kayarsa açık kilitlenir / çıkar!).',
          en: 'Anterior zygomatic arch projection and the inferior glenoid fossa + articular tubercle forming the craniomandibular socket of the TMJ.',
        },
        attachments: [
          {
            id: 'att-masseter-temporalis-temp-origo',
            kind: 'origo',
            muscleLatin: 'M. masseter (Arcus zygomaticus alt kenarı) & M. temporalis (Pars squamosa dış yüzü)',
            muscleName: { tr: 'Masseter kası ve Temporal kas', en: 'Masseter and Temporalis muscles' },
            function: {
              tr: 'Alt çeneyi güçlüce yukarı kaldırarak dişleri kenetler (çiğneme / mastikasyon).',
              en: 'Powerfully elevate the mandible to occlude the teeth during mastication.',
            },
            innervation: { nerve: 'N. mandibularis (CN V3)', roots: 'CN V3' },
          },
        ],
      },
      {
        id: 'temporale-pars-petrosa-porus',
        number: 2,
        latinName: 'Pars petrosa (Piramis), Porus acusticus internus/externus & Canalis caroticus',
        name: { tr: 'Petröz Parça (Kaya Kemiği), İç/Dış Kulak Yolu ve Karotis Kanalı', en: 'Petrous Part, Internal/External Acoustic Meatus & Carotid Canal' },
        synonyms: ['pars petrosa', 'porus acusticus internus', 'porus acusticus externus', 'canalis caroticus'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.55, ml: 0.32, ap: 0.50, radius: [0.24, 0.38, 0.38], normalHint: 'medial' },
        description: {
          tr: 'Orta ile arka kafa çukuru arasına kama gibi giren, vücudun en sert kemik dokusuna sahip piramit biçimli kısımdır; içinde iç kulak (koklea + yarım daire kanalları), A. carotis interna’nın geçtiği Canalis caroticus ve CN VII–VIII’in girdiği Meatus acusticus internus yer alır.',
          en: 'Wedge of dense rock-hard bone at the cranial base housing the inner ear labyrinth, carotid canal, and internal acoustic meatus (CN VII & VIII).',
        },
        neurovascularRelation: {
          structureLatin: 'N. facialis (CN VII), N. vestibulocochlearis (CN VIII) & A. carotis interna',
          note: {
            tr: 'Petröz kemik kırıklarında (kafa tabanı kırığı) kulaktan kan/BOS gelmesi (otore), Battle işareti (mastoid ekimoz), fasiyal sinir felci (CN VII) ve sensörinöral işitme/denge kaybı (CN VIII) görülür!',
            en: 'Basilar skull fractures through the petrous pyramid cause hemotympanum, Battle sign, CN VII facial palsy, and CN VIII hearing/vestibular loss.',
          },
        },
        attachments: [
          {
            id: 'att-levator-veli-palatini-petrous-origo',
            kind: 'origo',
            muscleLatin: 'M. levator veli palatini (Pars petrosa alt yüzü, karotis kanalı önü) & M. tensor tympani',
            muscleName: { tr: 'Yumuşak damak kaldırıcı kası (Levator veli palatini) ve Tensor timpani', en: 'Levator veli palatini & Tensor tympani muscles' },
            function: {
              tr: 'Levator veli palatini yutkunma sırasında yumuşak damağı kaldırarak nazofarinksi kapatır ve Östaki borusunu açar; Tensor tympani kulak zarını gererek yüksek sesleri sönümler.',
              en: 'Levator veli palatini elevates the soft palate during swallowing and opens the auditory tube; tensor tympani dampens loud vibrations on the malleus.',
            },
            innervation: { nerve: 'Levator: Plexus pharyngeus (CN X/XI); Tensor tympani: N. mandibularis (CN V3)', roots: 'CN X, CN V3' },
          },
        ],
      },
      {
        id: 'temporale-mastoideus-styloideus',
        number: 3,
        latinName: 'Processus mastoideus, Incisura mastoidea & Processus styloideus',
        name: { tr: 'Mastoid Çıkıntı, Stiloid Çıkıntı (Riolan Buketi) ve Stilomastoid Delik', en: 'Mastoid Process, Digastric Groove & Styloid Process' },
        synonyms: ['processus mastoideus', 'processus styloideus', 'foramen stylomastoideum', 'mastoid cikinti', 'stiloid cikinti'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.82, ml: 0.78, ap: 0.78, radius: [0.22, 0.35, 0.35], normalHint: 'posterior' },
        description: {
          tr: 'Kulak kepçesinin hemen arkasındaki havalı hücreler (cellulae mastoideae) içeren küt Processus mastoideus, iç yanındaki Incisura mastoidea (digastrik oluk) ve önde iğne gibi aşağı uzanan Processus styloideus; ikisinin tam arasındaki Foramen stylomastoideum’dan N. facialis (CN VII) kafatasını terk eder!',
          en: 'Postauricular mastoid process, medial digastric notch, and slender anterior styloid process; the stylomastoid foramen between them transmits the facial nerve (CN VII).',
        },
        neurovascularRelation: {
          structureLatin: 'N. facialis (CN VII — Foramen stylomastoideum)',
          note: {
            tr: 'Fasiyal sinir (CN VII), Foramen stylomastoideum’dan çıkarak parotis bezine girer ve yüzün tüm mimik kaslarını innerve eder (Bell paralizisinde bu kanalda ödem/sıkışma gelişir).',
            en: 'CN VII exits the skull through the stylomastoid foramen between the styloid and mastoid processes to innervate the muscles of facial expression.',
          },
        },
        attachments: [
          {
            id: 'att-scm-splenius-digastric-mastoid',
            kind: 'insertio',
            muscleLatin: 'M. sternocleidomastoideus, M. splenius capitis & M. longissimus capitis (Insertio) / M. digastricus venter posterior (Origo)',
            muscleName: { tr: 'SCM, Splenius kapitis (İnsertio) ve Digastrik arka karın (Origo)', en: 'SCM, Splenius capitis (Insertion) & Posterior belly of Digastric (Origin)' },
            musclePartId: 'FJ1595',
            function: {
              tr: 'SCM başı karşı tarafa çevirir ve boynu eğer; Digastrik arka karın hiyoid kemiği yukarı-arkaya çeker.',
              en: 'SCM rotates the head contralaterally and flexes the neck; posterior digastric elevates and retracts the hyoid.',
            },
            innervation: { nerve: 'SCM: N. accessorius (CN XI); Digastrik arka karın: N. facialis (CN VII)', roots: 'CN XI, CN VII' },
          },
          {
            id: 'att-riolan-bouquet-styloid-origo',
            kind: 'origo',
            muscleLatin: 'M. stylohyoideus (CN VII), M. styloglossus (CN XII) & M. stylopharyngeus (CN IX) — "Riolan Buketi"',
            muscleName: { tr: 'Stiloid kas üçlüsü ("Riolan Buketi": Stilohiyoid, Stiloglossus, Stilofaringeus)', en: 'Styloid muscular triad ("Bouquet of Riolan")' },
            function: {
              tr: 'Her biri farklı bir kraniyal sinirle (CN VII, CN XII, CN IX) uyarılan bu üç kas yutkunma sırasında hiyoidi, dili ve farinksi yukarı-arkaya çeker.',
              en: 'Three muscles innervated by three distinct cranial nerves (CN VII, XII, IX) that elevate the hyoid, tongue, and pharynx during swallowing.',
            },
            innervation: { nerve: 'N. facialis (CN VII), N. hypoglossus (CN XII) & N. glossopharyngeus (CN IX)', roots: 'CN VII, CN IX, CN XII' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 4. OS SPHENOIDALE (FJ3394)
  // ============================================================================
  {
    boneId: 'os-sphenoidale',
    partIds: ['FJ3394'],
    primaryPartId: 'FJ3394',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Os sphenoidale',
    title: { tr: 'Os Sphenoidale (Temel Kemiği / Kelebek Kemiği)', en: 'Sphenoid Bone' },
    summary: {
      tr: 'Kafa tabanının tam merkezinde kanatlarını açmış bir kelebek (veya yarasa) biçiminde yer alan ve nörokranyumun diğer tüm kemikleriyle eklem yapan kilit taşı kemiktir; Corpus (Sella turcica), Ala minor, Ala major ve Processus pterygoideus bölümlerinden oluşur.',
      en: 'Butterfly-shaped keystone bone of the central cranial base articulating with all other neurocranial bones; consists of the body (sella turcica), lesser wings, greater wings, and pterygoid processes.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Corpus, Sella Turcica ve Ala Minor (Optik Kanal)', en: 'Body, Sella Turcica & Lesser Wing' },
      shaft: { tr: 'Ala Major ve Kafa Tabanı Foramenleri (V2, V3)', en: 'Greater Wing & Basal Foramina' },
      distal: { tr: 'Processus Pterygoideus (Pterygoid Kas Origoları)', en: 'Pterygoid Processes (Medial & Lateral Plates)' },
    },
    landmarks: [
      {
        id: 'sphenoidale-sella-ala-minor',
        number: 1,
        latinName: 'Corpus (Sella turcica / Fossa hypophysialis) & Ala minor (Canalis opticus)',
        name: { tr: 'Türk Eğeri (Sella Turcica / Hipofiz Çukuru) ve Küçük Kanat (Optik Kanal)', en: 'Sella Turcica (Hypophyseal Fossa) & Lesser Wing (Optic Canal)' },
        synonyms: ['sella turcica', 'fossa hypophysialis', 'ala minor', 'canalis opticus', 'turk egeri'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.22, ml: 0.30, ap: 0.45, radius: [0.22, 0.38, 0.38], normalHint: 'superior' },
        description: {
          tr: 'Sfenoid gövdesinin üst yüzündeki eyer biçimli çukurda (Sella turcica) hipofiz bezi (Glandula pituitaria) oturur; ön-yanlara uzanan küçük kanatların (Ala minor) kökündeki Canalis opticus’tan ise N. opticus (CN II) ve A. ophthalmica orbitaya girer.',
          en: 'Saddle-shaped midline depression housing the pituitary gland, flanked anterolaterally by the lesser wings and optic canals (CN II & ophthalmic artery).',
        },
        neurovascularRelation: {
          structureLatin: 'Chiasma opticum (CN II) & Sinus cavernosus (CN III, IV, V1, V2, VI & A. carotis interna)',
          note: {
            tr: 'Hipofiz adenomları yukarı büyüdüğünde Chiasma opticum’a bası yaparak "Bitemporal Hemianopsi" (tünel görme) yapar; sella turcica’nın iki yanında ise Sinus cavernosus yer alır.',
            en: 'Pituitary tumors expanding superiorly from the sella turcica compress the optic chiasm, producing bitemporal hemianopsia.',
          },
        },
        attachments: [
          {
            id: 'att-extraocular-annulus-zinn-origo',
            kind: 'origo',
            muscleLatin: 'Mm. recti oculi (Superior, Inferior, Medialis, Lateralis — Anulus tendineus communis / Zinn halkası), M. levator palpebrae superioris & M. obliquus superior',
            muscleName: { tr: 'Ekstraoküler göz kasları (4 Rektus kası, Üst oblik ve Üst göz kapağı kaldırıcısı)', en: 'Extraocular muscles (Common tendinous ring of Zinn & Lesser wing)' },
            function: {
              tr: 'Göz küresinin tüm yönlere bakış hareketlerini ve üst göz kapağının kaldırılmasını sağlar (yalnızca M. obliquus inferior maksilladan başlar!).',
              en: 'Move the eyeball in all conjugate directions and elevate the upper eyelid (all extraocular muscles except inferior oblique originate at the sphenoid apex).',
            },
            innervation: { nerve: 'N. oculomotorius (CN III), N. trochlearis (CN IV — SO) & N. abducens (CN VI — LR)', roots: 'CN III, CN IV, CN VI' },
          },
        ],
      },
      {
        id: 'sphenoidale-ala-major-foramina',
        number: 2,
        latinName: 'Ala major (Fissura orbitalis superior, Foramen rotundum, ovale et spinosum)',
        name: { tr: 'Büyük Kanat, İnfratemporal İbik ve Foramen Hilali (V1–V3 Geçişleri)', en: 'Greater Wing, Infratemporal Crest & Foramina Crescent' },
        synonyms: ['ala major', 'foramen rotundum', 'foramen ovale', 'foramen spinosum', 'fissura orbitalis superior'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.45, ml: 0.82, ap: 0.48, radius: [0.24, 0.35, 0.38], normalHint: 'lateral' },
        description: {
          tr: 'Orta kafa çukurunun tabanını, orbitanın dış duvarını ve infratemporal çukurun tavanını oluşturan büyük kanatlar; tabanında önden arkaya "ROS" sırasıyla Foramen Rotundum (CN V2), Foramen Ovale (CN V3) ve Foramen Spinosum (A. meningea media) dizilir.',
          en: 'Broad lateral wing forming the middle cranial fossa floor and lateral orbital wall, perforated by the crescent of foramina: Rotundum (V2), Ovale (V3), and Spinosum (MMA).',
        },
        attachments: [
          {
            id: 'att-lat-pterygoid-sup-head-origo',
            kind: 'origo',
            muscleLatin: 'M. pterygoideus lateralis (Caput superius — Ala major infratemporal yüzü ve ibiği)',
            muscleName: { tr: 'Lateral pterygoid kası (Üst baş)', en: 'Lateral pterygoid muscle (Superior head)' },
            function: {
              tr: 'Çene açılırken ve kapanırken TME eklem diskini ve mandibula kondilini öne çekerek stabilize eder.',
              en: 'Protrudes the mandible and stabilizes the TMJ articular disc during jaw opening and closing.',
            },
            innervation: { nerve: 'N. mandibularis (CN V3)', roots: 'CN V3' },
          },
        ],
      },
      {
        id: 'sphenoidale-processus-pterygoideus',
        number: 3,
        latinName: 'Processus pterygoideus (Lamina lateralis, Lamina medialis, Fossa pterygoidea & Hamulus)',
        name: { tr: 'Pterygoid Çıkıntı (İç/Dış Yapraklar, Pterygoid Çukur ve Hamulus)', en: 'Pterygoid Process (Lateral/Medial Plates, Fossa & Hamulus)' },
        synonyms: ['processus pterygoideus', 'lamina lateralis', 'lamina medialis', 'fossa pterygoidea', 'hamulus pterygoideus'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.85, ml: 0.45, ap: 0.50, radius: [0.22, 0.38, 0.38], normalHint: 'inferior' },
        description: {
          tr: 'Sfenoid gövde ile büyük kanat birleşiminden aşağıya doğru koanaların iki yanından uzanan dikey kemik sütunlardır; dış ve iç laminalardan (Lamina lateralis et medialis) oluşur ve derin çiğneme ile damak/yutak kaslarının ana başlangıç merkezidir.',
          en: 'Paired vertical projections descending behind the maxilla, each split into lateral and medial pterygoid plates anchoring the deep muscles of mastication and palate.',
        },
        attachments: [
          {
            id: 'att-med-lat-pterygoid-plates-origo',
            kind: 'origo',
            muscleLatin: 'M. pterygoideus lateralis (Caput inferius — Lamina lateralis dış yüzü) & M. pterygoideus medialis (Lamina lateralis iç yüzü / Fossa pterygoidea)',
            muscleName: { tr: 'Lateral pterygoid (Alt baş) ve Medial pterygoid kasları', en: 'Lateral pterygoid (Inferior head) & Medial pterygoid muscles' },
            function: {
              tr: 'Aynı kemik yaprağının (Lamina lateralis) dış yüzünden başlayan lateral pterygoid ağzı açar (depresyon + protrüzyon); iç yüzünden başlayan medial pterygoid ise ağzı kapatır (elevasyon)!',
              en: 'Originating from opposite sides of the lateral pterygoid plate: the lateral pterygoid opens/protrudes the jaw, while the medial pterygoid closes/elevates it.',
            },
            innervation: { nerve: 'N. mandibularis (CN V3)', roots: 'CN V3' },
          },
          {
            id: 'att-tensor-veli-constrictor-origo',
            kind: 'origo',
            muscleLatin: 'M. tensor veli palatini (Fossa scaphoidea → Hamulus pterygoideus makarası) & M. constrictor pharyngis superior (Hamulus & Lamina medialis)',
            muscleName: { tr: 'Yumuşak damak gerici kası (Tensor veli palatini) ve Üst farinks konstriktörü', en: 'Tensor veli palatini & Superior pharyngeal constrictor' },
            function: {
              tr: 'Tensor veli palatini tendonu Hamulus pterygoideus etrafında 90° dönerek yumuşak damağı enine gerer ve Östaki borusunu açar; üst konstriktör yutkunmada farinksi daraltır.',
              en: 'Tensor veli palatini hooks 90° around the pterygoid hamulus to tense the soft palate and open the auditory tube; superior constrictor propels the bolus.',
            },
            innervation: { nerve: 'Tensor veli palatini: N. mandibularis (CN V3); Constrictor sup.: Plexus pharyngeus (CN X)', roots: 'CN V3, CN X' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 5. OS ETHMOIDALE (FJ3199)
  // ============================================================================
  {
    boneId: 'os-ethmoidale',
    partIds: ['FJ3199'],
    primaryPartId: 'FJ3199',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Os ethmoidale',
    title: { tr: 'Os Ethmoidale (Kalbur Kemiği)', en: 'Ethmoid Bone' },
    summary: {
      tr: 'İki göz çukuru (orbita) arasında ve burun boşluğunun tavanında yer alan hafif, süngerimsi (pnömatize) kemiktir; Lamina cribrosa, Crista galli, Lamina perpendicularis ve iki yan Labyrinthus ethmoidalis’ten oluşur.',
      en: 'Delicate pneumatic bone situated between the two orbits at the roof of the nasal cavity, comprising the cribriform plate, crista galli, perpendicular plate, and ethmoidal labyrinths.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Crista Galli ve Lamina Cribrosa (Koku Alma Tavani)', en: 'Crista Galli & Cribriform Plate (Superior)' },
      shaft: { tr: 'Labyrinthus Ethmoidalis ve Lamina Orbitalis (Papyracea)', en: 'Ethmoidal Labyrinth & Lamina Papyracea' },
      distal: { tr: 'Lamina Perpendicularis ve Concha Nasalis Sup./Media', en: 'Perpendicular Plate & Superior/Middle Conchae' },
    },
    landmarks: [
      {
        id: 'ethmoidale-crista-galli-lamina-cribrosa',
        number: 1,
        latinName: 'Crista galli & Lamina cribrosa',
        name: { tr: 'Horoz İbiği (Crista Galli) ve Kalbursu Yaprak (Lamina Cribrosa)', en: 'Crista Galli and Cribriform Plate' },
        synonyms: ['crista galli', 'lamina cribrosa', 'horoz ibigi', 'kalbur kemigi'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.16, ml: 0.35, ap: 0.45, radius: [0.22, 0.42, 0.42], normalHint: 'superior' },
        description: {
          tr: 'Ön kafa çukurunun orta hattında yukarı yükselen üçgen çıkıntı (Crista galli — beynin iki yarımküresini ayıran Falx cerebri’nin ön tutunma noktası) ve iki yanında koku siniri liflerinin (Fila olfactoria — CN I) geçtiği delikli Lamina cribrosa.',
          en: 'Median triangular process (crista galli, anchoring the falx cerebri) flanked by the perforated cribriform plates transmitting the olfactory nerve fibers (CN I).',
        },
        neurovascularRelation: {
          structureLatin: 'Nn. olfactorii (CN I — Fila olfactoria)',
          note: {
            tr: 'Ön kafa tabanı (Lamina cribrosa) kırıklarında koku siniri lifleri koparak koku kaybı (Anosmi) ve burundan berrak beyin-omurilik sıvısı (BOS rinoresi) gelişir!',
            en: 'Fractures of the cribriform plate shear the olfactory nerve filaments, causing anosmia and cerebrospinal fluid (CSF) rhinorrhea.',
          },
        },
        attachments: [],
      },
      {
        id: 'ethmoidale-labyrinthus-papyracea',
        number: 2,
        latinName: 'Labyrinthus ethmoidalis (Cellulae ethmoidales) & Lamina orbitalis (Lamina papyracea)',
        name: { tr: 'Etmoidal Labirent (Sinüs Hücreleri) ve Kağıt Yaprak (Lamina Papyracea)', en: 'Ethmoidal Labyrinth & Orbital Plate (Lamina Papyracea)' },
        synonyms: ['labyrinthus ethmoidalis', 'lamina orbitalis', 'lamina papyracea', 'cellulae ethmoidales'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.50, ml: 0.85, ap: 0.50, radius: [0.24, 0.35, 0.42], normalHint: 'lateral' },
        description: {
          tr: 'İçinde 3–18 adet havalı etmoid sinüs hücresi barındıran yan kitleler ve bunları göz çukurundan (orbita iç duvarından) ayıran kağıt inceliğindeki dış duvar (Lamina orbitalis / Lamina papyracea).',
          en: 'Paired lateral masses containing the ethmoidal air cells, bounded laterally by the paper-thin lamina papyracea forming the medial wall of the orbit.',
        },
        clinicalNote: {
          tr: 'Lamina papyracea çok ince olduğu için çocuklarda akut etmoidal sinüzit enfeksiyonu bu duvarı aşarak göz çukuruna yayılabilir ("Orbital Selülit" — en sık nedeni etmoid sinüzittir!) veya künt göz travmasında (blow-out kırığı) kırılabilir.',
          en: 'Because the lamina papyracea is paper-thin, ethmoidal sinusitis easily erodes through it to cause orbital cellulitis, and orbital blowout fractures frequently involve it.',
        },
        attachments: [],
      },
      {
        id: 'ethmoidale-lamina-perpendicularis-conchae',
        number: 3,
        latinName: 'Lamina perpendicularis & Concha nasalis superior et media',
        name: { tr: 'Dikey Yaprak (Üst Kemik Septum) ve Üst/Orta Burun Konkaları', en: 'Perpendicular Plate & Superior/Middle Nasal Conchae' },
        synonyms: ['lamina perpendicularis', 'concha nasalis media', 'concha nasalis superior'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.82, ml: 0.38, ap: 0.50, radius: [0.22, 0.42, 0.42], normalHint: 'inferior' },
        description: {
          tr: 'Kemik burun bölmesinin (septum nasi osseum) üst-ön kısmını oluşturan Lamina perpendicularis (altta Vomer ile birleşir) ve burun yan duvarından içe kıvrılan Üst ve Orta Nazal Konkalar (dikkat: Alt nazal konka etmoidin parçası değil, bağımsız bir kemiktir!).',
          en: 'Midline perpendicular plate forming the anterosuperior bony nasal septum, and the scrolled superior and middle nasal conchae (the inferior concha is a separate bone).',
        },
        attachments: [],
      },
    ],
  },

  // ============================================================================
  // 6. MAXILLA (FJ3375 Right, FJ3269 Left)
  // ============================================================================
  {
    boneId: 'maxilla',
    partIds: ['FJ3375', 'FJ3269'],
    primaryPartId: 'FJ3375',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Maxilla',
    title: { tr: 'Maxilla (Üst Çene Kemiği)', en: 'Maxilla (Upper Jaw)' },
    summary: {
      tr: 'Mandibula dışında yüz iskeletinin (visserokranyumun) merkezini oluşturan ve üst diş arkını taşıyan çift kemiktir; hem ağız tavanını (sert damak), hem burun yan duvarını/tabanını hem de göz çukuru (orbita) tabanını oluşturur ve en büyük paranazal sinüs olan Sinus maxillaris’i barındırır.',
      en: 'Central paired bone of the midface bearing the upper dentition and forming the orbital floor, lateral nasal wall, and anterior hard palate; houses the large maxillary sinus.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Processus Frontalis, Facies Orbitalis ve Foramen Infraorbitale', en: 'Frontal Process, Orbital Floor & Infraorbital Foramen' },
      shaft: { tr: 'Corpus Maxillae (Sinus Maxillaris), Fossa Canina ve Tuber Maxillae', en: 'Body of Maxilla, Canine Fossa & Maxillary Tuberosity' },
      distal: { tr: 'Processus Alveolaris ve Processus Palatinus (Sert Damak)', en: 'Alveolar Process & Palatine Process' },
    },
    landmarks: [
      {
        id: 'maxilla-infraorbitalis-frontalis',
        number: 1,
        latinName: 'Processus frontalis, Facies orbitalis & Foramen infraorbitale',
        name: { tr: 'Frontal Çıkıntı, Orbita Tabanı ve İnfraorbital Delik', en: 'Frontal Process, Orbital Surface & Infraorbital Foramen' },
        synonyms: ['foramen infraorbitale', 'processus frontalis maxillae', 'facies orbitalis maxillae', 'infraorbital delik'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.22, ml: 0.45, ap: 0.22, radius: [0.22, 0.42, 0.38], normalHint: 'anterior' },
        description: {
          tr: 'Göz çukurunun alt duvarını (Facies orbitalis) ve alt kenarının iç yarısını oluşturan bölge; alt kenarın ~1 cm altında içinden N. infraorbitalis’in çıktığı Foramen infraorbitale, iç-alt köşesinde ise tek maksiller göz kası olan M. obliquus inferior’un başlangıç yeri bulunur.',
          en: 'Forms the floor of the orbit and medial infraorbital rim; perforated ~1 cm below the rim by the infraorbital foramen and giving origin to the inferior oblique muscle.',
        },
        neurovascularRelation: {
          structureLatin: 'N. infraorbitalis & A. infraorbitalis (N. maxillaris — CN V2)',
          note: {
            tr: 'Göz küresine önden gelen künt darbelerde ("Orbital Blow-out Kırığı") ince orbita tabanı Sinus maxillaris içine çöker; M. rectus inferior kırık hattına sıkışarak yukarı bakış kısıtlılığı (diplopi) ve N. infraorbitalis hasarıyla yanak/üst dudakta uyuşukluk yapar!',
            en: 'Orbital floor ("blowout") fractures herniate orbital contents into the maxillary sinus, entrapping the inferior rectus (limiting upward gaze) and injuring the infraorbital nerve (CN V2 numbness of cheek/upper lip).',
          },
        },
        attachments: [
          {
            id: 'att-levator-labii-obliquus-inf-origo',
            kind: 'origo',
            muscleLatin: 'M. levator labii superioris (Margo infraorbitalis), M. orbicularis oculi (Processus frontalis) & M. obliquus inferior bulbi (Orbita tabanı ön-iç)',
            muscleName: { tr: 'Üst dudak kaldırıcı kas, Orbikülaris oküli ve Alt oblik göz kası', en: 'Levator labii superioris, Orbicularis oculi & Inferior oblique' },
            function: {
              tr: 'Levator labii superioris üst dudağı kaldırır; M. obliquus inferior kafa apeksinden (Zinn halkasından) başlamayan TEK ekstraoküler göz kası olup gözü yukarı ve dışa (elevasyon + ekstorsiyon) baktırır.',
              en: 'Levator labii superioris elevates the upper lip; inferior oblique is the only extraocular muscle originating from the anterior orbital floor, elevating and extorting the eye.',
            },
            innervation: { nerve: 'Mimik kasları: N. facialis (CN VII); Obliquus inferior: N. oculomotorius (CN III)', roots: 'CN VII, CN III' },
          },
        ],
      },
      {
        id: 'maxilla-corpus-fossa-canina-tuber',
        number: 2,
        latinName: 'Corpus maxillae (Sinus maxillaris), Fossa canina & Tuber maxillae',
        name: { tr: 'Maksilla Gövdesi (Highmore Sinüsü), Köpek Çukuru ve Maksiller Tümsek', en: 'Body of Maxilla, Canine Fossa & Maxillary Tuberosity' },
        synonyms: ['corpus maxillae', 'fossa canina', 'tuber maxillae', 'sinus maxillaris'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.55, ml: 0.65, ap: 0.50, radius: [0.22, 0.42, 0.42], normalHint: 'anterior' },
        description: {
          tr: 'İçinde piramit biçimli Sinus maxillaris’i barındıran gövde; ön yüzündeki Fossa canina mimik kaslarına, arka yüzündeki yuvarlak Tuber maxillae ise M. pterygoideus medialis’in yüzeyel başına tutunma sağlar.',
          en: 'Pyramidal body containing the maxillary sinus; features the anterior canine fossa and the posterior rounded maxillary tuberosity.',
        },
        attachments: [
          {
            id: 'att-levator-anguli-nasalis-pterygoid-origo',
            kind: 'origo',
            muscleLatin: 'M. levator anguli oris (Fossa canina), M. nasalis & M. pterygoideus medialis (Caput superficiale — Tuber maxillae)',
            muscleName: { tr: 'Ağız köşesi kaldırıcısı (Fossa canina), Nazalis ve Medial pterygoid yüzeyel başı', en: 'Levator anguli oris, Nasalis & Medial pterygoid (Superficial head)' },
            function: {
              tr: 'Levator anguli oris gülümsemede ağız köşesini yukarı çeker; Nasalis burun kanatlarını açar/kapatır; Medial pterygoid alt çeneyi kapatır.',
              en: 'Levator anguli oris elevates the angle of the mouth; nasalis flares/compresses the nares; medial pterygoid elevates the mandible.',
            },
            innervation: { nerve: 'Mimik kasları: N. facialis (CN VII); Medial pterygoid: N. mandibularis (CN V3)', roots: 'CN VII, CN V3' },
          },
        ],
      },
      {
        id: 'maxilla-alveolaris-palatinus',
        number: 3,
        latinName: 'Processus alveolaris & Processus palatinus (Palatum durum)',
        name: { tr: 'Alveolar Çıkıntı (Üst Diş Yuvaları) ve Palatin Çıkıntı (Sert Damak Ön 3/4)', en: 'Alveolar Process & Palatine Process (Hard Palate)' },
        synonyms: ['processus alveolaris maxillae', 'processus palatinus maxillae', 'palatum durum', 'sert damak'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.85, ml: 0.45, ap: 0.45, radius: [0.20, 0.45, 0.45], normalHint: 'inferior' },
        description: {
          tr: 'Üst diş köklerinin (alveollerin) yerleştiği alt kemer (Processus alveolaris — molar diş kökleri Sinus maxillaris tabanıyla çok yakın komşudur!) ve burun boşluğu ile ağız boşluğunu ayıran sert damağın (Palatum durum) ön 3/4’ünü oluşturan yatay Processus palatinus.',
          en: 'Inferior alveolar arch bearing the upper teeth and the horizontal palatine process forming the anterior three-quarters of the hard palate.',
        },
        clinicalNote: {
          tr: 'Yüzün künt travmalarında maksilla kırıkları Le Fort I (yatay/damağı ayıran), Le Fort II (piramidal) ve Le Fort III (kraniyofasiyal ayrılma) olarak sınıflandırılır.',
          en: 'Midface fractures of the maxilla are classified clinically into Le Fort I (horizontal), Le Fort II (pyramidal), and Le Fort III (craniofacial disjunction) patterns.',
        },
        attachments: [
          {
            id: 'att-buccinator-maxilla-origo',
            kind: 'origo',
            muscleLatin: 'M. buccinator (1.–3. üst molar diş alveollerinin dış yüzü)',
            muscleName: { tr: 'Buksinatör kas (Üfleme / Yanak kası — Üst lifler)', en: 'Buccinator muscle (Maxillary alveolar origin)' },
            function: {
              tr: 'Yanağı dişlere bastırarak çiğneme sırasında lokmanın dişler arasında kalmasını sağlar ve üfleme/ıslık çalma hareketini yapar.',
              en: 'Compresses the cheek against the molar teeth to keep food on the occlusal surface during chewing and expels air during blowing.',
            },
            innervation: { nerve: 'N. facialis (CN VII — Rami buccales)', roots: 'CN VII' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 7. OS ZYGOMATICUM (FJ3392 Right, FJ3287 Left)
  // ============================================================================
  {
    boneId: 'os-zygomaticum',
    partIds: ['FJ3392', 'FJ3287'],
    primaryPartId: 'FJ3392',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Os zygomaticum',
    title: { tr: 'Os Zygomaticum (Elmacık Kemiği)', en: 'Zygomatic Bone (Cheekbone)' },
    summary: {
      tr: 'Yanağın çıkıntısını oluşturan, göz çukurunun (orbita) dış-alt duvarını kuran ve arkada temporal kemikle birleşerek elmacık kemerini (Arcus zygomaticus) tamamlayan sağlam çift yüz kemiğidir.',
      en: 'Paired diamond-shaped facial bone forming the prominence of the cheek, the anterolateral orbital wall, and the anterior part of the zygomatic arch.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Processus Frontalis ve Facies Orbitalis (Whitnall Tüberkülü)', en: 'Frontal Process & Orbital Surface' },
      shaft: { tr: 'Facies Lateralis (Yanak Yüzü — Zigomatik Kaslar)', en: 'Lateral (Malar) Surface' },
      distal: { tr: 'Processus Temporalis ve Alt Kenar (Masseter Origosu)', en: 'Temporal Process & Masseteric Border' },
    },
    landmarks: [
      {
        id: 'zygomaticum-frontalis-orbitalis',
        number: 1,
        latinName: 'Processus frontalis & Facies orbitalis (Tuberculum orbitale — Whitnall)',
        name: { tr: 'Frontal Çıkıntı, Orbita Yüzü ve Whitnall Tüberkülü', en: 'Frontal Process, Orbital Surface & Whitnall Tubercle' },
        synonyms: ['processus frontalis ossis zygomatici', 'facies orbitalis ossis zygomatici', 'whitnall tubercle'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.20, ml: 0.72, ap: 0.35, radius: [0.24, 0.38, 0.38], normalHint: 'superior' },
        description: {
          tr: 'Yukarıda frontal kemikle, arkada sfenoid büyük kanatla birleşerek orbita dış duvarını kurar; orbita kenarının hemen iç yanındaki küçük tümsekçiğe (Whitnall tüberkülü) dış göz kapağı bağı (Lig. palpebrale laterale) ve göz küresi askı bağı (Lockwood ligamenti) tutunur.',
          en: 'Forms the lateral orbital rim and wall; bears the marginal orbital tubercle (Whitnall tubercle) anchoring the lateral palpebral ligament and Lockwood suspensory ligament.',
        },
        attachments: [],
      },
      {
        id: 'zygomaticum-facies-lateralis',
        number: 2,
        latinName: 'Facies lateralis & Foramen zygomaticofaciale',
        name: { tr: 'Dış (Yanak) Yüz ve Gülümseme Kasları Origosu', en: 'Lateral (Malar) Surface & Zygomaticus Origins' },
        synonyms: ['facies lateralis ossis zygomatici', 'foramen zygomaticofaciale', 'elmacik kemigi'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.52, ml: 0.65, ap: 0.25, radius: [0.24, 0.42, 0.40], normalHint: 'lateral' },
        description: {
          tr: 'Elmacık çıkıntısını oluşturan dışbükey ön-yan yüzdür; üzerindeki delikten CN V2’nin duyu dalı olan N. zygomaticofacialis çıkar ve gülümseme mimik kasları bu yüzeyden başlar.',
          en: 'Convex malar surface perforated by the zygomaticofacial foramen (CN V2) and giving origin to the primary muscles of smiling.',
        },
        attachments: [
          {
            id: 'att-zygomaticus-major-minor-origo',
            kind: 'origo',
            muscleLatin: 'M. zygomaticus major & M. zygomaticus minor',
            muscleName: { tr: 'Zigomatikus majör ve minör kasları (Gülümseme kasları)', en: 'Zygomaticus major and minor muscles' },
            function: {
              tr: 'Ağız köşesini (modiolus) ve üst dudağı yukarı ve dışa çekerek gerçek gülümseme hareketini üretir.',
              en: 'Draw the angle of the mouth and upper lip superiorly and laterally to produce smiling.',
            },
            innervation: { nerve: 'N. facialis (CN VII — Rami zygomatici et buccales)', roots: 'CN VII' },
          },
        ],
      },
      {
        id: 'zygomaticum-temporalis-margo-massetericus',
        number: 3,
        latinName: 'Processus temporalis (Arcus zygomaticus) & Margo massetericus',
        name: { tr: 'Temporal Çıkıntı (Elmacık Kemeri) ve Masseterik Alt Kenar', en: 'Temporal Process (Zygomatic Arch) & Masseteric Border' },
        synonyms: ['processus temporalis ossis zygomatici', 'arcus zygomaticus', 'margo massetericus'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.80, ml: 0.88, ap: 0.72, radius: [0.24, 0.38, 0.38], normalHint: 'inferior' },
        description: {
          tr: 'Arkaya uzanarak temporal kemiğin processus zygomaticus’u ile elmacık kemerini (Arcus zygomaticus) tamamlayan çıkıntı ve kalın pürtüklü alt kenarı; çiğnemenin en güçlü kası olan M. masseter’in ana başlangıç yeridir.',
          en: 'Posterior projection completing the zygomatic arch and rough inferior border serving as the primary origin of the powerful masseter muscle.',
        },
        clinicalNote: {
          tr: 'Yanağa alınan darbelerde zigomatik kemik 4 dikiş hattından (frontozigomatik, temporozigomatik, zigomatikomaksiller ve zigomatikosfenoidal) ayrılarak "Tripod / Tetrapod (ZMK) Kırığı" oluşturur; çökme kırığı alttaki M. temporalis koronoid çıkıntısını sıkıştırarak ağız açmayı (trismus) engelleyebilir.',
          en: 'Blunt cheek trauma causes a zygomaticomaxillary complex ("tripod/tetrapod") fracture; a depressed arch fracture can impinge on the coronoid process and restrict jaw opening.',
        },
        attachments: [
          {
            id: 'att-masseter-zygomatic-origo',
            kind: 'origo',
            muscleLatin: 'M. masseter (Pars superficialis et profunda — Alt kenar ve Arcus zygomaticus)',
            muscleName: { tr: 'Masseter kası (Yüzeyel ve derin parçalar)', en: 'Masseter muscle (Superficial and deep parts)' },
            function: {
              tr: 'Mandibula köşesine (tuberositas masseterica) tutunarak alt çeneyi en yüksek ısırma kuvvetiyle kapatır (elevasyon).',
              en: 'Powerfully elevates the mandible against the maxilla during biting and chewing.',
            },
            innervation: { nerve: 'N. massetericus (N. mandibularis — CN V3)', roots: 'CN V3' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 8. OSSA NASI, LACRIMALE, PALATINUM, VOMER & CONCHA INFERIOR
  // ============================================================================
  {
    boneId: 'ossa-nasi-faciei',
    partIds: [
      'FJ3378', 'FJ3272', // Os nasale (R, L)
      'FJ3371', 'FJ3265', // Os lacrimale (R, L)
      'FJ3379', 'FJ3273', // Os palatinum (R, L)
      'FJ3395',           // Vomer
      'FJ3369', 'FJ3263', // Concha nasalis inferior (R, L)
    ],
    primaryPartId: 'FJ3378',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Os nasale, Os lacrimale, Os palatinum, Vomer & Concha nasalis inferior',
    title: { tr: 'Burun, Gözyaşı, Damak Kemikleri ve Vomer', en: 'Nasal, Lacrimal, Palatine, Vomer & Inferior Concha Bones' },
    summary: {
      tr: 'Visserokranyumun ince iç ve orta hat kemikleridir: burun sırtını kuran Os nasale, gözyaşı kesesini barındıran Os lacrimale, sert damağın arka 1/4’ünü yapan L biçimli Os palatinum, kemik septumun alt-arka kısmını yapan Vomer ve bağımsız Concha nasalis inferior.',
      en: 'Delicate facial bones forming the nasal bridge (nasal), medial orbital lacrimal fossa (lacrimal), posterior hard palate (palatine), posteroinferior nasal septum (vomer), and inferior nasal concha.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Os Nasale ve Os Lacrimale (Burun Sırtı ve Gözyaşı Çukuru)', en: 'Nasal & Lacrimal Bones (Superior)' },
      shaft: { tr: 'Vomer ve Concha Nasalis Inferior (Burun Boşluğu)', en: 'Vomer & Inferior Nasal Concha (Nasal Cavity)' },
      distal: { tr: 'Os Palatinum (Sert Damak Arka 1/4 ve Yumuşak Damak)', en: 'Palatine Bone (Posterior Hard Palate)' },
    },
    landmarks: [
      {
        id: 'nasi-lacrimale',
        number: 1,
        latinName: 'Os nasale & Os lacrimale (Crista lacrimalis posterior & Fossa sacci lacrimalis)',
        name: { tr: 'Burun Kemiği ve Gözyaşı Kemiği (Lakrimal Kese Çukuru)', en: 'Nasal Bone and Lacrimal Bone (Lacrimal Sac Fossa)' },
        synonyms: ['os nasale', 'os lacrimale', 'burun kemigi', 'gozyasi kemigi', 'fossa sacci lacrimalis'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.22, ml: 0.50, ap: 0.25, radius: [0.25, 0.45, 0.45], normalHint: 'anterior' },
        description: {
          tr: 'Burun köprüsünü oluşturan çift Os nasale (yüzde en sık kırılan kemiktir!) ve orbita iç duvarının ön kısmında yer alan tırnak büyüklüğündeki en küçük yüz kemiği Os lacrimale; maksilla ile birlikte gözyaşı kesesinin oturduğu Fossa sacci lacrimalis’i ve Canalis nasolacrimalis’i kurar.',
          en: 'Paired nasal bones forming the bridge of the nose (most commonly fractured facial bone) and the fingernail-sized lacrimal bone forming the fossa for the lacrimal sac.',
        },
        attachments: [
          {
            id: 'att-procerus-horner-origo',
            kind: 'origo',
            muscleLatin: 'M. procerus (Os nasale dış yüzü) & M. orbicularis oculi — Pars lacrimalis / Horner kası (Crista lacrimalis posterior)',
            muscleName: { tr: 'Proserus kası ve Orbikülaris oküli lakrimal parçası (Horner kası)', en: 'Procerus & Lacrimal part of Orbicularis oculi (Horner muscle)' },
            function: {
              tr: 'Procerus kaşların iç ucunu aşağı çekerek burun kökünde enine kırışıklık yapar; Horner kası göz kapaklarını içe yaklaştırır ve gözyaşı kesesini pompalayarak gözyaşının buruna drenajını sağlar.',
              en: 'Procerus wrinkles the skin over the bridge of the nose; Horner muscle draws the eyelids medially and dilates the lacrimal sac to pump tears.',
            },
            innervation: { nerve: 'N. facialis (CN VII)', roots: 'CN VII' },
          },
        ],
      },
      {
        id: 'vomer-concha-inferior',
        number: 2,
        latinName: 'Vomer (Septum nasi osseum) & Concha nasalis inferior',
        name: { tr: 'Vomer (Sapan Kemiği / Kemik Septum) ve Alt Nazal Konka', en: 'Vomer and Inferior Nasal Concha' },
        synonyms: ['vomer', 'concha nasalis inferior', 'sapan kemigi', 'alt nazal konka'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        partId: 'FJ3395',
        zone: { si: 0.55, ml: 0.45, ap: 0.55, radius: [0.25, 0.45, 0.45], normalHint: 'lateral' },
        description: {
          tr: 'Sapan demiri biçimindeki tek kemik Vomer, kemik burun bölmesinin (septum nasi) arka-alt kısmını oluşturur ve koanaları ikiye ayırır. Concha nasalis inferior ise burun yan duvarına tutunan bağımsız bir kemik olup altındaki Meatus nasi inferior’a gözyaşı kanalı (Ductus nasolacrimalis) açılır!',
          en: 'Unpaired ploughshare-shaped vomer forming the posteroinferior bony nasal septum, and the independent inferior nasal concha overhanging the inferior meatus (opening of the nasolacrimal duct).',
        },
        attachments: [],
      },
      {
        id: 'palatinum-lamina-horizontalis',
        number: 3,
        latinName: 'Os palatinum (Lamina horizontalis, Lamina perpendicularis & Spina nasalis posterior)',
        name: { tr: 'Palatin Kemik (Damak Kemiği — Sert Damak Arka 1/4)', en: 'Palatine Bone (Horizontal & Perpendicular Plates)' },
        synonyms: ['os palatinum', 'lamina horizontalis', 'spina nasalis posterior', 'palatin kemik', 'damak kemigi'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        partId: 'FJ3379',
        zone: { si: 0.82, ml: 0.50, ap: 0.72, radius: [0.24, 0.45, 0.45], normalHint: 'inferior' },
        description: {
          tr: 'Maksilla ile sfenoid kemik arasında yer alan L biçimli çift kemiktir; yatay yaprağı (Lamina horizontalis) sert damağın arka 1/4’ünü oluşturur ve arka kenarına yumuşak damak (Aponeurosis palatina) tutunur.',
          en: 'L-shaped bone whose horizontal plate forms the posterior quarter of the hard palate and anchors the palatine aponeurosis of the soft palate.',
        },
        attachments: [
          {
            id: 'att-uvulae-tensor-pterygoid-palatine',
            kind: 'origo',
            muscleLatin: 'M. uvulae (Spina nasalis posterior), M. tensor veli palatini (Aponeurosis palatina — Insertio) & M. pterygoideus medialis (Processus pyramidalis)',
            muscleName: { tr: 'Küçük dil kası (M. uvulae), Tensor veli palatini ve Medial pterygoid', en: 'Musculus uvulae, Tensor veli palatini & Medial pterygoid' },
            function: {
              tr: 'Yutkunma ve konuşma sırasında yumuşak damağı gerer/kaldırır ve küçük dili (uvula) kısaltarak nazofarinks geçişini kapatır.',
              en: 'Tense and elevate the soft palate and uvula to seal off the nasopharynx during swallowing and speech.',
            },
            innervation: { nerve: 'M. uvulae: Plexus pharyngeus (CN X); Tensor & Medial pterygoid: CN V3', roots: 'CN X, CN V3' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 9. OS HYOIDEUM (FJ3201)
  // ============================================================================
  {
    boneId: 'os-hyoideum',
    partIds: ['FJ3201'],
    primaryPartId: 'FJ3201',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Os hyoideum',
    title: { tr: 'Os Hyoideum (Hiyoid / Dil Kemiği)', en: 'Hyoid Bone' },
    summary: {
      tr: 'Boynun ön kısmında C3 omuru hizasında, mandibula ile tiroid kıkırdak arasında yer alan U (at nalı) biçimli tek kemiktir; İSKELETİN DİĞER HİÇBİR KEMİĞİYLE EKLEM YAPMAZ, tamamen kaslar ve bağlar (Lig. stylohyoideum) tarafından havada asılı tutulur!',
      en: 'U-shaped unpaired bone at the C3 vertebral level suspended entirely by muscles and the stylohyoid ligaments without articulating with any other bone in the body.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Cornu Minus ve Üst Kenar (Suprahyoid Tutunmalar)', en: 'Lesser Horn & Superior Border' },
      shaft: { tr: 'Corpus Ossis Hyoidei (Gövde — Supra/İnfrahyoid Kavşağı)', en: 'Body of Hyoid Bone' },
      distal: { tr: 'Cornu Majus (Büyük Boynuz — Dil ve Farinks Kasları)', en: 'Greater Horn of Hyoid' },
    },
    landmarks: [
      {
        id: 'hyoideum-cornu-minus',
        number: 1,
        latinName: 'Cornu minus ossis hyoidei',
        name: { tr: 'Küçük Boynuz (Ligamentum Stylohyoideum ve Digastrik Askı)', en: 'Lesser Horn of Hyoid Bone' },
        synonyms: ['cornu minus', 'cornu minus ossis hyoidei', 'kucuk boynuz', 'lesser horn of hyoid'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.36, ml: 0.69, ap: 0.20, radius: [0.24, 0.40, 0.40], normalHint: 'superior' },
        description: {
          tr: 'Gövde ile büyük boynuzun birleşim yerinden yukarı-arkaya doğru uzanan çift küçük konik çıkıntıdır; temporal kemiğin stiloid çıkıntısından gelen Ligamentum stylohyoideum buraya tutunarak hiyoidi kafa tabanına asar.',
          en: 'Paired small conical projections at the junction of the body and greater horns, anchoring the stylohyoid ligament from the cranial base.',
        },
        attachments: [
          {
            id: 'att-stylohyoideus-digastricus-sling',
            kind: 'insertio',
            muscleLatin: 'M. stylohyoideus & M. digastricus (Ara tendon fibröz halkası)',
            muscleName: { tr: 'Stilohiyoid kası ve Digastrik kas ara tendon halkası', en: 'Stylohyoideus & Digastric intermediate tendon pulley' },
            function: {
              tr: 'Yutkunma sırasında hiyoid kemiği ve larinksi yukarı-arkaya çekerek epiglottisin soluk borusunu kapatmasına yardımcı olur.',
              en: 'Elevate and retract the hyoid bone and larynx during swallowing.',
            },
            innervation: { nerve: 'N. facialis (CN VII) & N. mylohyoideus (CN V3)', roots: 'CN VII, CN V3' },
          },
        ],
      },
      {
        id: 'hyoideum-corpus',
        number: 2,
        latinName: 'Corpus ossis hyoidei',
        name: { tr: 'Hiyoid Gövdesi (Suprahiyoid ve İnfrahiyoid Kasların Kavşağı)', en: 'Body of Hyoid Bone' },
        synonyms: ['corpus ossis hyoidei', 'hiyoid govdesi', 'body of hyoid'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.55, ml: 0.25, ap: 0.18, radius: [0.25, 0.42, 0.40], normalHint: 'anterior' },
        description: {
          tr: 'At nalı biçimli kemiğin öne bakan dörtgen orta gövdesidir; üstten ağız tabanını oluşturan suprahiyoid kaslar, alttan ise şerit biçimli infrahiyoid kaslar buraya tutunur.',
          en: 'Quadrilateral anterior midline body receiving the suprahyoid muscles superiorly and the infrahyoid strap muscles inferiorly.',
        },
        attachments: [
          {
            id: 'att-suprahyoid-corpus-ins',
            kind: 'insertio',
            muscleLatin: 'M. mylohyoideus, M. geniohyoideus (Suprahyoid — Insertio) & M. genioglossus (Alt lifler)',
            muscleName: { tr: 'Mylohiyoid ve Geniohiyoid kasları (Üstten tutunanlar)', en: 'Mylohyoid and Geniohyoid muscles' },
            musclePartId: 'FJ1583',
            function: {
              tr: 'Hiyoidi öne-yukarı çeker (yutkunmanın oral/faringeal fazı) veya hiyoid sabitlendiğinde alt çeneyi aşağı çekerek ağzı açar.',
              en: 'Pull the hyoid anterosuperiorly during swallowing, or depress the mandible when the hyoid is fixed from below.',
            },
            innervation: { nerve: 'Mylohyoid: N. mylohyoideus (CN V3); Geniohyoid: C1 (N. hypoglossus ile)', roots: 'CN V3, C1' },
          },
          {
            id: 'att-infrahyoid-corpus-ins',
            kind: 'insertio',
            muscleLatin: 'M. sternohyoideus & M. omohyoideus (Venter superior — Alttan tutunanlar)',
            muscleName: { tr: 'Sternohiyoid ve Omohiyoid kasları (İnfrahiyoid şerit kaslar)', en: 'Sternohyoid and Omohyoid muscles' },
            musclePartId: 'FJ1596',
            function: {
              tr: 'Yutkunma sonrasında yükselmiş olan hiyoid kemiği ve larinksi tekrar aşağı çeker; suprahiyoid kasların çalışması için hiyoidi alttan sabitler.',
              en: 'Depress and fix the hyoid bone after swallowing and during phonation.',
            },
            innervation: { nerve: 'Ansa cervicalis (Plexus cervicalis)', roots: 'C1–C3' },
          },
        ],
      },
      {
        id: 'hyoideum-cornu-majus',
        number: 3,
        latinName: 'Cornu majus ossis hyoidei',
        name: { tr: 'Büyük Boynuz (Dil, Farinks ve Tirohiyoid Kasları)', en: 'Greater Horn of Hyoid Bone' },
        synonyms: ['cornu majus', 'cornu majus ossis hyoidei', 'buyuk boynuz', 'greater horn of hyoid'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.45, ml: 0.85, ap: 0.75, radius: [0.26, 0.40, 0.40], normalHint: 'lateral' },
        description: {
          tr: 'Gövdeden arkaya, dışa ve hafif yukarı uzanan uzun yan boynuzlardır; dilin dış kası (hyoglossus), orta yutak daraltıcısı (constrictor pharyngis medius) ve tirohiyoid kası buraya tutunur.',
          en: 'Long posterolateral horns giving origin to the hyoglossus and middle pharyngeal constrictor and receiving the thyrohyoid muscle.',
        },
        clinicalNote: {
          tr: 'Adli tıpta elle boğulma (strangülasyon) olgularında Cornu majus ossis hyoidei kırığı en önemli otopsi bulgularından biridir.',
          en: 'Fracture of the greater horns of the hyoid bone is a classic forensic hallmark of manual strangulation.',
        },
        attachments: [
          {
            id: 'att-hyoglossus-constrictor-thyrohyoid',
            kind: 'origo',
            muscleLatin: 'M. hyoglossus & M. constrictor pharyngis medius (Origo) / M. thyrohyoideus (Insertio)',
            muscleName: { tr: 'Hiyoglossus, Orta farinks konstriktörü ve Tirohiyoid kası', en: 'Hyoglossus, Middle pharyngeal constrictor & Thyrohyoid' },
            function: {
              tr: 'Hyoglossus dili aşağı-arkaya çeker; orta konstriktör yutkunmada farinksi daraltır; Thyrohyoideus tiroid kıkırdağı yukarı çeker veya hiyoidi indirir.',
              en: 'Hyoglossus depresses and retracts the tongue; middle constrictor propels food; thyrohyoid elevates the larynx or depresses the hyoid.',
            },
            innervation: { nerve: 'Hyoglossus: N. hypoglossus (CN XII); Constrictor: CN X; Thyrohyoid: C1 (CN XII ile)', roots: 'CN XII, CN X, C1' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 10. OSSICULA AUDITUS (Malleus, Incus & Stapes — Orta Kulak Kemikçikleri)
  // ============================================================================
  {
    boneId: 'ossicula-auditus',
    partIds: [
      'MOD_malleus_r', 'MOD_malleus_l',
      'MOD_incus_r', 'MOD_incus_l',
      'MOD_stapes_r', 'MOD_stapes_l',
    ],
    primaryPartId: 'MOD_malleus_r',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Ossicula auditus (Malleus, Incus, Stapes)',
    title: { tr: 'Ossicula Auditus (Orta Kulak Kemikçikleri: Çekiç, Örs, Üzengi)', en: 'Auditory Ossicles (Malleus, Incus, Stapes)' },
    summary: {
      tr: 'Temporal kemiğin orta kulak boşluğunda (Cavitas tympanica) kulak zarından (Membrana tympanica) iç kulağın oval penceresine (Fenestra vestibuli) uzanan, İNSAN VÜCUDUNUN EN KÜÇÜK ÜÇ KEMİĞİDİR; ses titreşimlerinin basıncını ~20 kat yükselterek iç kulak sıvısına (perilenfe) aktarır.',
      en: 'The three smallest bones in the human body spanning the middle ear cavity from the tympanic membrane to the oval window to amplify acoustic impedance.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Malleus (Çekiç Kemiği ve M. Tensor Tympani)', en: 'Malleus (Hammer & Tensor Tympani)' },
      shaft: { tr: 'Incus (Örs Kemiği — İnkudomalleolar ve İnkudostapedial Eklem)', en: 'Incus (Anvil Bone)' },
      distal: { tr: 'Stapes (Üzengi Kemiği — Vücudun En Küçük Kemiği ve M. Stapedius)', en: 'Stapes (Stirrup & Stapedius)' },
    },
    landmarks: [
      {
        id: 'ossicula-malleus',
        number: 1,
        latinName: 'Malleus (Caput, Collum & Manubrium mallei)',
        name: { tr: 'Malleus (Çekiç Kemikçiği — Kulak Zarına Tutunan Kol)', en: 'Malleus (Hammer — Handle & Head)' },
        synonyms: ['malleus', 'manubrium mallei', 'caput mallei', 'cekic kemigi'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.25, ml: 0.70, ap: 0.35, radius: [0.28, 0.42, 0.42], normalHint: 'lateral' },
        description: {
          tr: 'Sap kısmı (Manubrium mallei) kulak zarının iç yüzüne (Umbo membranae tympanicae) sıkıca kaynaşmış olan ilk kemikçiktir (1. faringeal ark / Meckel kıkırdağı türevi); yuvarlak başı (Caput mallei) arkada Incus ile eyer tipte eklem yapar.',
          en: 'First ossicle (derived from the 1st pharyngeal arch) whose handle (manubrium) is embedded in the tympanic membrane and whose head articulates with the incus.',
        },
        attachments: [
          {
            id: 'att-tensor-tympani-malleus-ins',
            kind: 'insertio',
            muscleLatin: 'M. tensor tympani (Manubrium mallei üst kısmı)',
            muscleName: { tr: 'Tensor timpani kası (Kulak zarı gerici kası)', en: 'Tensor tympani muscle' },
            function: {
              tr: 'Manubrium mallei’yi içe (mediale) çekerek kulak zarını gerer ve yüksek şiddetli seslerde (ve kendi çiğneme/konuşma sesimizde) iç kulağı akustik travmadan korur.',
              en: 'Pulls the handle of the malleus medially to tense the tympanic membrane and dampen loud low-frequency sounds.',
            },
            innervation: { nerve: 'N. musculi tensoris tympani (N. mandibularis — CN V3)', roots: 'CN V3' },
          },
        ],
      },
      {
        id: 'ossicula-incus',
        number: 2,
        latinName: 'Incus (Corpus, Crus breve, Crus longum & Processus lenticularis)',
        name: { tr: 'Incus (Örs Kemikçiği — Ara Kaldıraç Kemiği)', en: 'Incus (Anvil Bone)' },
        synonyms: ['incus', 'processus lenticularis', 'ors kemigi'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        partId: 'MOD_incus_r',
        zone: { si: 0.50, ml: 0.50, ap: 0.55, radius: [0.28, 0.42, 0.42], normalHint: 'posterior' },
        description: {
          tr: 'Malleus ile Stapes arasında titreşimi ileten örs biçimli orta kemikçiktir (1. faringeal ark türevi); uzun bacağının (Crus longum) ucundaki mercimek biçimli Processus lenticularis, stapes başı ile eklem yapar. Üzerine kas tutunmaz.',
          en: 'Intermediate anvil-shaped ossicle linking the malleus to the stapes via the lenticular process of its long limb; receives no muscular attachment.',
        },
        clinicalNote: {
          tr: 'Incus’un uzun bacağı (Crus longum) ve lentiküler çıkıntısı kanlanması en zayıf bölge olduğu için kronik otitis media’da en sık nekroza/erozyona uğrayan kemikçik parçasıdır.',
          en: 'The long process of the incus has a tenuous blood supply and is the ossicular segment most susceptible to necrosis in chronic otitis media.',
        },
        attachments: [],
      },
      {
        id: 'ossicula-stapes',
        number: 3,
        latinName: 'Stapes (Caput, Crus anterius/posterius & Basis stapedis)',
        name: { tr: 'Stapes (Üzengi Kemikçiği — Vücudun En Küçük Kemiği ve En Küçük Çizgili Kası)', en: 'Stapes (Stirrup — Smallest Bone in the Human Body)' },
        synonyms: ['stapes', 'basis stapedis', 'uzengi kemigi', 'stapedius'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        partId: 'MOD_stapes_r',
        zone: { si: 0.78, ml: 0.25, ap: 0.45, radius: [0.28, 0.42, 0.42], normalHint: 'medial' },
        description: {
          tr: 'Yaklaşık 3 mm boyuyla İNSAN VÜCUDUNUN EN KÜÇÜK KEMİĞİDİR (2. faringeal ark / Reichert kıkırdağı türevi); tabanı (Basis stapedis) iç kulağın Fenestra vestibuli’sine (oval pencere) oturur, boynuna ise vücudun en küçük çizgili kası olan M. stapedius tutunur.',
          en: 'Measuring ~3 mm, the stapes is the smallest bone in the human body (2nd pharyngeal arch derivative); its footplate seals the oval window of the inner ear.',
        },
        clinicalNote: {
          tr: 'Stapes tabanının oval pencere kenarına anormal süngerimsi kemikleşmeyle (ankiloz) sabitlenmesine "Otoskleroz" (genç erişkinlerde ilerleyici iletim tipi işitme kaybının en sık nedeni) denir. Fasiyal sinir (CN VII) lezyonlarında M. stapedius felcine bağlı seslerin aşırı yankılı/yüksek duyulmasına "Hiperakuzi" denir!',
          en: 'Bony ankylosis of the stapes footplate in the oval window causes Otosclerosis (conductive hearing loss); paralysis of the stapedius muscle in CN VII lesions causes Hyperacusis.',
        },
        attachments: [
          {
            id: 'att-stapedius-ins',
            kind: 'insertio',
            muscleLatin: 'M. stapedius (Collum stapedis — Vücudun en küçük iskelet kası)',
            muscleName: { tr: 'Stapedius kası (Üzengi kası)', en: 'Stapedius muscle' },
            function: {
              tr: 'Akustik reflekste stapes tabanını oval pencereden hafifçe dışa devirerek iç kulağı yüksek ses basıncından korur (felcinde Hiperakuzi gelişir!).',
              en: 'Tilts the stapes footplate in the oval window during the acoustic reflex to protect the cochlea from damagingly loud sounds.',
            },
            innervation: { nerve: 'N. stapedius (N. facialis — CN VII dalı)', roots: 'CN VII' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 11. DENTES PERMANENTES (Üst ve Alt Ark Dişleri — Kesici, Kanin, Premolar, Molar)
  // ============================================================================
  {
    boneId: 'dentes',
    partIds: [
      'FJ1254', 'FJ1255', 'FJ1256', 'FJ1257', 'FJ1258', 'FJ1259', 'FJ1260',
      'FJ1261', 'FJ1262', 'FJ1263', 'FJ1264', 'FJ1265', 'FJ1266', 'FJ1267',
      'FJ1268', 'FJ1269', 'FJ1270', 'FJ1271', 'FJ1272', 'FJ1273', 'FJ1274',
      'FJ1275', 'FJ1276', 'FJ1277', 'FJ1278', 'FJ1279', 'FJ1280', 'FJ1281',
    ],
    primaryPartId: 'FJ1276',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Dentes permanentes (Incisivi, Canini, Premolares, Molares)',
    title: { tr: 'Dentes (Daimi Dişler: Kesici, Kanin, Premolar ve Molar)', en: 'Permanent Teeth (Incisors, Canines, Premolars, Molars)' },
    summary: {
      tr: 'Maksilla ve mandibulanın alveolar çukurlarına (alveoli dentales) "Gomphosis" (çivi-yuva tipi fibröz sindesmoz eklem) ile yerleşen özelleşmiş sert yapılardır; Corona (taç), Cervix (boyun) ve Radix (kök) bölümlerinden oluşur.',
      en: 'Specialized mineralized structures anchored in the maxillary and mandibular alveoli via gomphosis joints, divided into crown (corona), neck (cervix), and root (radix).',
    },
    regionGroupLabels: {
      proximal: { tr: 'Corona Dentis ve Enamelum (Diş Tacı ve Mine)', en: 'Crown of Tooth & Enamel' },
      shaft: { tr: 'Cervix Dentis ve Dentinum / Pulpa (Boyun ve Pulpa Odası)', en: 'Neck of Tooth, Dentin & Pulp Chamber' },
      distal: { tr: 'Radix Dentis, Periodontium ve Gomphosis (Diş Kökü)', en: 'Root of Tooth, Cementum & Periodontal Ligament' },
    },
    landmarks: [
      {
        id: 'dentes-corona-enamelum',
        number: 1,
        latinName: 'Corona dentis, Facies occlusalis & Enamelum',
        name: { tr: 'Diş Tacı (Corona Dentis) ve Mine Tabakası (Vücudun En Sert Dokusu)', en: 'Clinical Crown and Dental Enamel' },
        synonyms: ['corona dentis', 'enamelum', 'facies occlusalis', 'dis taci', 'dis minesi'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.20, ml: 0.50, ap: 0.45, radius: [0.24, 0.48, 0.48], normalHint: 'superior' },
        description: {
          tr: 'Diş etinin (gingiva) üzerinde ağız boşluğunda görünen taç kısmıdır; üzerini örten Mine (Enamelum) %96 hidroksiapatit kristal içeriğiyle İNSAN VÜCUDUNUN EN SERT DOKUSUDUR. Kesici dişlerde keskin kenar (margo incisalis), azı dişlerinde ise öğütücü tüberküller (facies occlusalis) bulunur.',
          en: 'Exposed portion of the tooth covered by Enamel (~96% mineralized hydroxyapatite, the hardest substance in the human body) with incisal edges or occlusal cusps.',
        },
        attachments: [],
      },
      {
        id: 'dentes-cervix-pulpa',
        number: 2,
        latinName: 'Cervix dentis, Dentinum & Cavitas dentis (Pulpa)',
        name: { tr: 'Diş Boynu (Mine-Sement Sınırı), Dentin ve Pulpa Boşluğu', en: 'Neck of Tooth (CEJ), Dentin & Pulp Cavity' },
        synonyms: ['cervix dentis', 'dentinum', 'pulpa dentis', 'dis boynu'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.52, ml: 0.50, ap: 0.45, radius: [0.22, 0.48, 0.48], normalHint: 'lateral' },
        description: {
          tr: 'Taç ile kök arasındaki geçiş bölgesi (Cervix dentis — diş eti oluğunun tutunduğu mine-sement sınırı), dişin ana kütlesini oluşturan Dentinum ve merkezinde damar-sinir paketini barındıran Cavitas pulpares.',
          en: 'Cementoenamel junction at the gingival margin surrounding the tubular dentin bulk and the neurovascular pulp chamber.',
        },
        neurovascularRelation: {
          structureLatin: 'Nn. alveolares superiores (CN V2 — Maxilla) & N. alveolaris inferior (CN V3 — Mandibula)',
          note: {
            tr: 'Üst çene dişlerinin duyusunu N. maxillaris (CN V2), alt çene dişlerinin duyusunu ise Canalis mandibulae içinde seyreden N. alveolaris inferior (CN V3) taşır.',
            en: 'Upper teeth are innervated by the superior alveolar nerves (CN V2), while lower teeth are supplied by the inferior alveolar nerve (CN V3).',
          },
        },
        attachments: [],
      },
      {
        id: 'dentes-radix-periodontium',
        number: 3,
        latinName: 'Radix dentis, Apex radicis dentis & Periodontium (Art. dentoalveolaris / Gomphosis)',
        name: { tr: 'Diş Kökü, Kök Ucu Deliği ve Periodontal Ligament (Gomphosis Eklemi)', en: 'Tooth Root, Apical Foramen & Periodontal Ligament (Gomphosis)' },
        synonyms: ['radix dentis', 'periodontium', 'gomphosis', 'dis koku'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.85, ml: 0.50, ap: 0.45, radius: [0.22, 0.48, 0.48], normalHint: 'inferior' },
        description: {
          tr: 'Sement (Cementum) ile kaplı olan diş kökü, alveol kemiğine Sharpey liflerinden oluşan Periodontal Ligament (Desmodontium) ile bağlanır; bu özel fibröz ekleme Gomphosis denir ve çiğneme basıncını esneyerek amortisör gibi sönümler.',
          en: 'Cementum-covered root suspended in the bony socket by the collagenous Sharpey fibers of the periodontal ligament (gomphosis joint).',
        },
        clinicalNote: {
          tr: 'Üst 1. ve 2. molar (büyük azı) dişlerin kök uçları Sinus maxillaris tabanıyla çok yakın komşudur; diş çekimi sırasında sinüs tabanı açılarak oroantral fistül gelişebilir veya maksiller sinüzit üst diş ağrısı gibi yansıyabilir.',
          en: 'The root apices of the upper 1st and 2nd molars project closely into the floor of the maxillary sinus, explaining referred dental pain in sinusitis and oroantral fistula risk after extraction.',
        },
        attachments: [],
      },
    ],
  },

  // ============================================================================
  // 12. CARTILAGINES LARYNGIS ET NASI (Larinks ve Burun Kıkırdakları)
  // ============================================================================
  {
    boneId: 'cartilagines-laryngis-nasi',
    partIds: [
      'FJ2808',           // Cartilago thyroidea
      'FJ2769',           // Cartilago cricoidea
      'FJ2792', 'FJ2775', // Cartilago arytenoidea (R, L)
      'FJ2793', 'FJ2776', // Cartilago corniculata (R, L)
      'FJ2795', 'FJ2773', // Cartilago cuneiformis (R, L)
      'FJ2557',           // Cartilago septi nasi
      'FJ2556', 'FJ2558', // Cartilago nasi lateralis (L, R)
      'FJ2554', 'FJ2555', // Cartilago alaris major (R, L)
    ],
    primaryPartId: 'FJ2808',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Cartilagines laryngis (Thyroidea, Cricoidea, Arytenoidea) & Cartilagines nasi',
    title: { tr: 'Larinks (Gırtlak) ve Burun Kıkırdak İskeleti', en: 'Laryngeal and Nasal Cartilage Skeleton' },
    summary: {
      tr: 'Solunum yolunu açık tutan ve ses üretimini (fonasyonu) sağlayan hiyalin/elastik kıkırdak iskeletidir: kalkan biçimli Cartilago thyroidea (Adem elması), solunum yolundaki tek tam halka olan Cartilago cricoidea, ses tellerini hareket ettiren Cartilago arytenoidea ve dış burun kıkırdakları.',
      en: 'Cartilaginous framework maintaining airway patency and phonation: the shield-like thyroid cartilage, signet-ring cricoid cartilage (only complete ring in the airway), vocal-cord-moving arytenoids, and nasal cartilages.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Cartilago Thyroidea (Tiroid Kıkırdak ve Linea Obliqua)', en: 'Thyroid Cartilage & Oblique Line' },
      shaft: { tr: 'Cartilago Arytenoidea (Vokal ve Musküler Çıkıntılar) ve Burun Kıkırdakları', en: 'Arytenoid & Nasal Cartilages' },
      distal: { tr: 'Cartilago Cricoidea (Krikoid Halka ve Krikotiroid/PCA Kasları)', en: 'Cricoid Cartilage (Signet Ring)' },
    },
    landmarks: [
      {
        id: 'laryngis-thyroidea',
        number: 1,
        latinName: 'Cartilago thyroidea (Prominentia laryngea & Linea obliqua)',
        name: { tr: 'Tiroid Kıkırdak (Adem Elması ve Oblik Çizgi)', en: 'Thyroid Cartilage (Laryngeal Prominence & Oblique Line)' },
        synonyms: ['cartilago thyroidea', 'prominentia laryngea', 'linea obliqua', 'tiroid kikirdak', 'adem elmasi'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.25, ml: 0.45, ap: 0.20, radius: [0.25, 0.45, 0.42], normalHint: 'anterior' },
        description: {
          tr: 'Larinksin en büyük kıkırdağıdır (C4–C5 hizası); iki dörtgen laminanın önde birleşmesiyle oluşan çıkıntıya Prominentia laryngea ("Adem elması") denir. Dış yüzündeki Linea obliqua’ya dış larinks/farinks kasları, iç yüz köşesine ise ses telleri (Lig. vocale / M. vocalis) tutunur.',
          en: 'Largest laryngeal cartilage forming the laryngeal prominence ("Adam’s apple") at C4–C5; its external oblique line anchors the extrinsic laryngeal muscles and its inner angle anchors the vocal cords.',
        },
        attachments: [
          {
            id: 'att-linea-obliqua-thyroid-muscles',
            kind: 'insertio',
            muscleLatin: 'M. sternothyroideus (Insertio), M. thyrohyoideus & M. constrictor pharyngis inferior (Origo — Linea obliqua)',
            muscleName: { tr: 'Sternotiroid, Tirohiyoid ve Alt farinks konstriktörü (Linea obliqua)', en: 'Sternothyroid, Thyrohyoid & Inferior pharyngeal constrictor' },
            musclePartId: 'FJ1597',
            function: {
              tr: 'Sternothyroideus larinksi aşağı çeker; Thyrohyoideus larinksi yukarı çeker; alt konstriktör yutkunmada farinksi daraltır.',
              en: 'Depress (sternothyroid) and elevate (thyrohyoid) the larynx during swallowing and pitch modulation.',
            },
            innervation: { nerve: 'Sternothyroid: Ansa cervicalis (C1–C3); Thyrohyoid: C1; Constrictor inf.: CN X', roots: 'C1–C3, CN X' },
          },
          {
            id: 'att-thyroarytenoideus-vocalis-origo',
            kind: 'origo',
            muscleLatin: 'M. thyroarytenoideus & M. vocalis (Tiroid iç köşesinden aritenoid kıkırdağa)',
            muscleName: { tr: 'Tiroaritenoid ve Vokalis (Ses teli) kasları', en: 'Thyroarytenoid and Vocalis muscles' },
            function: {
              tr: 'Ses tellerini (plica vocalis) gevşetir, kısaltır ve ses perdesinin ince ayarını yapar.',
              en: 'Relax and shorten the vocal folds and fine-tune vocal fold tension during speech and singing.',
            },
            innervation: { nerve: 'N. laryngeus inferior / recurrens (N. vagus — CN X)', roots: 'CN X' },
          },
        ],
      },
      {
        id: 'laryngis-arytenoidea-nasi',
        number: 2,
        latinName: 'Cartilago arytenoidea (Processus vocalis et muscularis), Corniculata, Cuneiformis & Cartilagines nasi',
        name: { tr: 'Aritenoid Kıkırdak (Vokal ve Musküler Çıkıntılar) ve Burun Kıkırdakları', en: 'Arytenoid Cartilage (Vocal & Muscular Processes) & Nasal Cartilages' },
        synonyms: ['cartilago arytenoidea', 'processus vocalis', 'processus muscularis', 'cartilago septi nasi', 'aritenoid kikirdak'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        partId: 'FJ2792',
        zone: { si: 0.55, ml: 0.50, ap: 0.72, radius: [0.25, 0.45, 0.42], normalHint: 'posterior' },
        description: {
          tr: 'Krikoid laminanın üst kenarına oturan üçgen piramit biçimli çift Cartilago arytenoidea; öne uzanan Processus vocalis’ine ses teli (Lig. vocale), dışa uzanan Processus muscularis’ine ise rima glottidis’i açıp kapatan iç larinks kasları tutunur.',
          en: 'Paired pyramidal arytenoid cartilages pivoting on the cricoid lamina; the anterior vocal process attaches the vocal ligament, while the lateral muscular process receives the intrinsic abductors and adductors.',
        },
        attachments: [
          {
            id: 'att-arytenoid-adductors-ins',
            kind: 'insertio',
            muscleLatin: 'M. cricoarytenoideus lateralis (Processus muscularis) & Mm. arytenoidei transversus et obliquus',
            muscleName: { tr: 'Lateral krikoaritenoid ve İnteraritenoid kaslar (Ses teli adduktörleri)', en: 'Lateral cricoarytenoid & Interarytenoid muscles (Vocal cord adductors)' },
            function: {
              tr: 'Aritenoid kıkırdakları içe döndürerek ve yaklaştırarak ses tellerini kapatır (adduksiyon — fonasyon ve öksürük refleksi).',
              en: 'Rotate and approximate the arytenoid cartilages to adduct the vocal folds for phonation and airway protection.',
            },
            innervation: { nerve: 'N. laryngeus recurrens (N. vagus — CN X)', roots: 'CN X' },
          },
        ],
      },
      {
        id: 'laryngis-cricoidea',
        number: 3,
        latinName: 'Cartilago cricoidea (Arcus & Lamina cartilaginis cricoideae)',
        name: { tr: 'Krikoid Kıkırdak (Yüzük Kıkırdak — Solunum Yolunun Tek Tam Halkası)', en: 'Cricoid Cartilage (Signet Ring at C6 Level)' },
        synonyms: ['cartilago cricoidea', 'krikoid kikirdak', 'cricoid cartilage'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        partId: 'FJ2769',
        zone: { si: 0.85, ml: 0.45, ap: 0.50, radius: [0.24, 0.45, 0.45], normalHint: 'inferior' },
        description: {
          tr: 'C6 omuru hizasında (larinks/trakea ve farinks/özofagus geçiş sınırında) yer alan mühür yüzüğü biçimli hiyalin kıkırdaktır; önde dar Arcus, arkada geniş Lamina’dan oluşur ve tüm solunum ağacında 360° TAM HALKA olan tek kıkırdaktır!',
          en: 'Signet-ring-shaped hyaline cartilage at the C6 vertebral level; the ONLY complete 360° cartilaginous ring in the entire respiratory tract.',
        },
        clinicalNote: {
          tr: 'Acil cerrahi havayolu açılmasında (Krikotiroidotomi / Koniotomi) tiroid ile krikoid kıkırdak arasındaki Ligamentum cricothyroideum medianum delinir.',
          en: 'Emergency surgical airway access (cricothyrotomy) is performed through the median cricothyroid membrane between the thyroid and cricoid cartilages.',
        },
        attachments: [
          {
            id: 'att-pca-cricothyroid-origo',
            kind: 'origo',
            muscleLatin: 'M. cricoarytenoideus posterior (Lamina arka yüzü — TEK Abduktör!) & M. cricothyroideus (Ön kemer — Anticus)',
            muscleName: { tr: 'Posterior krikoaritenoid (Soluk borusunu açan tek kas!) ve Krikotiroid kası', en: 'Posterior cricoarytenoid (Sole abductor!) & Cricothyroid muscle' },
            function: {
              tr: 'M. cricoarytenoideus posterior ses tellerini birbirinden uzaklaştırarak (ABDUKSİYON) nefes almamızı sağlayan TEK kastır! M. cricothyroideus ise tiroid kıkırdağı öne devirerek ses tellerini gerer (tiz ses üretir).',
              en: 'Posterior cricoarytenoid is the SOLE abductor of the vocal folds (essential for breathing); cricothyroid tenses and elongates the vocal folds to raise vocal pitch.',
            },
            innervation: { nerve: 'PCA: N. laryngeus recurrens; Cricothyroideus: N. laryngeus superior (Ramus externus — CN X)!', roots: 'CN X' },
          },
        ],
      },
    ],
  },
];
