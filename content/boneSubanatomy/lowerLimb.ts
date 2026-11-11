import { BONE_ZONE_PALETTE, type BoneSubanatomySpec } from './domain';

export const LOWER_LIMB_BONE_SPECS: readonly BoneSubanatomySpec[] = [
  // ============================================================================
  // 1. OS COXAE (FJ3152 Right, FJ3288 Left + Female HRA Ilium/Ischium/Pubis)
  // ============================================================================
  {
    boneId: 'os-coxae',
    partIds: [
      'FJ3152',
      'FJ3288',
      'HRA_ilium_compact_bone_r',
      'HRA_ilium_compact_bone_l',
      'HRA_ischium_compact_bone_r',
      'HRA_ischium_compact_bone_l',
      'HRA_pubis_compact_bone_r',
      'HRA_pubis_compact_bone_l',
    ],
    primaryPartId: 'FJ3152',
    packId: 'pelvis',
    category: 'lower-limb',
    latinName: 'Os coxae (Ilium, Ischium, Pubis)',
    title: { tr: 'Os Coxae (Kalça / Pelvis Kemiği)', en: 'Hip Bone (Os Coxae / Pelvis)' },
    summary: {
      tr: 'Ergenlik dönemine (14–16 yaş) kadar Y biçimli triradiat kıkırdak ile ayrılan Os ilium (üst), Os ischii (arka-alt) ve Os pubis (ön-alt) kemiklerinin asetabulumda kaynaşmasıyla oluşan pelvis kuşağı kemiğidir.',
      en: 'Large irregular pelvic girdle bone formed by the fusion of the ilium, ischium, and pubis at the acetabular triradiate cartilage during puberty.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Os Ilium (İlyak Kanat ve Dikensi Çıkıntılar)', en: 'Ilium (Ala & Iliac Spines)' },
      shaft: { tr: 'Acetabulum ve Pelvik Orta Kuşak', en: 'Acetabulum & Mid-Pelvis' },
      distal: { tr: 'Os Ischii ve Os Pubis (Alt Kuşak)', en: 'Ischium & Pubis' },
    },
    landmarks: [
      {
        id: 'coxae-crista-iliaca',
        number: 1,
        latinName: 'Crista iliaca',
        name: { tr: 'İlyak İbik (Crista iliaca)', en: 'Iliac Crest' },
        synonyms: ['crista iliaca', 'ilyak ibik', 'iliac crest'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.08, ml: 0.72, ap: 0.50, radius: [0.10, 0.35, 0.45], normalHint: 'superior' },
        description: {
          tr: 'Os ilium kanadının L4 vertebra hizasında uzanan kalın, S biçimli üst kenarıdır; karın yan duvarı kasları ile geniş sırt kaslarının tutunma yeridir.',
          en: 'Thick S-shaped superior border of the wing of the ilium; its highest point lies at the L4 vertebral level (supracristal plane for lumbar puncture).',
        },
        attachments: [
          {
            id: 'att-abd-obliques-ins',
            kind: 'insertio',
            muscleLatin: 'M. obliquus externus, internus & M. transversus abdominis',
            muscleName: { tr: 'Karın yan duvarı kasları (Dış/İç oblik ve Transversus)', en: 'Lateral abdominal wall muscles' },
            musclePartId: 'FJ1452',
            function: {
              tr: 'Gövde fleksiyonu/rotasyonu yapar ve karın içi basıncı artırarak kor stabilizasyonu sağlar.',
              en: 'Flex and rotate the trunk and compress abdominal viscera for core stability.',
            },
            innervation: { nerve: 'Nn. thoracoabdominales (T7–T11), N. subcostalis (T12), N. iliohypogastricus (L1)', roots: 'T7–L1' },
          },
          {
            id: 'att-quadratus-lumb-origo',
            kind: 'origo',
            muscleLatin: 'M. quadratus lumborum & M. latissimus dorsi (Arka kısım)',
            muscleName: { tr: 'Kuadratus lumborum ve Latissimus dorsi', en: 'Quadratus lumborum & Latissimus dorsi' },
            function: {
              tr: 'Yürümenin salınım fazında pelvisi sabitler, gövdeyi yana eğer (lateral fleksiyon) ve 12. kaburgayı tespit eder.',
              en: 'Laterally flexes the vertebral column, fixes the 12th rib, and stabilizes the pelvis.',
            },
            innervation: { nerve: 'N. subcostalis & Plexus lumbalis (T12–L4) / N. thoracodorsalis (C6–C8)', roots: 'T12–L4' },
          },
        ],
      },
      {
        id: 'coxae-sias',
        number: 2,
        latinName: 'Spina iliaca anterior superior (SIAS)',
        name: { tr: 'Üst Ön İlyak Diken (SIAS / ASIS)', en: 'Anterior Superior Iliac Spine (ASIS)' },
        synonyms: ['spina iliaca anterior superior', 'sias', 'asis', 'ust on ilyak diken'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.25, ml: 0.85, ap: 0.12, radius: [0.09, 0.25, 0.25], normalHint: 'anterior' },
        description: {
          tr: 'Crista iliaca’nın ön ucundaki belirgin kemik çıkıntıdır; alt ekstremite gerçek uzunluk ölçümünde (SIAS – medial malleol arası) temel yüzeyel röper noktasıdır.',
          en: 'Prominent anterior extremity of the iliac crest; primary surface landmark for measuring true lower-limb length (ASIS to medial malleolus).',
        },
        attachments: [
          {
            id: 'att-sartorius-origo',
            kind: 'origo',
            muscleLatin: 'M. sartorius',
            muscleName: { tr: 'Sartorius kası ("Terzi kası")', en: 'Sartorius muscle' },
            musclePartId: 'FJ1434',
            function: {
              tr: 'Uyluğa fleksiyon, abduksiyon ve dış rotasyon; bacağa (dize) fleksiyon ve iç rotasyon yaptırır (bağdaş kurma pozisyonu).',
              en: 'Flexes, abducts, and laterally rotates the hip; flexes and medially rotates the knee.',
            },
            innervation: { nerve: 'N. femoralis', roots: 'L2–L3' },
          },
          {
            id: 'att-tfl-origo',
            kind: 'origo',
            muscleLatin: 'M. tensor fasciae latae (SIAS ve ön crista iliaca)',
            muscleName: { tr: 'Tensor fasya lata kası', en: 'Tensor fasciae latae muscle' },
            musclePartId: 'FJ1438',
            function: {
              tr: 'Tractus iliotibialis’i gererek ekstansiyondaki dizi kilitler; uyluğa abduksiyon, fleksiyon ve iç rotasyon yaptırır.',
              en: 'Tenses the iliotibial tract to stabilize the extended knee; abducts, flexes, and medially rotates the hip.',
            },
            innervation: { nerve: 'N. gluteus superior', roots: 'L4–S1' },
          },
        ],
      },
      {
        id: 'coxae-siai',
        number: 3,
        latinName: 'Spina iliaca anterior inferior (SIAI)',
        name: { tr: 'Alt Ön İlyak Diken (SIAI / AIIS)', en: 'Anterior Inferior Iliac Spine (AIIS)' },
        synonyms: ['spina iliaca anterior inferior', 'siai', 'aiis', 'alt on ilyak diken'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.42, ml: 0.68, ap: 0.16, radius: [0.08, 0.25, 0.25], normalHint: 'anterior' },
        description: {
          tr: 'SIAS’ın hemen altında ve asetabulum üst kenarının hemen üstünde yer alan çıkıntıdır; kuadriseps kasının iki eklem geçen tek başı buradan başlar.',
          en: 'Bony eminence situated between the ASIS and the superior rim of the acetabulum.',
        },
        clinicalNote: {
          tr: 'Adölesan futbolcularda ve koşucularda topa sert vurma sırasında m. rectus femoris’in ani kasılmasıyla SIAI kopma (avülsiyon) kırığı sık görülür.',
          en: 'Forceful kicking in adolescent athletes can cause an avulsion fracture of the AIIS via sudden traction of rectus femoris.',
        },
        attachments: [
          {
            id: 'att-rectus-femoris-origo',
            kind: 'origo',
            muscleLatin: 'M. rectus femoris (Caput rectum)',
            muscleName: { tr: 'Rektus femoris kası (Düz baş)', en: 'Rectus femoris muscle (Straight head)' },
            musclePartId: 'FJ1433',
            function: {
              tr: 'Hem kalça eklemine fleksiyon hem de diz eklemine ekstansiyon yaptıran iki eklemli kuadriseps başıdır.',
              en: 'Biarticular muscle that flexes the thigh at the hip and extends the leg at the knee.',
            },
            innervation: { nerve: 'N. femoralis', roots: 'L2–L4' },
          },
        ],
      },
      {
        id: 'coxae-fossa-iliaca-facies-glutea',
        number: 4,
        latinName: 'Fossa iliaca (İç) & Facies glutea (Dış)',
        name: { tr: 'İlyak Çukur (İç Yüz) ve Gluteal Yüz (Dış Yüz)', en: 'Iliac Fossa & Gluteal Surface' },
        synonyms: ['fossa iliaca', 'facies glutea', 'ilyak cukur', 'gluteal yuz'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[3],
        zone: { si: 0.30, ml: 0.55, ap: 0.55, radius: [0.16, 0.35, 0.38], normalHint: 'lateral' },
        description: {
          tr: 'Ala ossis ilii’nin içbükey ön-iç yüzü Fossa iliaca (m. iliacus’un yatağı), dışbükey arka-dış yüzü ise üç gluteal çizgiyle (linea glutea posterior, anterior, inferior) bölünen Facies glutea’dır.',
          en: 'The concave internal iliac fossa houses iliacus, whereas the external gluteal surface is marked by three gluteal lines for the three gluteal muscles.',
        },
        attachments: [
          {
            id: 'att-iliacus-origo',
            kind: 'origo',
            muscleLatin: 'M. iliacus (Fossa iliaca — iç yüz)',
            muscleName: { tr: 'İliakus kası (İলিopsoas’ın ilyak parçası)', en: 'Iliacus muscle' },
            musclePartId: 'FJ1422',
            function: {
              tr: 'M. psoas major ile birleşerek uyluğun (kalçanın) en güçlü fleksörü olarak görev yapar.',
              en: 'Joins psoas major as iliopsoas, the chief flexor of the thigh at the hip.',
            },
            innervation: { nerve: 'N. femoralis', roots: 'L2–L3' },
          },
          {
            id: 'att-glutei-origo',
            kind: 'origo',
            muscleLatin: 'M. gluteus maximus, medius & minimus (Facies glutea — dış yüz)',
            muscleName: { tr: 'Gluteus maksimus, medius ve minimus kasları', en: 'Gluteus maximus, medius & minimus' },
            musclePartId: 'FJ1419',
            function: {
              tr: 'Gluteus maximus kalçanın en güçlü ekstansörü ve dış rotatörüdür; Gluteus medius ve minimus ise uyluğun esas abduktörleridir ve yürümede karşı pelvisin düşmesini (Trendelenburg) önler.',
              en: 'Gluteus maximus extends/laterally rotates the hip; gluteus medius and minimus abduct the thigh and level the pelvis during single-leg stance.',
            },
            innervation: { nerve: 'Maximus: N. gluteus inferior (L5–S2); Medius & Minimus: N. gluteus superior (L4–S1)', roots: 'L4–S2' },
          },
        ],
      },
      {
        id: 'coxae-acetabulum',
        number: 5,
        latinName: 'Acetabulum (Facies lunata)',
        name: { tr: 'Asetabulum (Hokka Çukuru)', en: 'Acetabulum' },
        synonyms: ['acetabulum', 'facies lunata', 'asetabulum', 'hokka cukuru'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[4],
        zone: { si: 0.62, ml: 0.72, ap: 0.45, radius: [0.12, 0.30, 0.35], normalHint: 'lateral' },
        description: {
          tr: 'Os coxae’nin dış yüzünde ilium (%40), ischium (%40) ve pubis (%20) tarafından oluşturulan yarım küre biçimli derin eklem yuvasıdır; sadece at nalı şeklindeki Facies lunata hiyalin kıkırdakla kaplıdır.',
          en: 'Hemispherical lateral socket receiving the femoral head; only its horseshoe-shaped lunate surface (facies lunata) is covered by hyaline cartilage.',
        },
        clinicalNote: {
          tr: 'Araç içi trafik kazalarında fleksiyondaki dizin torpidoya çarpmasıyla femur başı asetabulum arka duvarını kırarak arkaya çıkar ve hemen arkasındaki N. ischiadicus’u zedeleyebilir.',
          en: 'Dashboard impact on a flexed knee drives the femoral head posteriorly, fracturing the posterior acetabular wall and risking sciatic nerve injury.',
        },
        attachments: [],
      },
      {
        id: 'coxae-tuber-ischiadicum',
        number: 6,
        latinName: 'Tuber ischiadicum',
        name: { tr: 'İskiyal Tüberkül (Oturak Çıkıntısı)', en: 'Ischial Tuberosity' },
        synonyms: ['tuber ischiadicum', 'iskiyal tuberkul', 'oturak cikintisi', 'ischial tuberosity'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[5],
        zone: { si: 0.90, ml: 0.48, ap: 0.78, radius: [0.10, 0.30, 0.32], normalHint: 'posterior' },
        description: {
          tr: 'Os ischii’nin arka-alt kısmındaki çok kalın ve pürtüklü kemik kütlesidir; dik otururken vücut ağırlığını taşıyan noktadır ve uyluk arka kompartman (Hamstring) kaslarının ortak başlangıç yeridir.',
          en: 'Massive posteroinferior rough prominence of the ischium that bears body weight when sitting and gives origin to the hamstring muscles.',
        },
        attachments: [
          {
            id: 'att-hamstrings-origo',
            kind: 'origo',
            muscleLatin: 'M. semitendinosus, M. semimembranosus & M. biceps femoris (Caput longum)',
            muscleName: { tr: 'Hamstring kasları (Yarı-tendinöz, Yarı-membranöz ve Biceps uzun başı)', en: 'Hamstring muscles (Semitendinosus, Semimembranosus, Long head of Biceps femoris)' },
            musclePartId: 'FJ1395',
            function: {
              tr: 'Kalça eklemine ekstansiyon ve diz eklemine fleksiyon yaptırır.',
              en: 'Extend the thigh at the hip and flex the leg at the knee.',
            },
            innervation: { nerve: 'N. ischiadicus (Pars tibialis)', roots: 'L5–S2' },
          },
          {
            id: 'att-adductor-magnus-isch-origo',
            kind: 'origo',
            muscleLatin: 'M. adductor magnus (Pars ischiocondylaris / Hamstring parçası)',
            muscleName: { tr: 'Adduktor magnus (İskiyal/Arka parça)', en: 'Adductor magnus (Hamstring part)' },
            musclePartId: 'FJ1403',
            function: {
              tr: 'Uyluğa güçlü adduksiyon ve kalçaya ekstansiyon yaptırır.',
              en: 'Powerfully adducts and extends the thigh.',
            },
            innervation: { nerve: 'N. ischiadicus (Pars tibialis)', roots: 'L4–S1' },
          },
        ],
      },
      {
        id: 'coxae-pubis-foramen-obturatum',
        number: 7,
        latinName: 'Os pubis (Tuberculum pubicum) & Foramen obturatum',
        name: { tr: 'Pubis Kemiği ve Obturator Delik', en: 'Pubis (Pubic Tubercle) & Obturator Foramen' },
        synonyms: ['os pubis', 'tuberculum pubicum', 'foramen obturatum', 'pecten ossis pubis', 'pubic tubercle'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[6],
        zone: { si: 0.78, ml: 0.18, ap: 0.18, radius: [0.14, 0.30, 0.32], normalHint: 'anterior' },
        description: {
          tr: 'Ön orta hatta symphysis pubica ile birleşen Os pubis ve ischium ile sınırladığı, membrana obturatoria ile kapalı büyük Foramen obturatum; uyluk iç yan (adduktor) kaslarının ana başlangıç bölgesidir.',
          en: 'Anterior pubic body/rami and the large obturator foramen; primary site of origin for the medial (adductor) compartment of the thigh.',
        },
        attachments: [
          {
            id: 'att-adductors-origo',
            kind: 'origo',
            muscleLatin: 'M. adductor longus, M. adductor brevis, M. gracilis & M. pectineus',
            muscleName: { tr: 'Uyluk adduktor kasları (Adduktor longus, brevis, Grasilis, Pektineus)', en: 'Medial thigh adductors (Adductor longus, brevis, Gracilis, Pectineus)' },
            musclePartId: 'FJ1402',
            function: {
              tr: 'Uyluğa güçlü adduksiyon ve kalça fleksiyonuna yardım eder.',
              en: 'Adduct the thigh and assist in hip flexion.',
            },
            innervation: { nerve: 'N. obturatorius (Pectineus: N. femoralis)', roots: 'L2–L4' },
          },
          {
            id: 'att-rectus-abdominis-ins',
            kind: 'insertio',
            muscleLatin: 'M. rectus abdominis (Crista pubica & Symphysis pubica)',
            muscleName: { tr: 'Rektus abdominis kası', en: 'Rectus abdominis muscle' },
            function: {
              tr: 'Gövdeye (lomber omurgaya) fleksiyon yaptırır ve pelvisi arkaya tilt (posterior pelvik tilt) ettirir.',
              en: 'Flexes the lumbar spine and posteriorly tilts the pelvis.',
            },
            innervation: { nerve: 'Nn. thoracoabdominales (T7–T12)', roots: 'T7–T12' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 2. FEMUR (FJ3365 Right, FJ3259 Left)
  // ============================================================================
  {
    boneId: 'femur',
    partIds: ['FJ3365', 'FJ3259'],
    primaryPartId: 'FJ3365',
    packId: 'leg-right',
    category: 'lower-limb',
    latinName: 'Femur (Os femoris)',
    title: { tr: 'Femur (Uyluk Kemiği)', en: 'Femur (Thigh Bone)' },
    summary: {
      tr: 'İnsan vücudunun en uzun, en hacimli ve en sağlam kemiğidir; boy uzunluğunun yaklaşık dörtte birini oluşturur ve kalçadan dize mekanik yük aksını taşır.',
      en: 'The longest, heaviest, and strongest bone in the human body, transmitting weight from the pelvic girdle to the tibia.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Proksimal Epifiz (Baş, Boyun ve Trokanterler)', en: 'Proximal Epiphysis (Head, Neck & Trochanters)' },
      shaft: { tr: 'Corpus Femoris (Gövde ve Linea Aspera)', en: 'Shaft (Diaphysis & Linea Aspera)' },
      distal: { tr: 'Distal Epifiz (Kondiller ve Patellar Yüz)', en: 'Distal Epiphysis (Condyles)' },
    },
    landmarks: [
      {
        id: 'femur-caput-collum',
        number: 1,
        latinName: 'Caput femoris & Collum femoris',
        name: { tr: 'Femur Başı ve Boynu', en: 'Head and Neck of Femur' },
        synonyms: ['caput femoris', 'collum femoris', 'femur basi', 'femur boynu', 'head of femur', 'neck of femur'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.05, ml: 0.30, ap: 0.45, radius: [0.07, 0.50, 0.45], normalHint: 'medial' },
        description: {
          tr: 'Kürenin 2/3’ü büyüklüğündeki Caput femoris (tepesinde lig. capitis femoris’in tutunduğu fovea capitis bulunur) gövde ile ~125° inklinasyon açısı ve ~15° anteversiyon açısı yapan Collum femoris ile birleşir.',
          en: 'Two-thirds spherical femoral head (with fovea capitis) joined to the shaft by the femoral neck at a ~125° angle of inclination.',
        },
        clinicalNote: {
          tr: 'Femur başını besleyen retinaküler arterler (A. circumflexa femoris medialis dalları) collum femoris boyunca uzanır; intrakapsüler femur boyun kırıklarında bu damarlar yırtılarak Femur Başı Avasküler Nekrozu (AVN) gelişir.',
          en: 'Intracapsular femoral neck fractures disrupt the retinacular branches of the medial circumflex femoral artery, leading to avascular necrosis (AVN) of the femoral head.',
        },
        attachments: [],
      },
      {
        id: 'femur-trochanter-major',
        number: 2,
        latinName: 'Trochanter major',
        name: { tr: 'Büyük Trokanter', en: 'Greater Trochanter' },
        synonyms: ['trochanter major', 'buyuk trokanter', 'greater trochanter'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.07, ml: 0.88, ap: 0.55, radius: [0.07, 0.30, 0.45], normalHint: 'lateral' },
        description: {
          tr: 'Boyun ile gövdenin birleşim yerinin dış yanında yukarı doğru uzanan dörtgen biçimli büyük çıkıntıdır; kalça abduktörleri ve derin dış rotatör pelvitrokanterik kasların sonlanma (insertio) merkezidir.',
          en: 'Large quadrangular lateral projection at the neck-shaft junction; the primary lever arm for hip abductors and short external rotators.',
        },
        attachments: [
          {
            id: 'att-gluteus-medius-minimus-ins',
            kind: 'insertio',
            muscleLatin: 'M. gluteus medius (Dış yüz) & M. gluteus minimus (Ön kenar)',
            muscleName: { tr: 'Gluteus medius ve Gluteus minimus kasları', en: 'Gluteus medius & Gluteus minimus' },
            musclePartId: 'FJ1419',
            function: {
              tr: 'Uyluğun en güçlü abduktörleridir ve ön lifleriyle iç rotasyon yaparlar; yürümede pelvisi yatay tutarlar.',
              en: 'Abduct and medially rotate the thigh; keep the pelvis level during the swing phase of gait.',
            },
            innervation: { nerve: 'N. gluteus superior', roots: 'L4–S1' },
          },
          {
            id: 'att-piriformis-rotators-ins',
            kind: 'insertio',
            muscleLatin: 'M. piriformis, M. obturatorius internus/externus & Mm. gemelli',
            muscleName: { tr: 'Piriformis ve Derin pelvitrokanterik dış rotatör kaslar', en: 'Piriformis & Deep external rotators' },
            musclePartId: 'FJ1428',
            function: {
              tr: 'Uyluğa dış (lateral) rotasyon yaptırır ve femur başını asetabulum içinde stabilize eder.',
              en: 'Laterally rotate the extended thigh and stabilize the hip joint.',
            },
            innervation: { nerve: 'Plexus sacralis (L5–S2) & N. obturatorius (L3–L4)', roots: 'L3–S2' },
          },
        ],
      },
      {
        id: 'femur-trochanter-minor',
        number: 3,
        latinName: 'Trochanter minor',
        name: { tr: 'Küçük Trokanter', en: 'Lesser Trochanter' },
        synonyms: ['trochanter minor', 'kucuk trokanter', 'lesser trochanter'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.16, ml: 0.30, ap: 0.78, radius: [0.06, 0.32, 0.35], normalHint: 'posterior' },
        description: {
          tr: 'Boynun alt-arka-iç (posteromedial) kesiminde yer alan konik çıkıntıdır; vücudun en güçlü kalça fleksörü olan m. iliopsoas tendonunun tutunma yeridir.',
          en: 'Conical posteromedial eminence at the base of the femoral neck receiving the combined tendon of iliopsoas.',
        },
        attachments: [
          {
            id: 'att-iliopsoas-ins',
            kind: 'insertio',
            muscleLatin: 'M. iliopsoas (M. psoas major + M. iliacus)',
            muscleName: { tr: 'İliopsoas kası', en: 'Iliopsoas muscle' },
            musclePartId: 'FJ1431',
            function: {
              tr: 'Uyluğun (kalça ekleminin) en güçlü fleksörüdür; sabit alt ekstremitede gövdeyi öne kaldırır.',
              en: 'Strongest flexor of the thigh at the hip joint; flexes the trunk when the limb is fixed.',
            },
            innervation: { nerve: 'Psoas major: Rr. anteriores L1–L3; Iliacus: N. femoralis (L2–L3)', roots: 'L1–L3' },
          },
        ],
      },
      {
        id: 'femur-tuberositas-glutea-pectinea',
        number: 4,
        latinName: 'Tuberositas glutea & Linea pectinea',
        name: { tr: 'Gluteal Tüberositas ve Pektineal Çizgi', en: 'Gluteal Tuberosity & Pectineal Line' },
        synonyms: ['tuberositas glutea', 'linea pectinea', 'gluteal tuberositas', 'gluteal tuberosity'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[3],
        zone: { si: 0.26, ml: 0.65, ap: 0.85, radius: [0.09, 0.40, 0.35], normalHint: 'posterior' },
        description: {
          tr: 'Proksimal femur arka yüzünde trochanter major’dan linea aspera dış dudağına inen kaba sırt Tuberositas glutea, trochanter minor’dan iç dudağa inen çizgi ise Linea pectinea’dır.',
          en: 'Proximal posterior ridges descending from the greater and lesser trochanters to form the lateral and medial lips of the linea aspera.',
        },
        attachments: [
          {
            id: 'att-gluteus-max-ins',
            kind: 'insertio',
            muscleLatin: 'M. gluteus maximus (Derin alt lifler — Tuberositas glutea)',
            muscleName: { tr: 'Gluteus maksimus kası', en: 'Gluteus maximus muscle' },
            musclePartId: 'FJ1418',
            function: {
              tr: 'Uyluğun en güçlü ekstansörü (merdiven çıkma, oturur pozisyondan ayağa kalkma) ve dış rotatörüdür.',
              en: 'Chief extensor (rising from a chair, climbing stairs) and powerful lateral rotator of the hip.',
            },
            innervation: { nerve: 'N. gluteus inferior', roots: 'L5–S2' },
          },
          {
            id: 'att-pectineus-ins',
            kind: 'insertio',
            muscleLatin: 'M. pectineus (Linea pectinea)',
            muscleName: { tr: 'Pektineus kası', en: 'Pectineus muscle' },
            musclePartId: 'FJ1427',
            function: {
              tr: 'Uyluğa hem adduksiyon hem de fleksiyon yaptırır.',
              en: 'Adducts and flexes the thigh at the hip.',
            },
            innervation: { nerve: 'N. femoralis (bazen N. obturatorius ek dalı)', roots: 'L2–L3' },
          },
        ],
      },
      {
        id: 'femur-linea-aspera',
        number: 5,
        latinName: 'Linea aspera & Corpus femoris',
        name: { tr: 'Linea Aspera (Arka Keskin Sırt) ve Femur Gövdesi', en: 'Linea Aspera and Femoral Shaft' },
        synonyms: ['linea aspera', 'corpus femoris', 'labium mediale', 'labium laterale'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[4],
        zone: { si: 0.52, ml: 0.50, ap: 0.85, radius: [0.16, 0.45, 0.35], normalHint: 'posterior' },
        description: {
          tr: 'Femur diyafizinin arka yüzü boyunca uzanan çift dudaklı (labium mediale et laterale) belirgin uzunlamasına kemik sırtıdır; uyluğun hem ekstansör (vastus) hem de adduktor kaslarının ana tutunma hattıdır.',
          en: 'Prominent longitudinal double-lipped crest along the posterior femoral shaft anchoring both the vasti (origins) and adductors (insertions).',
        },
        attachments: [
          {
            id: 'att-vasti-origo',
            kind: 'origo',
            muscleLatin: 'M. vastus lateralis, M. vastus medialis & M. vastus intermedius',
            muscleName: { tr: 'Kuadriseps vastus kasları (Lateralis, Medialis, İntermedius)', en: 'Vastus lateralis, medialis & intermedius' },
            musclePartId: 'FJ1442',
            function: {
              tr: 'Diz ekleminin (bacağın) en güçlü ekstansörüdür ve patellayı dinamik olarak stabilize eder.',
              en: 'Extend the leg at the knee joint and dynamically track the patella.',
            },
            innervation: { nerve: 'N. femoralis', roots: 'L2–L4' },
          },
          {
            id: 'att-adductors-ins',
            kind: 'insertio',
            muscleLatin: 'M. adductor longus, M. adductor brevis & M. adductor magnus',
            muscleName: { tr: 'Adduktor longus, brevis ve magnus kasları', en: 'Adductor longus, brevis & magnus' },
            musclePartId: 'FJ1402',
            function: {
              tr: 'Uyluğa güçlü adduksiyon yaptırır.',
              en: 'Adduct the thigh at the hip.',
            },
            innervation: { nerve: 'N. obturatorius', roots: 'L2–L4' },
          },
          {
            id: 'att-biceps-short-fem-origo',
            kind: 'origo',
            muscleLatin: 'M. biceps femoris (Caput breve — Labium laterale)',
            muscleName: { tr: 'Biceps femoris kısa başı', en: 'Biceps femoris short head' },
            musclePartId: 'FJ1444',
            function: {
              tr: 'Diz eklemine fleksiyon ve fleksiyondaki bacağa dış rotasyon yaptırır.',
              en: 'Flexes the knee and laterally rotates the flexed leg.',
            },
            innervation: { nerve: 'N. ischiadicus (Pars fibularis / peronealis communis)', roots: 'L5–S2' },
          },
        ],
      },
      {
        id: 'femur-condylus-medialis-adductorium',
        number: 6,
        latinName: 'Condylus medialis & Tuberculum adductorium',
        name: { tr: 'Medial Kondil ve Adduktor Tüberkül', en: 'Medial Condyle and Adductor Tubercle' },
        synonyms: ['condylus medialis', 'tuberculum adductorium', 'medial kondil', 'adduktor tuberkul', 'adductor tubercle'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[5],
        zone: { si: 0.93, ml: 0.14, ap: 0.55, radius: [0.07, 0.30, 0.45], normalHint: 'medial' },
        description: {
          tr: 'Distal femurun iç yanındaki geniş kondildir; hemen üst tepe noktasında m. adductor magnus’un iskiyokondiler parçasının tutunduğu keskin çıkıntı (Tuberculum adductorium) bulunur.',
          en: 'Medial distal femoral condyle crowned superiorly by the palpable adductor tubercle.',
        },
        attachments: [
          {
            id: 'att-adductor-magnus-tub-ins',
            kind: 'insertio',
            muscleLatin: 'M. adductor magnus (Pars ischiocondylaris — Tuberculum adductorium)',
            muscleName: { tr: 'Adduktor magnus (Hamstring parçası — Hiatus adductorius sınırı)', en: 'Adductor magnus (Ischiocondylar part)' },
            musclePartId: 'FJ1403',
            function: {
              tr: 'Uyluğa adduksiyon ve kalçaya ekstansiyon yaptırır (tutunma yerinin hemen üstündeki hiatus adductorius’tan A. femoralis geçip A. poplitea olur).',
              en: 'Adducts and extends the thigh; forms the adductor hiatus through which femoral vessels enter the popliteal fossa.',
            },
            innervation: { nerve: 'N. ischiadicus (Pars tibialis)', roots: 'L4–S1' },
          },
          {
            id: 'att-gastroc-med-origo',
            kind: 'origo',
            muscleLatin: 'M. gastrocnemius (Caput mediale — Arka-üst yüz)',
            muscleName: { tr: 'Gastroknemius kası (İç baş)', en: 'Gastrocnemius (Medial head)' },
            musclePartId: 'FJ1397',
            function: {
              tr: 'Ayak bileğine güçlü plantar fleksiyon ve diz eklemine fleksiyon yaptırır.',
              en: 'Plantarflexes the ankle and flexes the knee.',
            },
            innervation: { nerve: 'N. tibialis', roots: 'S1–S2' },
          },
        ],
      },
      {
        id: 'femur-condylus-lateralis-patellaris',
        number: 7,
        latinName: 'Condylus lateralis & Facies patellaris',
        name: { tr: 'Lateral Kondil ve Patellar Eklem Yüzü', en: 'Lateral Condyle and Patellar Surface' },
        synonyms: ['condylus lateralis', 'facies patellaris', 'lateral kondil', 'patellar surface'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[6],
        zone: { si: 0.94, ml: 0.84, ap: 0.40, radius: [0.07, 0.32, 0.45], normalHint: 'lateral' },
        description: {
          tr: 'Ön yüzde patellanın kaydığı oluklu Facies patellaris (dış dudağı daha yüksek olduğu için patellanın dışa çıkmasını engeller) ve dış yandaki Condylus lateralis.',
          en: 'Anterior trochlear patellar groove (with a higher lateral lip preventing lateral patellar dislocation) and the lateral femoral condyle.',
        },
        attachments: [
          {
            id: 'att-gastroc-lat-popliteus-origo',
            kind: 'origo',
            muscleLatin: 'M. gastrocnemius (Caput laterale), M. plantaris & M. popliteus',
            muscleName: { tr: 'Gastroknemius dış başı, Plantaris ve Popliteus', en: 'Gastrocnemius lateral head, Plantaris & Popliteus' },
            musclePartId: 'FJ1394',
            function: {
              tr: 'Gastrocnemius ayak plantar fleksiyonu yapar; Popliteus ise kilitlenmiş dizi femura dış (veya serbest bacağa iç) rotasyon yaptırarak çözer ("dizin anahtarı").',
              en: 'Gastrocnemius plantarflexes the ankle; popliteus unlocks the extended knee by laterally rotating the femur on the fixed tibia.',
            },
            innervation: { nerve: 'N. tibialis', roots: 'L4–S2' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 3. PATELLA (FJ3381 Right, FJ3275 Left)
  // ============================================================================
  {
    boneId: 'patella',
    partIds: ['FJ3381', 'FJ3275'],
    primaryPartId: 'FJ3381',
    packId: 'leg-right',
    category: 'lower-limb',
    latinName: 'Patella',
    title: { tr: 'Patella (Diz Kapağı Kemiği)', en: 'Patella (Kneecap)' },
    summary: {
      tr: 'M. quadriceps femoris tendonu içinde gelişmiş, insan vücudunun EN BÜYÜK sesamoid kemiğidir; kuadriseps kasının kaldıraç kolunu (moment kolunu) uzatarak diz ekstansiyon gücünü ~%30–50 artırır.',
      en: 'Largest sesamoid bone in the human body, embedded in the quadriceps tendon to increase the mechanical leverage of knee extension by ~30–50%.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Basis Patellae (Üst Taban / Kuadriseps Tutunması)', en: 'Base of Patella (Superior)' },
      shaft: { tr: 'Facies Articularis ve Anterior (Eklem Yüzü)', en: 'Articular & Anterior Surfaces' },
      distal: { tr: 'Apex Patellae (Alt Uç / Patellar Ligament)', en: 'Apex of Patella (Inferior)' },
    },
    landmarks: [
      {
        id: 'patella-basis',
        number: 1,
        latinName: 'Basis patellae',
        name: { tr: 'Patella Tabanı (Üst Kenar — Kuadriseps Tendonu)', en: 'Base of Patella' },
        synonyms: ['basis patellae', 'patella tabani', 'base of patella'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.14, ml: 0.50, ap: 0.35, radius: [0.22, 0.45, 0.45], normalHint: 'superior' },
        description: {
          tr: 'Üçgen biçimli patellanın yukarı bakan kalın ve geniş üst kenarıdır; kuadriseps kasının dört başının ortak tendonu buraya ve yan retinakulumlara tutunur.',
          en: 'Thick, broad superior border of the patella receiving the common tendon of the quadriceps femoris.',
        },
        attachments: [
          {
            id: 'att-quadriceps-patella-ins',
            kind: 'insertio',
            muscleLatin: 'M. quadriceps femoris (M. rectus femoris, M. vastus intermedius, lateralis & medialis)',
            muscleName: { tr: 'Kuadriseps femoris kası (Dört başlı uyluk kası)', en: 'Quadriceps femoris muscle' },
            musclePartId: 'FJ1433',
            function: {
              tr: 'Diz ekleminin tek ve en güçlü ekstansörüdür; Vastus medialis obliquus (VMO) lifleri patellayı mediale çekerek dışa çıkmasını (lateral subluksasyonu) önler!',
              en: 'Sole extensor of the knee joint; vastus medialis obliquus (VMO) fibers dynamically stabilize the patella against lateral dislocation.',
            },
            innervation: { nerve: 'N. femoralis', roots: 'L2–L4' },
          },
        ],
      },
      {
        id: 'patella-facies-articularis',
        number: 2,
        latinName: 'Facies articularis patellae (Medial & Lateral Fasetler)',
        name: { tr: 'Patella Eklem Yüzü (Vücudun En Kalın Hiyalin Kıkırdağı)', en: 'Articular Surface of Patella' },
        synonyms: ['facies articularis patellae', 'patella eklem yuzu', 'articular surface of patella'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.48, ml: 0.50, ap: 0.82, radius: [0.24, 0.45, 0.35], normalHint: 'posterior' },
        description: {
          tr: 'Femurun facies patellaris’i (troklea) ile femoropatellar eklemi kuran oval arka yüzdür; dikey bir sırtla daha geniş bir lateral faset ve daha dar bir medial fasete ayrılır. İnsan vücudunun EN KALIN hiyalin eklem kıkırdağına (~5–6 mm) sahiptir!',
          en: 'Posterior oval surface divided by a vertical ridge into a larger lateral and smaller medial facet; covered by the thickest hyaline cartilage in the body (~5–6 mm).',
        },
        clinicalNote: {
          tr: 'Q açısı nedeniyle patella her zaman laterale (dışa) çıkma eğilimindedir; femur lateral kondili ve VMO kası bunu engeller. Arka yüz kıkırdak yumuşamasına Kondromalazi Patella (Patellofemoral Ağrı Sendromu) denir.',
          en: 'Patellar dislocations occur almost exclusively laterally; softening/degeneration of the retropatellar cartilage causes Chondromalacia Patellae.',
        },
        attachments: [],
      },
      {
        id: 'patella-apex',
        number: 3,
        latinName: 'Apex patellae (Ligamentum patellae tutunması)',
        name: { tr: 'Patella Tepesi (Alt Sivri Uç)', en: 'Apex of Patella' },
        synonyms: ['apex patellae', 'patella tepesi', 'apex of patella'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.86, ml: 0.50, ap: 0.25, radius: [0.20, 0.42, 0.42], normalHint: 'inferior' },
        description: {
          tr: 'Patellanın aşağıya bakan sivri alt ucudur; buradan başlayan Ligamentum patellae, kuadriseps çekiş kuvvetini Tuberositas tibiae’ya aktarır.',
          en: 'Pointed inferior pole giving attachment to the patellar ligament, which transmits quadriceps force to the tibial tuberosity.',
        },
        clinicalNote: {
          tr: 'Sıçrama sporcularında ("Jumper’s knee" — patellar tendinopati) ve büyüme çağındaki çocuklarda (Sinding-Larsen-Johansson sendromu) apex patellae üzerinde kronik traksiyon ağrısı görülür.',
          en: 'Site of chronic traction apophysitis in adolescents (Sinding-Larsen-Johansson syndrome) and patellar tendinopathy ("Jumper’s knee").',
        },
        attachments: [],
      },
    ],
  },

  // ============================================================================
  // 4. TIBIA (FJ3387 Right, FJ3282 Left)
  // ============================================================================
  {
    boneId: 'tibia',
    partIds: ['FJ3387', 'FJ3282'],
    primaryPartId: 'FJ3387',
    packId: 'leg-right',
    category: 'lower-limb',
    latinName: 'Tibia',
    title: { tr: 'Tibia (Kaval Kemiği)', en: 'Tibia (Shin Bone)' },
    summary: {
      tr: 'Bacağın iç yanında yer alan ve vücut ağırlığının ~%85–90’ını dizden ayak bileğine (talusa) ileten, femurdan sonra vücudun en büyük ikinci kemiğidir.',
      en: 'Medial weight-bearing bone of the leg, second largest bone in the body, transmitting ~85–90% of axial load from the femur to the talus.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Proksimal Uç (Plato, Tüberositas ve Pes Anserinus)', en: 'Proximal End (Plateau, Tuberosity & Pes Anserinus)' },
      shaft: { tr: 'Corpus Tibiae ve Linea Musculi Solei', en: 'Shaft & Soleal Line' },
      distal: { tr: 'Distal Uç (Malleolus Medialis)', en: 'Distal End (Medial Malleolus)' },
    },
    landmarks: [
      {
        id: 'tibia-condyli-eminentia',
        number: 1,
        latinName: 'Condylus medialis et lateralis & Eminentia intercondylaris',
        name: { tr: 'Tibia Kondilleri (Tibia Platosu) ve Gerdy Tüberkülü', en: 'Tibial Condyles (Plateau) & Gerdy’s Tubercle' },
        synonyms: ['condylus medialis tibiae', 'condylus lateralis tibiae', 'eminentia intercondylaris', 'tibia platosu', 'gerdy tuberkulu'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.04, ml: 0.55, ap: 0.45, radius: [0.06, 0.48, 0.45], normalHint: 'superior' },
        description: {
          tr: 'Üst yüzdeki medial ve lateral eklem platoları ile aralarındaki ön/arka çapraz bağların (ACL/PCL) ve menisküslerin tutunduğu Eminentia intercondylaris; dış kondilin ön yüzünde Tractus iliotibialis’in tutunduğu Gerdy tüberkülü yer alır.',
          en: 'Medial and lateral tibial plateaus separated by the intercondylar eminence (anchoring the ACL/PCL and menisci), with Gerdy’s tubercle on the anterolateral condyle.',
        },
        attachments: [
          {
            id: 'att-itb-gerdy-ins',
            kind: 'insertio',
            muscleLatin: 'Tractus iliotibialis (M. tensor fasciae latae & M. gluteus maximus — Gerdy tüberkülü)',
            muscleName: { tr: 'İliotibial bant (Gerdy tüberkülü)', en: 'Iliotibial tract (Gerdy’s tubercle)' },
            musclePartId: 'FJ1438',
            function: {
              tr: 'Ayakta dururken ve yürürken ekstansiyondaki dizin lateral stabilitesini sağlar.',
              en: 'Stabilizes the extended knee laterally during standing and locomotion.',
            },
            innervation: { nerve: 'N. gluteus superior et inferior', roots: 'L4–S2' },
          },
          {
            id: 'att-semimembranosus-ins',
            kind: 'insertio',
            muscleLatin: 'M. semimembranosus (Medial kondil arka oluğu)',
            muscleName: { tr: 'Semimembranosus kası', en: 'Semimembranosus muscle' },
            musclePartId: 'FJ1435',
            function: {
              tr: 'Dize fleksiyon/iç rotasyon ve kalçaya ekstansiyon yaptırır.',
              en: 'Flexes and medially rotates the knee; extends the hip.',
            },
            innervation: { nerve: 'N. ischiadicus (Pars tibialis)', roots: 'L5–S2' },
          },
        ],
      },
      {
        id: 'tibia-tuberositas-tibiae',
        number: 2,
        latinName: 'Tuberositas tibiae',
        name: { tr: 'Tibia Tüberositası', en: 'Tibial Tuberosity' },
        synonyms: ['tuberositas tibiae', 'tibia tuberositasi', 'tibial tuberosity'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.11, ml: 0.71, ap: 0.04, radius: [0.06, 0.35, 0.30], normalHint: 'anterior' },
        description: {
          tr: 'Proksimal tibianın ön yüzünde, kondillerin hemen altında yer alan belirgin kemik kabartıdır; tüm m. quadriceps femoris kuvvetini patella üzerinden bacağa ileten Ligamentum patellae buraya tutunur.',
          en: 'Prominent anterior elevation just below the tibial condyles that receives the patellar ligament (quadriceps mechanism).',
        },
        clinicalNote: {
          tr: 'Büyüme çağındaki (10–15 yaş) sporcu çocuklarda kuadrisepsin tekrarlayan çekmesiyle tuberositas tibiae apofizinde ağrılı traksiyon apofiziti (Osgood-Schlatter hastalığı) gelişir.',
          en: 'Repetitive quadriceps traction on the immature tibial tuberosity apophysis in adolescents causes Osgood-Schlatter disease.',
        },
        attachments: [
          {
            id: 'att-quadriceps-patellar-ins',
            kind: 'insertio',
            muscleLatin: 'M. quadriceps femoris (Ligamentum patellae aracılığıyla)',
            muscleName: { tr: 'Kuadriseps femoris kası (4 başın ortak sonlanması)', en: 'Quadriceps femoris (via Patellar ligament)' },
            musclePartId: 'FJ1433',
            function: {
              tr: 'Bacağın (diz ekleminin) tek ve en güçlü ekstansörüdür.',
              en: 'Sole and powerful extensor of the leg at the knee joint.',
            },
            innervation: { nerve: 'N. femoralis', roots: 'L2–L4' },
          },
        ],
      },
      {
        id: 'tibia-pes-anserinus',
        number: 3,
        latinName: 'Pes anserinus (Proksimal Medial Yüz)',
        name: { tr: 'Pes Anserinus ("Kaz Ayağı" Tutunma Bölgesi)', en: 'Pes Anserinus ("Goose’s Foot")' },
        synonyms: ['pes anserinus', 'kaz ayagi', 'sartorius gracilis semitendinosus'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.16, ml: 0.18, ap: 0.35, radius: [0.07, 0.32, 0.38], normalHint: 'medial' },
        description: {
          tr: 'Tuberositas tibiae’nin iç yanında (proksimal anteromedial tibia yüzünde), uyluğun üç ayrı kompartmanından (ön, iç, arka) gelen üç kas tendonunun kaz ayağı şeklinde birleşerek tutunduğu klinikte çok önemli bölgedir.',
          en: 'Anteromedial proximal tibial surface where the conjoined tendons of three muscles from all three thigh compartments insert ("Say Grace Before Tea").',
        },
        attachments: [
          {
            id: 'att-pes-sartorius-ins',
            kind: 'insertio',
            muscleLatin: 'M. sartorius (Ön kompartman)',
            muscleName: { tr: 'Sartorius kası (1. — En önde)', en: 'Sartorius muscle' },
            musclePartId: 'FJ1434',
            function: {
              tr: 'Dize fleksiyon ve iç rotasyon yaptırır, dizin medial valgus stabilitesini destekler.',
              en: 'Flexes and medially rotates the leg; dynamic medial stabilizer of the knee.',
            },
            innervation: { nerve: 'N. femoralis', roots: 'L2–L3' },
          },
          {
            id: 'att-pes-gracilis-ins',
            kind: 'insertio',
            muscleLatin: 'M. gracilis (İç / Adduktor kompartman)',
            muscleName: { tr: 'Grasilis kası (2. — Ortada)', en: 'Gracilis muscle' },
            musclePartId: 'FJ1421',
            function: {
              tr: 'Uyluğa adduksiyon, dize fleksiyon ve iç rotasyon yaptırır.',
              en: 'Adducts the thigh; flexes and medially rotates the leg.',
            },
            innervation: { nerve: 'N. obturatorius', roots: 'L2–L3' },
          },
          {
            id: 'att-pes-semitendinosus-ins',
            kind: 'insertio',
            muscleLatin: 'M. semitendinosus (Arka / Hamstring kompartmanı)',
            muscleName: { tr: 'Semitendinosus kası (3. — En arkada/altta)', en: 'Semitendinosus muscle' },
            musclePartId: 'FJ1436',
            function: {
              tr: 'Kalçaya ekstansiyon, dize fleksiyon ve iç rotasyon yaptırır.',
              en: 'Extends the hip; flexes and medially rotates the knee.',
            },
            innervation: { nerve: 'N. ischiadicus (Pars tibialis)', roots: 'L5–S2' },
          },
        ],
      },
      {
        id: 'tibia-corpus-linea-solei',
        number: 4,
        latinName: 'Corpus tibiae & Linea musculi solei',
        name: { tr: 'Tibia Gövdesi ve Soleus Çizgisi', en: 'Tibial Shaft and Soleal Line' },
        synonyms: ['corpus tibiae', 'linea musculi solei', 'soleus cizgisi', 'soleal line'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[3],
        zone: { si: 0.42, ml: 0.55, ap: 0.65, radius: [0.16, 0.45, 0.45], normalHint: 'posterior' },
        description: {
          tr: 'Tibia gövdesinin dış yan yüzünden m. tibialis anterior başlarken, arka yüzün üst kısmında dıştan iç-aşağıya uzanan oblik Linea musculi solei bulunur.',
          en: 'The anterolateral shaft gives origin to tibialis anterior, while the posterior proximal shaft bears the oblique soleal line.',
        },
        attachments: [
          {
            id: 'att-tibialis-ant-origo',
            kind: 'origo',
            muscleLatin: 'M. tibialis anterior (Proksimal 2/3 dış yüz)',
            muscleName: { tr: 'Tibialis anterior kası', en: 'Tibialis anterior muscle' },
            musclePartId: 'FJ1439',
            function: {
              tr: 'Ayağın en güçlü dorsifleksörü (ekstansörü) ve invertörüdür.',
              en: 'Strongest dorsiflexor and invertor of the foot.',
            },
            innervation: { nerve: 'N. fibularis (peroneus) profundus', roots: 'L4–L5' },
          },
          {
            id: 'att-soleus-popliteus-origo',
            kind: 'origo',
            muscleLatin: 'M. soleus (Linea m. solei), M. popliteus (Üstü) & M. flexor digitorum longus (Altı)',
            muscleName: { tr: 'Soleus, Popliteus ve Fleksor digitorum longus kasları', en: 'Soleus, Popliteus & Flexor digitorum longus' },
            musclePartId: 'FJ1437',
            function: {
              tr: 'Soleus ayak bileğine güçlü plantar fleksiyon yaptırır (postüral antigravite kası); FDL 2.–5. ayak parmaklarına fleksiyon yaptırır.',
              en: 'Soleus plantarflexes the ankle continuously during standing; FDL flexes lateral four toes.',
            },
            innervation: { nerve: 'N. tibialis', roots: 'L4–S2' },
          },
        ],
      },
      {
        id: 'tibia-malleolus-medialis',
        number: 5,
        latinName: 'Malleolus medialis',
        name: { tr: 'Medial Malleol (İç Aşık Çıkıntısı)', en: 'Medial Malleolus' },
        synonyms: ['malleolus medialis', 'medial malleol', 'ic malleol', 'medial malleolus'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[4],
        zone: { si: 0.96, ml: 0.15, ap: 0.48, radius: [0.06, 0.35, 0.45], normalHint: 'medial' },
        description: {
          tr: 'Distal tibianın iç yanında aşağı doğru uzanan kalın kemik çıkıntıdır; talus’un iç yüzü ile eklemleşir ve deltoid bağın (lig. collaterale mediale) başlangıç yeridir.',
          en: 'Prominent medial downward projection of the distal tibia articulating with the talus and anchoring the deltoid ligament.',
        },
        neurovascularRelation: {
          structureLatin: 'Tarsal Tünel (N. tibialis & A. tibialis posterior)',
          note: {
            tr: 'Medial malleolün hemen arkasındaki fleksör retinakulumun altından (Tarsal Tünel) önden arkaya doğru: M. tibialis posterior, M. flexor digitorum longus, A./V. tibialis posterior, N. tibialis ve M. flexor hallucis longus ("Tom, Dick And Very Nervous Harry") geçer.',
            en: 'Posterior to the medial malleolus lies the tarsal tunnel transmitting Tom, Dick, And Very Nervous Harry (TP, FDL, posterior tibial vessels, tibial nerve, FHL).',
          },
        },
        attachments: [],
      },
    ],
  },

  // ============================================================================
  // 5. FIBULA (FJ3366 Right, FJ3260 Left)
  // ============================================================================
  {
    boneId: 'fibula',
    partIds: ['FJ3366', 'FJ3260'],
    primaryPartId: 'FJ3366',
    packId: 'leg-right',
    category: 'lower-limb',
    latinName: 'Fibula (Perone)',
    title: { tr: 'Fibula (Kamış Kemiği)', en: 'Fibula' },
    summary: {
      tr: 'Bacağın dış yanında yer alan ince kemiktir; diz eklemine katılmaz ve çok az yük taşır, ancak kas tutunmaları için geniş alan sağlar ve distalde Malleolus lateralis ile ayak bileği çatalını (mortis) dıştan kilitler.',
      en: 'Slender lateral bone of the leg; excluded from the knee joint, it serves mainly for muscle attachment and forms the lateral malleolus of the ankle mortise.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Proksimal Uç (Baş ve Boyun)', en: 'Proximal End (Head & Neck)' },
      shaft: { tr: 'Corpus Fibulae (Gövde)', en: 'Shaft of Fibula' },
      distal: { tr: 'Distal Uç (Malleolus Lateralis)', en: 'Distal End (Lateral Malleolus)' },
    },
    landmarks: [
      {
        id: 'fibula-caput-collum',
        number: 1,
        latinName: 'Caput fibulae & Collum fibulae',
        name: { tr: 'Fibula Başı ve Boynu', en: 'Head and Neck of Fibula' },
        synonyms: ['caput fibulae', 'collum fibulae', 'fibula basi', 'fibula boynu', 'head of fibula', 'neck of fibula'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.05, ml: 0.50, ap: 0.50, radius: [0.07, 0.48, 0.48], normalHint: 'lateral' },
        description: {
          tr: 'Diz dış-alt yanında deri altında kolayca palpe edilen topuz biçimli üst uçtur (Caput fibulae); hemen altındaki dar kısım Collum fibulae’dir.',
          en: 'Knob-like proximal head palpable posterolateral to the knee, narrowing distally into the neck of the fibula.',
        },
        neurovascularRelation: {
          structureLatin: 'N. fibularis (peroneus) communis',
          note: {
            tr: 'N. fibularis communis, collum fibulae’nin dış yanından doğrudan kemikle temas ederek yüzeyel geçer; fibula boyun kırığı veya sıkı alçı basısında zedelenerek "Düşük Ayak" (Foot Drop — dorsifleksiyon ve eversiyon kaybı) yapar!',
            en: 'The common fibular (peroneal) nerve winds subcutaneously around the fibular neck; compression or fracture here causes "foot drop" (loss of dorsiflexion and eversion).',
          },
        },
        attachments: [
          {
            id: 'att-biceps-femoris-ins',
            kind: 'insertio',
            muscleLatin: 'M. biceps femoris (Caput longum et breve)',
            muscleName: { tr: 'Biceps femoris kası', en: 'Biceps femoris muscle' },
            musclePartId: 'FJ1395',
            function: {
              tr: 'Dize güçlü fleksiyon ve fleksiyondaki bacağa dış (lateral) rotasyon yaptırır; uzun başı kalçaya ekstansiyon yaptırır.',
              en: 'Flexes and laterally rotates the leg at the knee; the long head extends the thigh at the hip.',
            },
            innervation: { nerve: 'N. ischiadicus (Uzun baş: Pars tibialis; Kısa baş: Pars fibularis)', roots: 'L5–S2' },
          },
        ],
      },
      {
        id: 'fibula-corpus',
        number: 2,
        latinName: 'Corpus fibulae (Facies lateralis & posterior)',
        name: { tr: 'Fibula Gövdesi (Lateral ve Derin Kompartman Kasları)', en: 'Shaft of Fibula' },
        synonyms: ['corpus fibulae', 'fibula govdesi', 'shaft of fibula'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.50, ml: 0.50, ap: 0.50, radius: [0.20, 0.48, 0.48], normalHint: 'lateral' },
        description: {
          tr: 'Fibula gövdesinin dış yüzünden bacağın lateral (evertör) kompartman kasları, ön yüzünden ekstansör kaslar, arka yüzünden ise fleksör hallucis longus ve soleus başlar.',
          en: 'Shaft giving attachment to muscles of all three leg compartments (lateral evertors, anterior extensors, and posterior flexors).',
        },
        attachments: [
          {
            id: 'att-fibulares-origo',
            kind: 'origo',
            muscleLatin: 'M. fibularis (peroneus) longus (Üst 2/3) & M. fibularis brevis (Alt 2/3)',
            muscleName: { tr: 'Fibularis (Peroneus) longus ve brevis kasları', en: 'Fibularis longus & brevis muscles' },
            musclePartId: 'FJ1410',
            function: {
              tr: 'Ayağın esas evertörleridir (dışa çevirir) ve ayak bileği plantar fleksiyonuna yardım ederek burkulmaları önler.',
              en: 'Primary evertors of the foot and weak plantarflexors of the ankle; protect against inversion sprains.',
            },
            innervation: { nerve: 'N. fibularis (peroneus) superficialis', roots: 'L5–S2' },
          },
          {
            id: 'att-fhl-edl-origo',
            kind: 'origo',
            muscleLatin: 'M. flexor hallucis longus (Arka yüz) & M. extensor digitorum/hallucis longus (Ön yüz)',
            muscleName: { tr: 'Fleksor hallusis longus ve Parmak ekstansörleri', en: 'Flexor hallucis longus & Toe extensors' },
            musclePartId: 'FJ1415',
            function: {
              tr: 'FHL başparmağa güçlü fleksiyon yaptırarak yürümede yeri itmeyi (push-off) sağlar; EDL/EHL parmaklara ekstansiyon ve ayağa dorsifleksiyon yaptırır.',
              en: 'FHL flexes the great toe for push-off during gait; EDL/EHL extend the toes and dorsiflex the ankle.',
            },
            innervation: { nerve: 'FHL: N. tibialis (S2–S3); EDL/EHL: N. fibularis profundus (L4–S1)', roots: 'L4–S3' },
          },
        ],
      },
      {
        id: 'fibula-malleolus-lateralis',
        number: 3,
        latinName: 'Malleolus lateralis',
        name: { tr: 'Lateral Malleol (Dış Aşık Çıkıntısı)', en: 'Lateral Malleolus' },
        synonyms: ['malleolus lateralis', 'lateral malleol', 'dis malleol', 'lateral malleolus'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.95, ml: 0.55, ap: 0.50, radius: [0.06, 0.48, 0.48], normalHint: 'lateral' },
        description: {
          tr: 'Fibulanın alt ucundaki sivri çıkıntıdır; medial malleolden daha arkada ve yaklaşık 1 cm daha aşağıda yer aldığı için ayak bileğinin aşırı eversiyonunu kemiksel olarak sınırlar.',
          en: 'Distal expansion of the fibula projecting ~1 cm further distally and more posteriorly than the medial malleolus.',
        },
        clinicalNote: {
          tr: 'Arka kenarındaki oluktan m. fibularis longus ve brevis tendonları geçer; dış yan bağlardan Lig. talofibulare anterius (ATFL) buraya tutunur ve vücutta en sık burkulan bağdır.',
          en: 'Anchors the anterior talofibular ligament (ATFL, the most commonly sprained ligament in the body) and grooves the fibularis tendons posteriorly.',
        },
        attachments: [],
      },
    ],
  },

  // ============================================================================
  // 6. TALUS (FJ3385 Right, FJ3280 Left)
  // ============================================================================
  {
    boneId: 'talus',
    partIds: ['FJ3385', 'FJ3280'],
    primaryPartId: 'FJ3385',
    packId: 'leg-right',
    category: 'lower-limb',
    latinName: 'Talus (Astragalus)',
    title: { tr: 'Talus (Aşık Kemiği)', en: 'Talus (Ankle Bone)' },
    summary: {
      tr: 'Bacağın (tibia ve fibula) tüm ağırlığını karşılayarak arkada kalkaneusa, önde navikülere dağıtan arka ayak (tarsal) kemiğidir; yüzeyinin ~%60–70’i hiyalin kıkırdakla kaplıdır ve ÜZERİNE HİÇBİR KAS TUTUNMAZ!',
      en: 'Keystone tarsal bone of the ankle joint transmitting body weight from the tibia to the foot; ~60–70% covered by articular cartilage and receives NO muscular attachments.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Corpus Tali ve Trochlea Tali (Kubbe)', en: 'Body & Trochlear Dome' },
      shaft: { tr: 'Collum Tali ve Sinus Tarsi (Boyun)', en: 'Neck of Talus & Sinus Tarsi' },
      distal: { tr: 'Caput Tali ve Processus Posterior (Baş ve Arka Çıkıntı)', en: 'Head & Posterior Process of Talus' },
    },
    landmarks: [
      {
        id: 'talus-trochlea',
        number: 1,
        latinName: 'Trochlea tali (Corpus tali)',
        name: { tr: 'Talus Makarası / Kubbesi (Talokrural Eklem Yüzü)', en: 'Trochlea of Talus (Talar Dome)' },
        synonyms: ['trochlea tali', 'corpus tali', 'talus makarasi', 'talar dome'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.20, ml: 0.50, ap: 0.55, radius: [0.24, 0.45, 0.45], normalHint: 'superior' },
        description: {
          tr: 'Tibia ve fibulanın oluşturduğu ayak bileği çatalına (malleoler mortis) oturan makara biçimli üst eklem yüzüdür; önde arkaya göre daha geniş olduğu için dorsifleksiyonda ayak bileği eklemi en stabil ("close-packed") konumuna kilitlenir!',
          en: 'Pulley-shaped superior articular dome wedged into the tibiofibular mortise; wider anteriorly than posteriorly, locking the ankle in dorsiflexion.',
        },
        clinicalNote: {
          tr: 'Talus üzerine hiçbir kas origosu veya insertiosu tutunmaz; yalnızca bağlar tutunur.',
          en: 'No muscles originate from or insert onto the talus; movement is entirely passive via adjacent bones and ligaments.',
        },
        attachments: [],
      },
      {
        id: 'talus-collum-sulcus',
        number: 2,
        latinName: 'Collum tali & Sulcus tali (Sinus tarsi)',
        name: { tr: 'Talus Boynu ve Sulcus Tali', en: 'Neck of Talus and Sulcus Tali' },
        synonyms: ['collum tali', 'sulcus tali', 'sinus tarsi', 'talus boynu', 'neck of talus'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.50, ml: 0.55, ap: 0.35, radius: [0.22, 0.45, 0.45], normalHint: 'anterior' },
        description: {
          tr: 'Gövde ile baş arasındaki daralmış boyun bölgesi ve alt yüzündeki oluk (Sulcus tali); kalkaneus üzerindeki olukla birleşerek Sinus tarsi’yi oluşturur ve kemiğin ana besleyici arterleri buradan girer.',
          en: 'Constricted neck between body and head; its inferior groove forms the roof of the sinus tarsi through which nutrient arteries enter.',
        },
        clinicalNote: {
          tr: 'Zorlu dorsifleksiyon yaralanmalarında ("Aviator’s astragalus") collum tali kırılır; besleyici damarlar boyundan girdiği için talus gövdesinde Avasküler Nekroz (AVN) riski çok yüksektir (iyileşme göstergesi: radyolojide subkondral "Hawkins işareti").',
          en: 'Forced dorsiflexion fractures the talar neck, disrupting retrograde blood supply and risking avascular necrosis of the talar body.',
        },
        attachments: [],
      },
      {
        id: 'talus-caput-proc-posterior',
        number: 3,
        latinName: 'Caput tali & Processus posterior tali (Sulcus tendinis m. flexoris hallucis longi)',
        name: { tr: 'Talus Başı ve Arka Çıkıntı (FHL Tendon Oluğu)', en: 'Head and Posterior Process of Talus' },
        synonyms: ['caput tali', 'processus posterior tali', 'os trigonum', 'head of talus'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.80, ml: 0.35, ap: 0.25, radius: [0.24, 0.45, 0.45], normalHint: 'anterior' },
        description: {
          tr: 'Öne-içe bakan yuvarlak Caput tali önde Os naviculare ile (talokalkaneonaviküler eklem), altta Sustentaculum tali ve "Spring ligament" (Lig. calcaneonaviculare plantare) ile desteklenir. Arkada ise medial ve lateral tüberküllerin arasındaki oluktan M. flexor hallucis longus tendonu geçer.',
          en: 'Rounded anterior head articulating with the navicular and supported inferiorly by the spring ligament; the posterior process is grooved by the FHL tendon.',
        },
        clinicalNote: {
          tr: 'Arka çıkıntının lateral tüberkülü ayrı bir kemikçik olarak kaldığında "Os trigonum" adını alır; bale dansçılarında ve futbolcularda tekrarlayan plantar fleksiyonda sıkışarak "Posterior Ayak Bileği Sıkışma Sendromu" yapar.',
          en: 'An ununited lateral tubercle of the posterior process forms an "Os trigonum", causing posterior ankle impingement in ballet dancers and soccer players.',
        },
        attachments: [],
      },
    ],
  },

  // ============================================================================
  // 7. CALCANEUS (FJ3360 Right, FJ3256 Left)
  // ============================================================================
  {
    boneId: 'calcaneus',
    partIds: ['FJ3360', 'FJ3256'],
    primaryPartId: 'FJ3360',
    packId: 'leg-right',
    category: 'lower-limb',
    latinName: 'Calcaneus',
    title: { tr: 'Calcaneus (Topuk Kemiği)', en: 'Calcaneus (Heel Bone)' },
    summary: {
      tr: 'Ayak bileğinin (tarsal kemiklerin) EN BÜYÜK ve en güçlü kemiğidir; vücut ağırlığını yere aktarır ve arkaya uzanan Tuber calcanei ile baldır kasları (Aşil tendonu) için güçlü bir kaldıraç kolu oluşturur.',
      en: 'Largest and strongest tarsal bone, transmitting body weight to the ground and projecting posteriorly as a lever arm for the Achilles tendon.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Tuber Calcanei (Topuk Tümseği ve Aşil Tutunması)', en: 'Calcaneal Tuberosity (Heel & Achilles)' },
      shaft: { tr: 'Sustentaculum Tali ve Subtalar Eklem Yüzleri', en: 'Sustentaculum Tali & Subtalar Facets' },
      distal: { tr: 'Ön-Üst Yüz (EDB Origosu) ve Trochlea Fibularis', en: 'Anterosuperior Surface & Fibular Trochlea' },
    },
    landmarks: [
      {
        id: 'calcaneus-tuber',
        number: 1,
        latinName: 'Tuber calcanei (Processus medialis et lateralis)',
        name: { tr: 'Kalkaneus Tümseği (Aşil Tendonu ve Plantar Kaslar)', en: 'Calcaneal Tuberosity' },
        synonyms: ['tuber calcanei', 'topuk kemigi tumsegi', 'calcaneal tuberosity'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.65, ml: 0.50, ap: 0.88, radius: [0.25, 0.45, 0.35], normalHint: 'posterior' },
        description: {
          tr: 'Topuğun arka-alt çıkıntısıdır; arka yüzünün orta kısmına vücudun en kalın tendonu olan Tendo calcaneus (Aşil tendonu) tutunur, alt yüzündeki medial ve lateral çıkıntılardan ise ayak tabanının 1. tabaka yüzeyel kasları ve Aponeurosis plantaris başlar.',
          en: 'Massive posterior prominence receiving the Achilles tendon posteriorly and giving origin to the plantar aponeurosis and 1st-layer plantar muscles inferiorly.',
        },
        clinicalNote: {
          tr: 'Yüksekten topuk üzerine düşmelerde kalkaneus intra-artiküler çökme kırığı oluşur ve radyolojide "Böhler açısı" (normalde 20–40°) azalır veya düzleşir. Alt-iç tüberkülde kronik plantar fasiite bağlı "topuk dikeni" (epin kalkanei) görülür.',
          en: 'Axial loading from a fall from height flattens Böhler’s angle (normally 20–40°); chronic traction of the plantar fascia at the medial process produces a heel spur.',
        },
        attachments: [
          {
            id: 'att-triceps-surae-achilles-ins',
            kind: 'insertio',
            muscleLatin: 'M. triceps surae (M. gastrocnemius & M. soleus — Tendo calcaneus / Aşil) & M. plantaris',
            muscleName: { tr: 'Triseps surae (Gastroknemius ve Soleus — Aşil tendonu)', en: 'Triceps surae (Achilles tendon) & Plantaris' },
            musclePartId: 'FJ1394',
            function: {
              tr: 'Ayak bileğinin en güçlü plantar fleksörüdür; yürüme, koşma ve sıçramada vücudu yerden iter.',
              en: 'Primary plantarflexor of the ankle, propelling the body during walking, running, and jumping.',
            },
            innervation: { nerve: 'N. tibialis', roots: 'S1–S2' },
          },
          {
            id: 'att-plantar-layer1-origo',
            kind: 'origo',
            muscleLatin: 'M. abductor hallucis, M. flexor digitorum brevis, M. abductor digiti minimi & M. quadratus plantae',
            muscleName: { tr: 'Ayak tabanı 1. tabaka kasları ve Kuadratus plantae', en: 'First-layer plantar foot muscles & Quadratus plantae' },
            function: {
              tr: 'Ayak parmaklarına abduksiyon ve fleksiyon yaptırır; dinamik olarak ayak kubbesini (longitudinal arkı) destekler.',
              en: 'Abduct and flex the toes while dynamically supporting the longitudinal arches of the foot.',
            },
            innervation: { nerve: 'N. plantaris medialis & N. plantaris lateralis (N. tibialis uç dalları)', roots: 'S1–S3' },
          },
        ],
      },
      {
        id: 'calcaneus-sustentaculum-tali',
        number: 2,
        latinName: 'Sustentaculum tali & Sulcus tendinis m. flexoris hallucis longi',
        name: { tr: 'Sustentaculum Tali ("Talus Rafı") ve FHL Oluğu', en: 'Sustentaculum Tali and FHL Groove' },
        synonyms: ['sustentaculum tali', 'talus rafi'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.35, ml: 0.14, ap: 0.45, radius: [0.22, 0.35, 0.35], normalHint: 'medial' },
        description: {
          tr: 'Kalkaneusun üst-iç (medial) kenarından mediale doğru raf gibi uzanarak talus başını alttan taşıyan çıkıntıdır; üst yüzünde Facies articularis talaris media bulunur, alt yüzündeki oluktan ise M. flexor hallucis longus tendonu geçer.',
          en: 'Horizontal medial shelf supporting the talar head superiorly and grooved inferiorly by the flexor hallucis longus tendon.',
        },
        clinicalNote: {
          tr: 'Sustentaculum tali’den naviküler kemiğe uzanan Lig. calcaneonaviculare plantare ("Spring ligament"), medial longitudinal arkın en önemli pasif desteğidir; yetmezliğinde talus başı aşağı çöker ve düztabanlık (pes planus) gelişir!',
          en: 'Anchors the plantar calcaneonavicular ("spring") ligament; failure of this ligament allows the talar head to drop, producing acquired flatfoot (pes planus).',
        },
        attachments: [],
      },
      {
        id: 'calcaneus-dorsalis-trochlea-fibularis',
        number: 3,
        latinName: 'Facies dorsalis anterolateralis & Trochlea fibularis (Peronealis)',
        name: { tr: 'Ön-Üst Yüz (Kısa Ekstansör Origosu) ve Fibular Troklea', en: 'Anterosuperior Surface & Fibular Trochlea' },
        synonyms: ['trochlea fibularis', 'trochlea peronealis', 'extensor digitorum brevis'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.32, ml: 0.85, ap: 0.22, radius: [0.24, 0.35, 0.35], normalHint: 'lateral' },
        description: {
          tr: 'Kalkaneusun sinus tarsi ön-dış yanındaki üst yüzü (ayak sırtının tek intrinsik kaslarının başlangıç yeri) ve dış yan yüzünde M. fibularis brevis (üstten) ile M. fibularis longus (alttan) tendonlarını ayıran Trochlea fibularis.',
          en: 'Anterolateral dorsal surface giving origin to the intrinsic dorsal foot extensors, and the lateral fibular trochlea separating the fibularis brevis and longus tendons.',
        },
        attachments: [
          {
            id: 'att-edb-ehb-origo',
            kind: 'origo',
            muscleLatin: 'M. extensor digitorum brevis & M. extensor hallucis brevis',
            muscleName: { tr: 'Kısa parmak ve başparmak ekstansör kasları (EDB & EHB)', en: 'Extensor digitorum brevis & Extensor hallucis brevis' },
            function: {
              tr: '1.–4. ayak parmaklarının ekstansiyonuna (özellikle MTF eklemde) yardımcı olur.',
              en: 'Assist the long extensors in extending digits 1–4 at the metatarsophalangeal joints.',
            },
            innervation: { nerve: 'N. fibularis (peroneus) profundus (Lateral terminal dal)', roots: 'L5–S1' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 8. OSSA TARSI ANTERIORA (Naviculare, Cuboideum, Cuneiformia I–III)
  // ============================================================================
  {
    boneId: 'ossa-tarsi-anteriora',
    partIds: [
      'FJ3308', 'FJ3307',
      'FJ3364', 'FJ3258',
      'FJ3377', 'FJ3271',
      'FJ3370', 'FJ3264',
      'FJ3373', 'FJ3267',
    ],
    primaryPartId: 'FJ3308',
    packId: 'leg-right',
    category: 'lower-limb',
    latinName: 'Os naviculare, Os cuboideum & Ossa cuneiformia (Mediale, Intermedium, Laterale)',
    title: { tr: 'Ön Tarsal Kemikler (Naviküler, Küboid ve Kuneiformlar)', en: 'Anterior Tarsal Bones (Navicular, Cuboid & Cuneiforms)' },
    summary: {
      tr: 'Orta ayağı (midfoot) oluşturan beş tarsal kemiktir: iç yanda kayık biçimli Os naviculare, dış yanda Os cuboideum ve önde kama biçimli üç Os cuneiforme (mediale, intermedium, laterale); birlikte ayağın transvers ve longitudinal kubbelerini (arklarını) kilitler.',
      en: 'Five midfoot tarsal bones — the boat-shaped navicular, lateral cuboid, and three wedge-shaped cuneiforms — forming the transverse and longitudinal arches of the foot.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Os Naviculare ve Tuberositas Ossis Navicularis', en: 'Navicular Bone & Tuberosity (Medial)' },
      shaft: { tr: 'Os Cuboideum ve Fibularis Longus Oluğu', en: 'Cuboid Bone & Fibularis Groove (Lateral)' },
      distal: { tr: 'Ossa Cuneiformia (Mediale, Intermedium, Laterale)', en: 'Medial, Intermediate & Lateral Cuneiforms' },
    },
    landmarks: [
      {
        id: 'tarsi-naviculare-tuberositas',
        number: 1,
        latinName: 'Os naviculare & Tuberositas ossis navicularis',
        name: { tr: 'Naviküler Kemik ve Naviküler Tüberositas', en: 'Navicular Bone and Navicular Tuberosity' },
        synonyms: ['os naviculare', 'tuberositas ossis navicularis', 'navikuler kemik', 'navicular'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.30, ml: 0.16, ap: 0.45, radius: [0.30, 0.38, 0.38], normalHint: 'medial' },
        description: {
          tr: 'Arkada talus başı, önde üç kuneiform kemik arasında yer alan kayık biçimli kemiktir; iç yanındaki belirgin Tuberositas ossis navicularis ayak iç kenarında kolayca palpe edilir.',
          en: 'Boat-shaped medial tarsal bone between the talar head and the three cuneiforms, featuring a prominent palpable medial tuberosity.',
        },
        clinicalNote: {
          tr: 'Çocuklarda naviküler kemiğin avasküler nekrozuna Köhler hastalığı denir.',
          en: 'Osteochondrosis/avascular necrosis of the navicular in children is known as Köhler disease.',
        },
        attachments: [
          {
            id: 'att-tibialis-posterior-ins',
            kind: 'insertio',
            muscleLatin: 'M. tibialis posterior (Tuberositas ossis navicularis ve plantar tarsal uzantılar)',
            muscleName: { tr: 'Tibialis posterior kası', en: 'Tibialis posterior muscle' },
            musclePartId: 'FJ1440',
            function: {
              tr: 'Ayağın esas invertörüdür (içe çevirir), ayak bileğine plantar fleksiyon yaptırır ve medial longitudinal arkı dinamik olarak en güçlü destekleyen kastır!',
              en: 'Primary invertor of the foot, plantarflexor of the ankle, and the principal dynamic stabilizer of the medial longitudinal arch.',
            },
            innervation: { nerve: 'N. tibialis', roots: 'L4–L5' },
          },
        ],
      },
      {
        id: 'tarsi-cuboideum-sulcus',
        number: 2,
        latinName: 'Os cuboideum & Sulcus tendinis m. fibularis longi',
        name: { tr: 'Küboid Kemik ve Fibularis Longus Tendon Oluğu', en: 'Cuboid Bone and Fibularis Longus Groove' },
        synonyms: ['os cuboideum', 'sulcus tendinis musculi fibularis longi', 'kuboid kemik', 'cuboid'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        partId: 'FJ3364',
        zone: { si: 0.55, ml: 0.85, ap: 0.50, radius: [0.30, 0.38, 0.38], normalHint: 'lateral' },
        description: {
          tr: 'Ayağın dış (lateral) sütununda arkada kalkaneus, önde 4. ve 5. metatars tabanları arasında yer alan küp biçimli kemiktir; plantar yüzündeki derin oluktan M. fibularis longus tendonu çaprazlayarak iç yana geçer.',
          en: 'Cube-shaped bone of the lateral column articulating with the calcaneus posteriorly and the 4th–5th metatarsals anteriorly; grooved plantarly by the fibularis longus tendon.',
        },
        attachments: [
          {
            id: 'att-fhb-cuboid-origo',
            kind: 'origo',
            muscleLatin: 'M. flexor hallucis brevis (Os cuboideum ve Os cuneiforme laterale plantar yüzü)',
            muscleName: { tr: 'Kısa başparmak fleksör kası (FHB)', en: 'Flexor hallucis brevis muscle' },
            function: {
              tr: 'Ayak başparmağının metatarsofalangeal (MTF) eklemine fleksiyon yaptırır.',
              en: 'Flexes the great toe at the first metatarsophalangeal joint.',
            },
            innervation: { nerve: 'N. plantaris medialis', roots: 'S1–S2' },
          },
        ],
      },
      {
        id: 'tarsi-cuneiformia',
        number: 3,
        latinName: 'Ossa cuneiformia (Mediale, Intermedium & Laterale)',
        name: { tr: 'Medial, İntermediyer ve Lateral Kuneiform (Kama) Kemikler', en: 'Medial, Intermediate, and Lateral Cuneiform Bones' },
        synonyms: ['os cuneiforme mediale', 'os cuneiforme intermedium', 'os cuneiforme laterale', 'kuneiform'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        partId: 'FJ3377',
        zone: { si: 0.50, ml: 0.50, ap: 0.50, radius: [0.70, 0.70, 0.70], normalHint: 'superior' },
        description: {
          tr: '1., 2. ve 3. metatars tabanlarıyla Tarsometatarsal (Lisfranc) eklem kompleksini kuran kama biçimli üç kemiktir; Os cuneiforme mediale en büyüğü, Os cuneiforme intermedium ise en kısasıdır (2. metatars tabanı bu girintiye kama gibi kilitlenir!).',
          en: 'Three wedge-shaped bones articulating with the 1st–3rd metatarsals at the Lisfranc joint complex; the recessed intermediate cuneiform locks the 2nd metatarsal base.',
        },
        clinicalNote: {
          tr: 'Medial kuneiformdan 2. metatars tabanına uzanan "Lisfranc bağı"nın yırtılmasıyla oluşan tarsometatarsal kırık-çıkıklara Lisfranc yaralanması denir.',
          en: 'Disruption of the interosseous ligament between the medial cuneiform and the 2nd metatarsal base causes a Lisfranc tarsometatarsal fracture-dislocation.',
        },
        attachments: [
          {
            id: 'att-ta-fl-stirrup-ins',
            kind: 'insertio',
            muscleLatin: 'M. tibialis anterior (Medial-plantar yüz) & M. fibularis longus (Plantar-lateral yüz — "Anatomik Üzengi")',
            muscleName: { tr: 'Tibialis anterior ve Fibularis longus (Medial kuneiform + 1. Metatars tabanı)', en: 'Tibialis anterior & Fibularis longus ("Stirrup" insertion)' },
            musclePartId: 'FJ1439',
            function: {
              tr: 'Aynı kemik çiftine (Medial kuneiform ve I. metatars tabanı) içten ve dıştan tutunarak ayak kubbesini alttan askıya alan "anatomik üzengi" (stirrup) oluştururlar; TA dorsifleksiyon-inversiyon, FL plantar fleksiyon-eversiyon yapar.',
              en: 'Insert reciprocally onto the medial cuneiform and 1st metatarsal base to form a muscular stirrup supporting the arches; TA dorsiflexes/inverts while FL plantarflexes/everts.',
            },
            innervation: { nerve: 'TA: N. fibularis profundus (L4–L5); FL: N. fibularis superficialis (L5–S2)', roots: 'L4–S2' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 9. OSSA METATARSI I–V & OSSA SESAMOIDEA PEDIS (Ayak Tarak Kemikleri)
  // ============================================================================
  {
    boneId: 'ossa-metatarsi',
    partIds: [
      'FJ3351', 'FJ3241', 'FJ3353', 'FJ3244', 'FJ3355', 'FJ3247', 'FJ3357', 'FJ3250', 'FJ3359', 'FJ3253',
      'FJ3372', 'FJ3376', 'FJ3266', 'FJ3270',
    ],
    primaryPartId: 'FJ3351',
    packId: 'leg-right',
    category: 'lower-limb',
    latinName: 'Ossa metatarsi (I–V) & Ossa sesamoidea pedis',
    title: { tr: 'Ossa Metatarsi I–V (Ayak Tarak ve Sesamoid Kemikleri)', en: 'Metatarsal and Sesamoid Bones of the Foot' },
    summary: {
      tr: 'Ön ayağı (forefoot) oluşturan beş uzun kemik ve 1. metatars başı altında yer alan iki sesamoid kemiktir; I. metatars en kalın ve en fazla yük taşıyan, II. metatars ise en uzun olanıdır.',
      en: 'Five forefoot long bones and the two hallux sesamoids; the 1st metatarsal is the stoutest and main weight-bearer, while the 2nd metatarsal is the longest.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Basis I ve Tuberositas Ossis Metatarsalis V', en: 'Bases of 1st & 5th Metatarsals' },
      shaft: { tr: 'Corpus Ossis Metatarsalis (Gövde ve İnterosseöz Kaslar)', en: 'Shafts of Metatarsals' },
      distal: { tr: 'Caput Metatarsale ve Ossa Sesamoidea Hallucis', en: 'Metatarsal Heads & Hallux Sesamoids' },
    },
    landmarks: [
      {
        id: 'metatarsi-basis-tuberositas-v',
        number: 1,
        latinName: 'Basis ossis metatarsalis I & Tuberositas ossis metatarsalis V',
        name: { tr: '1. Metatars Tabanı ve 5. Metatars Tüberositası (Stiloid Çıkıntı)', en: 'Base of 1st Metatarsal & Tuberosity of 5th Metatarsal' },
        synonyms: ['tuberositas ossis metatarsalis quinti', 'basis ossis metatarsalis', '5. metatars tuberositasi', 'jones fracture'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.16, ml: 0.50, ap: 0.50, radius: [0.22, 0.48, 0.48], normalHint: 'lateral' },
        description: {
          tr: '1. metatars tabanının iç yanına M. tibialis anterior, dış-alt yanına M. fibularis longus tutunur. 5. metatars tabanının dış-arkaya uzanan belirgin stiloid çıkıntısı (Tuberositas ossis metatarsalis V) ise ayak dış kenarının orta noktasında palpe edilir.',
          en: 'The 1st metatarsal base receives tibialis anterior and fibularis longus; the prominent lateral styloid tuberosity of the 5th metatarsal base is palpable at the lateral midfoot.',
        },
        clinicalNote: {
          tr: 'Ayağın ani inversiyon burkulmasında 5. metatars tüberositasının uç kopma (avülsiyon) kırığı ("Pseudo-Jones / Dansçı kırığı") çok sık görülür; yaklaşık 1.5–2 cm daha distaldeki metafiz-diyafiz geçiş kırığına ise "Gerçek Jones Kırığı" (kaynamama / non-union riski yüksek!) denir.',
          en: 'Sudden inversion causes an avulsion fracture of the 5th metatarsal tuberosity, whereas a fracture slightly distal at the metaphyseal-diaphyseal watershed is a true "Jones fracture" prone to nonunion.',
        },
        attachments: [
          {
            id: 'att-fibularis-brevis-tertius-ins',
            kind: 'insertio',
            muscleLatin: 'M. fibularis (peroneus) brevis (Tuberositas ossis metatarsalis V) & M. fibularis tertius (V. Dorsal taban)',
            muscleName: { tr: 'Fibularis brevis ve Fibularis tertius kasları', en: 'Fibularis brevis & Fibularis tertius muscles' },
            musclePartId: 'FJ1410',
            function: {
              tr: 'Fibularis brevis ayağa güçlü eversiyon yaptırır; Fibularis tertius ise dorsifleksiyon ve eversiyona yardım eder.',
              en: 'Fibularis brevis everts the foot; fibularis tertius assists in dorsiflexion and eversion.',
            },
            innervation: { nerve: 'FB: N. fibularis superficialis (L5–S2); FT: N. fibularis profundus (L5–S1)', roots: 'L5–S2' },
          },
        ],
      },
      {
        id: 'metatarsi-corpus',
        number: 2,
        latinName: 'Corpus ossis metatarsalis (I–V)',
        name: { tr: 'Metatars Gövdeleri (Dorsal ve Plantar İnterosseöz Kaslar)', en: 'Shafts of Metatarsals I–V' },
        synonyms: ['corpus ossis metatarsalis', 'metatars govdesi', 'shaft of metatarsal'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.52, ml: 0.50, ap: 0.45, radius: [0.22, 0.48, 0.48], normalHint: 'superior' },
        description: {
          tr: 'Öne doğru hafif incelen ve uzunlamasına dorsal konveksite gösteren gövdelerdir; 2. metatars en uzun olanıdır ve tabanı üç kuneiform arasına sıkıca kilitlendiği için en az hareketli olanıdır.',
          en: 'Dorsally convex shafts tapering toward the heads; the 2nd metatarsal is the longest and most rigidly mortised at its base.',
        },
        clinicalNote: {
          tr: 'Uzun süreli yürüyüş veya koşu yapan asker ve sporcularda tekrarlayan mikro-travmaya bağlı "Stres Kırığı" (Yürüyüş / March fracture) en sık 2. (ve 3.) metatars gövde/boynunda görülür!',
          en: 'Fatigue stress fractures ("March fractures") occur most frequently in the shaft/neck of the 2nd (and 3rd) metatarsal in runners and military recruits.',
        },
        attachments: [
          {
            id: 'att-foot-interossei-origo',
            kind: 'origo',
            muscleLatin: 'Mm. interossei dorsales pedis (1–4, Çift başlı — DAB) & Mm. interossei plantares (1–3, Tek başlı — PAD)',
            muscleName: { tr: 'Ayak dorsal ve plantar interosseöz kasları', en: 'Dorsal and Plantar Interossei of the Foot' },
            function: {
              tr: '2. parmak eksenine göre parmaklara abduksiyon (dorsal) ve adduksiyon (plantar) yaptırır; MTF fleksiyonu ile ön ayağı yürümede stabilize eder.',
              en: 'Abduct (dorsal) and adduct (plantar) the toes relative to the 2nd digit axis and stabilize the MTP joints during push-off.',
            },
            innervation: { nerve: 'N. plantaris lateralis (N. tibialis dalı)', roots: 'S2–S3' },
          },
        ],
      },
      {
        id: 'metatarsi-caput-sesamoidea',
        number: 3,
        latinName: 'Caput ossis metatarsalis & Ossa sesamoidea hallucis',
        name: { tr: 'Metatars Başları ve Başparmak Sesamoid Kemikleri', en: 'Metatarsal Heads and Hallux Sesamoid Bones' },
        synonyms: ['caput ossis metatarsalis', 'ossa sesamoidea pedis', 'sesamoid', 'metatars basi'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.86, ml: 0.50, ap: 0.45, radius: [0.18, 0.48, 0.48], normalHint: 'inferior' },
        description: {
          tr: 'Proksimal falankslarla MTF eklemlerini kuran metatars başları ve 1. metatars başının plantar yüzündeki iki olukta (M. flexor hallucis brevis tendonları içinde) yer alan medial ve lateral sesamoid kemikler; M. flexor hallucis longus tendonunu yer basıncından korurlar.',
          en: 'Distal articular heads and the paired medial/lateral sesamoids beneath the 1st metatarsal head that bear weight and shield the FHL tendon.',
        },
        attachments: [
          {
            id: 'att-fhb-abductor-adductor-sesamoid-ins',
            kind: 'insertio',
            muscleLatin: 'M. flexor hallucis brevis (Medial & Lateral sesamoid), M. abductor hallucis (Medial) & M. adductor hallucis (Lateral)',
            muscleName: { tr: 'Başparmak sesamoid kompleks kasları (FHB, Abduktör ve Adduktör hallusis)', en: 'Hallux sesamoid complex muscles (FHB, Abductor & Adductor hallucis)' },
            function: {
              tr: '1. MTF eklemine güçlü fleksiyon yaptırır, transvers metatarsal arkı destekler ve yürümenin itme (push-off) fazında başparmağı sabitler.',
              en: 'Stabilize and flex the 1st MTP joint during toe-off and maintain the transverse metatarsal arch.',
            },
            innervation: { nerve: 'FHB & Abductor: N. plantaris medialis (S1–S2); Adductor: N. plantaris lateralis (S2–S3)', roots: 'S1–S3' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 10. PHALANGES PEDIS (Ayak Parmak Kemikleri — Proksimal, Orta, Distal)
  // ============================================================================
  {
    boneId: 'phalanges-pedis',
    partIds: [
      'FJ3310', 'FJ3329', 'FJ3319', 'FJ3328', 'FJ3320', 'FJ3311', 'FJ3321', 'FJ3312', 'FJ3324', 'FJ3315',
      'FJ3300', 'FJ3293', 'FJ3301', 'FJ3294', 'FJ3302', 'FJ3295', 'FJ3305', 'FJ3298',
      'FJ3192', 'FJ3182', 'FJ3189', 'FJ3179', 'FJ3190', 'FJ3180', 'FJ3191', 'FJ3181', 'FJ3195', 'FJ3185',
    ],
    primaryPartId: 'FJ3310',
    packId: 'leg-right',
    category: 'lower-limb',
    latinName: 'Phalanges pedis (Proximalis, Media, Distalis)',
    title: { tr: 'Phalanges Pedis (Ayak Parmak Kemikleri)', en: 'Phalanges of the Foot (Toes)' },
    summary: {
      tr: 'Eldeki düzenle aynı şekilde başparmakta (Hallux) 2, diğer dört parmakta 3’er adet olmak üzere her ayakta 14 adet bulunan parmak kemikleridir; yürümenin son itme (toe-off) fazında denge ve itki sağlar.',
      en: '14 digital bones per foot (2 in the hallux, 3 in digits 2–5) providing balance and propulsion during the toe-off phase of gait.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Phalanx Proximalis Pedis (Proksimal Falanks)', en: 'Proximal Phalanges of Foot' },
      shaft: { tr: 'Phalanx Media Pedis (Orta Falanks)', en: 'Middle Phalanges of Foot' },
      distal: { tr: 'Phalanx Distalis Pedis (Distal / Uç Falanks)', en: 'Distal Phalanges of Foot' },
    },
    landmarks: [
      {
        id: 'phalanges-pedis-proximalis',
        number: 1,
        latinName: 'Phalanx proximalis hallucis et digitorum II–V',
        name: { tr: 'Ayak Proksimal Falanks Tabanı (İntrinsik Kaslar ve Hallux Tutunmaları)', en: 'Bases of Proximal Phalanges of Foot' },
        synonyms: ['phalanx proximalis hallucis', 'phalanx proximalis pedis', 'ayak proksimal falanksi'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        partId: 'FJ3310',
        zone: { si: 0.50, ml: 0.50, ap: 0.85, radius: [0.60, 0.60, 0.30], normalHint: 'superior' },
        description: {
          tr: 'Metatars başlarıyla MTF eklemlerini kuran proksimal falanks tabanlarıdır; başparmak proksimal falanksına abduktör, fleksör, adduktör ve kısa ekstansör (EHB) kaslar tutunur.',
          en: 'Bases of the proximal phalanges articulating with the metatarsal heads and receiving the intrinsic plantar and short extensor insertions.',
        },
        clinicalNote: {
          tr: 'Başparmak proksimal falanksının 1. metatarsa göre dışa (laterale) sapmasına ve 1. MTF eklem iç yanında ağrılı kemik çıkıntısı (bunyon) oluşmasına Hallux Valgus denir.',
          en: 'Lateral deviation of the hallux proximal phalanx on the 1st metatarsal head with a medial bunion prominence is Hallux Valgus.',
        },
        attachments: [
          {
            id: 'att-hallux-prox-phalanx-ins',
            kind: 'insertio',
            muscleLatin: 'M. abductor hallucis, M. flexor hallucis brevis, M. adductor hallucis, M. extensor hallucis brevis & Mm. interossei/lumbricales',
            muscleName: { tr: 'Başparmak intrinsik kasları, EHB ve İnterosseöz/Lumbrikal kaslar', en: 'Intrinsic hallux muscles, EHB, Interossei & Lumbricals' },
            function: {
              tr: 'MTF eklemlerini fleksiyona getirir, parmakları dengeler ve EHB ile başparmak proksimal falanksına ekstansiyon yaptırır.',
              en: 'Stabilize and flex the MTP joints while EHB extends the proximal phalanx of the great toe.',
            },
            innervation: { nerve: 'N. plantaris medialis, N. plantaris lateralis & N. fibularis profundus (EHB)', roots: 'L5–S3' },
          },
        ],
      },
      {
        id: 'phalanges-pedis-media',
        number: 2,
        latinName: 'Phalanx media digitorum pedis (II–V)',
        name: { tr: 'Ayak Orta Falanksı (Fleksor Digitorum Brevis Tutunması)', en: 'Middle Phalanges of Foot (Digits II–V)' },
        synonyms: ['phalanx media pedis', 'ayak orta falanksi', 'middle phalanx of toe'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        partId: 'FJ3300',
        zone: { si: 0.50, ml: 0.50, ap: 0.50, radius: [0.60, 0.60, 0.35], normalHint: 'inferior' },
        description: {
          tr: '2.–5. ayak parmaklarının kısa orta kemikleridir (başparmakta orta falanks yoktur); eldeki FDS’nin karşılığı olarak M. flexor digitorum brevis tendonları ikiye ayrılıp plantar yan kenarlarına tutunur.',
          en: 'Short middle phalanges of toes 2–5 (absent in the hallux), receiving the bifurcated slips of flexor digitorum brevis on their plantar shafts.',
        },
        attachments: [
          {
            id: 'att-fdb-edb-middle-phalanx-ins',
            kind: 'insertio',
            muscleLatin: 'M. flexor digitorum brevis (Plantar yanlar) & M. extensor digitorum longus/brevis (Dorsal orta bant)',
            muscleName: { tr: 'Kısa parmak fleksörü (FDB) ve Parmak ekstansörleri (EDL/EDB)', en: 'Flexor digitorum brevis & Extensor digitorum longus/brevis' },
            function: {
              tr: '2.–5. ayak parmaklarının proksimal interfalangeal (PİF) eklemlerine fleksiyon (FDB) ve ekstansiyon (EDL/EDB) yaptırır.',
              en: 'Flex (FDB) and extend (EDL/EDB) the proximal interphalangeal (PIP) joints of the lesser toes.',
            },
            innervation: { nerve: 'FDB: N. plantaris medialis (S1–S2); EDL/EDB: N. fibularis profundus (L5–S1)', roots: 'L5–S2' },
          },
        ],
      },
      {
        id: 'phalanges-pedis-distalis',
        number: 3,
        latinName: 'Phalanx distalis hallucis et digitorum II–V',
        name: { tr: 'Ayak Distal Falanksı (Uzun Fleksör ve Ekstansör Tutunmaları)', en: 'Distal Phalanges of Foot' },
        synonyms: ['phalanx distalis hallucis', 'phalanx distalis pedis', 'ayak distal falanksi'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        partId: 'FJ3192',
        zone: { si: 0.50, ml: 0.50, ap: 0.20, radius: [0.60, 0.60, 0.30], normalHint: 'superior' },
        description: {
          tr: 'Tırnak yatağını taşıyan uç kemiklerdir; bacağın derin arka ve ön kompartmanlarından gelen uzun fleksör (FHL, FDL) ve uzun ekstansör (EHL, EDL) tendonların sonlanma yeridir.',
          en: 'Terminal phalanges bearing the nail beds and receiving the long extrinsic flexor (FHL, FDL) and extensor (EHL, EDL) tendons from the leg.',
        },
        attachments: [
          {
            id: 'att-fhl-fdl-ehl-edl-distal-ins',
            kind: 'insertio',
            muscleLatin: 'M. flexor hallucis longus ( I. Plantar) & M. flexor digitorum longus (II–V Plantar) / M. extensor hallucis/digitorum longus (Dorsal)',
            muscleName: { tr: 'Uzun başparmak/parmak fleksörleri (FHL/FDL) ve Uzun ekstansörler (EHL/EDL)', en: 'Long toe flexors (FHL/FDL) & Long toe extensors (EHL/EDL)' },
            musclePartId: 'FJ1415',
            function: {
              tr: 'FHL ve FDL distal falankslara fleksiyon yaptırarak yürümede yeri kavrar ve iter; EHL ve EDL parmaklara ekstansiyon ve ayak bileğine dorsifleksiyon yaptırır.',
              en: 'FHL and FDL flex the distal phalanges for ground grip and push-off; EHL and EDL extend the toes and dorsiflex the ankle.',
            },
            innervation: { nerve: 'FHL/FDL: N. tibialis (S2–S3); EHL/EDL: N. fibularis profundus (L4–S1)', roots: 'L4–S3' },
          },
        ],
      },
    ],
  },
];
