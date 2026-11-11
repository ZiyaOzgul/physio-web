import { BONE_ZONE_PALETTE, type BoneSubanatomySpec } from './domain';

export const AXIAL_BONE_SPECS: readonly BoneSubanatomySpec[] = [
  // ============================================================================
  // 1. MANDIBULA (FJ3289)
  // ============================================================================
  {
    boneId: 'mandibula',
    partIds: ['FJ3289'],
    primaryPartId: 'FJ3289',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Mandibula',
    title: { tr: 'Mandibula (Alt Çene Kemiği)', en: 'Mandible (Lower Jaw)' },
    summary: {
      tr: 'Visserokranyumun (yüz iskeletinin) en büyük, en sağlam ve kulak kemikçikleri dışında kafatasının tek hareketli kemiğidir; çiğneme (mastikasyon) kaslarının tamamı bu kemiğe tutunur.',
      en: 'Largest, strongest, and only mobile bone of the facial skeleton (viscerocranium), receiving the insertions of all four primary muscles of mastication.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Ramus Mandibulae Üst Çıkıntıları', en: 'Superior Processes of Ramus' },
      shaft: { tr: 'Ramus ve Angulus Mandibulae (Köşe)', en: 'Ramus & Angle of Mandible' },
      distal: { tr: 'Corpus Mandibulae (Gövde ve Çene Ucu)', en: 'Body of Mandible & Chin' },
    },
    landmarks: [
      {
        id: 'mandibula-caput-condylaris',
        number: 1,
        latinName: 'Processus condylaris (Caput & Collum mandibulae)',
        name: { tr: 'Kondiler Çıkıntı (Mandibula Başı ve Boynu)', en: 'Condylar Process (Head & Neck of Mandible)' },
        synonyms: ['processus condylaris', 'caput mandibulae', 'collum mandibulae', 'mandibula basi'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.14, ml: 0.90, ap: 0.88, radius: [0.16, 0.25, 0.28], normalHint: 'posterior' },
        description: {
          tr: 'Ramus mandibulae’nin arka-üst ucundaki makara biçimli eklem başıdır (caput mandibulae); temporal kemiğin fossa mandibularis’i ve discus articularis ile Temporomandibüler Eklemi (TME) kurar.',
          en: 'Posterolateral articular head of the mandibular ramus forming the temporomandibular joint (TMJ) with the temporal bone.',
        },
        attachments: [
          {
            id: 'att-lat-pterygoid-ins',
            kind: 'insertio',
            muscleLatin: 'M. pterygoideus lateralis (Fovea pterygoidea — Boyun ön yüzü)',
            muscleName: { tr: 'Lateral pterygoid kası', en: 'Lateral pterygoid muscle' },
            function: {
              tr: 'Kondili ve eklem diskini öne çekerek (protrüzyon) ağzı açan (mandibula depresyonu yapan) tek ana çiğneme kasıdır.',
              en: 'Protrudes the mandible and is the only primary muscle of mastication that depresses the jaw (opens the mouth).',
            },
            innervation: { nerve: 'N. mandibularis (CN V3)', roots: 'CN V3' },
          },
        ],
      },
      {
        id: 'mandibula-processus-coronoideus',
        number: 2,
        latinName: 'Processus coronoideus',
        name: { tr: 'Koronoid Çıkıntı', en: 'Coronoid Process of Mandible' },
        synonyms: ['processus coronoideus', 'koronoid cikinti', 'coronoid process'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.16, ml: 0.82, ap: 0.52, radius: [0.16, 0.25, 0.28], normalHint: 'lateral' },
        description: {
          tr: 'Ramus mandibulae’nin ön-üst ucundaki üçgen biçimli yassı çıkıntıdır; arkadaki processus condylaris ile arasında Incisura mandibulae bulunur.',
          en: 'Thin, triangular anterosuperior projection of the mandibular ramus separated from the condylar process by the mandibular notch.',
        },
        attachments: [
          {
            id: 'att-temporalis-ins',
            kind: 'insertio',
            muscleLatin: 'M. temporalis',
            muscleName: { tr: 'Temporal kas (Şakak kası)', en: 'Temporalis muscle' },
            function: {
              tr: 'Mandibulayı güçlüce kaldırarak çeneyi kapatır (elevasyon); arka yatay lifleri çeneyi geriye çeker (retraksiyon).',
              en: 'Powerfully elevates the mandible to close the jaw; posterior fibers retract the protruded mandible.',
            },
            innervation: { nerve: 'Nn. temporales profundi (N. mandibularis — CN V3)', roots: 'CN V3' },
          },
        ],
      },
      {
        id: 'mandibula-angulus',
        number: 3,
        latinName: 'Angulus mandibulae (Tuberositas masseterica & pterygoidea)',
        name: { tr: 'Mandibula Köşesi (Masseterik ve Pterygoid Tüberositaslar)', en: 'Angle of Mandible (Masseteric & Pterygoid Tuberosities)' },
        synonyms: ['angulus mandibulae', 'tuberositas masseterica', 'tuberositas pterygoidea', 'mandibula kosesi'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.65, ml: 0.86, ap: 0.72, radius: [0.18, 0.25, 0.28], normalHint: 'lateral' },
        description: {
          tr: 'Ramus ile corpus mandibulae’nin birleştiği alt-arka köşedir (antropolojik noktası: Gonion); dış yüzündeki pürtüklü alana Tuberositas masseterica, iç yüzündekine Tuberositas pterygoidea denir.',
          en: 'Posteroinferior junction of the ramus and body; rough externally for masseter and internally for medial pterygoid, forming a muscular sling.',
        },
        attachments: [
          {
            id: 'att-masseter-ins',
            kind: 'insertio',
            muscleLatin: 'M. masseter (Dış yüz — Tuberositas masseterica)',
            muscleName: { tr: 'Masseter kası', en: 'Masseter muscle' },
            function: {
              tr: 'Çeneyi en yüksek ısırma kuvvetiyle kapatan (mandibula elevasyonu) çiğneme kasıdır.',
              en: 'Powerfully elevates the mandible to occlude the teeth during biting.',
            },
            innervation: { nerve: 'N. massetericus (N. mandibularis — CN V3)', roots: 'CN V3' },
          },
          {
            id: 'att-med-pterygoid-ins',
            kind: 'insertio',
            muscleLatin: 'M. pterygoideus medialis (İç yüz — Tuberositas pterygoidea)',
            muscleName: { tr: 'Medial pterygoid kası', en: 'Medial pterygoid muscle' },
            function: {
              tr: 'Masseter ile birlikte mandibulayı askıya alarak kapatır (elevasyon) ve öğütme hareketinde çeneyi karşı tarafa kaydırır.',
              en: 'Acts synergistically with masseter to elevate the mandible and produces side-to-side grinding movements.',
            },
            innervation: { nerve: 'N. mandibularis (CN V3)', roots: 'CN V3' },
          },
        ],
      },
      {
        id: 'mandibula-corpus-foramen-mentale',
        number: 4,
        latinName: 'Corpus mandibulae, Foramen mentale & Linea mylohyoidea',
        name: { tr: 'Mandibula Gövdesi, Mental Delik ve Ağız Tabanı Kasları', en: 'Body of Mandible, Mental Foramen & Mylohyoid Line' },
        synonyms: ['corpus mandibulae', 'foramen mentale', 'linea mylohyoidea', 'protuberantia mentalis'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[3],
        zone: { si: 0.85, ml: 0.35, ap: 0.18, radius: [0.18, 0.45, 0.32], normalHint: 'anterior' },
        description: {
          tr: 'At nalı biçimli gövdedir; dış yüzde 2. premolar diş hizasında N. mentalis’in çıktığı Foramen mentale, iç yüzde ise ağız tabanını (diaphragma oris) oluşturan Linea mylohyoidea ve Fossa digastrica yer alır.',
          en: 'U-shaped horizontal body; pierced externally by the mental foramen below the 2nd premolar and marked internally by the mylohyoid line and digastric fossa.',
        },
        attachments: [
          {
            id: 'att-mylohyoid-digastric-origo',
            kind: 'origo',
            muscleLatin: 'M. mylohyoideus, M. geniohyoideus & M. digastricus (Venter anterior)',
            muscleName: { tr: 'Mylohyoid, Geniohyoid ve Digastrik ön karın (Suprahyoid kaslar)', en: 'Mylohyoid, Geniohyoid & Anterior belly of Digastric' },
            musclePartId: 'FJ1583',
            function: {
              tr: 'Yutkunma sırasında ağız tabanını ve hiyoid kemiği yukarı kaldırır; hiyoid sabitken mandibulayı aşağı çekerek ağzı açar.',
              en: 'Elevate the floor of the mouth and hyoid bone during swallowing, or depress the mandible when the hyoid is fixed.',
            },
            innervation: { nerve: 'Mylohyoid & Digastrik ön karın: N. mylohyoideus (CN V3); Geniohyoid: C1 (N. hypoglossus eşliğinde)', roots: 'CN V3, C1' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 2. STERNUM (FJ3290 Manubrium, FJ3178 Corpus, FJ3153 Processus xiphoideus)
  // ============================================================================
  {
    boneId: 'sternum',
    partIds: ['FJ3178', 'FJ3290', 'FJ3153'],
    primaryPartId: 'FJ3178',
    packId: 'thorax',
    category: 'axial',
    latinName: 'Sternum (Manubrium, Corpus, Processus xiphoideus)',
    title: { tr: 'Sternum (Göğüs / İman Tahtası Kemiği)', en: 'Sternum (Breastbone)' },
    summary: {
      tr: 'Göğüs ön duvarının orta hattında yer alan hançer biçimli yassı kemiktir; manubrium, corpus ve processus xiphoideus olmak üzere 3 parçadan oluşur ve ömür boyu aktif kırmızı kemik iliği barındırır.',
      en: 'Elongated flat bone in the anterior midline of the thoracic cage consisting of the manubrium, body, and xiphoid process.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Manubrium ve Angulus Sterni', en: 'Manubrium & Sternal Angle' },
      shaft: { tr: 'Corpus Sterni (Gövde)', en: 'Body of Sternum' },
      distal: { tr: 'Processus Xiphoideus (Alt Uç)', en: 'Xiphoid Process' },
    },
    landmarks: [
      {
        id: 'sternum-manubrium-angulus',
        number: 1,
        latinName: 'Manubrium sterni & Angulus sterni (Louis Açısı)',
        name: { tr: 'Manubrium ve Sternum Açısı (Louis Açısı)', en: 'Manubrium & Sternal Angle (Angle of Louis)' },
        synonyms: ['manubrium sterni', 'angulus sterni', 'louis acisi', 'incisura jugularis'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        partId: 'FJ3290',
        zone: { si: 0.50, ml: 0.00, ap: 0.30, radius: [0.60, 0.60, 0.50], normalHint: 'anterior' },
        description: {
          tr: 'Üstteki geniş Manubrium ile Corpus sterni’nin birleştiği enine kabartı Angulus sterni (Louis açısı) olup T4–T5 intervertebral diski ve tam 2. kaburga kıkırdağı hizasındadır (kaburga sayımında temel klinik röperdir).',
          en: 'Junction of the manubrium and body at the T4–T5 level; marks the articulation of the 2nd costal cartilage for clinical rib counting.',
        },
        attachments: [
          {
            id: 'att-scm-sternal-origo',
            kind: 'origo',
            muscleLatin: 'M. sternocleidomastoideus (Caput sternale), M. sternohyoideus & M. sternothyroideus',
            muscleName: { tr: 'Sternokleidomastoid (Sternal baş) ve İnfrahyoid kaslar', en: 'Sternocleidomastoid & Infrahyoid strap muscles' },
            musclePartId: 'FJ1595',
            function: {
              tr: 'SCM başı döndürür ve boynu fleksiyona getirir; infrahyoid kaslar yutkunma ve konuşmada hiyoid ile larinksi aşağı çeker.',
              en: 'SCM rotates the head and flexes the neck; infrahyoid muscles depress the hyoid bone and larynx.',
            },
            innervation: { nerve: 'SCM: N. accessorius (CN XI); İnfrahyoidler: Ansa cervicalis (C1–C3)', roots: 'CN XI, C1–C3' },
          },
        ],
      },
      {
        id: 'sternum-corpus',
        number: 2,
        latinName: 'Corpus sterni & Incisurae costales (II–VII)',
        name: { tr: 'Sternum Gövdesi ve Kostal Çentikler', en: 'Body of Sternum & Costal Notches' },
        synonyms: ['corpus sterni', 'sternum govdesi', 'body of sternum', 'incisurae costales'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.52, ml: 0.45, ap: 0.45, radius: [0.25, 0.45, 0.45], normalHint: 'anterior' },
        description: {
          tr: 'T5–T9 omurları hizasında uzanan yassı gövdedir; yan kenarlarındaki çentiklere 2.–7. gerçek kaburgaların (costae verae) kıkırdakları doğrudan eklemleşir.',
          en: 'Long, flat sternal body articulating laterally with the costal cartilages of true ribs 2–7.',
        },
        clinicalNote: {
          tr: 'Kardiyopulmoner resüsitasyonda (KPR / kalp masajı) göğüs kompresyonları corpus sterni’nin alt yarısı üzerine uygulanır.',
          en: 'Chest compressions during cardiopulmonary resuscitation (CPR) are applied over the lower half of the corpus sterni.',
        },
        attachments: [
          {
            id: 'att-pec-major-stern-origo',
            kind: 'origo',
            muscleLatin: 'M. pectoralis major (Pars sternocostalis — Ön yüz) & M. transversus thoracis (Arka yüz)',
            muscleName: { tr: 'Pektoralis majör (Sternokostal parça) ve Transversus torasis', en: 'Pectoralis major (Sternocostal head) & Transversus thoracis' },
            musclePartId: 'FJ1464',
            function: {
              tr: 'Pectoralis major kola güçlü adduksiyon ve iç rotasyon yaptırır; Transversus thoracis zorlu ekspirasyonda kostal kıkırdakları aşağı çeker.',
              en: 'Pectoralis major powerfully adducts and medially rotates the arm; transversus thoracis assists forced expiration.',
            },
            innervation: { nerve: 'Nn. pectorales lateralis et medialis (C5–T1) & Nn. intercostales (T2–T6)', roots: 'C5–T6' },
          },
        ],
      },
      {
        id: 'sternum-xiphoideus',
        number: 3,
        latinName: 'Processus xiphoideus',
        name: { tr: 'Ksifoid Çıkıntı (Hançersi Uç)', en: 'Xiphoid Process' },
        synonyms: ['processus xiphoideus', 'ksifoid cikinti', 'xiphoid process'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        partId: 'FJ3153',
        zone: { si: 0.50, ml: 0.00, ap: 0.50, radius: [0.70, 0.70, 0.70], normalHint: 'anterior' },
        description: {
          tr: 'Sternumun T10 vertebra hizasındaki en küçük ve en alt parçasıdır; gençlerde hiyalin kıkırdak yapısındayken 40 yaş civarında kemikleşir.',
          en: 'Smallest, most inferior part of the sternum at the T10 level; cartilaginous in youth and ossifying in adulthood.',
        },
        attachments: [
          {
            id: 'att-diaphragm-rectus-origo',
            kind: 'origo',
            muscleLatin: 'Diaphragma (Pars sternalis — Arka yüz) & M. rectus abdominis / Linea alba (Ön-alt uç)',
            muscleName: { tr: 'Diyafram (Sternal parça) ve Rektus abdominis', en: 'Diaphragm (Sternal part) & Rectus abdominis' },
            musclePartId: 'FJ3131',
            function: {
              tr: 'Diyafram solunumun (inspirasyonun) ana kasıdır; Rectus abdominis gövde fleksiyonu yapar.',
              en: 'Diaphragm is the principal muscle of inspiration; rectus abdominis flexes the trunk.',
            },
            innervation: { nerve: 'Diaphragma: N. phrenicus (C3–C5); Rectus abdominis: Nn. thoracoabdominales (T7–T12)', roots: 'C3–C5, T7–T12' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 3. OS SACRUM & OS COCCYGIS (FJ3393, HRA_sacrum, HRA_coccyx)
  // ============================================================================
  {
    boneId: 'sacrum',
    partIds: ['FJ3393', 'HRA_sacrum', 'HRA_coccyx'],
    primaryPartId: 'FJ3393',
    packId: 'pelvis',
    category: 'axial',
    latinName: 'Os sacrum & Os coccygis',
    title: { tr: 'Os Sacrum (Sağrı Kemiği) ve Koksiks', en: 'Sacrum and Coccyx' },
    summary: {
      tr: '5 sakral omurun (S1–S5) erişkinde kaynaşmasıyla oluşan kama biçimli üçgen kemiktir; omurganın tüm yükünü sağ ve sol sakroilyak eklemler (Art. sacroiliaca) üzerinden pelvise aktarır.',
      en: 'Triangular wedge-shaped bone formed by the fusion of five sacral vertebrae (S1–S5), transmitting axial spine load to the pelvic girdle via the sacroiliac joints.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Basis Ossis Sacri ve Promontorium', en: 'Base of Sacrum & Promontory' },
      shaft: { tr: 'Facies Pelvina (Ön) ve Facies Dorsalis (Arka)', en: 'Pelvic & Dorsal Surfaces' },
      distal: { tr: 'Apex Ossis Sacri, Hiatus ve Koksiks', en: 'Apex, Sacral Hiatus & Coccyx' },
    },
    landmarks: [
      {
        id: 'sacrum-promontorium-basis',
        number: 1,
        latinName: 'Basis ossis sacri & Promontorium',
        name: { tr: 'Sakrum Tabanı ve Promontoryum', en: 'Base of Sacrum & Sacral Promontory' },
        synonyms: ['promontorium', 'basis ossis sacri', 'sakrum tabani', 'sacral promontory'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.10, ml: 0.35, ap: 0.15, radius: [0.12, 0.45, 0.35], normalHint: 'anterior' },
        description: {
          tr: 'S1 omur gövdesinin L5 ile lumbosakral açıyı oluşturarak pelvis boşluğuna doğru öne fırlayan keskin üst-ön kenarıdır (Promontorium); obstetrik pelvis giriş (apertura pelvis superior) çaplarının arka referans noktasıdır.',
          en: 'Prominent anterior lip of the superior surface of the S1 body; key obstetric landmark defining the posterior border of the pelvic inlet.',
        },
        attachments: [],
      },
      {
        id: 'sacrum-facies-pelvina-foramina',
        number: 2,
        latinName: 'Facies pelvina & Foramina sacralia anteriora',
        name: { tr: 'Pelvik (Ön) Yüz ve Ön Sakral Delikler', en: 'Pelvic Surface & Anterior Sacral Foramina' },
        synonyms: ['facies pelvina', 'foramina sacralia anteriora', 'on sakral delikler', 'pelvic surface of sacrum'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.42, ml: 0.55, ap: 0.30, radius: [0.18, 0.45, 0.35], normalHint: 'anterior' },
        description: {
          tr: 'İçbükey pelvik ön yüz ve içinden S1–S4 spinal sinirlerin ön dallarının (Plexus sacralis) çıktığı 4 çift Foramina sacralia anteriora; bu deliklerin dış yanından M. piriformis başlar.',
          en: 'Concave anterior pelvic surface perforated by four pairs of anterior sacral foramina transmitting the ventral rami of S1–S4 (sacral plexus).',
        },
        attachments: [
          {
            id: 'att-piriformis-origo',
            kind: 'origo',
            muscleLatin: 'M. piriformis (S2–S4 ön yüz, delikler arası)',
            muscleName: { tr: 'Piriformis kası', en: 'Piriformis muscle' },
            musclePartId: 'FJ1428',
            function: {
              tr: 'Uyluğa dış (lateral) rotasyon ve fleksiyondaki kalçaya abduksiyon yaptırır (foramen ischiadicum majus’tan geçerken hemen altından N. ischiadicus çıkar — Piriformis Sendromu).',
              en: 'Laterally rotates the extended thigh and abducts the flexed thigh; anatomical key to the greater sciatic foramen.',
            },
            innervation: { nerve: 'N. musculi piriformis (Plexus sacralis)', roots: 'S1–S2' },
          },
        ],
      },
      {
        id: 'sacrum-crista-dorsalis',
        number: 3,
        latinName: 'Facies dorsalis & Crista sacralis mediana',
        name: { tr: 'Arka Yüz ve Mediyan Sakral İbik', en: 'Dorsal Surface & Median Sacral Crest' },
        synonyms: ['facies dorsalis', 'crista sacralis mediana', 'arka sakral yuz', 'median sacral crest'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.45, ml: 0.45, ap: 0.85, radius: [0.22, 0.45, 0.35], normalHint: 'posterior' },
        description: {
          tr: 'Sakral omurların spinöz çıkıntılarının kaynaşmasıyla oluşan orta hat sırtı (Crista sacralis mediana) ve yanlarındaki arka sakral delikler; derin sırt ekstansörleri ve gluteus maximus buradan başlar.',
          en: 'Rough convex posterior surface featuring the median sacral crest (fused spinous processes) and posterior sacral foramina.',
        },
        attachments: [
          {
            id: 'att-erector-spinae-gluteus-origo',
            kind: 'origo',
            muscleLatin: 'M. erector spinae, M. multifidus & M. gluteus maximus',
            muscleName: { tr: 'Erektör spina, Multifidus ve Gluteus maksimus kasları', en: 'Erector spinae, Multifidus & Gluteus maximus' },
            musclePartId: 'FJ1418',
            function: {
              tr: 'Erector spinae ve multifidus omurgayı dik tutar (ekstansiyon); Gluteus maximus kalçaya güçlü ekstansiyon yaptırır.',
              en: 'Erector spinae and multifidus extend and stabilize the vertebral column; gluteus maximus extends the hip.',
            },
            innervation: { nerve: 'Erector/Multifidus: Rr. dorsales nn. spinalium; Gluteus maximus: N. gluteus inferior (L5–S2)', roots: 'L1–S3' },
          },
        ],
      },
      {
        id: 'sacrum-hiatus-coccyx',
        number: 4,
        latinName: 'Hiatus sacralis & Os coccygis',
        name: { tr: 'Sakral Hiatus ve Koksiks (Kuyruk Sokumu)', en: 'Sacral Hiatus and Coccyx' },
        synonyms: ['hiatus sacralis', 'os coccygis', 'koksiks', 'kuyruk sokumu', 'sacral hiatus'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[3],
        zone: { si: 0.88, ml: 0.35, ap: 0.72, radius: [0.14, 0.45, 0.40], normalHint: 'posterior' },
        description: {
          tr: 'S5 (ve bazen S4) laminalarının orta hatta birleşmemesiyle oluşan ters U biçimli açıklık (Hiatus sacralis — kaudal epidural anestezi giriş yeri) ve altındaki 3–5 rudimenter omurdan oluşan Os coccygis.',
          en: 'Inverted U-shaped caudal opening of the sacral canal (site for caudal epidural anesthesia) and the terminal coccyx.',
        },
        attachments: [
          {
            id: 'att-levator-ani-coccygeus',
            kind: 'insertio',
            muscleLatin: 'M. levator ani (Pelvik diyafram) & M. coccygeus',
            muscleName: { tr: 'Pelvik taban kasları (Levator ani ve Koksigeus)', en: 'Pelvic floor muscles (Levator ani & Coccygeus)' },
            musclePartId: 'FJ2547',
            function: {
              tr: 'Pelvik organları alttan destekler ve üriner/fekal kontinansa katkıda bulunur.',
              en: 'Support pelvic viscera and maintain urinary and fecal continence.',
            },
            innervation: { nerve: 'N. musculi levatoris ani (S3–S4) & N. pudendus (S2–S4)', roots: 'S2–S4' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 4. OS OCCIPITALE (FJ3309)
  // ============================================================================
  {
    boneId: 'cranium-occipitale',
    partIds: ['FJ3309'],
    primaryPartId: 'FJ3309',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Os occipitale',
    title: { tr: 'Os Occipitale (Artkafa Kemiği)', en: 'Occipital Bone' },
    summary: {
      tr: 'Kafatasının arka-alt duvarını ve kafa tabanını oluşturan kemiktir; merkezindeki Foramen magnum aracılığıyla kafa boşluğunu vertebral kanala bağlar ve ense kaslarının ana tutunma kalkanıdır.',
      en: 'Forms the posteroinferior neurocranium and cranial base around the foramen magnum, articulating with the atlas (C1) and anchoring the suboccipital and nuchal muscles.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Squama Occipitalis (Üst Artkafa Pulu)', en: 'Squamous Part of Occipital Bone' },
      shaft: { tr: 'Protuberantia Occipitalis Externa (Inion) ve Nuchal Çizgiler', en: 'External Occipital Protuberance & Nuchal Lines' },
      distal: { tr: 'Condylus Occipitalis, Pars Basilaris ve Foramen Magnum', en: 'Occipital Condyles, Basilar Part & Foramen Magnum' },
    },
    landmarks: [
      {
        id: 'occipitale-squama-lambda',
        number: 1,
        latinName: 'Squama occipitalis & Margo lambdoideus',
        name: { tr: 'Oksipital Pul ve Lambdoid Kenar', en: 'Squamous Part of Occipital Bone' },
        synonyms: ['squama occipitalis', 'margo lambdoideus', 'oksipital pul'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.22, ml: 0.45, ap: 0.90, radius: [0.22, 0.45, 0.35], normalHint: 'posterior' },
        description: {
          tr: 'Foramen magnum’un arkasında ve üstünde yükselen geniş, kavisli kemik yapraktır; iç yüzünde beynin oksipital lobları (Fossa cerebralis) ve beyincik yarımküreleri (Fossa cerebellaris) oturur.',
          en: 'Broad curved plate rising posterosuperior to the foramen magnum; cradles the occipital lobes and cerebellar hemispheres internally.',
        },
        attachments: [
          {
            id: 'att-occipitofrontalis-occipitalis-origo',
            kind: 'origo',
            muscleLatin: 'M. occipitofrontalis (Venter occipitalis — Linea nuchalis suprema)',
            muscleName: { tr: 'Oksipitofrontalis kası (Oksipital karın)', en: 'Occipitofrontalis muscle (Occipital belly)' },
            function: {
              tr: 'Saçlı deri aponevrozunu (Galea aponeurotica) arkaya doğru çeker.',
              en: 'Draws the epicranial aponeurosis (scalp) posteriorly.',
            },
            innervation: { nerve: 'N. facialis (CN VII — N. auricularis posterior)', roots: 'CN VII' },
          },
        ],
      },
      {
        id: 'occipitale-protuberantia-lineae-nuchae',
        number: 2,
        latinName: 'Protuberantia occipitalis externa (Inion) & Lineae nuchales',
        name: { tr: 'Dış Oksipital Tümsek (İnion) ve Ense Çizgileri', en: 'External Occipital Protuberance (Inion) & Nuchal Lines' },
        synonyms: ['protuberantia occipitalis externa', 'inion', 'linea nuchalis superior', 'linea nuchalis inferior'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.63, ml: 0.0, ap: 0.93, radius: [0.20, 0.30, 0.20], normalHint: 'posterior' },
        description: {
          tr: 'Artkafa kemiğinin dış yüz ortasındaki belirgin tümsek (Inion) ve buradan yanlara doğru uzanan üst/alt ense çizgileri (Linea nuchalis superior et inferior).',
          en: 'Midline posterior prominence (inion) and the curved superior and inferior nuchal lines radiating laterally from it.',
        },
        attachments: [
          {
            id: 'att-trapezius-scm-occ-origo',
            kind: 'origo',
            muscleLatin: 'M. trapezius (İç 1/3) & M. sternocleidomastoideus (Dış yarım — Insertio)',
            muscleName: { tr: 'Trapezius (Origo) ve Sternokleidomastoid / Splenius capitis (İnsertio)', en: 'Trapezius, Sternocleidomastoid & Splenius capitis' },
            musclePartId: 'FJ1521',
            function: {
              tr: 'Başa ekstansiyon, lateral fleksiyon ve rotasyon yaptırır; servikal postürü korur.',
              en: 'Extend, laterally flex, and rotate the head and cervical spine.',
            },
            innervation: { nerve: 'N. accessorius (CN XI) & Rr. dorsales nn. cervicalium', roots: 'CN XI, C1–C4' },
          },
          {
            id: 'att-suboccipital-ins',
            kind: 'insertio',
            muscleLatin: 'M. semispinalis capitis & Mm. suboccipitales (Rectus capitis post. major/minor, Obliquus sup.)',
            muscleName: { tr: 'Semispinalis kapitis ve Suboksipital ense kasları', en: 'Semispinalis capitis & Suboccipital muscles' },
            musclePartId: 'FJ1538',
            function: {
              tr: 'Başın ince postüral kontrolünü, ekstansiyonunu ve rotasyonunu sağlar.',
              en: 'Provide fine postural control, extension, and rotation of the head at the craniocervical junction.',
            },
            innervation: { nerve: 'N. suboccipitalis (C1 arka dalı) & N. occipitalis major (C2)', roots: 'C1–C2' },
          },
        ],
      },
      {
        id: 'occipitale-condyli-foramen-magnum',
        number: 3,
        latinName: 'Condylus occipitalis, Pars basilaris (Clivus) & Foramen magnum',
        name: { tr: 'Oksipital Kondiller, Baziler Parça ve Foramen Magnum', en: 'Occipital Condyles, Basilar Part & Foramen Magnum' },
        synonyms: ['condylus occipitalis', 'foramen magnum', 'oksipital kondil', 'occipital condyle', 'pars basilaris'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.88, ml: 0.45, ap: 0.35, radius: [0.16, 0.45, 0.40], normalHint: 'inferior' },
        description: {
          tr: 'Medulla oblongata’nın medulla spinalis’e dönüştüğü en büyük kafa tabanı deliği (Foramen magnum) ve iki yanında Atlas (C1) ile başın "evet" (fleksiyon-ekstansiyon) hareketini sağlayan böbrek biçimli Condylus occipitalis’ler.',
          en: 'Large basal opening transmitting the brainstem/spinal cord junction, flanked by kidney-shaped occipital condyles that articulate with C1 (atlas) for head nodding.',
        },
        neurovascularRelation: {
          structureLatin: 'Medulla oblongata, Aa. vertebrales, N. accessorius (CN XI) & Canalis n. hypoglossi (CN XII)',
          note: {
            tr: 'Foramen magnum’dan beyin sapı, vertebral arterler ve spinal aksesuar sinir geçerken; hemen kondilin tabanındaki Canalis nervi hypoglossi’den dilin motor siniri olan N. hypoglossus (CN XII) çıkar.',
            en: 'Transmits the medulla/spinal cord and vertebral arteries, while the hypoglossal canal at the base of each condyle transmits CN XII.',
          },
        },
        attachments: [
          {
            id: 'att-rectus-capitis-ant-lat-ins',
            kind: 'insertio',
            muscleLatin: 'M. longus capitis, M. rectus capitis anterior & lateralis (Pars basilaris / Juguler çıkıntı)',
            muscleName: { tr: 'Derin ön boyun (Prevertebral) kasları', en: 'Deep prevertebral head flexors' },
            musclePartId: 'FJ1582',
            function: {
              tr: 'Atlantooksipital eklemde başa fleksiyon ve yana eğilme yaptırır.',
              en: 'Flex and laterally stabilize the head at the atlanto-occipital joint.',
            },
            innervation: { nerve: 'Plexus cervicalis (C1–C3 ön dalları)', roots: 'C1–C3' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 5. ATLAS — C1 OMURU (FJ3176)
  // ============================================================================
  {
    boneId: 'atlas-c1',
    partIds: ['FJ3176'],
    primaryPartId: 'FJ3176',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Atlas (Vertebra cervicalis I — C1)',
    title: { tr: 'Atlas (C1 — Birinci Servikal Omur)', en: 'Atlas (C1 First Cervical Vertebra)' },
    summary: {
      tr: 'Kafatasını doğrudan taşıyan birinci boyun omurudur; GÖVDESİ (corpus vertebrae) ve SPİNÖZ ÇIKINTISI (processus spinosus) YOKTUR! İki yan kitle (Massa lateralis) ile bunları birleştiren ön ve arka kemerden (Arcus anterior et posterior) oluşan bir yüzük şeklindedir.',
      en: 'Ring-like first cervical vertebra supporting the globe of the skull; uniquely lacks both a vertebral body and a spinous process, consisting of two lateral masses connected by anterior and posterior arches.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Arcus Anterior, Tuberculum Anterius ve Fovea Dentis', en: 'Anterior Arch, Tubercle & Facet for Dens' },
      shaft: { tr: 'Massa Lateralis ve Processus Transversus (Foramen Transversarium)', en: 'Lateral Masses & Transverse Processes' },
      distal: { tr: 'Arcus Posterior ve Sulcus Arteriae Vertebralis', en: 'Posterior Arch & Groove for Vertebral Artery' },
    },
    landmarks: [
      {
        id: 'atlas-arcus-anterior-fovea-dentis',
        number: 1,
        latinName: 'Arcus anterior atlantis, Tuberculum anterius & Fovea dentis',
        name: { tr: 'Ön Kemer, Ön Tüberkül ve Diş Çukuru (Fovea Dentis)', en: 'Anterior Arch, Anterior Tubercle & Facet for Dens' },
        synonyms: ['arcus anterior atlantis', 'fovea dentis', 'tuberculum anterius atlantis'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.45, ml: 0.20, ap: 0.12, radius: [0.30, 0.38, 0.32], normalHint: 'anterior' },
        description: {
          tr: 'Yüzüğün ön duvarını oluşturan kısa kemerdir; ön yüzündeki Tuberculum anterius’a derin boyun fleksörleri tutunurken, arka yüzündeki dairesel Fovea dentis’e C2 omurunun çıkıntısı (Dens axis) oturarak mediyan atlantooksipital pivot eklemi kurar.',
          en: 'Short anterior arch bearing the anterior tubercle externally and the circular facet for the dens of C2 (axis) internally.',
        },
        attachments: [
          {
            id: 'att-longus-colli-rectus-ant-atlas',
            kind: 'insertio',
            muscleLatin: 'M. longus colli (Üst oblik lifler — Insertio) & M. rectus capitis anterior (Origo)',
            muscleName: { tr: 'Longus kolli ve Rektus kapitis anterior kasları', en: 'Longus colli & Rectus capitis anterior muscles' },
            function: {
              tr: 'Boyuna ve atlantooksipital eklemde başa fleksiyon yaptırır, servikal omurgayı önden stabilize eder.',
              en: 'Flex the head and cervical spine and stabilize the craniocervical junction anteriorly.',
            },
            innervation: { nerve: 'Plexus cervicalis & Rr. ventrales (C1–C6)', roots: 'C1–C6' },
          },
        ],
      },
      {
        id: 'atlas-massa-lateralis-transversus',
        number: 2,
        latinName: 'Massa lateralis, Facies articularis superior & Processus transversus (Foramen transversarium)',
        name: { tr: 'Yan Kitleler (Atlantooksipital Eklem) ve Transvers Çıkıntı', en: 'Lateral Masses & Transverse Processes (Foramen Transversarium)' },
        synonyms: ['massa lateralis atlantis', 'foramen transversarium', 'processus transversus atlantis'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.45, ml: 0.88, ap: 0.48, radius: [0.30, 0.35, 0.38], normalHint: 'lateral' },
        description: {
          tr: 'Kafatasının tüm yükünü taşıyan kalın yan sütunlar (üstteki böbrek biçimli çukur yüzler oksipital kondillerle "evet" hareketini yapar) ve içinden A. vertebralis’in yukarı çıktığı Foramen transversarium’u barındıran geniş yan çıkıntılar.',
          en: 'Weight-bearing lateral masses articulating superiorly with the occipital condyles, flanked by wide transverse processes perforated by the foramina transversaria.',
        },
        clinicalNote: {
          tr: 'Kafanın tepesine dikey yük binmesiyle (örn. sığ suya balıklama atlama) oksipital kondillerin Atlas yan kitlelerini kama gibi ayırarak ön ve arka kemeri 4 yerden kırmasına "Jefferson Kırığı" (Patlama / Burst kırığı) denir!',
          en: 'Axial loading on the vertex drives the occipital condyles into the lateral masses, fracturing both the anterior and posterior arches of C1 ("Jefferson burst fracture").',
        },
        attachments: [
          {
            id: 'att-obliquus-sup-inf-levator-atlas',
            kind: 'origo',
            muscleLatin: 'M. obliquus capitis superior, M. rectus capitis lateralis & M. levator scapulae (Origo) / M. obliquus capitis inferior (Insertio)',
            muscleName: { tr: 'Suboksipital oblik kaslar ve Levator skapula (C1 transvers çıkıntı)', en: 'Suboccipital oblique muscles & Levator scapulae' },
            function: {
              tr: 'Atlas transvers çıkıntısını kaldıraç kolu gibi kullanarak başı aynı tarafa döndürür (Obliquus capitis inferior) ve arkaya-yana eğer.',
              en: 'Use the wide C1 transverse process as a lever arm to rotate the atlas on the axis and extend/tilt the head.',
            },
            innervation: { nerve: 'N. suboccipitalis (C1 arka dalı) & N. dorsalis scapulae (C3–C5)', roots: 'C1–C5' },
          },
        ],
      },
      {
        id: 'atlas-arcus-posterior-sulcus-arteriae',
        number: 3,
        latinName: 'Arcus posterior atlantis, Tuberculum posterius & Sulcus arteriae vertebralis',
        name: { tr: 'Arka Kemer, Arka Tüberkül ve Vertebral Arter Oluğu', en: 'Posterior Arch, Posterior Tubercle & Groove for Vertebral Artery' },
        synonyms: ['arcus posterior atlantis', 'sulcus arteriae vertebralis', 'tuberculum posterius atlantis'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.55, ml: 0.30, ap: 0.88, radius: [0.30, 0.42, 0.35], normalHint: 'posterior' },
        description: {
          tr: 'Vertebral forameni arkadan çeviren kemerdir; spinöz çıkıntı yerine ortasında küçük Tuberculum posterius bulunur (başın tam ekstansiyonunu engellememek için!). Üst yüzündeki Sulcus arteriae vertebralis’te A. vertebralis yatay kıvrılarak Foramen magnum’a girer.',
          en: 'Posterior arch bearing a small posterior tubercle (instead of a spinous process) and grooved superiorly by the vertebral artery and C1 nerve.',
        },
        neurovascularRelation: {
          structureLatin: 'A. vertebralis (V3 segmenti) & N. suboccipitalis (C1 dorsal dalı)',
          note: {
            tr: 'Foramen transversarium’dan çıkan A. vertebralis, suboksipital üçgenin tabanında Arcus posterior üzerindeki olukta N. suboccipitalis ile birlikte seyreder.',
            en: 'After exiting the C1 transverse foramen, the vertebral artery courses medially in this groove on the floor of the suboccipital triangle alongside the C1 nerve.',
          },
        },
        attachments: [
          {
            id: 'att-rectus-capitis-post-minor-origo',
            kind: 'origo',
            muscleLatin: 'M. rectus capitis posterior minor (Tuberculum posterius atlantis)',
            muscleName: { tr: 'Rektus kapitis posterior minör kası', en: 'Rectus capitis posterior minor muscle' },
            function: {
              tr: 'Atlantooksipital eklemde başa ekstansiyon yaptırır ve dura mater ile olan miyodural bağlantısıyla BOS dolaşımını/propriosepsiyonu destekler.',
              en: 'Extends the head at the atlanto-occipital joint and provides craniocervical proprioception.',
            },
            innervation: { nerve: 'N. suboccipitalis (C1 arka dalı)', roots: 'C1' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 6. AXIS — C2 OMURU (FJ3177)
  // ============================================================================
  {
    boneId: 'axis-c2',
    partIds: ['FJ3177'],
    primaryPartId: 'FJ3177',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Axis / Epistropheus (Vertebra cervicalis II — C2)',
    title: { tr: 'Axis (C2 — İkinci Servikal Omur)', en: 'Axis (C2 Second Cervical Vertebra)' },
    summary: {
      tr: 'Servikal omurların en sağlam olanıdır; gövdesinden yukarıya doğru diş gibi yükselen Dens axis (Odontoid çıkıntı — embriyolojik olarak C1 gövdesinin C2 ile kaynaşmasıdır) etrafında Atlas ve kafatası sağa-sola ("hayır" hareketi) döner.',
      en: 'Strongest cervical vertebra distinguished by the upward-projecting odontoid process (dens), which acts as the vertical pivot around which the atlas and skull rotate ("no" movement).',
    },
    regionGroupLabels: {
      proximal: { tr: 'Dens Axis (Odontoid Çıkıntı ve Alar Bağlar)', en: 'Dens (Odontoid Process)' },
      shaft: { tr: 'Corpus Axis ve Facies Articularis Superior', en: 'Body & Superior Articular Facets' },
      distal: { tr: 'Processus Spinosus (Çatallı) ve Lamina Arcus', en: 'Bifid Spinous Process & Laminae' },
    },
    landmarks: [
      {
        id: 'axis-dens',
        number: 1,
        latinName: 'Dens axis (Processus odontoideus) & Facies articularis anterior/posterior',
        name: { tr: 'Dens Axis (Odontoid Çıkıntı / Eksen Dişi)', en: 'Dens of Axis (Odontoid Process)' },
        synonyms: ['dens axis', 'processus odontoideus', 'odontoid cikinti', 'dens'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.14, ml: 0.25, ap: 0.22, radius: [0.22, 0.35, 0.35], normalHint: 'superior' },
        description: {
          tr: 'C2 gövdesinden dikey yükselen ~1.5 cm’lik kemik eksendir; ön yüzü Atlas’ın fovea dentis’i ile eklemleşirken arka yüzündeki oluktan onu yerinde tutan en önemli bağ olan Ligamentum transversum atlantis geçer (tepesine ise Lig. apicis dentis ve Ligg. alaria tutunur).',
          en: 'Tooth-like vertical peg articulating anteriorly with the anterior arch of C1 and held in place posteriorly by the transverse ligament of the atlas and alar ligaments.',
        },
        clinicalNote: {
          tr: 'Odontoid kırıkları Anderson & D’Alonzo sınıflamasına göre Tip I (uç), Tip II (taban/boyun — en sık ve avasküler nekroz/kaynamama riski en yüksek!) ve Tip III (gövdeye uzanan) olarak ayrılır. Romatoid artritte transvers bağ gevşerse Dens arkaya kayarak medulla spinalis’i ezer!',
          en: 'Type II fractures at the base/waist of the dens have a high nonunion rate; rupture of the transverse ligament (e.g. in rheumatoid arthritis) causes fatal atlantoaxial subluxation onto the cord.',
        },
        attachments: [],
      },
      {
        id: 'axis-corpus-facies-superior',
        number: 2,
        latinName: 'Corpus axis, Facies articularis superior & Processus transversus',
        name: { tr: 'Axis Gövdesi, Üst Eklem Yüzleri ve Pedikül (Asılan Adam Kırığı Bölgesi)', en: 'Body of Axis, Superior Articular Facets & Pedicles' },
        synonyms: ['corpus axis', 'facies articularis superior axis', 'hangman fracture'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.55, ml: 0.65, ap: 0.32, radius: [0.24, 0.42, 0.38], normalHint: 'anterior' },
        description: {
          tr: 'Dens’in iki yanında omuz gibi duran geniş, hafif dışbükey üst eklem yüzleri (Atlas’ın yan kitlelerini taşır) ve öne doğru C3 üzerine sarkan alt dudaklı gövde.',
          en: 'Broad shoulder-like superior articular facets flanking the dens to bear the weight of C1 and the cranium.',
        },
        clinicalNote: {
          tr: 'Başın ani ve şiddetli hiperekstansiyonunda (trafik kazası veya asılma) C2’nin pars interarticularis / pediküllerinin iki taraflı kırılmasına "Asılan Adam Kırığı" (Hangman’s fracture — travmatik C2 spondilolistezisi) denir.',
          en: 'Forceful hyperextension produces bilateral fractures of the C2 pars interarticularis/pedicles ("Hangman’s fracture" — traumatic spondylolisthesis of C2 on C3).',
        },
        attachments: [
          {
            id: 'att-longus-colli-levator-c2',
            kind: 'origo',
            muscleLatin: 'M. longus colli (Corpus ön yüzü) & M. levator scapulae / M. scalenus medius (Processus transversus)',
            muscleName: { tr: 'Longus kolli, Levator skapula ve Orta skalen kas', en: 'Longus colli, Levator scapulae & Middle scalene' },
            function: {
              tr: 'Servikal omurgaya fleksiyon ve lateral fleksiyon yaptırır; skapulayı yukarı kaldırır.',
              en: 'Flex and laterally bend the cervical spine and elevate the scapula.',
            },
            innervation: { nerve: 'Plexus cervicalis, N. dorsalis scapulae (C3–C5) & Rr. ventrales', roots: 'C2–C6' },
          },
        ],
      },
      {
        id: 'axis-processus-spinosus',
        number: 3,
        latinName: 'Processus spinosus axis (Bifid) & Lamina arcus vertebrae',
        name: { tr: 'Axis Çatallı Spinöz Çıkıntısı (Ense Kaslarının Ana Kavşağı)', en: 'Bifid Spinous Process & Lamina of Axis' },
        synonyms: ['processus spinosus axis', 'axis spinoz cikinti', 'bifid spinous process'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.72, ml: 0.35, ap: 0.88, radius: [0.24, 0.42, 0.38], normalHint: 'posterior' },
        description: {
          tr: 'Kafatasının hemen altında orta hatta palpe edilebilen İLK spinöz çıkıntıdır; çok büyük, kalın ve ucu iki çatallıdır (bifid). Suboksipital üçgenin alt-iç köşesini oluşturur ve 5 çift derin ense kası burada buluşur!',
          en: 'Large, heavy, bifid spinous process — the first spinous process palpable in the midline below the skull and the hub of the suboccipital musculature.',
        },
        attachments: [
          {
            id: 'att-suboccipital-c2-origo',
            kind: 'origo',
            muscleLatin: 'M. rectus capitis posterior major (Oksipital kemiğe) & M. obliquus capitis inferior (Atlas transvers çıkıntısına)',
            muscleName: { tr: 'Rektus kapitis posterior majör ve Oblikuus kapitis inferior (Suboksipital kaslar)', en: 'Rectus capitis posterior major & Obliquus capitis inferior' },
            function: {
              tr: 'Başa ekstansiyon ve C1–C2 ekleminde aynı tarafa (ipsilateral) rotasyon yaptırır.',
              en: 'Extend the head and rotate the atlas (and skull) ipsilaterally on the axis.',
            },
            innervation: { nerve: 'N. suboccipitalis (C1 arka dalı)', roots: 'C1' },
          },
          {
            id: 'att-semispinalis-multifidus-c2-ins',
            kind: 'insertio',
            muscleLatin: 'M. semispinalis cervicis, M. multifidus cervicis & Mm. interspinales cervicis',
            muscleName: { tr: 'Semispinalis servisis ve Multifidus kasları (C2 spinöz çıkıntı stabilizatörleri)', en: 'Semispinalis cervicis & Multifidus muscles' },
            function: {
              tr: 'Suboksipital kaslar başı hareket ettirirken C2 spinöz çıkıntısını alttan güçlüce sabitleyerek boyun lordozunu korur.',
              en: 'Extend the cervical spine and anchor the C2 spinous process as a stable base for the suboccipital muscles.',
            },
            innervation: { nerve: 'Rr. dorsales nn. spinalium cervicalium', roots: 'C2–C7' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 7. VERTEBRAE CERVICALES C3–C7 (Tipik Boyun Omurları ve Vertebra Prominens)
  // ============================================================================
  {
    boneId: 'vertebrae-cervicales',
    partIds: ['FJ3161', 'FJ3164', 'FJ3167', 'FJ3170', 'FJ3172'],
    primaryPartId: 'FJ3167',
    packId: 'head-neck',
    category: 'axial',
    latinName: 'Vertebrae cervicales (C3–C7) & Vertebra prominens (C7)',
    title: { tr: 'Vertebrae Cervicales C3–C7 (Boyun Omurları ve C7 Vertebra Prominens)', en: 'Cervical Vertebrae (C3–C7) & Vertebra Prominens' },
    summary: {
      tr: 'Boyun bölgesinin yüksek hareketliliğini sağlayan C3–C7 omurlarıdır; en belirgin ayırt edici özellikleri tüm servikal omurların transvers çıkıntılarında yer alan Foramen transversarium, gövde üst yanlarındaki Processus uncinatus ve C3–C6’da çatallı (C7’de ise çok uzun ve tek: Vertebra prominens) spinöz çıkıntıdır.',
      en: 'Mobile cervical vertebrae (C3–C7) characterized by transverse foramina, uncinate processes on small rectangular bodies, triangular vertebral foramina, and bifid spinous processes (except C7, vertebra prominens).',
    },
    regionGroupLabels: {
      proximal: { tr: 'Corpus Vertebrae ve Processus Uncinatus (Luschka Eklemi)', en: 'Vertebral Body & Uncinate Processes' },
      shaft: { tr: 'Processus Transversus, Foramen Transversarium ve Skalen Tüberküller', en: 'Transverse Process, Foramen & Scalene Tubercles' },
      distal: { tr: 'Processus Spinosus (C3–C6 Çatallı / C7 Vertebra Prominens)', en: 'Spinous Processes & Articular Pillars' },
    },
    landmarks: [
      {
        id: 'cervicales-corpus-uncinatus',
        number: 1,
        latinName: 'Corpus vertebrae cervicalis & Processus uncinatus (Uncus corporis)',
        name: { tr: 'Boyun Omuru Gövdesi ve Unsinat Çıkıntılar (Luschka Eklemi)', en: 'Cervical Vertebral Body & Uncinate Processes (Joints of Luschka)' },
        synonyms: ['corpus vertebrae cervicalis', 'processus uncinatus', 'uncus corporis', 'luschka eklemi'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.35, ml: 0.35, ap: 0.18, radius: [0.26, 0.42, 0.35], normalHint: 'anterior' },
        description: {
          tr: 'Enine geniş, küçük dikdörtgen omur gövdesi ve üst yüzünün yan kenarlarından yukarı yükselen dudak biçimli Processus uncinatus (Uncus); bir üst omurla "Uncovertebral (Luschka) Eklemi"ni kurarak servikal disklerin yanlara fıtıklaşmasını engeller.',
          en: 'Small, transversely wide body with upturned lateral lips (uncinate processes) that form the uncovertebral joints of Luschka.',
        },
        clinicalNote: {
          tr: 'Servikal spondilozda Luschka eklemlerinde gelişen kemik mahmuzları (osteofitler), hemen arkasındaki Foramen intervertebrale’yi daraltarak servikal spinal sinir köküne (radikülopati) veya yanındaki A. vertebralis’e bası yapabilir!',
          en: 'Osteophytes of the uncovertebral joints of Luschka encroach directly on the intervertebral foramen (causing cervical radiculopathy) or the adjacent vertebral artery.',
        },
        attachments: [
          {
            id: 'att-longus-colli-capitis-cervical',
            kind: 'origo',
            muscleLatin: 'M. longus colli (C3–C7 gövde ön yüzü — Origo/Insertio) & M. longus capitis',
            muscleName: { tr: 'Longus kolli ve Longus kapitis (Prevertebral boyun fleksörleri)', en: 'Longus colli and Longus capitis muscles' },
            function: {
              tr: 'Boyun omurgasına fleksiyon ve hafif rotasyon yaptırır; kamçı (whiplash) yaralanmalarına karşı ön stabilizasyon sağlar.',
              en: 'Flex and stabilize the cervical spine anteriorly.',
            },
            innervation: { nerve: 'Rr. ventrales nn. cervicalium (C2–C6)', roots: 'C2–C6' },
          },
        ],
      },
      {
        id: 'cervicales-transversus-foramen-chassaignac',
        number: 2,
        latinName: 'Processus transversus, Foramen transversarium & Tuberculum anterius/posterius (C6 Chassaignac)',
        name: { tr: 'Transvers Çıkıntı, Foramen Transversarium ve Karotis (Chassaignac) Tüberkülü', en: 'Transverse Process, Transverse Foramen & Carotid Tubercle (C6)' },
        synonyms: ['foramen transversarium', 'tuberculum caroticum', 'chassaignac', 'sulcus nervi spinalis'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.50, ml: 0.85, ap: 0.45, radius: [0.26, 0.38, 0.38], normalHint: 'lateral' },
        description: {
          tr: 'Servikal omurları diğer tüm omurlardan kesin olarak ayıran Foramen transversarium ve ucundaki Ön/Arka Tüberküller (aralarındaki Sulcus nervi spinalis’ten spinal sinir kökü çıkar). C6’nın büyük ön tüberkülüne Tuberculum caroticum (Chassaignac tüberkülü) denir.',
          en: 'Diagnostic transverse foramen and anterior/posterior tubercles separated by the groove for the spinal nerve; the prominent C6 anterior tubercle is the carotid (Chassaignac) tubercle.',
        },
        neurovascularRelation: {
          structureLatin: 'A. vertebralis (C6–C1 Foramen transversarium) & A. carotis communis (C6 önünde)',
          note: {
            tr: 'ÖNEMLİ KLİNİK KURAL: A. vertebralis C7’nin deliğinden GEÇMEZ (yalnızca V. vertebralis geçer), C6’dan girip C1’e kadar yükselir! C6 Chassaignac tüberkülü önünde A. carotis communis kemiğe bastırılarak komprese edilebilir.',
            en: 'The vertebral artery enters at C6 (NOT C7, which transmits only the accessory vertebral vein) and ascends through C6–C1; the common carotid artery can be compressed against the C6 carotid tubercle.',
          },
        },
        attachments: [
          {
            id: 'att-scalenes-levator-cervical-origo',
            kind: 'origo',
            muscleLatin: 'M. scalenus anterior (C3–C6 Ön tüberkül) & M. scalenus medius/posterior, M. levator scapulae, M. splenius cervicis (Arka tüberkül)',
            muscleName: { tr: 'Skalen kaslar (Ön, Orta, Arka) ve Levator skapula', en: 'Anterior, Middle & Posterior Scalenes and Levator scapulae' },
            musclePartId: 'FJ1592',
            function: {
              tr: 'Kaburgalar sabitken boynu öne ve yana eğer; boyun sabitken 1. ve 2. kaburgayı yukarı çekerek zorlu inspirasyona yardım eder (ön ve orta skalen arasından Plexus brachialis ve A. subclavia geçer!).',
              en: 'Flex and laterally bend the neck, or elevate the 1st and 2nd ribs as accessory muscles of inspiration (bounding the interscalene triangle).',
            },
            innervation: { nerve: 'Rr. ventrales nn. cervicalium (C3–C8) & N. dorsalis scapulae', roots: 'C3–C8' },
          },
        ],
      },
      {
        id: 'cervicales-spinosus-prominens',
        number: 3,
        latinName: 'Processus spinosus (C3–C6 Bifidus / C7 Vertebra prominens) & Processus articulares',
        name: { tr: 'Spinöz Çıkıntılar (C3–C6 Çatallı / C7 Vertebra Prominens) ve Faset Eklemler', en: 'Spinous Processes (Bifid C3–C6 / C7 Vertebra Prominens) & Facets' },
        synonyms: ['vertebra prominens', 'processus spinosus cervicalis', 'c7 omuru'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.65, ml: 0.40, ap: 0.88, radius: [0.26, 0.42, 0.38], normalHint: 'posterior' },
        description: {
          tr: 'C3–C6’da kısa ve iki çatallı (bifid) olan, C7’de ise çatalsız, çok uzun ve boyun kökünde deri altında en belirgin tümsek olarak hissedilen Processus spinosus (Vertebra prominens — omur sayımda temel referans noktası!).',
          en: 'Short bifid spinous processes in C3–C6 transitioning to the long, non-bifid, subcutaneous spinous process of C7 (vertebra prominens, landmark for counting vertebrae).',
        },
        attachments: [
          {
            id: 'att-trapezius-rhomboid-splenius-nuchae-origo',
            kind: 'origo',
            muscleLatin: 'M. trapezius (Lig. nuchae & C7), M. rhomboideus minor (C7–T1), M. serratus posterior superior & M. splenius capitis / M. semispinalis',
            muscleName: { tr: 'Trapezius, Romboideus minör, Splenius kapitis ve Derin ekstansörler', en: 'Trapezius, Rhomboid minor, Splenius capitis & Semispinalis' },
            musclePartId: 'FJ1521',
            function: {
              tr: 'Skapulayı retrakte ve eleve eder; başa ve boyuna ekstansiyon/rotasyon yaptırır.',
              en: 'Retract and elevate the scapula while extending and rotating the head and neck.',
            },
            innervation: { nerve: 'N. accessorius (CN XI), N. dorsalis scapulae (C4–C5) & Rr. dorsales', roots: 'CN XI, C3–C8' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 8. VERTEBRAE THORACICAE T1–T12 (Göğüs / Sırt Omurları)
  // ============================================================================
  {
    boneId: 'vertebrae-thoracicae',
    partIds: [
      'FJ3158', 'FJ3160', 'FJ3163', 'FJ3166', 'FJ3169', 'FJ3171',
      'FJ3173', 'FJ3174', 'FJ3175', 'FJ3154', 'FJ3155', 'FJ3156',
    ],
    primaryPartId: 'FJ3171',
    packId: 'back',
    category: 'axial',
    latinName: 'Vertebrae thoracicae (T1–T12)',
    title: { tr: 'Vertebrae Thoracicae T1–T12 (Sırt / Göğüs Omurları)', en: 'Thoracic Vertebrae (T1–T12)' },
    summary: {
      tr: '12 çift kaburga (Costae) ile eklem yaparak göğüs kafesinin arka sütununu oluşturan omurlardır; kalp biçimli gövdelerindeki Fovea costalis’ler, transvers çıkıntılarındaki kostal fasetler, yuvarlak vertebral foramen ve aşağıya kiremit gibi eğimli uzun spinöz çıkıntılarıyla tanınır.',
      en: '12 thoracic vertebrae forming the posterior pillar of the rib cage, distinguished by heart-shaped bodies with costal demifacets, costal facets on the transverse processes, and long, steeply sloping spinous processes.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Corpus Vertebrae ve Fovea Costalis Superior/Inferior', en: 'Heart-Shaped Body & Costal Demifacets' },
      shaft: { tr: 'Processus Transversus ve Fovea Costalis Processus Transversi', en: 'Transverse Process & Costotransverse Facet' },
      distal: { tr: 'Processus Spinosus ve Koronal Faset Eklemler', en: 'Sloping Spinous Process & Coronal Facets' },
    },
    landmarks: [
      {
        id: 'thoracicae-corpus-foveae-costales',
        number: 1,
        latinName: 'Corpus vertebrae thoracicae & Fovea costalis superior et inferior',
        name: { tr: 'Kalp Biçimli Omur Gövdesi ve Kaburga Başı Eklem Yüzleri (Kostovertebral Eklem)', en: 'Thoracic Vertebral Body & Superior/Inferior Costal Facets' },
        synonyms: ['corpus vertebrae thoracicae', 'fovea costalis superior', 'fovea costalis inferior'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.40, ml: 0.35, ap: 0.22, radius: [0.26, 0.42, 0.38], normalHint: 'anterior' },
        description: {
          tr: 'Üstten bakıldığında kalp biçiminde olan ve yukarıdan aşağıya (T1’den T12’ye) giderek büyüyen omur gövdesi; arka-yan kenarlarında kaburga başlarıyla (Caput costae) eklem yapan yarım ay biçimli üst ve alt Fovea costalis’ler bulunur (T1, T10, T11 ve T12 kendi kaburgaları için tam faset taşır!).',
          en: 'Heart-shaped body bearing posterolateral superior and inferior costal demifacets for the heads of the ribs (T1, T10, T11, and T12 bear full facets).',
        },
        attachments: [
          {
            id: 'att-longus-colli-psoas-t12',
            kind: 'origo',
            muscleLatin: 'M. longus colli (T1–T3 ön yüzü) & M. psoas major (T12 alt-yan yüzü)',
            muscleName: { tr: 'Longus kolli (Üst torakal) ve Psoas majör (T12 başlangıcı)', en: 'Longus colli (T1–T3) & Psoas major (T12 origin)' },
            musclePartId: 'FJ1431',
            function: {
              tr: 'T1–T3 servikal fleksiyona katılırken, T12 gövdesinden başlayan Psoas major uyluğun en güçlü fleksörü olarak görev yapar.',
              en: 'Longus colli flexes the cervicothoracic spine; psoas major originating from T12–L5 flexes the hip.',
            },
            innervation: { nerve: 'Rr. ventrales (C2–C6 & Plexus lumbalis L1–L3)', roots: 'C2–C6, L1–L3' },
          },
        ],
      },
      {
        id: 'thoracicae-transversus-fovea',
        number: 2,
        latinName: 'Processus transversus & Fovea costalis processus transversi',
        name: { tr: 'Transvers Çıkıntı ve Kostotransvers Eklem Yüzü', en: 'Transverse Process & Costotransverse Articular Facet' },
        synonyms: ['fovea costalis processus transversi', 'processus transversus thoracicae'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.29, ml: 0.75, ap: 0.72, radius: [0.26, 0.38, 0.38], normalHint: 'lateral' },
        description: {
          tr: 'Pedikül-lamina birleşiminden arkaya ve dışa uzanan kalın çıkıntılardır; T1–T10 omurlarının transvers çıkıntı uçlarının ön yüzünde, kendi numarasındaki kaburganın tüberkülü (Tuberculum costae) ile eklem yapan Fovea costalis processus transversi bulunur (yüzen kaburgalar olan T11 ve T12’de bu eklem yüzü YOKTUR!).',
          en: 'Clubbed posterolateral processes bearing an anterior oval facet in T1–T10 for the tubercle of the corresponding rib (absent on T11 and T12).',
        },
        attachments: [
          {
            id: 'att-levatores-costarum-transversospinales',
            kind: 'origo',
            muscleLatin: 'Mm. levatores costarum (Origo) & Mm. transversospinales (M. semispinalis, M. multifidus, Mm. rotatores — Origo) / M. longissimus thoracis (Insertio)',
            muscleName: { tr: 'Kaburga kaldırıcı kaslar (Levatores costarum), Transversospinal kaslar ve Longissimus', en: 'Levatores costarum, Transversospinales & Longissimus thoracis' },
            function: {
              tr: 'Kaburgaları kaldırarak inspirasyona yardım eder, torakal omurgaya ekstansiyon ve karşı tarafa rotasyon yaptırır.',
              en: 'Elevate the ribs in inspiration and extend/contralaterally rotate the thoracic vertebral column.',
            },
            innervation: { nerve: 'Rr. dorsales nn. spinalium thoracicarum', roots: 'T1–T12' },
          },
        ],
      },
      {
        id: 'thoracicae-spinosus-articulares',
        number: 3,
        latinName: 'Processus spinosus & Processus articulares (Koronal Düzlem)',
        name: { tr: 'Kiremitvari Uzun Spinöz Çıkıntı ve Koronal Faset Eklemler', en: 'Long Overlapping Spinous Process & Coronal Articular Facets' },
        synonyms: ['processus spinosus thoracicae', 'torakal spinoz cikinti'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.75, ml: 0.35, ap: 0.88, radius: [0.26, 0.42, 0.38], normalHint: 'posterior' },
        description: {
          tr: 'Özellikle T5–T8 arasında çok uzun olup aşağıya doğru dik açıya yakın eğimle inerek bir alt omurun spinöz çıkıntısını kiremit gibi örten çıkıntıdır (hiperekstansiyonu kemiksel olarak sınırlar). Eklem yüzleri (fasetler) koronal düzleme yakın olduğu için torakal bölgede ROTASYON serbesttir, fleksiyon ise göğüs kafesi tarafından kısıtlanır.',
          en: 'Long, steeply downward-sloping spinous process overlapping the vertebra below like roof tiles; coronally oriented articular facets permit axial rotation while limiting flexion.',
        },
        attachments: [
          {
            id: 'att-trapezius-latissimus-rhomboid-thoracic-origo',
            kind: 'origo',
            muscleLatin: 'M. trapezius (T1–T12), M. latissimus dorsi (T7–T12), M. rhomboideus major (T2–T5), M. rhomboideus minor (C7–T1) & Mm. serratus posterior sup./inf.',
            muscleName: { tr: 'Yüzeyel sırt kasları (Trapezius, Latissimus dorsi, Romboidler) ve Serratus posteriorlar', en: 'Superficial back muscles (Trapezius, Latissimus dorsi, Rhomboids) & Serratus posterior' },
            musclePartId: 'FJ1521',
            function: {
              tr: 'Üst ekstremiteyi ve skapulayı omurgaya bağlayarak omuz kuşağı retraksiyonu/depresyonu ve kolun güçlü adduksiyon/ekstansiyonunu sağlar.',
              en: 'Anchor the shoulder girdle and upper limb to the axial spine for scapular retraction and powerful humeral adduction/extension.',
            },
            innervation: { nerve: 'N. accessorius (CN XI), N. thoracodorsalis (C6–C8) & N. dorsalis scapulae (C4–C5)', roots: 'CN XI, C4–C8' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 9. VERTEBRAE LUMBALES L1–L5 (Bel Omurları)
  // ============================================================================
  {
    boneId: 'vertebrae-lumbales',
    partIds: ['FJ3157', 'FJ3159', 'FJ3162', 'FJ3165', 'FJ3168'],
    primaryPartId: 'FJ3162',
    packId: 'back',
    category: 'axial',
    latinName: 'Vertebrae lumbales (L1–L5)',
    title: { tr: 'Vertebrae Lumbales L1–L5 (Bel Omurları)', en: 'Lumbar Vertebrae (L1–L5)' },
    summary: {
      tr: 'Üst gövdenin tüm ağırlığını taşıyan hareketli omurganın en büyük ve en kalın 5 omurudur; böbrek biçimli devasa gövdesi, Foramen transversarium veya kostal faset içermemesi, sagital düzlemdeki eklem yüzleri ve dörtgen (balta biçimli) spinöz çıkıntısıyla tanınır.',
      en: 'Five massive weight-bearing vertebrae of the lower back featuring kidney-shaped bodies, costal (transverse) processes, mammillary processes, sagittal articular facets, and hatchet-shaped spinous processes.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Corpus Vertebrae Lumbalis (Böbrek Biçimli Gövde — Psoas & Diyafram)', en: 'Kidney-Shaped Body (Psoas & Diaphragmatic Crura)' },
      shaft: { tr: 'Processus Costarius (Transversus) ve Processus Mamillaris', en: 'Costal (Transverse) & Mammillary Processes' },
      distal: { tr: 'Processus Spinosus (Balta Biçimli), Lamina ve Pars Interarticularis', en: 'Hatchet-Shaped Spinous Process & Lamina' },
    },
    landmarks: [
      {
        id: 'lumbales-corpus',
        number: 1,
        latinName: 'Corpus vertebrae lumbalis',
        name: { tr: 'Bel Omuru Gövdesi (Psoas Majör ve Diyafram Krusları Origosu)', en: 'Lumbar Vertebral Body' },
        synonyms: ['corpus vertebrae lumbalis', 'lomber omur govdesi', 'lumbar vertebral body'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.42, ml: 0.35, ap: 0.20, radius: [0.28, 0.45, 0.38], normalHint: 'anterior' },
        description: {
          tr: 'Üstten bakıldığında böbrek (fasulye) biçiminde olan çok geniş ve yüksek kemik gövdedir; L5 omur gövdesi önde arkaya göre daha yüksek (kama biçimli) olup sakrumla birleşerek lumbosakral açıyı ve fizyolojik bel lordozunu oluşturur.',
          en: 'Massive kidney-shaped vertebral body; the wedge-shaped L5 body (taller anteriorly than posteriorly) creates the lumbosacral angle.',
        },
        attachments: [
          {
            id: 'att-psoas-major-minor-lumbar-origo',
            kind: 'origo',
            muscleLatin: 'M. psoas major (T12–L5 gövde yan yüzleri ve diskler) & M. psoas minor (T12–L1)',
            muscleName: { tr: 'Psoas majör ve Psoas minör kasları', en: 'Psoas major and Psoas minor muscles' },
            musclePartId: 'FJ1431',
            function: {
              tr: 'İliacus ile birleşerek (İliopsoas) kalça ekleminin en güçlü fleksörü olur; alt ekstremite sabitken gövdeyi öne kaldırır (mekik çekme) ve bel lordozunu artırır.',
              en: 'Joins iliacus to form the iliopsoas, the primary flexor of the hip and trunk.',
            },
            innervation: { nerve: 'Plexus lumbalis (Rr. ventrales L1–L3)', roots: 'L1–L3' },
          },
          {
            id: 'att-diaphragm-crura-origo',
            kind: 'origo',
            muscleLatin: 'Diaphragma — Pars lumbalis (Crus dextrum L1–L3 & Crus sinistrum L1–L2)',
            muscleName: { tr: 'Diyafram sağ ve sol krusları (Bel bacakları)', en: 'Right and Left Crura of the Diaphragm' },
            musclePartId: 'FJ3131',
            function: {
              tr: 'Solunumun ana kası olan diyaframı lomber omurgaya demirler; sağ ve sol krusların birleşmesiyle oluşan Lig. arcuatum medianum altından Aorta (T12), sağ krus lifleri arasından ise Özofagus (T10) geçer!',
              en: 'Anchor the diaphragm to the lumbar spine; form the aortic hiatus (T12) and esophageal sling (T10).',
            },
            innervation: { nerve: 'N. phrenicus (C3–C5)', roots: 'C3–C5' },
          },
        ],
      },
      {
        id: 'lumbales-costarius-mamillaris',
        number: 2,
        latinName: 'Processus costarius (Transversus), Processus accessorius & Processus mamillaris',
        name: { tr: 'Kostal (Transvers) Çıkıntı, Aksesuar ve Mamiller Çıkıntılar', en: 'Costal (Transverse), Accessory & Mammillary Processes' },
        synonyms: ['processus costarius', 'processus mamillaris', 'processus accessorius'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.48, ml: 0.85, ap: 0.58, radius: [0.26, 0.38, 0.38], normalHint: 'lateral' },
        description: {
          tr: 'Embriyolojik kaburga kalıntısı olan uzun, yassı yan çıkıntı (Processus costarius), kökünün arkasındaki küçük Processus accessorius ve üst eklem çıkıntısının (Processus articularis superior) arka kenarındaki meme biçimli Processus mamillaris.',
          en: 'Long, flat costal (transverse) processes representing fused lumbar ribs, and the rounded mammillary processes on the posterior margins of the superior articular processes.',
        },
        attachments: [
          {
            id: 'att-quadratus-lumborum-psoas-costarius',
            kind: 'origo',
            muscleLatin: 'M. quadratus lumborum (L1–L4 Processus costarius — Insertio/Origo), M. psoas major (Derin yaprak) & M. multifidus / Mm. intertransversarii (Processus mamillaris)',
            muscleName: { tr: 'Kuadratus lumborum, Psoas majör ve Multifidus (Mamiller çıkıntı)', en: 'Quadratus lumborum, Psoas major & Multifidus' },
            function: {
              tr: 'Quadratus lumborum gövdeyi yana eğer (lateral fleksiyon) ve pelvisi sabitler; Processus mamillaris’e tutunan Multifidus lomber segmentleri tek tek stabilize eder.',
              en: 'Quadratus lumborum laterally flexes the lumbar spine and fixes the 12th rib; multifidus stabilizes individual lumbar motion segments.',
            },
            innervation: { nerve: 'QL: T12–L4 ön dalları; Multifidus: Rr. dorsales nn. lumbalium', roots: 'T12–L5' },
          },
        ],
      },
      {
        id: 'lumbales-spinosus-lamina-pars',
        number: 3,
        latinName: 'Processus spinosus, Lamina & Pars interarticularis',
        name: { tr: 'Balta Biçimli Spinöz Çıkıntı, Lamina (LP Aralığı) ve Pars İnterartikülaris', en: 'Hatchet-Shaped Spinous Process, Lamina & Pars Interarticularis' },
        synonyms: ['processus spinosus lumbalis', 'pars interarticularis', 'spondilolizis', 'spondilolistezis'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.62, ml: 0.35, ap: 0.88, radius: [0.26, 0.42, 0.38], normalHint: 'posterior' },
        description: {
          tr: 'Arkaya doğru yatay uzanan kısa, kalın, dörtgen (balta ağzı biçimli) Processus spinosus; torakal omurların aksine aşağı sarkmadığı için L3–L4 ve L4–L5 laminaları arasında geniş bir açıklık bırakır (Lomber Ponksiyon / LP ve spinal anestezi giriş yeri!). Üst ve alt eklem çıkıntıları arasındaki dar kemik köprüye Pars interarticularis denir.',
          en: 'Short, sturdy, horizontal hatchet-shaped spinous process leaving wide interlaminar spaces at L3–L4 and L4–L5 (site for lumbar puncture), and the pars interarticularis between the sagittal facet joints.',
        },
        clinicalNote: {
          tr: 'Genellikle L5 omurunun Pars interarticularis bölgesindeki stres kırığına "Spondilolizis" (eğik röntgende "İskoç köpeğinin boyun tasması / boynu kırığı" görünümü), omur gövdesinin S1 üzerinde öne kaymasına ise "Spondilolistezis" (bel kayması) denir!',
          en: 'Stress fracture of the pars interarticularis (most commonly at L5, "Scotty dog collar" defect on oblique X-ray) is Spondylolysis; anterior slippage of the vertebra is Spondylolisthesis.',
        },
        attachments: [
          {
            id: 'att-erector-spinae-thoracolumbar-fascia',
            kind: 'origo',
            muscleLatin: 'M. erector spinae (M. spinalis, M. longissimus, M. iliocostalis), M. multifidus & Fascia thoracolumbalis',
            muscleName: { tr: 'Erektör spina, Multifidus ve Torakolomber fasya', en: 'Erector spinae, Multifidus & Thoracolumbar fascia' },
            function: {
              tr: 'Bel omurgasının en güçlü ekstansörleridir; öne eğilip doğrulma sırasında eksantrik ve konsantrik kasılarak gövdeyi kontrol eder.',
              en: 'Powerfully extend the lumbar spine and control forward flexion eccentrically.',
            },
            innervation: { nerve: 'Rr. dorsales nn. spinalium lumbalium', roots: 'L1–L5' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 10. DISCI INTERVERTEBRALES C2–S1 (Omurlar Arası Diskler)
  // ============================================================================
  {
    boneId: 'disci-intervertebrales',
    partIds: [
      'FJ3202', 'FJ3203', 'FJ3204', 'FJ3205', 'FJ3206', 'FJ3207', 'FJ3208', 'FJ3209',
      'FJ3210', 'FJ3211', 'FJ3212', 'FJ3213', 'FJ3214', 'FJ3215', 'FJ3216', 'FJ3217',
      'FJ3218', 'FJ3219', 'FJ3220', 'FJ3221', 'FJ3222', 'FJ3223', 'FJ3224',
    ],
    primaryPartId: 'FJ3216',
    packId: 'back',
    category: 'axial',
    latinName: 'Disci intervertebrales (C2/C3 – L5/S1)',
    title: { tr: 'Disci Intervertebrales (İntervertebral Diskler C2–S1)', en: 'Intervertebral Discs (C2–S1)' },
    summary: {
      tr: 'C2–C3’ten L5–S1’e kadar komşu omur gövdeleri arasında yer alan (C1–C2 arasında disk YOKTUR!) 23 adet sekonder kartilaginöz eklem (symphysis) diskidir; omurga uzunluğunun ~1/4’ünü oluşturur ve eksenel yükleri hidrolik amortisör gibi dağıtır.',
      en: '23 fibrocartilaginous symphyseal discs between adjacent vertebral bodies from C2–C3 to L5–S1 (absent between C1 and C2), accounting for ~25% of spinal column length and acting as hydraulic shock absorbers.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Anulus Fibrosus (Ön-Yan Konsantrik Kollajen Halkalar)', en: 'Anulus Fibrosus (Outer Concentric Rings)' },
      shaft: { tr: 'Nucleus Pulposus (Jelatinöz Çekirdek — Notokord Kalıntısı)', en: 'Nucleus Pulposus (Gelatinous Core)' },
      distal: { tr: 'Posterolateral Köşe ve Disk Herniasyonu (Bel/Boyun Fıtığı) Bölgesi', en: 'Posterolateral Corner & Herniation Zone' },
    },
    landmarks: [
      {
        id: 'disci-anulus-fibrosus',
        number: 1,
        latinName: 'Anulus fibrosus & Ligamentum longitudinale anterius',
        name: { tr: 'Anulus Fibrosus (Dış Fibröz Halka) ve Ön Longitudinal Bağ / Psoas Tutunması', en: 'Anulus Fibrosus & Anterior Longitudinal Ligament' },
        synonyms: ['anulus fibrosus', 'discus intervertebralis', 'intervertebral disk'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.45, ml: 0.65, ap: 0.22, radius: [0.32, 0.45, 0.38], normalHint: 'anterior' },
        description: {
          tr: 'Birbirini ~30°–60° eğik açılarla çaprazlayan konsantrik Tip I ve Tip II kollajen/fibrokartilaj lamellerden oluşan sağlam dış halkadır; önde çok geniş olan Ligamentum longitudinale anterius (ALL) ile sıkıca desteklenir.',
          en: 'Tough outer ring of obliquely crossing concentric fibrocartilaginous lamellae reinforced anteriorly by the broad anterior longitudinal ligament.',
        },
        attachments: [
          {
            id: 'att-psoas-major-disc-origo',
            kind: 'origo',
            muscleLatin: 'M. psoas major (T12–L5 intervertebral disklerin yan yüzleri ve tendinöz kemerler)',
            muscleName: { tr: 'Psoas majör kası (Disk tutunmaları)', en: 'Psoas major muscle (Intervertebral disc origins)' },
            musclePartId: 'FJ1431',
            function: {
              tr: 'Psoas major yalnızca lomber omur gövdelerinden değil, doğrudan T12–L5 intervertebral disklerinin anulus fibrosus yan yüzlerinden de başlar; kalçaya fleksiyon yaptırır ve lomber sütunu stabilize eder.',
              en: 'Originates directly from the lateral aspects of the T12–L5 intervertebral discs as well as the vertebral bodies to flex the hip and stabilize the lumbar spine.',
            },
            innervation: { nerve: 'Plexus lumbalis (L1–L3)', roots: 'L1–L3' },
          },
        ],
      },
      {
        id: 'disci-nucleus-pulposus',
        number: 2,
        latinName: 'Nucleus pulposus (Chorda dorsalis / Notokord kalıntısı)',
        name: { tr: 'Nucleus Pulposus (Jelatinöz Çekirdek ve Hidrolik Şok Emici)', en: 'Nucleus Pulposus (Gelatinous Core)' },
        synonyms: ['nucleus pulposus', 'nukleus pulpozus', 'notokord'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.50, ml: 0.25, ap: 0.52, radius: [0.32, 0.42, 0.38], normalHint: 'superior' },
        description: {
          tr: 'Embriyonik Notokordun (Chorda dorsalis) erişkindeki tek kalıntısı olan, %80–85 su ve proteoglikan içeren avasküler jelatinöz merkezdir; gündüz dikey yük altında suyunu kaybederek akşamları boyumuzun ~1–2 cm kısalmasına, gece yatınca tekrar su çekerek uzamasına neden olur.',
          en: 'Avascular, proteoglycan-rich gelatinous remnant of the embryonic notochord that distributes compressive loads hydraulically in all directions.',
        },
        attachments: [],
      },
      {
        id: 'disci-posterolateral-herniation',
        number: 3,
        latinName: 'Pars posterolateralis disci & Ligamentum longitudinale posterius',
        name: { tr: 'Posterolateral Disk Köşesi (Bel ve Boyun Fıtığı / Sinir Kökü Basısı Bölgesi)', en: 'Posterolateral Disc Zone & Posterior Longitudinal Ligament' },
        synonyms: ['disk hernisi', 'bel fitigi', 'boyun fitigi', 'ligamentum longitudinale posterius'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        zone: { si: 0.55, ml: 0.75, ap: 0.85, radius: [0.32, 0.42, 0.38], normalHint: 'posterior' },
        description: {
          tr: 'Anulus fibrosus’un en ince olduğu ve arkadaki dar Ligamentum longitudinale posterius (PLL) tarafından örtülmeyen arka-yan (posterolateral / parasantral) köşedir.',
          en: 'Posterolateral aspect of the disc where the anulus fibrosus is thinnest and unreinforced by the narrow posterior longitudinal ligament.',
        },
        neurovascularRelation: {
          structureLatin: 'Radices nervorum spinalium (Örn. L4/L5 diski → L5 kökü; L5/S1 diski → S1 kökü!)',
          note: {
            tr: 'ALTIN KLİNİK KURAL: Bel fıtıklarının %90’ı L4–L5 ve L5–S1’de posterolateral yönde gelişir! Lomber sinir kökü kendi numaralı omurunun pedikülü altından (foramenin üst kısmından) erken çıktığı için, posterolateral fıtık BİR ALTTAKİ (traversing) sinir kökünü ezer (L4–L5 fıtığı → L5 kökünü; L5–S1 fıtığı → S1 kökünü sıkıştırır!). Servikalde ise C5–C6 fıtığı → C6 kökünü sıkıştırır.',
            en: 'Because lumbar nerve roots exit high in the intervertebral foramen beneath the pedicle of the same-numbered vertebra, a posterolateral disc herniation compresses the LOWER (traversing) nerve root (L4–L5 disc → L5 root; L5–S1 disc → S1 root).',
          },
        },
        attachments: [],
      },
    ],
  },

  // ============================================================================
  // 11. COSTAE I ET II (Birinci ve İkinci Atipik Kaburgalar)
  // ============================================================================
  {
    boneId: 'costae-1-2',
    partIds: ['FJ3334', 'FJ3228', 'FJ3336', 'FJ3229'],
    primaryPartId: 'FJ3334',
    packId: 'thorax',
    category: 'axial',
    latinName: 'Costa prima (I) & Costa secunda (II)',
    title: { tr: 'Costa I ve II (Birinci ve İkinci Atipik Kaburgalar)', en: 'First and Second Ribs (Atypical Ribs I & II)' },
    summary: {
      tr: 'Göğüs kafesinin üst açıklığını (Apertura thoracis superior) sınırlayan en kısa, en geniş ve en keskin kavisli kaburgalardır; tipik kaburgaların aksine yüzeyleri dışa-içe değil YUKARI ve AŞAĞI bakar ve üst yüzlerinde boyundan kola geçen ana damar-sinir paketinin (A./V. subclavia ve Plexus brachialis) oluklarını taşır!',
      en: 'Broad, sharply curved atypical superior ribs bounding the thoracic inlet; their flat surfaces face superiorly and inferiorly, grooved by the subclavian vessels and brachial plexus.',
    },
    regionGroupLabels: {
      proximal: { tr: 'Caput, Collum ve Tuberculum Costae I (Vertebral Uç)', en: 'Head, Neck & Tubercle of 1st Rib' },
      shaft: { tr: 'Tuberculum M. Scaleni Anterioris (Lisfranc) ve Subklavyen Oluklar', en: 'Scalene Tubercle (Lisfranc) & Subclavian Grooves' },
      distal: { tr: 'Costa II ve Tuberositas Musculi Serrati Anterioris', en: 'Second Rib & Serratus Anterior Tuberosity' },
    },
    landmarks: [
      {
        id: 'costa1-caput-collum',
        number: 1,
        latinName: 'Caput, Collum & Tuberculum costae I (Sulcus m. scaleni medii)',
        name: { tr: '1. Kaburga Başı, Boynu ve Orta Skalen Tutunma Alanı', en: 'Head, Neck & Middle Scalene Impression of 1st Rib' },
        synonyms: ['caput costae primae', 'collum costae primae', '1. kaburga'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.11, ml: 0.18, ap: 0.92, radius: [0.26, 0.38, 0.38], normalHint: 'posterior' },
        description: {
          tr: 'Yalnızca T1 omur gövdesiyle eklem yapan tek fasetli küçük baş (Caput costae I), boyun (Collum — önünden sempatik Ganglion stellatum, T1 kökü ve A. intercostalis suprema geçer!) ve üst yüzün arka yarısındaki M. scalenus medius tutunma alanı.',
          en: 'Single-faceted head articulating solely with T1, slender neck crossed anteriorly by the stellate ganglion and T1 root, and posterior groove for the middle scalene.',
        },
        attachments: [
          {
            id: 'att-scalenus-medius-costa1-ins',
            kind: 'insertio',
            muscleLatin: 'M. scalenus medius (1. Kaburga üst yüzü, A. subclavia oluğunun hemen arkası)',
            muscleName: { tr: 'Orta skalen kası (En büyük skalen kas)', en: 'Middle scalene muscle' },
            musclePartId: 'FJ1593',
            function: {
              tr: 'Boyuna lateral fleksiyon yaptırır ve zorlu inspirasyonda 1. kaburgayı yukarı kaldırır.',
              en: 'Laterally flexes the cervical spine and elevates the 1st rib during forced inspiration.',
            },
            innervation: { nerve: 'Rr. ventrales nn. cervicalium (C3–C8)', roots: 'C3–C8' },
          },
        ],
      },
      {
        id: 'costa1-lisfranc-sulci',
        number: 2,
        latinName: 'Tuberculum musculi scaleni anterioris (Lisfranc) & Sulcus arteriae/venae subclaviae',
        name: { tr: 'Skalen Tüberkül (Lisfranc) ve Subklavyen Damar Olukları (Torasik Çıkış)', en: 'Scalene Tubercle (Lisfranc) & Subclavian Vessel Grooves' },
        synonyms: ['tuberculum musculi scaleni anterioris', 'lisfranc tuberkulu', 'sulcus arteriae subclaviae', 'sulcus venae subclaviae'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.48, ml: 0.65, ap: 0.32, radius: [0.28, 0.40, 0.38], normalHint: 'superior' },
        description: {
          tr: '1. kaburganın üst yüzünün iç kenarındaki hayati klinik röper noktasıdır (Lisfranc tüberkülü): M. scalenus anterior buraya tutunur; tüberkülün ÖNÜNDEKİ oluktan V. subclavia, ARKASINDAKİ oluktan ise A. subclavia ve Plexus brachialis’in alt trunkusu (C8–T1) geçer!',
          en: 'Crucial landmark on the superior surface of the 1st rib: the scalene tubercle separates the anterior groove for the subclavian vein from the posterior groove for the subclavian artery and lower trunk of the brachial plexus.',
        },
        neurovascularRelation: {
          structureLatin: 'V. subclavia (Önde) | M. scalenus anterior | A. subclavia & Truncus inferior plexus brachialis (Arkada)',
          note: {
            tr: '1. kaburga üzerinde M. scalenus anterior ile M. scalenus medius arasındaki üçgende (İnterskalen üçgen) A. subclavia ve brakiyal pleksusun sıkışmasına "Torasik Çıkış Sendromu" (Thoracic Outlet Syndrome — TOS) denir!',
            en: 'Compression of the subclavian artery and lower brachial plexus between the anterior and middle scalenes over the 1st rib causes Thoracic Outlet Syndrome (TOS).',
          },
        },
        attachments: [
          {
            id: 'att-scalenus-ant-subclavius-costa1',
            kind: 'insertio',
            muscleLatin: 'M. scalenus anterior (Lisfranc tüberkülü — Insertio) & M. subclavius (1. Kosta-kıkırdak birleşimi — Origo)',
            muscleName: { tr: 'Ön skalen kası ve Subklavius kası', en: 'Anterior scalene & Subclavius muscles' },
            musclePartId: 'FJ1592',
            function: {
              tr: 'Scalenus anterior 1. kaburgayı kaldırır ve boynu eğer; Subclavius klavikulayı aşağı çekerek altındaki subklavyen damarları korur.',
              en: 'Anterior scalene elevates the 1st rib and flexes the neck; subclavius depresses and stabilizes the clavicle.',
            },
            innervation: { nerve: 'Scalenus ant.: C4–C6 ön dalları; Subclavius: N. subclavius (C5–C6)', roots: 'C4–C6' },
          },
        ],
      },
      {
        id: 'costa2-tuberositas-serrati',
        number: 3,
        latinName: 'Costa secunda (II) & Tuberositas musculi serrati anterioris',
        name: { tr: '2. Kaburga ve Serratus Anterior/Arka Skalen Tüberositası', en: 'Second Rib & Tuberosity for Serratus Anterior' },
        synonyms: ['costa secunda', 'tuberositas musculi serrati anterioris', '2. kaburga'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        partId: 'FJ3336',
        zone: { si: 0.75, ml: 0.78, ap: 0.45, radius: [0.28, 0.42, 0.42], normalHint: 'lateral' },
        description: {
          tr: '1. kaburgadan iki kat daha uzun olan ve önde tam Angulus sterni (Louis açısı) hizasında sternumla eklemleşen 2. kaburgadır; dış-üst yüzünün ortasındaki belirgin pürtüklü kabartıya Tuberositas musculi serrati anterioris denir.',
          en: 'Twice the length of the 1st rib, articulating anteriorly at the sternal angle (of Louis) and featuring a prominent rough tuberosity mid-shaft on its superolateral surface.',
        },
        attachments: [
          {
            id: 'att-scalenus-post-serratus-costa2',
            kind: 'insertio',
            muscleLatin: 'M. scalenus posterior (Insertio) & M. serratus anterior — Güçlü 1.–2. dijital başlar (Origo)',
            muscleName: { tr: 'Arka skalen kası (İnsertio) ve Serratus anterior (Origo)', en: 'Posterior scalene & Serratus anterior muscles' },
            musclePartId: 'FJ1594',
            function: {
              tr: 'Scalenus posterior 2. kaburgayı kaldırır; Serratus anterior skapulayı göğüs duvarına bastırır ve yukarı rotasyon yaptırır.',
              en: 'Posterior scalene elevates the 2nd rib; serratus anterior protracts and upwardly rotates the scapula.',
            },
            innervation: { nerve: 'Scalenus post.: C6–C8; Serratus ant.: N. thoracicus longus (C5–C7)', roots: 'C5–C8' },
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 12. COSTAE III–XII & CARTILAGINES COSTALES (Tipik, Yalancı ve Yüzen Kaburgalar)
  // ============================================================================
  {
    boneId: 'costae-3-12',
    partIds: [
      'FJ3338', 'FJ3230', 'FJ3340', 'FJ3231', 'FJ3342', 'FJ3232', 'FJ3344', 'FJ3233',
      'FJ3346', 'FJ3234', 'FJ3347', 'FJ3235', 'FJ3348', 'FJ3236', 'FJ3330', 'FJ3225',
      'FJ3331', 'FJ3226', 'FJ3332', 'FJ3227',
      'FJ3333', 'FJ3239', 'FJ3335', 'FJ3242', 'FJ3337', 'FJ3245', 'FJ3339', 'FJ3248',
      'FJ3341', 'FJ3251', 'FJ3343', 'FJ3254', 'FJ3345', 'FJ3255',
    ],
    primaryPartId: 'FJ3344',
    packId: 'thorax',
    category: 'axial',
    latinName: 'Costae (III–XII) & Cartilagines costales',
    title: { tr: 'Costae III–XII ve Kosta Kıkırdakları (Tipik, Yalancı ve Yüzen Kaburgalar)', en: 'Ribs III–XII and Costal Cartilages' },
    summary: {
      tr: 'Göğüs kafesini saran yay biçimli kemik ve hiyalin kıkırdak kuşaklardır: 1.–7. çiftler doğrudan sternuma bağlanan "Gerçek Kaburgalar" (Costae verae), 8.–10. çiftler üstteki kıkırdağa tutunarak Arcus costalis’i kuran "Yalancı Kaburgalar" (Costae spuriae), 11.–12. çiftler ise önde serbest sonlanan "Yüzen Kaburgalar"dır (Costae fluctuantes).',
      en: 'Curved osteocartilaginous arches forming the thoracic cage: true ribs (1–7), false ribs (8–10 forming the costal margin), and floating ribs (11–12).',
    },
    regionGroupLabels: {
      proximal: { tr: 'Caput, Collum, Tuberculum ve Angulus Costae (Arka Uç)', en: 'Head, Neck, Tubercle & Angle of Rib' },
      shaft: { tr: 'Corpus Costae ve Sulcus Costae (VAN Damar-Sinir Oluğu)', en: 'Shaft of Rib & Subcostal Groove (VAN)' },
      distal: { tr: 'Cartilago Costalis, Arcus Costalis ve Yüzen Kaburgalar (XI–XII)', en: 'Costal Cartilages, Costal Margin & Floating Ribs' },
    },
    landmarks: [
      {
        id: 'costae-caput-tuberculum-angulus',
        number: 1,
        latinName: 'Caput costae, Collum, Tuberculum costae & Angulus costae',
        name: { tr: 'Kaburga Başı, Tüberkülü ve Kaburga Köşesi (En Zayıf Kırılma Noktası)', en: 'Head, Neck, Tubercle & Costal Angle' },
        synonyms: ['caput costae', 'tuberculum costae', 'angulus costae', 'kaburga basi', 'kaburga kosesi'],
        regionGroup: 'proximal',
        color: BONE_ZONE_PALETTE[0],
        zone: { si: 0.25, ml: 0.28, ap: 0.85, radius: [0.28, 0.42, 0.38], normalHint: 'posterior' },
        description: {
          tr: 'İki komşu torakal omur gövdesiyle eklem yapan kama biçimli Caput costae, transvers çıkıntıyla eklem yapan Tuberculum costae ve bunun ~5 cm dış yanında kaburganın öne doğru en keskin kıvrıldığı Angulus costae (kaburga kırıklarının en sık görüldüğü en zayıf nokta!).',
          en: 'Wedge-shaped head, neck, tubercle, and the posterolateral costal angle where the rib turns sharply anteriorly (weakest point most prone to fracture).',
        },
        attachments: [
          {
            id: 'att-iliocostalis-levatores-costae',
            kind: 'insertio',
            muscleLatin: 'Mm. levatores costarum (Tuberculum ile Angulus arası) & M. iliocostalis thoracis/lumborum (Angulus costae)',
            muscleName: { tr: 'Kaburga kaldırıcı kaslar ve İliokostalis (Erektör spina dış sütunu)', en: 'Levatores costarum & Iliocostalis muscle' },
            function: {
              tr: 'Kaburgaları stabilize eder ve omurgaya ekstansiyon/lateral fleksiyon yaptırır.',
              en: 'Elevate the ribs and extend/laterally flex the vertebral column.',
            },
            innervation: { nerve: 'Rr. dorsales nn. spinalium thoracicarum', roots: 'T1–T12' },
          },
        ],
      },
      {
        id: 'costae-corpus-sulcus-van',
        number: 2,
        latinName: 'Corpus costae & Sulcus costae (V. – A. – N. intercostalis)',
        name: { tr: 'Kaburga Gövdesi ve Sulcus Costae (İnterkostal VAN Paketi Oluğu)', en: 'Rib Shaft & Costal Groove (Intercostal VAN Bundle)' },
        synonyms: ['corpus costae', 'sulcus costae', 'interkostal oluk', 'kaburga govdesi'],
        regionGroup: 'shaft',
        color: BONE_ZONE_PALETTE[1],
        zone: { si: 0.52, ml: 0.82, ap: 0.48, radius: [0.28, 0.40, 0.42], normalHint: 'lateral' },
        description: {
          tr: 'Yassı, bükümlü kaburga gövdesi (Corpus costae) ve iç-alt kenarı boyunca uzanan keskin koruyucu oluk (Sulcus costae); solunumda kaburgalar "kova sapı" (transvers çap artışı) ve "tulumba kolu" (ön-arka çap artışı) hareketi yapar.',
          en: 'Flat, twisted shaft bearing the sharp inferior internal costal groove; elevates in "bucket-handle" and "pump-handle" motions during inspiration.',
        },
        neurovascularRelation: {
          structureLatin: 'V. intercostalis – A. intercostalis posterior – N. intercostalis (Yukarıdan aşağıya: VAN!)',
          note: {
            tr: 'HAYATİ CERRAHİ KURAL: Sulcus costae içinde kaburganın ALT kenarında yukarıdan aşağıya Vena – Arteria – Nervus (VAN) paketi seyreder! Bu nedenle torasentez (plevral sıvı boşaltma) ve göğüs tüpü takılması her zaman interkostal aralığın alt sınırından, yani BİR ALTTAKİ KABURGANIN ÜST KENARINDAN yapılır!',
            en: 'Because the neurovascular bundle (Vein–Artery–Nerve from superior to inferior: VAN) runs in the costal groove along the INFERIOR border of each rib, thoracentesis needles and chest tubes are always inserted just above the SUPERIOR border of the rib below.',
          },
        },
        attachments: [
          {
            id: 'att-intercostals-serratus-pec-minor-costae',
            kind: 'origo',
            muscleLatin: 'Mm. intercostales externi, interni et intimi, M. serratus anterior (1.–9. Kosta), M. pectoralis minor (3.–5. Kosta) & M. latissimus dorsi (9.–12. Kosta)',
            muscleName: { tr: 'İnterkostal kaslar, Serratus anterior (1–9), Pektoralis minör (3–5) ve Latissimus dorsi (9–12)', en: 'Intercostal muscles, Serratus anterior, Pectoralis minor & Latissimus dorsi' },
            musclePartId: 'FJ1451',
            function: {
              tr: 'Dış interkostaller inspirasyon, iç/en iç interkostaller zorlu ekspirasyon yapar; göğüs duvarı kasları skapula ve kol hareketlerini sağlar.',
              en: 'External intercostals elevate ribs in inspiration while internal intercostals assist forced expiration; extrinsic muscles move the shoulder girdle.',
            },
            innervation: { nerve: 'Nn. intercostales (T1–T11), N. thoracicus longus (C5–C7), N. pectoralis medialis & N. thoracodorsalis', roots: 'C5–T11' },
          },
        ],
      },
      {
        id: 'costae-cartilago-arcus-fluctuantes',
        number: 3,
        latinName: 'Cartilago costalis (I–VII), Arcus costalis (VIII–X) & Costae fluctuantes (XI–XII)',
        name: { tr: 'Kosta Kıkırdakları, Kostal Ark ve Yüzen Kaburgalar (Diyafram ve Karın Kasları)', en: 'Costal Cartilages, Costal Margin & Floating Ribs (XI–XII)' },
        synonyms: ['cartilago costalis', 'arcus costalis', 'costae fluctuantes', 'kosta kikirdagi', 'yuzen kaburgalar'],
        regionGroup: 'distal',
        color: BONE_ZONE_PALETTE[2],
        partId: 'FJ3343',
        zone: { si: 0.50, ml: 0.50, ap: 0.50, radius: [0.70, 0.70, 0.70], normalHint: 'anterior' },
        description: {
          tr: 'Göğüs kafesine esneklik kazandıran hiyalin kıkırdaklar (Cartilagines costales), 7.–10. kıkırdakların birleşmesiyle oluşan sağ/sol kaburga kemeri (Arcus costalis) ve önde karın duvarı kasları içinde serbest sonlanan 11.–12. yüzen kaburgalar (böbreklerin üst kutuplarını arkadan korurlar!).',
          en: 'Elastic hyaline costal cartilages, the inferomedial costal arch (ribs 7–10), and the floating 11th and 12th ribs protecting the superior poles of the kidneys posteriorly.',
        },
        attachments: [
          {
            id: 'att-diaphragm-abdominal-wall-costae',
            kind: 'origo',
            muscleLatin: 'Diaphragma — Pars costalis (7.–12. Kıkırdak iç yüzü), M. obliquus externus (5.–12. Dış yüz), M. transversus abdominis (7.–12.), M. rectus abdominis (5.–7. Kıkırdak — Insertio) & M. quadratus lumborum (12. Kosta — Insertio)',
            muscleName: { tr: 'Diyafram (Kostal parça), Karın ön-yan duvarı kasları ve Kuadratus lumborum', en: 'Diaphragm (Costal part), Abdominal wall muscles & Quadratus lumborum' },
            musclePartId: 'FJ3131',
            function: {
              tr: 'Toraks ile abdomen sınırını kurar; solunumda göğüs boşluğu hacmini değiştirir ve gövde fleksiyonu/rotasyonu ile kor stabilizasyonu sağlar.',
              en: 'Form the thoracoabdominal boundary, driving respiration, trunk flexion/rotation, and intra-abdominal pressure regulation.',
            },
            innervation: { nerve: 'N. phrenicus (C3–C5), Nn. thoracoabdominales (T7–T11) & N. subcostalis (T12)', roots: 'C3–C5, T5–L1' },
          },
        ],
      },
    ],
  },
];
