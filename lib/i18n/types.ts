export type Language = "tr" | "en";

export interface TranslationDictionary {
  nav: {
    home: string;
    atlas: string;
    learn: string;
    exam: string;
    device: string;
    community: string;
    brandSubtitle: string;
    brandTagline: string;
    startWebAtlas: string;
    downloadApp: string;
    downloadShort: string;
    menuOpen: string;
    menuClose: string;
    osteology: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaTry: string;
    ctaStores: string;
    statStudents: string;
    statStudentsLabel: string;
    statFaculties: string;
    statFacultiesLabel: string;
    statTa2: string;
    statTa2Label: string;
  };
  features: {
    badge: string;
    title: string;
    desc: string;
    f1Title: string;
    f1Desc: string;
    f1Tag1: string;
    f1Tag2: string;
    f1Tag3: string;
    f2Title: string;
    f2Desc: string;
    f2Tag1: string;
    f2Tag2: string;
    f2Tag3: string;
    f3Title: string;
    f3Desc: string;
    f3Tag1: string;
    f3Tag2: string;
    f3Tag3: string;
  };
  regions: {
    badge: string;
    title: string;
    desc: string;
    inspectRegion: string;
    structuresCount: string;
    items: Record<
      string,
      {
        name: string;
        latin: string;
        structureCount: string;
        description: string;
      }
    >;
  };
  habit: {
    badge: string;
    title: string;
    desc: string;
    streakTitle: string;
    streakSub: string;
    streakDesc: string;
    streakBadge: string;
    badgesTitle: string;
    badgesSub: string;
    badgesDesc: string;
    badgesCount: string;
    facultyAlignment: string;
    studyPathBtn: string;
  };
  cta: {
    badge: string;
    title: string;
    desc: string;
    btnDownload: string;
    btnAtlas: string;
    syncNote: string;
  };
  viewer: {
    layersDressed: string;
    dissectionLayers: string;
    liveModelHint: string;
    atlasStudio: string;
    learn: string;
    exam: string;
    skeleton: string;
    muscle: string;
    vascular: string;
    nervous: string;
    organs: string;
    peelMuscle: string;
    peeledMuscle: string;
    coverMuscle: string;
    dragToRotate: string;
    rotateTooltip: string;
    zoomIn: string;
    zoomOut: string;
    resetCamera: string;
    loadingText: string;
    ta2Compliant: string;
    positionRef: string;
  };
  atlasPage: {
    subTitle: string;
    subDesc: string;
    quickScope: string;
    presetAll: string;
    presetLocomotor: string;
    presetThorax: string;
    presetOrgans: string;
    presetNeuro: string;
    activeLayers: string;
    openAll: string;
    peelAll: string;
    dissectionLayersTitle: string;
    dissectionLayersSubtitle: string;
    musclePeeling: string;
    opacity: string;
    full: string;
    peel: string;
    thin: string;
    activeStructure: string;
    clinicalNoteTitle: string;
    startExamWithRegion: string;
    rotateHint: string;
  };
  examPage: {
    subBadge: string;
    subTitle: string;
    subDesc: string;
    station: string;
    stainlessTable: string;
    pins: string;
    secondsLeft: string;
    osceBellCountdown: string;
    station1Name: string;
    station2Name: string;
    station3Name: string;
    tableSimulation: string;
    identifyPrompt: string;
    answerPlaceholder: string;
    checkAnswer: string;
    correctAlert: string;
    wrongAlert: string;
    correctAnswerWas: string;
    nextPin: string;
    resetTimer: string;
    viewStationDetails: string;
    activePinBadge: string;
  };
}
