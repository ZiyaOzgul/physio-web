import { BONE_ZONE_PALETTE, type BoneSubanatomySpec } from './domain';

export const UPPER_LIMB_BONE_SPECS: readonly BoneSubanatomySpec[] = [
  // ============================================================================
  // 1. HUMERUS (FJ3368 Right, FJ3262 Left)
  // ============================================================================
  {
    boneId: 'humerus',
    partIds: ['FJ3368', 'FJ3262'],
    primaryPartId: 'FJ3368',
    packId: 'arm-right',
    category: 'upper-limb',
    latinName: 'Humerus',
    title: { tr: 'Humerus (Kol Kemiği)', en: 'Humerus (Arm Bone)' },
    summary: {
      tr: 'Üst ekstremitenin en uzun ve en büyük kemiğidir; proksimalde skapula ile omuz eklemini, distalde radius ve ulna ile dirsek eklemini kurar.',
      en: 'The longest and largest bone of the upper limb, articulating proximally with the scapula at the shoulder and distally with the radius and ulna at the elbow.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Proksimal Epifiz (Üst Uç)', en: 'Proximal Epiphysis' },
      shaft: { tr: 'Corpus Humeri (Gövde / Diyafiz)', en: 'Shaft (Diaphysis)' },
      distal: { tr: 'Distal Epifiz (Alt Uç / Kondiller)', en: 'Distal Epiphysis' },
    },
    landmarks: [
      {
        id: 'humerus-caput',
        number: 1,
        latinName: 'Caput humeri',
        name: { tr: 'Humerus Başı', en: 'Head of Humerus' },
        synonyms: ['caput humeri', 'humerus basi', 'head of humerus'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.05, ml: 0.16, ap: 0.48, radius: [0.07, 0.35, 0.45], normalHint: 'medial' },
        description: {
          tr: 'Kürelerin yaklaşık üçte biri büyüklüğünde, yukarı, içe (mediale) ve hafif arkaya bakan hiyalin kıkırdak kaplı eklem yüzüdür; skapulanın cavitas glenoidalis’i ile glenohumeral eklemi kurar.',
          en: 'Hemispherical hyaline-cartilage-covered articular surface directed superiorly, medially, and slightly posteriorly to articulate with the glenoid cavity of the scapula.',
        },
        clinicalNote: {
          tr: 'Omuz çıkıklarının %95’i anteroinferior yönde gerçekleşir; çıkık sırasında caput humeri’nin posterolateral yüzünde oluşan çökme kırığına Hill-Sachs lezyonu denir.',
          en: 'Over 95% of shoulder dislocations are anteroinferior; impaction of the posterolateral humeral head against the glenoid rim produces a Hill-Sachs lesion.',
        },
        attachments: [],
      },
      {
        id: 'humerus-tuberculum-majus',
        number: 2,
        latinName: 'Tuberculum majus',
        name: { tr: 'Büyük Tüberkül', en: 'Greater Tubercle' },
        synonyms: ['tuberculum majus', 'buyuk tuberkul', 'greater tubercle', 'tuberculum majus humeri'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.08, ml: 0.85, ap: 0.55, radius: [0.07, 0.30, 0.42], normalHint: 'lateral' },
        description: {
          tr: 'Humerus proksimal ucunun en lateralinde yer alan çıkıntıdır; üst, orta ve alt olmak üzere üç düz faseti rotator manşetin (SITS) üç kasının sonlanma (insertio) yeridir.',
          en: 'Most lateral prominence of the proximal humerus bearing superior, middle, and inferior facets for three of the four rotator cuff tendons.',
        },
        clinicalNote: {
          tr: 'Subakromiyal sıkışma (impingement) sendromunda abduksiyon sırasında tuberculum majus ile acromion arasında m. supraspinatus tendonu sıkışır.',
          en: 'In subacromial impingement syndrome, the supraspinatus tendon is compressed between the greater tubercle and the acromion during abduction.',
        },
        attachments: [
          {
            id: 'att-supraspinatus-ins',
            kind: 'insertio',
            muscleLatin: 'M. supraspinatus',
            muscleName: { tr: 'Supraspinatus kası (Üst faset)', en: 'Supraspinatus muscle (Superior facet)' },
            musclePartId: 'FJ1506',
            function: {
              tr: 'Kolun ilk 0–15° abduksiyonunu başlatır ve humerus başını glenoid çukurda merkezler.',
              en: 'Initiates the first 0–15° of arm abduction and stabilizes the humeral head in the glenoid cavity.',
            },
            innervation: { nerve: 'N. suprascapularis', roots: 'C5–C6' },
          },
          {
            id: 'att-infraspinatus-ins',
            kind: 'insertio',
            muscleLatin: 'M. infraspinatus',
            muscleName: { tr: 'İnfraspinatus kası (Orta faset)', en: 'Infraspinatus muscle (Middle facet)' },
            musclePartId: 'FJ1500',
            function: {
              tr: 'Kolun en güçlü dış (lateral) rotatörüdür; omuz eklemini arkadan destekler.',
              en: 'Primary external (lateral) rotator of the arm; reinforces the posterior shoulder capsule.',
            },
            innervation: { nerve: 'N. suprascapularis', roots: 'C5–C6' },
          },
          {
            id: 'att-teres-minor-ins',
            kind: 'insertio',
            muscleLatin: 'M. teres minor',
            muscleName: { tr: 'Teres minör kası (Alt faset)', en: 'Teres minor muscle (Inferior facet)' },
            musclePartId: 'FJ1508',
            function: {
              tr: 'Kola dış (lateral) rotasyon ve zayıf adduksiyon yaptırır.',
              en: 'Externally (laterally) rotates and weakly adducts the arm.',
            },
            innervation: { nerve: 'N. axillaris', roots: 'C5–C6' },
          },
        ],
      },
      {
        id: 'humerus-tuberculum-minus',
        number: 3,
        latinName: 'Tuberculum minus',
        name: { tr: 'Küçük Tüberkül', en: 'Lesser Tubercle' },
        synonyms: ['tuberculum minus', 'kucuk tuberkul', 'lesser tubercle', 'tuberculum minus humeri'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.09, ml: 0.52, ap: 0.12, radius: [0.06, 0.28, 0.30], normalHint: 'anterior' },
        description: {
          tr: 'Humerus üst ucunun ön yüzünde (anterior), anatomik boynun hemen önünde yer alan belirgin çıkıntıdır; rotator manşetin tek ön kası buraya tutunur.',
          en: 'Prominent anterior projection just distal to the anatomical neck that receives the anterior rotator cuff tendon.',
        },
        attachments: [
          {
            id: 'att-subscapularis-ins',
            kind: 'insertio',
            muscleLatin: 'M. subscapularis',
            muscleName: { tr: 'Subskapularis kası', en: 'Subscapularis muscle' },
            musclePartId: 'FJ1504',
            function: {
              tr: 'Kolun en güçlü iç (medial) rotatörüdür ve humerus başının öne çıkmasını engeller.',
              en: 'Principal internal (medial) rotator of the arm and dynamic anterior stabilizer of the glenohumeral joint.',
            },
            innervation: { nerve: 'Nn. subscapulares (superior et inferior)', roots: 'C5–C7' },
          },
        ],
      },
      {
        id: 'humerus-sulcus-intertubercularis',
        number: 4,
        latinName: 'Sulcus intertubercularis',
        name: { tr: 'İntertüberküler Oluk (Bisipital Oluk)', en: 'Intertubercular Sulcus (Bicipital Groove)' },
        synonyms: ['sulcus intertubercularis', 'bisipital oluk', 'bicipital groove', 'intertubercular sulcus'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[3],
        zone: { si: 0.14, ml: 0.68, ap: 0.18, radius: [0.07, 0.25, 0.30], normalHint: 'anterior' },
        description: {
          tr: 'Tuberculum majus ile tuberculum minus arasında uzanan dikey oluktur; içinden m. biceps brachii’nin uzun başının tendonu (caput longum) geçer. Dış dudağına crista tuberculi majoris, iç dudağına crista tuberculi minoris denir.',
          en: 'Vertical groove between the greater and lesser tubercles lodging the tendon of the long head of biceps brachii; bounded by lateral and medial lips.',
        },
        clinicalNote: {
          tr: 'Klasik tıp mnemoniği "Lady Between Two Majors": İki major kas (dış dudakta Pectoralis major, iç dudakta Teres major) arasında Latissimus dorsi tabana tutunur.',
          en: 'Mnemonic "Lady Between Two Majors": Latissimus dorsi inserts on the floor between Pectoralis major (lateral lip) and Teres major (medial lip).',
        },
        attachments: [
          {
            id: 'att-pec-major-ins',
            kind: 'insertio',
            muscleLatin: 'M. pectoralis major (Crista tuberculi majoris)',
            muscleName: { tr: 'Pektoralis majör kası (Dış dudak)', en: 'Pectoralis major (Lateral lip)' },
            musclePartId: 'FJ1464',
            function: {
              tr: 'Kola güçlü adduksiyon, iç (medial) rotasyon ve fleksiyon yaptırır.',
              en: 'Powerfully adducts, internally rotates, and flexes the arm.',
            },
            innervation: { nerve: 'N. pectoralis lateralis et medialis', roots: 'C5–T1' },
          },
          {
            id: 'att-latissimus-ins',
            kind: 'insertio',
            muscleLatin: 'M. latissimus dorsi (Oluk tabanı)',
            muscleName: { tr: 'Latissimus dorsi kası (Oluk tabanı)', en: 'Latissimus dorsi (Floor of groove)' },
            function: {
              tr: 'Kola ekstansiyon, adduksiyon ve iç (medial) rotasyon yaptırır (tırmanma/yüzme kası).',
              en: 'Extends, adducts, and internally rotates the humerus.',
            },
            innervation: { nerve: 'N. thoracodorsalis', roots: 'C6–C8' },
          },
          {
            id: 'att-teres-major-ins',
            kind: 'insertio',
            muscleLatin: 'M. teres major (Crista tuberculi minoris)',
            muscleName: { tr: 'Teres majör kası (İç dudak)', en: 'Teres major (Medial lip)' },
            musclePartId: 'FJ1507',
            function: {
              tr: 'Kola adduksiyon, iç rotasyon ve ekstansiyon yaptırır.',
              en: 'Adducts, internally rotates, and extends the arm.',
            },
            innervation: { nerve: 'N. subscapularis inferior', roots: 'C5–C7' },
          },
        ],
      },
      {
        id: 'humerus-collum-chirurgicum',
        number: 5,
        latinName: 'Collum chirurgicum',
        name: { tr: 'Cerrahi Boyun', en: 'Surgical Neck of Humerus' },
        synonyms: ['collum chirurgicum', 'cerrahi boyun', 'surgical neck', 'collum chirurgicum humeri'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[4],
        zone: { si: 0.17, ml: 0.50, ap: 0.55, radius: [0.05, 0.55, 0.55], normalHint: 'posterior' },
        description: {
          tr: 'Tüberküllerin hemen altında, proksimal epifizin diyafizle birleştiği daralmış geçiş bölgesidir; yaşlılarda düşme sonrası en sık kırılan humerus bölgesidir.',
          en: 'Narrow constriction distal to the tubercles where the proximal epiphysis tapers into the shaft; the most common fracture site of the proximal humerus.',
        },
        neurovascularRelation: {
          structureLatin: 'N. axillaris & A. circumflexa humeri posterior',
          note: {
            tr: 'Cerrahi boynun arka yüzünden N. axillaris ve A. circumflexa humeri posterior dolanır; kırığında deltoid kası felci (kolu 15–90° abduksiyona getirememe) ve omuz dış yüzünde duyu kaybı ("apolet alanı") gelişir.',
            en: 'The axillary nerve and posterior circumflex humeral artery wind directly around the posterior surgical neck; fractures risk deltoid paralysis and "regimental badge" numbness.',
          },
        },
        attachments: [],
      },
      {
        id: 'humerus-tuberositas-deltoidea',
        number: 6,
        latinName: 'Tuberositas deltoidea',
        name: { tr: 'Deltoid Tüberositası', en: 'Deltoid Tuberosity' },
        synonyms: ['tuberositas deltoidea', 'deltoid tuberositasi', 'deltoid tuberosity'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[5],
        zone: { si: 0.44, ml: 0.84, ap: 0.45, radius: [0.09, 0.35, 0.45], normalHint: 'lateral' },
        description: {
          tr: 'Humerus gövdesinin (corpus humeri) ortasının biraz üstünde, anterolateral yüzde yer alan V şeklindeki pürtüklü kabartıdır.',
          en: 'V-shaped rough elevation on the anterolateral surface of the mid-shaft of the humerus.',
        },
        attachments: [
          {
            id: 'att-deltoid-ins',
            kind: 'insertio',
            muscleLatin: 'M. deltoideus',
            muscleName: { tr: 'Deltoid kası (3 parça: klaviküler, akromiyal, spinal)', en: 'Deltoid muscle' },
            musclePartId: 'FJ1467',
            function: {
              tr: 'Kolun 15°–90° arasındaki esas abduktörüdür (akromiyal lifler); ön lifler fleksiyon/iç rotasyon, arka lifler ekstansiyon/dış rotasyon yapar.',
              en: 'Prime abductor of the arm from 15° to 90° (acromial part); anterior fibers flex/internally rotate, posterior fibers extend/externally rotate.',
            },
            innervation: { nerve: 'N. axillaris', roots: 'C5–C6' },
          },
        ],
      },
      {
        id: 'humerus-sulcus-nervi-radialis',
        number: 7,
        latinName: 'Sulcus nervi radialis',
        name: { tr: 'Radial Sinir Oluğu (Spiral Oluk)', en: 'Radial Groove (Spiral Groove)' },
        synonyms: ['sulcus nervi radialis', 'radial oluk', 'spiral oluk', 'radial groove', 'spiral groove'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[6],
        zone: { si: 0.52, ml: 0.55, ap: 0.88, radius: [0.10, 0.42, 0.35], normalHint: 'posterior' },
        description: {
          tr: 'Humerus gövdesinin arka yüzünde yukarıdan aşağıya ve içten dışa doğru oblik olarak uzanan sığ oluktur; m. triceps brachii’nin lateral ve medial başlarının origoları arasından geçer.',
          en: 'Shallow oblique groove on the posterior humeral shaft running superomedially to inferolaterally between the origins of the lateral and medial heads of triceps brachii.',
        },
        neurovascularRelation: {
          structureLatin: 'N. radialis & A. profunda brachii',
          note: {
            tr: 'Bu olukta N. radialis ve A. profunda brachii doğrudan kemikle temas halindedir; humerus diyafiz (orta 1/3) kırıklarında N. radialis zedelenerek "Düşük El" (Wrist Drop) tablosuna yol açar.',
            en: 'Houses the radial nerve and deep brachial artery directly against bone; mid-shaft humeral fractures cause radial nerve palsy presenting as "wrist drop".',
          },
        },
        attachments: [
          {
            id: 'att-triceps-lat-origo',
            kind: 'origo',
            muscleLatin: 'M. triceps brachii (Caput laterale — oluk üstü)',
            muscleName: { tr: 'Triceps brachii dış başı (Oluk üst-dışı)', en: 'Triceps brachii lateral head (Superior to groove)' },
            musclePartId: 'FJ1477',
            function: {
              tr: 'Önkolun (dirsek ekleminin) en güçlü ekstansörüdür.',
              en: 'Powerful extensor of the forearm at the elbow joint.',
            },
            innervation: { nerve: 'N. radialis', roots: 'C6–C8' },
          },
          {
            id: 'att-triceps-med-origo',
            kind: 'origo',
            muscleLatin: 'M. triceps brachii (Caput mediale — oluk altı)',
            muscleName: { tr: 'Triceps brachii iç başı (Oluk alt-içi)', en: 'Triceps brachii medial head (Inferior to groove)' },
            musclePartId: 'FJ1480',
            function: {
              tr: 'Her direnç seviyesinde aktif olan temel dirsek ekstansörüdür.',
              en: 'Deep workhorse extensor of the elbow across all positions.',
            },
            innervation: { nerve: 'N. radialis', roots: 'C6–C8' },
          },
          {
            id: 'att-brachialis-origo',
            kind: 'origo',
            muscleLatin: 'M. brachialis (Ön-alt diyafiz yüzü)',
            muscleName: { tr: 'Brachialis kası (Ön-alt humerus gövdesi)', en: 'Brachialis muscle (Distal anterior shaft)' },
            musclePartId: 'FJ1486',
            function: {
              tr: 'Önkol pronasyonda da supinasyonda da olsa dirseğin en saf ve en güçlü fleksörüdür.',
              en: 'Purest and strongest flexor of the elbow regardless of forearm pronation or supination.',
            },
            innervation: { nerve: 'N. musculocutaneus (lateral lifler N. radialis)', roots: 'C5–C6' },
          },
        ],
      },
      {
        id: 'humerus-epicondylus-medialis',
        number: 8,
        latinName: 'Epicondylus medialis',
        name: { tr: 'Medial Epikondil', en: 'Medial Epicondyle' },
        synonyms: ['epicondylus medialis', 'medial epikondil', 'medial epicondyle', 'ic epikondil'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[7],
        zone: { si: 0.90, ml: 0.08, ap: 0.55, radius: [0.06, 0.25, 0.45], normalHint: 'medial' },
        description: {
          tr: 'Distal humerusun iç yanında dışarıya doğru belirgin olarak uzanan büyük çıkıntıdır; önkolun yüzeyel fleksör-pronator kaslarının ortak başlangıç (origo) noktasıdır.',
          en: 'Prominent medial projection of the distal humerus serving as the common flexor-pronator origin of the forearm.',
        },
        neurovascularRelation: {
          structureLatin: 'N. ulnaris (Sulcus nervi ulnaris)',
          note: {
            tr: 'Medial epikondilin hemen arkasındaki oluktan (sulcus nervi ulnaris / kübital tünel) N. ulnaris geçer; kırık veya sıkışmasında 4.–5. parmaklarda uyuşma ve "Pençe El" (Claw Hand) görülür. Kronik aşırı kullanımına "Golfçü Dirseği" (medial epikondilit) denir.',
            en: 'The ulnar nerve passes directly behind the medial epicondyle in the cubital tunnel; overuse of the common flexor tendon causes medial epicondylitis ("golfer’s elbow").',
          },
        },
        attachments: [
          {
            id: 'att-pronator-teres-origo',
            kind: 'origo',
            muscleLatin: 'M. pronator teres & M. flexor carpi radialis',
            muscleName: { tr: 'Pronator teres ve Fleksor karpi radialis', en: 'Pronator teres & Flexor carpi radialis' },
            musclePartId: 'FJ1474',
            function: {
              tr: 'Önkola pronasyon ve el bileğine fleksiyon/radial deviyasyon yaptırır.',
              en: 'Pronates the forearm and flexes/radially deviates the wrist.',
            },
            innervation: { nerve: 'N. medianus', roots: 'C6–C7' },
          },
          {
            id: 'att-fds-origo',
            kind: 'origo',
            muscleLatin: 'M. palmaris longus & M. flexor digitorum superficialis',
            muscleName: { tr: 'Palmaris longus ve Yüzeyel parmak fleksörü', en: 'Palmaris longus & Flexor digitorum superficialis' },
            musclePartId: 'FJ1475',
            function: {
              tr: 'El bileği ve 2.–5. parmakların proksimal interfalangeal (PİF) eklemlerine fleksiyon yaptırır.',
              en: 'Flexes the wrist and proximal interphalangeal (PIP) joints of digits 2–5.',
            },
            innervation: { nerve: 'N. medianus', roots: 'C7–T1' },
          },
          {
            id: 'att-fcu-origo',
            kind: 'origo',
            muscleLatin: 'M. flexor carpi ulnaris (Caput humerale)',
            muscleName: { tr: 'Fleksor karpi ulnaris (Humeral baş)', en: 'Flexor carpi ulnaris (Humeral head)' },
            musclePartId: 'FJ1473',
            function: {
              tr: 'El bileğine güçlü fleksiyon ve ulnar deviyasyon yaptırır.',
              en: 'Flexes and ulnarly deviates the wrist.',
            },
            innervation: { nerve: 'N. ulnaris', roots: 'C7–T1' },
          },
        ],
      },
      {
        id: 'humerus-epicondylus-lateralis',
        number: 9,
        latinName: 'Epicondylus lateralis',
        name: { tr: 'Lateral Epikondil', en: 'Lateral Epicondyle' },
        synonyms: ['epicondylus lateralis', 'lateral epikondil', 'lateral epicondyle', 'dis epikondil'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[8],
        zone: { si: 0.91, ml: 0.92, ap: 0.50, radius: [0.06, 0.25, 0.45], normalHint: 'lateral' },
        description: {
          tr: 'Distal humerusun dış yanındaki çıkıntıdır; önkolun arka kompartmanındaki yüzeyel ekstansör ve supinatör kasların ortak başlangıç (origo) yeridir.',
          en: 'Lateral projection of the distal humerus giving rise to the common extensor-supinator tendon of the posterior forearm.',
        },
        clinicalNote: {
          tr: 'Tekrarlayan el bileği ekstansiyonu (özellikle m. extensor carpi radialis brevis mikro-yırtıkları) "Tenisçi Dirseği" (lateral epikondilit) tablosuna neden olur.',
          en: 'Repetitive wrist extension causes microtears at the extensor carpi radialis brevis origin, known clinically as lateral epicondylitis ("tennis elbow").',
        },
        attachments: [
          {
            id: 'att-ecrb-ed-origo',
            kind: 'origo',
            muscleLatin: 'M. extensor carpi radialis brevis & M. extensor digitorum',
            muscleName: { tr: 'Ekstansör karpi radialis brevis ve Ekstansör digitorum', en: 'Extensor carpi radialis brevis & Extensor digitorum' },
            musclePartId: 'FJ1489',
            function: {
              tr: 'El bileğine ve 2.–5. parmaklara ekstansiyon yaptırır.',
              en: 'Extends the wrist and digits 2–5.',
            },
            innervation: { nerve: 'N. radialis (R. profundus / N. interosseus posterior)', roots: 'C7–C8' },
          },
          {
            id: 'att-ecu-supinator-origo',
            kind: 'origo',
            muscleLatin: 'M. extensor carpi ulnaris, M. supinator & M. anconeus',
            muscleName: { tr: 'Ekstansör karpi ulnaris, Supinatör ve Ankoneus', en: 'Extensor carpi ulnaris, Supinator & Anconeus' },
            musclePartId: 'FJ1505',
            function: {
              tr: 'El bileği ekstansiyonu/ulnar deviyasyonu, önkol supinasyonu ve dirsek ekstansiyonuna destek.',
              en: 'Wrist extension/ulnar deviation, forearm supination, and elbow extension assistance.',
            },
            innervation: { nerve: 'N. radialis / N. interosseus posterior', roots: 'C6–C8' },
          },
        ],
      },
      {
        id: 'humerus-capitulum-trochlea',
        number: 10,
        latinName: 'Capitulum humeri & Trochlea humeri',
        name: { tr: 'Kapitulum ve Troklea (Kondil Eklem Yüzleri)', en: 'Capitulum and Trochlea of Humerus' },
        synonyms: ['capitulum humeri', 'trochlea humeri', 'kapitulum', 'troklea'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[9],
        zone: { si: 0.96, ml: 0.50, ap: 0.35, radius: [0.05, 0.45, 0.45], normalHint: 'anterior' },
        description: {
          tr: 'Dış yandaki küresel Capitulum humeri yalnızca radius başı (caput radii) ile, iç yandaki makara biçimli Trochlea humeri ise ulna’nın incisura trochlearis’i ile menteşe (ginglymus) tipi eklem yapar.',
          en: 'The lateral spherical capitulum articulates with the radial head, while the medial spool-shaped trochlea articulates with the trochlear notch of the ulna.',
        },
        clinicalNote: {
          tr: 'Trochlea’nın medial dudağı lateral dudağından daha aşağıya uzandığı için önkol ekstansiyonda ve supinasyondayken kol ile önkol arasında ~10–15°’lik fizyolojik "Taşıma Açısı" (kubitus valgus) oluşur.',
          en: 'Because the medial lip of the trochlea projects further distally than the lateral lip, the extended forearm forms a physiological 10–15° carrying angle (cubitus valgus).',
        },
        attachments: [],
      },
      {
        id: 'humerus-fossa-olecrani',
        number: 11,
        latinName: 'Fossa olecrani',
        name: { tr: 'Olekranon Çukuru', en: 'Olecranon Fossa' },
        synonyms: ['fossa olecrani', 'olekranon cukuru', 'olecranon fossa'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[10],
        zone: { si: 0.88, ml: 0.46, ap: 0.88, radius: [0.06, 0.32, 0.32], normalHint: 'posterior' },
        description: {
          tr: 'Trochlea humeri’nin hemen üstünde, distal humerusun arka (posterior) yüzünde yer alan derin çukurdur; dirsek tam ekstansiyona geldiğinde ulna’nın olecranon çıkıntısı bu çukura oturur.',
          en: 'Deep posterior depression immediately superior to the trochlea that receives the olecranon of the ulna during full elbow extension.',
        },
        clinicalNote: {
          tr: 'Pediatrik suprakondiler humerus kırıkları tam bu ince kemik bölgesinden (fossa olecrani ile öndeki fossa coronoidea arasından) geçer ve A. brachialis / N. medianus (N. interosseus anterior) yaralanması riski taşır.',
          en: 'Supracondylar fractures traverse the thin bone between the olecranon and coronoid fossae, threatening the brachial artery and anterior interosseous nerve.',
        },
        attachments: [],
      },
    ],
  },

  // ============================================================================
  // 2. SCAPULA (FJ3384 Right, FJ3279 Left)
  // ============================================================================
  {
    boneId: 'scapula',
    partIds: ['FJ3384', 'FJ3279'],
    primaryPartId: 'FJ3384',
    packId: 'arm-right',
    category: 'upper-limb',
    latinName: 'Scapula',
    title: { tr: 'Scapula (Kürek Kemiği)', en: 'Scapula (Shoulder Blade)' },
    summary: {
      tr: 'Toraks arka-üst duvarında 2.–7. kaburgalar hizasında yerleşen üçgen biçimli yassı kemiktir; toplam 17 kasa tutunma yeri sağlayarak üst ekstremiteyi gövdeye bağlar.',
      en: 'Triangular flat bone overlying ribs 2–7 on the posterolateral thorax, providing attachment for 17 muscles and linking the upper limb to the axial skeleton.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Üst Çıkıntılar ve Eklem Yüzü', en: 'Processes & Glenoid Cavity' },
      shaft: { tr: 'Fossalar (Çukurlar) ve Spina', en: 'Fossae & Spine' },
      distal: { tr: 'Kenarlar ve Açılar (Margo & Angulus)', en: 'Borders & Angles' },
    },
    landmarks: [
      {
        id: 'scapula-cavitas-glenoidalis',
        number: 1,
        latinName: 'Cavitas glenoidalis & Tuberculum supra-/infraglenoidale',
        name: { tr: 'Glenoid Çukur ve Üst/Alt Tüberküller', en: 'Glenoid Cavity & Supra-/Infraglenoid Tubercles' },
        synonyms: ['cavitas glenoidalis', 'glenoid cukur', 'glenoid cavity', 'tuberculum supraglenoidale', 'tuberculum infraglenoidale'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.28, ml: 0.88, ap: 0.35, radius: [0.12, 0.25, 0.38], normalHint: 'lateral' },
        description: {
          tr: 'Skapulanın dış köşesinde yer alan sığ, armut biçimli eklem çukurudur; çevresindeki fibrokartilajinöz labrum glenoidale çukuru derinleştirir. Hemen üstünde tuberculum supraglenoidale, altında tuberculum infraglenoidale bulunur.',
          en: 'Shallow, pear-shaped lateral articular socket deepened by the glenoid labrum, flanked superiorly and inferiorly by the supraglenoid and infraglenoid tubercles.',
        },
        clinicalNote: {
          tr: 'Üst labrumun önden arkaya yırtılmasına SLAP (Superior Labrum Anterior to Posterior) lezyonu, ön-alt labrum yırtığına ise Bankart lezyonu denir.',
          en: 'Detachment of the superior labrum at the biceps anchor is a SLAP lesion; anteroinferior labral avulsion after dislocation is a Bankart lesion.',
        },
        attachments: [
          {
            id: 'att-biceps-long-origo',
            kind: 'origo',
            muscleLatin: 'M. biceps brachii (Caput longum — Tuberculum supraglenoidale)',
            muscleName: { tr: 'Biceps brachii uzun başı (Üst tüberkül)', en: 'Biceps brachii long head (Supraglenoid tubercle)' },
            musclePartId: 'FJ1478',
            function: {
              tr: 'Önkolun en güçlü supinatörü ve dirsek fleksörüdür; ayrıca humerus başını yukarıya karşı bastırır.',
              en: 'Powerful supinator of the forearm and flexor of the elbow; depresses the humeral head.',
            },
            innervation: { nerve: 'N. musculocutaneus', roots: 'C5–C6' },
          },
          {
            id: 'att-triceps-long-origo',
            kind: 'origo',
            muscleLatin: 'M. triceps brachii (Caput longum — Tuberculum infraglenoidale)',
            muscleName: { tr: 'Triceps brachii uzun başı (Alt tüberkül)', en: 'Triceps brachii long head (Infraglenoid tubercle)' },
            musclePartId: 'FJ1479',
            function: {
              tr: 'Dirsek ekstansiyonu yapar ve omuz eklemini geçen tek triceps başı olarak kolun ekstansiyon/adduksiyonuna yardım eder.',
              en: 'Extends the elbow and assists in extension and adduction of the arm at the shoulder.',
            },
            innervation: { nerve: 'N. radialis', roots: 'C6–C8' },
          },
        ],
      },
      {
        id: 'scapula-processus-coracoideus',
        number: 2,
        latinName: 'Processus coracoideus',
        name: { tr: 'Korakoid Çıkıntı', en: 'Coracoid Process' },
        synonyms: ['processus coracoideus', 'korakoid cikinti', 'coracoid process'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.14, ml: 0.72, ap: 0.12, radius: [0.10, 0.25, 0.30], normalHint: 'anterior' },
        description: {
          tr: 'Skapula boynunun üst kısmından öne ve dışa doğru kıvrılan karga gagası biçimli çıkıntıdır; köprücük kemiğinin hemen altında (infraklaviküler çukurda) palpe edilebilir.',
          en: 'Hook-like anterior projection from the superior scapular neck, palpable inferior to the lateral clavicle; anchors 3 muscles and 3 ligaments.',
        },
        attachments: [
          {
            id: 'att-pec-minor-ins',
            kind: 'insertio',
            muscleLatin: 'M. pectoralis minor',
            muscleName: { tr: 'Pektoralis minör kası', en: 'Pectoralis minor muscle' },
            musclePartId: 'FJ1456',
            function: {
              tr: 'Skapulayı öne ve aşağıya çeker (protraksiyon ve depresyon); sabit skapulada yardımcı inspirasyon kasıdır.',
              en: 'Protracts and depresses the scapula; elevates ribs 3–5 during forced inspiration when the scapula is fixed.',
            },
            innervation: { nerve: 'N. pectoralis medialis', roots: 'C8–T1' },
          },
          {
            id: 'att-coracobrachialis-origo',
            kind: 'origo',
            muscleLatin: 'M. coracobrachialis',
            muscleName: { tr: 'Korakobrakiyalis kası', en: 'Coracobrachialis muscle' },
            musclePartId: 'FJ1488',
            function: {
              tr: 'Kola fleksiyon ve adduksiyon yaptırır (içinden N. musculocutaneus delerek geçer).',
              en: 'Flexes and adducts the arm at the shoulder (pierced by the musculocutaneous nerve).',
            },
            innervation: { nerve: 'N. musculocutaneus', roots: 'C5–C7' },
          },
          {
            id: 'att-biceps-short-origo',
            kind: 'origo',
            muscleLatin: 'M. biceps brachii (Caput breve)',
            muscleName: { tr: 'Biceps brachii kısa başı', en: 'Biceps brachii short head' },
            musclePartId: 'FJ1512',
            function: {
              tr: 'Önkol supinasyonu, dirsek fleksiyonu ve zayıf omuz fleksiyonu.',
              en: 'Supinates the forearm, flexes the elbow, and weakly flexes the shoulder.',
            },
            innervation: { nerve: 'N. musculocutaneus', roots: 'C5–C6' },
          },
        ],
      },
      {
        id: 'scapula-acromion-spina',
        number: 3,
        latinName: 'Spina scapulae & Acromion',
        name: { tr: 'Skapula Dikeni ve Akromiyon', en: 'Spine of Scapula and Acromion' },
        synonyms: ['spina scapulae', 'acromion', 'akromiyon', 'skapula dikeni', 'spine of scapula'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.15, ml: 0.66, ap: 0.71, radius: [0.15, 0.50, 0.27], normalHint: 'posterior' },
        description: {
          tr: 'Skapulanın arka yüzünü üst (fossa supraspinata) ve alt (fossa infraspinata) olarak ikiye ayıran kalın kemik sırtı (spina scapulae) dış yanda yassılaşarak omuzun en üst noktasını oluşturan Acromion’la sonlanır.',
          en: 'Prominent posterior ridge (spine) dividing the dorsal scapula into supraspinous and infraspinous fossae, continuing laterally as the flat acromion at the summit of the shoulder.',
        },
        attachments: [
          {
            id: 'att-trapezius-ins',
            kind: 'insertio',
            muscleLatin: 'M. trapezius (Üst dudak ve Acromion iç kenarı)',
            muscleName: { tr: 'Trapezius kası', en: 'Trapezius muscle' },
            musclePartId: 'FJ1521',
            function: {
              tr: 'Skapulayı yükseltir (üst lifler), retrakte eder (orta lifler) ve glenoid çukuru yukarı döndürür (üst + alt lifler).',
              en: 'Elevates, retracts, and upwardly rotates the scapula.',
            },
            innervation: { nerve: 'N. accessorius (CN XI) & C3–C4 propriosepsiyon', roots: 'CN XI, C3–C4' },
          },
          {
            id: 'att-deltoid-origo',
            kind: 'origo',
            muscleLatin: 'M. deltoideus (Pars acromialis et spinalis)',
            muscleName: { tr: 'Deltoid kası (Akromiyal ve Spinal parçalar)', en: 'Deltoid muscle (Acromial & Spinal parts)' },
            musclePartId: 'FJ1513',
            function: {
              tr: 'Kolun 15°–90° abduksiyonunu (akromiyal) ve ekstansiyon/dış rotasyonunu (spinal) sağlar.',
              en: 'Abducts the arm 15°–90° (acromial part) and extends/laterally rotates the arm (spinal part).',
            },
            innervation: { nerve: 'N. axillaris', roots: 'C5–C6' },
          },
        ],
      },
      {
        id: 'scapula-fossa-supraspinata',
        number: 4,
        latinName: 'Fossa supraspinata',
        name: { tr: 'Supraspinatus Çukuru', en: 'Supraspinous Fossa' },
        synonyms: ['fossa supraspinata', 'supraspinatus cukuru', 'supraspinous fossa'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[3],
        zone: { si: 0.14, ml: 0.42, ap: 0.68, radius: [0.12, 0.35, 0.35], normalHint: 'posterior' },
        description: {
          tr: 'Spina scapulae’nin üstünde kalan dar ve derin arka çukurdur; m. supraspinatus’un gövdesini barındırır.',
          en: 'Concave posterior fossa superior to the spine of the scapula that houses the belly of the supraspinatus muscle.',
        },
        attachments: [
          {
            id: 'att-supraspinatus-origo',
            kind: 'origo',
            muscleLatin: 'M. supraspinatus',
            muscleName: { tr: 'Supraspinatus kası', en: 'Supraspinatus muscle' },
            musclePartId: 'FJ1506',
            function: {
              tr: 'Kolun ilk 15° abduksiyonunu başlatır.',
              en: 'Initiates the first 15° of arm abduction.',
            },
            innervation: { nerve: 'N. suprascapularis', roots: 'C5–C6' },
          },
        ],
      },
      {
        id: 'scapula-fossa-infraspinata',
        number: 5,
        latinName: 'Fossa infraspinata',
        name: { tr: 'İnfraspinatus Çukuru', en: 'Infraspinous Fossa' },
        synonyms: ['fossa infraspinata', 'infraspinatus cukuru', 'infraspinous fossa'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[4],
        zone: { si: 0.55, ml: 0.45, ap: 0.78, radius: [0.22, 0.35, 0.35], normalHint: 'posterior' },
        description: {
          tr: 'Spina scapulae’nin altında kalan geniş arka çukurdur; skapula arka yüzünün büyük bölümünü kaplar.',
          en: 'Large posterior convexity/concavity inferior to the scapular spine occupying most of the dorsal surface.',
        },
        attachments: [
          {
            id: 'att-infraspinatus-origo',
            kind: 'origo',
            muscleLatin: 'M. infraspinatus',
            muscleName: { tr: 'İnfraspinatus kası', en: 'Infraspinatus muscle' },
            musclePartId: 'FJ1500',
            function: {
              tr: 'Kolun en güçlü dış (lateral) rotatörüdür.',
              en: 'Primary external (lateral) rotator of the humerus.',
            },
            innervation: { nerve: 'N. suprascapularis', roots: 'C5–C6' },
          },
        ],
      },
      {
        id: 'scapula-fossa-subscapularis',
        number: 6,
        latinName: 'Fossa subscapularis (Facies costalis)',
        name: { tr: 'Subskapular Çukur (Ön/Kostal Yüz)', en: 'Subscapular Fossa (Costal Surface)' },
        synonyms: ['fossa subscapularis', 'subskapular cukur', 'subscapular fossa', 'facies costalis'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[5],
        zone: { si: 0.50, ml: 0.48, ap: 0.22, radius: [0.24, 0.36, 0.32], normalHint: 'anterior' },
        description: {
          tr: 'Skapulanın kaburgalara bakan içbükey ön yüzüdür (facies costalis); m. subscapularis bu çukurun tamamını doldurur.',
          en: 'Concave anterior (costal) surface of the scapula facing the thoracic wall, filled entirely by the subscapularis muscle.',
        },
        attachments: [
          {
            id: 'att-subscapularis-origo',
            kind: 'origo',
            muscleLatin: 'M. subscapularis',
            muscleName: { tr: 'Subskapularis kası', en: 'Subscapularis muscle' },
            musclePartId: 'FJ1504',
            function: {
              tr: 'Kola güçlü iç (medial) rotasyon ve adduksiyon yaptırır.',
              en: 'Internally (medially) rotates and adducts the arm.',
            },
            innervation: { nerve: 'Nn. subscapulares (superior et inferior)', roots: 'C5–C7' },
          },
        ],
      },
      {
        id: 'scapula-margo-medialis',
        number: 7,
        latinName: 'Margo medialis & Angulus inferior',
        name: { tr: 'İç (Vertebral) Kenar ve Alt Köşe', en: 'Medial Border and Inferior Angle' },
        synonyms: ['margo medialis', 'angulus inferior', 'ic kenar', 'alt kose', 'medial border'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[6],
        zone: { si: 0.58, ml: 0.12, ap: 0.90, radius: [0.41, 0.14, 0.13], normalHint: 'medial' },
        description: {
          tr: 'Omurgaya paralel uzanan iç kenar (margo medialis) ve 7. kaburga hizasındaki alt köşe (angulus inferior); skapulotorasik stabilizatör kasların ana tutunma hattıdır.',
          en: 'Vertebral border and inferior angle at the level of the 7th rib, anchoring the key scapulothoracic stabilizers.',
        },
        clinicalNote: {
          tr: 'N. thoracicus longus hasarında m. serratus anterior felç olur ve hasta duvara elleriyle bastırdığında skapulanın iç kenarı ve alt köşesi arkaya doğru kalkar ("Kanat Skapula" / Winged Scapula).',
          en: 'Injury to the long thoracic nerve paralyzes serratus anterior, causing the medial border and inferior angle to protrude posteriorly ("winged scapula").',
        },
        attachments: [
          {
            id: 'att-serratus-ant-ins',
            kind: 'insertio',
            muscleLatin: 'M. serratus anterior (Margo medialis kostal yüzü)',
            muscleName: { tr: 'Serratus anterior kası ("Boksör kası")', en: 'Serratus anterior muscle' },
            musclePartId: 'FJ1459',
            function: {
              tr: 'Skapulayı göğüs duvarına yapıştırır, öne çeker (protraksiyon) ve kolun 90° üzeri elevasyonu için skapulayı yukarı döndürür.',
              en: 'Holds the scapula against the rib cage, protracts it, and upwardly rotates the glenoid for overhead arm elevation.',
            },
            innervation: { nerve: 'N. thoracicus longus', roots: 'C5–C7' },
          },
          {
            id: 'att-rhomboidei-ins',
            kind: 'insertio',
            muscleLatin: 'M. rhomboideus minor et major & M. levator scapulae',
            muscleName: { tr: 'Romboid kaslar ve Levator skapula', en: 'Rhomboid minor/major & Levator scapulae' },
            musclePartId: 'FJ1536',
            function: {
              tr: 'Skapulayı içe-yukarıya çeker (retraksiyon ve elevasyon) ve glenoid çukuru aşağı döndürür.',
              en: 'Retracts, elevates, and downwardly rotates the scapula.',
            },
            innervation: { nerve: 'N. dorsalis scapulae', roots: 'C4–C5' },
          },
        ],
      },
      {
        id: 'scapula-margo-lateralis',
        number: 8,
        latinName: 'Margo lateralis (Axillaris)',
        name: { tr: 'Dış (Aksiller) Kenar', en: 'Lateral (Axillary) Border' },
        synonyms: ['margo lateralis', 'dis kenar', 'lateral border'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[7],
        zone: { si: 0.74, ml: 0.75, ap: 0.50, radius: [0.29, 0.20, 0.20], normalHint: 'lateral' },
        description: {
          tr: 'Glenoid çukurun altından alt köşeye doğru uzanan kalın dış kenardır; teres minor ve teres major kaslarının başlangıç yeridir.',
          en: 'Thickened axillary border running from the infraglenoid tubercle to the inferior angle, giving origin to teres minor and teres major.',
        },
        attachments: [
          {
            id: 'att-teres-minor-origo',
            kind: 'origo',
            muscleLatin: 'M. teres minor (Üst 2/3 dış kenar)',
            muscleName: { tr: 'Teres minör kası', en: 'Teres minor muscle' },
            musclePartId: 'FJ1508',
            function: {
              tr: 'Kola dış (lateral) rotasyon yaptırır.',
              en: 'Externally (laterally) rotates the arm.',
            },
            innervation: { nerve: 'N. axillaris', roots: 'C5–C6' },
          },
          {
            id: 'att-teres-major-origo',
            kind: 'origo',
            muscleLatin: 'M. teres major (Alt 1/3 dış kenar ve Angulus inferior)',
            muscleName: { tr: 'Teres majör kası', en: 'Teres major muscle' },
            musclePartId: 'FJ1507',
            function: {
              tr: 'Kola adduksiyon, iç rotasyon ve ekstansiyon yaptırır.',
              en: 'Adducts, internally rotates, and extends the arm.',
            },
            innervation: { nerve: 'N. subscapularis inferior', roots: 'C5–C7' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 3. CLAVICULA (FJ3362 Right, FJ3237 Left)
  // ============================================================================
  {
    boneId: 'clavicula',
    partIds: ['FJ3362', 'FJ3237'],
    primaryPartId: 'FJ3362',
    packId: 'arm-right',
    category: 'upper-limb',
    latinName: 'Clavicula',
    title: { tr: 'Clavicula (Köprücük Kemiği)', en: 'Clavicle (Collarbone)' },
    summary: {
      tr: 'Sternum ile skapulayı birbirine bağlayan S biçimli kemiktir; vücutta kemikleşmeye ilk başlayan (5.–6. fetal hafta) ve en son tamamlanan kemiktir.',
      en: 'S-shaped strut connecting the manubrium of the sternum to the acromion of the scapula; the first bone to begin ossification in the embryo.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Extremitas Sternalis (İç Uç)', en: 'Sternal (Medial) End' },
      shaft: { tr: 'Corpus Claviculae (Gövde / Orta 1/3)', en: 'Shaft (Middle Third)' },
      distal: { tr: 'Extremitas Acromialis (Dış Uç)', en: 'Acromial (Lateral) End' },
    },
    landmarks: [
      {
        id: 'clavicula-extremitas-sternalis',
        number: 1,
        latinName: 'Extremitas sternalis',
        name: { tr: 'Sternal Uç (Medial Uç)', en: 'Sternal (Medial) End' },
        synonyms: ['extremitas sternalis', 'sternal uc', 'sternal end'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.65, ml: 0.12, ap: 0.25, radius: [0.35, 0.22, 0.35], normalHint: 'anterior' },
        description: {
          tr: 'Kalın ve üçgen prizma biçimli iç uçtur; manubrium sterni ile üst ekstremitenin aksiyel iskeletle tek gerçek eklemi olan Art. sternoclavicularis’i kurar.',
          en: 'Enlarged medial end that articulates with the manubrium via an intra-articular disc at the sternoclavicular joint.',
        },
        attachments: [
          {
            id: 'att-scm-origo',
            kind: 'origo',
            muscleLatin: 'M. sternocleidomastoideus (Caput claviculare)',
            muscleName: { tr: 'Sternokleidomastoid kası (Klaviküler baş)', en: 'Sternocleidomastoid (Clavicular head)' },
            musclePartId: 'FJ1595',
            function: {
              tr: 'Tek taraflı kasıldığında başı kendi tarafına eğer ve yüzü karşı tarafa çevirir; çift taraflı boyun fleksiyonu yapar.',
              en: 'Unilaterally tilts the head ipsilaterally and rotates the face contralaterally; bilaterally flexes the neck.',
            },
            innervation: { nerve: 'N. accessorius (CN XI)', roots: 'CN XI, C2–C3' },
          },
          {
            id: 'att-pec-major-clav-origo',
            kind: 'origo',
            muscleLatin: 'M. pectoralis major (Pars clavicularis)',
            muscleName: { tr: 'Pektoralis majör (Klaviküler parça — iç 1/2 ön yüz)', en: 'Pectoralis major (Clavicular head)' },
            musclePartId: 'FJ1447',
            function: {
              tr: 'Kola fleksiyon, adduksiyon ve iç rotasyon yaptırır.',
              en: 'Flexes, adducts, and internally rotates the humerus.',
            },
            innervation: { nerve: 'N. pectoralis lateralis', roots: 'C5–C7' },
          },
        ],
      },
      {
        id: 'clavicula-corpus-sulcus-subclavii',
        number: 2,
        latinName: 'Corpus claviculae & Sulcus musculi subclavii',
        name: { tr: 'Klavikula Gövdesi ve Subklavius Oluğu', en: 'Shaft of Clavicle & Subclavian Groove' },
        synonyms: ['corpus claviculae', 'sulcus musculi subclavii', 'klavikula govdesi', 'subclavian groove'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.50, ml: 0.50, ap: 0.50, radius: [0.35, 0.25, 0.35], normalHint: 'superior' },
        description: {
          tr: 'Klavikulanın iç 2/3 konveks ile dış 1/3 konkav eğriliklerinin birleştiği orta bölgedir; alt yüzünde m. subclavius’un oturduğu oluk yer alır.',
          en: 'Junction of the medial two-thirds and lateral one-third curves; its inferior surface bears the groove for the subclavius muscle.',
        },
        clinicalNote: {
          tr: 'Klavikula kırıklarının %80’i orta 1/3 ile dış 1/3 birleşim yerinde görülür; m. subclavius altındaki A. ve V. subclavia ile plexus brachialis’i kırık kemik uçlarından koruyan doğal bir yastık görevi görür.',
          en: 'About 80% of clavicular fractures occur at the middle/lateral third junction; the subclavius muscle cushions the underlying subclavian vessels and brachial plexus.',
        },
        attachments: [
          {
            id: 'att-subclavius-ins',
            kind: 'insertio',
            muscleLatin: 'M. subclavius',
            muscleName: { tr: 'Subklavius kası (Alt yüz oluğu)', en: 'Subclavius muscle' },
            musclePartId: 'FJ1460',
            function: {
              tr: 'Klavikulayı aşağı ve içe çekerek sternoklaviküler eklemi stabilize eder.',
              en: 'Depresses and anchors the clavicle at the sternoclavicular joint.',
            },
            innervation: { nerve: 'N. subclavius', roots: 'C5–C6' },
          },
        ],
      },
      {
        id: 'clavicula-extremitas-acromialis',
        number: 3,
        latinName: 'Extremitas acromialis & Tuberculum conoideum',
        name: { tr: 'Akromiyal Uç (Dış Uç) ve Konoid Tüberkül', en: 'Acromial (Lateral) End & Conoid Tubercle' },
        synonyms: ['extremitas acromialis', 'tuberculum conoideum', 'akromiyal uc', 'acromial end'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.35, ml: 0.88, ap: 0.72, radius: [0.35, 0.22, 0.35], normalHint: 'superior' },
        description: {
          tr: 'Yassılaşmış dış uçtur; skapulanın acromion’u ile eklemleşir. Alt yüzündeki tuberculum conoideum ve linea trapezoidea’ya çok güçlü lig. coracoclaviculare tutunur.',
          en: 'Flattened lateral extremity articulating with the acromion; its inferior conoid tubercle and trapezoid line anchor the coracoclavicular ligament.',
        },
        attachments: [
          {
            id: 'att-deltoid-clav-origo',
            kind: 'origo',
            muscleLatin: 'M. deltoideus (Pars clavicularis — dış 1/3 ön kenar)',
            muscleName: { tr: 'Deltoid kası (Klaviküler parça)', en: 'Deltoid muscle (Clavicular part)' },
            musclePartId: 'FJ1468',
            function: {
              tr: 'Kola fleksiyon ve iç (medial) rotasyon yaptırır.',
              en: 'Flexes and internally rotates the arm.',
            },
            innervation: { nerve: 'N. axillaris', roots: 'C5–C6' },
          },
          {
            id: 'att-trapezius-clav-ins',
            kind: 'insertio',
            muscleLatin: 'M. trapezius (Pars descendens — dış 1/3 arka kenar)',
            muscleName: { tr: 'Trapezius kası (Üst/İnen lifler)', en: 'Trapezius muscle (Descending fibers)' },
            musclePartId: 'FJ1521',
            function: {
              tr: 'Omuz kuşağını yükseltir (elevasyon) ve boyun ekstansiyonuna katılır.',
              en: 'Elevates the pectoral girdle and braces the shoulder.',
            },
            innervation: { nerve: 'N. accessorius (CN XI)', roots: 'CN XI, C3–C4' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 4. RADIUS (FJ3349 Right, FJ3277 Left)
  // ============================================================================
  {
    boneId: 'radius',
    partIds: ['FJ3349', 'FJ3277'],
    primaryPartId: 'FJ3349',
    packId: 'arm-right',
    category: 'upper-limb',
    latinName: 'Radius',
    title: { tr: 'Radius (Döner Kemik)', en: 'Radius' },
    summary: {
      tr: 'Önkolun dış (lateral / başparmak) tarafındaki kemiktir; proksimalde küçük, distalde geniş olup el bileği ekleminin (art. radiocarpea) ana yük taşıyıcısıdır.',
      en: 'Lateral bone of the forearm; narrow proximally and expanded distally to form the primary load-bearing articular surface of the wrist.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Proksimal Uç (Baş ve Tüberositas)', en: 'Proximal End (Head & Tuberosity)' },
      shaft: { tr: 'Corpus Radii (Gövde)', en: 'Shaft of Radius' },
      distal: { tr: 'Distal Uç (El Bileği Yüzü)', en: 'Distal End (Wrist)' },
    },
    landmarks: [
      {
        id: 'radius-caput-collum',
        number: 1,
        latinName: 'Caput radii & Collum radii',
        name: { tr: 'Radius Başı ve Boynu', en: 'Head and Neck of Radius' },
        synonyms: ['caput radii', 'collum radii', 'radius basi', 'head of radius'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.05, ml: 0.50, ap: 0.50, radius: [0.07, 0.45, 0.45], normalHint: 'lateral' },
        description: {
          tr: 'Silindir/disk biçimli proksimal uçtur; üst yüzü capitulum humeri ile, çevresi (circumferentia articularis) ulna’nın incisura radialis’i ve lig. anulare radii içinde dönerek supinasyon-pronasyon yapar.',
          en: 'Disc-shaped proximal head that pivots within the annular ligament and radial notch of the ulna during pronation and supination.',
        },
        clinicalNote: {
          tr: '1–4 yaş arası çocuklarda elinden ani çekilme sonucu caput radii’nin lig. anulare radii içinden yarı çıkığına "Dadı Dirseği" (Pulled Elbow / Pronatio dolorosa) denir.',
          en: 'Sudden axial traction on a young child’s extended arm subluxates the radial head from the annular ligament ("nursemaid’s elbow").',
        },
        attachments: [],
      },
      {
        id: 'radius-tuberositas-radii',
        number: 2,
        latinName: 'Tuberositas radii',
        name: { tr: 'Radius Tüberositası', en: 'Radial Tuberosity' },
        synonyms: ['tuberositas radii', 'radius tuberositasi', 'radial tuberosity'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.15, ml: 0.18, ap: 0.28, radius: [0.07, 0.38, 0.40], normalHint: 'medial' },
        description: {
          tr: 'Collum radii’nin hemen altında, anteromedial yüzde yer alan oval kabartıdır; m. biceps brachii tendonunun sonlanma (insertio) yeridir.',
          en: 'Oval prominence on the anteromedial aspect just distal to the neck that receives the distal biceps brachii tendon.',
        },
        attachments: [
          {
            id: 'att-biceps-ins',
            kind: 'insertio',
            muscleLatin: 'M. biceps brachii',
            muscleName: { tr: 'Biceps brachii kası', en: 'Biceps brachii muscle' },
            musclePartId: 'FJ1478',
            function: {
              tr: 'Fleksiyondaki önkolun en güçlü supinatörü ve dirsek fleksörüdür.',
              en: 'Most powerful supinator of the flexed forearm and strong elbow flexor.',
            },
            innervation: { nerve: 'N. musculocutaneus', roots: 'C5–C6' },
          },
        ],
      },
      {
        id: 'radius-corpus-pronator',
        number: 3,
        latinName: 'Corpus radii & Tuberositas pronatoria',
        name: { tr: 'Radius Gövdesi ve Pronator Tüberositası', en: 'Shaft of Radius & Pronator Tuberosity' },
        synonyms: ['corpus radii', 'tuberositas pronatoria', 'pronator tuberosity'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.50, ml: 0.80, ap: 0.45, radius: [0.14, 0.40, 0.45], normalHint: 'lateral' },
        description: {
          tr: 'Radius gövdesinin dış yan ortasında m. pronator teres’in tutunduğu pürtüklü alan (tuberositas pronatoria) ve proksimal dış yüzde m. supinator’un tutunma alanı yer alır.',
          en: 'Mid-lateral shaft bearing the rough pronator tuberosity for pronator teres and proximal anterolateral surface for supinator.',
        },
        attachments: [
          {
            id: 'att-pronator-teres-ins',
            kind: 'insertio',
            muscleLatin: 'M. pronator teres',
            muscleName: { tr: 'Pronator teres kası (Orta dış yüz)', en: 'Pronator teres muscle' },
            musclePartId: 'FJ1474',
            function: {
              tr: 'Önkola hızlı ve güçlü pronasyon yaptırır, dirsek fleksiyonuna yardım eder.',
              en: 'Pronates the forearm and assists in elbow flexion.',
            },
            innervation: { nerve: 'N. medianus', roots: 'C6–C7' },
          },
          {
            id: 'att-supinator-ins',
            kind: 'insertio',
            muscleLatin: 'M. supinator (Proksimal 1/3 dış yüz)',
            muscleName: { tr: 'Supinatör kası', en: 'Supinator muscle' },
            musclePartId: 'FJ1505',
            function: {
              tr: 'Dirsek ekstansiyondayken önkolun esas supinatörüdür.',
              en: 'Primary supinator of the forearm when the elbow is extended.',
            },
            innervation: { nerve: 'N. radialis (R. profundus / PIN)', roots: 'C6–C7' },
          },
          {
            id: 'att-fpl-origo',
            kind: 'origo',
            muscleLatin: 'M. flexor pollicis longus (Ön yüz)',
            muscleName: { tr: 'Fleksor pollisis longus kası', en: 'Flexor pollicis longus muscle' },
            musclePartId: 'FJ1498',
            function: {
              tr: 'Başparmağın distal falanksına fleksiyon yaptırır.',
              en: 'Flexes the distal phalanx of the thumb.',
            },
            innervation: { nerve: 'N. interosseus anterior (N. medianus)', roots: 'C7–C8' },
          },
        ],
      },
      {
        id: 'radius-processus-styloideus',
        number: 4,
        latinName: 'Processus styloideus radii & Tuberculum dorsale',
        name: { tr: 'Radius Stiloid Çıkıntısı ve Lister Tüberkülü', en: 'Radial Styloid Process & Dorsal (Lister’s) Tubercle' },
        synonyms: ['processus styloideus radii', 'tuberculum dorsale', 'lister tuberkulu', 'radial styloid'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[3],
        zone: { si: 0.94, ml: 0.85, ap: 0.50, radius: [0.07, 0.42, 0.45], normalHint: 'lateral' },
        description: {
          tr: 'Distal radiusun dış yanında aşağı uzanan konik çıkıntı (processus styloideus radii) ve arka yüzünde m. extensor pollicis longus tendonuna makara görevi gören Lister tüberkülü (tuberculum dorsale) bulunur.',
          en: 'Lateral conical styloid projection and dorsal Lister’s tubercle, which acts as a pulley for the extensor pollicis longus tendon.',
        },
        clinicalNote: {
          tr: 'Açık el üzerine düşme (FOOSH) sonrası distal radiusun dorsale açılanmasına Colles kırığı ("çatal sırtı" deformitesi) denir.',
          en: 'Fall on an outstretched hand (FOOSH) frequently produces a dorsally angulated distal radius fracture (Colles fracture).',
        },
        attachments: [
          {
            id: 'att-brachioradialis-ins',
            kind: 'insertio',
            muscleLatin: 'M. brachioradialis (Stiloid çıkıntı tabanı)',
            muscleName: { tr: 'Brakiyoradialis kası', en: 'Brachioradialis muscle' },
            musclePartId: 'FJ1487',
            function: {
              tr: 'Önkol mid-pronasyondayken (başparmak yukarıda) dirseğe güçlü fleksiyon yaptırır.',
              en: 'Flexes the forearm at the elbow, maximally when in mid-pronation (neutral thumb-up position).',
            },
            innervation: { nerve: 'N. radialis', roots: 'C5–C6' },
          },
          {
            id: 'att-pronator-quadratus-ins',
            kind: 'insertio',
            muscleLatin: 'M. pronator quadratus (Distal 1/4 ön yüz)',
            muscleName: { tr: 'Pronator kuadratus kası', en: 'Pronator quadratus muscle' },
            musclePartId: 'FJ1503',
            function: {
              tr: 'Önkolun esas (başlatıcı) pronatörüdür ve distal radioulnar eklemi bir arada tutar.',
              en: 'Prime mover of forearm pronation and dynamic stabilizer of the distal radioulnar joint.',
            },
            innervation: { nerve: 'N. interosseus anterior (N. medianus)', roots: 'C7–C8' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 5. ULNA (FJ3391 Right, FJ3286 Left)
  // ============================================================================
  {
    boneId: 'ulna',
    partIds: ['FJ3391', 'FJ3286'],
    primaryPartId: 'FJ3391',
    packId: 'arm-right',
    category: 'upper-limb',
    latinName: 'Ulna',
    title: { tr: 'Ulna (Dirsek Kemiği)', en: 'Ulna' },
    summary: {
      tr: 'Önkolun iç (medial / serçe parmak) tarafındaki stabilize edici kemiktir; proksimal ucu kalın olup humerus trokleasını kavrayarak dirsek menteşe eklemini oluşturur.',
      en: 'Medial stabilizing bone of the forearm; its massive proximal end grasps the humeral trochlea to form the hinge of the elbow joint.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Proksimal Uç (Olekranon ve Koronoid)', en: 'Proximal End (Olecranon & Coronoid)' },
      shaft: { tr: 'Corpus Ulnae (Gövde)', en: 'Shaft of Ulna' },
      distal: { tr: 'Distal Uç (Caput Ulnae)', en: 'Distal End (Head of Ulna)' },
    },
    landmarks: [
      {
        id: 'ulna-olecranon',
        number: 1,
        latinName: 'Olecranon & Incisura trochlearis',
        name: { tr: 'Olekranon (Dirsek Çıkıntısı) ve Troklear Çentik', en: 'Olecranon and Trochlear Notch' },
        synonyms: ['olecranon', 'incisura trochlearis', 'olekranon', 'troklear centik'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.05, ml: 0.50, ap: 0.72, radius: [0.08, 0.45, 0.45], normalHint: 'posterior' },
        description: {
          tr: 'Ulna’nın en proksimal ve arka kısmında yer alan, dirsek ucu olarak palpe edilen büyük çıkıntıdır; ön yüzü incisura trochlearis’in üst duvarını oluşturur.',
          en: 'Large curved proximal prominence forming the point of the elbow posteriorly and the upper jaw of the wrench-like trochlear notch anteriorly.',
        },
        attachments: [
          {
            id: 'att-triceps-ins',
            kind: 'insertio',
            muscleLatin: 'M. triceps brachii',
            muscleName: { tr: 'Triceps brachii kası (Olekranon üst yüzü)', en: 'Triceps brachii muscle' },
            musclePartId: 'FJ1479',
            function: {
              tr: 'Dirsek ekleminin (önkolun) esas ekstansörüdür.',
              en: 'Chief extensor of the forearm at the elbow joint.',
            },
            innervation: { nerve: 'N. radialis', roots: 'C6–C8' },
          },
          {
            id: 'att-anconeus-ins',
            kind: 'insertio',
            muscleLatin: 'M. anconeus (Olekranon dış yüzü)',
            muscleName: { tr: 'Ankoneus kası', en: 'Anconeus muscle' },
            musclePartId: 'FJ1485',
            function: {
              tr: 'Dirsek ekstansiyonuna yardım eder ve pronasyon sırasında ulnayı stabilize eder.',
              en: 'Assists triceps in elbow extension and stabilizes the ulna during pronation.',
            },
            innervation: { nerve: 'N. radialis', roots: 'C7–C8' },
          },
        ],
      },
      {
        id: 'ulna-processus-coronoideus-tuberositas',
        number: 2,
        latinName: 'Processus coronoideus & Tuberositas ulnae',
        name: { tr: 'Koronoid Çıkıntı ve Ulna Tüberositası', en: 'Coronoid Process and Ulnar Tuberosity' },
        synonyms: ['processus coronoideus', 'tuberositas ulnae', 'koronoid cikinti', 'ulnar tuberosity'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.14, ml: 0.45, ap: 0.18, radius: [0.08, 0.45, 0.38], normalHint: 'anterior' },
        description: {
          tr: 'Incisura trochlearis’in alt-ön dudağını oluşturan çıkıntı (processus coronoideus) ve hemen altındaki pürtüklü Tuberositas ulnae; dış yan yüzünde ise radius başının oturduğu Incisura radialis bulunur.',
          en: 'Anterior shelf-like projection below the trochlear notch and the rough ulnar tuberosity immediately inferior to it.',
        },
        attachments: [
          {
            id: 'att-brachialis-ins',
            kind: 'insertio',
            muscleLatin: 'M. brachialis (Tuberositas ulnae)',
            muscleName: { tr: 'Brachialis kası', en: 'Brachialis muscle' },
            musclePartId: 'FJ1486',
            function: {
              tr: 'Her önkol pozisyonunda dirseğin en güçlü fleksörüdür.',
              en: 'Primary flexor of the elbow in all forearm positions.',
            },
            innervation: { nerve: 'N. musculocutaneus', roots: 'C5–C6' },
          },
          {
            id: 'att-pronator-teres-ulnar-origo',
            kind: 'origo',
            muscleLatin: 'M. pronator teres (Caput ulnare — Koronoid iç yüzü)',
            muscleName: { tr: 'Pronator teres (Ulnar baş)', en: 'Pronator teres (Ulnar head)' },
            musclePartId: 'FJ1516',
            function: {
              tr: 'Önkola pronasyon yaptırır (humeral ve ulnar başlar arasından N. medianus geçer).',
              en: 'Pronates the forearm (the median nerve passes between the humeral and ulnar heads).',
            },
            innervation: { nerve: 'N. medianus', roots: 'C6–C7' },
          },
        ],
      },
      {
        id: 'ulna-corpus',
        number: 3,
        latinName: 'Corpus ulnae & Crista musculi supinatoris',
        name: { tr: 'Ulna Gövdesi ve Derin Kas Tutunmaları', en: 'Shaft of Ulna & Supinator Crest' },
        synonyms: ['corpus ulnae', 'ulna govdesi', 'shaft of ulna'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.50, ml: 0.45, ap: 0.45, radius: [0.16, 0.45, 0.45], normalHint: 'anterior' },
        description: {
          tr: 'Yukarıdan aşağıya doğru incelen üçgen prizma biçimli gövdedir; arka kenarı (margo posterior) dirsekten el bileğine kadar deri altında doğrudan palpe edilir.',
          en: 'Three-sided shaft tapering distally; its subcutaneous posterior border is palpable along the entire length of the forearm.',
        },
        attachments: [
          {
            id: 'att-fdp-origo',
            kind: 'origo',
            muscleLatin: 'M. flexor digitorum profundus (Proksimal 3/4 ön-iç yüz)',
            muscleName: { tr: 'Derin parmak fleksörü (FDP)', en: 'Flexor digitorum profundus' },
            musclePartId: 'FJ1497',
            function: {
              tr: '2.–5. parmakların distal interfalangeal (DİF) eklemlerine fleksiyon yaptıran tek kastır.',
              en: 'Sole flexor of the distal interphalangeal (DIP) joints of digits 2–5.',
            },
            innervation: { nerve: '2.–3. parmak: N. interosseus anterior (Medianus); 4.–5. parmak: N. ulnaris', roots: 'C8–T1' },
          },
          {
            id: 'att-fcu-ulnar-origo',
            kind: 'origo',
            muscleLatin: 'M. flexor carpi ulnaris (Caput ulnare — arka kenar)',
            muscleName: { tr: 'Fleksor karpi ulnaris (Ulnar baş)', en: 'Flexor carpi ulnaris (Ulnar head)' },
            musclePartId: 'FJ1518',
            function: {
              tr: 'El bileğine fleksiyon ve ulnar deviyasyon yaptırır.',
              en: 'Flexes and ulnarly deviates the wrist.',
            },
            innervation: { nerve: 'N. ulnaris', roots: 'C7–T1' },
          },
        ],
      },
      {
        id: 'ulna-caput-styloideus',
        number: 4,
        latinName: 'Caput ulnae & Processus styloideus ulnae',
        name: { tr: 'Ulna Başı ve Stiloid Çıkıntısı (Distal Uç)', en: 'Head of Ulna and Ulnar Styloid Process' },
        synonyms: ['caput ulnae', 'processus styloideus ulnae', 'ulna basi', 'head of ulna'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[3],
        zone: { si: 0.95, ml: 0.35, ap: 0.55, radius: [0.06, 0.45, 0.45], normalHint: 'medial' },
        description: {
          tr: 'Radius’un aksine Ulna’nın başı (caput ulnae) distaldedir! El bileği kemikleriyle doğrudan eklem yapmaz; araya giren üçgen fibrokartilaj kompleks (TFCC / discus articularis) ile karpal kemiklerden ayrılır.',
          en: 'Unlike the radius, the head of the ulna lies distally; it is separated from the lunate and triquetrum by the triangular fibrocartilage complex (TFCC).',
        },
        attachments: [
          {
            id: 'att-pronator-quadratus-origo',
            kind: 'origo',
            muscleLatin: 'M. pronator quadratus (Distal 1/4 ön yüz)',
            muscleName: { tr: 'Pronator kuadratus kası', en: 'Pronator quadratus muscle' },
            musclePartId: 'FJ1503',
            function: {
              tr: 'Önkolun esas pronatörüdür.',
              en: 'Primary pronator of the forearm.',
            },
            innervation: { nerve: 'N. interosseus anterior (N. medianus)', roots: 'C7–C8' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 6. OSSA CARPI PROXIMALIA (Scaphoideum, Lunatum, Triquetrum, Pisiforme)
  // ============================================================================
  {
    boneId: 'ossa-carpi-proximalia',
    partIds: ['FJ3383', 'FJ3278', 'FJ3374', 'FJ3268', 'FJ3390', 'FJ3285', 'FJ3382', 'FJ3276'],
    primaryPartId: 'FJ3383',
    packId: 'arm-right',
    category: 'upper-limb',
    latinName: 'Ossa carpi proximalia (Scaphoideum, Lunatum, Triquetrum, Pisiforme)',
    title: { tr: 'Proksimal Sıra Karpal Kemikler (El Bileği Üst Sıra)', en: 'Proximal Row Carpal Bones' },
    summary: {
      tr: 'El bileğinin proksimal sırasını dıştan içe (radialden ulnara) oluşturan Os scaphoideum, Os lunatum, Os triquetrum ve sesamoid karakterli Os pisiforme kemikleridir; radiokarpal eklemin konveks eklem başını kurarlar.',
      en: 'From lateral (radial) to medial (ulnar): Scaphoid, Lunate, Triquetrum, and Pisiform, forming the proximal carpal row and radiocarpal articulation.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Os Scaphoideum (Skafoid / Enfiye Çukuru)', en: 'Scaphoid Bone (Radial Side)' },
      shaft: { tr: 'Os Lunatum (Lunat / Yarımay Kemiği)', en: 'Lunate Bone (Central)' },
      distal: { tr: 'Os Triquetrum ve Os Pisiforme (Ulnar Kenar)', en: 'Triquetrum & Pisiform (Ulnar Side)' },
    },
    landmarks: [
      {
        id: 'carpi-scaphoideum-tuberculum',
        number: 1,
        latinName: 'Os scaphoideum & Tuberculum ossis scaphoidei',
        name: { tr: 'Skafoid Kemik ve Skafoid Tüberkülü', en: 'Scaphoid Bone and Scaphoid Tubercle' },
        synonyms: ['os scaphoideum', 'tuberculum ossis scaphoidei', 'skafoid', 'scaphoid'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.25, ml: 0.82, ap: 0.22, radius: [0.32, 0.35, 0.35], normalHint: 'anterior' },
        description: {
          tr: 'Proksimal sıranın en büyük ve en radial (dış) kemiğidir; palmar yüzündeki Tuberculum ossis scaphoidei’ye Retinaculum flexorum (karpal tünel çatısı) tutunur, dorsal-lateral yüzü ise "Anatomik Enfiye Çukuru"nun (Fovea radialis) tabanını oluşturur.',
          en: 'Largest bone of the proximal carpal row forming the floor of the anatomical snuffbox; its palmar tubercle anchors the flexor retinaculum.',
        },
        neurovascularRelation: {
          structureLatin: 'A. radialis (Fovea radialis / Anatomik Enfiye Çukuru)',
          note: {
            tr: 'A. radialis, anatomik enfiye çukurunda skafoid kemiğin üzerinden geçer ve kemiği distalden proksimale (retrograd) besler!',
            en: 'The radial artery crosses the floor of the anatomical snuffbox over the scaphoid and supplies it retrogradely from distal to proximal.',
          },
        },
        clinicalNote: {
          tr: 'Karpal kemikler arasında EN SIK KIRILAN kemiktir (açık el üzerine düşme — FOOSH). Kanlanması distalden proksimale (retrograd) olduğu için bel (collum) kırıklarında proksimal kutupta avasküler nekroz (AVN) riski çok yüksektir!',
          en: 'Most commonly fractured carpal bone (FOOSH injury); retrograde blood supply puts the proximal pole at high risk of avascular necrosis.',
        },
        attachments: [
          {
            id: 'att-apb-scaphoid-origo',
            kind: 'origo',
            muscleLatin: 'M. abductor pollicis brevis (Tuberculum ossis scaphoidei & Retinaculum flexorum)',
            muscleName: { tr: 'Kısa başparmak abduktör kası (Tenar kas)', en: 'Abductor pollicis brevis muscle' },
            function: {
              tr: 'Başparmağa palmar abduksiyon yaptırır ve oppozisyon hareketine yardımcı olur.',
              en: 'Abducts the thumb at the carpometacarpal and metacarpophalangeal joints and aids opposition.',
            },
            innervation: { nerve: 'N. medianus (Rekürren tenar dal)', roots: 'C8–T1' },
          },
        ],
      },
      {
        id: 'carpi-lunatum',
        number: 2,
        latinName: 'Os lunatum (Facies articularis radialis)',
        name: { tr: 'Lunat Kemik (Yarımay Kemiği)', en: 'Lunate Bone' },
        synonyms: ['os lunatum', 'lunat kemik', 'lunate'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        partId: 'FJ3374',
        zone: { si: 0.30, ml: 0.50, ap: 0.50, radius: [0.50, 0.60, 0.60], normalHint: 'superior' },
        description: {
          tr: 'Skafoid ile triketrum arasında yer alan yarımay biçimli merkezi karpal kemiktir; proksimalde radius’un fossa lunata’sı ve TFCC ile, distalde ise capitatum başı ile eklem yapar. Üzerine hiçbir kas tutunmaz.',
          en: 'Crescent-shaped central bone of the proximal row articulating proximally with the radius/TFCC and distally with the capitate; has no muscular attachments.',
        },
        clinicalNote: {
          tr: 'Karpal kemikler arasında EN SIK ÇIKAN (dislokasyon gösteren) kemiktir. Palmar yönde karpal tünele doğru çıktığında N. medianus’a bası yaparak akut Karpal Tünel Sendromuna yol açar; idiyopatik avasküler nekrozuna Kienböck hastalığı denir.',
          en: 'Most commonly dislocated carpal bone; anterior dislocation into the carpal tunnel compresses the median nerve, and its osteonecrosis is Kienböck disease.',
        },
        attachments: [],
      },
      {
        id: 'carpi-pisiforme-triquetrum',
        number: 3,
        latinName: 'Os pisiforme & Os triquetrum',
        name: { tr: 'Pisiform (Bezelye) ve Triketral (Piramidal) Kemik', en: 'Pisiform and Triquetral Bones' },
        synonyms: ['os pisiforme', 'os triquetrum', 'pisiform', 'triquetrum', 'bezelye kemigi'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        partId: 'FJ3382',
        zone: { si: 0.50, ml: 0.50, ap: 0.40, radius: [0.40, 0.40, 0.40], normalHint: 'anterior' },
        description: {
          tr: 'El bileğinin ulnar (medial) kenarında yer alan piramit biçimli Os triquetrum ve onun palmar yüzü üzerinde M. flexor carpi ulnaris tendonu içinde gelişmiş sesamoid kemik olan Os pisiforme.',
          en: 'Pyramidal triquetrum on the ulnar border of the wrist and the pea-shaped sesamoid pisiform sitting on its palmar surface within the FCU tendon.',
        },
        neurovascularRelation: {
          structureLatin: 'N. ulnaris & A. ulnaris (Canalis ulnaris / Guyon Kanalı)',
          note: {
            tr: 'Os pisiforme (medialde) ile Hamulus ossis hamati (lateralde) arasında uzanan Guyon kanalından N. ulnaris ve A. ulnaris geçer.',
            en: 'Forms the medial wall of the ulnar canal (Guyon tunnel) transmitting the ulnar nerve and artery.',
          },
        },
        attachments: [
          {
            id: 'att-fcu-pisiform-ins',
            kind: 'insertio',
            muscleLatin: 'M. flexor carpi ulnaris (Os pisiforme üzerinden Lig. pisohamatum ve pisometacarpale)',
            muscleName: { tr: 'Fleksor karpi ulnaris kası', en: 'Flexor carpi ulnaris muscle' },
            musclePartId: 'FJ1518',
            function: {
              tr: 'El bileğine güçlü fleksiyon ve ulnar deviyasyon (adduksiyon) yaptırır.',
              en: 'Powerfully flexes and ulnarly deviates (adducts) the wrist.',
            },
            innervation: { nerve: 'N. ulnaris', roots: 'C7–T1' },
          },
          {
            id: 'att-adm-pisiform-origo',
            kind: 'origo',
            muscleLatin: 'M. abductor digiti minimi (Os pisiforme)',
            muscleName: { tr: 'Küçük parmak abduktör kası (Hipotenar kas)', en: 'Abductor digiti minimi muscle (Hand)' },
            function: {
              tr: '5. parmağa (serçe parmağa) abduksiyon yaptırır ve proksimal falanksını fleksiyona getirir.',
              en: 'Abducts the little finger (5th digit) and assists in flexing its proximal phalanx.',
            },
            innervation: { nerve: 'N. ulnaris (Ramus profundus)', roots: 'C8–T1' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 7. OSSA CARPI DISTALIA (Trapezium, Trapezoideum, Capitatum, Hamatum)
  // ============================================================================
  {
    boneId: 'ossa-carpi-distalia',
    partIds: ['FJ3388', 'FJ3283', 'FJ3389', 'FJ3284', 'FJ3361', 'FJ3257', 'FJ3367', 'FJ3261'],
    primaryPartId: 'FJ3361',
    packId: 'arm-right',
    category: 'upper-limb',
    latinName: 'Ossa carpi distalia (Trapezium, Trapezoideum, Capitatum, Hamatum)',
    title: { tr: 'Distal Sıra Karpal Kemikler (El Bileği Alt Sıra)', en: 'Distal Row Carpal Bones' },
    summary: {
      tr: 'El tarak kemikleriyle (Ossa metacarpi I–V) doğrudan eklem yapan distal sıra karpal kemiklerdir: dıştan içe Os trapezium, Os trapezoideum, Os capitatum (en büyük karpal kemik) ve çengelli Os hamatum.',
      en: 'From lateral to medial: Trapezium, Trapezoid, Capitate (largest carpal bone), and Hamate, articulating distally with the five metacarpal bases.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Os Trapezium ve Os Trapezoideum (Radial)', en: 'Trapezium & Trapezoid (Radial)' },
      shaft: { tr: 'Os Capitatum (Merkezi / En Büyük Karpal)', en: 'Capitate Bone (Central)' },
      distal: { tr: 'Os Hamatum ve Hamulus Ossis Hamati (Ulnar)', en: 'Hamate & Hook of Hamate (Ulnar)' },
    },
    landmarks: [
      {
        id: 'carpi-trapezium-tuberculum',
        number: 1,
        latinName: 'Os trapezium & Tuberculum ossis trapezii',
        name: { tr: 'Trapezium Kemiği ve Tüberkülü (1. KMK Eyer Eklemi)', en: 'Trapezium Bone and Tubercle' },
        synonyms: ['os trapezium', 'tuberculum ossis trapezii', 'trapezium'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        partId: 'FJ3388',
        zone: { si: 0.25, ml: 0.85, ap: 0.25, radius: [0.32, 0.35, 0.35], normalHint: 'anterior' },
        description: {
          tr: '1. metakarpal kemik tabanı ile başparmağın geniş hareket açıklığını (oppozisyon) sağlayan eyer (sellar) tipte 1. karpometakarpal eklemi kurar; palmar yüzündeki oluktan M. flexor carpi radialis tendonu geçer.',
          en: 'Forms the saddle-shaped 1st carpometacarpal joint with the thumb metacarpal for opposition; grooved anteriorly by the flexor carpi radialis tendon.',
        },
        clinicalNote: {
          tr: '1. karpometakarpal (trapezometakarpal) eklem, elde osteoartritin (rizartroz) en sık görüldüğü eklemlerden biridir.',
          en: 'The trapeziometacarpal joint is a prime site of debilitating basal thumb osteoarthritis (rhizarthrosis).',
        },
        attachments: [
          {
            id: 'att-thenar-trapezium-origo',
            kind: 'origo',
            muscleLatin: 'M. opponens pollicis, M. flexor pollicis brevis (Caput superficiale) & M. abductor pollicis brevis',
            muscleName: { tr: 'Tenar kas grubu (Opponens, Fleksor ve Abduktör pollicis brevis)', en: 'Thenar eminence muscles' },
            function: {
              tr: 'Başparmağa oppozisyon (diğer parmak uçlarıyla birleşme), fleksiyon ve abduksiyon yaptırarak ince kavramayı sağlar.',
              en: 'Produce opposition, flexion, and abduction of the thumb for precision pinch grip.',
            },
            innervation: { nerve: 'N. medianus (Rekürren motor dal)', roots: 'C8–T1' },
          },
        ],
      },
      {
        id: 'carpi-capitatum-trapezoideum',
        number: 2,
        latinName: 'Os capitatum & Os trapezoideum',
        name: { tr: 'Kapitat Kemik (En Büyük Karpal Kemik) ve Trapezoid', en: 'Capitate and Trapezoid Bones' },
        synonyms: ['os capitatum', 'os trapezoideum', 'kapitat kemik', 'capitate', 'trapezoid'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.50, ml: 0.50, ap: 0.45, radius: [0.32, 0.35, 0.35], normalHint: 'anterior' },
        description: {
          tr: 'Os capitatum el bileğinin EN BÜYÜK ve ilk kemikleşen (yaklaşık 2.–3. ayda) karpal kemiğidir; yuvarlak başı lunatum ve skafoidin oluşturduğu yuvaya oturur, distalde esas olarak 3. metakarpal tabanıyla eklem yapar.',
          en: 'The capitate is the largest carpal bone and the first to ossify; it sits centrally at the base of the 3rd metacarpal alongside the wedge-shaped trapezoid.',
        },
        attachments: [
          {
            id: 'att-adductor-pollicis-oblique-origo',
            kind: 'origo',
            muscleLatin: 'M. adductor pollicis (Caput obliquum — Os capitatum ve 2.–3. metakarp tabanı)',
            muscleName: { tr: 'Başparmak adduktör kası (Oblik baş)', en: 'Adductor pollicis muscle (Oblique head)' },
            function: {
              tr: 'Başparmağa güçlü adduksiyon yaptırarak anahtar tutma (çimdikleme) kuvvetini sağlar (Froment belirtisi bu kasın felcinde pozitiftir!).',
              en: 'Adducts the thumb powerfully for key pinch (tested clinically by Froment sign).',
            },
            innervation: { nerve: 'N. ulnaris (Ramus profundus)', roots: 'C8–T1' },
          },
        ],
      },
      {
        id: 'carpi-hamatum-hamulus',
        number: 3,
        latinName: 'Os hamatum & Hamulus ossis hamati',
        name: { tr: 'Hamat Kemik ve Çengeli (Hamulus ossis hamati)', en: 'Hamate Bone and Hook of Hamate' },
        synonyms: ['os hamatum', 'hamulus ossis hamati', 'hamat kemik', 'hamate', 'hook of hamate'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        partId: 'FJ3367',
        zone: { si: 0.60, ml: 0.30, ap: 0.15, radius: [0.32, 0.35, 0.35], normalHint: 'anterior' },
        description: {
          tr: 'Distal sıranın en medial (ulnar) kemiğidir; palmar yüzünden öne doğru uzanan belirgin çengel çıkıntısına Hamulus ossis hamati denir ve hem Karpal Tünelin dış-ulnar sınırını hem de Guyon kanalının dış duvarını oluşturur.',
          en: 'Medial-most bone of the distal row distinguished by its prominent palmar hook (hamulus), which borders both the carpal tunnel and Guyon canal.',
        },
        neurovascularRelation: {
          structureLatin: 'Ramus profundus nervi ulnaris & A. ulnaris',
          note: {
            tr: 'Ulnar sinirin derin motor dalı, Hamulus ossis hamati’nin hemen yanından kıvrılarak derin avuç içine girer; raket/golf/beyzbol sopası darbesiyle oluşan hamulus kırıklarında elin intrinsik kaslarında motor felç gelişir!',
            en: 'The deep motor branch of the ulnar nerve curves directly around the hook of the hamate; handlebar compression or racket/golf fractures here cause intrinsic hand weakness.',
          },
        },
        attachments: [
          {
            id: 'att-hypothenar-hamate-origo',
            kind: 'origo',
            muscleLatin: 'M. opponens digiti minimi & M. flexor digiti minimi brevis (Hamulus ossis hamati)',
            muscleName: { tr: 'Hipotenar kaslar (Opponens ve Fleksor digiti minimi brevis)', en: 'Hypothenar muscles (Opponens & Flexor digiti minimi brevis)' },
            function: {
              tr: '5. metakarpali öne-dışa çekerek avuç çukurunu derinleştirir (oppozisyon) ve 5. parmağa fleksiyon yaptırır.',
              en: 'Draw the 5th metacarpal anteriorly to deepen the palm (opposition) and flex the little finger.',
            },
            innervation: { nerve: 'N. ulnaris (Ramus profundus)', roots: 'C8–T1' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 8. OSSA METACARPI I–V (El Tarak Kemikleri)
  // ============================================================================
  {
    boneId: 'ossa-metacarpi',
    partIds: ['FJ3350', 'FJ3240', 'FJ3352', 'FJ3243', 'FJ3354', 'FJ3246', 'FJ3356', 'FJ3249', 'FJ3358', 'FJ3252'],
    primaryPartId: 'FJ3350',
    packId: 'arm-right',
    category: 'upper-limb',
    latinName: 'Ossa metacarpi (I–V)',
    title: { tr: 'Ossa Metacarpi I–V (El Tarak Kemikleri)', en: 'Metacarpal Bones (I–V)' },
    summary: {
      tr: 'Avuç içi iskeletini oluşturan beş minyatür uzun kemiktir; proksimalde Basis (taban), ortada Corpus (gövde) ve distalde yumruk yapıldığında belirginleşen Caput (baş — MKF eklemi) bölümlerinden oluşur.',
      en: 'Five miniature long bones forming the skeleton of the palm, each consisting of a proximal base, a shaft, and a distal head (knuckle).',
    },
    regionGroupLabels: {
      proximal: { tr: 'Basis Ossis Metacarpalis (Proksimal Taban)', en: 'Base of Metacarpals (Proximal)' },
      shaft: { tr: 'Corpus Ossis Metacarpalis (Gövde ve İnterosseöz Kaslar)', en: 'Shaft of Metacarpals' },
      distal: { tr: 'Collum ve Caput Ossis Metacarpalis (Distal Baş)', en: 'Neck & Head of Metacarpals (Distal)' },
    },
    landmarks: [
      {
        id: 'metacarpi-basis',
        number: 1,
        latinName: 'Basis ossis metacarpalis (I–V)',
        name: { tr: 'Metakarpal Taban (El Bileği Fleksör ve Ekstansör Tutunmaları)', en: 'Bases of Metacarpals I–V' },
        synonyms: ['basis ossis metacarpalis', 'metakarp tabani', 'base of metacarpal'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.14, ml: 0.50, ap: 0.45, radius: [0.18, 0.48, 0.48], normalHint: 'posterior' },
        description: {
          tr: 'Karpal kemiklerin distal sırasıyla karpometakarpal (KMK) eklemleri kuran genişlemiş proksimal uçlardır; önkolun tüm ana el bileği fleksör ve ekstansör kasları metakarpal tabanlara tutunarak sonlanır!',
          en: 'Expanded proximal ends articulating with the distal carpal row and receiving the insertions of the primary wrist flexors and extensors.',
        },
        clinicalNote: {
          tr: '1. metakarpal tabanının eklem içi kırık-çıkığına Bennett kırığı (veya Y biçimli parçalı kırığına Rolando kırığı) denir; M. abductor pollicis longus’un çekmesi nedeniyle fragman proksimale kayar.',
          en: 'Intra-articular fracture-dislocation of the 1st metacarpal base is a Bennett fracture (or comminuted Rolando fracture), displaced proximally by the APL tendon.',
        },
        attachments: [
          {
            id: 'att-apl-mc1-ins',
            kind: 'insertio',
            muscleLatin: 'M. abductor pollicis longus (I. Metakarp tabanı) & M. flexor carpi radialis (II.–III. Palmar taban)',
            muscleName: { tr: 'Abduktör pollicis longus ve Fleksor karpi radialis', en: 'Abductor pollicis longus & Flexor carpi radialis' },
            musclePartId: 'FJ1484',
            function: {
              tr: 'APL başparmağa abduksiyon ve ekstansiyon; FCR el bileğine fleksiyon ve radial deviyasyon yaptırır.',
              en: 'APL abducts and extends the thumb at the CMC joint; FCR flexes and radially deviates the wrist.',
            },
            innervation: { nerve: 'APL: N. interosseus posterior (Radialis); FCR: N. medianus', roots: 'C6–C8' },
          },
          {
            id: 'att-ecrl-ecrb-ecu-ins',
            kind: 'insertio',
            muscleLatin: 'M. extensor carpi radialis longus (II. Dorsal), brevis (III. Dorsal) & M. extensor carpi ulnaris (V. Taban)',
            muscleName: { tr: 'El bileği ekstansör kasları (ECRL, ECRB ve ECU)', en: 'Wrist extensors (ECRL, ECRB & ECU)' },
            musclePartId: 'FJ1490',
            function: {
              tr: 'El bileğine güçlü ekstansiyon yaptırarak yumruk sıkma (kavrama) sırasında bileği sabitler.',
              en: 'Extend the wrist and stabilize it during power grip.',
            },
            innervation: { nerve: 'N. radialis / N. interosseus posterior', roots: 'C6–C8' },
          },
        ],
      },
      {
        id: 'metacarpi-corpus',
        number: 2,
        latinName: 'Corpus ossis metacarpalis (I–V)',
        name: { tr: 'Metakarpal Gövde (İnterosseöz ve Oppozisyon Kasları)', en: 'Shafts of Metacarpals I–V' },
        synonyms: ['corpus ossis metacarpalis', 'metakarp govdesi', 'shaft of metacarpal'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.52, ml: 0.50, ap: 0.45, radius: [0.22, 0.48, 0.48], normalHint: 'anterior' },
        description: {
          tr: 'Uzunlamasına hafif palmar konkavlık gösteren prizmatik gövdelerdir; aralarındaki spatium interosseum’ları dolduran intrinsik el kaslarının başlangıç yeridir.',
          en: 'Slightly curved prismatic shafts bounding the intermetacarpal spaces and giving origin to the intrinsic interossei muscles.',
        },
        attachments: [
          {
            id: 'att-interossei-origo',
            kind: 'origo',
            muscleLatin: 'Mm. interossei dorsales (1–4, Çift başlı — DAB) & Mm. interossei palmares (1–3, Tek başlı — PAD)',
            muscleName: { tr: 'Dorsal ve Palmar İnterosseöz kaslar', en: 'Dorsal and Palmar Interossei muscles' },
            function: {
              tr: 'Dorsal interosseözler parmaklara abduksiyon (DAB), palmar interosseözler adduksiyon (PAD) yaptırır; birlikte MKF fleksiyonu ve İF ekstansiyonu (yazı yazma pozisyonu) sağlarlar.',
              en: 'Dorsal interossei abduct (DAB) and palmar interossei adduct (PAD) the digits; together with lumbricals they flex MCP and extend IP joints.',
            },
            innervation: { nerve: 'N. ulnaris (Ramus profundus)', roots: 'C8–T1' },
          },
          {
            id: 'att-adductor-pollicis-transverse-ins',
            kind: 'origo',
            muscleLatin: 'M. adductor pollicis (Caput transversum — III. Metakarp gövdesi) & M. opponens pollicis (I. Gövde — Insertio)',
            muscleName: { tr: 'Adduktör pollicis (Transvers baş) ve Opponens pollicis', en: 'Adductor pollicis (Transverse head) & Opponens pollicis' },
            function: {
              tr: '3. metakarp gövdesinden başlayıp başparmağı avuç içine yaklaştırır; M. opponens pollicis ise 1. metakarp gövdesinin tüm radial kenarına tutunarak kemiği içe döndürür.',
              en: 'Adducts the thumb toward the palm and rotates the 1st metacarpal shaft in opposition.',
            },
            innervation: { nerve: 'Adductor: N. ulnaris; Opponens: N. medianus', roots: 'C8–T1' },
          },
        ],
      },
      {
        id: 'metacarpi-caput-collum',
        number: 3,
        latinName: 'Caput & Collum ossis metacarpalis',
        name: { tr: 'Metakarpal Baş ve Boyun (MKF Eklemi / Yumruk Tepesi)', en: 'Head and Neck of Metacarpals (MCP Knuckle)' },
        synonyms: ['caput ossis metacarpalis', 'collum ossis metacarpalis', 'metakarp basi', 'head of metacarpal'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.88, ml: 0.50, ap: 0.45, radius: [0.16, 0.48, 0.48], normalHint: 'posterior' },
        description: {
          tr: 'Proksimal falanks tabanlarıyla kondiler tipte metakarpofalangeal (MKF) eklemleri kuran yuvarlak distal uçlardır; yumruk sıkıldığında el sırtındaki boğum çıkıntılarını (knuckles) oluşturur.',
          en: 'Rounded distal articular heads forming the condyloid metacarpophalangeal (MCP) joints and the prominences of the clenched fist.',
        },
        clinicalNote: {
          tr: 'Sert bir zemine yumruk atılması sonucu 5. metakarpal kemiğin boyun (collum) kısmında oluşan ve başın palmar yöne açılanmasıyla seyreden kırığa "Boksör Kırığı" (Boxer’s fracture) denir.',
          en: 'Fracture of the 5th metacarpal neck with palmar angulation of the head after punching a hard object is known as a "Boxer’s fracture".',
        },
        attachments: [],
      },
    ],
  },

  // ============================================================================
  // 9. PHALANGES MANUS (El Parmak Kemikleri — Proksimal, Orta, Distal)
  // ============================================================================
  {
    boneId: 'phalanges-manus',
    partIds: [
      'FJ3327', 'FJ3318', 'FJ3322', 'FJ3313', 'FJ3325', 'FJ3316', 'FJ3326', 'FJ3317', 'FJ3323', 'FJ3314',
      'FJ3303', 'FJ3296', 'FJ3306', 'FJ3299', 'FJ3292', 'FJ3291', 'FJ3304', 'FJ3297',
      'FJ3198', 'FJ3188', 'FJ3193', 'FJ3183', 'FJ3196', 'FJ3186', 'FJ3197', 'FJ3187', 'FJ3194', 'FJ3184',
    ],
    primaryPartId: 'FJ3325',
    packId: 'arm-right',
    category: 'upper-limb',
    latinName: 'Phalanges manus (Proximalis, Media, Distalis)',
    title: { tr: 'Phalanges Manus (El Parmak Kemikleri)', en: 'Phalanges of the Hand (Fingers & Thumb)' },
    summary: {
      tr: 'Başparmakta 2 (proksimal ve distal), diğer dört parmakta 3’er adet (proksimal, orta ve distal) olmak üzere her elde toplam 14 adet bulunan parmak kemikleridir; fleksör ve ekstansör tendon mekanizmalarının sonlanma noktalarıdır.',
      en: '14 digital bones per hand (2 in the thumb, 3 in digits 2–5: proximal, middle, and distal phalanges) receiving the intricate flexor and extensor tendon insertions.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Phalanx Proximalis (Proksimal Falanks / Taban)', en: 'Proximal Phalanx (Base)' },
      shaft: { tr: 'Phalanx Media ve Chiasma Tendinum (Orta Falanks)', en: 'Middle Phalanx & Camper Chiasm' },
      distal: { tr: 'Phalanx Distalis (Uç Falanks ve Tırnak Yatağı)', en: 'Distal Phalanx (Terminal)' },
    },
    landmarks: [
      {
        id: 'phalanges-manus-proximalis',
        number: 1,
        latinName: 'Phalanx proximalis (Basis & Corpus phalangis)',
        name: { tr: 'Proksimal Falanks Tabanı (İntrinsik El Kasları ve EPB Tutunması)', en: 'Base of Proximal Phalanx' },
        synonyms: ['phalanx proximalis', 'proksimal falanks', 'proximal phalanx'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.18, ml: 0.50, ap: 0.45, radius: [0.22, 0.48, 0.48], normalHint: 'anterior' },
        description: {
          tr: 'Metakarp başlarıyla MKF eklemini kuran proksimal falanks tabanıdır; elin tüm tenar, hipotenar, interosseöz ve lumbrikal kasları (dorsal ekstansör aponevroz aracılığıyla) bu bölgeye tutunur.',
          en: 'Base of the proximal phalanx articulating at the MCP joint and receiving the insertions of the thenar, hypothenar, interossei, and lumbrical muscles.',
        },
        clinicalNote: {
          tr: 'Başparmak 1. MKF ekleminin ulnar kollateral bağının (UCL) proksimal falanks tabanından zorlu abduksiyonla kopmasına "Kayakçı Başparmağı" (Gamekeeper’s / Skier’s thumb) denir.',
          en: 'Avulsion or rupture of the ulnar collateral ligament at the base of the thumb proximal phalanx produces "Gamekeeper’s / Skier’s thumb".',
        },
        attachments: [
          {
            id: 'att-intrinsic-prox-phalanx-ins',
            kind: 'insertio',
            muscleLatin: 'Mm. interossei, Mm. lumbricales (Ekstansör mekanizma), M. extensor pollicis brevis & Tenar/Hipotenar kaslar',
            muscleName: { tr: 'İntrinsik el kasları ve Kısa başparmak ekstansörü (EPB)', en: 'Intrinsic hand muscles & Extensor pollicis brevis' },
            function: {
              tr: 'MKF eklemine fleksiyon, PİF ve DİF eklemlerine ekstansiyon yaptırır; EPB başparmak proksimal falanksını ekstansiyona getirir.',
              en: 'Flex the MCP joints while extending the PIP/DIP joints via the dorsal digital expansion; EPB extends the thumb proximal phalanx.',
            },
            innervation: { nerve: 'N. ulnaris, N. medianus (1.–2. lumbrikal & tenar) ve N. radialis (EPB)', roots: 'C7–T1' },
          },
        ],
      },
      {
        id: 'phalanges-manus-media',
        number: 2,
        latinName: 'Phalanx media (Chiasma tendinum & Tractus intermedius)',
        name: { tr: 'Orta Falanks (FDS Çatalı ve Ekstansör Santral Bant)', en: 'Middle Phalanx (FDS & Central Slip)' },
        synonyms: ['phalanx media', 'orta falanks', 'middle phalanx', 'chiasma tendinum'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        partId: 'FJ3306',
        zone: { si: 0.52, ml: 0.50, ap: 0.45, radius: [0.22, 0.48, 0.48], normalHint: 'anterior' },
        description: {
          tr: '2.–5. parmakların orta kemiğidir; palmar yüzünde M. flexor digitorum superficialis (FDS) tendonu iki bacağa ayrılarak (Chiasma tendinum / Camper kiazması) yan kenarlara tutunur ve içinden derin fleksör (FDP) tendonunun geçmesine izin verir.',
          en: 'Middle phalanx of digits 2–5; receives the bifurcated slips of FDS on its palmar shaft (Camper chiasm) and the extensor central slip on its dorsal base.',
        },
        clinicalNote: {
          tr: 'Orta falanks dorsal tabanına tutunan ekstansör santral bandın (tractus intermedius) kopması sonucunda PİF ekleminde fleksiyon, DİF ekleminde hiperekstansiyon ile karakterize "Düğme İliği (Boutonnière) Deformitesi" gelişir.',
          en: 'Rupture of the extensor central slip at the dorsal base of the middle phalanx causes a "Boutonnière deformity" (PIP flexion with DIP hyperextension).',
        },
        attachments: [
          {
            id: 'att-fds-middle-phalanx-ins',
            kind: 'insertio',
            muscleLatin: 'M. flexor digitorum superficialis (Palmar yan kenarlar) & M. extensor digitorum (Dorsal santral bant)',
            muscleName: { tr: 'Yüzeyel parmak fleksörü (FDS) ve Parmak ekstansörü (ED)', en: 'Flexor digitorum superficialis & Extensor digitorum' },
            musclePartId: 'FJ1475',
            function: {
              tr: 'FDS proksimal interfalangeal (PİF) ekleme güçlü fleksiyon, ED santral bandı ise PİF ekleme ekstansiyon yaptırır.',
              en: 'FDS flexes the proximal interphalangeal (PIP) joint; the central slip of ED extends the PIP joint.',
            },
            innervation: { nerve: 'FDS: N. medianus (C7–T1); ED: N. interosseus posterior (C7–C8)', roots: 'C7–T1' },
          },
        ],
      },
      {
        id: 'phalanges-manus-distalis',
        number: 3,
        latinName: 'Phalanx distalis & Tuberositas phalangis distalis',
        name: { tr: 'Distal Falanks (FDP/FPL ve Terminal Ekstansör Tutunması)', en: 'Distal Phalanx (FDP/FPL & Terminal Extensor)' },
        synonyms: ['phalanx distalis', 'distal falanks', 'distal phalanx', 'tuberositas phalangis distalis'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        partId: 'FJ3196',
        zone: { si: 0.85, ml: 0.50, ap: 0.45, radius: [0.20, 0.48, 0.48], normalHint: 'anterior' },
        description: {
          tr: 'Parmak uçlarını oluşturan son kemiklerdir; palmar tabanına derin fleksör tendonlar (FDP ve başparmakta FPL), dorsal tabanına ise terminal ekstansör tendonlar (ED ve EPL) tutunur.',
          en: 'Terminal bone of each digit bearing a rough palmar tuft for the fingertip pulp and receiving FDP/FPL palmarly and the terminal extensor tendon dorsally.',
        },
        clinicalNote: {
          tr: 'Dorsal tabandan ekstansör tendonun kopmasına "Çekiç Parmak" (Mallet finger — DİF ekstansiyon kaybı), palmar tabandan FDP tendonunun zorlu ekstansiyonda kopmasına ise "Forma Parmağı" (Jersey finger — DİF fleksiyon kaybı) denir!',
          en: 'Avulsion of the dorsal terminal extensor produces "Mallet finger", whereas avulsion of the palmar FDP tendon during forced extension produces "Jersey finger".',
        },
        attachments: [
          {
            id: 'att-fdp-fpl-epl-distal-ins',
            kind: 'insertio',
            muscleLatin: 'M. flexor digitorum profundus & M. flexor pollicis longus (Palmar) / M. extensor digitorum & M. extensor pollicis longus (Dorsal)',
            muscleName: { tr: 'Derin parmak/başparmak fleksörleri (FDP/FPL) ve Uzun ekstansörler (ED/EPL)', en: 'Deep digital flexors (FDP/FPL) & Terminal extensors (ED/EPL)' },
            musclePartId: 'FJ1497',
            function: {
              tr: 'Distal interfalangeal (DİF) eklemlere ve başparmak İF eklemine fleksiyon (FDP/FPL) ve ekstansiyon (ED/EPL) yaptırır.',
              en: 'Flex (FDP/FPL) and extend (ED/EPL) the distal interphalangeal (DIP) joints and thumb IP joint.',
            },
            innervation: { nerve: 'N. medianus (AİO), N. ulnaris & N. radialis (PİO)', roots: 'C7–T1' },
          },
        ],
      },
    ],
  },
];
